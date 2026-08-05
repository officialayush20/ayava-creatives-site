"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion, type FAQItemData } from "@/components/ui/FAQAccordion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { faqPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

type FAQProps = {
  items: FAQItemData[];
  idPrefix: string;
};

/** Promoted from `components/sections/meta-ads/FAQ.tsx`. Schema-marked per
 * service-page-layout-spec §8: question/answer text is clean plain text
 * (matches the visible copy exactly) so it stays schema-extractable. JSON-LD
 * now goes through the shared `faqPageJsonLd()` builder in lib/seo.ts rather
 * than an ad-hoc inline object, for consistency with every other template. */
export function FAQ({ items, idPrefix }: FAQProps) {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="faq-heading" className="bg-surface py-16 md:py-40">
      <JsonLd data={faqPageJsonLd(items)} />
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
