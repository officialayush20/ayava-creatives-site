import { Container } from "@/components/ui/Container";

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
  return (
    <section aria-labelledby="results-heading" className="bg-ivory py-16 md:py-32">
      <Container>
        <h2 id="results-heading" className="sr-only">
          Results at a glance
        </h2>
        <p className="mb-10 max-w-xl font-sans text-sm text-slate-deep">
          These figures are pending verification from the founder/ops team and are shown as
          placeholders until confirmed &mdash; not published as final claims.
        </p>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          {results.map((result) => (
            <div key={result.label}>
              <span className="font-display text-[clamp(32px,4vw,56px)] font-normal leading-none text-ink">
                {result.display}
              </span>
              <p className="mt-2 font-sans text-sm text-slate-deep">{result.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
