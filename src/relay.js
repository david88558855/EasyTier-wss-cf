export function parseRelayPath(pathname) {
  const segments = String(pathname || "").split("/").filter(Boolean);
  if (segments.length !== 3 || segments[0] !== "ws") {
    return null;
  }
  return {
    routeId: segments[1],
    clientToken: segments[2],
  };
}

export function decodePeerManagerHeader(bytes) {
  const view = bytes instanceof DataView ? bytes : new DataView(bytes.buffer, bytes.byteOffset || 0, bytes.byteLength || bytes.length);
  return {
    fromPeerId: view.getUint32(0, true),
    toPeerId: view.getUint32(4, true),
    packetType: view.getUint8(8),
    flags: view.getUint8(9),
    version: view.getUint8(10),
    len: view.getUint32(12, true),
  };
}
