import type { EngagementType, PaymentProvider, PrismaClient } from "@prisma/client";
import type { FastifyInstance } from "fastify";
import type { Resend } from "resend";
import { z } from "zod";
import { hasValidSecret } from "../auth.js";
import type { PlatformEnvironment } from "../config.js";
import { PaymentProviderError } from "../payments/providers/provider-error.js";
import { PaymentService, type MoneyLineItemInput } from "../payments/service.js";

const lineItemSchema = z.object({
  description: z.string().trim().min(2).max(240),
  quantity: z.number().int().min(1).max(1000).default(1),
  unitAmountMinor: z.string().regex(/^[1-9]\d{0,14}$/),
});

const engagementSchema = z.object({
  leadReference: z.string().trim().min(5).max(40),
  serviceType: z.string().trim().min(2).max(160),
  scopeSummary: z.string().trim().min(20).max(5000),
  timeline: z.string().trim().min(2).max(240),
  engagementType: z.enum(["FIXED_SCOPE", "RETAINER", "DAY_RATE_ADVISORY"]),
  agreementConfirmed: z.literal(true),
  agreementReference: z.string().trim().min(3).max(240),
  lineItems: z.array(lineItemSchema).min(1).max(50),
});

const invoiceSchema = z.object({
  engagementReference: z.string().trim().min(5).max(40),
  dueAt: z.iso.datetime(),
  lineItems: z.array(lineItemSchema).min(1).max(50),
});

function convertLineItems(items: z.infer<typeof lineItemSchema>[]): MoneyLineItemInput[] {
  return items.map((item) => ({
    description: item.description,
    quantity: item.quantity,
    unitAmountMinor: BigInt(item.unitAmountMinor),
  }));
}

function statusForError(error: unknown) {
  const message = error instanceof Error ? error.message : "unknown";
  if (["lead_not_found", "engagement_not_found", "invoice_not_found"].includes(message)) return 404;
  if (
    [
      "lead_not_fit",
      "engagement_not_active",
      "invoice_not_payable",
      "settlement_mismatch",
    ].includes(message)
  ) return 409;
  if (["providers_not_ready", "provider_not_ready"].includes(message)) return 503;
  return 500;
}

export async function registerPaymentRoutes(
  app: FastifyInstance,
  prisma: PrismaClient,
  resend: Resend,
  env: PlatformEnvironment,
) {
  const payments = new PaymentService(prisma, resend, env);
  const requireInternalAuth = (authorization: string | undefined) =>
    hasValidSecret(authorization, env.API_SHARED_SECRET);

  app.get("/v1/admin/payments/readiness", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    return reply.send(payments.readiness);
  });

  app.patch("/v1/admin/leads/:reference/fit", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parameters = z.object({ reference: z.string().min(5).max(40) }).safeParse(request.params);
    const body = z.object({ fitStatus: z.enum(["FIT", "NOT_FIT"]) }).safeParse(request.body);
    if (!parameters.success || !body.success) {
      return reply.code(400).send({ error: "Lead fit update is invalid." });
    }
    try {
      return reply.send(await payments.setLeadFit(parameters.data.reference, body.data.fitStatus));
    } catch {
      return reply.code(404).send({ error: "Lead not found." });
    }
  });

  app.post("/v1/admin/engagements", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parsed = engagementSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "Accepted proposal details are invalid." });
    }
    try {
      const result = await payments.createEngagement({
        leadReference: parsed.data.leadReference,
        serviceType: parsed.data.serviceType,
        scopeSummary: parsed.data.scopeSummary,
        timeline: parsed.data.timeline,
        engagementType: parsed.data.engagementType as EngagementType,
        agreementReference: parsed.data.agreementReference,
        lineItems: convertLineItems(parsed.data.lineItems),
      });
      return reply.code(201).send(result);
    } catch (error) {
      const status = statusForError(error);
      const message = error instanceof Error && error.message === "lead_not_fit"
        ? "The lead must be marked fit before recording an engagement."
        : "The engagement could not be created.";
      return reply.code(status).send({ error: message });
    }
  });

  app.post("/v1/admin/invoices", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parsed = invoiceSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "Invoice details are invalid." });
    }
    const dueAt = new Date(parsed.data.dueAt);
    if (dueAt.getTime() <= Date.now()) {
      return reply.code(400).send({ error: "Invoice due date must be in the future." });
    }
    try {
      return reply.code(201).send(
        await payments.createInvoice({
          engagementReference: parsed.data.engagementReference,
          dueAt,
          lineItems: convertLineItems(parsed.data.lineItems),
        }),
      );
    } catch (error) {
      const status = statusForError(error);
      const message = status === 503
        ? "Both payment providers must be ready before an invoice can be sent."
        : "The invoice could not be created.";
      return reply.code(status).send({ error: message });
    }
  });

  app.get("/v1/payment-links/:token", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parameters = z.object({ token: z.string().min(40).max(60) }).safeParse(request.params);
    if (!parameters.success) return reply.code(404).send({ error: "Invoice not found." });
    const invoice = await payments.getInvoice(parameters.data.token);
    return invoice ? reply.send(invoice) : reply.code(404).send({ error: "Invoice not found." });
  });

  app.post("/v1/payment-links/:token/checkout", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parameters = z.object({ token: z.string().min(40).max(60) }).safeParse(request.params);
    const body = z.object({ provider: z.enum(["PAYSTACK", "BTCPAY"]) }).safeParse(request.body);
    if (!parameters.success || !body.success) {
      return reply.code(400).send({ error: "Checkout request is invalid." });
    }
    try {
      return reply.send(
        await payments.initializeCheckout(parameters.data.token, body.data.provider as PaymentProvider),
      );
    } catch (error) {
      const status = statusForError(error);
      const message = status === 503
        ? "Payment providers are not connected yet."
        : status === 409
          ? "This invoice is not available for payment."
          : "Checkout could not be initialized.";
      request.log.error({ error }, "Payment checkout initialization failed");
      return reply.code(status).send({ error: message });
    }
  });

  app.post("/v1/payment-links/:token/refresh", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parameters = z.object({ token: z.string().min(40).max(60) }).safeParse(request.params);
    if (!parameters.success) return reply.code(404).send({ error: "Invoice not found." });
    try {
      return reply.send(await payments.refreshInvoice(parameters.data.token));
    } catch (error) {
      request.log.error({ error }, "Payment status refresh failed");
      return reply.code(statusForError(error)).send({ error: "Payment status could not be refreshed." });
    }
  });

  const registerWebhookEndpoints = async (webhooks: FastifyInstance) => {
    webhooks.removeContentTypeParser("application/json");
    webhooks.addContentTypeParser(
      "application/json",
      { parseAs: "buffer" },
      (_request, body, done) => done(null, body),
    );

    webhooks.post("/paystack", async (request, reply) => {
      try {
        const result = await payments.handlePaystackWebhook(
          request.body as Buffer,
          request.headers["x-paystack-signature"] as string | undefined,
        );
        return reply.send({ received: true, result });
      } catch (error) {
        const message = error instanceof Error ? error.message : "unknown";
        if (message === "invalid_signature") return reply.code(401).send({ error: "Invalid signature." });
        if (message === "provider_not_ready") return reply.code(503).send({ error: "Provider unavailable." });
        request.log.error({ error }, "Paystack webhook processing failed");
        return reply.code(500).send({ error: "Webhook processing failed." });
      }
    });

    webhooks.post("/btcpay", async (request, reply) => {
      try {
        const result = await payments.handleBtcpayWebhook(
          request.body as Buffer,
          request.headers["btcpay-sig"] as string | undefined,
        );
        return reply.send({ received: true, result });
      } catch (error) {
        const message = error instanceof Error ? error.message : "unknown";
        if (message === "invalid_signature") return reply.code(401).send({ error: "Invalid signature." });
        if (message === "provider_not_ready") return reply.code(503).send({ error: "Provider unavailable." });
        request.log.error({ error }, "BTCPay webhook processing failed");
        return reply.code(500).send({ error: "Webhook processing failed." });
      }
    });
  };

  await app.register(registerWebhookEndpoints, { prefix: "/v1/webhooks" });
  await app.register(registerWebhookEndpoints, { prefix: "/webhooks" });
}
