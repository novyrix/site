import "server-only";

import { NextResponse } from "next/server";

type WebhookProvider = "paystack" | "btcpay";

const signatureHeaders: Record<WebhookProvider, string> = {
  paystack: "x-paystack-signature",
  btcpay: "btcpay-sig",
};

function platformBaseUrl() {
  const baseUrl = process.env.NOVYRIX_API_URL?.replace(/\/$/, "");
  if (!baseUrl) throw new Error("missing_platform_url");
  return baseUrl;
}

export async function forwardPaymentWebhook(provider: WebhookProvider, request: Request) {
  let rawBody: ArrayBuffer;
  try {
    rawBody = await request.arrayBuffer();
  } catch {
    return NextResponse.json({ error: "Webhook body could not be read." }, { status: 400 });
  }

  const signatureHeader = signatureHeaders[provider];
  const signature = request.headers.get(signatureHeader);
  if (!signature) {
    return NextResponse.json({ error: "Webhook signature is missing." }, { status: 401 });
  }

  try {
    const response = await fetch(`${platformBaseUrl()}/v1/webhooks/${provider}`, {
      method: "POST",
      headers: {
        "Content-Type": request.headers.get("content-type") || "application/json",
        [signatureHeader]: signature,
      },
      body: rawBody,
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const payload = await response.json().catch(() => ({}));
    return NextResponse.json(payload, {
      status: response.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Webhook processing is temporarily unavailable." },
      { status: 503 },
    );
  }
}
