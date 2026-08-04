import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArticleCard } from "@/components/sections/insights/ArticleCard";
import { publishedArticles } from "@/lib/insights-data";
import type { Article } from "@/lib/insights-data";

type RelatedArticlesProps = {
  current: Article;
};

/**
 * Related rail — published articles only, category-matched, excluding self.
 * Renders null entirely if fewer than 2 other published articles exist
 * (currently zero published site-wide, so this always returns null today).
 * insights-page-layout-spec.md §2.4.
 */
export function RelatedArticles({ current }: RelatedArticlesProps) {
  const others = publishedArticles.filter((a) => a.slug !== current.slug);
  if (others.length < 2) return null;

  const sameCategory = others.filter((a) => a.category === current.category);
  const related = (sameCategory.length >= 3 ? sameCategory : others).slice(0, 3);

  return (
    <section aria-labelledby="related-articles-heading" className="bg-ink py-16 md:py-24">
      <Container>
        <SectionHeader
          eyebrow="Keep Reading"
          title="More Field Notes"
          headingId="related-articles-heading"
          tone="on-ink"
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {related.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
