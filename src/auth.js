const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function toBase64(bytes) {
  if (typeof btoa === "function") {
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
  }
  return Buffer.from(bytes).toString("base64");
}

function fromBase64(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  if (typeof atob === "function") {
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }
  return new Uint8Array(Buffer.from(padded, "base64"));
}

function toBase64Url(bytes) {
  return toBase64(bytes).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function fromBase64Url(value) {
  return fromBase64(value);
}

function timingSafeEqualBytes(left, right) {
  if (left.length !== right.length) {
    return false;
  }

  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left[index] ^ right[index];
  }

  return diff === 0;
}

export function randomToken(byteLength = 24) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return toBase64Url(bytes);
}

export function isProbablyWebSocketUrl(value) {
  try {
    const url = new URL(value);
    return ["ws:", "wss:", "http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export function normalizeWebSocketUrl(value) {
  const url = new URL(value);
  if (url.protocol === "ws:") {
    url.protocol = "http:";
  } else if (url.protocol === "wss:") {
    url.protocol = "https:";
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error(`Unsupported upstream URL scheme: ${url.protocol}`);
  }

  return url.toString();
}

async function importHmacKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signBody(secret, body) {
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(body));
  return new Uint8Array(signature);
}

function decodeJsonPayload(encodedPayload) {
  const payloadJson = textDecoder.decode(fromBase64Url(encodedPayload));
  return JSON.parse(payloadJson);
}

export async function signAdminToken(secret, payload = {}) {
  const issuedAt = Date.now();
  const body = JSON.stringify({
    sub: "admin",
    iat: issuedAt,
    exp: issuedAt + 12 * 60 * 60 * 1000,
    ...payload,
  });
  const encodedBody = toBase64Url(textEncoder.encode(body));
  const signature = await signBody(secret, encodedBody);
  return `${encodedBody}.${toBase64Url(signature)}`;
}

export async function verifyAdminToken(secret, token) {
  const [encodedBody, encodedSignature] = String(token).split(".");
  if (!encodedBody || !encodedSignature) {
    return null;
  }

  const expected = await signBody(secret, encodedBody);
  const actual = fromBase64Url(encodedSignature);
  if (!timingSafeEqualBytes(expected, actual)) {
    return null;
  }

  const payload = decodeJsonPayload(encodedBody);
  if (payload.exp && Date.now() > payload.exp) {
    return null;
  }

  return payload;
}

export function readAdminToken(request) {
  const authorization = request.headers.get("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice(7).trim();
  }

  const headerToken = request.headers.get("X-Admin-Token");
  if (headerToken) {
    return headerToken.trim();
  }

  return null;
}
