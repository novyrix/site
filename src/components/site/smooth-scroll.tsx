"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
      || window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let cancelled = false;
    let frame = 0;
    let lenis: InstanceType<typeof import("lenis").default> | null = null;

    const initialize = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };

      frame = requestAnimationFrame(raf);
    };

    const timer = window.setTimeout(initialize, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
