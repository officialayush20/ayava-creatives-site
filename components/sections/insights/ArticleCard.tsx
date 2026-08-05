import Link from "next/link";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Tag } from "@/components/ui/Tag";
import type { Article } from "@/lib/insights-data";

type ArticleCardProps = {
  article: Article;
};

/**
 * Grid card for the Insights hub + Related Articles rail. Two footer
 * treatments driven by `article.status` — published cards are a single
 * clickable region routing to /insights/[slug]; coming-soon cards render as
 * a static, non-interactive block (no href) since there's nothing to visit
 * yet. insights-page-layout-spec.md §1.3.
 */
export function ArticleCard({ article }: ArticleCardProps) {
  const isPublished = article.status === "published";

  const media = (
    <MediaFrame
      src={article.coverImage}
      alt={`${article.title} — cover`}
      aspect="16/9"
      className={
        isPublished
          ? "transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          : undefined
      }
    />
  );

  const body = (
    <div className="mt-4 flex flex-1 flex-col">
      <Tag tone="on-ivory" className="w-fit">
        {article.category}
      </Tag>
      <h3
        className={`mt-3 line-clamp-2 inline-block border-b border-transparent font-display text-lg font-normal leading-snug text-inverse-content transition-colors duration-200 ease-out ${
          isPublished ? "group-hover:border-accent" : ""
        }`}
      >
        {article.title}
      </h3>
      {isPublished ? (
        <>
          <p className="mt-2 line-clamp-1 font-sans text-sm text-hairline">{article.excerpt}</p>
          <p className="mt-2 font-sans text-xs text-hairline/70">
            {article.readTime} &middot; {article.publishDate}
          </p>
        </>
      ) : (
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <p className="font-sans text-xs text-hairline/70">{article.angle}</p>
          <span className="inline-flex w-fit items-center rounded-full border border-hairline/30 px-3 py-1 font-sans text-xs font-medium uppercase tracking-[0.1em] text-hairline">
            Coming soon
          </span>
        </div>
      )}
    </div>
  );

  if (isPublished) {
    return (
      <Link
        href={`/insights/${article.slug}`}
        data-reveal-item
        className="group flex h-full flex-col focus-visible:outline-none"
      >
        {media}
        {body}
      </Link>
    );
  }

  return (
    <div
      data-reveal-item
      aria-disabled="true"
      className="flex h-full flex-col opacity-90"
    >
      {media}
      {body}
    </div>
  );
}
