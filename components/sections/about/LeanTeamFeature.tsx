"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HairlineRowList } from "@/components/ui/HairlineRowList";
import { useScrollReveal } from "@/lib/useScrollReveal";

const accessRows = [
  {
    title: "Direct access",
    description: "No account-manager relay. You talk to the person doing the work.",
  },
  {
    title: "Operator, not just strategist",
    description: "The same person who scopes the campaign builds and ships it.",
  },
  {
    title: "Full accountability",
    description: "One name attached to every deliverable, no diffusion of responsibility across a bench.",
  },
];

/**
 * "Lean, Founder-Led — And That's a Feature" (about-page-layout-spec.md §6)
 * — reframes single-founder status as a credibility angle, not a hedge.
 * Reuses HairlineRowList (structurally the same row primitive as §5) rather
 * than a third bespoke component.
 */
export function LeanTeamFeature() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="lean-team-heading" className="bg-inverse-surface py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="Why Founder-Led"
          title="Currently a team of one. Here's why that's the point."
          headingId="lean-team-heading"
          tone="on-ivory"
          className="mb-12 md:mb-16"
        />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6" data-reveal-item>
            <p className="max-w-[52ch] font-sans text-base leading-relaxed text-inverse-content/80 md:text-lg">
              Ayava is run by one person right now — me. That&apos;s not a stage I&apos;m
              apologizing for or a fact I&apos;m hiding until it changes. It&apos;s the reason the
              rest of this page reads the way it does: when there&apos;s no bench to diffuse
              responsibility across, the accountability doesn&apos;t get diluted either.
            </p>
          </div>
          <div className="md:col-span-6">
            <HairlineRowList items={accessRows} tone="on-ivory" numbered={false} />
          </div>
        </div>
      </Container>
    </section>
  );
}
