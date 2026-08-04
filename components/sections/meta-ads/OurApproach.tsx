"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal } from "@/lib/useScrollReveal";

const steps = [
  {
    title: "Audit & Pixel Setup",
    description:
      "Before a single rupee moves, we audit the existing account (if one exists), verify Meta Pixel and Conversions API implementation, and confirm every event we optimize toward maps to a real business outcome — purchase, lead, booking — not a proxy metric that flatters the dashboard.",
  },
  {
    title: "Audience & Creative Strategy",
    description:
      "We build the audience architecture — core, lookalike, interest, and retargeting segments — sized and structured to avoid overlap, then brief creative concepts against each segment's actual buying stage, not a single generic ad running everywhere.",
  },
  {
    title: "Launch & Structured Testing",
    description:
      "Campaigns launch inside a controlled testing structure: multiple creative variants per audience, isolated enough to read signal cleanly, with a defined budget and timeline per test — no guessing when a “failed” ad simply hadn't spent enough to reach significance.",
  },
  {
    title: "Scale & Report",
    description:
      "Winning combinations get budget; underperformers get cut on a schedule, not on sentiment. Retargeting sequences layer in against warm audiences at each funnel stage, and reporting ties spend directly to the outcome defined in Step 1 — reviewed with you on a standing cadence, not just at contract renewal.",
  },
];

/**
 * Service-specific counterpart to homepage's Ayava Method. Step numerals
 * use slate, not gold — gold-discipline correction carried over from the
 * homepage review: decorative step numbers are not real numeric/metric
 * values, so they don't qualify for the gold exception.
 */
export function OurApproach() {
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.08 });

  return (
    <section ref={revealRef} aria-labelledby="approach-heading" className="bg-ink py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="Our Approach to Meta Ads"
          title="A testing system, not a boost button."
          headingId="approach-heading"
          tone="on-ink"
          className="mb-16 md:mb-20"
        />
        <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          {steps.map((step, index) => (
            <li key={step.title} data-reveal-item className="border-t border-slate-deep pt-6">
              <span className="font-display text-3xl text-slate">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-normal">{step.title}</h3>
              <p className="mt-2 font-sans text-sm text-slate">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
