import { randomBytes } from "node:crypto";
import { PrismaClient, type OrganizationType } from "@prisma/client";
import Fastify from "fastify";
import { Resend } from "resend";
import { z } from "zod";
import { hasValidSecret } from "./auth.js";
import { env } from "./config.js";
import { PaymentService } from "./payments/service.js";
import { registerAdminRoutes } from "./routes/admin.js";
import { registerPaymentRoutes } from "./routes/payments.js";
import { registerPortalRoutes } from "./routes/portal.js";
const prisma = new PrismaClient();
const resend = new Resend(env.RESEND_API_KEY);
const app = Fastify({
  logger: true,
  bodyLimit: 64 * 1024,
  requestTimeout: 15_000,
});

const organizationTypes: Record<string, OrganizationType> = {
  ngo: "NGO",
  bitcoin_fintech: "BITCOIN_FINTECH",
  startup: "STARTUP",
  gov_adjacent: "GOV_ADJACENT",
  other: "OTHER",
};

const inquirySchema = z.object({
  contactName: z.string().trim().min(2).max(120),
  contactEmail: z.email().max(254),
  organizationName: z.string().trim().min(2).max(180),
  organizationType: z.enum(["ngo", "bitcoin_fintech", "startup", "gov_adjacent", "other"]),
  country: z.string().trim().min(2).max(120),
  services: z.array(z.string().trim().min(2).max(100)).min(1).max(10),
  problem: z.string().trim().min(40).max(5000),
  budget: z.string().trim().max(100).optional().default(""),
});

const eastAfricanCountries = new Set([
  "burundi",
  "djibouti",
  "eritrea",
  "ethiopia",
  "kenya",
  "rwanda",
  "somalia",
  "south sudan",
  "tanzania",
  "uganda",
]);

function resolveCurrency(country: string) {
  return eastAfricanCountries.has(country.trim().toLowerCase()) ? "KES" : "USD";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

app.get("/health", async (_request, reply) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return reply.code(200).send({ status: "ok" });
  } catch (error) {
    app.log.error({ error }, "Database health check failed");
    return reply.code(503).send({ status: "unavailable" });
  }
});

app.post("/v1/inquiries", async (request, reply) => {
  if (!hasValidSecret(request.headers.authorization, env.API_SHARED_SECRET)) {
    return reply.code(401).send({ error: "Unauthorized" });
  }

  const parsed = inquirySchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.code(400).send({ error: "Required inquiry details are missing or invalid." });
  }

  const payload = parsed.data;
  const reference = `NVX-${randomBytes(4).toString("hex").toUpperCase()}`;
  const currency = resolveCurrency(payload.country);

  const lead = await prisma.$transaction(async (transaction) => {
    const organization = await transaction.organization.create({
      data: {
        name: payload.organizationName,
        type: organizationTypes[payload.organizationType],
        country: payload.country,
        resolvedCurrency: currency,
      },
    });

    return transaction.lead.create({
      data: {
        reference,
        organizationId: organization.id,
        contactName: payload.contactName,
        contactEmail: payload.contactEmail.toLowerCase(),
        servicesOfInterest: payload.services,
        problemDescription: payload.problem,
        budgetRange: payload.budget || null,
      },
    });
  });

  const safe = {
    name: escapeHtml(payload.contactName),
    email: escapeHtml(payload.contactEmail),
    organization: escapeHtml(payload.organizationName),
    country: escapeHtml(payload.country),
    problem: escapeHtml(payload.problem),
    services: payload.services.map(escapeHtml),
    budget: escapeHtml(payload.budget || "Not provided"),
  };

  let notificationStatus: "FAILED" | "SENT" = "FAILED";
  try {
    const emailResult = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: env.ADMIN_EMAIL,
      replyTo: payload.contactEmail,
      subject: `New Novyrix inquiry ${reference}`,
      text: [
        `Reference: ${reference}`,
        `Contact: ${payload.contactName} <${payload.contactEmail}>`,
        `Organisation: ${payload.organizationName}`,
        `Type: ${payload.organizationType}`,
        `Location: ${payload.country}`,
        `Resolved currency: ${currency}`,
        `Services: ${payload.services.join(", ")}`,
        `Budget: ${payload.budget || "Not provided"}`,
        "",
        payload.problem,
      ].join("\n"),
      html: `
        <h1>New Novyrix inquiry</h1>
        <p><strong>Reference:</strong> ${reference}</p>
        <p><strong>Contact:</strong> ${safe.name} &lt;${safe.email}&gt;</p>
        <p><strong>Organisation:</strong> ${safe.organization}</p>
        <p><strong>Location:</strong> ${safe.country}</p>
        <p><strong>Resolved currency:</strong> ${currency}</p>
        <p><strong>Services:</strong> ${safe.services.join(", ")}</p>
        <p><strong>Budget:</strong> ${safe.budget}</p>
        <h2>Problem</h2>
        <p>${safe.problem.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (emailResult.error) {
      app.log.error({ reference, error: emailResult.error }, "Lead saved but notification failed");
    } else {
      notificationStatus = "SENT";
    }
  } catch (error) {
    app.log.error({ reference, error }, "Lead saved but notification request failed");
  }

  await prisma.lead.update({
    where: { id: lead.id },
    data: { notificationStatus },
  });

  return reply.code(202).send({
    accepted: true,
    reference,
    notificationAccepted: notificationStatus === "SENT",
  });
});

const paymentService = new PaymentService(prisma, resend, env);

await registerAdminRoutes(app, prisma, env);
await registerPaymentRoutes(app, prisma, resend, env);
await registerPortalRoutes(app, prisma, paymentService, env);

async function shutdown(signal: string) {
  app.log.info({ signal }, "Shutting down");
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

await app.listen({ host: "0.0.0.0", port: env.PORT });
