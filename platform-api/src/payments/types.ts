export type PaymentCurrency = "KES" | "USD";
export type PaymentProviderName = "PAYSTACK" | "BTCPAY";
export type SettlementState = "paid" | "pending" | "failed" | "expired";

export type InitializePaymentInput = {
  amountMinor: bigint;
  currency: PaymentCurrency;
  customerEmail: string;
  invoiceReference: string;
  attemptReference: string;
  returnUrl: string;
};

export type InitializedPayment = {
  providerReference: string;
  checkoutUrl: string;
  providerStatus: string;
  expiresAt?: Date;
};

export type VerifiedPayment = {
  state: SettlementState;
  providerReference: string;
  providerPaymentId?: string;
  providerStatus: string;
  amountMinor?: bigint;
  currency?: PaymentCurrency;
  channel?: string;
  paidAt?: Date;
};

export interface PaymentProviderAdapter {
  readonly name: PaymentProviderName;
  initialize(input: InitializePaymentInput): Promise<InitializedPayment>;
  verify(providerReference: string): Promise<VerifiedPayment>;
}
