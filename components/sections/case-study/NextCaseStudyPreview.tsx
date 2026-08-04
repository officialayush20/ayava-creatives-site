"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { useScrollReveal } from "@/lib/useScrollReveal";
import type { CaseStudy } from "@/lib/case-studies-data";

/**
 * Single next-item preview, cycling through the 8 real case studies
 * (case-study-layout-spec.md §7). Site-structure "infinite" pattern, not
 * literal in-page infinite scroll.
 */
export function NextCaseStudyPreview({ next }: { next: CaseStudy }) {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="next-case-study-heading" className="bg-ink py-16 md:py-40">
      <Container>
        <Link
          href={`/work/${next.slug}`}
          data-reveal-item
          className="group mx-auto flex max-w-3xl flex-col items-center gap-8 text-center focus-visible:outline-none"
        >
          <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
            Next Case Study
          </p>
          <h2
            id="next-case-study-heading"
            className="inline-block border-b border-transparent font-display text-[clamp(28px,5vw,52px)] font-normal leading-[1.05] text-ivory transition-colors duration-200 ease-out group-hover:border-gold"
          >
            {next.name}
          </h2>
          <MediaFrame
            alt={`${next.name} — ${next.descriptor}`}
            aspect="16/9"
            className="w-full max-w-xl transition-transform duration-300 ease-out group-hover:scale-[1.02] group-focus-visible:ring-2 group-focus-visible:ring-gold group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-ink"
          />
          <span className="inline-flex items-center gap-2 font-sans text-sm font-medium text-ivory">
            View Case Study
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        </Link>
      </Container>
    </section>
  );
}
