import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <section className="site-shell not-found-ledger">
        <div className="not-found-ledger__code" aria-hidden="true">
          <span>4</span><i /><span>0</span><i /><span>4</span>
        </div>

        <div className="not-found-ledger__copy">
          <p className="eyebrow">Route status / Not found</p>
          <h1>Nothing here.</h1>
          <p>
            This address may have moved, or it may belong to an earlier version of Novyrix.
          </p>
        </div>

        <nav className="not-found-ledger__routes" aria-label="Useful routes">
          <Link href="/">
            <span><small className="mono">01</small>Return home</span>
            <ArrowLeft aria-hidden="true" />
          </Link>
          <Link href="/services">
            <span><small className="mono">02</small>Explore services</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <Link href="/inquire">
            <span><small className="mono">03</small>Start an inquiry</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </nav>
      </section>
    </main>
  );
}
