"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal } from "@/lib/useScrollReveal";

const services = [
  { name: "Social Media Marketing (SMM)", description: "Turn scrolling into a scheduled habit around your brand." },
  { name: "Meta Ads", description: "Every rupee of ad spend traced back to a rupee of revenue." },
  { name: "Google Ads", description: "Capture demand at the exact second someone searches for you." },
  { name: "SEO", description: "Rank where buyers look first, not where algorithms feel generous." },
  { name: "Website Design", description: "A site engineered to convert visitors on the first scroll, not the fifth." },
  { name: "Branding", description: "A visual and verbal identity competitors can't casually copy." },
  { name: "Content Marketing", description: "Content built to compound in search and shareability, not just publish and disappear." },
  { name: "Influencer Marketing", description: "Borrowed trust, deployed with the same rigor as paid media." },
  { name: "Email/CRM Marketing", description: "The channel you own, engineered to outperform the channels you rent." },
  { name: "App Store Marketing/ASO", description: "Ranked higher, installed more, uninstalled less." },
  { name: "Video & Motion Production", description: "Motion that earns the first three seconds and keeps them." },
  { name: "PR/Reputation Management", description: "Control the narrative before the internet writes it for you." },
  { name: "E-commerce Growth", description: "Every step of the funnel audited until checkout stops leaking revenue." },
  { name: "Analytics/CRO", description: "Decisions made on data, not on whoever pitched loudest in the meeting." },
  { name: "AI Marketing", description: "Automation that scales judgment, not just tasks." },
];

function ServiceCard({
  number,
  name,
  description,
  featured = false,
}: {
  number: string;
  name: string;
  description: string;
  featured?: boolean;
}) {
  return (
    <a
      href="/services"
      aria-label={`${name} — ${description}`}
      data-reveal-item
      className={`group flex min-h-[160px] flex-col justify-between rounded-sm border border-slate-deep p-6 transition-colors duration-200 ease-out hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.98] md:min-h-[280px] md:p-8 ${
        featured ? "md:col-span-6" : "md:col-span-3"
      }`}
    >
      <span className="font-sans text-sm tracking-[0.1em] text-slate">{number}</span>
      <div>
        <h3 className="font-display text-xl font-normal leading-tight md:text-2xl">{name}</h3>
        <p className="mt-3 font-sans text-sm text-slate">{description}</p>
      </div>
      <span
        aria-hidden="true"
        className="mt-4 inline-block w-fit font-sans text-sm text-ivory opacity-0 transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:opacity-100"
      >
        &rarr;
      </span>
    </a>
  );
}

export function ServicesShowcase() {
  const [first, ...rest] = services;
  // 15 cards is a lot of simultaneous stagger; keep the per-item delay tight
  // so the whole grid finishes revealing quickly rather than trailing off.
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.05 });

  return (
    <section ref={revealRef} aria-labelledby="services-heading" className="bg-ink py-16 md:py-40">
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
            number={String(1).padStart(2, "0")}
            name={first.name}
            description={first.description}
            featured
          />
          {rest.map((service, index) => (
            <ServiceCard
              key={service.name}
              number={String(index + 2).padStart(2, "0")}
              name={service.name}
              description={service.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
