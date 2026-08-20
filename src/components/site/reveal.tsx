import type { CSSProperties } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const style = { "--reveal-shift": `${28 + delay * 16}px` } as CSSProperties;

  return (
    <div className={["reveal", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </div>
  );
}

export function HeroTitle() {
  return (
    <h1 className="hero-title" aria-label="Development, engineered.">
      <span>Development,</span>
      <span className="text-orange">engineered.</span>
      <span className="hero-title__signal" aria-hidden="true" />
    </h1>
  );
}
