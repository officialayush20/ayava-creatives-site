"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StatCounter } from "@/components/ui/StatCounter";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";

const stats = [
  { display: "15", label: "Marketing systems operated", value: 15 },
  { display: "10", label: "Industries covered", value: 10 },
  { display: "5", label: "Step delivery method", value: 5 },
];

/**
 * HeroCanvasSlot: empty layout slot reserved for the webgl-3d-artist's
 * canvas (cols 8-12 on desktop). Static/CSS-only placeholder for now.
 */
function HeroCanvasSlot() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,var(--color-ink-raise)_0%,transparent_60%)]" />
      <div className="absolute right-[10%] top-1/2 h-[60%] w-px -translate-y-1/2 bg-slate-deep" />
    </div>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return; // fallback: headline/subhead/CTAs render in final state instantly

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
        delay: 0.15, // brief settle beat before the entry plays, feels intentional not instant
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink"
    >
      <HeroCanvasSlot />

      <Container className="relative z-10 flex flex-1 items-center pt-12 md:pt-16">
        <div className="max-w-[44ch] pt-[8vh] lg:w-7/12">
          <h1
            id="hero-heading"
            data-hero-item
            className="font-display text-[clamp(32px,10vw,128px)] font-normal leading-[0.95] lg:text-[clamp(48px,7vw,128px)]"
          >
            Marketing, engineered like infrastructure.
          </h1>
          <p
            data-hero-item
            className="mt-6 max-w-[44ch] font-sans text-base text-slate sm:text-lg"
          >
            Ayava Creatives builds and runs the 15 systems &mdash; from Meta Ads to CRO to AI
            marketing &mdash; that take a brand from &ldquo;running ads&rdquo; to &ldquo;running
            a growth engine.&rdquo; Built in Dehradun. Built for scale.
          </p>
          <div data-hero-item className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" variant="primary" size="large" className="w-full sm:w-auto">
              Get Free Audit
            </Button>
            <Button href="/contact#call" variant="secondary" size="large" className="w-full sm:w-auto">
              Book Strategy Call
            </Button>
          </div>
        </div>
      </Container>

      <div
        role="region"
        aria-label="Ayava Creatives at a glance"
        className="relative z-10 border-t border-slate-deep"
      >
        <Container>
          <div className="grid grid-cols-2 gap-6 overflow-x-auto py-6 sm:grid-cols-3 sm:gap-8 sm:py-8">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} tone="on-ink" />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
