"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion, type FAQItemData } from "@/components/ui/FAQAccordion";
import { useScrollReveal } from "@/lib/useScrollReveal";

type FAQProps = {
  items: FAQItemData[];
  idPrefix: string;
};

/** Promoted from `components/sections/meta-ads/FAQ.tsx`. Schema-marked per
 * service-page-layout-spec §8: question/answer text is clean plain text
 * (matches the visible copy exactly) so it stays schema-extractable. */
export function FAQ({ items, idPrefix }: FAQProps) {
  const revealRef = useScrollReveal<HTMLElement>();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section ref={revealRef} aria-labelledby="faq-heading" className="bg-surface py-16 md:py-40">
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
          <FAQAccordion items={items} tone="on-ink" idPrefix={idPrefix} />
        </div>
      </Container>
    </section>
  );
}
