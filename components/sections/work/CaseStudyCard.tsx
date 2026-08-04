import Link from "next/link";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Tag } from "@/components/ui/Tag";
import type { CaseStudy } from "@/lib/case-studies-data";

type CaseStudyCardProps = {
  study: CaseStudy;
  variant?: "featured" | "standard";
};

/**
 * Single clickable region (work-hub-layout-spec.md §3). No card fill/border
 * color change to gold, no lift/translate, no badge — approved hover is
 * image scale 1.02 + arrow slide (existing ArrowLink pattern) + a 1px gold
 * hairline underline beneath the project name only.
 */
export function CaseStudyCard({ study, variant = "standard" }: CaseStudyCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Link
      href={`/work/${study.slug}`}
      data-reveal-item
      className="group block focus-visible:outline-none"
    >
      <MediaFrame
        alt={`${study.name} — ${study.descriptor}`}
        aspect={isFeatured ? "16/9" : "4/5"}
        className="transition-transform duration-300 ease-out group-hover:scale-[1.02] group-focus-visible:ring-2 group-focus-visible:ring-gold group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-ivory"
      />
      <div className="mt-5">
        <Tag tone="on-ivory">{study.industry}</Tag>
        <h3 className="mt-3 inline-block border-b border-transparent font-display text-2xl font-normal text-ink transition-colors duration-200 ease-out group-hover:border-gold">
          {study.name}
        </h3>
        <p className="mt-2 max-w-[42ch] font-sans text-sm text-slate-deep">{study.cardSummary}</p>
        <span className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-medium text-ink">
          View Case Study
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
