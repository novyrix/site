import Link from "next/link";
import { ArrowLink } from "@/components/site/arrow-link";
import { PageHero } from "@/components/site/page-hero";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Notice",
  description:
    "How Novyrix collects, uses, protects, and handles personal information submitted through its website and service engagements.",
  path: "/privacy",
});

const sections = [
  { id: "information", label: "Information we handle" },
  { id: "purpose", label: "Why we use it" },
  { id: "sharing", label: "Service providers" },
  { id: "retention", label: "Retention and security" },
  { id: "rights", label: "Your rights" },
];

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Privacy notice / Effective 20 August 2026"
        title="Your context stays tied to its purpose."
        description="This notice explains what Novyrix handles when you browse the site, submit an inquiry, or work with us."
        aside="Nairobi, Kenya / contact@novyrix.com"
      />

      <section className="section legal-page">
        <div className="site-shell legal-layout">
          <aside className="legal-index" aria-label="Privacy notice sections">
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
            <section>
              <p className="eyebrow">Who is responsible</p>
              <h2>Novyrix is the data controller for this site.</h2>
              <p>
                Novyrix is a software engineering practice based in Nairobi, Kenya. Questions or
                requests about personal information can be sent to{" "}
                <a href="mailto:contact@novyrix.com">contact@novyrix.com</a>.
              </p>
            </section>

            <section id="information">
              <p className="eyebrow">01 / Information we handle</p>
              <h2>We collect the information needed to assess and deliver work.</h2>
              <h3>Inquiry information</h3>
              <p>
                The inquiry form collects your name, work email, organisation name and type,
                country, services of interest, problem description, and an optional budget context.
                The country is used once to resolve the proposal currency.
              </p>
              <h3>Engagement information</h3>
              <p>
                If we work together, we may process proposal, agreement, milestone, invoice,
                payment-status, delivery, and correspondence records. Novyrix does not store full
                card details. A selected payment provider handles those details under its own terms.
              </p>
              <h3>Site and security information</h3>
              <p>
                Hosting and security systems may process request logs, device and browser details,
                approximate location, timestamps, and diagnostic information. Vercel Web Analytics
                and Speed Insights may collect aggregated page and performance measurements when
                enabled. The public site does not use advertising cookies.
              </p>
            </section>

            <section id="purpose">
              <p className="eyebrow">02 / Why we use it</p>
              <h2>Each use is attached to a clear operating reason.</h2>
              <ul>
                <li>Review an inquiry and take requested steps before a possible engagement.</li>
                <li>Prepare, perform, document, and support an agreed service.</li>
                <li>Create invoices, verify settlement, issue receipts, and keep business records.</li>
                <li>Protect the site, investigate faults, and maintain reliable operations.</li>
                <li>Understand aggregate site performance without building advertising profiles.</li>
                <li>Meet applicable legal, tax, accounting, and dispute-resolution obligations.</li>
              </ul>
              <p>
                We do not sell personal information. Inquiry details are not added to a marketing
                list simply because you contacted us.
              </p>
            </section>

            <section id="sharing">
              <p className="eyebrow">03 / Service providers</p>
              <h2>Information moves only where the service requires it.</h2>
              <p>Depending on the interaction, approved providers may include:</p>
              <ul>
                <li>Vercel for website hosting, aggregate analytics, and performance measurement.</li>
                <li>Resend for inquiry, invoice, receipt, and operational email delivery.</li>
                <li>Paystack when a client selects card or M-Pesa for an issued invoice.</li>
                <li>BTCPay Server when a client selects Bitcoin or Lightning for an issued invoice.</li>
                <li>Infrastructure, backup, and monitoring providers used to operate the platform.</li>
              </ul>
              <p>
                Some providers may process information outside Kenya. Where that happens, Novyrix
                uses the provider for a defined purpose and considers the contractual, security, and
                transfer safeguards appropriate to the information involved.
              </p>
            </section>

            <section id="retention">
              <p className="eyebrow">04 / Retention and security</p>
              <h2>Keep what is needed. Restrict who can reach it.</h2>
              <p>
                Inquiry records are retained while they are relevant to the requested conversation
                and legitimate business records. Agreement, invoice, payment, and delivery records
                may be kept longer where an engagement, legal duty, accounting rule, or dispute
                requires it. Records that no longer serve a valid purpose are deleted or anonymised.
              </p>
              <p>
                Controls include encrypted transport, private database networking, restricted
                administrative access, authenticated service calls, backups, and uptime monitoring.
                No internet service can promise absolute security, so controls are reviewed as the
                platform and its risks change.
              </p>
            </section>

            <section id="rights">
              <p className="eyebrow">05 / Your rights</p>
              <h2>You can ask what we hold and challenge how it is used.</h2>
              <p>
                Kenya&apos;s Data Protection Act gives data subjects rights that include being informed,
                accessing personal data, objecting to processing, correcting false or misleading
                data, and requesting deletion of false or misleading data. Data portability may
                apply in the circumstances set by law.
              </p>
              <p>
                Send a request to <a href="mailto:contact@novyrix.com">contact@novyrix.com</a> with
                enough information for us to identify the relevant record safely. We may need to
                verify identity before responding. You may also raise a concern with Kenya&apos;s Office
                of the Data Protection Commissioner.
              </p>
              <div className="legal-links">
                <ArrowLink
                  href="https://new.kenyalaw.org/akn/ke/act/2019/24/eng@2022-12-31"
                  external
                >
                  Read the Data Protection Act
                </ArrowLink>
                <ArrowLink href="https://www.odpc.go.ke/" external>
                  Office of the Data Protection Commissioner
                </ArrowLink>
              </div>
            </section>

            <section>
              <p className="eyebrow">Changes and contact</p>
              <h2>This notice changes when the operating reality changes.</h2>
              <p>
                Material updates will be reflected on this page with a revised effective date. For
                privacy questions, email <a href="mailto:contact@novyrix.com">contact@novyrix.com</a>.
                For project inquiries, use the <Link href="/inquire">scoped inquiry form</Link>.
              </p>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
