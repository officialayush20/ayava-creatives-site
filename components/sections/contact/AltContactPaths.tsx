"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/useScrollReveal";

const WHATSAPP_NUMBER = "919548601929"; // +91 9548601929 — placeholder pick between the two real numbers, flag to founder to confirm which is the WhatsApp Business line per contact-page-layout-spec §3.

function ContactMethodCard({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-sm border border-slate-deep/40 p-6">
      <h3 className="font-display text-lg font-normal text-ink">{label}</h3>
      <p className="font-sans text-sm text-ink/70">{value}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function AltContactPaths() {
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.05 });
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <section id="alt-contact" ref={revealRef} aria-labelledby="alt-contact-heading" className="bg-ivory py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="Or Skip the Form"
          title="Reach us however's easiest."
          headingId="alt-contact-heading"
          tone="on-ivory"
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div data-reveal-item>
            <ContactMethodCard label="Book a Call" value="Put 20 minutes on our calendar directly — no form required.">
              <button
                type="button"
                aria-expanded={calendarOpen}
                aria-controls="calendar-embed-panel"
                onClick={() => setCalendarOpen((prev) => !prev)}
                className="font-sans text-sm font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                Book Strategy Call
              </button>
            </ContactMethodCard>
          </div>

          <div data-reveal-item>
            <ContactMethodCard label="WhatsApp" value="Prefer to just message us? We're on WhatsApp.">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                Chat on WhatsApp
                <span className="sr-only"> (opens in new tab)</span>
                <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </ContactMethodCard>
          </div>

          <div data-reveal-item>
            <ContactMethodCard label="Email" value="Write to us directly.">
              <a
                href="mailto:info@ayavacreatives.com"
                className="font-sans text-sm font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                info@ayavacreatives.com
              </a>
            </ContactMethodCard>
          </div>

          <div data-reveal-item>
            <ContactMethodCard label="Call Us" value="Call the studio.">
              <div className="flex flex-col gap-1">
                <a
                  href="tel:+919548601929"
                  className="font-sans text-sm font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                >
                  +91 95486 01929
                </a>
                <a
                  href="tel:+919675400058"
                  className="font-sans text-sm font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                >
                  +91 96754 00058
                </a>
              </div>
            </ContactMethodCard>
          </div>
        </div>

        <div
          id="calendar-embed-panel"
          hidden={!calendarOpen}
          className="mt-6 flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-sm border border-dashed border-slate-deep/50 p-8 text-center"
        >
          <p className="max-w-[42ch] font-sans text-sm text-ink/70">
            Calendar booking coming soon — email or WhatsApp us to schedule a call in the meantime.
          </p>
          <Button href="mailto:info@ayavacreatives.com" variant="ghost" tone="on-ivory">
            Email Us Instead
          </Button>
        </div>
      </Container>
    </section>
  );
}
