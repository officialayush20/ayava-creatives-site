"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FilterChip } from "@/components/sections/work/FilterChip";
import { CaseStudyCard } from "@/components/sections/work/CaseStudyCard";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { caseStudies, industryFilters, serviceFilters, featuredSlug } from "@/lib/case-studies-data";

/**
 * Filter Bar + Case Study Grid — one continuous ivory zone per
 * work-hub-layout-spec.md §0/§2/§3. Client-side, synchronous, no
 * loading/debounce states (8-item dataset). AND logic across the two
 * filter groups, OR logic within each group.
 */
export function WorkGridSection() {
  const [industryActive, setIndustryActive] = useState<string[]>([]);
  const [serviceActive, setServiceActive] = useState<string[]>([]);
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.05 });

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const hasActiveFilters = industryActive.length > 0 || serviceActive.length > 0;

  const filtered = useMemo(() => {
    return caseStudies.filter((study) => {
      const industryMatch = industryActive.length === 0 || industryActive.includes(study.industry);
      const serviceMatch =
        serviceActive.length === 0 || serviceActive.some((s) => study.servicesUsed.includes(s));
      return industryMatch && serviceMatch;
    });
  }, [industryActive, serviceActive]);

  const featured = filtered.find((s) => s.slug === featuredSlug);
  const rest = filtered.filter((s) => s.slug !== featuredSlug);
  const showAsymmetricOpener = !hasActiveFilters && Boolean(featured);

  const clearFilters = () => {
    setIndustryActive([]);
    setServiceActive([]);
  };

  return (
    <section
      ref={revealRef}
      aria-labelledby="work-hero-heading"
      className="bg-ivory pb-16 pt-12 md:pb-40 md:pt-12"
    >
      <Container>
        {/* Filter Bar */}
        <div role="group" aria-label="Filter case studies" className="flex flex-col gap-4 border-b border-slate-deep/20 pb-8 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-2 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate-deep">
                Industry
              </p>
              <div className="flex flex-wrap gap-2">
                {industryFilters.map((industry) => (
                  <FilterChip
                    key={industry}
                    label={industry}
                    active={industryActive.includes(industry)}
                    onToggle={() => toggle(industryActive, setIndustryActive, industry)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate-deep">
                Service
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceFilters.map((service) => (
                  <FilterChip
                    key={service}
                    label={service}
                    active={serviceActive.includes(service)}
                    onToggle={() => toggle(serviceActive, setServiceActive, service)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 font-sans text-sm text-slate-deep md:pt-6">
            <p aria-live="polite">
              {hasActiveFilters ? (
                <>
                  Showing <span className="font-display text-gold">{filtered.length}</span> of{" "}
                  {caseStudies.length} projects
                </>
              ) : (
                `${caseStudies.length} projects`
              )}
            </p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="font-sans text-sm font-medium text-ink underline underline-offset-4 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        </div>

        {/* Grid / No-results */}
        <div className="pt-16 md:pt-16">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-start gap-6 py-16">
              <h3 className="font-display text-2xl font-normal text-ink md:text-3xl">
                No projects match that combination yet
              </h3>
              <p className="font-sans text-base text-slate-deep">
                Try clearing a filter, or view all {caseStudies.length} projects.
              </p>
              <Button variant="secondary" tone="on-ivory" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-12 md:gap-x-8 md:gap-y-12">
              {showAsymmetricOpener && featured ? (
                <>
                  <div className="sm:col-span-2 md:col-span-8">
                    <CaseStudyCard study={featured} variant="featured" />
                  </div>
                  <div className="flex flex-col gap-8 sm:col-span-2 md:col-span-4 md:gap-12">
                    {rest.slice(0, 2).map((study) => (
                      <CaseStudyCard key={study.slug} study={study} />
                    ))}
                  </div>
                  {rest.slice(2).map((study) => (
                    <div key={study.slug} className="md:col-span-4">
                      <CaseStudyCard study={study} />
                    </div>
                  ))}
                </>
              ) : (
                filtered.map((study) => (
                  <div key={study.slug} className="md:col-span-4">
                    <CaseStudyCard study={study} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
