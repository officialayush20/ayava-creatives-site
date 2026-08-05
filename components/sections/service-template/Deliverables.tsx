"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal } from "@/lib/useScrollReveal";

type DeliverablesProps = {
  deliverables: string[];
  tools: string[];
};

/**
 * §4 Deliverables + §5 Tools, composed as one tightly-coupled sub-section
 * per the spec's template-level rhythm note (hairline divider, no full
 * section-break padding between them).
 *
 * Promoted from `components/sections/meta-ads/Deliverables.tsx`.
 */
export function Deliverables({ deliverables, tools }: DeliverablesProps) {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="deliverables-heading" className="bg-inverse-surface py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="What's included"
          title="Deliverables."
          headingId="deliverables-heading"
          tone="on-ivory"
          className="mb-12 md:mb-16"
        />
        <ul data-reveal-item className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
          {deliverables.map((item) => (
            <li key={item} className="border-t border-hairline/30 py-4">
              <span className="font-sans text-sm text-inverse-content/80 md:text-base">{item}</span>
            </li>
          ))}
        </ul>

        <div data-reveal-item className="mt-16 border-t border-hairline/40 pt-10 md:mt-20 md:pt-12">
          <p className="mb-6 font-sans text-xs font-medium uppercase tracking-[0.18em] text-hairline">
            Tools &amp; Platforms
          </p>
          <ul
            aria-label={`Tools and platforms used: ${tools.join(", ")}.`}
            className="flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            {tools.map((tool) => (
              <li key={tool} className="font-sans text-sm font-medium tracking-wide text-inverse-content/70">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
