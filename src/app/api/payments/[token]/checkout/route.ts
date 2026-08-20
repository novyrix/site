import { NextResponse } from "next/server";
import type { PaymentProviderName } from "@/lib/payment-types";
import { PlatformApiError, requestPlatformApi } from "@/lib/platform-api";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  let provider: PaymentProviderName | undefined;

  try {
    const body = (await request.json()) as { provider?: PaymentProviderName };
    provider = body.provider;
  } catch {
    return NextResponse.json({ error: "Checkout request is invalid." }, { status: 400 });
  }

  if (!/^[A-Za-z0-9_-]{43}$/.test(token) || !provider || !["PAYSTACK", "BTCPAY"].includes(provider)) {
    return NextResponse.json({ error: "Checkout request is invalid." }, { status: 400 });
  }

  try {
    const result = await requestPlatformApi(`/v1/payment-links/${encodeURIComponent(token)}/checkout`, {
      method: "POST",
      body: JSON.stringify({ provider }),
    });
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const status = error instanceof PlatformApiError && error.status < 500 ? error.status : 503;
    const message = error instanceof PlatformApiError
      ? error.message
      : "Checkout is temporarily unavailable. No payment has been taken.";
    return NextResponse.json({ error: message }, { status });
  }
}
