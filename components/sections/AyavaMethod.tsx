"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const steps = [
  { title: "Audit", description: "We map the current state — every channel, every leak — before touching a single campaign." },
  { title: "Architect", description: "We design the system: channel mix, funnel, and message, sequenced for compounding return." },
  { title: "Build", description: "We execute — creative, media, code, copy — to a single strategy, not fifteen disconnected vendors." },
  { title: "Measure", description: "We instrument everything, so results are read from dashboards, not assumed from vibes." },
  { title: "Scale", description: "What works gets funded harder. What doesn't gets cut fast. No sentimental campaigns." },
];

export function AyavaMethod() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopRailRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reduced-motion fallback: rails and steps stay at their natural CSS
    // state (full opacity, rails un-scaled i.e. visible at full length) —
    // no ScrollTrigger is created at all.
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const desktopSteps = section.querySelectorAll<HTMLElement>("[data-method-step-desktop]");
      const mobileSteps = section.querySelectorAll<HTMLElement>("[data-method-step-mobile]");

      gsap.set([desktopSteps, mobileSteps], { opacity: 0, y: 20 });
      if (desktopRailRef.current) gsap.set(desktopRailRef.current, { scaleX: 0 });
      if (mobileRailRef.current) gsap.set(mobileRailRef.current, { scaleY: 0 });

      // The rail's scale is driven directly by scroll progress through the
      // section (scrub, not once) so it reads as "the process unfolds as
      // you scroll" rather than a one-shot fade-in. Each step's fade/rise
      // is offset along the same timeline so steps light up in sequence as
      // the rail draws past them, roughly matching their visual position.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });

      if (desktopRailRef.current) {
        tl.to(desktopRailRef.current, { scaleX: 1, ease: "none" }, 0);
      }
      if (mobileRailRef.current) {
        tl.to(mobileRailRef.current, { scaleY: 1, ease: "none" }, 0);
      }

      const stepCount = Math.max(desktopSteps.length, mobileSteps.length, 1);
      desktopSteps.forEach((el, i) => {
        tl.to(el, { opacity: 1, y: 0, ease: "power2.out", duration: 1 / stepCount }, i / stepCount);
      });
      mobileSteps.forEach((el, i) => {
        tl.to(el, { opacity: 1, y: 0, ease: "power2.out", duration: 1 / stepCount }, i / stepCount);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="method-heading" className="bg-ink py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="How we operate"
          title="The Ayava Method."
          headingId="method-heading"
          tone="on-ink"
          className="mb-16 md:mb-20"
        />

        {/* 5 steps — horizontal-scroll rail at desktop (per spec's recommendation
            for uneven 5-across grids), vertical stacked list from tablet down.
            A rail line above each version draws progressively (scaleX/scaleY
            tied to scroll progress) as the reader moves through the section,
            with each step fading/rising in sequence — the process "unfolds". */}
        <div className="relative hidden xl:block">
          <div
            aria-hidden="true"
            ref={desktopRailRef}
            className="absolute left-0 top-0 h-px w-full origin-left bg-gold/50"
          />
          <ol className="flex gap-8 overflow-x-auto pb-4 xl:gap-6">
            {steps.map((step, index) => (
              <li
                key={step.title}
                data-method-step-desktop
                className="relative min-w-[240px] flex-1 border-t border-transparent pt-6"
              >
                <span className="font-display text-3xl text-slate">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-normal">{step.title}</h3>
                <p className="mt-2 font-sans text-sm text-slate">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative xl:hidden">
          <div
            aria-hidden="true"
            ref={mobileRailRef}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gold/50"
          />
          <ol className="flex flex-col gap-8 border-l border-slate-deep pl-6">
            {steps.map((step, index) => (
              <li key={step.title} data-method-step-mobile className="relative">
                <span className="font-display text-2xl text-slate">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-normal">{step.title}</h3>
                <p className="mt-2 font-sans text-sm text-slate">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
