"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HairlineRowList } from "@/components/ui/HairlineRowList";
import { useScrollReveal } from "@/lib/useScrollReveal";

const commitments = [
  {
    title: "No hidden fees",
    description:
      "The number we quote is the number you pay. Ad spend, platform costs, and any third-party tools are called out separately and upfront — never folded into a line item after the fact.",
  },
  {
    title: "No lock-in contracts",
    description:
      "You can leave at the end of any billing cycle. We'd rather earn a renewal every month than trap one with a term you signed before you knew if the work would land.",
  },
];

/**
 * "What This Isn't" (pricing-page-layout-spec.md §5) — founder-confirmed
 * commitments (no hidden fees, no lock-in contracts). Was intentionally
 * omitted at first build pending sign-off; now written per that
 * confirmation. Same hairline-row treatment as WhatShapesAQuote and
 * EngagementModels — no card grid, no gold fill.
 */
export function WhatThisIsnt() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="what-this-isnt-heading" className="bg-ivory py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="What This Isn't"
          title="Two things we don't do, on any engagement."
          headingId="what-this-isnt-heading"
          tone="on-ivory"
          className="mb-12 md:mb-16"
        />
        <HairlineRowList items={commitments} tone="on-ivory" numbered={false} />
      </Container>
    </section>
  );
}
