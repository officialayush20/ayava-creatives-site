"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { useScrollReveal } from "@/lib/useScrollReveal";
import type { CaseStudy } from "@/lib/case-studies-data";

/**
 * Ink strip, visually continuous with the Hero (case-study-layout-spec.md §2).
 * Semantic <dl> for correct screen-reader structure.
 */
export function SnapshotBar({ study }: { study: CaseStudy }) {
  const revealRef = useScrollReveal<HTMLDivElement>({ stagger: 0.05, start: "top 90%" });
  const items: { label: string; content: ReactNode }[] = [
    { label: "Industry", content: study.industry },
    {
      label: "Services Used",
      content: (
        <div className="flex flex-wrap gap-1.5">
          {study.servicesUsed.map((service) => (
            <Tag key={service} tone="on-ink">
              {service}
            </Tag>
          ))}
        </div>
      ),
    },
    { label: "Duration", content: study.duration },
    { label: "Region", content: study.region },
  ];

  return (
    <div ref={revealRef} role="group" aria-label="Project snapshot" className="border-t border-slate-deep bg-ink">
      <Container>
        <dl className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:grid-cols-4 md:gap-0 md:divide-x md:divide-slate-deep md:py-12">
          {items.map((item, index) => (
            <div
              key={item.label}
              data-reveal-item
              className={`flex flex-col gap-2 border-b border-slate-deep pb-6 sm:pb-0 md:border-b-0 md:px-6 ${
                index === 0 ? "md:pl-0" : ""
              }`}
            >
              <dt className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
                {item.label}
              </dt>
              <dd className="font-sans text-base text-ivory">{item.content}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
