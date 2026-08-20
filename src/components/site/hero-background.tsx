import Image from "next/image";

export function HeroBackground({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <Image
        className="hero-background hero-background--dark"
        src="/visuals/ember-topography-dark.png"
        alt=""
        fill
        loading="lazy"
        fetchPriority="low"
        sizes="100vw"
        quality={78}
        aria-hidden="true"
      />
      <Image
        className="hero-background hero-background--light"
        src="/visuals/ember-topography-light.png"
        alt=""
        fill
        priority={!compact}
        fetchPriority={compact ? "auto" : "high"}
        sizes="100vw"
        quality={78}
        aria-hidden="true"
      />
    </>
  );
}
