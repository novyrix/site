import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export function createPaymentToken() {
  return randomBytes(32).toString("base64url");
}

export function hashPaymentToken(token: string, secret: string) {
  return createHmac("sha256", secret).update(token).digest("hex");
}

export function hashPayload(payload: Buffer) {
  return createHash("sha256").update(payload).digest("hex");
}

export function verifyHmacSignature(
  payload: Buffer,
  receivedSignature: string | undefined,
  secret: string,
  algorithm: "sha256" | "sha512",
  prefix = "",
) {
  if (!receivedSignature) return false;
  const expected = Buffer.from(
    `${prefix}${createHmac(algorithm, secret).update(payload).digest("hex")}`,
    "utf8",
  );
  const received = Buffer.from(receivedSignature, "utf8");
  return received.length === expected.length && timingSafeEqual(received, expected);
}
