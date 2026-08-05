"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HairlineRowList } from "@/components/ui/HairlineRowList";
import { useScrollReveal } from "@/lib/useScrollReveal";

const principles = [
  {
    title: "Direct communication, no relay.",
    description:
      "If you have a question about your campaign, you're asking the person running it — not an account manager who'll ask me and get back to you tomorrow.",
  },
  {
    title: "Scoped to the actual problem, not a template package.",
    description:
      "I don't have a standard retainer I sell to everyone. Every engagement starts with what your channels, budget, and product actually need — see How We Price for the full reasoning.",
  },
  {
    title: "I build what I market — no handoff gap between strategy and execution.",
    description:
      "The strategy doesn't get thrown over a wall to a production team who's never spoken to the client. I write the code and I write the media plan, often for the same account.",
  },
  {
    title: "Fast to cut what isn't working.",
    description:
      "I don't keep underperforming channels alive because a client relationship depends on billing for them. If a campaign isn't earning its spend, that gets said plainly, not buried in a monthly report.",
  },
];

/**
 * Values / Operating Principles (about-page-layout-spec.md §5). Reuses the
 * hairline-row list pattern rather than an icon/card grid.
 */
export function ValuesPrinciples() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="values-heading" className="bg-surface py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="How I Work"
          title="Four commitments, not a values poster."
          headingId="values-heading"
          tone="on-ink"
          className="mb-12 md:mb-16"
        />
        <HairlineRowList items={principles} tone="on-ink" />
      </Container>
    </section>
  );
}
