import assert from "node:assert/strict";
import test from "node:test";
import type { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import type { PlatformEnvironment } from "../config.js";
import type { PaymentService } from "../payments/service.js";
import { hashPortalPassword } from "../portal/password.js";
import { registerPortalRoutes } from "./portal.js";

const apiSecret = "a".repeat(48);
const now = new Date("2026-08-20T12:00:00.000Z");

const environment: PlatformEnvironment = {
  DATABASE_URL: "postgresql://test:test@localhost:5432/test",
  API_SHARED_SECRET: apiSecret,
  RESEND_API_KEY: "re_test_key_long_enough_for_schema",
  RESEND_FROM_EMAIL: "Novyrix <notifications@example.com>",
  ADMIN_EMAIL: "connect@novyrix.com",
  PORT: 8080,
  PAYMENTS_LIVE: false,
  PAYMENT_SITE_URL: "https://novyrix.com",
  PAYMENT_LINK_SECRET: "b".repeat(48),
  PAYSTACK_SECRET_KEY: undefined,
  PAYSTACK_BASE_URL: "https://api.paystack.co",
  BTCPAY_BASE_URL: undefined,
  BTCPAY_API_KEY: undefined,
  BTCPAY_STORE_ID: undefined,
  BTCPAY_WEBHOOK_SECRET: undefined,
};

function portalPrisma() {
  const user = {
    id: "portal-user-1",
    email: "amina@example.com",
    name: "Amina Njoroge",
    passwordHash: hashPortalPassword("correct horse battery"),
    status: "INVITED",
    lastLoginAt: null,
    createdAt: now,
    updatedAt: now,
    memberships: [
      {
        id: "membership-1",
        portalUserId: "portal-user-1",
        organizationId: "org-1",
        role: "CLIENT",
        createdAt: now,
        organization: {
          id: "org-1",
          name: "Acacia Field Systems",
          type: "NGO",
          country: "Kenya",
          resolvedCurrency: "KES",
          createdAt: now,
          updatedAt: now,
        },
      },
    ],
  };

  const prisma = {
    portalUser: {
      findUnique: async (input: { where: { email?: string; id?: string } }) => {
        if (input.where.email === user.email || input.where.id === user.id) return user;
        return null;
      },
      update: async () => ({ ...user, status: "ACTIVE", lastLoginAt: now }),
    },
    engagement: {
      findMany: async () => [],
    },
  } as unknown as PrismaClient;

  return prisma;
}

test("portal routes verify credentials and require the portal user header", async () => {
  const app = Fastify({ logger: false });
  await registerPortalRoutes(
    app,
    portalPrisma(),
    {} as PaymentService,
    environment,
  );

  const unauthorized = await app.inject({
    method: "POST",
    url: "/v1/portal/auth/verify",
    payload: { email: "amina@example.com", password: "correct horse battery" },
  });
  assert.equal(unauthorized.statusCode, 401);

  const verified = await app.inject({
    method: "POST",
    url: "/v1/portal/auth/verify",
    headers: { authorization: `Bearer ${apiSecret}` },
    payload: { email: "amina@example.com", password: "correct horse battery" },
  });
  assert.equal(verified.statusCode, 200);
  assert.equal(verified.json().email, "amina@example.com");
  assert.equal(verified.json().organizations[0].name, "Acacia Field Systems");

  const googleResolved = await app.inject({
    method: "POST",
    url: "/v1/portal/auth/google",
    headers: { authorization: `Bearer ${apiSecret}` },
    payload: { email: "AMINA@example.com" },
  });
  assert.equal(googleResolved.statusCode, 200);
  assert.equal(googleResolved.json().id, "portal-user-1");

  const googleUnknown = await app.inject({
    method: "POST",
    url: "/v1/portal/auth/google",
    headers: { authorization: `Bearer ${apiSecret}` },
    payload: { email: "unknown@example.com" },
  });
  assert.equal(googleUnknown.statusCode, 401);

  const missingUserHeader = await app.inject({
    method: "GET",
    url: "/v1/portal/overview",
    headers: { authorization: `Bearer ${apiSecret}` },
  });
  assert.equal(missingUserHeader.statusCode, 401);

  const overview = await app.inject({
    method: "GET",
    url: "/v1/portal/overview",
    headers: {
      authorization: `Bearer ${apiSecret}`,
      "x-novyrix-portal-user-id": "portal-user-1",
    },
  });
  assert.equal(overview.statusCode, 200);
  assert.equal(overview.json().summary.activeEngagements, 0);

  await app.close();
});
