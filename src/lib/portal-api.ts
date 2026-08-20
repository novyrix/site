import "server-only";

import type {
  PortalCheckoutResponse,
  PortalEngagement,
  PortalInvoices,
  PortalMessages,
  PortalOverview,
  PortalSessionUser,
} from "@/lib/portal-types";
import { requestPlatformApi } from "@/lib/platform-api";

const now = "2026-08-20T12:00:00.000Z";
const previewUser: PortalSessionUser = {
  id: "portal-preview-user",
  email: "client@acacia.example",
  name: "Amina Njoroge",
  status: "ACTIVE",
  lastLoginAt: now,
  organizations: [
    {
      id: "org-preview",
      name: "Acacia Field Systems",
      country: "Kenya",
      resolvedCurrency: "KES",
      role: "CLIENT",
    },
  ],
};

const previewEngagement: PortalEngagement = {
  reference: "ENG-PREVIEW",
  status: "ACTIVE",
  type: "FIXED_SCOPE",
  createdAt: "2026-08-18T12:00:00.000Z",
  updatedAt: now,
  agreementReference: "MSA-ACACIA-2026-08",
  agreementConfirmedAt: "2026-08-18T12:00:00.000Z",
  progress: 40,
  currentMilestone: {
    id: "milestone-2",
    title: "Payment reconciliation workflow",
    status: "IN_PROGRESS",
    dueAt: "2026-09-04T12:00:00.000Z",
  },
  organization: {
    id: "org-preview",
    name: "Acacia Field Systems",
    country: "Kenya",
    resolvedCurrency: "KES",
  },
  proposal: {
    reference: "PROP-PREVIEW",
    serviceType: "Operations platform delivery",
    scopeSummary:
      "A production workflow platform for field submissions, approvals, M-Pesa reconciliation, and donor-ready operations reporting.",
    timeline: "12 weeks across controlled discovery, build, migration, and handover.",
    engagementType: "FIXED_SCOPE",
    currency: "KES",
    totalAmountMinor: "68400000",
    lineItems: [
      {
        description: "Platform architecture and delivery",
        quantity: 1,
        unitAmountMinor: "52000000",
        totalAmountMinor: "52000000",
      },
      {
        description: "M-Pesa integration and reconciliation workflow",
        quantity: 1,
        unitAmountMinor: "11000000",
        totalAmountMinor: "11000000",
      },
      {
        description: "Deployment, monitoring, and operational handover",
        quantity: 1,
        unitAmountMinor: "5400000",
        totalAmountMinor: "5400000",
      },
    ],
  },
  milestones: [
    {
      id: "milestone-1",
      title: "Discovery, data map, and delivery plan",
      description: "Confirm users, records, approval paths, reporting needs, and provider dependencies.",
      status: "COMPLETE",
      dueAt: "2026-08-25T12:00:00.000Z",
      completedAt: "2026-08-24T15:00:00.000Z",
      position: 0,
    },
    {
      id: "milestone-2",
      title: "Payment reconciliation workflow",
      description: "Build the M-Pesa settlement view and exception handling path for finance review.",
      status: "IN_PROGRESS",
      dueAt: "2026-09-04T12:00:00.000Z",
      completedAt: null,
      position: 1,
    },
    {
      id: "milestone-3",
      title: "Pilot rollout and access hardening",
      description: "Run the first county pilot, close permission gaps, and prepare support notes.",
      status: "NOT_STARTED",
      dueAt: "2026-09-18T12:00:00.000Z",
      completedAt: null,
      position: 2,
    },
  ],
  deliverables: [
    {
      id: "deliverable-1",
      title: "Discovery map and controls memo",
      description: "Signed-off system map covering approval paths, data fields, roles, and reconciliation checkpoints.",
      url: "https://example.com/novyrix-preview/discovery-map",
      status: "ACCEPTED",
      sharedAt: "2026-08-24T15:20:00.000Z",
      createdAt: "2026-08-24T15:20:00.000Z",
      milestone: { id: "milestone-1", title: "Discovery, data map, and delivery plan", position: 0 },
    },
    {
      id: "deliverable-2",
      title: "Reconciliation screen prototype",
      description: "Clickable operations flow for reviewing provider settlements against field approvals.",
      url: "https://example.com/novyrix-preview/reconciliation",
      status: "SHARED",
      sharedAt: "2026-08-29T10:00:00.000Z",
      createdAt: "2026-08-29T10:00:00.000Z",
      milestone: { id: "milestone-2", title: "Payment reconciliation workflow", position: 1 },
    },
  ],
  invoices: [
    {
      reference: "INV-PREVIEW",
      engagementReference: "ENG-PREVIEW",
      organizationName: "Acacia Field Systems",
      serviceType: "Operations platform delivery",
      currency: "KES",
      totalAmountMinor: "34200000",
      status: "PENDING",
      paymentMethod: null,
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
};

const previewOverview: PortalOverview = {
  user: previewUser,
  summary: {
    activeEngagements: 1,
    completedEngagements: 0,
    pendingInvoices: 1,
    deliverablesShared: 2,
  },
  engagements: [previewEngagement],
};

const previewMessages: PortalMessages = {
  items: [
    {
      id: "message-1",
      engagementReference: "ENG-PREVIEW",
      serviceType: "Operations platform delivery",
      organizationName: "Acacia Field Systems",
      sender: "ADMIN",
      authorName: "Novyrix",
      body: "Discovery map is ready for review. The only open dependency is the provider settlement export.",
      createdAt: "2026-08-24T15:30:00.000Z",
    },
    {
      id: "message-2",
      engagementReference: "ENG-PREVIEW",
      serviceType: "Operations platform delivery",
      organizationName: "Acacia Field Systems",
      sender: "CLIENT",
      authorName: "Amina Njoroge",
      body: "Confirmed. Finance will send the export format before close of day.",
      createdAt: "2026-08-24T16:10:00.000Z",
    },
  ],
};

export function isPortalPreview(value?: string) {
  return (
    process.env.VERCEL !== "1" &&
    process.env.NOVYRIX_PORTAL_PREVIEW_ENABLED === "true" &&
    value === "qa"
  );
}

export async function verifyPortalCredentials(email: string, password: string) {
  try {
    return await requestPlatformApi<PortalSessionUser>("/v1/portal/auth/verify", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return null;
  }
}

export async function resolvePortalGoogleIdentity(email: string) {
  try {
    return await requestPlatformApi<PortalSessionUser>("/v1/portal/auth/google", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  } catch {
    return null;
  }
}

export async function getPortalOverview(userId: string, preview = false) {
  if (preview) return previewOverview;
  return requestPlatformApi<PortalOverview>("/v1/portal/overview", {
    headers: { "x-novyrix-portal-user-id": userId },
  });
}

export async function getPortalEngagement(reference: string, userId: string, preview = false) {
  if (preview && reference === previewEngagement.reference) return previewEngagement;
  return requestPlatformApi<PortalEngagement>(`/v1/portal/engagements/${encodeURIComponent(reference)}`, {
    headers: { "x-novyrix-portal-user-id": userId },
  });
}

export async function getPortalInvoices(userId: string, preview = false) {
  if (preview) return { items: previewEngagement.invoices } satisfies PortalInvoices;
  return requestPlatformApi<PortalInvoices>("/v1/portal/invoices", {
    headers: { "x-novyrix-portal-user-id": userId },
  });
}

export async function getPortalMessages(userId: string, engagementReference?: string, preview = false) {
  if (preview) {
    return engagementReference
      ? { items: previewMessages.items.filter((message) => message.engagementReference === engagementReference) }
      : previewMessages;
  }
  const search = engagementReference
    ? `?engagementReference=${encodeURIComponent(engagementReference)}`
    : "";
  return requestPlatformApi<PortalMessages>(`/v1/portal/messages${search}`, {
    headers: { "x-novyrix-portal-user-id": userId },
  });
}

export async function initializePortalInvoiceCheckout(
  userId: string,
  invoiceReference: string,
  provider: "PAYSTACK" | "BTCPAY",
) {
  return requestPlatformApi<PortalCheckoutResponse>(
    `/v1/portal/invoices/${encodeURIComponent(invoiceReference)}/checkout`,
    {
      method: "POST",
      headers: { "x-novyrix-portal-user-id": userId },
      body: JSON.stringify({ provider }),
    },
  );
}
