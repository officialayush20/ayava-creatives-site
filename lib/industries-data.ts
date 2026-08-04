export type Industry = {
  id: string;
  slug: string;
  name: string;
  /** One-line hook copy — verbatim from homepage-copy.md §7, reused on the
   * Industries Hub grid and the homepage IndustriesGrid tile. Do not rewrite. */
  hook: string;
};

/**
 * Single source of truth for all 10 industries — mirrors `lib/services-data.ts`.
 * Both the homepage `IndustriesGrid` teaser and the `/industries` hub page
 * import from here so tile copy/slugs never drift out of sync. Order below
 * matches `industries-hub-layout-spec.md`'s table (blueprint order, not
 * alphabetical — no rank/sequence is implied, tiles render with no numbering).
 */
export const industries: Industry[] = [
  {
    id: "real-estate",
    slug: "real-estate",
    name: "Real Estate",
    hook: "Sell the property before the site visit.",
  },
  {
    id: "d2c-ecommerce",
    slug: "d2c-ecommerce",
    name: "D2C / E-commerce",
    hook: "Turn one-time buyers into repeat revenue.",
  },
  {
    id: "healthcare",
    slug: "healthcare",
    name: "Healthcare",
    hook: "Build trust before the first appointment is booked.",
  },
  {
    id: "hospitality-travel",
    slug: "hospitality-travel",
    name: "Hospitality & Travel",
    hook: "Convert browsing into bookings, not just wishlists.",
  },
  {
    id: "fintech",
    slug: "fintech",
    name: "FinTech",
    hook: "Explain complex products in language regulators and users both accept.",
  },
  {
    id: "fashion-luxury",
    slug: "fashion-luxury",
    name: "Fashion & Luxury",
    hook: "Protect brand equity while still performance-marketing.",
  },
  {
    id: "edtech",
    slug: "edtech",
    name: "EdTech",
    hook: "Turn curiosity into enrollment, and enrollment into completion.",
  },
  {
    id: "saas-tech",
    slug: "saas-tech",
    name: "SaaS / Tech",
    hook: "Sell to operators who research before they ever talk to sales.",
  },
  {
    id: "automotive",
    slug: "automotive",
    name: "Automotive",
    hook: "Move buyers from research tab to showroom floor.",
  },
  {
    id: "fnb-qsr",
    slug: "fnb-qsr",
    name: "F&B / QSR",
    hook: "Fill tables and app orders on the same week's budget.",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
