"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/useScrollReveal";

const tiers = [
  {
    name: "Starter",
    features: [
      "Pixel & Conversions API setup",
      "Single-market audience strategy",
      "Core creative testing plan",
      "Monthly performance report",
    ],
  },
  {
    name: "Growth",
    featured: true,
    features: [
      "Everything in Starter",
      "Multi-segment audience architecture",
      "Full retargeting funnel design",
      "Ongoing creative refresh cadence",
      "Standing review call",
    ],
  },
  {
    name: "Enterprise",
    features: [
      "Everything in Growth",
      "Multi-account / multi-market structure",
      "Dedicated creative production support",
      "Custom reporting cadence",
    ],
  },
];

/**
 * No numeric figures — per brand rule against fabricated or placeholder
 * pricing (service-page-layout-spec §7, "status: pricing-tbd"). Every tier
 * routes to Contact for Pricing.
 */
export function Pricing() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="pricing-heading" className="bg-ivory py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="Investment"
          title="Scoped to your account, not a template."
          headingId="pricing-heading"
          tone="on-ivory"
          align="center"
          className="mb-6"
        />
        <p className="mx-auto mb-16 max-w-[60ch] text-center font-sans text-base text-ink/70 md:mb-20">
          Meta Ads engagements are scoped to your ad spend, account complexity, and creative
          production needs — a brand new account and an established one with a full retargeting
          funnel are not the same job, and we don&apos;t price them as if they were.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              data-reveal-item
              className={`flex flex-col rounded-sm border p-8 ${
                tier.featured
                  ? "border-gold bg-white md:-translate-y-4"
                  : "border-slate-deep/40 bg-white/60"
              }`}
            >
              {tier.featured ? (
                <Tag tone="on-ivory" className="mb-4 w-fit">
                  Most Popular
                </Tag>
              ) : null}
              <h3 className="font-display text-2xl font-normal text-ink">{tier.name}</h3>
              <p className="mt-2 font-sans text-sm text-slate-deep">Custom Quote</p>
              <ul className="mt-6 flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="font-sans text-sm text-ink/80">
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                href="/contact"
                variant={tier.featured ? "primary" : "secondary"}
                tone="on-ivory"
                className="mt-8"
              >
                Contact for Pricing
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
