"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/services-data";
import { useScrollReveal } from "@/lib/useScrollReveal";

type RelevantServicesProps = {
  industryName: string;
  serviceSlugs: string[];
};

/** Curated 3–5 service cross-links per industry-page-layout-spec §3. */
export function RelevantServices({ industryName, serviceSlugs }: RelevantServicesProps) {
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.05 });
  const relevantServices = serviceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <section
      id="relevant-services"
      ref={revealRef}
      aria-labelledby="relevant-services-heading"
      className="bg-surface py-16 md:py-32"
    >
      <Container>
        <SectionHeader
          eyebrow="Where We'd Start"
          title="Relevant Services"
          headingId="relevant-services-heading"
          tone="on-ink"
          className="mb-12 md:mb-16"
        />
        <div className="flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {relevantServices.map((service) => (
            <div key={service.slug} className="w-[75vw] shrink-0 snap-start sm:w-auto sm:shrink">
              <ServiceCard
                slug={service.slug}
                name={service.name}
                description={service.oneLiner}
                showNumber={false}
                size="compact"
                tone="on-ink"
              />
            </div>
          ))}
        </div>
        <p className="sr-only">Recommended services for {industryName} — see full catalog at /services.</p>
      </Container>
    </section>
  );
}
