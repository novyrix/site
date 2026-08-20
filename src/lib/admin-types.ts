export type FitStatus = "PENDING" | "FIT" | "NOT_FIT";
export type DiscoveryOutcome = "PROCEED" | "FOLLOW_UP" | "DECLINE";
export type Currency = "KES" | "USD";

export type AdminLeadSummary = {
  reference: string;
  contactName: string;
  contactEmail: string;
  servicesOfInterest: string[];
  budgetRange: string | null;
  fitStatus: FitStatus;
  discoveryOutcome: DiscoveryOutcome | null;
  discoveryCompletedAt: string | null;
  notificationStatus: "PENDING" | "SENT" | "FAILED";
  createdAt: string;
  organization: {
    name: string;
    type: string;
    country: string;
    resolvedCurrency: Currency;
  };
  latestProposal: {
    reference: string;
    status: string;
    engagementReference: string | null;
    engagementStatus: string | null;
  } | null;
};

export type AdminOverview = {
  counts: {
    pendingLeads: number;
    fitLeads: number;
    activeEngagements: number;
    pendingInvoices: number;
    overdueInvoices: number;
  };
  recentLeads: AdminLeadSummary[];
};

export type PaymentReadiness = {
  paymentsLive: boolean;
  allReady: boolean;
  paystack: { configured: boolean; ready: boolean };
  btcpay: { configured: boolean; ready: boolean };
};

export type AdminLeadDetail = AdminLeadSummary & {
  problemDescription: string;
  discoveryNotes: string | null;
  organization: AdminLeadSummary["organization"] & { id: string };
  proposals: Array<{
    reference: string;
    serviceType: string;
    scopeSummary: string;
    timeline: string;
    engagementType: "FIXED_SCOPE" | "RETAINER" | "DAY_RATE_ADVISORY";
    currency: Currency;
    totalAmountMinor: string;
    status: string;
    acceptedAt: string | null;
    createdAt: string;
    lineItems: AdminMoneyLine[];
    engagement: null | {
      reference: string;
      type: string;
      status: string;
      agreementReference: string;
      agreementConfirmedAt: string;
      milestones: Array<{
        id: string;
        title: string;
        description: string | null;
        status: "NOT_STARTED" | "IN_PROGRESS" | "BLOCKED" | "COMPLETE";
        dueAt: string | null;
        completedAt: string | null;
        position: number;
      }>;
      deliverables: Array<{
        id: string;
        title: string;
        description: string | null;
        url: string | null;
        status: "DRAFT" | "SHARED" | "ACCEPTED" | "SUPERSEDED";
        sharedAt: string | null;
        createdAt: string;
        milestone: null | {
          id: string;
          title: string;
          position: number;
        };
      }>;
      portalMessages: Array<{
        id: string;
        sender: "CLIENT" | "ADMIN";
        authorName: string;
        body: string;
        createdAt: string;
      }>;
      invoices: Array<{
        reference: string;
        currency: Currency;
        totalAmountMinor: string;
        status: string;
        paymentMethod: "PAYSTACK" | "BTCPAY" | null;
        notificationStatus: "PENDING" | "SENT" | "FAILED";
        notificationSentAt: string | null;
        dueAt: string;
        sentAt: string | null;
        paidAt: string | null;
        lineItems: AdminMoneyLine[];
        payments: Array<{
          provider: "PAYSTACK" | "BTCPAY";
          amountMinor: string;
          currency: Currency;
          channel: string | null;
          receiptReference: string;
          receiptNotificationStatus: "PENDING" | "SENT" | "FAILED";
          paidAt: string;
        }>;
      }>;
    };
  }>;
};

export type AdminMoneyLine = {
  description: string;
  quantity: number;
  unitAmountMinor: string;
  totalAmountMinor: string;
};

export type AdminLeadList = {
  items: AdminLeadSummary[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
};
