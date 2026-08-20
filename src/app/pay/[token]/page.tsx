import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaymentCheckout } from "@/components/site/payment-checkout";
import { getPaymentInvoice, PlatformApiError } from "@/lib/platform-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Secure Invoice Payment",
  description: "Review and settle a private Novyrix invoice.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
  referrer: "no-referrer",
};

type PaymentPageProps = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ returned?: string }>;
};

export default async function PaymentPage({ params, searchParams }: PaymentPageProps) {
  const [{ token }, query] = await Promise.all([params, searchParams]);
  let invoice;

  try {
    invoice = await getPaymentInvoice(token);
  } catch (error) {
    if (error instanceof PlatformApiError && error.status === 404) notFound();

    return (
      <main className="payment-page payment-page--unavailable">
        <section className="site-shell payment-unavailable">
          <p className="eyebrow">Payment service / Temporarily unavailable</p>
          <h1>We could not load this invoice.</h1>
          <p>
            No payment has been taken. Try the private link again shortly, or email
            {" "}<a href="mailto:connect@novyrix.com">connect@novyrix.com</a> with your invoice reference.
          </p>
        </section>
      </main>
    );
  }

  return (
    <PaymentCheckout
      initialInvoice={invoice}
      paymentToken={token}
      returnedProvider={query.returned}
    />
  );
}
