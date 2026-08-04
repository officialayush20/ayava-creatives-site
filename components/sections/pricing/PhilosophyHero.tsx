"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";

/**
 * Philosophy-framing hero (pricing-page-layout-spec.md §1) — centered,
 * plain-spoken, no CTA (the page builds its case first). Same simplicity
 * class as ContactHero — no canvas/ticker.
 */
export function PhilosophyHero() {
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
    <section
      ref={rootRef}
      aria-labelledby="pricing-hero-heading"
      className="flex min-h-[55vh] items-center bg-ivory py-16 md:py-24"
    >
      <Container className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p data-hero-item className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate-deep">
          How We Price
        </p>
        <h1 data-hero-item className="font-display text-[clamp(36px,5vw,72px)] font-normal leading-[1.05] text-ink">
          Every quote is built for the account it&apos;s for — not pulled off a shelf.
        </h1>
        <p data-hero-item className="mt-5 max-w-[56ch] font-sans text-base text-ink/70 md:text-lg">
          We don&apos;t sell fixed retainer tiers. Every engagement is scoped to your channels,
          budget, and goals before we name a number.
        </p>
      </Container>
    </section>
  );
}
