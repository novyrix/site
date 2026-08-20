import assert from "node:assert/strict";
import test from "node:test";
import { hashPortalPassword, verifyPortalPassword } from "./password.js";

test("portal passwords are hashed and verified without storing plaintext", () => {
  const password = "temporary-client-passphrase";
  const hash = hashPortalPassword(password);

  assert.match(hash, /^scrypt:[a-f0-9]+:[a-f0-9]+$/);
  assert.notEqual(hash, password);
  assert.equal(verifyPortalPassword(password, hash), true);
  assert.equal(verifyPortalPassword("wrong-password", hash), false);
});
