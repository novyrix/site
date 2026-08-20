import type { DiscoveryOutcome, FitStatus, PrismaClient } from "@prisma/client";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { AdminService } from "../admin/service.js";
import { hasValidSecret } from "../auth.js";
import type { PlatformEnvironment } from "../config.js";

const listQuerySchema = z.object({
  fitStatus: z.enum(["PENDING", "FIT", "NOT_FIT"]).optional(),
  discoveryOutcome: z.enum(["PROCEED", "FOLLOW_UP", "DECLINE"]).optional(),
  search: z.string().trim().max(120).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
});

const referenceSchema = z.object({ reference: z.string().trim().min(5).max(40) });

const discoverySchema = z.object({
  outcome: z.enum(["PROCEED", "FOLLOW_UP", "DECLINE"]),
  notes: z.string().trim().max(5000).default(""),
});

export async function registerAdminRoutes(
  app: FastifyInstance,
  prisma: PrismaClient,
  env: PlatformEnvironment,
) {
  const admin = new AdminService(prisma);
  const authorized = (authorization: string | undefined) =>
    hasValidSecret(authorization, env.API_SHARED_SECRET);

  app.get("/v1/admin/overview", async (request, reply) => {
    if (!authorized(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    return reply.send(await admin.overview());
  });

  app.get("/v1/admin/leads", async (request, reply) => {
    if (!authorized(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const query = listQuerySchema.safeParse(request.query);
    if (!query.success) return reply.code(400).send({ error: "Lead filters are invalid." });

    return reply.send(
      await admin.listLeads({
        fitStatus: query.data.fitStatus as FitStatus | undefined,
        discoveryOutcome: query.data.discoveryOutcome as DiscoveryOutcome | undefined,
        search: query.data.search,
        page: query.data.page,
        pageSize: query.data.pageSize,
      }),
    );
  });

  app.get("/v1/admin/leads/:reference", async (request, reply) => {
    if (!authorized(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parameters = referenceSchema.safeParse(request.params);
    if (!parameters.success) return reply.code(404).send({ error: "Lead not found." });
    const lead = await admin.getLead(parameters.data.reference);
    return lead ? reply.send(lead) : reply.code(404).send({ error: "Lead not found." });
  });

  app.patch("/v1/admin/leads/:reference/discovery", async (request, reply) => {
    if (!authorized(request.headers.authorization)) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    const parameters = referenceSchema.safeParse(request.params);
    const body = discoverySchema.safeParse(request.body);
    if (!parameters.success || !body.success) {
      return reply.code(400).send({ error: "Discovery outcome is invalid." });
    }
    try {
      return reply.send(
        await admin.setDiscovery(parameters.data.reference, {
          outcome: body.data.outcome as DiscoveryOutcome,
          notes: body.data.notes,
        }),
      );
    } catch {
      return reply.code(404).send({ error: "Lead not found." });
    }
  });
}
