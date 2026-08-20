import { toSafeProviderInteger } from "../money.js";
import type {
  InitializePaymentInput,
  InitializedPayment,
  PaymentProviderAdapter,
  PaymentCurrency,
  VerifiedPayment,
} from "../types.js";
import { PaymentProviderError } from "./provider-error.js";

type FetchLike = typeof fetch;

type PaystackResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

type PaystackInitialization = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

type PaystackVerification = {
  id: number;
  status: string;
  reference: string;
  amount: number;
  currency: string;
  channel?: string;
  paid_at?: string;
};

export class PaystackProvider implements PaymentProviderAdapter {
  readonly name = "PAYSTACK" as const;

  constructor(
    private readonly secretKey: string,
    private readonly baseUrl = "https://api.paystack.co",
    private readonly fetcher: FetchLike = fetch,
  ) {}

  async initialize(input: InitializePaymentInput): Promise<InitializedPayment> {
    const response = await this.fetcher(`${this.baseUrl.replace(/\/$/, "")}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input.customerEmail,
        amount: toSafeProviderInteger(input.amountMinor),
        currency: input.currency,
        reference: input.attemptReference,
        callback_url: input.returnUrl,
        metadata: {
          invoiceReference: input.invoiceReference,
          attemptReference: input.attemptReference,
        },
      }),
      signal: AbortSignal.timeout(15_000),
    });

    const result = (await response.json()) as PaystackResponse<PaystackInitialization>;
    if (!response.ok || !result.status || !result.data?.authorization_url) {
      throw new PaymentProviderError("Paystack could not initialize checkout.", "paystack_initialize");
    }

    return {
      providerReference: result.data.reference,
      checkoutUrl: result.data.authorization_url,
      providerStatus: "initialized",
    };
  }

  async verify(providerReference: string): Promise<VerifiedPayment> {
    const encodedReference = encodeURIComponent(providerReference);
    const response = await this.fetcher(
      `${this.baseUrl.replace(/\/$/, "")}/transaction/verify/${encodedReference}`,
      {
        headers: { Authorization: `Bearer ${this.secretKey}` },
        signal: AbortSignal.timeout(15_000),
      },
    );
    const result = (await response.json()) as PaystackResponse<PaystackVerification>;
    if (!response.ok || !result.status || !result.data) {
      throw new PaymentProviderError("Paystack verification failed.", "paystack_verify");
    }

    const status = result.data.status;
    const state = status === "success"
      ? "paid"
      : ["abandoned", "failed", "reversed"].includes(status)
        ? "failed"
        : "pending";

    return {
      state,
      providerReference: result.data.reference,
      providerPaymentId: String(result.data.id),
      providerStatus: status,
      amountMinor: BigInt(Math.trunc(result.data.amount)),
      currency: result.data.currency as PaymentCurrency,
      channel: result.data.channel,
      paidAt: result.data.paid_at ? new Date(result.data.paid_at) : undefined,
    };
  }
}
