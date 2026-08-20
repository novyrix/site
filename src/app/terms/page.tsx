import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Website Terms",
  description:
    "Terms governing use of the Novyrix website, inquiry process, private payment links, and published materials.",
  path: "/terms",
});

const sections = [
  { id: "website", label: "Using the website" },
  { id: "inquiries", label: "Inquiries and engagements" },
  { id: "payments", label: "Invoices and payments" },
  { id: "materials", label: "Materials and acceptable use" },
  { id: "liability", label: "Responsibility and law" },
];

export default function TermsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Website terms / Effective 20 August 2026"
        title="Clear boundaries before the work begins."
        description="These terms govern this website and its inquiry and payment-link surfaces. A signed project agreement governs client work."
        aside="Website terms / Not a project agreement"
      />

      <section className="section legal-page">
        <div className="site-shell legal-layout">
          <aside className="legal-index" aria-label="Website terms sections">
            <p className="eyebrow">On this page</p>
            <nav>
              {sections.map((section, index) => (
                <a href={`#${section.id}`} key={section.id}>
                  <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                  {section.label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="legal-copy">
            <section id="website">
              <p className="eyebrow">01 / Using the website</p>
              <h2>The public site explains a professional service practice.</h2>
              <p>
                By using novyrix.com, you agree to use it lawfully and not interfere with its
                security, availability, or operation. Public content is general information about
                Novyrix capabilities. It is not technical, legal, financial, or investment advice.
              </p>
              <p>
                Service descriptions may change as the practice develops. A page marked in
                development does not represent an available service or a promise to launch it.
              </p>
            </section>

            <section id="inquiries">
              <p className="eyebrow">02 / Inquiries and engagements</p>
              <h2>An inquiry starts a review, not an account or contract.</h2>
              <p>
                Submitting the inquiry form does not create portal access, reserve capacity, accept
                a project, or bind either party. Novyrix may decline an inquiry where the work is not
                a fit, capacity is unavailable, or the request creates legal, ethical, or security
                concerns.
              </p>
              <p>
                Client work begins only under a written agreement or statement of work accepted by
                the relevant parties. That agreement controls the scope, deliverables, milestones,
                responsibilities, timeline, fees, taxes, confidentiality, intellectual property,
                support, change control, warranties, and termination terms for the engagement.
              </p>
            </section>

            <section id="payments">
              <p className="eyebrow">03 / Invoices and payments</p>
              <h2>Every payment must point back to an issued invoice.</h2>
              <p>
                Novyrix does not publish a public rate card or automated project estimate. Currency
                is resolved from the organisation&apos;s location after inquiry submission. Actual fees
                appear only in an itemised proposal, agreement, or private invoice.
              </p>
              <p>
                A private payment link may offer Paystack and BTCPay Server. The client selects the
                payment rail. A payment is treated as settled only after Novyrix verifies the
                provider record against the invoice. Provider availability, confirmations, and
                network conditions may affect processing time.
              </p>
              <p>
                Never send card details, wallet seed words, private keys, passwords, or one-time
                codes to Novyrix by email, inquiry form, or project message.
              </p>
            </section>

            <section id="materials">
              <p className="eyebrow">04 / Materials and acceptable use</p>
              <h2>The site can be read and referenced, not republished as your own.</h2>
              <p>
                Novyrix owns or licenses the website&apos;s brand, text, graphics, code, and original
                materials. You may view and link to public pages for ordinary business use. You may
                not scrape protected surfaces, bypass access controls, probe for vulnerabilities
                without written authorisation, introduce malicious code, or reproduce substantial
                site content as your own.
              </p>
              <p>
                External links are provided for context. Novyrix does not control external sites and
                is not responsible for their availability, security, or content. Client deliverable
                ownership and third-party licences are governed by the signed engagement agreement.
              </p>
            </section>

            <section id="liability">
              <p className="eyebrow">05 / Responsibility and law</p>
              <h2>The website is provided with reasonable care.</h2>
              <p>
                Novyrix works to keep public information accurate and the site available, but does
                not guarantee uninterrupted access or that every page is complete for every use.
                To the extent permitted by applicable law, Novyrix is not responsible for indirect
                loss caused solely by reliance on general website content or an external link.
              </p>
              <p>
                Nothing in these website terms excludes responsibility that cannot lawfully be
                excluded. These terms are governed by the laws of Kenya. Any project-specific dispute
                process is governed by the signed engagement agreement.
              </p>
            </section>

            <section>
              <p className="eyebrow">Changes and contact</p>
              <h2>The current version is the one published here.</h2>
              <p>
                Novyrix may update these terms when the website or operating model changes. Material
                revisions will carry a new effective date. Questions can be sent to{" "}
                <a href="mailto:contact@novyrix.com">contact@novyrix.com</a>. Personal-information
                handling is described in the <Link href="/privacy">Privacy Notice</Link>.
              </p>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
