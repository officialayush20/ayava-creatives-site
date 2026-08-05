"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";

/**
 * Work Hub hero — an index-page open, not the cinematic homepage hero.
 * No scroll-triggered choreography (work-hub-layout-spec.md §1), but a
 * quiet entry fade-up on load, same pattern as the homepage Hero — it's
 * above the fold so this isn't a ScrollTrigger, just a mount-time tween.
 */
export function WorkHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return; // fallback: heading/subhead render in final state instantly

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
        delay: 0.1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} aria-labelledby="work-hero-heading" className="bg-surface pt-16 pb-12 md:pb-24 md:pt-40">
      <Container>
        {/* Dawn Mesh (light theme only — no-op in dark). See
            docs/light-theme-application-map.md, Work Hub mapping. */}
        <div className="max-w-[52ch] bg-[image:var(--gradient-dawn-mesh)] bg-cover md:max-w-none md:[&>*]:max-w-[62ch]">
          <p data-hero-item className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-content-body">
            Our Work
          </p>
          <h1
            id="work-hero-heading"
            data-hero-item
            className="max-w-[16ch] font-display text-[clamp(30px,8vw,72px)] font-normal leading-[1.05] text-content md:max-w-[12ch]"
          >
            Eight projects, eight industries, one founder-led process.
          </h1>
          <p
            data-hero-item
            className="mt-6 max-w-[38ch] font-sans text-base text-content-body md:max-w-[52ch] md:text-lg"
          >
            Every build on this page was designed, architected, and executed under one operator&rsquo;s direct
            involvement — not handed off across five subcontractors. Fewer projects, more scrutiny on each.
          </p>
        </div>
      </Container>
    </section>
  );
}
