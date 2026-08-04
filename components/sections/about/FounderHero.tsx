"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";

/**
 * Founder-led hero — not the homepage's full-viewport cinematic treatment
 * (about-page-layout-spec.md §1). No real photo of Ayush exists yet, so the
 * portrait slot renders MediaFrame's honest "Image pending" placeholder
 * rather than a stock/illustrated stand-in, per the spec's explicit
 * fallback instruction.
 */
export function FounderHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return; // fallback: headline/subhead/portrait render in final state instantly

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
      aria-labelledby="about-hero-heading"
      className="flex min-h-[60vh] items-center bg-ink py-16 md:py-24"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-7" data-hero-item>
            <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
              About Ayava
            </p>
            <h1 className="font-display text-[length:var(--type-display-hero)] font-normal leading-[1.0] text-ivory">
              One founder. Full accountability. No account-manager layer.
            </h1>
            <p className="mt-6 max-w-[48ch] font-sans text-base text-slate md:text-lg">
              Ayava Creatives is built and run by me — Ayush Saini, a full-stack developer and
              growth marketer who builds the product and markets it, without handing either off
              to someone else.
            </p>
          </div>
          <div className="md:col-span-5" data-hero-item>
            <MediaFrame
              alt="Portrait of Ayush Saini — photo pending"
              aspect="4/5"
              className="border border-slate-deep"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
