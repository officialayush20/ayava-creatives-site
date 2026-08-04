import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HairlineRowList } from "@/components/ui/HairlineRowList";

const models = [
  {
    title: "Project-Based",
    description:
      "A defined scope with a start and an end. You know what's being delivered and when it's done.",
    example: "Fits a website build, a brand identity, or a single campaign launch.",
  },
  {
    title: "Ongoing Retainer",
    description: "Continuous management of a channel or set of channels.",
    example: "Fits always-on paid media, ongoing SEO, or content programs that need consistent attention month over month.",
  },
  {
    title: "One-Time Audit",
    description: "A scoped diagnostic engagement with a defined deliverable and no ongoing commitment.",
    example: "Fits an account or creative audit — an outside, expert read on what's working before deciding what to change.",
  },
];

/**
 * Engagement Models (pricing-page-layout-spec.md §4) — full-width hairline
 * rows at every breakpoint, never a 3-card grid. This is the section most
 * at risk of drifting back toward the pricing-card pattern the creative
 * review flagged on the Meta Ads page, so it's locked structurally as rows.
 */
export function EngagementModels() {
  return (
    <section aria-labelledby="engagement-models-heading" className="bg-ink py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="How Engagements Are Structured"
          title="Three ways to work with us."
          headingId="engagement-models-heading"
          tone="on-ink"
          className="mb-12 md:mb-16"
        />
        <HairlineRowList items={models} tone="on-ink" numbered={false} />
      </Container>
    </section>
  );
}
