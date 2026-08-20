export type PaymentProviderName = "PAYSTACK" | "BTCPAY";

export type PaymentInvoiceStatus =
  | "PENDING"
  | "PAID"
  | "OVERPAID"
  | "OVERDUE"
  | "VOID";

export type PaymentInvoice = {
  reference: string;
  status: PaymentInvoiceStatus;
  currency: "KES" | "USD";
  totalAmountMinor: string;
  dueAt: string;
  paidAt: string | null;
  paymentMethod: PaymentProviderName | null;
  organizationName: string;
  serviceType: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitAmountMinor: string;
    totalAmountMinor: string;
  }>;
  providers: {
    paystack: {
      label: string;
      available: boolean;
    };
    btcpay: {
      label: string;
      available: boolean;
    };
  };
};

export type CheckoutResponse = {
  provider: PaymentProviderName;
  checkoutUrl: string;
  attemptReference: string;
  reused: boolean;
};
