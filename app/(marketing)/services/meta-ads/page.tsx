import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { ServiceHero } from "@/components/sections/service-template/ServiceHero";
import { ProblemWeSolve } from "@/components/sections/service-template/ProblemWeSolve";
import { OurApproach } from "@/components/sections/service-template/OurApproach";
import { Deliverables } from "@/components/sections/service-template/Deliverables";
import { CaseStudySpotlight } from "@/components/sections/service-template/CaseStudySpotlight";
import { Pricing } from "@/components/sections/service-template/Pricing";
import { FAQ } from "@/components/sections/service-template/FAQ";
import { WhereThisFits } from "@/components/sections/service-template/CrossLinks";
import { LeadCapture } from "@/components/sections/service-template/LeadCapture";
import { StickyCTA } from "@/components/sections/service-template/StickyCTA";
import { servicePageContent } from "@/lib/service-page-content";

const content = servicePageContent["meta-ads"];

export const metadata: Metadata = {
  title: "Meta Ads Services | Ayava Creatives",
  description: content.metaDescription,
};

// Now built on the shared `components/sections/service-template/*`
// components + `lib/service-page-content.ts`, promoted out of the
// meta-ads-only implementation once a second real service page existed to
// prove out the abstraction (per the house rule against speculative
// generalization — deferred until then, done now that 7 more pages need
// the identical structure). This route stays static (not folded into the
// `[slug]` dynamic route) since it's the original, already-reviewed URL.
export default function MetaAdsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ServiceHero
          serviceName={content.name}
          headline={content.hero.headline}
          subhead={content.hero.subhead}
          heroImageAlt={content.hero.heroImageAlt}
          secondaryCtaLabel={content.hero.secondaryCtaLabel}
        />
        <StickyCTA serviceName={content.name} />
        <ProblemWeSolve
          title={content.problem.title}
          paragraphs={content.problem.paragraphs}
          quote={content.problem.quote}
          closing={content.problem.closing}
        />
        <OurApproach
          eyebrow={content.approachEyebrow}
          title={content.approachTitle}
          steps={content.approachSteps}
        />
        <Deliverables deliverables={content.deliverables} tools={content.tools} />
        <CaseStudySpotlight caseStudy={content.caseStudy} imageLeft />
        <Pricing
          description={content.pricingDescription}
          tiers={content.pricingTiers}
          scopeFactors={content.pricingScopeFactors}
        />
        <FAQ items={content.faqItems} idPrefix="meta-ads-faq" />
        <WhereThisFits
          serviceName={content.name}
          relatedSlugs={content.relatedServiceSlugs}
          industries={content.relatedIndustries}
        />
        <LeadCapture slug="meta-ads" />
      </main>
      <MegaFooter />
    </>
  );
}
