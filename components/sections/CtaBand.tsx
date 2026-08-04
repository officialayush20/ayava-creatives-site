"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/useScrollReveal";

type CtaBandProps = {
  headline?: string;
  primaryHref?: string;
  primaryLabel?: string;
  /** Pass `null` to omit the secondary button entirely (e.g. services hub's single-CTA closing band). */
  secondary?: { href: string; label: string } | null;
};

export function CtaBand({
  headline = "Your next campaign shouldn't be a guess.",
  primaryHref = "/contact",
  primaryLabel = "Get Free Audit",
  secondary = { href: "/contact#call", label: "Book a Call" },
}: CtaBandProps = {}) {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      aria-labelledby="cta-band-heading"
      className="bg-ivory py-16 md:py-32"
    >
      <Container className="flex flex-col items-center text-center">
        <div data-reveal-item className="mx-auto flex max-w-3xl flex-col items-center">
          <h2
            id="cta-band-heading"
            className="font-display text-[clamp(28px,5vw,52px)] font-normal leading-[1.05] text-ink"
          >
            {headline}
          </h2>
          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Button
              href={primaryHref}
              variant="primary"
              tone="on-ivory"
              size="large"
              className="w-full sm:w-auto"
            >
              {primaryLabel}
            </Button>
            {secondary ? (
              <Button
                href={secondary.href}
                variant="ghost"
                tone="on-ivory"
                size="large"
                className="w-full sm:w-auto"
              >
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
