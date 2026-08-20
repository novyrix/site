import {
  ArrowDown,
  ArrowUpRight,
  Brain,
  Buildings,
  Clock,
  CurrencyBtc,
  GlobeHemisphereEast,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink } from "@/components/site/arrow-link";
import { HeroBackground } from "@/components/site/hero-background";
import { HeroTitle, Reveal } from "@/components/site/reveal";
import { liveServices, proofPoints } from "@/lib/site-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const pillars = [
  {
    number: "01",
    title: "Systems Architecture",
    description: "Scalable, secure architectures that turn complex requirements into reliable systems.",
    icon: Buildings,
  },
  {
    number: "02",
    title: "AI Automation",
    description: "Practical automation for repeat work, with human review where judgment matters.",
    icon: Brain,
  },
  {
    number: "03",
    title: "Bitcoin Infrastructure",
    description: "Custody-aware payments, nodes, and operational tooling for real Bitcoin products.",
    icon: CurrencyBtc,
  },
];

const process = [
  {
    number: "01",
    title: "Scope the real problem",
    description:
      "We start with the operating context, constraints, and decision that matters. No premature feature list.",
  },
  {
    number: "02",
    title: "Make the work legible",
    description:
      "Architecture, deliverables, risks, and commercial terms are itemised before implementation begins.",
  },
  {
    number: "03",
    title: "Deliver with evidence",
    description:
      "Milestones are tied to working outcomes, with clear handover, monitoring, and ownership after launch.",
  },
];

const localCapabilities = [
  {
    number: "01",
    title: "Custom software and internal platforms",
    description:
      "Replace fragmented spreadsheets and manual hand-offs with a web platform designed around roles, records, approvals, and reporting.",
  },
  {
    number: "02",
    title: "M-Pesa, API, and data integration",
    description:
      "Connect payment rails, field tools, databases, and third-party services with traceable webhooks, validation, and reconciliation.",
  },
  {
    number: "03",
    title: "AI and workflow automation",
    description:
      "Reduce repeat information work with bounded automation, explicit review points, and monitoring that shows whether the workflow is useful.",
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero-home">
        <HeroBackground />
        <div className="site-shell hero-grid">
          <div className="hero-copy">
            <HeroTitle />
            <Reveal delay={0.2}>
              <p className="hero-lede">
                We architect dependable software systems, AI automation, and Bitcoin infrastructure
                for ambitious organisations.
              </p>
              <div className="hero-signals mono" aria-label="Novyrix operating signals">
                <span><Clock aria-hidden="true" /> Nairobi / EAT</span>
                <span><GlobeHemisphereEast aria-hidden="true" /> Serving globally</span>
                <span><ShieldCheck aria-hidden="true" /> Security-first</span>
              </div>
              <div className="hero-proof">
                <div>
                  <span className="mono">Systems in production</span>
                  <p className="hero-proof__stat">4.85M+</p>
                  <p className="hero-proof__label">field tasks recorded</p>
                </div>
                <div className="hero-proof__platforms">
                  <span className="mono">Platforms</span>
                  <div>
                    <strong>KISIP2</strong>
                    <small>Complex programme operations at field scale</small>
                  </div>
                  <div>
                    <strong>Afribit</strong>
                    <small>Bitcoin infrastructure shaped in Africa</small>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="hero-aside" aria-hidden="true">
            <div className="hero-aside__labels mono">
              <span>SYS-ARCH</span>
              <span>AI-AUTOMATION</span>
              <span>BITCOIN-INFRA</span>
            </div>
          </div>
        </div>
        <div className="site-shell hero-scroll-cue">
          <a href="#capabilities" className="mono">
            Scroll to explore
            <span><ArrowDown aria-hidden="true" /></span>
          </a>
        </div>
      </section>

      <section id="capabilities" className="section--surface">
        <div className="site-shell pillars">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2>Three pillars. One engineering standard.</h2>
          </Reveal>
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={index * 0.08}>
                <div className="catalog-card__top">
                  <span className="mono text-orange">{pillar.number}</span>
                  <Icon aria-hidden="true" size={24} weight="regular" />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="site-shell">
          <div className="section-heading">
            <Reveal>
              <p className="eyebrow">Capabilities / 01-09</p>
              <h2>Software built around the operation.</h2>
            </Reveal>
            <Reveal className="section-heading__aside" delay={0.12}>
              <p>
                From new platforms to difficult modernisation work, we design for clear ownership,
                reliable operations, and maintainable delivery.
              </p>
              <ArrowLink href="/services">Explore all services</ArrowLink>
            </Reveal>
          </div>

          <div className="service-index">
            {liveServices.map((service, index) => (
              <Reveal key={service.slug} delay={Math.min(index * 0.035, 0.2)}>
                <Link className="service-index__item" href={`/services/${service.slug}`}>
                  <span className="mono text-orange">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <ArrowUpRight aria-hidden="true" weight="bold" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface local-context">
        <div className="site-shell">
          <div className="section-heading">
            <Reveal>
              <p className="eyebrow">Software engineering in Kenya</p>
              <h2>Built for connected, accountable operations.</h2>
            </Reveal>
            <Reveal className="section-heading__aside" delay={0.12}>
              <p>
                Novyrix is based in Nairobi and works with organisations in Kenya, East Africa,
                and international teams operating in the region. We account for local payment
                rails, data responsibilities, connectivity, and the systems already in use.
              </p>
              <ArrowLink href="/about">About the practice</ArrowLink>
            </Reveal>
          </div>

          <div className="local-context__grid">
            {localCapabilities.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.08}>
                <article>
                  <span className="mono text-orange">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="site-shell">
          <div className="section-heading">
            <Reveal>
              <p className="eyebrow">Selected proof</p>
              <h2>Production work, not a capability list.</h2>
            </Reveal>
            <Reveal className="section-heading__aside" delay={0.12}>
              <p>
                Proof is condensed here. The detailed engineering record lives on Edmund&apos;s personal
                work archive.
              </p>
              <ArrowLink href="/work">View selected work</ArrowLink>
            </Reveal>
          </div>

          <div className="proof-grid">
            {proofPoints.map((proof, index) => (
              <Reveal key={proof.name} className="proof-card" delay={index * 0.1}>
                <p className="eyebrow">{proof.eyebrow}</p>
                <p className="proof-card__stat">{proof.stat}</p>
                <p className="proof-card__label">{proof.statLabel}</p>
                <h3>{proof.name}</h3>
                <p>{proof.summary}</p>
                <ArrowLink href={proof.href} external>
                  Open proof archive
                </ArrowLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-shell">
          <div className="section-heading">
            <Reveal>
              <p className="eyebrow">How engagements work</p>
              <h2>Complex systems. Clear delivery.</h2>
            </Reveal>
            <Reveal className="section-heading__aside" delay={0.12}>
              <p>
                Every engagement is scoped around an outcome and made visible through itemised work,
                explicit decisions, and checkable milestones.
              </p>
              <Link href="/inquire" className="button button--primary">
                Start an inquiry
                <ArrowUpRight aria-hidden="true" weight="bold" />
              </Link>
            </Reveal>
          </div>

          <div className="process-grid">
            {process.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.09}>
                <span className="mono text-orange">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="section--tight">
            <ArrowLink href="/pricing">
              Understand our engagement models
            </ArrowLink>
            <span className="mono" style={{ marginLeft: "1.5rem", color: "var(--muted)" }}>
              <ArrowDown aria-hidden="true" /> No public rate card
            </span>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
