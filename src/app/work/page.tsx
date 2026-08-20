import { ArrowLink } from "@/components/site/arrow-link";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { proofPoints } from "@/lib/site-data";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Selected Work",
  description: "Condensed proof from KISIP2 and Afribit, with links to the detailed work archive.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Selected proof / 02 systems"
        title="Evidence, not a gallery."
        description="Two production systems that show the standard: one operating at programme scale, one built from Bitcoin-native constraints in Africa."
        aside="Condensed here / Detailed on edmund.novyrix.com"
      />

      <section className="section">
        <div className="site-shell proof-grid">
          {proofPoints.map((proof, index) => (
            <Reveal key={proof.name} className="proof-card" delay={index * 0.1}>
              <p className="eyebrow">{proof.eyebrow}</p>
              <p className="proof-card__stat">{proof.stat}</p>
              <p className="proof-card__label">{proof.statLabel}</p>
              <h3>{proof.name}</h3>
              <p>{proof.summary}</p>
              <ArrowLink href={proof.href} external>
                Read the detailed case study
              </ArrowLink>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--surface">
        <div className="site-shell quote-promise">
          <Reveal>
            <p className="eyebrow">The proof rule</p>
            <h2>Show the system. Name the constraint. Link the evidence.</h2>
          </Reveal>
          <Reveal className="quote-promise__body" delay={0.12}>
            <p>
              Novyrix does not reproduce long case studies here. The commercial site gives a useful
              signal, then points to the full engineering record where context can be evaluated properly.
            </p>
            <ArrowLink href="/inquire">Bring us a comparable problem</ArrowLink>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
