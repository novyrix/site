import { ArrowLink } from "@/components/site/arrow-link";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { services } from "@/lib/site-data";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Software Engineering Services in Kenya",
  description:
    "Custom software, systems integration, AI automation, cloud, M-Pesa payments, application security, and Bitcoin infrastructure from Nairobi.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Capabilities / 01-10"
        title="Engineering for systems that matter."
        description="Nine live services across custom software, architecture, automation, integrations, infrastructure, and advisory. One developing assessment offer is clearly marked."
        aside="Nairobi-based / Working across Kenya and internationally"
      />

      <section className="section">
        <div className="site-shell catalog-grid">
          {services.map((service, index) => (
            <Reveal key={service.slug} className="catalog-card" delay={Math.min(index * 0.05, 0.2)}>
              <div className="catalog-card__top">
                <span className="mono text-orange">{service.number}</span>
                {service.status === "in-development" ? (
                  <span className="catalog-card__status">In development</span>
                ) : (
                  <span className="mono">Live</span>
                )}
              </div>
              <h2>{service.title}</h2>
              <p>{service.short}</p>
              <ArrowLink href={`/services/${service.slug}`}>
                View service
              </ArrowLink>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
