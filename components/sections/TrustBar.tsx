import { Container } from "@/components/ui/Container";

const platforms = [
  "Google Partner",
  "Meta Business Partner",
  "Shopify",
  "HubSpot",
  "Google Analytics 4",
  "Semrush",
  "Klaviyo",
  "WordPress / Webflow",
];

const portfolioNames = [
  "NextepSolution",
  "Nextep Ventures",
  "Dreamzcraft",
  "FineTaxConsultancy",
  "Woodcraft Store Premium",
  "Wooden Handicraft 3D",
  "Aura Estates",
  "College IQ",
];

/**
 * No real client logos exist yet, so this renders the 8 real portfolio
 * project names as text wordmarks (per spec's explicit instruction), plus
 * the platform/framework list from the copy doc as a secondary strip.
 * A static, non-marquee row is used (no infinite-scroll DOM duplication)
 * since these are honest, finite, real items rather than decorative filler.
 */
export function TrustBar() {
  return (
    <section aria-labelledby="trust-bar-heading" className="bg-ivory py-12 md:py-24">
      <Container>
        <h2
          id="trust-bar-heading"
          className="mb-8 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate-deep"
        >
          Platforms &amp; frameworks we operate on
        </h2>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-4 border-b border-slate-deep/20 pb-10">
          {platforms.map((platform) => (
            <li
              key={platform}
              className="font-sans text-sm font-medium tracking-tight text-ink"
            >
              {platform}
            </li>
          ))}
        </ul>

        <p className="mb-6 mt-10 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate-deep">
          Real portfolio work
        </p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
          {portfolioNames.map((name) => (
            <li
              key={name}
              className="font-display text-lg font-normal text-ink/70 sm:text-xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
