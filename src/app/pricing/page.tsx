import { ArrowLink } from "@/components/site/arrow-link";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { engagementModels } from "@/lib/site-data";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Engagement Models",
  description: "How Novyrix scopes fixed work, retainers, and technical advisory without a public rate card.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Engagement models / No public rate card"
        title="Clear scope before a number."
        description="Pricing follows the actual system, risk, and delivery path. Public figures would imply false equivalence between unlike problems."
        aside="Location resolves currency once / Proposals stay itemised"
      />

      <section className="section">
        <div className="site-shell engagement-grid">
          {engagementModels.map((model, index) => (
            <Reveal key={model.number} delay={index * 0.09}>
              <span className="mono text-orange">{model.number}</span>
              <h2>{model.name}</h2>
              <p>{model.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--surface">
        <div className="site-shell quote-promise">
          <Reveal>
            <p className="eyebrow">The itemised-quote promise</p>
            <h2>You will know what each part of the work is for.</h2>
          </Reveal>
          <Reveal className="quote-promise__body" delay={0.12}>
            <p>
              Proposals separate scope, deliverables, milestones, assumptions, and commercial terms.
              Currency is resolved from the organisation&apos;s location after the inquiry, then remains
              consistent through proposal and invoicing.
            </p>
            <p>No automated estimator. No bundled mystery total. No public rate table.</p>
            <ArrowLink href="/inquire">Start with the operating context</ArrowLink>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
