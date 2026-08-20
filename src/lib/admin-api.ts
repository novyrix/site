import "server-only";

import type {
  AdminLeadDetail,
  AdminLeadList,
  AdminOverview,
  PaymentReadiness,
} from "@/lib/admin-types";
import { requestPlatformApi } from "@/lib/platform-api";

const previewLead: AdminLeadDetail = {
  reference: "NVX-PREVIEW01",
  contactName: "Amina Njoroge",
  contactEmail: "amina@acacia.example",
  servicesOfInterest: ["Custom platform engineering", "Payment integrations"],
  budgetRange: "Scoped after discovery",
  fitStatus: "FIT",
  discoveryOutcome: "PROCEED",
  discoveryCompletedAt: "2026-08-18T09:30:00.000Z",
  discoveryNotes:
    "Operations and finance teams confirmed the reconciliation gap. Start with field workflows, approvals, and M-Pesa settlement reporting.",
  notificationStatus: "SENT",
  createdAt: "2026-08-14T08:15:00.000Z",
  organization: {
    id: "org-preview",
    name: "Acacia Field Systems",
    type: "NGO",
    country: "Kenya",
    resolvedCurrency: "KES",
  },
  latestProposal: {
    reference: "PROP-PREVIEW",
    status: "ACCEPTED",
    engagementReference: "ENG-PREVIEW",
    engagementStatus: "ACTIVE",
  },
  problemDescription:
    "The programme needs one accountable operating system for field submissions, approvals, M-Pesa disbursement reconciliation, and donor-ready reporting across three counties.",
  proposals: [
    {
      reference: "PROP-PREVIEW",
      serviceType: "Operations platform delivery",
      scopeSummary: "Field workflow, approval controls, payment reconciliation, and operational handover.",
      timeline: "12 weeks across discovery, delivery, and controlled rollout",
      engagementType: "FIXED_SCOPE",
      currency: "KES",
      totalAmountMinor: "68400000",
      status: "ACCEPTED",
      acceptedAt: "2026-08-18T12:00:00.000Z",
      createdAt: "2026-08-18T11:30:00.000Z",
      lineItems: [
        {
          description: "Platform architecture and delivery",
          quantity: 1,
          unitAmountMinor: "52000000",
          totalAmountMinor: "52000000",
        },
        {
          description: "M-Pesa reconciliation workflow",
          quantity: 1,
          unitAmountMinor: "16400000",
          totalAmountMinor: "16400000",
        },
      ],
      engagement: {
        reference: "ENG-PREVIEW",
        type: "FIXED_SCOPE",
        status: "ACTIVE",
        agreementReference: "MSA-ACACIA-2026-08",
        agreementConfirmedAt: "2026-08-18T12:00:00.000Z",
        milestones: [
          {
            id: "milestone-preview-1",
            title: "Discovery and controls map",
            description: "Confirm workflows, records, approvals, and reporting constraints.",
            status: "COMPLETE",
            dueAt: "2026-08-25T12:00:00.000Z",
            completedAt: "2026-08-24T15:00:00.000Z",
            position: 0,
          },
          {
            id: "milestone-preview-2",
            title: "Payment reconciliation workflow",
            description: "Build the settlement review and exception path for finance.",
            status: "IN_PROGRESS",
            dueAt: "2026-09-04T12:00:00.000Z",
            completedAt: null,
            position: 1,
          },
        ],
        deliverables: [
          {
            id: "deliverable-preview-1",
            title: "Discovery map and controls memo",
            description: "Signed-off operating map and access model.",
            url: "https://example.com/novyrix-preview/discovery-map",
            status: "ACCEPTED",
            sharedAt: "2026-08-24T15:20:00.000Z",
            createdAt: "2026-08-24T15:20:00.000Z",
            milestone: {
              id: "milestone-preview-1",
              title: "Discovery and controls map",
              position: 0,
            },
          },
        ],
        portalMessages: [
          {
            id: "portal-message-preview-1",
            sender: "ADMIN",
            authorName: "Novyrix",
            body: "Discovery map is ready for review. Settlement export format remains the open dependency.",
            createdAt: "2026-08-24T15:30:00.000Z",
          },
        ],
        invoices: [
          {
            reference: "INV-PREVIEW",
            currency: "KES",
            totalAmountMinor: "34200000",
            status: "PENDING",
            paymentMethod: null,
            notificationStatus: "SENT",
            notificationSentAt: "2026-08-19T07:30:00.000Z",
            dueAt: "2026-09-02T12:00:00.000Z",
            sentAt: "2026-08-19T07:30:00.000Z",
            paidAt: null,
            lineItems: [
              {
                description: "Project mobilization deposit",
                quantity: 1,
                unitAmountMinor: "34200000",
                totalAmountMinor: "34200000",
              },
            ],
            payments: [],
          },
        ],
      },
    },
  ],
};

const previewLeads = [
  previewLead,
  {
    ...previewLead,
    reference: "NVX-PREVIEW02",
    contactName: "David Mwangi",
    contactEmail: "david@kilimanjaro.example",
    organization: {
      ...previewLead.organization,
      id: "org-preview-2",
      name: "Kilimanjaro Bitcoin Labs",
      type: "BITCOIN_FINTECH",
      country: "Tanzania",
    },
    servicesOfInterest: ["Bitcoin infrastructure"],
    fitStatus: "PENDING" as const,
    discoveryOutcome: null,
    discoveryCompletedAt: null,
    discoveryNotes: null,
    latestProposal: null,
    proposals: [],
    createdAt: "2026-08-19T13:10:00.000Z",
  },
];

export function isAdminPreview(value?: string) {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.VERCEL !== "1" &&
    process.env.NOVYRIX_ADMIN_PREVIEW_ENABLED === "true" &&
    value === "qa"
  );
}

export async function getAdminOverview(preview = false): Promise<AdminOverview> {
  if (preview) {
    return {
      counts: {
        pendingLeads: 4,
        fitLeads: 7,
        activeEngagements: 3,
        pendingInvoices: 2,
        overdueInvoices: 1,
      },
      recentLeads: previewLeads,
    };
  }
  return requestPlatformApi<AdminOverview>("/v1/admin/overview");
}

export async function getPaymentReadiness(preview = false): Promise<PaymentReadiness> {
  if (preview) {
    return {
      paymentsLive: false,
      allReady: false,
      paystack: { configured: false, ready: false },
      btcpay: { configured: false, ready: false },
    };
  }
  return requestPlatformApi<PaymentReadiness>("/v1/admin/payments/readiness");
}

export async function getAdminLeads(
  query: URLSearchParams,
  preview = false,
): Promise<AdminLeadList> {
  if (preview) {
    return { items: previewLeads, total: previewLeads.length, page: 1, pageSize: 25, pages: 1 };
  }
  return requestPlatformApi<AdminLeadList>(`/v1/admin/leads?${query.toString()}`);
}

export async function getAdminLead(reference: string, preview = false): Promise<AdminLeadDetail> {
  if (preview) {
    const lead = previewLeads.find((item) => item.reference === reference);
    if (!lead) throw new Error("lead_not_found");
    return lead;
  }
  return requestPlatformApi<AdminLeadDetail>(`/v1/admin/leads/${encodeURIComponent(reference)}`);
}
