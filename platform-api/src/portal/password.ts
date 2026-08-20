import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const keyLength = 64;
const saltLength = 16;

export function hashPortalPassword(password: string) {
  const salt = randomBytes(saltLength).toString("hex");
  const hash = scryptSync(password, salt, keyLength).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export function verifyPortalPassword(password: string, storedHash: string) {
  const [scheme, salt, expectedHash] = storedHash.split(":");
  if (scheme !== "scrypt" || !salt || !expectedHash) return false;

  const expected = Buffer.from(expectedHash, "hex");
  const actual = scryptSync(password, salt, expected.length);
  if (actual.length !== expected.length) return false;

  return timingSafeEqual(actual, expected);
}
