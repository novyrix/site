import {
  Prisma,
  type DiscoveryOutcome,
  type FitStatus,
  type PrismaClient,
} from "@prisma/client";

const leadListInclude = Prisma.validator<Prisma.LeadInclude>()({
  organization: true,
  proposals: {
    orderBy: { createdAt: "desc" },
    take: 1,
    include: { engagement: true },
  },
});

const leadDetailInclude = Prisma.validator<Prisma.LeadInclude>()({
  organization: true,
  proposals: {
    orderBy: { createdAt: "desc" },
    include: {
      lineItems: { orderBy: { position: "asc" } },
      engagement: {
        include: {
          milestones: { orderBy: { position: "asc" } },
          deliverables: {
            orderBy: { createdAt: "desc" },
            include: { milestone: true },
          },
          portalMessages: {
            orderBy: { createdAt: "desc" },
            take: 5,
            include: { portalUser: true },
          },
          invoices: {
            orderBy: { createdAt: "desc" },
            include: {
              lineItems: { orderBy: { position: "asc" } },
              payments: { orderBy: { paidAt: "desc" } },
            },
          },
        },
      },
    },
  },
});

type LeadListRecord = Prisma.LeadGetPayload<{ include: typeof leadListInclude }>;
type LeadDetailRecord = Prisma.LeadGetPayload<{ include: typeof leadDetailInclude }>;

function serializeListLead(lead: LeadListRecord) {
  const latestProposal = lead.proposals[0];
  return {
    reference: lead.reference,
    contactName: lead.contactName,
    contactEmail: lead.contactEmail,
    servicesOfInterest: lead.servicesOfInterest,
    budgetRange: lead.budgetRange,
    fitStatus: lead.fitStatus,
    discoveryOutcome: lead.discoveryOutcome,
    discoveryCompletedAt: lead.discoveryCompletedAt,
    notificationStatus: lead.notificationStatus,
    createdAt: lead.createdAt,
    organization: {
      name: lead.organization.name,
      type: lead.organization.type,
      country: lead.organization.country,
      resolvedCurrency: lead.organization.resolvedCurrency,
    },
    latestProposal: latestProposal
      ? {
          reference: latestProposal.reference,
          status: latestProposal.status,
          engagementReference: latestProposal.engagement?.reference || null,
          engagementStatus: latestProposal.engagement?.status || null,
        }
      : null,
  };
}

function serializeLeadDetail(lead: LeadDetailRecord) {
  return {
    ...serializeListLead(lead),
    problemDescription: lead.problemDescription,
    discoveryNotes: lead.discoveryNotes,
    organization: {
      id: lead.organization.id,
      name: lead.organization.name,
      type: lead.organization.type,
      country: lead.organization.country,
      resolvedCurrency: lead.organization.resolvedCurrency,
    },
    proposals: lead.proposals.map((proposal) => ({
      reference: proposal.reference,
      serviceType: proposal.serviceType,
      scopeSummary: proposal.scopeSummary,
      timeline: proposal.timeline,
      engagementType: proposal.engagementType,
      currency: proposal.currency,
      totalAmountMinor: proposal.totalAmountMinor.toString(),
      status: proposal.status,
      acceptedAt: proposal.acceptedAt,
      createdAt: proposal.createdAt,
      lineItems: proposal.lineItems.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unitAmountMinor: item.unitAmountMinor.toString(),
        totalAmountMinor: item.totalAmountMinor.toString(),
      })),
      engagement: proposal.engagement
        ? {
            reference: proposal.engagement.reference,
            type: proposal.engagement.type,
            status: proposal.engagement.status,
            agreementReference: proposal.engagement.agreementReference,
            agreementConfirmedAt: proposal.engagement.agreementConfirmedAt,
            milestones: proposal.engagement.milestones.map((milestone) => ({
              id: milestone.id,
              title: milestone.title,
              description: milestone.description,
              status: milestone.status,
              dueAt: milestone.dueAt,
              completedAt: milestone.completedAt,
              position: milestone.position,
            })),
            deliverables: proposal.engagement.deliverables.map((deliverable) => ({
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
            portalMessages: proposal.engagement.portalMessages.map((message) => ({
              id: message.id,
              sender: message.sender,
              authorName: message.sender === "CLIENT"
                ? message.portalUser?.name || "Client"
                : "Novyrix",
              body: message.body,
              createdAt: message.createdAt,
            })),
            invoices: proposal.engagement.invoices.map((invoice) => ({
              reference: invoice.reference,
              currency: invoice.currency,
              totalAmountMinor: invoice.totalAmountMinor.toString(),
              status: invoice.status,
              paymentMethod: invoice.paymentMethod,
              notificationStatus: invoice.notificationStatus,
              notificationSentAt: invoice.notificationSentAt,
              dueAt: invoice.dueAt,
              sentAt: invoice.sentAt,
              paidAt: invoice.paidAt,
              lineItems: invoice.lineItems.map((item) => ({
                description: item.description,
                quantity: item.quantity,
                unitAmountMinor: item.unitAmountMinor.toString(),
                totalAmountMinor: item.totalAmountMinor.toString(),
              })),
              payments: invoice.payments.map((payment) => ({
                provider: payment.provider,
                amountMinor: payment.amountMinor.toString(),
                currency: payment.currency,
                channel: payment.channel,
                receiptReference: payment.receiptReference,
                receiptNotificationStatus: payment.receiptNotificationStatus,
                paidAt: payment.paidAt,
              })),
            })),
          }
        : null,
    })),
  };
}

export class AdminService {
  constructor(private readonly prisma: PrismaClient) {}

  async overview() {
    const [pendingLeads, fitLeads, activeEngagements, pendingInvoices, overdueInvoices, recent] =
      await Promise.all([
        this.prisma.lead.count({ where: { fitStatus: "PENDING" } }),
        this.prisma.lead.count({ where: { fitStatus: "FIT" } }),
        this.prisma.engagement.count({ where: { status: "ACTIVE" } }),
        this.prisma.invoice.count({ where: { status: "PENDING" } }),
        this.prisma.invoice.count({ where: { status: "OVERDUE" } }),
        this.prisma.lead.findMany({
          orderBy: { createdAt: "desc" },
          take: 6,
          include: leadListInclude,
        }),
      ]);

    return {
      counts: { pendingLeads, fitLeads, activeEngagements, pendingInvoices, overdueInvoices },
      recentLeads: recent.map(serializeListLead),
    };
  }

  async listLeads(input: {
    fitStatus?: FitStatus;
    discoveryOutcome?: DiscoveryOutcome;
    search?: string;
    page: number;
    pageSize: number;
  }) {
    const where: Prisma.LeadWhereInput = {
      ...(input.fitStatus ? { fitStatus: input.fitStatus } : {}),
      ...(input.discoveryOutcome ? { discoveryOutcome: input.discoveryOutcome } : {}),
      ...(input.search
        ? {
            OR: [
              { reference: { contains: input.search, mode: "insensitive" } },
              { contactName: { contains: input.search, mode: "insensitive" } },
              { contactEmail: { contains: input.search, mode: "insensitive" } },
              { organization: { name: { contains: input.search, mode: "insensitive" } } },
            ],
          }
        : {}),
    };
    const [total, leads] = await Promise.all([
      this.prisma.lead.count({ where }),
      this.prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (input.page - 1) * input.pageSize,
        take: input.pageSize,
        include: leadListInclude,
      }),
    ]);

    return {
      items: leads.map(serializeListLead),
      total,
      page: input.page,
      pageSize: input.pageSize,
      pages: Math.max(1, Math.ceil(total / input.pageSize)),
    };
  }

  async getLead(reference: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { reference },
      include: leadDetailInclude,
    });
    return lead ? serializeLeadDetail(lead) : null;
  }

  async setDiscovery(
    reference: string,
    input: { outcome: DiscoveryOutcome; notes: string },
  ) {
    return this.prisma.lead.update({
      where: { reference },
      data: {
        discoveryOutcome: input.outcome,
        discoveryNotes: input.notes || null,
        discoveryCompletedAt: new Date(),
      },
      select: {
        reference: true,
        discoveryOutcome: true,
        discoveryNotes: true,
        discoveryCompletedAt: true,
        updatedAt: true,
      },
    });
  }
}
