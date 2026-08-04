"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion, type FAQItemData } from "@/components/ui/FAQAccordion";
import { useScrollReveal } from "@/lib/useScrollReveal";

const faqItems: FAQItemData[] = [
  {
    question: "How much should I be spending on Meta Ads to see results?",
    answer:
      "There's no universal minimum — it depends on your average order value, sales cycle, and how much room the algorithm needs to exit the learning phase. We'll walk through your specific numbers on a strategy call rather than quote a generic figure that may not apply to your business.",
  },
  {
    question: "How long before we know if a campaign is working?",
    answer:
      "Meta's algorithm needs a meaningful volume of conversion events to exit its learning phase and optimize reliably — this typically takes longer than a few days and shorter than a few months, but the exact window depends on your budget and conversion volume. We set testing timelines upfront so “is it working” has a clear, agreed checkpoint rather than a moving goalpost.",
  },
  {
    question: "Do you handle the creative (images, video) too, or just media buying?",
    answer:
      "Both. We brief, produce, and test ad creative against each audience segment — Meta Ads without creative strategy is just a media-buying exercise, and creative is usually the bigger lever on performance than bid strategy.",
  },
  {
    question: "What if we already have an account running — do you start from scratch?",
    answer:
      "No. We audit what's there first: pixel setup, account structure, historical performance. If something's working, we keep it and build on it. If something's actively hurting performance, we'll tell you plainly why before we change it.",
  },
  {
    question: "Do you manage Instagram ads as well as Facebook?",
    answer:
      "Yes — Meta Ads Manager runs both platforms from a single campaign structure, and we plan placements (Feed, Stories, Reels) across both as part of the same strategy, not as separate line items.",
  },
];

// Schema-marked per service-page-layout-spec §8: question/answer text is
// clean plain text (matches the visible copy exactly) so it stays
// schema-extractable.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function FAQ() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="faq-heading" className="bg-ink py-16 md:py-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <SectionHeader
          eyebrow="Questions"
          title="Frequently Asked Questions"
          headingId="faq-heading"
          tone="on-ink"
          className="mb-12 md:mb-16"
        />
        <div data-reveal-item className="max-w-3xl">
          <FAQAccordion items={faqItems} tone="on-ink" idPrefix="meta-ads-faq" />
        </div>
      </Container>
    </section>
  );
}
