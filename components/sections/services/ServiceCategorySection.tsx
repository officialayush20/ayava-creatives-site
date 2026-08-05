"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import type { Service } from "@/lib/services-data";
import { useScrollReveal } from "@/lib/useScrollReveal";

type ServiceCategorySectionProps = {
  eyebrow: string;
  title: string;
  headingId: string;
  tone: "on-ink" | "on-ivory";
  services: Service[];
  /** Tailwind md:col-span-N applied to every card in this group. */
  columnSpan: string;
};

/**
 * One category group on the /services hub page. Thin wrapper so the four
 * groups (Paid Media / Organic & Content / Brand & Creative / Growth
 * Systems) share one implementation rather than four hand-built sections —
 * only the item count/column-span/tone differ per group.
 */
export function ServiceCategorySection({
  eyebrow,
  title,
  headingId,
  tone,
  services,
  columnSpan,
}: ServiceCategorySectionProps) {
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.05 });
  const bg = tone === "on-ivory" ? "bg-inverse-surface" : "bg-surface";

  return (
    <section ref={revealRef} aria-labelledby={headingId} className={`${bg} py-16 md:py-32`}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          headingId={headingId}
          tone={tone}
          className="mb-12 md:mb-16"
        />
        <div className="grid grid-cols-1 gap-4 min-[428px]:gap-4 sm:grid-cols-2 md:grid-cols-12 md:gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              name={service.name}
              description={service.oneLiner}
              showNumber={false}
              size="compact"
              tone={tone}
              spanClassName={columnSpan}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
