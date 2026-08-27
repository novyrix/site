import { ArrowLink } from "@/components/site/arrow-link";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { proofPoints } from "@/lib/site-data";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Selected Work",
  description: "Selected production work, kept in its operating context and linked to the detailed engineering record.",
  path: "/work",
});

export default function WorkPage() {
  const [institutionalProof, bitcoinProof] = proofPoints;

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Selected proof / Separate records"
        title="Evidence, not a gallery."
        description="Each record stays inside its own operating context, with the headline numbers and a path to the full engineering account."
        aside="Condensed here / Full record on edmund.novyrix.com"
      />

      <section className="section proof-domain proof-domain--institutional">
        <div className="site-shell proof-domain__grid">
          <Reveal className="proof-domain__intro">
            <p className="eyebrow">01 / Programme systems</p>
            <h2>Infrastructure for work happening across the field.</h2>
            <p>
              A condensed view of delivery scale. The detailed record covers the field tools,
              engineering decisions, and operating constraints.
            </p>
          </Reveal>
          <ProofRecord proof={institutionalProof} />
        </div>
      </section>

      <section className="proof-context-switch" aria-label="A separate operating record begins">
        <div className="site-shell proof-context-switch__inner">
          <span className="mono">Context switch / 02</span>
          <p>A separate operating record begins here.</p>
        </div>
      </section>

      <section className="section section--surface proof-domain proof-domain--bitcoin">
        <div className="site-shell proof-domain__grid">
          <Reveal className="proof-domain__intro">
            <p className="eyebrow">02 / Bitcoin infrastructure</p>
            <h2>Infrastructure shaped by daily use in Africa.</h2>
            <p>
              This record is about payment rails, merchant operations, and tools built around how
              people actually transact.
            </p>
          </Reveal>
          <ProofRecord proof={bitcoinProof} />
        </div>
      </section>

      <section className="section">
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

function ProofRecord({ proof }: { proof: (typeof proofPoints)[number] }) {
  return (
    <Reveal className="proof-card" delay={0.1}>
      <p className="eyebrow">{proof.eyebrow}</p>
      <p className="proof-card__stat">{proof.stat}</p>
      <p className="proof-card__label">{proof.statLabel}</p>
      <h3>{proof.name}</h3>
      <p>{proof.summary}</p>
      <ArrowLink href={proof.href} external>
        Read the detailed case study
      </ArrowLink>
    </Reveal>
  );
}
