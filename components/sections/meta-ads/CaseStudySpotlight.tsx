"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/useScrollReveal";

/**
 * Honest empty-state per service-page-layout-spec §6: no real, confirmed
 * Meta Ads case study exists yet. Do not force-fit or fabricate one —
 * render a plain prompt card instead of a CaseStudySpread.
 */
export function CaseStudySpotlight() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      id="case-study"
      aria-labelledby="case-study-heading"
      className="bg-ink py-16 md:py-40"
    >
      <Container>
        <div
          data-reveal-item
          className="mx-auto flex max-w-2xl flex-col items-start gap-6 rounded-sm border border-slate-deep bg-ink-raise p-8 md:items-center md:p-16 md:text-center"
        >
          <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
            Case Study Spotlight
          </p>
          <h2 id="case-study-heading" className="font-display text-[clamp(24px,3vw,36px)] font-normal">
            In Progress, Not Invented
          </h2>
          <p className="max-w-[55ch] font-sans text-base text-slate">
            Our first documented Meta Ads case study is currently in the field — we&apos;d rather
            show you real numbers once they&apos;re confirmed than dress up a project that
            hasn&apos;t been measured yet. In the meantime, talk to us about your account and how
            we&apos;d approach it.
          </p>
          <Button href="/contact" variant="primary" tone="on-ink" size="large">
            Talk to Us About Your Account
          </Button>
        </div>
      </Container>
    </section>
  );
}
