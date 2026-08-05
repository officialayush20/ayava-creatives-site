"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal } from "@/lib/useScrollReveal";
import type { ApproachStep } from "@/lib/service-page-content";

type OurApproachProps = {
  eyebrow: string;
  title: string;
  steps: ApproachStep[];
};

/**
 * Service-specific counterpart to homepage's Ayava Method. Step numerals
 * use slate, not gold — gold-discipline correction carried over from the
 * homepage review: decorative step numbers are not real numeric/metric
 * values, so they don't qualify for the gold exception.
 *
 * Promoted from `components/sections/meta-ads/OurApproach.tsx`.
 */
export function OurApproach({ eyebrow, title, steps }: OurApproachProps) {
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.08 });

  return (
    <section ref={revealRef} aria-labelledby="approach-heading" className="bg-surface py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          headingId="approach-heading"
          tone="on-ink"
          className="mb-16 md:mb-20"
        />
        <ol className="flex flex-col">
          {steps.map((step, index) => (
            <li
              key={step.title}
              data-reveal-item
              className="grid grid-cols-1 gap-3 border-t border-hairline py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <div className="md:col-span-3">
                <span className="font-display text-3xl text-hairline-strong">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-normal">{step.title}</h3>
              </div>
              <p className="font-sans text-sm text-hairline-strong md:col-span-9 md:text-base">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
