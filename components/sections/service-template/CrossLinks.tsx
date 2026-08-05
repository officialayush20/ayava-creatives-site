"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HairlineRowList } from "@/components/ui/HairlineRowList";
import { services } from "@/lib/services-data";
import { useScrollReveal } from "@/lib/useScrollReveal";

type WhereThisFitsProps = {
  serviceName: string;
  relatedSlugs: string[];
  industries: string[];
};

/**
 * Merged Related Services + Related Industries into a single `bg-inverse-surface`
 * section (creative review §5 / checklist item 2) — the previous two
 * separate ink sections ran straight into FAQ (also ink) with no rule
 * between them, producing ~1,000px of unbroken ink on all 15 pages.
 * Retires the 4-col card grid for related services in favor of the
 * already-approved `HairlineRowList` pattern, then a hairline break, then
 * the existing industry chip row underneath.
 *
 * Replaces the previous `RelatedServicesCrossLinks` (ink) and
 * `RelatedIndustriesCrossLinks` (ivory) exports.
 */
export function WhereThisFits({ serviceName, relatedSlugs, industries }: WhereThisFitsProps) {
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.05 });
  const relatedServices = relatedSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <section ref={revealRef} aria-labelledby="where-this-fits-heading" className="bg-inverse-surface py-16 md:py-32">
      <Container>
        <SectionHeader
          eyebrow="Where This Fits"
          title="Pairs well with, and who we run it for."
          headingId="where-this-fits-heading"
          tone="on-ivory"
          className="mb-12 md:mb-16"
        />

        <HairlineRowList
          tone="on-ivory"
          numbered={false}
          items={relatedServices.map((service) => ({
            title: service.name,
            description: (
              <>
                <span>{service.oneLiner}</span>{" "}
                <Link
                  href={`/services/${service.slug}`}
                  aria-label={`${service.name} — ${service.oneLiner}`}
                  className="inline-flex items-center gap-1 font-medium text-inverse-content underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface"
                >
                  See the service
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </>
            ),
          }))}
        />

        <div className="border-t border-hairline/40 pt-10 md:pt-12">
          <p className="mb-6 font-sans text-xs font-medium uppercase tracking-[0.18em] text-hairline">
            Who We Do This For
          </p>
          <ul className="flex snap-x gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
            {industries.map((industry) => (
              <li key={industry} data-reveal-item className="shrink-0 snap-start md:shrink">
                <Link
                  href="/industries"
                  aria-label={`${industry} — an industry we serve with ${serviceName}`}
                  className="inline-flex items-center rounded-full border border-hairline/40 px-5 py-2 font-sans text-sm text-inverse-content transition-colors duration-200 ease-out hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface"
                >
                  {industry}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
