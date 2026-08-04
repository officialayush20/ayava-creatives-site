import { Container } from "@/components/ui/Container";
import type { NarrativeStage as NarrativeStageType } from "@/lib/case-studies-data";

type NarrativeStageProps = {
  stage: NarrativeStageType;
  headingId: string;
  /** Challenge/Execution = "a" (text cols 1-6), Strategy/Results = "b" (text cols 7-12) — A-B-A-B rhythm per case-study-layout-spec.md §3. */
  side: "a" | "b";
};

/**
 * No `InlineDataViz` slot rendered — none of the 8 projects have real
 * process data (timeline/phase counts, etc.) documented in the copy doc,
 * and the spec is explicit the visual is optional/only-if-real-data-exists.
 * Text sits in its alternating column with generous whitespace instead of
 * an empty chart placeholder.
 */
export function NarrativeStage({ stage, headingId, side }: NarrativeStageProps) {
  return (
    <section aria-labelledby={headingId} className="bg-ivory py-16 md:py-24">
      <Container>
        <div className={`grid grid-cols-1 md:grid-cols-12 ${side === "b" ? "md:justify-items-end" : ""}`}>
          <div className={`flex flex-col gap-4 md:col-span-6 ${side === "b" ? "md:col-start-7" : ""}`}>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate-deep">
              {stage.label}
            </p>
            <h2 id={headingId} className="font-display text-3xl font-normal text-ink md:text-4xl">
              {stage.heading}
            </h2>
            <div className="flex flex-col gap-4">
              {stage.paragraphs.map((paragraph, index) => (
                <p key={index} className="max-w-[62ch] font-sans text-base text-slate-deep md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
