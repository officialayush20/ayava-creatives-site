"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion, type FAQItemData } from "@/components/ui/FAQAccordion";
import { useScrollReveal } from "@/lib/useScrollReveal";

const faqItems: FAQItemData[] = [
  {
    question: "What happens after I submit the form?",
    answer:
      "We personally read what you sent, no auto-triage or ticket queue. We'll follow up at the email or number you gave us once we've actually looked at your details — there's no automated sales-call ambush waiting on the other end.",
  },
  {
    question: "Do I need to know exactly what I want before reaching out?",
    answer:
      "No. \"Not sure yet\" is a real option in the form for a reason — plenty of the people we talk to are still figuring out the right approach, and that's a normal starting point for a first conversation.",
  },
  {
    question: "Is there a minimum project size you work with?",
    answer:
      "It depends on scope and channel mix more than a fixed number — tell us your budget range in the form and we'll tell you plainly whether it's a fit, rather than quoting a blanket minimum that may not reflect your actual project.",
  },
  {
    question: "How is my information used?",
    answer:
      "It's used to review your project and get back to you — we don't sell or share contact details. A full Privacy Policy page is on our roadmap but isn't live yet; we're not linking to one until it genuinely exists.",
  },
  {
    question: "Can I just email instead of filling out the form?",
    answer:
      "Yes — email, WhatsApp, and phone all reach the same team (see the contact options above). The form just helps us understand your project faster before we talk.",
  },
];

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
          <FAQAccordion items={faqItems} tone="on-ivory" idPrefix="contact-faq" />
        </div>
      </Container>
    </section>
  );
}
