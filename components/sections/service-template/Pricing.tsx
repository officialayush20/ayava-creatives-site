"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/useScrollReveal";
import type { PricingTier } from "@/lib/service-page-content";

type PricingProps = {
  description: string;
  tiers: PricingTier[];
};

/**
 * No numeric figures — per brand rule against fabricated or placeholder
 * pricing (service-page-layout-spec §7, "status: pricing-tbd"). Every tier
 * routes to Contact for Pricing.
 *
 * Promoted from `components/sections/meta-ads/Pricing.tsx`.
 */
export function Pricing({ description, tiers }: PricingProps) {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="pricing-heading" className="bg-ivory py-16 md:py-48">
      <Container>
        <SectionHeader
          eyebrow="Investment"
          title="Scoped to your project, not a template."
          headingId="pricing-heading"
          tone="on-ivory"
          align="left"
          className="mb-6"
        />
        <p className="mb-16 max-w-[60ch] font-sans text-base text-ink/70 md:mb-20">{description}</p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              data-reveal-item
              className={`flex flex-col rounded-sm border border-slate-deep/40 p-8 ${
                tier.featured ? "border-t border-t-gold" : ""
              }`}
            >
              <h3 className="font-display text-2xl font-normal text-ink">{tier.name}</h3>
              <p className="mt-2 font-sans text-sm text-slate-deep">Custom Quote</p>
              <ul className="mt-6 flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="font-sans text-sm text-ink/80">
                    {feature}
                  </li>
                ))}
              </ul>
              <Button href="/contact" variant="secondary" tone="on-ivory" className="mt-8">
                Contact for Pricing
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
