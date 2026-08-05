"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/services-data";
import { useScrollReveal } from "@/lib/useScrollReveal";

// Homepage teaser order (SMM featured first) — kept distinct from the
// shared data file's own order so `/services` (the hub page) is free to
// group/re-order by category without affecting this section.
const showcaseOrder = [
  "social-media-marketing",
  "meta-ads",
  "google-ads",
  "seo",
  "website-design",
  "branding",
  "content-marketing",
  "influencer-marketing",
  "email-crm-marketing",
  "app-store-marketing",
  "video-motion-production",
  "pr-reputation-management",
  "ecommerce-growth",
  "analytics-cro",
  "ai-marketing",
];

const orderedServices = showcaseOrder
  .map((slug) => services.find((service) => service.slug === slug))
  .filter((service): service is NonNullable<typeof service> => Boolean(service));

export function ServicesShowcase() {
  const [first, ...rest] = orderedServices;
  // 15 cards is a lot of simultaneous stagger; keep the per-item delay tight
  // so the whole grid finishes revealing quickly rather than trailing off.
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.05 });

  return (
    <section ref={revealRef} aria-labelledby="services-heading" className="bg-surface py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="What we run"
          title="Fifteen systems, one strategy."
          headingId="services-heading"
          tone="on-ink"
          className="mb-12 md:mb-16"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12 md:gap-6">
          <ServiceCard
            slug={first.slug}
            name={first.name}
            description={first.oneLiner}
            number={String(1).padStart(2, "0")}
            spanClassName="md:col-span-6"
          />
          {rest.map((service, index) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              name={service.name}
              description={service.oneLiner}
              number={String(index + 2).padStart(2, "0")}
              spanClassName="md:col-span-3"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
