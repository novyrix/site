import { createHmac } from "node:crypto";
import assert from "node:assert/strict";
import test from "node:test";
import type { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import type { Resend } from "resend";
import type { PlatformEnvironment } from "../config.js";
import { registerPaymentRoutes } from "./payments.js";

const apiSecret = "a".repeat(48);
const paystackSecret = "paystack-test-secret";
const btcpaySecret = "btcpay-test-secret";

const environment: PlatformEnvironment = {
  DATABASE_URL: "postgresql://test:test@localhost:5432/test",
  API_SHARED_SECRET: apiSecret,
  RESEND_API_KEY: "re_test_key_long_enough_for_schema",
  RESEND_FROM_EMAIL: "Novyrix <notifications@example.com>",
  ADMIN_EMAIL: "connect@novyrix.com",
  PORT: 8080,
  PAYMENTS_LIVE: true,
  PAYMENT_SITE_URL: "https://novyrix.com",
  PAYMENT_LINK_SECRET: "b".repeat(48),
  PAYSTACK_SECRET_KEY: paystackSecret,
  PAYSTACK_BASE_URL: "https://api.paystack.co",
  BTCPAY_BASE_URL: "https://pay.example.com",
  BTCPAY_API_KEY: "btcpay-api-key",
  BTCPAY_STORE_ID: "store-id",
  BTCPAY_WEBHOOK_SECRET: btcpaySecret,
};

function testPrisma() {
  const updates: Array<Record<string, unknown>> = [];
  const prisma = {
    webhookEvent: {
      create: async () => ({ id: `evt-${updates.length + 1}` }),
      update: async (input: Record<string, unknown>) => {
        updates.push(input);
        return input;
      },
    },
  } as unknown as PrismaClient;
  return { prisma, updates };
}

test("payment routes keep raw webhook bytes and protect readiness", async () => {
  const app = Fastify({ logger: false });
  const { prisma, updates } = testPrisma();
  await registerPaymentRoutes(app, prisma, {} as Resend, environment);

  const unauthorized = await app.inject({
    method: "GET",
    url: "/v1/admin/payments/readiness",
  });
  assert.equal(unauthorized.statusCode, 401);

  const ready = await app.inject({
    method: "GET",
    url: "/v1/admin/payments/readiness",
    headers: { authorization: `Bearer ${apiSecret}` },
  });
  assert.equal(ready.statusCode, 200);
  assert.deepEqual(ready.json(), {
    paymentsLive: true,
    allReady: true,
    paystack: { configured: true, ready: true },
    btcpay: { configured: true, ready: true },
  });

  const paystackBody = JSON.stringify({ event: "subscription.create", data: { id: 73 } });
  const paystackSignature = createHmac("sha512", paystackSecret).update(paystackBody).digest("hex");
  const paystack = await app.inject({
    method: "POST",
    url: "/v1/webhooks/paystack",
    headers: {
      "content-type": "application/json",
      "x-paystack-signature": paystackSignature,
    },
    payload: paystackBody,
  });
  assert.equal(paystack.statusCode, 200);
  assert.equal(paystack.json().result, "ignored");

  const btcpayBody = JSON.stringify({
    deliveryId: "delivery-1",
    type: "InvoiceCreated",
    invoiceId: "invoice-1",
  });
  const btcpaySignature = `sha256=${createHmac("sha256", btcpaySecret).update(btcpayBody).digest("hex")}`;
  const btcpay = await app.inject({
    method: "POST",
    url: "/v1/webhooks/btcpay",
    headers: {
      "content-type": "application/json",
      "btcpay-sig": btcpaySignature,
    },
    payload: btcpayBody,
  });
  assert.equal(btcpay.statusCode, 200);
  assert.equal(btcpay.json().result, "ignored");
  const paystackAliasBody = JSON.stringify({ event: "invoice.create", data: { id: 74 } });
  const paystackAliasSignature = createHmac("sha512", paystackSecret)
    .update(paystackAliasBody)
    .digest("hex");
  const paystackAlias = await app.inject({
    method: "POST",
    url: "/webhooks/paystack",
    headers: {
      "content-type": "application/json",
      "x-paystack-signature": paystackAliasSignature,
    },
    payload: paystackAliasBody,
  });
  assert.equal(paystackAlias.statusCode, 200);
  assert.equal(paystackAlias.json().result, "ignored");
  assert.equal(updates.length, 3);

  await app.close();
});
