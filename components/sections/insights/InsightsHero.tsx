"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";

/**
 * Thin hero wrapper for the Insights hub — reuses SectionHeader's primitives
 * (eyebrow + display heading) rather than the full component, since this
 * hero also needs a supporting line SectionHeader doesn't have a slot for.
 * insights-page-layout-spec.md §1.1.
 */
export function InsightsHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return; // fallback: headline/subhead render in final state instantly

    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-hero-item]");
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 24 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASE,
        stagger: 0.12,
        delay: 0.15,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} aria-labelledby="insights-hero-heading" className="bg-ink py-16 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <p data-hero-item className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
            Field Notes
          </p>
          <h1
            id="insights-hero-heading"
            data-hero-item
            className="font-display text-[length:var(--type-display-hero)] font-normal leading-[1.05] text-ivory"
          >
            Field Notes, Not Filler
          </h1>
          <p data-hero-item className="mt-6 max-w-[50ch] font-sans text-base text-slate md:text-lg">
            A working library, not a content calendar. Some pieces are live. Others are announced
            ahead of publication. All of it comes out of work we&apos;ve actually shipped for
            clients — not generic marketing-blog filler.
          </p>
        </div>
      </Container>
    </section>
  );
}
