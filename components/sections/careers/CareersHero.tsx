"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";

/**
 * Honest "not hiring, but interested" hero (careers-page-layout-spec.md
 * §1) — shortest hero class on the site, ivory, centered. Warm framing:
 * never states the closed-door fact without immediately pivoting to the
 * invitation.
 */
export function CareersHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return; // fallback: headline/subhead/CTA render in final state instantly

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
      aria-labelledby="careers-hero-heading"
      className="flex min-h-[50vh] items-center bg-inverse-surface bg-[image:var(--gradient-dawn-mesh)] bg-cover py-16 md:py-24"
    >
      <Container className="flex max-w-3xl flex-col">
        <p data-hero-item className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-hairline">
          Careers
        </p>
        <h1 data-hero-item className="font-display text-[clamp(32px,4.5vw,60px)] font-normal leading-[1.05] text-inverse-content">
          We&apos;re not hiring right now — but we&apos;d still like to hear from you.
        </h1>
        <p data-hero-item className="mt-5 max-w-[52ch] font-sans text-base text-inverse-content/70 md:text-lg">
          Ayava is a lean, founder-led studio today. When that changes, I&apos;d rather already
          know who&apos;s interested than start from zero. Tell me a bit about yourself below.
        </p>
        <div data-hero-item className="mt-8">
          <Button href="#interest-form" variant="primary" tone="on-ivory" size="large">
            Introduce Yourself
          </Button>
        </div>
      </Container>
    </section>
  );
}
