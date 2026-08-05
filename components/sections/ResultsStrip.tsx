"use client";

import { Container } from "@/components/ui/Container";
import { StatCounter } from "@/components/ui/StatCounter";
import { useScrollReveal } from "@/lib/useScrollReveal";

const results = [
  { display: "[X]+", label: "Campaigns launched" },
  { display: "[X]+", label: "Industries served" },
  { display: "[X]", label: "Years combined team experience" },
  { display: "[X]+", label: "Platforms managed" },
];

/**
 * All four metrics are explicitly TBC in the copy doc pending verified
 * figures from the founder/ops — rendered as honest bracketed placeholders,
 * not animated StatCounters (there's no real number to count up to yet).
 */
export function ResultsStrip() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="results-heading" className="bg-surface py-16 md:py-32">
      <Container>
        <h2 id="results-heading" className="sr-only">
          Results at a glance
        </h2>
        <p data-reveal-item className="mb-10 max-w-xl font-sans text-sm text-hairline-strong">
          These figures are pending verification from the founder/ops team and are shown as
          placeholders until confirmed &mdash; not published as final claims.
        </p>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          {results.map((result) => (
            <div key={result.label} data-reveal-item>
              <StatCounter display={result.display} label={result.label} tone="on-ink" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
