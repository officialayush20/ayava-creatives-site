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
  /** Which background the band sits on — generalized so the Industries Hub
   * and individual industry pages can close on ink (per their rhythm spec)
   * without duplicating this component. Defaults to "on-ivory" to preserve
   * the homepage/services-hub behavior this component originally shipped with. */
  tone?: "on-ink" | "on-ivory";
};

export function CtaBand({
  headline = "Your next campaign shouldn't be a guess.",
  primaryHref = "/contact",
  primaryLabel = "Get Free Audit",
  secondary = { href: "/contact#call", label: "Book a Call" },
  tone = "on-ivory",
}: CtaBandProps = {}) {
  const revealRef = useScrollReveal<HTMLElement>();
  const bg = tone === "on-ink" ? "bg-ink" : "bg-ivory";
  const headingColor = tone === "on-ink" ? "text-ivory" : "text-ink";

  return (
    <section
      ref={revealRef}
      aria-labelledby="cta-band-heading"
      className={`${bg} py-16 md:py-32`}
    >
      <Container className="flex flex-col items-center text-center">
        <div data-reveal-item className="mx-auto flex max-w-3xl flex-col items-center">
          <h2
            id="cta-band-heading"
            className={`font-display text-[clamp(28px,5vw,52px)] font-normal leading-[1.05] ${headingColor}`}
          >
            {headline}
          </h2>
          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Button
              href={primaryHref}
              variant="primary"
              tone={tone}
              size="large"
              className="w-full sm:w-auto"
            >
              {primaryLabel}
            </Button>
            {secondary ? (
              <Button
                href={secondary.href}
                variant="ghost"
                tone={tone}
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
