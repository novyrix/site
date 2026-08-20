import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Paystack Return",
  description: "Return handler for Novyrix invoice payments.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
  referrer: "no-referrer",
};

type PaystackCallbackProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PaystackCallbackPage({ searchParams }: PaystackCallbackProps) {
  const query = await searchParams;
  const token = firstParam(query.token);

  if (token && /^[A-Za-z0-9_-]{43}$/.test(token)) {
    redirect(`/pay/${encodeURIComponent(token)}?returned=paystack`);
  }

  return (
    <main id="main-content" className="payment-page payment-page--unavailable">
      <section className="site-shell payment-unavailable">
        <p className="eyebrow">Paystack return</p>
        <h1>We need your private invoice link.</h1>
        <p>
          Paystack sent the browser back without a private Novyrix invoice token. No payment
          status is changed from this page. Open the original invoice link, or email
          {" "}<a href="mailto:connect@novyrix.com">connect@novyrix.com</a>
          {" "}with the Paystack reference if you need help.
        </p>
        <Link href="/inquire" className="button button--primary">
          Contact Novyrix
        </Link>
      </section>
    </main>
  );
}
