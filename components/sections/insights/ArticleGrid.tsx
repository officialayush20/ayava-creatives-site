"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FilterChip } from "@/components/sections/work/FilterChip";
import { ArticleCard } from "@/components/sections/insights/ArticleCard";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { articles, categoryFilters } from "@/lib/insights-data";

/**
 * Filter bar + article grid, one continuous ivory zone — mirrors
 * WorkGridSection's structure exactly (client-side, synchronous, single
 * filter group). insights-page-layout-spec.md §1.2/§1.3.
 */
export function ArticleGrid() {
  const [categoryActive, setCategoryActive] = useState<string[]>([]);
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.05 });

  const toggle = (value: string) => {
    setCategoryActive((list) =>
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  };

  const hasActiveFilters = categoryActive.length > 0;

  const filtered = useMemo(() => {
    return articles.filter(
      (article) => categoryActive.length === 0 || categoryActive.includes(article.category),
    );
  }, [categoryActive]);

  const clearFilters = () => setCategoryActive([]);

  return (
    <section
      ref={revealRef}
      aria-labelledby="insights-hero-heading"
      className="bg-ivory pb-16 pt-12 md:pb-40 md:pt-12"
    >
      <Container>
        {/* Filter Bar */}
        <div
          role="group"
          aria-label="Filter articles by category"
          className="flex flex-col gap-4 border-b border-slate-deep/20 pb-8 md:flex-row md:items-start md:justify-between md:gap-8"
        >
          <div>
            <p className="mb-2 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate-deep">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((category) => (
                <FilterChip
                  key={category}
                  label={category}
                  active={categoryActive.includes(category)}
                  onToggle={() => toggle(category)}
                />
              ))}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 font-sans text-sm text-slate-deep">
            <p aria-live="polite">
              {hasActiveFilters ? (
                <>
                  Showing <span className="font-display text-slate-deep">{filtered.length}</span> of{" "}
                  {articles.length} articles
                </>
              ) : (
                `${articles.length} articles`
              )}
            </p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="font-sans text-sm font-medium text-ink underline underline-offset-4 hover:text-ink hover:underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
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
                Nothing here yet in that category.
              </h3>
              <p className="max-w-[60ch] font-sans text-base text-slate-deep">
                This category is on the roadmap but hasn&apos;t produced a piece worth publishing.
                Browse everything below, or check back — we only publish when there&apos;s
                something worth reading.
              </p>
              <Button variant="secondary" tone="on-ivory" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
              {filtered.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
