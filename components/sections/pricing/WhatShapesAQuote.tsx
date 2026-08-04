import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HairlineRowList } from "@/components/ui/HairlineRowList";

const factors = [
  {
    title: "Services selected",
    description:
      "Which of Ayava's 15 services — or which combination — the engagement actually needs. A Meta Ads account and a full website rebuild are scoped, and priced, differently.",
  },
  {
    title: "Campaign scale",
    description:
      "Ad spend, channel count, and content volume the work has to support. A single-channel launch and a multi-market always-on program carry different operational loads.",
  },
  {
    title: "Engagement shape",
    description:
      "Whether the work is a one-time project with a defined end or an ongoing retainer that runs month over month. See Engagement Models below.",
  },
];

/**
 * "What Shapes a Quote" (pricing-page-layout-spec.md §3) — hairline-row
 * list, explicitly not a card grid.
 */
export function WhatShapesAQuote() {
  return (
    <section aria-labelledby="quote-factors-heading" className="bg-ivory py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="What Goes Into a Quote"
          title="Three things determine the number."
          headingId="quote-factors-heading"
          tone="on-ivory"
          className="mb-12 md:mb-16"
        />
        <HairlineRowList items={factors} tone="on-ivory" />
      </Container>
    </section>
  );
}
