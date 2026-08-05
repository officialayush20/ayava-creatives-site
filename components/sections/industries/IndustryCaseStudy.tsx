"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { CaseStudyEmptyState } from "@/components/ui/CaseStudyEmptyState";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { getCaseStudyBySlug } from "@/lib/case-studies-data";
import type { CaseStudyStateA, CaseStudyStateB } from "@/lib/industry-page-content";

type IndustryCaseStudyProps = {
  industryName: string;
  caseStudy: CaseStudyStateA | CaseStudyStateB;
  /** Which background this section renders on — verified against the
   * per-page rhythm table in the page component, not hardcoded here. */
  tone: "on-ink" | "on-ivory";
  /**
   * Optional Cobalt Deep treatment — light theme only, no-op in dark
   * (the underlying custom property is unset there so the section keeps its
   * normal `tone`-driven flat background). Only pass on state-A (real,
   * matched-project) case studies per the application map — never on the
   * empty state.
   */
  gradient?: "cobalt-deep";
};

/**
 * Case Study Spotlight — corrected full-width, left-aligned, non-card
 * pattern per industry-page-layout-spec §4 / service-contact-creative-review.md
 * §3. State A (matched project) uses `CaseStudySpread`-equivalent media/text
 * split; State B reuses the shared `CaseStudyEmptyState` primitive.
 */
export function IndustryCaseStudy({ industryName, caseStudy, tone, gradient }: IndustryCaseStudyProps) {
  const revealRef = useScrollReveal<HTMLElement>();
  const bg = tone === "on-ink" ? "bg-surface" : "bg-inverse-surface";
  const gradientStyle =
    gradient === "cobalt-deep" && caseStudy.state === "A"
      ? { backgroundImage: "var(--gradient-cobalt-deep)" }
      : undefined;
  const gradientClass = gradientStyle ? "gradient-band" : "";

  if (caseStudy.state === "B") {
    return (
      <section ref={revealRef} aria-labelledby="case-study-heading" className={`${bg} py-16 md:py-40`}>
        <CaseStudyEmptyState
          title="In Progress, Not Invented"
          headingId="case-study-heading"
          body={caseStudy.body}
          metrics={caseStudy.metrics}
          ctaLabel={`Talk Through Your ${industryName} Project`}
          tone={tone}
        />
      </section>
    );
  }

  const bodyColor = tone === "on-ink" ? "text-hairline-strong" : "text-hairline";
  const projectSlug = caseStudy.href.replace("/work/", "");
  const project = getCaseStudyBySlug(projectSlug);

  return (
    <section
      ref={revealRef}
      aria-labelledby="case-study-heading"
      className={`${bg} py-16 md:py-40 ${gradientClass}`}
      style={gradientStyle}
    >
      <Container>
        <SectionHeader
          eyebrow="Case Study Spotlight"
          title="A Matched Project"
          headingId="case-study-heading"
          tone={tone}
          className="mb-10 md:mb-12"
        />
        <a
          href={caseStudy.href}
          aria-label={`${caseStudy.title} — view case study`}
          data-reveal-item
          className="group grid grid-cols-1 gap-8 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 md:grid-cols-12 md:gap-10"
        >
          <div className="md:col-span-7">
            <MediaFrame
              src={project?.screenshotUrl}
              alt={project?.screenshotAlt ?? `${caseStudy.title} project preview`}
              aspect="16/9"
            />
          </div>
          <div className="flex flex-col justify-center md:col-span-5">
            <h3
              className={`font-display text-2xl font-normal leading-tight md:text-3xl ${
                tone === "on-ink" ? "text-content" : "text-inverse-content"
              }`}
            >
              {caseStudy.title}
            </h3>
            <p className={`mt-4 max-w-[50ch] font-sans text-sm leading-relaxed md:text-base ${bodyColor}`}>
              {caseStudy.body}
            </p>
            <ArrowLink href={caseStudy.href} tone={tone} className="mt-6 w-fit">
              View Case Study
            </ArrowLink>
          </div>
        </a>
      </Container>
    </section>
  );
}
