import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion, type FAQItemData } from "@/components/ui/FAQAccordion";

const faqItems: FAQItemData[] = [
  {
    question: "Why don't you list fixed prices?",
    answer:
      "Because a fixed price assumes every account needs the same thing. We scope each engagement to your actual channels, budget, and goals first, then quote — see How We Price above for the full reasoning.",
  },
  {
    question: "Can I start with a smaller project before committing to a retainer?",
    answer:
      "Yes. Project-based work is a common way to start — it lets us both see how the engagement runs before either of us commits to something ongoing.",
  },
  {
    question: "What happens if my needs change mid-engagement?",
    answer:
      "Scope gets revisited, not locked in place. If your goals or budget shift, the plan is rescoped with you rather than run on autopilot against a brief that no longer fits.",
  },
];

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
  return (
    <section
      aria-labelledby="pricing-faq-heading"
      className="bg-ink py-16 md:py-40"
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
        <div className="max-w-[65ch] md:max-w-3xl">
          <FAQAccordion items={faqItems} tone="on-ink" idPrefix="pricing-faq" />
        </div>
      </Container>
    </section>
  );
}
