/** 将 WebSocket 元数据持久化到 Durable Object hibernation attachment */

export function persistWebSocketAttachment(ws) {
  if (typeof ws.serializeAttachment !== 'function') return;
  ws.serializeAttachment({
    peerId: ws.peerId ?? null,
    groupKey: ws.groupKey ?? null,
    domainName: ws.domainName ?? null,
    serverSessionId: ws.serverSessionId ?? null,
    roomId: ws.roomId ?? null,
    connectedAt: ws.connectedAt ?? null,
    rxBytes: ws.rxBytes ?? 0,
    txBytes: ws.txBytes ?? 0,
  });
}
