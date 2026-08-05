"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { contactFaqItems } from "@/lib/contact-faq-items";

export function ContactFAQ() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="contact-faq-heading" className="bg-inverse-surface py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="Questions"
          title="Frequently Asked Questions"
          headingId="contact-faq-heading"
          tone="on-ivory"
          className="mb-12 md:mb-16"
        />
        <div data-reveal-item className="max-w-3xl">
          <FAQAccordion items={contactFaqItems} tone="on-ivory" idPrefix="contact-faq" />
        </div>
      </Container>
    </section>
  );
}
