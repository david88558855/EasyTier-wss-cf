import { normalizeWebSocketUrl } from "./auth.js";

export function parseRelayPath(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length !== 3 || parts[0] !== "ws") {
    return null;
  }

  return {
    routeId: decodeURIComponent(parts[1]),
    clientToken: decodeURIComponent(parts[2]),
  };
}

export function isWebSocketUpgrade(request) {
  return request.headers.get("Upgrade")?.toLowerCase() === "websocket";
}

async function convertMessageData(data) {
  if (typeof data === "string") {
    return data;
  }

  if (data instanceof ArrayBuffer) {
    return data;
  }

  if (ArrayBuffer.isView(data)) {
    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  }

  if (data instanceof Blob) {
    return await data.arrayBuffer();
  }

  return data;
}

async function openUpstreamWebSocket(route) {
  const targetUrl = normalizeWebSocketUrl(route.upstreamWsUrl);
  const response = await fetch(targetUrl, {
    headers: {
      Upgrade: "websocket",
    },
  });

  if (response.status !== 101 || !response.webSocket) {
    throw new Error(`Upstream websocket handshake failed with status ${response.status}`);
  }

  const upstream = response.webSocket;
  upstream.binaryType = "arraybuffer";
  upstream.accept();
  return upstream;
}

export async function testUpstreamWebSocket(route) {
  const upstream = await openUpstreamWebSocket(route);
  try {
    upstream.close(1000, "probe");
  } catch {
    return false;
  }
  return true;
}

export async function proxyRelayWebSocket(request, route, hooks = {}) {
  const upstream = await openUpstreamWebSocket(route);
  const pair = new WebSocketPair();
  const [client, server] = Object.values(pair);

  client.binaryType = "arraybuffer";
  server.binaryType = "arraybuffer";
  server.accept();

  const connectionId = crypto.randomUUID();
  let closed = false;
  let closeRecorded = false;

  const closeBoth = (code = 1000, reason = "") => {
    if (closed) {
      return;
    }

    closed = true;

    try {
      server.close(code, reason);
    } catch {
    }

    try {
      upstream.close(code, reason);
    } catch {
    }
  };

  const emit = (event) => {
    if (typeof hooks.onEvent === "function") {
      hooks.onEvent(event);
    }
  };

  emit({
    type: "open",
    routeId: route.id,
    routeName: route.name,
    connectionId,
    clientIp: request.headers.get("cf-connecting-ip") ?? "",
    userAgent: request.headers.get("user-agent") ?? "",
    upstreamWsUrl: route.upstreamWsUrl,
    at: new Date().toISOString(),
    deltaActive: 1,
  });

  const forward = async (data, target, direction) => {
    try {
      const payload = await convertMessageData(data);
      target.send(payload);
    } catch (error) {
      emit({
        type: "error",
        routeId: route.id,
        routeName: route.name,
        connectionId,
        direction,
        message: error instanceof Error ? error.message : String(error),
        at: new Date().toISOString(),
      });
      closeBoth(1011, "relay failure");
    }
  };

  server.addEventListener("message", (event) => {
    void forward(event.data, upstream, "client-to-upstream");
  });

  upstream.addEventListener("message", (event) => {
    void forward(event.data, server, "upstream-to-client");
  });

  server.addEventListener("close", (event) => {
    if (closeRecorded) {
      closeBoth(event.code, event.reason ?? "");
      return;
    }
    closeRecorded = true;
    emit({
      type: "close",
      routeId: route.id,
      routeName: route.name,
      connectionId,
      code: event.code,
      reason: event.reason ?? "",
      wasClean: event.wasClean,
      at: new Date().toISOString(),
      deltaActive: -1,
    });
    closeBoth(event.code, event.reason ?? "");
  });

  upstream.addEventListener("close", (event) => {
    if (closeRecorded) {
      closeBoth(event.code, event.reason ?? "");
      return;
    }
    closeRecorded = true;
    emit({
      type: "close",
      routeId: route.id,
      routeName: route.name,
      connectionId,
      code: event.code,
      reason: event.reason ?? "",
      wasClean: event.wasClean,
      at: new Date().toISOString(),
      deltaActive: -1,
    });
    closeBoth(event.code, event.reason ?? "");
  });

  upstream.addEventListener("error", () => {
    emit({
      type: "error",
      routeId: route.id,
      routeName: route.name,
      connectionId,
      message: "Upstream websocket error",
      at: new Date().toISOString(),
    });
    closeBoth(1011, "upstream websocket error");
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
