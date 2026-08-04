"use client";

import { useEffect, useRef, useState } from "react";
import type { LegalSectionData } from "@/lib/legal-data";

type LegalTocProps = {
  sections: LegalSectionData[];
};

/**
 * `<nav aria-label="Table of contents">` with an `<ol>`. Sticky sidebar on
 * desktop (top: 96px to clear header), static block on 768/mobile. Anchors
 * are real in-page links working without JS; the active-section highlight
 * is a progressive enhancement via IntersectionObserver.
 * legal-page-layout-spec.md §1.3.
 */
export function LegalToc({ sections }: LegalTocProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );

    headings.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Table of contents" className="lg:sticky lg:top-24">
      <ol className="flex flex-col gap-3">
        {sections.map((section, index) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`flex gap-2 border-l-2 pl-3 font-sans text-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isActive ? "border-bronze text-ink" : "border-transparent text-slate-deep"
                }`}
              >
                <span className="text-slate-deep">{index + 1}.</span>
                {section.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
