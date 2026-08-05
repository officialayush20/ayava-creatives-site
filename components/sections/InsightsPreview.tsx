"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { useScrollReveal } from "@/lib/useScrollReveal";

const upcomingAngles = [
  {
    title: "What a CRM Platform's Website Needs That a Landing Page Doesn't",
    reference: "Ref: NextepSolution learnings",
  },
  {
    title: "Selling Luxury Real Estate Online Without Looking Like Every Other Listing Site",
    reference: "Ref: Aura Estates",
  },
  {
    title: "Explaining AI-Powered EdTech to Non-Technical Buyers",
    reference: "Ref: College IQ",
  },
];

/**
 * No published articles exist yet. Rather than fabricate excerpts/dates,
 * these render as clearly-marked "coming soon" cards using the real
 * article angles already drafted in the copy doc for the content pipeline.
 */
export function InsightsPreview() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="insights-heading" className="bg-inverse-surface py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="Field notes"
          title="Field Notes, Not Filler"
          headingId="insights-heading"
          tone="on-ivory"
          action={
            <ArrowLink href="/insights" tone="on-ivory">
              View All Insights
            </ArrowLink>
          }
          className="mb-12 md:mb-16"
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {upcomingAngles.map((angle) => (
            <div key={angle.title} data-reveal-item className="flex flex-col">
              <MediaFrame alt={`${angle.title} — coming soon`} aspect="16/9" />
              <span className="mt-4 inline-block w-fit rounded-full border border-hairline/30 px-3 py-1 font-sans text-xs font-medium uppercase tracking-[0.1em] text-hairline">
                Coming soon
              </span>
              <h3 className="mt-3 font-display text-lg font-normal leading-snug">
                {angle.title}
              </h3>
              <p className="mt-2 font-sans text-xs text-hairline/70">{angle.reference}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
