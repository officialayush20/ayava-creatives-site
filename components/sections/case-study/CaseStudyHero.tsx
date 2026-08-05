"use client";

import { useEffect, useRef } from "react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import type { CaseStudy } from "@/lib/case-studies-data";

/**
 * Full-bleed case-study hero (case-study-layout-spec.md §1). No real hero
 * assets exist for any of the 8 projects yet — MediaFrame's built-in
 * "Image pending" honest placeholder renders instead of a stock substitute.
 *
 * Entry animation mirrors the homepage Hero: a mount-time tween (not
 * ScrollTrigger, since this is always above the fold on load).
 */
export function CaseStudyHero({ study }: { study: CaseStudy }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return; // fallback: eyebrow/heading/descriptor render in final state instantly

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
    <section ref={rootRef} aria-labelledby="case-study-hero-heading" className="relative bg-surface">
      <div className="relative min-h-[70svh] w-full md:min-h-[100svh]">
        <MediaFrame
          alt={`${study.name} — ${study.descriptor}`}
          aspect="16/9"
          priority
          className="absolute inset-0 h-full min-h-[70svh] w-full rounded-none md:min-h-[100svh]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/90 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-4 pb-8 min-[428px]:px-5 md:px-8 md:pb-12 lg:px-10 xl:px-16 2xl:px-20">
          <p data-hero-item className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-hairline-strong">
            Case Study
          </p>
          <h1
            id="case-study-hero-heading"
            data-hero-item
            className="max-w-[9ch] font-display text-[clamp(32px,7vw,72px)] font-normal leading-[1.05] text-content md:max-w-[14ch]"
          >
            {study.name}
          </h1>
          <p data-hero-item className="font-sans text-base text-hairline-strong md:text-lg">
            {study.descriptor}
          </p>
        </div>
      </div>
    </section>
  );
}
