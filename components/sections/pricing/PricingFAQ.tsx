"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { pricingFaqItems } from "@/lib/pricing-faq-items";

/**
 * FAQ (pricing-page-layout-spec.md §6) — ink background per the
 * creative-review's rule against an ivory FAQ sitting directly against
 * another ivory section, `align="left"` only (the same review flagged
 * center-aligned SectionHeader as a defect). Given "What This Isn't" (§5)
 * is intentionally omitted (pending founder sign-off), this section follows
 * Engagement Models directly — both ink, so a top hairline is added here to
 * mark the section break per the homepage's "no 2 consecutive same-tone
 * sections without a break" rule.
 *
 * Turnaround-time and minimum-engagement-size FAQ items from the copy doc
 * are omitted here — both are explicitly flagged as needing founder
 * confirmation before publishing a number, per pricing-page-copy.md §6.
 */
export function PricingFAQ() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      aria-labelledby="pricing-faq-heading"
      className="bg-surface py-16 md:py-40"
    >
      <Container>
        <SectionHeader
          eyebrow="Common Questions"
          title="How pricing actually works."
          headingId="pricing-faq-heading"
          align="left"
          tone="on-ink"
          className="mb-12 md:mb-16"
        />
        <div data-reveal-item className="max-w-[65ch] md:max-w-3xl">
          <FAQAccordion items={pricingFaqItems} tone="on-ink" idPrefix="pricing-faq" />
        </div>
      </Container>
    </section>
  );
}
