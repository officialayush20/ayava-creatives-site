import type { Metadata } from "next";
import { buildMetadata, faqPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { CtaBand } from "@/components/sections/CtaBand";
import { PhilosophyHero } from "@/components/sections/pricing/PhilosophyHero";
import { HowWePrice } from "@/components/sections/pricing/HowWePrice";
import { WhatShapesAQuote } from "@/components/sections/pricing/WhatShapesAQuote";
import { EngagementModels } from "@/components/sections/pricing/EngagementModels";
import { WhatThisIsnt } from "@/components/sections/pricing/WhatThisIsnt";
import { PricingFAQ } from "@/components/sections/pricing/PricingFAQ";
import { pricingFaqItems } from "@/lib/pricing-faq-items";

export const metadata: Metadata = buildMetadata({
  title: "Pricing | Ayava Creatives",
  description:
    "We don't sell fixed retainer tiers. Every engagement is scoped to your channels, budget, and goals before we name a number — here's how we price.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(pricingFaqItems)} />
      <SiteHeader />
      <main>
        <PhilosophyHero />
        <HowWePrice />
        <WhatShapesAQuote />
        <EngagementModels />
        <WhatThisIsnt />
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
