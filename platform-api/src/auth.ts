import { timingSafeEqual } from "node:crypto";

export function hasValidSecret(header: string | undefined, expectedSecret: string) {
  if (!header?.startsWith("Bearer ")) return false;
  const provided = Buffer.from(header.slice(7));
  const expected = Buffer.from(expectedSecret);
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}
