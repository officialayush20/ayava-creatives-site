"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { useScrollReveal } from "@/lib/useScrollReveal";

const caseStudies = [
  {
    name: "Aura Estates",
    slug: "aura-estates",
    industry: "Luxury Real Estate",
    challenge:
      "A luxury real-estate developer needed a digital presence that matched the caliber of the properties themselves — most real-estate sites undersell what they're selling.",
    strategy:
      "Ayava designed and built a landing-page experience centered on visual restraint and property-led storytelling, engineered to hold a high-intent buyer's attention through the full decision journey.",
    results: "[AURA ESTATES METRICS — TBC, pending client data]",
  },
  {
    name: "College IQ",
    slug: "college-iq",
    industry: "EdTech",
    challenge:
      "An AI-driven EdTech platform needed a product website that could explain a technically complex offering to students and institutions without diluting it.",
    strategy:
      "Ayava architected the platform's marketing site around clarity-first UX — mapping the AI-powered learning journey into a structure a first-time visitor could understand in under a minute.",
    results: "[COLLEGE IQ METRICS — TBC, pending client data]",
  },
  {
    name: "NextepSolution",
    slug: "nextepsolution",
    industry: "CRM Platform (B2B)",
    challenge:
      "A CRM platform serving B2B clients needed a site that could sell software to operators, not consumers — a different trust bar entirely.",
    strategy:
      "Ayava built the platform's web architecture around use-case-led navigation, positioning NextepSolution's capabilities against the operational problems its buyers actually search for.",
    results: "[NEXTEPSOLUTION METRICS — TBC, pending client data]",
  },
];

function CaseStudySpread({
  study,
  reverse,
}: {
  study: (typeof caseStudies)[number];
  reverse: boolean;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      aria-label={`View case study — ${study.name}`}
      data-reveal-item
      className="group grid grid-cols-1 gap-8 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-ivory md:grid-cols-12 md:items-center md:gap-x-10"
    >
      <div className={`md:col-span-7 ${reverse ? "md:order-2" : "md:order-1"}`}>
        <MediaFrame
          alt={`${study.name} project preview`}
          aspect="4/5"
          className="transition-transform duration-300 ease-out group-hover:scale-[1.03] md:aspect-[16/9]"
        />
      </div>
      <div className={`md:col-span-5 ${reverse ? "md:order-1" : "md:order-2"}`}>
        <Tag tone="on-ivory">{study.industry}</Tag>
        <h3 className="mt-4 font-display text-2xl font-normal leading-tight md:text-3xl">
          {study.name}
        </h3>
        <p className="mt-4 font-sans text-sm text-slate-deep">{study.challenge}</p>
        <p className="mt-3 font-sans text-sm text-slate-deep">{study.strategy}</p>
        <p className="mt-3 font-sans text-xs italic text-slate-deep/70">{study.results}</p>
        <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-ink underline-offset-4 group-hover:underline">
          View Case Study
          <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}

export function FeaturedCaseStudies() {
  // Larger stagger + offset than the default: these are full editorial
  // spreads, not small grid tiles, so a more deliberate, spaced-out reveal
  // reads as more considered rather than busy.
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.15, y: 32 });

  return (
    <section ref={revealRef} aria-labelledby="case-studies-heading" className="bg-ivory py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="Selected work"
          title="Three flagship builds."
          headingId="case-studies-heading"
          tone="on-ivory"
          className="mb-16 md:mb-24"
        />
        <div className="flex flex-col gap-12 md:gap-24">
          {caseStudies.map((study, index) => (
            <CaseStudySpread key={study.name} study={study} reverse={index % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
