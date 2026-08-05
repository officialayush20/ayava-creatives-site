"use client";

import { Container } from "@/components/ui/Container";
import { RichContentRenderer } from "@/components/ui/RichContentRenderer";
import type { Article } from "@/lib/insights-data";
import { useScrollReveal } from "@/lib/useScrollReveal";

type ArticleBodyProps = {
  article: Article;
};

/**
 * Published long-form body branch — ivory section, 72ch measure,
 * RichContentRenderer handles the block-type switch.
 * insights-page-layout-spec.md §2.3.
 */
export function ArticleBody({ article }: ArticleBodyProps) {
  // Reveal fires once for the whole prose block as a single unit — long-form
  // copy should never fade in paragraph by paragraph, that reads as gimmicky
  // rather than purposeful for reading content.
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-label="Article body" className="bg-inverse-surface py-16 md:py-24">
      <Container>
        <article>
          <RichContentRenderer
            blocks={article.body ?? []}
            coverImage={article.coverImage}
            coverAlt={`${article.title} — cover`}
          />
        </article>
      </Container>
    </section>
  );
}
