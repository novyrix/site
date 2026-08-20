import {
  Prisma,
  type DeliverableStatus,
  type EngagementMilestoneStatus,
  type PaymentProvider,
  type PrismaClient,
} from "@prisma/client";
import type { PaymentService } from "../payments/service.js";
import { verifyPortalPassword } from "./password.js";

const portalUserInclude = Prisma.validator<Prisma.PortalUserInclude>()({
  memberships: {
    include: {
      organization: true,
    },
    orderBy: { createdAt: "asc" },
  },
});

const portalEngagementInclude = Prisma.validator<Prisma.EngagementInclude>()({
  organization: true,
  proposal: {
    include: {
      lead: true,
      lineItems: { orderBy: { position: "asc" } },
    },
  },
  milestones: { orderBy: { position: "asc" } },
  deliverables: {
    orderBy: { createdAt: "desc" },
    include: { milestone: true },
  },
  invoices: {
    orderBy: { createdAt: "desc" },
    include: {
      lineItems: { orderBy: { position: "asc" } },
      payments: { orderBy: { paidAt: "desc" } },
    },
  },
});

const invoiceInclude = Prisma.validator<Prisma.InvoiceInclude>()({
  lineItems: { orderBy: { position: "asc" } },
  payments: { orderBy: { paidAt: "desc" } },
  engagement: {
    include: {
      organization: true,
      proposal: true,
    },
  },
});

const messageInclude = Prisma.validator<Prisma.PortalMessageInclude>()({
  portalUser: true,
  engagement: {
    include: {
      organization: true,
      proposal: true,
    },
  },
});

type PortalUserRecord = Prisma.PortalUserGetPayload<{ include: typeof portalUserInclude }>;
type PortalEngagementRecord = Prisma.EngagementGetPayload<{ include: typeof portalEngagementInclude }>;
type PortalInvoiceRecord = Prisma.InvoiceGetPayload<{ include: typeof invoiceInclude }>;
type PortalMessageRecord = Prisma.PortalMessageGetPayload<{ include: typeof messageInclude }>;

function serializePortalUser(user: PortalUserRecord) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    status: user.status,
    lastLoginAt: user.lastLoginAt,
    organizations: user.memberships.map((membership) => ({
      id: membership.organization.id,
      name: membership.organization.name,
      country: membership.organization.country,
      resolvedCurrency: membership.organization.resolvedCurrency,
      role: membership.role,
    })),
  };
}

function serializeMoneyLine(item: {
  description: string;
  quantity: number;
  unitAmountMinor: bigint;
  totalAmountMinor: bigint;
}) {
  return {
    description: item.description,
    quantity: item.quantity,
    unitAmountMinor: item.unitAmountMinor.toString(),
    totalAmountMinor: item.totalAmountMinor.toString(),
  };
}

function serializeInvoiceWithContext(
  invoice: PortalInvoiceRecord | PortalEngagementRecord["invoices"][number],
  engagement: {
    reference: string;
    organization: { name: string };
    proposal: { serviceType: string };
  },
) {
  return {
    reference: invoice.reference,
    engagementReference: engagement.reference,
    organizationName: engagement.organization.name,
    serviceType: engagement.proposal.serviceType,
    currency: invoice.currency,
    totalAmountMinor: invoice.totalAmountMinor.toString(),
    status: invoice.status,
    paymentMethod: invoice.paymentMethod,
    dueAt: invoice.dueAt,
    sentAt: invoice.sentAt,
    paidAt: invoice.paidAt,
    lineItems: invoice.lineItems.map(serializeMoneyLine),
    payments: invoice.payments.map((payment) => ({
      provider: payment.provider,
      amountMinor: payment.amountMinor.toString(),
      currency: payment.currency,
      channel: payment.channel,
      receiptReference: payment.receiptReference,
      receiptNotificationStatus: payment.receiptNotificationStatus,
      paidAt: payment.paidAt,
    })),
  };
}

function serializeInvoice(invoice: PortalInvoiceRecord) {
  return serializeInvoiceWithContext(invoice, invoice.engagement);
}

function progressFor(engagement: PortalEngagementRecord) {
  if (engagement.milestones.length === 0) return 0;
  const completed = engagement.milestones.filter((milestone) => milestone.status === "COMPLETE").length;
  return Math.round((completed / engagement.milestones.length) * 100);
}

function serializeEngagement(engagement: PortalEngagementRecord) {
  const currentMilestone =
    engagement.milestones.find((milestone) => milestone.status !== "COMPLETE") ||
    engagement.milestones.at(-1) ||
    null;

  return {
    reference: engagement.reference,
    status: engagement.status,
    type: engagement.type,
    createdAt: engagement.createdAt,
    updatedAt: engagement.updatedAt,
    agreementReference: engagement.agreementReference,
    agreementConfirmedAt: engagement.agreementConfirmedAt,
    progress: progressFor(engagement),
    currentMilestone: currentMilestone
      ? {
          id: currentMilestone.id,
          title: currentMilestone.title,
          status: currentMilestone.status,
          dueAt: currentMilestone.dueAt,
        }
      : null,
    organization: {
      id: engagement.organization.id,
      name: engagement.organization.name,
      country: engagement.organization.country,
      resolvedCurrency: engagement.organization.resolvedCurrency,
    },
    proposal: {
      reference: engagement.proposal.reference,
      serviceType: engagement.proposal.serviceType,
      scopeSummary: engagement.proposal.scopeSummary,
      timeline: engagement.proposal.timeline,
      engagementType: engagement.proposal.engagementType,
      currency: engagement.proposal.currency,
      totalAmountMinor: engagement.proposal.totalAmountMinor.toString(),
      lineItems: engagement.proposal.lineItems.map(serializeMoneyLine),
    },
    milestones: engagement.milestones.map((milestone) => ({
      id: milestone.id,
      title: milestone.title,
      description: milestone.description,
      status: milestone.status,
      dueAt: milestone.dueAt,
      completedAt: milestone.completedAt,
      position: milestone.position,
    })),
    deliverables: engagement.deliverables.map((deliverable) => ({
      id: deliverable.id,
      title: deliverable.title,
      description: deliverable.description,
      url: deliverable.url,
      status: deliverable.status,
      sharedAt: deliverable.sharedAt,
      createdAt: deliverable.createdAt,
      milestone: deliverable.milestone
        ? {
            id: deliverable.milestone.id,
            title: deliverable.milestone.title,
            position: deliverable.milestone.position,
          }
        : null,
    })),
    invoices: engagement.invoices.map((invoice) => serializeInvoiceWithContext(invoice, engagement)),
  };
}

function serializeMessage(message: PortalMessageRecord) {
  return {
    id: message.id,
    engagementReference: message.engagement.reference,
    serviceType: message.engagement.proposal.serviceType,
    organizationName: message.engagement.organization.name,
    sender: message.sender,
    authorName: message.sender === "CLIENT"
      ? message.portalUser?.name || "Client"
      : "Novyrix",
    body: message.body,
    createdAt: message.createdAt,
  };
}

export class PortalService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly payments: PaymentService,
  ) {}

  async verifyCredentials(emailInput: string, password: string) {
    const email = emailInput.trim().toLowerCase();
    const user = await this.prisma.portalUser.findUnique({
      where: { email },
      include: portalUserInclude,
    });
    if (!user || user.status === "DISABLED" || !user.passwordHash) return null;
    if (!verifyPortalPassword(password, user.passwordHash)) return null;

    const updated = await this.prisma.portalUser.update({
      where: { id: user.id },
      data: {
        status: "ACTIVE",
        lastLoginAt: new Date(),
      },
      include: portalUserInclude,
    });

    return serializePortalUser(updated);
  }

  async resolveGoogleIdentity(emailInput: string) {
    const email = emailInput.trim().toLowerCase();
    const user = await this.prisma.portalUser.findUnique({
      where: { email },
      include: portalUserInclude,
    });
    if (!user || user.status === "DISABLED" || user.memberships.length === 0) return null;

    const updated = await this.prisma.portalUser.update({
      where: { id: user.id },
      data: {
        status: "ACTIVE",
        lastLoginAt: new Date(),
      },
      include: portalUserInclude,
    });

    return serializePortalUser(updated);
  }

  async provisionUser(input: {
    engagementReference: string;
    email: string;
    name: string;
  }) {
    const engagement = await this.prisma.engagement.findUnique({
      where: { reference: input.engagementReference },
      include: { organization: true },
    });
    if (!engagement) throw new Error("engagement_not_found");

    const email = input.email.trim().toLowerCase();
    const user = await this.prisma.$transaction(async (transaction) => {
      const portalUser = await transaction.portalUser.upsert({
        where: { email },
        create: {
          email,
          name: input.name,
          passwordHash: null,
          status: "INVITED",
        },
        update: {
          name: input.name,
          status: "INVITED",
        },
      });

      await transaction.portalMembership.upsert({
        where: {
          portalUserId_organizationId: {
            portalUserId: portalUser.id,
            organizationId: engagement.organizationId,
          },
        },
        create: {
          portalUserId: portalUser.id,
          organizationId: engagement.organizationId,
        },
        update: { role: "CLIENT" },
      });

      return transaction.portalUser.findUniqueOrThrow({
        where: { id: portalUser.id },
        include: portalUserInclude,
      });
    });

    return {
      user: serializePortalUser(user),
      engagement: {
        reference: engagement.reference,
        organizationName: engagement.organization.name,
      },
    };
  }

  private async assertPortalUser(userId: string) {
    const user = await this.prisma.portalUser.findUnique({
      where: { id: userId },
      include: portalUserInclude,
    });
    if (!user || user.status === "DISABLED") return null;
    return user;
  }

  private engagementAccessWhere(userId: string, reference?: string): Prisma.EngagementWhereInput {
    return {
      ...(reference ? { reference } : {}),
      organization: {
        portalMemberships: {
          some: { portalUserId: userId },
        },
      },
    };
  }

  async overview(userId: string) {
    const user = await this.assertPortalUser(userId);
    if (!user) return null;

    const engagements = await this.prisma.engagement.findMany({
      where: this.engagementAccessWhere(userId),
      orderBy: { createdAt: "desc" },
      include: portalEngagementInclude,
    });
    const invoices = engagements.flatMap((engagement) => engagement.invoices);
    const pendingInvoices = invoices.filter((invoice) =>
      ["PENDING", "OVERDUE"].includes(invoice.status),
    );

    return {
      user: serializePortalUser(user),
      summary: {
        activeEngagements: engagements.filter((engagement) => engagement.status === "ACTIVE").length,
        completedEngagements: engagements.filter((engagement) => engagement.status === "COMPLETED").length,
        pendingInvoices: pendingInvoices.length,
        deliverablesShared: engagements.reduce(
          (count, engagement) =>
            count + engagement.deliverables.filter((deliverable) => deliverable.status !== "DRAFT").length,
          0,
        ),
      },
      engagements: engagements.map(serializeEngagement),
    };
  }

  async getEngagement(userId: string, reference: string) {
    const engagement = await this.prisma.engagement.findFirst({
      where: this.engagementAccessWhere(userId, reference),
      include: portalEngagementInclude,
    });
    return engagement ? serializeEngagement(engagement) : null;
  }

  async listInvoices(userId: string) {
    const invoices = await this.prisma.invoice.findMany({
      where: {
        engagement: this.engagementAccessWhere(userId),
      },
      orderBy: { createdAt: "desc" },
      include: invoiceInclude,
    });
    return { items: invoices.map(serializeInvoice) };
  }

  async initializeInvoiceCheckout(
    userId: string,
    invoiceReference: string,
    provider: PaymentProvider,
  ) {
    const invoice = await this.prisma.invoice.findFirst({
      where: {
        reference: invoiceReference,
        engagement: this.engagementAccessWhere(userId),
      },
      select: { reference: true },
    });
    if (!invoice) throw new Error("invoice_not_found");
    return this.payments.initializeCheckoutForInvoiceReference(invoice.reference, provider);
  }

  async listMessages(userId: string, engagementReference?: string) {
    const messages = await this.prisma.portalMessage.findMany({
      where: {
        engagement: this.engagementAccessWhere(userId, engagementReference),
      },
      orderBy: { createdAt: "asc" },
      include: messageInclude,
    });
    return { items: messages.map(serializeMessage) };
  }

  async addClientMessage(userId: string, input: { engagementReference: string; body: string }) {
    const user = await this.assertPortalUser(userId);
    if (!user) throw new Error("portal_user_not_found");
    const engagement = await this.prisma.engagement.findFirst({
      where: this.engagementAccessWhere(userId, input.engagementReference),
      select: { id: true },
    });
    if (!engagement) throw new Error("engagement_not_found");

    const message = await this.prisma.portalMessage.create({
      data: {
        engagementId: engagement.id,
        portalUserId: user.id,
        sender: "CLIENT",
        body: input.body,
      },
      include: messageInclude,
    });

    return serializeMessage(message);
  }

  async createMilestone(
    engagementReference: string,
    input: {
      title: string;
      description?: string;
      status?: EngagementMilestoneStatus;
      dueAt?: Date;
      position?: number;
    },
  ) {
    const engagement = await this.prisma.engagement.findUnique({
      where: { reference: engagementReference },
      select: { id: true, reference: true },
    });
    if (!engagement) throw new Error("engagement_not_found");

    const position = input.position ?? await this.prisma.engagementMilestone.count({
      where: { engagementId: engagement.id },
    });
    const status = input.status || "NOT_STARTED";

    return this.prisma.engagementMilestone.create({
      data: {
        engagementId: engagement.id,
        title: input.title,
        description: input.description || null,
        status,
        dueAt: input.dueAt || null,
        completedAt: status === "COMPLETE" ? new Date() : null,
        position,
      },
    });
  }

  async updateMilestone(
    engagementReference: string,
    milestoneId: string,
    input: {
      title?: string;
      description?: string | null;
      status?: EngagementMilestoneStatus;
      dueAt?: Date | null;
      position?: number;
    },
  ) {
    const milestone = await this.prisma.engagementMilestone.findUnique({
      where: { id: milestoneId },
      include: { engagement: true },
    });
    if (!milestone || milestone.engagement.reference !== engagementReference) {
      throw new Error("milestone_not_found");
    }

    return this.prisma.engagementMilestone.update({
      where: { id: milestoneId },
      data: {
        ...(input.title ? { title: input.title } : {}),
        ...(input.description !== undefined ? { description: input.description || null } : {}),
        ...(input.status ? { status: input.status } : {}),
        ...(input.dueAt !== undefined ? { dueAt: input.dueAt } : {}),
        ...(input.position !== undefined ? { position: input.position } : {}),
        ...(input.status === "COMPLETE" && !milestone.completedAt
          ? { completedAt: new Date() }
          : {}),
        ...(input.status && input.status !== "COMPLETE" ? { completedAt: null } : {}),
      },
    });
  }

  async createDeliverable(
    engagementReference: string,
    input: {
      title: string;
      description?: string;
      url?: string;
      milestoneId?: string;
      status?: DeliverableStatus;
    },
  ) {
    const engagement = await this.prisma.engagement.findUnique({
      where: { reference: engagementReference },
      select: { id: true },
    });
    if (!engagement) throw new Error("engagement_not_found");

    if (input.milestoneId) {
      const milestone = await this.prisma.engagementMilestone.findUnique({
        where: { id: input.milestoneId },
        select: { engagementId: true },
      });
      if (!milestone || milestone.engagementId !== engagement.id) {
        throw new Error("milestone_not_found");
      }
    }

    const status = input.status || "SHARED";
    return this.prisma.deliverable.create({
      data: {
        engagementId: engagement.id,
        milestoneId: input.milestoneId || null,
        title: input.title,
        description: input.description || null,
        url: input.url || null,
        status,
        sharedAt: status === "DRAFT" ? null : new Date(),
      },
    });
  }

  async createAdminMessage(engagementReference: string, body: string) {
    const engagement = await this.prisma.engagement.findUnique({
      where: { reference: engagementReference },
      select: { id: true },
    });
    if (!engagement) throw new Error("engagement_not_found");

    const message = await this.prisma.portalMessage.create({
      data: {
        engagementId: engagement.id,
        sender: "ADMIN",
        body,
      },
      include: messageInclude,
    });

    return serializeMessage(message);
  }
}
