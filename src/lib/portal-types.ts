import type { CheckoutResponse, PaymentProviderName } from "@/lib/payment-types";

export type PortalCurrency = "KES" | "USD";
export type PortalEngagementStatus = "ACTIVE" | "COMPLETED";
export type PortalMilestoneStatus = "NOT_STARTED" | "IN_PROGRESS" | "BLOCKED" | "COMPLETE";
export type PortalDeliverableStatus = "DRAFT" | "SHARED" | "ACCEPTED" | "SUPERSEDED";
export type PortalInvoiceStatus = "PENDING" | "PAID" | "OVERPAID" | "OVERDUE" | "VOID";
export type PortalMessageSender = "CLIENT" | "ADMIN";

export type PortalSessionUser = {
  id: string;
  email: string;
  name: string;
  status: "INVITED" | "ACTIVE" | "DISABLED";
  lastLoginAt: string | null;
  organizations: Array<{
    id: string;
    name: string;
    country: string;
    resolvedCurrency: PortalCurrency;
    role: "CLIENT";
  }>;
};

export type PortalMoneyLine = {
  description: string;
  quantity: number;
  unitAmountMinor: string;
  totalAmountMinor: string;
};

export type PortalInvoice = {
  reference: string;
  engagementReference: string;
  organizationName: string;
  serviceType: string;
  currency: PortalCurrency;
  totalAmountMinor: string;
  status: PortalInvoiceStatus;
  paymentMethod: PaymentProviderName | null;
  dueAt: string;
  sentAt: string | null;
  paidAt: string | null;
  lineItems: PortalMoneyLine[];
  payments: Array<{
    provider: PaymentProviderName;
    amountMinor: string;
    currency: PortalCurrency;
    channel: string | null;
    receiptReference: string;
    receiptNotificationStatus: "PENDING" | "SENT" | "FAILED";
    paidAt: string;
  }>;
};

export type PortalEngagement = {
  reference: string;
  status: PortalEngagementStatus;
  type: "FIXED_SCOPE" | "RETAINER" | "DAY_RATE_ADVISORY";
  createdAt: string;
  updatedAt: string;
  agreementReference: string;
  agreementConfirmedAt: string;
  progress: number;
  currentMilestone: null | {
    id: string;
    title: string;
    status: PortalMilestoneStatus;
    dueAt: string | null;
  };
  organization: {
    id: string;
    name: string;
    country: string;
    resolvedCurrency: PortalCurrency;
  };
  proposal: {
    reference: string;
    serviceType: string;
    scopeSummary: string;
    timeline: string;
    engagementType: "FIXED_SCOPE" | "RETAINER" | "DAY_RATE_ADVISORY";
    currency: PortalCurrency;
    totalAmountMinor: string;
    lineItems: PortalMoneyLine[];
  };
  milestones: Array<{
    id: string;
    title: string;
    description: string | null;
    status: PortalMilestoneStatus;
    dueAt: string | null;
    completedAt: string | null;
    position: number;
  }>;
  deliverables: Array<{
    id: string;
    title: string;
    description: string | null;
    url: string | null;
    status: PortalDeliverableStatus;
    sharedAt: string | null;
    createdAt: string;
    milestone: null | {
      id: string;
      title: string;
      position: number;
    };
  }>;
  invoices: PortalInvoice[];
};

export type PortalOverview = {
  user: PortalSessionUser;
  summary: {
    activeEngagements: number;
    completedEngagements: number;
    pendingInvoices: number;
    deliverablesShared: number;
  };
  engagements: PortalEngagement[];
};

export type PortalMessage = {
  id: string;
  engagementReference: string;
  serviceType: string;
  organizationName: string;
  sender: PortalMessageSender;
  authorName: string;
  body: string;
  createdAt: string;
};

export type PortalMessages = {
  items: PortalMessage[];
};

export type PortalInvoices = {
  items: PortalInvoice[];
};

export type PortalCheckoutResponse = CheckoutResponse;
