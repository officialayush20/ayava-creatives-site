import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

type CaseStudyEmptyStateProps = {
  eyebrow?: string;
  title: string;
  headingId: string;
  body: string;
  /** Optional line rendered before the em-dash metrics row, for cases where
   * the row means "no engagement exists" rather than "results are
   * pending" and needs that reframing (e.g. AI Marketing). */
  metricsLead?: string;
  metrics: string[];
  ctaLabel: string;
  ctaHref?: string;
  tone?: "on-ink" | "on-ivory";
};

/**
 * Honest empty-state pattern, promoted to a shared primitive after the
 * corrected Meta Ads `CaseStudySpotlight` (`service-contact-creative-review.md`
 * §3) proved out the pattern once and the Industries template needed the
 * identical treatment for 6 of 10 industry pages — the exact "second real
 * use case" that justifies generalizing rather than duplicating per-page.
 *
 * Full `Container` width, left-aligned, same `SectionHeader` treatment as
 * every other section — never a small centered bordered "apology" card.
 * Tone-aware: works on both ink and ivory backgrounds.
 */
export function CaseStudyEmptyState({
  eyebrow = "Case Study Spotlight",
  title,
  headingId,
  body,
  metricsLead,
  metrics,
  ctaLabel,
  ctaHref = "/contact",
  tone = "on-ink",
}: CaseStudyEmptyStateProps) {
  const bodyColor = tone === "on-ink" ? "text-slate" : "text-slate-deep";
  const metricLabelColor = tone === "on-ink" ? "text-slate" : "text-slate-deep";
  const metricValueColor = tone === "on-ink" ? "text-slate" : "text-slate-deep";
  const hairline = tone === "on-ink" ? "border-slate-deep" : "border-slate-deep/40";

  return (
    <Container>
      <SectionHeader eyebrow={eyebrow} title={title} headingId={headingId} tone={tone} className="mb-8" />
      <div data-reveal-item className="flex flex-col gap-8">
        <p className={`max-w-[70ch] font-sans text-base md:text-lg ${bodyColor}`}>{body}</p>

        {metricsLead ? (
          <p className={`-mb-2 font-sans text-sm ${metricLabelColor}`}>{metricsLead}</p>
        ) : null}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric} className={`border-t ${hairline} pt-4`}>
              <p className={`font-sans text-sm ${metricLabelColor}`}>{metric}</p>
              <p aria-hidden="true" className={`mt-3 font-display text-3xl font-normal ${metricValueColor}`}>
                —
              </p>
            </div>
          ))}
        </div>

        <Button href={ctaHref} variant="primary" tone={tone} size="large" className="w-fit">
          {ctaLabel}
        </Button>
      </div>
    </Container>
  );
}
