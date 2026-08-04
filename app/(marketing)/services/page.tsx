import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServicesHubHero } from "@/components/sections/services/ServicesHubHero";
import { ServiceCategorySection } from "@/components/sections/services/ServiceCategorySection";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Services | Ayava Creatives",
  description:
    "Fifteen services, grouped by what you're trying to fix first — from Paid Media to Growth Systems.",
};

// Per-group order fixed by the layout spec (independent of the shared data
// file's own iteration order, which mirrors the homepage teaser instead).
const byOrder = (slugs: string[]) =>
  slugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

export default function ServicesPage() {
  const paidMedia = byOrder(["meta-ads", "google-ads"]);
  const organicContent = byOrder(["seo", "content-marketing", "social-media-marketing"]);
  const brandCreative = byOrder(["branding", "video-motion-production", "website-design"]);
  const growthSystems = byOrder([
    "email-crm-marketing",
    "analytics-cro",
    "ecommerce-growth",
    "ai-marketing",
    "app-store-marketing",
    "influencer-marketing",
    "pr-reputation-management",
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <ServicesHubHero />
        <ServiceCategorySection
          eyebrow="Spend that's traced to revenue"
          title="Paid Media"
          headingId="paid-media-heading"
          tone="on-ivory"
          services={paidMedia}
          columnSpan="md:col-span-6"
        />
        <ServiceCategorySection
          eyebrow="Earned attention, compounded over time"
          title="Organic & Content"
          headingId="organic-content-heading"
          tone="on-ink"
          services={organicContent}
          columnSpan="md:col-span-4"
        />
        <ServiceCategorySection
          eyebrow="The identity and assets behind every campaign"
          title="Brand & Creative"
          headingId="brand-creative-heading"
          tone="on-ivory"
          services={brandCreative}
          columnSpan="md:col-span-4"
        />
        <ServiceCategorySection
          eyebrow="Own the channels you don't rent"
          title="Growth Systems"
          headingId="growth-systems-heading"
          tone="on-ink"
          services={growthSystems}
          columnSpan="md:col-span-3"
        />
        <CtaBand
          headline="Not sure which one you need? Start with a conversation, not a menu."
          primaryHref="/contact"
          primaryLabel="Book a Call"
          secondary={null}
        />
      </main>
      <MegaFooter />
    </>
  );
}
