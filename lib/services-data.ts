export type ServiceCategory =
  | "Paid Media"
  | "Organic & Content"
  | "Brand & Creative"
  | "Growth Systems";

export type Service = {
  id: string;
  slug: string;
  name: string;
  oneLiner: string;
  category: ServiceCategory;
};

/**
 * Single source of truth for all 15 services — name/oneLiner copy is
 * verbatim from `homepage-copy.md` §3 "Services Showcase" (do not rewrite).
 * Both `ServicesShowcase.tsx` (homepage teaser, flat grid) and the
 * `/services` hub page (grouped by `category`) import from here so the two
 * pages never drift out of sync on copy or slugs.
 *
 * Order below matches the homepage's existing showcase order (SMM
 * featured first). The hub page re-groups/re-orders these by `category`
 * per the Services Hub layout spec — it does not rely on this array's
 * iteration order.
 *
 * Slugs are lowercase-hyphenated, no category prefix, matching the
 * convention already established by the live `/services/meta-ads` route.
 * Only `meta-ads` currently resolves to a real page; the rest are the
 * locked-in canonical slugs for pages to be built later.
 */
export const services: Service[] = [
  {
    id: "smm",
    slug: "social-media-marketing",
    name: "Social Media Marketing (SMM)",
    oneLiner: "Turn scrolling into a scheduled habit around your brand.",
    category: "Organic & Content",
  },
  {
    id: "meta-ads",
    slug: "meta-ads",
    name: "Meta Ads",
    oneLiner: "Every rupee of ad spend traced back to a rupee of revenue.",
    category: "Paid Media",
  },
  {
    id: "google-ads",
    slug: "google-ads",
    name: "Google Ads",
    oneLiner: "Capture demand at the exact second someone searches for you.",
    category: "Paid Media",
  },
  {
    id: "seo",
    slug: "seo",
    name: "SEO",
    oneLiner: "Rank where buyers look first, not where algorithms feel generous.",
    category: "Organic & Content",
  },
  {
    id: "website-design",
    slug: "website-design",
    name: "Website Design",
    oneLiner: "A site engineered to convert visitors on the first scroll, not the fifth.",
    category: "Brand & Creative",
  },
  {
    id: "branding",
    slug: "branding",
    name: "Branding",
    oneLiner: "A visual and verbal identity competitors can't casually copy.",
    category: "Brand & Creative",
  },
  {
    id: "content-marketing",
    slug: "content-marketing",
    name: "Content Marketing",
    oneLiner:
      "Content built to compound in search and shareability, not just publish and disappear.",
    category: "Organic & Content",
  },
  {
    id: "influencer-marketing",
    slug: "influencer-marketing",
    name: "Influencer Marketing",
    oneLiner: "Borrowed trust, deployed with the same rigor as paid media.",
    category: "Growth Systems",
  },
  {
    id: "email-crm-marketing",
    slug: "email-crm-marketing",
    name: "Email/CRM Marketing",
    oneLiner: "The channel you own, engineered to outperform the channels you rent.",
    category: "Growth Systems",
  },
  {
    id: "app-store-marketing",
    slug: "app-store-marketing",
    name: "App Store Marketing/ASO",
    oneLiner: "Ranked higher, installed more, uninstalled less.",
    category: "Growth Systems",
  },
  {
    id: "video-motion-production",
    slug: "video-motion-production",
    name: "Video & Motion Production",
    oneLiner: "Motion that earns the first three seconds and keeps them.",
    category: "Brand & Creative",
  },
  {
    id: "pr-reputation-management",
    slug: "pr-reputation-management",
    name: "PR/Reputation Management",
    oneLiner: "Control the narrative before the internet writes it for you.",
    category: "Growth Systems",
  },
  {
    id: "ecommerce-growth",
    slug: "ecommerce-growth",
    name: "E-commerce Growth",
    oneLiner: "Every step of the funnel audited until checkout stops leaking revenue.",
    category: "Growth Systems",
  },
  {
    id: "analytics-cro",
    slug: "analytics-cro",
    name: "Analytics/CRO",
    oneLiner: "Decisions made on data, not on whoever pitched loudest in the meeting.",
    category: "Growth Systems",
  },
  {
    id: "ai-marketing",
    slug: "ai-marketing",
    name: "AI Marketing",
    oneLiner: "Automation that scales judgment, not just tasks.",
    category: "Growth Systems",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
