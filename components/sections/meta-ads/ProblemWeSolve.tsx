"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function ProblemWeSolve() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="problem-heading" className="bg-ivory py-16 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div data-reveal-item className="md:col-span-4">
            <SectionHeader
              eyebrow="The Problem"
              title="Most accounts don't fail. They go unwatched."
              headingId="problem-heading"
              tone="on-ivory"
            />
          </div>
          <div data-reveal-item className="md:col-span-8 flex flex-col gap-6 font-sans text-base leading-relaxed text-ink/80 md:text-lg">
            <p>
              Most Meta Ads accounts aren&apos;t underperforming because the platform failed —
              they&apos;re underperforming because nobody&apos;s watching them closely enough.
              Budgets get set once and left alone. The same three creatives run for months past
              their expiry date. Audiences overlap and cannibalize each other&apos;s reach. And by
              the time someone checks the dashboard, the account has been quietly burning spend
              on fatigue and guesswork for weeks.
            </p>
            <p>
              The second failure mode is worse: campaigns optimized for the wrong signal
              entirely. Cheap clicks that never convert. Likes and comments mistaken for
              pipeline. A pixel that was never configured to track what the business actually
              sells, so every &ldquo;optimization&rdquo; the algorithm makes is optimizing for
              the wrong outcome.
            </p>
            {/* Spec calls for a "bronze" left-border accent; bronze is not
                exposed as a standalone token (see globals.css), and rust is
                reserved exclusively for form-error states — so this uses
                ink/slate-deep instead, consistent with the gold-restriction
                precedent of not reaching for an off-limits accent color. */}
            <blockquote className="border-l-2 border-slate-deep py-1 pl-6 font-display text-xl font-normal italic leading-snug text-ink">
              &ldquo;A campaign that isn&apos;t instrumented to measure the right event isn&apos;t
              being optimized — it&apos;s being guessed at, with a bigger budget.&rdquo;
            </blockquote>
            <p>
              We treat Meta Ads as infrastructure: an audience-and-creative testing system that
              gets sharper every week it runs, reporting on the metric that actually moves your
              business — not the one that&apos;s easiest to screenshot.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
