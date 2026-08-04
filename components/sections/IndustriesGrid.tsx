import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const industries = [
  { name: "Real Estate", caption: "Sell the property before the site visit." },
  { name: "D2C / E-commerce", caption: "Turn one-time buyers into repeat revenue." },
  { name: "Healthcare", caption: "Build trust before the first appointment is booked." },
  { name: "Hospitality & Travel", caption: "Convert browsing into bookings, not just wishlists." },
  { name: "FinTech", caption: "Explain complex products in language regulators and users both accept." },
  { name: "Fashion & Luxury", caption: "Protect brand equity while still performance-marketing." },
  { name: "EdTech", caption: "Turn curiosity into enrollment, and enrollment into completion." },
  { name: "SaaS / Tech", caption: "Sell to operators who research before they ever talk to sales." },
  { name: "Automotive", caption: "Move buyers from research tab to showroom floor." },
  { name: "F&B / QSR", caption: "Fill tables and app orders on the same week's budget." },
];

function IndustryTile({ name, caption }: { name: string; caption: string }) {
  return (
    <a
      href="/industries"
      aria-label={`${name} — ${caption}`}
      className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-sm border border-slate-deep bg-ink-raise p-4 transition-colors duration-200 ease-out hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(160deg,var(--color-ink-raise)_0%,var(--color-slate-deep)_100%)] opacity-70 transition-transform duration-300 ease-out group-hover:scale-105"
      />
      <div className="relative">
        <h3 className="font-sans text-sm font-medium text-ivory md:text-base">{name}</h3>
        <p className="mt-1 font-sans text-xs text-slate opacity-100 md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
          {caption}
        </p>
      </div>
    </a>
  );
}

export function IndustriesGrid() {
  return (
    <section aria-labelledby="industries-heading" className="bg-ivory py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="Where we work"
          title="Industries we dominate."
          headingId="industries-heading"
          tone="on-ivory"
          className="mb-12 md:mb-16"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
          {industries.map((industry) => (
            <IndustryTile key={industry.name} {...industry} />
          ))}
        </div>
      </Container>
    </section>
  );
}
