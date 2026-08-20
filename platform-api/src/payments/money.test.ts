import assert from "node:assert/strict";
import test from "node:test";
import { formatMinorAmount, parseMajorAmount, toSafeProviderInteger } from "./money.js";

test("formats and parses KES and USD minor units without floating point math", () => {
  assert.equal(formatMinorAmount(125050n, "KES"), "1250.50");
  assert.equal(formatMinorAmount(99n, "USD"), "0.99");
  assert.equal(parseMajorAmount("1250.5", "KES"), 125050n);
  assert.equal(parseMajorAmount("0.99", "USD"), 99n);
});

test("rejects unsupported precision and unsafe provider integers", () => {
  assert.throws(() => parseMajorAmount("10.001", "USD"), /unsupported precision/);
  assert.throws(() => toSafeProviderInteger(0n), /provider-safe range/);
  assert.throws(
    () => toSafeProviderInteger(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    /provider-safe range/,
  );
});
