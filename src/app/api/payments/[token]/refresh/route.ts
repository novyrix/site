import { NextResponse } from "next/server";
import { PlatformApiError, requestPlatformApi } from "@/lib/platform-api";

export const dynamic = "force-dynamic";

export async function POST(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) {
    return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
  }

  try {
    const result = await requestPlatformApi(`/v1/payment-links/${encodeURIComponent(token)}/refresh`, {
      method: "POST",
    });
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const status = error instanceof PlatformApiError && error.status < 500 ? error.status : 503;
    const message = error instanceof PlatformApiError
      ? error.message
      : "Payment status is temporarily unavailable.";
    return NextResponse.json({ error: message }, { status });
  }
}
