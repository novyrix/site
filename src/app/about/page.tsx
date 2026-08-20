import { ArrowLink } from "@/components/site/arrow-link";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Software Engineering Practice in Nairobi",
  description:
    "Meet Novyrix, a Nairobi software engineering practice led by Edmund and focused on custom platforms, AI automation, integrations, and Bitcoin infrastructure.",
  path: "/about",
});

const principles = [
  {
    number: "01",
    title: "Precise",
    description: "Name the system, the constraint, and the decision before choosing the technology.",
  },
  {
    number: "02",
    title: "Transparent",
    description: "Itemise the work, surface the risks, and keep progress checkable against the promise.",
  },
  {
    number: "03",
    title: "Security-first",
    description: "Treat access, data, failure, and ownership as architecture inputs from the beginning.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="The practice / Nairobi to anywhere"
        title="Senior engineering, clearly scoped."
        description="Novyrix is a focused technical practice building software platforms, operational automation, and Bitcoin infrastructure."
        aside="Kenya-based / Internationally capable"
      />

      <section className="section">
        <div className="site-shell detail-intro">
          <Reveal>
            <p className="eyebrow">Why Novyrix exists</p>
            <h2>Important systems deserve more than a template and a handoff.</h2>
          </Reveal>
          <Reveal className="detail-intro__body" delay={0.12}>
            <p>
              Novyrix works with organisations whose technology is part of the operation itself: a
              programme moving field data, a startup coordinating a novel workflow, or a Bitcoin
              company building financial infrastructure.
            </p>
            <p>
              Edmund leads the practice from Nairobi. Each engagement has a named technical owner,
              written decisions, and a handover designed for the people who will operate the system.
            </p>
            <ArrowLink href="https://edmund.novyrix.com/" external>
              Read Edmund&apos;s full work narrative
            </ArrowLink>
            <a className="about-email mono" href="mailto:spira@novyrix.com">
              Email Edmund / spira@novyrix.com
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section--surface">
        <div className="site-shell process-grid">
          {principles.map((principle, index) => (
            <Reveal key={principle.number} delay={index * 0.09}>
              <span className="mono text-orange">{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
