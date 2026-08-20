import { forwardPaymentWebhook } from "@/lib/payment-webhook-proxy";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return forwardPaymentWebhook("paystack", request);
}
