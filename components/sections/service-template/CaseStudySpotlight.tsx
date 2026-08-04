"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { CaseStudyEmptyState } from "@/components/ui/CaseStudyEmptyState";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { getCaseStudyBySlug } from "@/lib/case-studies-data";
import type { CaseStudyStateA, CaseStudyStateB } from "@/lib/service-page-content";

type CaseStudySpotlightProps = {
  caseStudy: CaseStudyStateA | CaseStudyStateB;
  /** Alternates media-left/text-right per template variety across pages,
   * per service-page-layout-spec §6 ("even-indexed services image-left"). */
  imageLeft?: boolean;
};

/**
 * Honest case-study spotlight per service-page-layout-spec §6. State A
 * (matched, real portfolio project) renders a full-width media/text spread
 * with NO `StatCounter` row — no confirmed performance metrics exist for
 * any of the 8 real projects yet, so every state-A spotlight here is
 * qualitative-only (scope + approach), never fabricated numbers. State B
 * (no honest project match) renders the shared `CaseStudyEmptyState`
 * primitive, matching the corrected Meta Ads pattern.
 *
 * Promoted from `components/sections/meta-ads/CaseStudySpotlight.tsx` +
 * `components/sections/industries/IndustryCaseStudy.tsx` (near-identical
 * state-A layout, unified here into one shared component).
 */
export function CaseStudySpotlight({ caseStudy, imageLeft = true }: CaseStudySpotlightProps) {
  const revealRef = useScrollReveal<HTMLElement>();

  if (caseStudy.state === "B") {
    return (
      <section ref={revealRef} id="case-study" aria-labelledby="case-study-heading" className="bg-ink py-16 md:py-40">
        <CaseStudyEmptyState
          eyebrow={caseStudy.eyebrow}
          title={caseStudy.heading}
          headingId="case-study-heading"
          body={caseStudy.body}
          metricsLead={caseStudy.metricsLead}
          metrics={caseStudy.metrics}
          ctaLabel={caseStudy.ctaLabel}
          tone="on-ink"
        />
      </section>
    );
  }

  const project = getCaseStudyBySlug(caseStudy.projectSlug);
  const href = project ? `/work/${project.slug}` : "/work";

  return (
    <section ref={revealRef} id="case-study" aria-labelledby="case-study-heading" className="bg-ink py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="Case Study Spotlight"
          title={caseStudy.heading}
          headingId="case-study-heading"
          tone="on-ink"
          className="mb-10 md:mb-12"
        />
        <div data-reveal-item className="group grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className={`md:col-span-7 ${imageLeft ? "md:order-1" : "md:order-2"}`}>
            <MediaFrame
              alt={`${project?.name ?? caseStudy.heading} project preview`}
              aspect="16/9"
              className="border border-transparent transition-colors duration-200 ease-out group-hover:border-gold"
            />
          </div>
          <div className={`flex flex-col justify-center md:col-span-5 ${imageLeft ? "md:order-2" : "md:order-1"}`}>
            <p className="mb-2 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
              {project?.name}
            </p>
            <p className="max-w-[50ch] font-sans text-sm leading-relaxed text-slate md:text-base">
              {caseStudy.body}
            </p>
            {/* No `StatCounter` row rendered — no confirmed performance
                figures exist for this project yet, per the honesty rule. */}
            <ArrowLink href={href} tone="on-ink" className="mt-6 w-fit">
              {caseStudy.ctaLabel}
            </ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
