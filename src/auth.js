const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function base64UrlEncode(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlDecode(value) {
  const base64 = String(value).replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(String(value).length / 4) * 4, "=");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function hmacSha256(secret, data) {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, textEncoder.encode(data)));
}

function readTokenFromRequest(request) {
  const authorization = request.headers.get("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice(7).trim();
  }
  return request.headers.get("X-Admin-Token")?.trim() || "";
}

export function readAdminToken(request) {
  return readTokenFromRequest(request);
}

export async function signAdminToken(secret, payload = {}) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const tokenPayload = {
    ...payload,
    iat: issuedAt,
  };
  const payloadPart = base64UrlEncode(textEncoder.encode(JSON.stringify(tokenPayload)));
  const signature = base64UrlEncode(await hmacSha256(secret, payloadPart));
  return `${payloadPart}.${signature}`;
}

export async function verifyAdminToken(secret, token) {
  if (!token || typeof token !== "string") return null;
  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) return null;

  const expectedSignature = base64UrlEncode(await hmacSha256(secret, payloadPart));
  if (expectedSignature !== signaturePart) return null;

  try {
    const payload = JSON.parse(textDecoder.decode(base64UrlDecode(payloadPart)));
    return payload && typeof payload === "object" ? payload : null;
  } catch {
    return null;
  }
}
