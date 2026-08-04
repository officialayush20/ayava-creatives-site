"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/useScrollReveal";

const pendingMetrics = [
  "Cost per qualified lead, before and after",
  "Creative win rate by audience segment",
  "Spend efficiency across the retargeting funnel",
];

/**
 * Honest empty-state per service-page-layout-spec §6: no real, confirmed
 * Meta Ads case study exists yet. Do not force-fit or fabricate one — this
 * renders full-width, left-aligned, matching every other section's
 * SectionHeader treatment rather than a small centered "apology" card.
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
        <SectionHeader
          eyebrow="Case Study Spotlight"
          title="In Progress, Not Invented"
          headingId="case-study-heading"
          tone="on-ink"
          className="mb-8"
        />
        <div data-reveal-item className="flex flex-col gap-8">
          <p className="max-w-[70ch] font-sans text-base text-slate md:text-lg">
            A documented Meta Ads case study is in the field now. We&apos;d rather publish
            confirmed numbers than dress up a project that hasn&apos;t been measured — so here&apos;s
            what we&apos;ll report when it lands: cost per qualified lead before and after,
            creative win rate by audience segment, and spend efficiency across the retargeting
            funnel.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {pendingMetrics.map((metric) => (
              <div key={metric} className="border-t border-slate-deep pt-4">
                <p className="font-sans text-sm text-slate">{metric}</p>
                <p aria-hidden="true" className="mt-3 font-display text-3xl font-normal text-slate">
                  —
                </p>
              </div>
            ))}
          </div>

          <Button href="/contact" variant="primary" tone="on-ink" size="large" className="w-fit">
            Talk Through Your Account
          </Button>
        </div>
      </Container>
    </section>
  );
}
