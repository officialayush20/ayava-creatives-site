"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { publishedArticles } from "@/lib/insights-data";
import type { Article } from "@/lib/insights-data";
import { useScrollReveal } from "@/lib/useScrollReveal";

type ArticleComingSoonBodyProps = {
  article: Article;
};

/**
 * Honest stub-state body — same principle as CaseStudyEmptyState (full-width,
 * left-aligned, no fabricated content) applied to an unwritten article rather
 * than a metric row. insights-page-layout-spec.md §2.2. Never fabricates a
 * body for a coming-soon entry.
 */
export function ArticleComingSoonBody({ article }: ArticleComingSoonBodyProps) {
  const hasPublishedArticles = publishedArticles.length > 0;
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="coming-soon-heading" className="bg-inverse-surface py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-8">
          <h2 id="coming-soon-heading" className="sr-only">
            This piece is coming soon
          </h2>
          <p className="max-w-[60ch] font-sans text-base text-inverse-content md:text-lg">
            This piece is announced, not yet published. Here&apos;s what it&apos;ll cover when it
            goes live:
          </p>
          {article.talkingPoints ? (
            <ul className="flex max-w-[60ch] flex-col gap-2 pl-6 font-sans text-base text-inverse-content marker:text-bronze" style={{ listStyleType: "disc" }}>
              {article.talkingPoints.map((point) => (
                <li key={point} className="leading-[1.7]">
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
          {hasPublishedArticles ? (
            <Button href="/insights" variant="secondary" tone="on-ivory" className="w-fit">
              Browse Published Insights
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
