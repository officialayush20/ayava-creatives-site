"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { industries } from "@/lib/industries-data";
import { useScrollReveal } from "@/lib/useScrollReveal";

function IndustryTile({ slug, name, hook }: { slug: string; name: string; hook: string }) {
  return (
    <a
      href={`/industries/${slug}`}
      aria-label={`${name} — ${hook}`}
      data-reveal-item
      className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-sm border border-slate-deep bg-ink-raise p-4 transition-colors duration-200 ease-out hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(160deg,var(--color-ink-raise)_0%,var(--color-slate-deep)_100%)] opacity-70 transition-transform duration-300 ease-out group-hover:scale-105"
      />
      <div className="relative">
        <h3 className="font-sans text-sm font-medium text-ivory md:text-base">{name}</h3>
        <p className="mt-1 font-sans text-xs text-slate opacity-100 md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
          {hook}
        </p>
      </div>
    </a>
  );
}

/**
 * Homepage teaser grid — links each tile to its real `/industries/[slug]`
 * page (fixed from the earlier decorative `href="/industries"` placeholder
 * on every tile, the same broken-link defect flagged and corrected on
 * `ServicesShowcase`). Full 10-item mode is reused as-is on the Industries
 * Hub page below.
 */
export function IndustriesGrid() {
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.05 });

  return (
    <section ref={revealRef} aria-labelledby="industries-heading" className="bg-ivory py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="Where we work"
          title="Industries we dominate."
          headingId="industries-heading"
          tone="on-ivory"
          className="mb-12 md:mb-16"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
          {industries.map((industry) => (
            <IndustryTile key={industry.slug} slug={industry.slug} name={industry.name} hook={industry.hook} />
          ))}
        </div>
      </Container>
    </section>
  );
}
