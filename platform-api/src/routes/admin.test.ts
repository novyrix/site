import assert from "node:assert/strict";
import test from "node:test";
import type { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import type { PlatformEnvironment } from "../config.js";
import { registerAdminRoutes } from "./admin.js";

const apiSecret = "a".repeat(48);
const environment = {
  DATABASE_URL: "postgresql://test:test@localhost:5432/test",
  API_SHARED_SECRET: apiSecret,
  RESEND_API_KEY: "re_test_key_long_enough_for_schema",
  RESEND_FROM_EMAIL: "Novyrix <notifications@example.com>",
  ADMIN_EMAIL: "connect@novyrix.com",
  PORT: 8080,
  PAYMENTS_LIVE: false,
  PAYMENT_SITE_URL: "https://novyrix.com",
  PAYMENT_LINK_SECRET: "b".repeat(48),
  PAYSTACK_BASE_URL: "https://api.paystack.co",
} as PlatformEnvironment;

test("admin overview is authenticated and discovery outcomes are persisted", async () => {
  const updates: Array<Record<string, unknown>> = [];
  const prisma = {
    lead: {
      count: async ({ where }: { where: { fitStatus?: string } }) =>
        where.fitStatus === "PENDING" ? 2 : 3,
      findMany: async () => [],
      update: async (input: Record<string, unknown>) => {
        updates.push(input);
        return {
          reference: "NVX-TEST1234",
          discoveryOutcome: "PROCEED",
          discoveryNotes: "Scope confirmed during the discovery call.",
          discoveryCompletedAt: new Date("2026-08-20T08:00:00.000Z"),
          updatedAt: new Date("2026-08-20T08:00:00.000Z"),
        };
      },
    },
    engagement: { count: async () => 4 },
    invoice: {
      count: async ({ where }: { where: { status: string } }) =>
        where.status === "PENDING" ? 5 : 1,
    },
  } as unknown as PrismaClient;

  const app = Fastify({ logger: false });
  await registerAdminRoutes(app, prisma, environment);

  const unauthorized = await app.inject({ method: "GET", url: "/v1/admin/overview" });
  assert.equal(unauthorized.statusCode, 401);

  const overview = await app.inject({
    method: "GET",
    url: "/v1/admin/overview",
    headers: { authorization: `Bearer ${apiSecret}` },
  });
  assert.equal(overview.statusCode, 200);
  assert.deepEqual(overview.json().counts, {
    pendingLeads: 2,
    fitLeads: 3,
    activeEngagements: 4,
    pendingInvoices: 5,
    overdueInvoices: 1,
  });

  const discovery = await app.inject({
    method: "PATCH",
    url: "/v1/admin/leads/NVX-TEST1234/discovery",
    headers: {
      authorization: `Bearer ${apiSecret}`,
      "content-type": "application/json",
    },
    payload: {
      outcome: "PROCEED",
      notes: "Scope confirmed during the discovery call.",
    },
  });
  assert.equal(discovery.statusCode, 200);
  assert.equal(discovery.json().discoveryOutcome, "PROCEED");
  assert.equal(updates.length, 1);

  await app.close();
});
