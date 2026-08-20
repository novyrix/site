import "server-only";

import type { PaymentInvoice } from "@/lib/payment-types";

export class PlatformApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "PlatformApiError";
  }
}

const paymentPreviewConnected = process.env.NOVYRIX_PAYMENT_PREVIEW_CONNECTED === "true";
const paymentPreviewEnabled = process.env.NOVYRIX_PAYMENT_PREVIEW_ENABLED === "true" || paymentPreviewConnected;

const previewInvoice: PaymentInvoice = {
  reference: "INV-PREVIEW",
  status: "PENDING",
  currency: "KES",
  totalAmountMinor: "68400000",
  dueAt: "2026-09-02T12:00:00.000Z",
  paidAt: null,
  paymentMethod: null,
  organizationName: "Acacia Field Systems",
  serviceType: "Operations platform delivery",
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
      description: "Deployment, observability, and operational handover",
      quantity: 1,
      unitAmountMinor: "5400000",
      totalAmountMinor: "5400000",
    },
  ],
  providers: {
    paystack: { label: "Card / M-Pesa", available: paymentPreviewConnected },
    btcpay: { label: "Bitcoin / Lightning", available: paymentPreviewConnected },
  },
};

function platformConfiguration() {
  const baseUrl = process.env.NOVYRIX_API_URL?.replace(/\/$/, "");
  const token = process.env.NOVYRIX_API_TOKEN;

  if (!baseUrl || !token) {
    throw new PlatformApiError("Payment service configuration is incomplete.", 503);
  }
  if (process.env.NODE_ENV === "production" && !baseUrl.startsWith("https://")) {
    throw new PlatformApiError("Payment service configuration is invalid.", 503);
  }

  return { baseUrl, token };
}

export async function requestPlatformApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { baseUrl, token } = platformConfiguration();
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  const result = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    throw new PlatformApiError(result.error || "The payment service request failed.", response.status);
  }

  return result;
}

export async function getPaymentInvoice(token: string) {
  if (paymentPreviewEnabled && token === "preview") {
    return previewInvoice;
  }

  return requestPlatformApi<PaymentInvoice>(`/v1/payment-links/${encodeURIComponent(token)}`);
}
