"use client";

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  /** Numeric portion to animate, e.g. 8. Omit for non-numeric/TBD stats. */
  value?: number;
  /** Text rendered as-is around/instead of the animated number, e.g. "8+" or "[X]+". */
  display: string;
  label: string;
  tone?: "on-ink" | "on-ivory";
  className?: string;
};

/**
 * Count-up stat block. The final value is always present in the DOM as
 * static text (`display`); when a numeric `value` is supplied and the user
 * has not requested reduced motion, an in-view count-up plays as a visual
 * enhancement layered on top — screen readers always get the final text.
 */
export function StatCounter({ value, display, label, tone = "on-ink", className = "" }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [animated, setAnimated] = useState<string | null>(null);

  useEffect(() => {
    if (value === undefined) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const node = ref.current;
    if (!node) return;

    let hasPlayed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            hasPlayed = true;
            const duration = 900;
            const start = performance.now();
            const suffix = display.replace(/^[\d,]+/, "");
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const current = Math.round(value * progress);
              setAnimated(`${current}${suffix}`);
              if (progress < 1) requestAnimationFrame(step);
              else setAnimated(display);
            };
            requestAnimationFrame(step);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, display]);

  const numberColor = tone === "on-ink" ? "text-gold" : "text-ink";
  const labelColor = tone === "on-ink" ? "text-slate" : "text-slate-deep";

  return (
    <div className={className}>
      <span
        ref={ref}
        aria-live="off"
        className={`font-display text-[clamp(32px,4vw,56px)] font-normal leading-none ${numberColor}`}
      >
        {animated ?? display}
      </span>
      <p className={`mt-2 font-sans text-sm ${labelColor}`}>{label}</p>
    </div>
  );
}
