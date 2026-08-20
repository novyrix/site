import { formatMinorAmount, parseMajorAmount } from "../money.js";
import type {
  InitializePaymentInput,
  InitializedPayment,
  PaymentProviderAdapter,
  PaymentCurrency,
  VerifiedPayment,
} from "../types.js";
import { PaymentProviderError } from "./provider-error.js";

type FetchLike = typeof fetch;

type BtcpayInvoice = {
  id: string;
  status: string;
  amount: string;
  currency: string;
  checkoutLink: string;
  expirationTime?: number;
};

export class BtcpayProvider implements PaymentProviderAdapter {
  readonly name = "BTCPAY" as const;

  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
    private readonly storeId: string,
    private readonly fetcher: FetchLike = fetch,
  ) {}

  private get invoiceBaseUrl() {
    return `${this.baseUrl.replace(/\/$/, "")}/api/v1/stores/${encodeURIComponent(this.storeId)}/invoices`;
  }

  private get headers() {
    return {
      Authorization: `token ${this.apiKey}`,
      "Content-Type": "application/json",
    };
  }

  async initialize(input: InitializePaymentInput): Promise<InitializedPayment> {
    const response = await this.fetcher(this.invoiceBaseUrl, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        amount: formatMinorAmount(input.amountMinor, input.currency),
        currency: input.currency,
        metadata: {
          orderId: input.attemptReference,
          itemDesc: `Novyrix invoice ${input.invoiceReference}`,
        },
        checkout: {
          redirectURL: input.returnUrl,
          redirectAutomatically: true,
        },
      }),
      signal: AbortSignal.timeout(15_000),
    });
    const result = (await response.json()) as BtcpayInvoice;
    if (!response.ok || !result.id || !result.checkoutLink) {
      throw new PaymentProviderError("BTCPay could not initialize checkout.", "btcpay_initialize");
    }

    return {
      providerReference: result.id,
      checkoutUrl: result.checkoutLink,
      providerStatus: result.status,
      expiresAt: result.expirationTime ? new Date(result.expirationTime * 1000) : undefined,
    };
  }

  async verify(providerReference: string): Promise<VerifiedPayment> {
    const response = await this.fetcher(`${this.invoiceBaseUrl}/${encodeURIComponent(providerReference)}`, {
      headers: this.headers,
      signal: AbortSignal.timeout(15_000),
    });
    const result = (await response.json()) as BtcpayInvoice;
    if (!response.ok || !result.id || !result.status) {
      throw new PaymentProviderError("BTCPay verification failed.", "btcpay_verify");
    }

    const state = result.status === "Settled"
      ? "paid"
      : result.status === "Expired"
        ? "expired"
        : result.status === "Invalid"
          ? "failed"
          : "pending";
    const currency = result.currency as PaymentCurrency;

    return {
      state,
      providerReference: result.id,
      providerPaymentId: result.id,
      providerStatus: result.status,
      amountMinor: parseMajorAmount(result.amount, currency),
      currency,
      channel: "bitcoin_lightning",
    };
  }
}
