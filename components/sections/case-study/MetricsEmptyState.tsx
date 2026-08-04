import { Container } from "@/components/ui/Container";

/**
 * Before/After Metrics empty state — distinct from `CaseStudyEmptyState`
 * (components/ui/CaseStudyEmptyState.tsx) by design intent, not oversight:
 *
 * `CaseStudyEmptyState` answers "no case study exists here at all yet" on
 * an industry/service page — full-width, a CTA routing to /contact, a 3-up
 * row of em-dash metric placeholders standing in for an entire missing
 * case study.
 *
 * This component answers a narrower, different question: "this real,
 * narrated project exists, but its Before/After numbers aren't verified
 * yet." Per case-study-layout-spec.md §4 that calls for a single centered
 * message inside a bordered "data module" panel (not full page width) with
 * a link back UP to the qualitative Results copy already on the page —
 * not a CTA to /contact, since the visitor is mid-page, not at a decision
 * point about whether Ayava exists as an option. Reusing CaseStudyEmptyState
 * here would misrepresent both the panel width (spec explicitly wants a
 * bordered, scoped-down "data module" here, distinct from the ivory zone
 * around it) and the CTA target.
 */
export function MetricsEmptyState({ resultsAnchorId }: { resultsAnchorId: string }) {
  return (
    <section aria-labelledby="metrics-heading" className="bg-ivory py-16 md:py-24">
      <Container>
        <div className="border border-slate-deep/40 px-6 py-16 md:px-12">
          <h2
            id="metrics-heading"
            className="mb-4 text-center font-display text-2xl font-normal text-ink md:text-3xl"
          >
            Results at a Glance
          </h2>
          <p className="mx-auto max-w-[52ch] text-center font-sans text-base text-slate-deep">
            Measured results for this project are being finalized.{" "}
            <a
              href={`#${resultsAnchorId}`}
              className="font-medium text-ink underline underline-offset-4 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              Read about the outcomes ↑
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
