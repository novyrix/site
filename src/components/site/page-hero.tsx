import { HeroBackground } from "@/components/site/hero-background";
import { Reveal } from "@/components/site/reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  aside?: string;
}) {
  return (
    <section className="page-hero">
      <HeroBackground compact />
      <div className="site-shell page-hero__grid">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </Reveal>
        <Reveal className="page-hero__description" delay={0.12}>
          <p>{description}</p>
          {aside ? <span className="mono">{aside}</span> : null}
        </Reveal>
      </div>
    </section>
  );
}
