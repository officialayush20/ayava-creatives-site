"use client";

import { useEffect, useRef } from "react";
import { Tag } from "@/components/ui/Tag";
import { Container } from "@/components/ui/Container";
import type { Article } from "@/lib/insights-data";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";

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
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return; // fallback: tag/headline/byline render in final state instantly

    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-hero-item]");
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 24 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASE,
        stagger: 0.12,
        delay: 0.15,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} aria-labelledby="article-hero-heading" className="bg-ink py-16 md:py-24">
      <Container>
        <div className="flex max-w-3xl flex-col">
          <div data-hero-item>
            <Tag tone="on-ink">{article.category}</Tag>
          </div>
          <h1
            id="article-hero-heading"
            data-hero-item
            className="mt-4 max-w-[16ch] font-display text-[clamp(28px,9vw,56px)] font-normal leading-[1.05] text-ivory md:max-w-none"
          >
            {article.title}
          </h1>
          {isPublished ? (
            <p data-hero-item className="mt-6 font-sans text-sm text-slate">
              {article.author} &middot; {article.readTime} &middot; {article.publishDate}
            </p>
          ) : (
            <div data-hero-item className="mt-6 flex flex-col items-start gap-3">
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
