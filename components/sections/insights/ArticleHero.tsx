import { Tag } from "@/components/ui/Tag";
import { Container } from "@/components/ui/Container";
import type { Article } from "@/lib/insights-data";

type ArticleHeroProps = {
  article: Article;
};

/**
 * Article template hero — left-aligned editorial entry point, matching the
 * site's WorkHero/IndustriesHubHero pattern (insights-page-layout-spec.md
 * §2.1).
 */
export function ArticleHero({ article }: ArticleHeroProps) {
  const isPublished = article.status === "published";

  return (
    <section aria-labelledby="article-hero-heading" className="bg-ink py-16 md:py-24">
      <Container>
        <div className="flex max-w-3xl flex-col">
          <Tag tone="on-ink">{article.category}</Tag>
          <h1
            id="article-hero-heading"
            className="mt-4 max-w-[16ch] font-display text-[clamp(28px,9vw,56px)] font-normal leading-[1.05] text-ivory md:max-w-none"
          >
            {article.title}
          </h1>
          {isPublished ? (
            <p className="mt-6 font-sans text-sm text-slate">
              {article.author} &middot; {article.readTime} &middot; {article.publishDate}
            </p>
          ) : (
            <div className="mt-6 flex flex-col items-start gap-3">
              <p className="font-sans text-sm text-slate">Coming soon &mdash; {article.angle}</p>
              <span className="inline-flex w-fit items-center rounded-full border border-slate/40 px-3 py-1 font-sans text-xs font-medium uppercase tracking-[0.1em] text-slate">
                Coming soon
              </span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
