import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { getService, services } from "@/lib/site-data";
import { buildPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return buildPageMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const faqItems = [
    {
      question:
        service.status === "live"
          ? `What does a ${service.title.toLowerCase()} engagement include?`
          : `Is the ${service.title.toLowerCase()} service available now?`,
      answer: service.status === "live" ? service.approach : service.summary,
    },
    {
      question: "Can Novyrix work with an existing system or vendor?",
      answer:
        "Yes. Discovery starts by mapping the current tools, contracts, data, and technical constraints. The recommendation may be to improve, integrate, replace, or leave parts of the existing system unchanged.",
    },
    {
      question: "Where does Novyrix deliver engineering work?",
      answer:
        "Novyrix is based in Nairobi and works with organisations in Kenya, across East Africa, and internationally. Engagements can be delivered remotely or with agreed on-site working sessions.",
    },
  ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.metaDescription,
        serviceType: service.title,
        areaServed: ["Kenya", "East Africa", "International"],
        provider: {
          "@type": "ProfessionalService",
          name: "Novyrix",
          url: "https://novyrix.com",
        },
        url: `https://novyrix.com/services/${service.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <main id="main-content">
      <PageHero
        eyebrow={`Service ${service.number} / ${service.status === "live" ? "Live" : "In development"}`}
        title={service.title}
        description={service.short}
        aside={service.engagementFit}
      />

      <section className="section">
        <div className="site-shell detail-intro">
          <Reveal>
            <p className="eyebrow">What it is</p>
            <h2>{service.proposition}</h2>
            <p className="detail-intro__summary">{service.summary}</p>
          </Reveal>
          <Reveal className="detail-intro__body" delay={0.12}>
            <p className="eyebrow">Who it is for</p>
            <p>{service.whoFor}</p>
            <p className="eyebrow detail-intro__proof-label">Proof point</p>
            <p>{service.proof}</p>
          </Reveal>
        </div>
      </section>

      <section className="section--surface">
        <div className="site-shell detail-columns">
          <Reveal>
            <span className="mono text-orange">01 / Deliverables</span>
            <h2>Typical outputs</h2>
            <ol className="deliverable-list">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="mono text-orange">02 / Engagement fit</span>
            <h2>How the work fits</h2>
            <p>{service.engagementFit}</p>
            <Link href="/pricing" className="arrow-link">
              Engagement models
              <ArrowUpRight aria-hidden="true" weight="bold" />
            </Link>
          </Reveal>
          <Reveal delay={0.16}>
            <span className="mono text-orange">03 / Next step</span>
            <h2>{service.status === "live" ? "Scope the problem" : "Follow development"}</h2>
            <p>
              {service.status === "live"
                ? "A useful inquiry gives us the operating context, constraints, and outcome before a discovery call."
                : "This service is not being sold early. Use the inquiry form for adjacent security-engineering needs."}
            </p>
            <Link href="/inquire" className="button button--primary">
              {service.status === "live" ? "Start an inquiry" : "Discuss security engineering"}
              <ArrowUpRight aria-hidden="true" weight="bold" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section service-depth">
        <div className="site-shell">
          <div className="service-depth__intro">
            <Reveal>
              <p className="eyebrow">How the work is approached</p>
              <h2>Start with the operating reality.</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p>{service.approach}</p>
            </Reveal>
          </div>

          <div className="service-faq">
            {faqItems.map((item, index) => (
              <Reveal key={item.question} className="service-faq__item" delay={index * 0.08}>
                <article>
                  <span className="mono text-orange">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </main>
  );
}
