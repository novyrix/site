import { randomBytes } from "node:crypto";
import {
  Prisma,
  PrismaClient,
  type EngagementType,
  type PaymentAttempt,
  type PaymentProvider,
} from "@prisma/client";
import type { Resend } from "resend";
import type { PlatformEnvironment } from "../config.js";
import { formatMinorAmount } from "./money.js";
import { BtcpayProvider } from "./providers/btcpay.js";
import { PaymentProviderError } from "./providers/provider-error.js";
import { PaystackProvider } from "./providers/paystack.js";
import { createPaymentToken, hashPaymentToken, hashPayload, verifyHmacSignature } from "./security.js";
import type { PaymentProviderAdapter, VerifiedPayment } from "./types.js";

const invoiceInclude = Prisma.validator<Prisma.InvoiceInclude>()({
  lineItems: { orderBy: { position: "asc" } },
  engagement: {
    include: {
      organization: true,
      proposal: { include: { lead: true } },
    },
  },
  payments: { orderBy: { paidAt: "asc" } },
  paymentAttempts: { orderBy: { createdAt: "desc" } },
});

type InvoiceRecord = Prisma.InvoiceGetPayload<{ include: typeof invoiceInclude }>;

export type MoneyLineItemInput = {
  description: string;
  quantity: number;
  unitAmountMinor: bigint;
};

export type ProviderReadiness = {
  paymentsLive: boolean;
  allReady: boolean;
  paystack: { configured: boolean; ready: boolean };
  btcpay: { configured: boolean; ready: boolean };
};

function reference(prefix: string) {
  return `${prefix}-${randomBytes(5).toString("hex").toUpperCase()}`;
}

function lineTotal(item: MoneyLineItemInput) {
  return item.unitAmountMinor * BigInt(item.quantity);
}

function totalFor(items: MoneyLineItemInput[]) {
  return items.reduce((total, item) => total + lineTotal(item), 0n);
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

function paymentReturnUrl(baseUrl: string, paymentToken: string, provider: PaymentProvider) {
  const paymentBaseUrl = baseUrl.replace(/\/$/, "");
  if (provider === "PAYSTACK") {
    return `${paymentBaseUrl}/paystack/callback?token=${encodeURIComponent(paymentToken)}`;
  }
  return `${paymentBaseUrl}/pay/${paymentToken}?returned=${provider.toLowerCase()}`;
}

function portalPaymentReturnUrl(baseUrl: string, invoiceReference: string, provider: PaymentProvider) {
  const paymentBaseUrl = baseUrl.replace(/\/$/, "");
  return `${paymentBaseUrl}/portal/invoices?invoice=${encodeURIComponent(invoiceReference)}&returned=${provider.toLowerCase()}`;
}

export class PaymentService {
  private readonly providers = new Map<PaymentProvider, PaymentProviderAdapter>();
  readonly readiness: ProviderReadiness;

  constructor(
    private readonly prisma: PrismaClient,
    private readonly resend: Resend,
    private readonly env: PlatformEnvironment,
  ) {
    const paystackConfigured = Boolean(env.PAYSTACK_SECRET_KEY);
    const btcpayConfigured = Boolean(
      env.BTCPAY_BASE_URL && env.BTCPAY_API_KEY && env.BTCPAY_STORE_ID && env.BTCPAY_WEBHOOK_SECRET,
    );

    if (env.PAYMENTS_LIVE && env.PAYSTACK_SECRET_KEY) {
      this.providers.set(
        "PAYSTACK",
        new PaystackProvider(env.PAYSTACK_SECRET_KEY, env.PAYSTACK_BASE_URL),
      );
    }
    if (
      env.PAYMENTS_LIVE &&
      env.BTCPAY_BASE_URL &&
      env.BTCPAY_API_KEY &&
      env.BTCPAY_STORE_ID &&
      env.BTCPAY_WEBHOOK_SECRET
    ) {
      this.providers.set(
        "BTCPAY",
        new BtcpayProvider(env.BTCPAY_BASE_URL, env.BTCPAY_API_KEY, env.BTCPAY_STORE_ID),
      );
    }

    const paystackReady = this.providers.has("PAYSTACK");
    const btcpayReady = this.providers.has("BTCPAY");
    this.readiness = {
      paymentsLive: env.PAYMENTS_LIVE,
      allReady: paystackReady && btcpayReady,
      paystack: { configured: paystackConfigured, ready: paystackReady },
      btcpay: { configured: btcpayConfigured, ready: btcpayReady },
    };
  }

  async setLeadFit(referenceValue: string, fitStatus: "FIT" | "NOT_FIT") {
    return this.prisma.lead.update({
      where: { reference: referenceValue },
      data: { fitStatus },
      select: { reference: true, fitStatus: true, updatedAt: true },
    });
  }

  async createEngagement(input: {
    leadReference: string;
    serviceType: string;
    scopeSummary: string;
    timeline: string;
    engagementType: EngagementType;
    agreementReference: string;
    lineItems: MoneyLineItemInput[];
  }) {
    const lead = await this.prisma.lead.findUnique({
      where: { reference: input.leadReference },
      include: { organization: true },
    });
    if (!lead) throw new Error("lead_not_found");
    if (lead.fitStatus !== "FIT") throw new Error("lead_not_fit");

    const totalAmountMinor = totalFor(input.lineItems);
    const proposalReference = reference("PROP");
    const engagementReference = reference("ENG");

    return this.prisma.$transaction(async (transaction) => {
      const proposal = await transaction.proposal.create({
        data: {
          reference: proposalReference,
          leadId: lead.id,
          serviceType: input.serviceType,
          scopeSummary: input.scopeSummary,
          timeline: input.timeline,
          engagementType: input.engagementType,
          currency: lead.organization.resolvedCurrency,
          totalAmountMinor,
          status: "ACCEPTED",
          acceptedAt: new Date(),
          lineItems: {
            create: input.lineItems.map((item, position) => ({
              description: item.description,
              quantity: item.quantity,
              unitAmountMinor: item.unitAmountMinor,
              totalAmountMinor: lineTotal(item),
              position,
            })),
          },
        },
      });

      const engagement = await transaction.engagement.create({
        data: {
          reference: engagementReference,
          organizationId: lead.organizationId,
          proposalId: proposal.id,
          type: input.engagementType,
          agreementReference: input.agreementReference,
          agreementConfirmedAt: new Date(),
        },
      });

      return {
        proposalReference,
        engagementReference,
        currency: lead.organization.resolvedCurrency,
        totalAmountMinor: totalAmountMinor.toString(),
        status: engagement.status,
        agreementReference: engagement.agreementReference,
        agreementConfirmedAt: engagement.agreementConfirmedAt,
      };
    });
  }

  async createInvoice(input: {
    engagementReference: string;
    dueAt: Date;
    lineItems: MoneyLineItemInput[];
  }) {
    const engagement = await this.prisma.engagement.findUnique({
      where: { reference: input.engagementReference },
      include: { organization: true, proposal: { include: { lead: true } } },
    });
    if (!engagement) throw new Error("engagement_not_found");
    if (engagement.status !== "ACTIVE") throw new Error("engagement_not_active");
    if (!this.readiness.allReady) throw new Error("providers_not_ready");

    const totalAmountMinor = totalFor(input.lineItems);
    const invoiceReference = reference("INV");
    const paymentToken = createPaymentToken();
    const paymentTokenHash = hashPaymentToken(paymentToken, this.env.PAYMENT_LINK_SECRET);

    const invoice = await this.prisma.invoice.create({
      data: {
        reference: invoiceReference,
        engagementId: engagement.id,
        currency: engagement.organization.resolvedCurrency,
        totalAmountMinor,
        paymentTokenHash,
        dueAt: input.dueAt,
        lineItems: {
          create: input.lineItems.map((item, position) => ({
            description: item.description,
            quantity: item.quantity,
            unitAmountMinor: item.unitAmountMinor,
            totalAmountMinor: lineTotal(item),
            position,
          })),
        },
      },
    });

    const paymentUrl = `${this.env.PAYMENT_SITE_URL.replace(/\/$/, "")}/pay/${paymentToken}`;
    const currency = engagement.organization.resolvedCurrency;
    const total = `${currency} ${formatMinorAmount(totalAmountMinor, currency)}`;
    const dueDate = new Intl.DateTimeFormat("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Africa/Nairobi",
    }).format(input.dueAt);
    const lineText = input.lineItems.map(
      (item) => `- ${item.description}: ${currency} ${formatMinorAmount(lineTotal(item), currency)}`,
    );
    const lineHtml = input.lineItems.map(
      (item) =>
        `<li>${escapeHtml(item.description)}: ${currency} ${formatMinorAmount(lineTotal(item), currency)}</li>`,
    ).join("");
    let notificationStatus: "SENT" | "FAILED" = "FAILED";

    try {
      const result = await this.resend.emails.send({
        from: this.env.RESEND_FROM_EMAIL,
        to: engagement.proposal.lead.contactEmail,
        replyTo: this.env.ADMIN_EMAIL,
        subject: `Novyrix invoice ${invoice.reference}`,
        text: [
          `Hello ${engagement.proposal.lead.contactName},`,
          "",
          `Invoice: ${invoice.reference}`,
          `Engagement: ${engagement.proposal.serviceType}`,
          `Due: ${dueDate}`,
          ...lineText,
          `Total: ${total}`,
          "",
          `Review and pay securely: ${paymentUrl}`,
          "",
          "Questions? Reply to this email or contact connect@novyrix.com.",
        ].join("\n"),
        html: `<h1>Invoice ${escapeHtml(invoice.reference)}</h1><p>Hello ${escapeHtml(engagement.proposal.lead.contactName)},</p><p>Your itemized Novyrix invoice for <strong>${escapeHtml(engagement.proposal.serviceType)}</strong> is ready.</p><ul>${lineHtml}</ul><p><strong>Total: ${total}</strong><br>Due: ${dueDate}</p><p><a href="${escapeHtml(paymentUrl)}">Review and pay securely</a></p><p>Questions? Reply to this email or contact connect@novyrix.com.</p>`,
      });
      if (!result.error) notificationStatus = "SENT";
    } catch {
      notificationStatus = "FAILED";
    }

    const notificationSentAt = notificationStatus === "SENT" ? new Date() : null;
    await this.prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        notificationStatus,
        notificationSentAt,
        sentAt: notificationSentAt,
      },
    });

    return {
      reference: invoice.reference,
      status: invoice.status,
      currency: invoice.currency,
      totalAmountMinor: invoice.totalAmountMinor.toString(),
      dueAt: invoice.dueAt,
      paymentUrl,
      providersReady: this.readiness.allReady,
      notificationAccepted: notificationStatus === "SENT",
    };
  }

  private async findInvoiceByToken(paymentToken: string) {
    if (!/^[A-Za-z0-9_-]{43}$/.test(paymentToken)) return null;
    const paymentTokenHash = hashPaymentToken(paymentToken, this.env.PAYMENT_LINK_SECRET);
    const invoice = await this.prisma.invoice.findUnique({
      where: { paymentTokenHash },
      include: invoiceInclude,
    });
    return this.markOverdueIfNeeded(invoice);
  }

  private async findInvoiceByReference(invoiceReference: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { reference: invoiceReference },
      include: invoiceInclude,
    });
    return this.markOverdueIfNeeded(invoice);
  }

  private async markOverdueIfNeeded(invoice: InvoiceRecord | null) {
    if (invoice?.status === "PENDING" && invoice.dueAt.getTime() < Date.now()) {
      invoice.status = "OVERDUE";
      await this.prisma.invoice.update({
        where: { id: invoice.id },
        data: { status: "OVERDUE" },
      });
    }
    return invoice;
  }

  private serializeInvoice(invoice: InvoiceRecord) {
    return {
      reference: invoice.reference,
      status: invoice.status,
      currency: invoice.currency,
      totalAmountMinor: invoice.totalAmountMinor.toString(),
      dueAt: invoice.dueAt,
      paidAt: invoice.paidAt,
      paymentMethod: invoice.paymentMethod,
      organizationName: invoice.engagement.organization.name,
      serviceType: invoice.engagement.proposal.serviceType,
      lineItems: invoice.lineItems.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unitAmountMinor: item.unitAmountMinor.toString(),
        totalAmountMinor: item.totalAmountMinor.toString(),
      })),
      providers: {
        paystack: {
          label: "Card / M-Pesa",
          available: this.readiness.allReady,
        },
        btcpay: {
          label: "Bitcoin / Lightning",
          available: this.readiness.allReady,
        },
      },
    };
  }

  async getInvoice(paymentToken: string) {
    const invoice = await this.findInvoiceByToken(paymentToken);
    return invoice ? this.serializeInvoice(invoice) : null;
  }

  async initializeCheckout(paymentToken: string, providerName: PaymentProvider) {
    const invoice = await this.findInvoiceByToken(paymentToken);
    if (!invoice) throw new Error("invoice_not_found");
    return this.initializeCheckoutForInvoiceRecord(
      invoice,
      providerName,
      paymentReturnUrl(this.env.PAYMENT_SITE_URL, paymentToken, providerName),
    );
  }

  async initializeCheckoutForInvoiceReference(
    invoiceReference: string,
    providerName: PaymentProvider,
  ) {
    const invoice = await this.findInvoiceByReference(invoiceReference);
    if (!invoice) throw new Error("invoice_not_found");
    return this.initializeCheckoutForInvoiceRecord(
      invoice,
      providerName,
      portalPaymentReturnUrl(this.env.PAYMENT_SITE_URL, invoice.reference, providerName),
    );
  }

  private async initializeCheckoutForInvoiceRecord(
    invoice: InvoiceRecord,
    providerName: PaymentProvider,
    returnUrl: string,
  ) {
    if (["PAID", "OVERPAID", "VOID"].includes(invoice.status)) {
      throw new Error("invoice_not_payable");
    }
    if (!this.readiness.allReady) throw new Error("providers_not_ready");

    const provider = this.providers.get(providerName);
    if (!provider) throw new Error("provider_not_ready");

    const reusableAttempt = invoice.paymentAttempts.find(
      (attempt) =>
        attempt.provider === providerName &&
        ["PENDING", "PROCESSING"].includes(attempt.status) &&
        attempt.checkoutUrl &&
        (!attempt.expiresAt || attempt.expiresAt.getTime() > Date.now()),
    );
    if (reusableAttempt?.checkoutUrl) {
      return {
        provider: providerName,
        checkoutUrl: reusableAttempt.checkoutUrl,
        attemptReference: reusableAttempt.reference,
        reused: true,
      };
    }

    const attemptReference = reference(providerName === "PAYSTACK" ? "PSTK" : "BTCP");
    const attempt = await this.prisma.paymentAttempt.create({
      data: {
        invoiceId: invoice.id,
        provider: providerName,
        reference: attemptReference,
        amountMinor: invoice.totalAmountMinor,
        currency: invoice.currency,
      },
    });

    try {
      const initialized = await provider.initialize({
        amountMinor: invoice.totalAmountMinor,
        currency: invoice.currency,
        customerEmail: invoice.engagement.proposal.lead.contactEmail,
        invoiceReference: invoice.reference,
        attemptReference,
        returnUrl,
      });
      await this.prisma.paymentAttempt.update({
        where: { id: attempt.id },
        data: {
          providerReference: initialized.providerReference,
          checkoutUrl: initialized.checkoutUrl,
          providerStatus: initialized.providerStatus,
          expiresAt: initialized.expiresAt,
          status: "PROCESSING",
        },
      });
      return {
        provider: providerName,
        checkoutUrl: initialized.checkoutUrl,
        attemptReference,
        reused: false,
      };
    } catch (error) {
      const failureCode = error instanceof PaymentProviderError ? error.code : "provider_initialize";
      await this.prisma.paymentAttempt.update({
        where: { id: attempt.id },
        data: { status: "FAILED", failureCode },
      });
      throw error;
    }
  }

  private async sendReceipt(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        invoice: {
          include: {
            lineItems: { orderBy: { position: "asc" } },
            engagement: { include: { proposal: { include: { lead: true } }, organization: true } },
          },
        },
      },
    });
    if (!payment || payment.receiptNotificationStatus === "SENT") return;

    const amount = `${payment.currency} ${formatMinorAmount(payment.amountMinor, payment.currency)}`;
    const clientName = escapeHtml(payment.invoice.engagement.proposal.lead.contactName);
    const invoiceReference = escapeHtml(payment.invoice.reference);
    const receiptReference = escapeHtml(payment.receiptReference);
    const lines = payment.invoice.lineItems
      .map(
        (item) =>
          `<li>${escapeHtml(item.description)}: ${payment.currency} ${formatMinorAmount(item.totalAmountMinor, payment.currency)}</li>`,
      )
      .join("");

    try {
      const result = await this.resend.emails.send({
        from: this.env.RESEND_FROM_EMAIL,
        to: payment.invoice.engagement.proposal.lead.contactEmail,
        replyTo: this.env.ADMIN_EMAIL,
        subject: `Novyrix payment receipt ${payment.receiptReference}`,
        text: [
          `Hello ${payment.invoice.engagement.proposal.lead.contactName},`,
          "",
          `Payment received: ${amount}`,
          `Invoice: ${payment.invoice.reference}`,
          `Receipt: ${payment.receiptReference}`,
          `Method: ${payment.provider}`,
          "",
          "Thank you.",
        ].join("\n"),
        html: `<h1>Payment received</h1><p>Hello ${clientName},</p><p>We received <strong>${amount}</strong> for invoice <strong>${invoiceReference}</strong>.</p><ul>${lines}</ul><p>Receipt: <strong>${receiptReference}</strong></p>`,
      });
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: result.error
          ? { receiptNotificationStatus: "FAILED" }
          : { receiptNotificationStatus: "SENT", receiptSentAt: new Date() },
      });
    } catch {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { receiptNotificationStatus: "FAILED" },
      });
    }
  }

  private async applyVerification(attempt: PaymentAttempt, verified: VerifiedPayment) {
    const status = verified.state === "paid"
      ? "PAID"
      : verified.state === "failed"
        ? "FAILED"
        : verified.state === "expired"
          ? "EXPIRED"
          : "PROCESSING";

    if (verified.state !== "paid") {
      await this.prisma.paymentAttempt.update({
        where: { id: attempt.id },
        data: {
          status,
          providerStatus: verified.providerStatus,
          lastVerifiedAt: new Date(),
        },
      });
      return null;
    }

    if (
      !verified.providerPaymentId ||
      verified.amountMinor !== attempt.amountMinor ||
      verified.currency !== attempt.currency
    ) {
      await this.prisma.paymentAttempt.update({
        where: { id: attempt.id },
        data: {
          status: "FAILED",
          providerStatus: verified.providerStatus,
          failureCode: "settlement_mismatch",
          lastVerifiedAt: new Date(),
        },
      });
      throw new Error("settlement_mismatch");
    }
    const providerPaymentId = verified.providerPaymentId;

    const result = await this.prisma.$transaction(async (transaction) => {
      await transaction.$queryRaw`SELECT "id" FROM "Invoice" WHERE "id" = ${attempt.invoiceId} FOR UPDATE`;
      const existingAttemptPayment = await transaction.payment.findUnique({
        where: { attemptId: attempt.id },
      });
      if (existingAttemptPayment) return { payment: existingAttemptPayment, created: false };

      const existingProviderPayment = await transaction.payment.findUnique({
        where: {
          provider_providerPaymentId: {
            provider: attempt.provider,
            providerPaymentId,
          },
        },
      });
      if (existingProviderPayment) return { payment: existingProviderPayment, created: false };

      const existingPaymentCount = await transaction.payment.count({
        where: { invoiceId: attempt.invoiceId },
      });
      const paidAt = verified.paidAt || new Date();
      const payment = await transaction.payment.create({
        data: {
          invoiceId: attempt.invoiceId,
          attemptId: attempt.id,
          provider: attempt.provider,
          providerPaymentId,
          amountMinor: attempt.amountMinor,
          currency: attempt.currency,
          channel: verified.channel,
          receiptReference: reference("RCPT"),
          paidAt,
        },
      });

      await transaction.paymentAttempt.update({
        where: { id: attempt.id },
        data: {
          status: "PAID",
          providerStatus: verified.providerStatus,
          lastVerifiedAt: new Date(),
        },
      });
      await transaction.invoice.update({
        where: { id: attempt.invoiceId },
        data: {
          status: existingPaymentCount > 0 ? "OVERPAID" : "PAID",
          paymentMethod: existingPaymentCount > 0 ? undefined : attempt.provider,
          paidAt: existingPaymentCount > 0 ? undefined : paidAt,
        },
      });
      return { payment, created: true };
    });

    if (result.created) await this.sendReceipt(result.payment.id);
    return result.payment;
  }

  private async verifyAttempt(attempt: PaymentAttempt) {
    if (!attempt.providerReference) return null;
    const provider = this.providers.get(attempt.provider);
    if (!provider) return null;
    const verified = await provider.verify(attempt.providerReference);
    return this.applyVerification(attempt, verified);
  }

  async refreshInvoice(paymentToken: string) {
    const invoice = await this.findInvoiceByToken(paymentToken);
    if (!invoice) throw new Error("invoice_not_found");

    for (const attempt of invoice.paymentAttempts) {
      if (["PENDING", "PROCESSING"].includes(attempt.status) && attempt.providerReference) {
        await this.verifyAttempt(attempt);
      }
    }

    const refreshed = await this.findInvoiceByToken(paymentToken);
    if (!refreshed) throw new Error("invoice_not_found");
    return this.serializeInvoice(refreshed);
  }

  private async reserveWebhook(
    provider: PaymentProvider,
    eventId: string,
    eventType: string,
    rawBody: Buffer,
  ) {
    try {
      return await this.prisma.webhookEvent.create({
        data: {
          provider,
          eventId,
          eventType,
          payloadHash: hashPayload(rawBody),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        return null;
      }
      throw error;
    }
  }

  private async processWebhookAttempt(
    webhookId: string,
    provider: PaymentProvider,
    providerReference: string,
  ) {
    const attempt = await this.prisma.paymentAttempt.findFirst({
      where: {
        provider,
        OR: [{ providerReference }, { reference: providerReference }],
      },
    });
    if (!attempt) {
      await this.prisma.webhookEvent.update({
        where: { id: webhookId },
        data: { status: "IGNORED", processedAt: new Date() },
      });
      return "ignored" as const;
    }

    try {
      await this.verifyAttempt(attempt);
      await this.prisma.webhookEvent.update({
        where: { id: webhookId },
        data: { status: "PROCESSED", processedAt: new Date() },
      });
      return "processed" as const;
    } catch (error) {
      await this.prisma.webhookEvent.update({
        where: { id: webhookId },
        data: {
          status: "FAILED",
          errorMessage: error instanceof Error ? error.message.slice(0, 500) : "verification_failed",
          processedAt: new Date(),
        },
      });
      throw error;
    }
  }

  async handlePaystackWebhook(rawBody: Buffer, signature: string | undefined) {
    if (!this.env.PAYMENTS_LIVE || !this.env.PAYSTACK_SECRET_KEY) {
      throw new Error("provider_not_ready");
    }
    if (!verifyHmacSignature(rawBody, signature, this.env.PAYSTACK_SECRET_KEY, "sha512")) {
      throw new Error("invalid_signature");
    }

    const payload = JSON.parse(rawBody.toString("utf8")) as {
      event?: string;
      data?: { id?: number | string; reference?: string };
    };
    const eventType = payload.event || "unknown";
    const providerReference = payload.data?.reference;
    const eventId = `${eventType}:${payload.data?.id || providerReference || hashPayload(rawBody)}`;
    const event = await this.reserveWebhook("PAYSTACK", eventId, eventType, rawBody);
    if (!event) return "duplicate" as const;
    if (eventType !== "charge.success" || !providerReference) {
      await this.prisma.webhookEvent.update({
        where: { id: event.id },
        data: { status: "IGNORED", processedAt: new Date() },
      });
      return "ignored" as const;
    }
    return this.processWebhookAttempt(event.id, "PAYSTACK", providerReference);
  }

  async handleBtcpayWebhook(rawBody: Buffer, signature: string | undefined) {
    if (!this.env.PAYMENTS_LIVE || !this.env.BTCPAY_WEBHOOK_SECRET) {
      throw new Error("provider_not_ready");
    }
    if (
      !verifyHmacSignature(rawBody, signature, this.env.BTCPAY_WEBHOOK_SECRET, "sha256", "sha256=")
    ) {
      throw new Error("invalid_signature");
    }

    const payload = JSON.parse(rawBody.toString("utf8")) as {
      deliveryId?: string;
      type?: string;
      invoiceId?: string;
    };
    const eventType = payload.type || "unknown";
    const eventId = payload.deliveryId || hashPayload(rawBody);
    const event = await this.reserveWebhook("BTCPAY", eventId, eventType, rawBody);
    if (!event) return "duplicate" as const;
    const relevant = new Set([
      "InvoiceReceivedPayment",
      "InvoiceProcessing",
      "InvoiceExpired",
      "InvoiceSettled",
      "InvoiceInvalid",
      "InvoicePaymentSettled",
    ]);
    if (!payload.invoiceId || !relevant.has(eventType)) {
      await this.prisma.webhookEvent.update({
        where: { id: event.id },
        data: { status: "IGNORED", processedAt: new Date() },
      });
      return "ignored" as const;
    }
    return this.processWebhookAttempt(event.id, "BTCPAY", payload.invoiceId);
  }
}
