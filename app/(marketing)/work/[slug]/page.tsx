import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { CaseStudyHero } from "@/components/sections/case-study/CaseStudyHero";
import { SnapshotBar } from "@/components/sections/case-study/SnapshotBar";
import { NarrativeStage } from "@/components/sections/case-study/NarrativeStage";
import { MetricsEmptyState } from "@/components/sections/case-study/MetricsEmptyState";
import { NextCaseStudyPreview } from "@/components/sections/case-study/NextCaseStudyPreview";
import { caseStudies, getCaseStudyBySlug, getNextCaseStudy } from "@/lib/case-studies-data";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return buildMetadata({
    title: `${study.name} | Ayava Creatives`,
    description: study.cardSummary,
    path: `/work/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const next = getNextCaseStudy(study.slug);
  const resultsHeadingId = "results-heading";

  // Sections 5 (Quote) and 6 (Gallery) omitted entirely for all 8 real
  // projects — no consented client quotes exist yet, and no real gallery
  // assets are cleared (study.hasGallery is false for every project) —
  // per case-study-layout-spec.md §5/§6 an omitted section skips its whole
  // <section> landmark rather than rendering an empty one.
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Work", path: "/work" },
          { name: study.name, path: `/work/${slug}` },
        ])}
      />
      <SiteHeader />
      <main>
        <CaseStudyHero study={study} />
        <SnapshotBar study={study} />

        <NarrativeStage stage={study.narrative.challenge} headingId="challenge-heading" side="a" tone="on-ivory" />
        <NarrativeStage stage={study.narrative.strategy} headingId="strategy-heading" side="b" tone="on-ink" />
        <NarrativeStage stage={study.narrative.execution} headingId="execution-heading" side="a" tone="on-ivory" />
        <NarrativeStage stage={study.narrative.results} headingId={resultsHeadingId} side="b" tone="on-ink" />

        <MetricsEmptyState resultsAnchorId={resultsHeadingId} />

        <NextCaseStudyPreview next={next} />
      </main>
      <MegaFooter />
    </>
  );
}
