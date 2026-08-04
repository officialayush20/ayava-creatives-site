"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { HairlineRowList } from "@/components/ui/HairlineRowList";
import { useScrollReveal } from "@/lib/useScrollReveal";
import type { PricingTier, PricingScopeFactor } from "@/lib/service-page-content";

type PricingProps = {
  description: string;
  /** Present only for the handful of pages with real, distinct named
   * tiers (currently Meta Ads). */
  tiers?: PricingTier[];
  /** Tier-less "what shapes the scope" list — the default for every page
   * without genuine per-tier differentiation.
   *
   * Decision (creative review §4 / checklist item 4): writing ~13 sets of
   * genuinely distinct named-tier copy was judged out of proportion to the
   * problem (13 of 15 pages were using identical generic tier copy, which
   * contradicted the section's own "not a template" headline). Rather than
   * fabricate cosmetic tier differences, pages without real tiers render
   * through the already-approved tier-less `HairlineRowList` pattern from
   * `pricing/EngagementModels.tsx` instead — honest about scope varying by
   * factor rather than by a named-tier fiction, and it keeps this section's
   * card grid meaningful (reserved for pages where tiers are real) instead
   * of diluted across all 15 pages. */
  scopeFactors?: PricingScopeFactor[];
};

/**
 * No numeric figures — per brand rule against fabricated or placeholder
 * pricing (service-page-layout-spec §7, "status: pricing-tbd"). Every tier
 * routes to Contact for Pricing.
 *
 * Promoted from `components/sections/meta-ads/Pricing.tsx`.
 */
export function Pricing({ description, tiers, scopeFactors }: PricingProps) {
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

        {tiers ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                data-reveal-item
                className={`flex flex-col border border-slate-deep/40 p-8 ${
                  tier.featured ? "rounded-b-sm rounded-t-none border-t-2 border-t-gold" : "rounded-sm"
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
        ) : (
          <>
            <HairlineRowList
              items={(scopeFactors ?? []).map((factor) => ({
                title: factor.title,
                description: factor.description,
              }))}
              tone="on-ivory"
              numbered={false}
            />
            <Button href="/contact" variant="primary" tone="on-ivory" size="large" className="mt-10 w-fit">
              Get a Custom Quote
            </Button>
          </>
        )}
      </Container>
    </section>
  );
}
