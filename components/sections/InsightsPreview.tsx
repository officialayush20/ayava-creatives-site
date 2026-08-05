"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ArticleCard } from "@/components/sections/insights/ArticleCard";
import { articles } from "@/lib/insights-data";
import { useScrollReveal } from "@/lib/useScrollReveal";

/**
 * Was previously a hardcoded "coming soon" stub list, disconnected from
 * lib/insights-data.ts (predates that file — this section shipped with the
 * original homepage build, before the Insights hub existed). Found stale
 * after the 3 articles were published: this component kept showing
 * "Coming soon" on all 3 even though real articles now exist at
 * /insights/[slug]. Fixed by consuming the shared data source through the
 * same ArticleCard component the Insights hub already uses, so this section
 * can never drift out of sync with real publish status again.
 */
export function InsightsPreview() {
  const revealRef = useScrollReveal<HTMLElement>();
  const preview = articles.slice(0, 3);

  return (
    <section ref={revealRef} aria-labelledby="insights-heading" className="bg-inverse-surface py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="Field notes"
          title="Field Notes, Not Filler"
          headingId="insights-heading"
          tone="on-ivory"
          action={
            <ArrowLink href="/insights" tone="on-ivory">
              View All Insights
            </ArrowLink>
          }
          className="mb-12 md:mb-16"
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {preview.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
