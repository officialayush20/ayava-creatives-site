export type RichContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] };

export type Article = {
  slug: string;
  title: string;
  category: string;
  status: "coming-soon" | "published";
  /** Stub only — the "Ref: ..." line from InsightsPreview. */
  angle?: string;
  /** Stub only — 1-2 sentence teaser, not a fabricated excerpt. */
  teaser?: string;
  /** Stub only — 2-3 talking points the piece will cover, per copy doc §1.4. */
  talkingPoints?: string[];
  /** Published only. */
  excerpt?: string;
  readTime?: string;
  publishDate?: string;
  author?: "Ayush Saini";
  coverImage?: string;
  body?: RichContentBlock[];
  relatedSlugs?: string[];
};

/**
 * Single source of truth for Insights content — mirrors lib/case-studies-data.ts
 * shape. The 3 seed entries are the real "coming soon" titles already live on
 * the homepage (components/sections/InsightsPreview.tsx), reused verbatim per
 * insights-page-layout-spec.md §0 and insights-page-copy.md. Zero published
 * articles exist yet — every entry below is status: "coming-soon" until real
 * long-form copy is written.
 */
export const articles: Article[] = [
  {
    slug: "crm-platform-website",
    title: "What a CRM Platform's Website Needs That a Landing Page Doesn't",
    category: "Strategy & Platforms",
    status: "coming-soon",
    angle: "Ref: NextepSolution learnings",
    teaser:
      "A CRM platform isn't selling a single conversion moment — it's selling trust to a buyer who will live inside the product for years. This piece breaks down what changes in site structure, proof, and pacing when the thing you're selling is a system, not a product.",
    talkingPoints: [
      "What a CRM buyer needs to see before they'll trust the product with their pipeline",
      "Why landing-page conventions (single CTA, single scroll) break down for a multi-stakeholder platform sale",
      "Structural lessons pulled directly from the NextepSolution build",
    ],
  },
  {
    slug: "luxury-real-estate-landing-pages",
    title: "Selling Luxury Real Estate Online Without Looking Like Every Other Listing Site",
    category: "Industry Playbooks",
    status: "coming-soon",
    angle: "Ref: Aura Estates",
    teaser:
      "Most real estate sites default to the same template: grid of listings, search filter, contact form. This piece covers what it takes to make a luxury property feel like a luxury property online — pacing, imagery discipline, and the restraint that signals price point before a single number does.",
    talkingPoints: [
      "Why listing-site templates undersell high-value property",
      "How pacing and imagery signal price point before the numbers do",
      "What changed in the Aura Estates site to move it out of \"generic listing site\" territory",
    ],
  },
  {
    slug: "ai-edtech-non-technical-buyers",
    title: "Explaining AI-Powered EdTech to Non-Technical Buyers",
    category: "Industry Playbooks",
    status: "coming-soon",
    angle: "Ref: College IQ",
    teaser:
      "The buyer for an EdTech platform is rarely the person who understands the AI underneath it. This piece looks at how to explain a technical product to a non-technical decision-maker without either dumbing it down or losing them in jargon.",
    talkingPoints: [
      "Why the buyer and the user of an EdTech product are rarely the same person",
      "How to explain an AI-driven feature set to someone evaluating on outcomes, not architecture",
      "What College IQ's positioning had to solve for a non-technical buying committee",
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/** Distinct categories represented across all articles, in first-appearance order. */
export const categoryFilters = Array.from(new Set(articles.map((a) => a.category)));

/** Published-only subset — currently empty; drives the "Related Articles" /
 * "Browse Published Insights" gating logic per the copy doc's explicit rule
 * that neither should render until >=1 (or >=2) published pieces exist. */
export const publishedArticles = articles.filter((a) => a.status === "published");
