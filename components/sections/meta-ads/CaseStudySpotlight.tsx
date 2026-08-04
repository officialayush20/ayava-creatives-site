"use client";

import { CaseStudyEmptyState } from "@/components/ui/CaseStudyEmptyState";
import { useScrollReveal } from "@/lib/useScrollReveal";

const pendingMetrics = [
  "Cost per qualified lead, before and after",
  "Creative win rate by audience segment",
  "Spend efficiency across the retargeting funnel",
];

/**
 * Honest empty-state per service-page-layout-spec §6: no real, confirmed
 * Meta Ads case study exists yet. Now built on the shared
 * `CaseStudyEmptyState` primitive (promoted from this component per the
 * Industries template's identical need — see `components/ui/CaseStudyEmptyState.tsx`).
 */
export function CaseStudySpotlight() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} id="case-study" aria-labelledby="case-study-heading" className="bg-ink py-16 md:py-40">
      <CaseStudyEmptyState
        title="In Progress, Not Invented"
        headingId="case-study-heading"
        body="A documented Meta Ads case study is in the field now. We'd rather publish confirmed numbers than dress up a project that hasn't been measured — so here's what we'll report when it lands: cost per qualified lead before and after, creative win rate by audience segment, and spend efficiency across the retargeting funnel."
        metrics={pendingMetrics}
        ctaLabel="Talk Through Your Account"
        tone="on-ink"
      />
    </section>
  );
}
