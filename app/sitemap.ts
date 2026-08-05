import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { services } from "@/lib/services-data";
import { industries } from "@/lib/industries-data";
import { caseStudies } from "@/lib/case-studies-data";
import { publishedArticles } from "@/lib/insights-data";

/**
 * Native Next.js sitemap convention (MetadataRoute.Sitemap) — served at
 * /sitemap.xml. Every entry is a real, resolvable route; nothing here is
 * speculative. Insights only includes `publishedArticles` (currently all 3
 * seed articles) — "coming-soon" stub articles are intentionally excluded
 * since they render a placeholder body, not indexable content. Privacy,
 * Terms, and API routes are deliberately omitted per the task scope.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homepage: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl(""),
    lastModified: now,
    changeFrequency: "daily",
    priority: 1.0,
  };

  const servicesHub: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/services"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  };

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const industriesHub: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/industries"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  };

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: absoluteUrl(`/industries/${industry.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const workHub: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/work"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  };

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: absoluteUrl(`/work/${study.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const insightsHub: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/insights"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  };

  const insightsArticlePages: MetadataRoute.Sitemap = publishedArticles.map((article) => ({
    url: absoluteUrl(`/insights/${article.slug}`),
    lastModified: article.publishDate ? new Date(article.publishDate) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const staticMediumPages: MetadataRoute.Sitemap = [
    "/about",
    "/pricing",
    "/careers",
    "/contact",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    homepage,
    servicesHub,
    ...servicePages,
    industriesHub,
    ...industryPages,
    workHub,
    ...caseStudyPages,
    insightsHub,
    ...insightsArticlePages,
    ...staticMediumPages,
  ];
}
