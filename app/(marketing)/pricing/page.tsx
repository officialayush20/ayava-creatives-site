import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { CtaBand } from "@/components/sections/CtaBand";
import { PhilosophyHero } from "@/components/sections/pricing/PhilosophyHero";
import { HowWePrice } from "@/components/sections/pricing/HowWePrice";
import { WhatShapesAQuote } from "@/components/sections/pricing/WhatShapesAQuote";
import { EngagementModels } from "@/components/sections/pricing/EngagementModels";
import { PricingFAQ } from "@/components/sections/pricing/PricingFAQ";

export const metadata: Metadata = {
  title: "Pricing | Ayava Creatives",
  description:
    "We don't sell fixed retainer tiers. Every engagement is scoped to your channels, budget, and goals before we name a number — here's how we price.",
};

// Note: this page intentionally omits a "What This Isn't" section
// (layout-spec §5 / copy-doc §5). The copy doc left it unwritten pending
// founder sign-off on hidden-fees/lock-in claims, and the layout spec
// instructs cutting the section entirely rather than shipping unverified
// billing commitments — so it is not built here, not stubbed with
// placeholder content.
export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PhilosophyHero />
        <HowWePrice />
        <WhatShapesAQuote />
        <EngagementModels />
        <PricingFAQ />
        <CtaBand
          tone="on-ivory"
          headline="Ready to see what your project actually costs?"
          supportingLine="Tell us what you're working with — we'll scope it and quote it, not guess at it."
          primaryHref="/contact#intake-form"
          primaryLabel="Get Free Audit"
          secondary={{ href: "/contact#call", label: "Book Strategy Call" }}
        />
      </main>
      <MegaFooter />
    </>
  );
}
