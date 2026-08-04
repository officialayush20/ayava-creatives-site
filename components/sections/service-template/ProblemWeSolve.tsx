"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal } from "@/lib/useScrollReveal";

type ProblemWeSolveProps = {
  title: string;
  paragraphs: [string, string];
  quote: string;
  closing: string;
};

/** Promoted from `components/sections/meta-ads/ProblemWeSolve.tsx`. */
export function ProblemWeSolve({ title, paragraphs, quote, closing }: ProblemWeSolveProps) {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="problem-heading" className="bg-ivory py-16 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div data-reveal-item className="md:col-span-4">
            <SectionHeader
              eyebrow="The Problem"
              title={title}
              headingId="problem-heading"
              tone="on-ivory"
            />
          </div>
          <div data-reveal-item className="md:col-span-8 flex flex-col gap-6 font-sans text-base leading-relaxed text-ink/80 md:text-lg">
            <p>{paragraphs[0]}</p>
            <p>{paragraphs[1]}</p>
            {/* Spec calls for a "bronze" left-border accent; bronze is not
                exposed as a standalone token (see globals.css), and rust is
                reserved exclusively for form-error states — so this uses
                ink/slate-deep instead, consistent with the gold-restriction
                precedent of not reaching for an off-limits accent color. */}
            <blockquote className="border-l-2 border-slate-deep py-1 pl-6 font-display text-xl font-normal italic leading-snug text-ink">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <p>{closing}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
