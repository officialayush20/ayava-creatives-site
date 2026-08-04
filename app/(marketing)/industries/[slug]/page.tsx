import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { CtaBand } from "@/components/sections/CtaBand";
import { IndustryHero } from "@/components/sections/industries/IndustryHero";
import { IndustryNarrative } from "@/components/sections/industries/IndustryNarrative";
import { RelevantServices } from "@/components/sections/industries/RelevantServices";
import { IndustryCaseStudy } from "@/components/sections/industries/IndustryCaseStudy";
import { IndustryFAQ } from "@/components/sections/industries/IndustryFAQ";
import { industries, getIndustryBySlug } from "@/lib/industries-data";
import { getIndustryPageContent } from "@/lib/industry-page-content";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  const content = getIndustryPageContent(slug);
  if (!industry || !content) return {};

  return {
    title: `${industry.name} Marketing | Ayava Creatives`,
    description: content.heroSubhead,
  };
}

// Background rhythm per industry-page-layout-spec §0: ink (Hero) -> ivory
// (Narrative) -> ink (Relevant Services) -> ivory (Case Study, State A or B —
// always follows Relevant Services/ink so it's fixed to "on-ivory" rather
// than the spec's conditional, holding alternation for all 10 instances) ->
// ivory (FAQ, same tone as Case Study per spec §5 — `IndustryFAQ` renders its
// own top hairline in this case to break the same-tone adjacency) -> ink
// (CTA Band).
export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  const content = getIndustryPageContent(slug);

  if (!industry || !content) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main>
        <IndustryHero
          industryName={industry.name}
          headline={content.heroHeadline}
          subhead={content.heroSubhead}
        />
        <IndustryNarrative industryName={industry.name} themes={content.narrativeThemes} />
        <RelevantServices industryName={industry.name} serviceSlugs={content.relevantServiceSlugs} />
        <IndustryCaseStudy industryName={industry.name} caseStudy={content.caseStudy} tone="on-ivory" />
        <IndustryFAQ
          industryName={industry.name}
          slug={industry.slug}
          items={content.faqItems}
          tone="on-ivory"
        />
        <CtaBand
          headline={`Let's Talk About Your ${industry.name} Project`}
          primaryHref="/contact"
          primaryLabel="Start Your Project"
          secondary={null}
          tone="on-ink"
        />
      </main>
      <MegaFooter />
    </>
  );
}
