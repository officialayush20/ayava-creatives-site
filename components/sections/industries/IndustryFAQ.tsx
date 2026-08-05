"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import type { FAQItemData } from "@/lib/industry-page-content";
import { faqPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

type IndustryFAQProps = {
  industryName: string;
  slug: string;
  items: FAQItemData[];
  tone: "on-ink" | "on-ivory";
};

/** FAQ — vertical-specific buyer objections, per industry-page-layout-spec §5.
 * JSON-LD now goes through the shared `faqPageJsonLd()` builder in
 * lib/seo.ts rather than an ad-hoc inline object. */
export function IndustryFAQ({ industryName, slug, items, tone }: IndustryFAQProps) {
  const revealRef = useScrollReveal<HTMLElement>();
  const bg = tone === "on-ink" ? "bg-surface" : "bg-inverse-surface";

  return (
    <section
      ref={revealRef}
      aria-labelledby="industry-faq-heading"
      className={`${bg} py-16 md:py-40`}
    >
      <JsonLd data={faqPageJsonLd(items)} />
      <Container>
        <SectionHeader
          eyebrow="Questions"
          title={`Common Questions About ${industryName} Marketing`}
          headingId="industry-faq-heading"
          tone={tone}
          className="mb-12 md:mb-16"
        />
        <div data-reveal-item className="max-w-3xl">
          <FAQAccordion items={items} tone={tone} idPrefix={`${slug}-faq`} />
        </div>
      </Container>
    </section>
  );
}
