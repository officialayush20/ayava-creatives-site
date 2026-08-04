"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/useScrollReveal";

/**
 * Lightweight cross-link band disambiguating job-seekers from prospective
 * clients who land on this page by mistake (careers-page-layout-spec.md
 * §4). Deliberately NOT the full CtaBand component — that component's
 * default framing (large H2, dual-button row) is disproportionate to this
 * section's actual job. Built directly from Container + Button instead.
 */
export function RedirectBand() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="redirect-band-heading" className="bg-ink py-12 md:py-16">
      <Container className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <p id="redirect-band-heading" className="font-display text-xl font-normal text-ivory md:text-2xl">
          Looking to work <em className="not-italic font-normal text-slate">with</em> Ayava rather
          than <em className="not-italic font-normal text-slate">at</em> Ayava?
        </p>
        <Button href="/contact" variant="secondary" tone="on-ink">
          Get in Touch About a Project
        </Button>
      </Container>
    </section>
  );
}
