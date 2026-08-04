"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";

/**
 * Short, index-page framing hero for `/industries` — deliberately NOT the
 * homepage's full-viewport cinematic hero (no HeroCanvasSlot, no stat
 * ticker). Single column, left-aligned, content-driven height per
 * industries-hub-layout-spec.md §1. No CTA row here — the grid below is
 * the primary navigation, the CTA Band closes the page instead.
 */
export function IndustriesHubHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return; // fallback: heading/copy render in final state instantly

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
      aria-labelledby="industries-hub-heading"
      className="flex min-h-[32vh] items-center bg-ink py-16 md:min-h-[40vh] md:py-24"
    >
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10 md:mb-12">
          <ol className="flex items-center gap-2 font-sans text-xs text-slate">
            <li>
              <Link
                href="/"
                className="transition-colors duration-200 ease-out hover:text-ivory underline-offset-4 hover:underline"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ivory">
              Industries
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl md:col-span-8">
          <p data-hero-item className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
            Industries
          </p>
          <h1
            id="industries-hub-heading"
            data-hero-item
            className="font-display text-[clamp(28px,8vw,56px)] font-normal leading-[1.05] text-ivory"
          >
            We don&apos;t run one playbook across ten verticals.
          </h1>
          <p data-hero-item className="mt-6 max-w-[60ch] font-sans text-base text-slate md:text-lg">
            Every industry buys differently, trusts differently, and converts on a different
            timeline. We build the specific strategy your vertical actually runs on — not a
            generic template with your logo swapped in.
          </p>
        </div>
      </Container>
    </section>
  );
}
