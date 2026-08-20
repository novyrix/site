import assert from "node:assert/strict";
import test from "node:test";
import type { PrismaClient } from "@prisma/client";
import type { Resend } from "resend";
import type { PlatformEnvironment } from "../config.js";
import { PaymentService } from "./service.js";

const readyEnvironment: PlatformEnvironment = {
  DATABASE_URL: "postgresql://test:test@localhost:5432/test",
  API_SHARED_SECRET: "a".repeat(48),
  RESEND_API_KEY: "re_test_key_long_enough_for_schema",
  RESEND_FROM_EMAIL: "Novyrix <notifications@example.com>",
  ADMIN_EMAIL: "connect@novyrix.com",
  PORT: 8080,
  PAYMENTS_LIVE: true,
  PAYMENT_SITE_URL: "https://novyrix.com",
  PAYMENT_LINK_SECRET: "b".repeat(48),
  PAYSTACK_SECRET_KEY: "paystack-test-key",
  PAYSTACK_BASE_URL: "https://api.paystack.co",
  BTCPAY_BASE_URL: "https://pay.example.com",
  BTCPAY_API_KEY: "btcpay-test-key",
  BTCPAY_STORE_ID: "store-id",
  BTCPAY_WEBHOOK_SECRET: "btcpay-webhook-secret",
};

function invoiceDependencies() {
  const emailMessages: Array<Record<string, unknown>> = [];
  const invoiceUpdates: Array<Record<string, unknown>> = [];
  let invoiceCreates = 0;
  const dueAt = new Date("2026-09-02T12:00:00.000Z");

  const prisma = {
    engagement: {
      findUnique: async () => ({
        id: "engagement-id",
        status: "ACTIVE",
        organization: { resolvedCurrency: "KES" },
        proposal: {
          serviceType: "Operations platform delivery",
          lead: { contactName: "Amina", contactEmail: "amina@example.com" },
        },
      }),
    },
    invoice: {
      create: async () => {
        invoiceCreates += 1;
        return {
          id: "invoice-id",
          reference: "INV-TEST",
          status: "PENDING",
          currency: "KES",
          totalAmountMinor: 125000n,
          dueAt,
        };
      },
      update: async (input: Record<string, unknown>) => {
        invoiceUpdates.push(input);
        return input;
      },
    },
  } as unknown as PrismaClient;

  const resend = {
    emails: {
      send: async (message: Record<string, unknown>) => {
        emailMessages.push(message);
        return { data: { id: "email-id" }, error: null };
      },
    },
  } as unknown as Resend;

  return {
    prisma,
    resend,
    dueAt,
    emailMessages,
    invoiceUpdates,
    invoiceCreateCount: () => invoiceCreates,
  };
}

test("creates and sends an itemized private invoice only when both providers are ready", async () => {
  const dependencies = invoiceDependencies();
  const service = new PaymentService(dependencies.prisma, dependencies.resend, readyEnvironment);
  const result = await service.createInvoice({
    engagementReference: "ENG-TEST",
    dueAt: dependencies.dueAt,
    lineItems: [{ description: "Platform delivery", quantity: 1, unitAmountMinor: 125000n }],
  });

  assert.equal(dependencies.invoiceCreateCount(), 1);
  assert.equal(dependencies.emailMessages.length, 1);
  assert.equal(dependencies.invoiceUpdates.length, 1);
  assert.equal(result.notificationAccepted, true);
  assert.match(result.paymentUrl, /^https:\/\/novyrix\.com\/pay\/[A-Za-z0-9_-]{43}$/);
  assert.equal(dependencies.emailMessages[0].to, "amina@example.com");
  assert.match(String(dependencies.emailMessages[0].text), new RegExp(result.paymentUrl));
  assert.deepEqual(
    (dependencies.invoiceUpdates[0].data as Record<string, unknown>).notificationStatus,
    "SENT",
  );
});

test("does not create an invoice while payment providers are disabled", async () => {
  const dependencies = invoiceDependencies();
  const service = new PaymentService(dependencies.prisma, dependencies.resend, {
    ...readyEnvironment,
    PAYMENTS_LIVE: false,
  });

  await assert.rejects(
    service.createInvoice({
      engagementReference: "ENG-TEST",
      dueAt: dependencies.dueAt,
      lineItems: [{ description: "Platform delivery", quantity: 1, unitAmountMinor: 125000n }],
    }),
    /providers_not_ready/,
  );
  assert.equal(dependencies.invoiceCreateCount(), 0);
  assert.equal(dependencies.emailMessages.length, 0);
});
