import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArticleHero } from "@/components/sections/insights/ArticleHero";
import { ArticleComingSoonBody } from "@/components/sections/insights/ArticleComingSoonBody";
import { ArticleBody } from "@/components/sections/insights/ArticleBody";
import { RelatedArticles } from "@/components/sections/insights/RelatedArticles";
import { articles, getArticleBySlug } from "@/lib/insights-data";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Ayava Creatives`,
    description: article.teaser ?? article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const isPublished = article.status === "published";

  return (
    <>
      <SiteHeader />
      <main>
        <ArticleHero article={article} />
        {isPublished ? <ArticleBody article={article} /> : <ArticleComingSoonBody article={article} />}
        <RelatedArticles current={article} />
        <CtaBand tone="on-ink" />
      </main>
      <MegaFooter />
    </>
  );
}
