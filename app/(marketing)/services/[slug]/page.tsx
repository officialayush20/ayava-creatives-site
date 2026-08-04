import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { ServiceHero } from "@/components/sections/service-template/ServiceHero";
import { ProblemWeSolve } from "@/components/sections/service-template/ProblemWeSolve";
import { OurApproach } from "@/components/sections/service-template/OurApproach";
import { Deliverables } from "@/components/sections/service-template/Deliverables";
import { CaseStudySpotlight } from "@/components/sections/service-template/CaseStudySpotlight";
import { Pricing } from "@/components/sections/service-template/Pricing";
import { FAQ } from "@/components/sections/service-template/FAQ";
import {
  RelatedServicesCrossLinks,
  RelatedIndustriesCrossLinks,
} from "@/components/sections/service-template/CrossLinks";
import { LeadCapture } from "@/components/sections/service-template/LeadCapture";
import { StickyCTA } from "@/components/sections/service-template/StickyCTA";
import { servicePageContent, getServicePageContent } from "@/lib/service-page-content";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

// Excludes "meta-ads", which keeps its own static route
// (app/(marketing)/services/meta-ads/page.tsx) — Next.js resolves the
// static segment ahead of this dynamic one for that single slug, so no
// conflict, but we don't want it double-registered here.
export function generateStaticParams() {
  return Object.keys(servicePageContent)
    .filter((slug) => slug !== "meta-ads")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getServicePageContent(slug);
  if (!content) return {};

  return {
    title: `${content.name} Services | Ayava Creatives`,
    description: content.metaDescription,
  };
}

// Background rhythm identical to the proven Meta Ads reference instance:
// ink (Hero) -> ivory (Problem) -> ink (Approach) -> ivory (Deliverables) ->
// ink (Case Study) -> ivory (Pricing) -> ink (FAQ) -> ink (Related Services)
// -> ivory (Related Industries) -> ink (Lead Capture).
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const content = getServicePageContent(slug);

  if (!content || slug === "meta-ads") {
    notFound();
  }

  const serviceIndex = Object.keys(servicePageContent).indexOf(slug);

  return (
    <>
      <SiteHeader />
      <main>
        <ServiceHero
          serviceName={content.name}
          headline={content.hero.headline}
          subhead={content.hero.subhead}
          heroImageAlt={content.hero.heroImageAlt}
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
        <CaseStudySpotlight caseStudy={content.caseStudy} imageLeft={serviceIndex % 2 === 0} />
        <Pricing description={content.pricingDescription} tiers={content.pricingTiers} />
        <FAQ items={content.faqItems} idPrefix={`${content.slug}-faq`} />
        <RelatedServicesCrossLinks relatedSlugs={content.relatedServiceSlugs} />
        <RelatedIndustriesCrossLinks serviceName={content.name} industries={content.relatedIndustries} />
        <LeadCapture slug={slug} />
      </main>
      <MegaFooter />
    </>
  );
}
