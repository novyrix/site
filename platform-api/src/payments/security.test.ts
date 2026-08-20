import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { createPaymentToken, hashPaymentToken, verifyHmacSignature } from "./security.js";

test("creates opaque payment tokens and stable keyed hashes", () => {
  const token = createPaymentToken();
  assert.match(token, /^[A-Za-z0-9_-]{43}$/);
  assert.equal(hashPaymentToken(token, "a".repeat(32)), hashPaymentToken(token, "a".repeat(32)));
  assert.notEqual(hashPaymentToken(token, "a".repeat(32)), hashPaymentToken(token, "b".repeat(32)));
});

test("verifies Paystack and BTCPay raw-body signatures", () => {
  const payload = Buffer.from('{"event":"paid"}');
  const paystack = createHmac("sha512", "paystack-secret").update(payload).digest("hex");
  const btcpay = `sha256=${createHmac("sha256", "btcpay-secret").update(payload).digest("hex")}`;

  assert.equal(verifyHmacSignature(payload, paystack, "paystack-secret", "sha512"), true);
  assert.equal(verifyHmacSignature(payload, btcpay, "btcpay-secret", "sha256", "sha256="), true);
  assert.equal(verifyHmacSignature(payload, "invalid", "paystack-secret", "sha512"), false);
});
