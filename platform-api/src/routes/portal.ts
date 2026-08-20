import type {
  DeliverableStatus,
  EngagementMilestoneStatus,
  PaymentProvider,
  PrismaClient,
} from "@prisma/client";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { hasValidSecret } from "../auth.js";
import type { PlatformEnvironment } from "../config.js";
import { PaymentService } from "../payments/service.js";
import { PortalService } from "../portal/service.js";

const referenceSchema = z.object({ reference: z.string().trim().min(5).max(40) });
const invoiceReferenceSchema = z.object({ reference: z.string().trim().min(5).max(40) });
const userHeaderSchema = z.string().trim().min(2).max(80);

const verifySchema = z.object({
  email: z.email().max(254),
  password: z.string().min(8).max(256),
});

const googleIdentitySchema = z.object({
  email: z.email().max(254),
});

const provisionUserSchema = z.object({
  engagementReference: z.string().trim().min(5).max(40),
  email: z.email().max(254),
  name: z.string().trim().min(2).max(120),
});

const milestoneSchema = z.object({
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().max(2000).optional(),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "BLOCKED", "COMPLETE"]).optional(),
  dueAt: z.iso.datetime().optional(),
  position: z.number().int().min(0).max(200).optional(),
});

const milestonePatchSchema = z.object({
  title: z.string().trim().min(2).max(160).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "BLOCKED", "COMPLETE"]).optional(),
  dueAt: z.iso.datetime().nullable().optional(),
  position: z.number().int().min(0).max(200).optional(),
});

const deliverableSchema = z.object({
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().max(2000).optional(),
  url: z.url().max(1000).optional(),
  milestoneId: z.string().trim().min(5).max(80).optional(),
  status: z.enum(["DRAFT", "SHARED", "ACCEPTED", "SUPERSEDED"]).optional(),
});

const messageSchema = z.object({
  engagementReference: z.string().trim().min(5).max(40),
  body: z.string().trim().min(1).max(5000),
});

const checkoutSchema = z.object({
  provider: z.enum(["PAYSTACK", "BTCPAY"]),
});

function statusForError(error: unknown) {
  const message = error instanceof Error ? error.message : "unknown";
  if (
    [
      "engagement_not_found",
      "invoice_not_found",
      "milestone_not_found",
      "portal_user_not_found",
    ].includes(message)
  ) {
    return 404;
  }
  if (["invoice_not_payable"].includes(message)) return 409;
  if (["providers_not_ready", "provider_not_ready"].includes(message)) return 503;
  return 500;
}

export async function registerPortalRoutes(
  app: FastifyInstance,
  prisma: PrismaClient,
  payments: PaymentService,
  env: PlatformEnvironment,
) {
  const portal = new PortalService(prisma, payments);
  const requireInternalAuth = (authorization: string | undefined) =>
    hasValidSecret(authorization, env.API_SHARED_SECRET);

  const userIdFromHeader = (value: string | string[] | undefined) => {
    const candidate = Array.isArray(value) ? value[0] : value;
    const parsed = userHeaderSchema.safeParse(candidate);
    return parsed.success ? parsed.data : null;
  };

  app.post("/v1/portal/auth/verify", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parsed = verifySchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: "Credentials are invalid." });
    const user = await portal.verifyCredentials(parsed.data.email, parsed.data.password);
    return user ? reply.send(user) : reply.code(401).send({ error: "Credentials are invalid." });
  });

  app.post("/v1/portal/auth/google", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parsed = googleIdentitySchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: "Google identity is invalid." });
    const user = await portal.resolveGoogleIdentity(parsed.data.email);
    return user ? reply.send(user) : reply.code(401).send({ error: "Portal access has not been provisioned." });
  });

  app.post("/v1/admin/portal-users", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parsed = provisionUserSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: "Portal user details are invalid." });
    try {
      return reply.code(201).send(await portal.provisionUser(parsed.data));
    } catch (error) {
      return reply.code(statusForError(error)).send({ error: "Portal user could not be provisioned." });
    }
  });

  app.post("/v1/admin/engagements/:reference/milestones", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parameters = referenceSchema.safeParse(request.params);
    const body = milestoneSchema.safeParse(request.body);
    if (!parameters.success || !body.success) {
      return reply.code(400).send({ error: "Milestone details are invalid." });
    }
    try {
      return reply.code(201).send(
        await portal.createMilestone(parameters.data.reference, {
          title: body.data.title,
          description: body.data.description,
          status: body.data.status as EngagementMilestoneStatus | undefined,
          dueAt: body.data.dueAt ? new Date(body.data.dueAt) : undefined,
          position: body.data.position,
        }),
      );
    } catch (error) {
      return reply.code(statusForError(error)).send({ error: "Milestone could not be created." });
    }
  });

  app.patch("/v1/admin/engagements/:reference/milestones/:milestoneId", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parameters = z.object({
      reference: z.string().trim().min(5).max(40),
      milestoneId: z.string().trim().min(5).max(80),
    }).safeParse(request.params);
    const body = milestonePatchSchema.safeParse(request.body);
    if (!parameters.success || !body.success) {
      return reply.code(400).send({ error: "Milestone update is invalid." });
    }
    try {
      return reply.send(
        await portal.updateMilestone(parameters.data.reference, parameters.data.milestoneId, {
          title: body.data.title,
          description: body.data.description,
          status: body.data.status as EngagementMilestoneStatus | undefined,
          dueAt: body.data.dueAt === undefined
            ? undefined
            : body.data.dueAt === null
              ? null
              : new Date(body.data.dueAt),
          position: body.data.position,
        }),
      );
    } catch (error) {
      return reply.code(statusForError(error)).send({ error: "Milestone could not be updated." });
    }
  });

  app.post("/v1/admin/engagements/:reference/deliverables", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parameters = referenceSchema.safeParse(request.params);
    const body = deliverableSchema.safeParse(request.body);
    if (!parameters.success || !body.success) {
      return reply.code(400).send({ error: "Deliverable details are invalid." });
    }
    try {
      return reply.code(201).send(
        await portal.createDeliverable(parameters.data.reference, {
          title: body.data.title,
          description: body.data.description,
          url: body.data.url,
          milestoneId: body.data.milestoneId,
          status: body.data.status as DeliverableStatus | undefined,
        }),
      );
    } catch (error) {
      return reply.code(statusForError(error)).send({ error: "Deliverable could not be created." });
    }
  });

  app.post("/v1/admin/engagements/:reference/messages", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parameters = referenceSchema.safeParse(request.params);
    const body = z.object({ body: z.string().trim().min(1).max(5000) }).safeParse(request.body);
    if (!parameters.success || !body.success) {
      return reply.code(400).send({ error: "Message details are invalid." });
    }
    try {
      return reply.code(201).send(await portal.createAdminMessage(parameters.data.reference, body.data.body));
    } catch (error) {
      return reply.code(statusForError(error)).send({ error: "Message could not be recorded." });
    }
  });

  app.get("/v1/portal/overview", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const userId = userIdFromHeader(request.headers["x-novyrix-portal-user-id"]);
    if (!userId) return reply.code(401).send({ error: "Portal user is required." });
    const overview = await portal.overview(userId);
    return overview ? reply.send(overview) : reply.code(401).send({ error: "Portal user is invalid." });
  });

  app.get("/v1/portal/engagements/:reference", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const userId = userIdFromHeader(request.headers["x-novyrix-portal-user-id"]);
    const parameters = referenceSchema.safeParse(request.params);
    if (!userId) return reply.code(401).send({ error: "Portal user is required." });
    if (!parameters.success) return reply.code(404).send({ error: "Engagement not found." });
    const engagement = await portal.getEngagement(userId, parameters.data.reference);
    return engagement ? reply.send(engagement) : reply.code(404).send({ error: "Engagement not found." });
  });

  app.get("/v1/portal/invoices", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const userId = userIdFromHeader(request.headers["x-novyrix-portal-user-id"]);
    if (!userId) return reply.code(401).send({ error: "Portal user is required." });
    return reply.send(await portal.listInvoices(userId));
  });

  app.post("/v1/portal/invoices/:reference/checkout", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const userId = userIdFromHeader(request.headers["x-novyrix-portal-user-id"]);
    const parameters = invoiceReferenceSchema.safeParse(request.params);
    const body = checkoutSchema.safeParse(request.body);
    if (!userId) return reply.code(401).send({ error: "Portal user is required." });
    if (!parameters.success || !body.success) {
      return reply.code(400).send({ error: "Checkout request is invalid." });
    }
    try {
      return reply.send(
        await portal.initializeInvoiceCheckout(
          userId,
          parameters.data.reference,
          body.data.provider as PaymentProvider,
        ),
      );
    } catch (error) {
      const status = statusForError(error);
      const message = status === 503
        ? "Payment providers are not connected yet."
        : status === 409
          ? "This invoice is not available for payment."
          : "Checkout could not be initialized.";
      return reply.code(status).send({ error: message });
    }
  });

  app.get("/v1/portal/messages", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const userId = userIdFromHeader(request.headers["x-novyrix-portal-user-id"]);
    const query = z.object({
      engagementReference: z.string().trim().min(5).max(40).optional(),
    }).safeParse(request.query);
    if (!userId) return reply.code(401).send({ error: "Portal user is required." });
    if (!query.success) return reply.code(400).send({ error: "Message filters are invalid." });
    return reply.send(await portal.listMessages(userId, query.data.engagementReference));
  });

  app.post("/v1/portal/messages", async (request, reply) => {
    if (!requireInternalAuth(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const userId = userIdFromHeader(request.headers["x-novyrix-portal-user-id"]);
    const body = messageSchema.safeParse(request.body);
    if (!userId) return reply.code(401).send({ error: "Portal user is required." });
    if (!body.success) return reply.code(400).send({ error: "Message details are invalid." });
    try {
      return reply.code(201).send(await portal.addClientMessage(userId, body.data));
    } catch (error) {
      return reply.code(statusForError(error)).send({ error: "Message could not be recorded." });
    }
  });
}
