"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal } from "@/lib/useScrollReveal";

const relatedServices = [
  { name: "Google Ads", description: "Capture demand at the exact second someone searches for you." },
  { name: "Analytics/CRO", description: "Decisions made on data, not on whoever pitched loudest in the meeting." },
  { name: "Content Marketing", description: "Content built to compound in search and shareability, not just publish and disappear." },
  { name: "Video & Motion Production", description: "Motion that earns the first three seconds and keeps them." },
];

const relatedIndustries = [
  "D2C / E-commerce",
  "Real Estate",
  "Hospitality & Travel",
  "Fashion & Luxury",
  "F&B / QSR",
];

export function RelatedServicesCrossLinks() {
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.05 });

  return (
    <section ref={revealRef} aria-labelledby="related-services-heading" className="bg-ink py-16 md:py-32">
      <Container>
        <SectionHeader
          eyebrow="Pairs Well With"
          title="Related Services"
          headingId="related-services-heading"
          tone="on-ink"
          className="mb-12 md:mb-16"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {relatedServices.map((service) => (
            <Link
              key={service.name}
              href="/services"
              data-reveal-item
              aria-label={`${service.name} — ${service.description}`}
              className="group flex min-h-[160px] flex-col justify-between rounded-sm border border-slate-deep p-6 transition-colors duration-200 ease-out hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <h3 className="font-display text-lg font-normal leading-tight">{service.name}</h3>
              <p className="mt-3 font-sans text-sm text-slate">{service.description}</p>
              <span
                aria-hidden="true"
                className="mt-4 inline-block w-fit font-sans text-sm text-ivory opacity-0 transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:opacity-100"
              >
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function RelatedIndustriesCrossLinks() {
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.05 });

  return (
    <section
      ref={revealRef}
      aria-labelledby="related-industries-heading"
      className="bg-ivory py-16 md:py-32"
    >
      <Container>
        <SectionHeader
          eyebrow="Who We Do This For"
          title="Industries We Serve With This Service"
          headingId="related-industries-heading"
          tone="on-ivory"
          className="mb-12 md:mb-16"
        />
        <ul className="flex snap-x gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
          {relatedIndustries.map((industry) => (
            <li key={industry} data-reveal-item className="shrink-0 snap-start md:shrink">
              <Link
                href="/industries"
                aria-label={`${industry} — an industry we serve with Meta Ads`}
                className="inline-flex items-center rounded-full border border-slate-deep/40 px-5 py-2 font-sans text-sm text-ink transition-colors duration-200 ease-out hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                {industry}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
