import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Start an Inquiry",
  description: "Share the operating context, organisation, and system problem with Novyrix.",
  path: "/inquire",
});

export default function InquirePage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Scoped inquiry / Approximately 4 minutes"
        title="Start with the system, not a sales call."
        description="Give us enough context to assess fit, prepare a useful discovery conversation, and resolve the right proposal currency."
        aside="Submitting an inquiry does not create portal access"
      />

      <section className="section">
        <div className="site-shell inquiry-layout">
          <Reveal className="inquiry-layout__aside">
            <p className="eyebrow">What happens next</p>
            <h2>A fit check before anyone loses an afternoon.</h2>
            <p>
              We review the organisation, problem, likely service fit, and scope. If it is a good match,
              the next step is a focused discovery conversation. If not, we say so plainly.
            </p>
            <p className="mono">No auto-quote / No instant portal account / No mailing-list trap</p>
          </Reveal>
          <Reveal delay={0.12}>
            <InquiryForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
