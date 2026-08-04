import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { ServiceHero } from "@/components/sections/meta-ads/ServiceHero";
import { ProblemWeSolve } from "@/components/sections/meta-ads/ProblemWeSolve";
import { OurApproach } from "@/components/sections/meta-ads/OurApproach";
import { Deliverables } from "@/components/sections/meta-ads/Deliverables";
import { CaseStudySpotlight } from "@/components/sections/meta-ads/CaseStudySpotlight";
import { Pricing } from "@/components/sections/meta-ads/Pricing";
import { FAQ } from "@/components/sections/meta-ads/FAQ";
import {
  RelatedServicesCrossLinks,
  RelatedIndustriesCrossLinks,
} from "@/components/sections/meta-ads/CrossLinks";
import { LeadCapture } from "@/components/sections/meta-ads/LeadCapture";
import { StickyCTA } from "@/components/sections/meta-ads/StickyCTA";

export const metadata: Metadata = {
  title: "Meta Ads Services | Ayava Creatives",
  description:
    "We run Meta Ads as a revenue system, not a boost-button habit — every audience, creative, and rupee of spend tied back to a measurable outcome.",
};

// This is currently one hand-built page, not the CMS-driven 15-service
// template the layout spec describes (§0 "one template, 15 content
// instances"). Building the reusable template/data-model layer now, before
// a second real service page exists to prove out the abstraction, would be
// premature per the house rule against speculative generalization — this
// page is structured so lifting it into a template later is straightforward
// (every section is already its own component, content is inline data
// rather than scattered through JSX), but that lift is deferred until a
// second service page is actually commissioned.
export default function MetaAdsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ServiceHero />
        <StickyCTA />
        <ProblemWeSolve />
        <OurApproach />
        <Deliverables />
        <CaseStudySpotlight />
        <Pricing />
        <FAQ />
        <RelatedServicesCrossLinks />
        <RelatedIndustriesCrossLinks />
        <LeadCapture />
      </main>
      <MegaFooter />
    </>
  );
}
