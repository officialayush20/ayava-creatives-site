"use client";

import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { useScrollReveal } from "@/lib/useScrollReveal";

type ProblemStatementProps = {
  headingId: string;
  statement: string;
  children: ReactNode;
  tone?: "on-ink" | "on-ivory";
  className?: string;
};

/**
 * Shared 2-col sticky-headline + prose pattern: left col 1–4 = a single
 * sharp H2 statement, right col 5–12 = 2–3 short paragraphs of reasoning.
 * Introduced for About's "Why Ayava Exists" (about-page-layout-spec.md §3)
 * and reused as-is for Pricing's "How We Price" (pricing-page-layout-spec.md
 * §2) per that spec's explicit instruction to register this as a shared
 * cross-page component rather than rebuilding it.
 */
export function ProblemStatement({
  headingId,
  statement,
  children,
  tone = "on-ink",
  className = "",
}: ProblemStatementProps) {
  const bg = tone === "on-ink" ? "bg-surface" : "bg-inverse-surface";
  const headingColor = tone === "on-ink" ? "text-content" : "text-inverse-content";
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby={headingId} className={`${bg} py-16 md:py-24 ${className}`}>
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4" data-reveal-item>
            <h2
              id={headingId}
              className={`font-display text-[clamp(28px,4vw,44px)] font-normal leading-[1.05] md:sticky md:top-32 ${headingColor}`}
            >
              {statement}
            </h2>
          </div>
          <div className="md:col-span-8" data-reveal-item>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
