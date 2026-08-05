"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import type { FAQItemData } from "@/lib/industry-page-content";

type IndustryFAQProps = {
  industryName: string;
  slug: string;
  items: FAQItemData[];
  tone: "on-ink" | "on-ivory";
};

/** FAQ — vertical-specific buyer objections, per industry-page-layout-spec §5. */
export function IndustryFAQ({ industryName, slug, items, tone }: IndustryFAQProps) {
  const revealRef = useScrollReveal<HTMLElement>();
  const bg = tone === "on-ink" ? "bg-surface" : "bg-inverse-surface";

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
    <section
      ref={revealRef}
      aria-labelledby="industry-faq-heading"
      className={`${bg} py-16 md:py-40`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
