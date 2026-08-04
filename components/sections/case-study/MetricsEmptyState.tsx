import { CaseStudyEmptyState } from "@/components/ui/CaseStudyEmptyState";

const pendingMetrics = [
  "Cost per qualified lead, before and after",
  "Conversion rate at the point of engagement",
  "Return on ad/creative spend over the engagement",
];

/**
 * Results-at-a-glance empty state for case studies whose Before/After
 * numbers aren't verified yet. Rebuilt on the shared `CaseStudyEmptyState`
 * primitive (components/ui/CaseStudyEmptyState.tsx) — full-width,
 * left-aligned, no border, no centering — matching the corrected pattern
 * from Meta Ads `CaseStudySpotlight`. The earlier centered-bordered-box
 * version reproduced the exact pattern already rejected once and has been
 * replaced.
 */
export function MetricsEmptyState({ resultsAnchorId }: { resultsAnchorId: string }) {
  return (
    <section aria-labelledby="metrics-heading" className="bg-ivory py-16 md:py-24">
      <CaseStudyEmptyState
        eyebrow="Results at a Glance"
        title="Measured Numbers, Coming Soon"
        headingId="metrics-heading"
        body="Quantified Before/After results for this project are being finalized. Read the qualitative outcomes above, or check back for the confirmed figures — we publish measured numbers, not estimates."
        metrics={pendingMetrics}
        ctaLabel="Read About the Outcomes"
        ctaHref={`#${resultsAnchorId}`}
        tone="on-ivory"
      />
    </section>
  );
}
