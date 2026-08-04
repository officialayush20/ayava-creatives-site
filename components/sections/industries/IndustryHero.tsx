import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";

type IndustryHeroProps = {
  industryName: string;
  headline: string;
  subhead: string;
};

/**
 * Structurally identical to `ServiceHero` (per industry-page-layout-spec §1's
 * explicit "same component, generic prop interface" option) but kept as its
 * own component under `components/sections/industries/` since content model
 * (industry vs. service breadcrumb/CTA copy) differs and the two page
 * families are unlikely to want coupled changes.
 */
export function IndustryHero({ industryName, headline, subhead }: IndustryHeroProps) {
  return (
    <section aria-labelledby="industry-hero-heading" className="bg-ink pt-8 pb-16 md:pt-12 md:pb-24">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10 md:mb-12">
          <ol className="flex flex-wrap items-center gap-2 font-sans text-xs text-slate">
            <li>
              <Link href="/" className="hover:text-ivory underline-offset-4 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/industries" className="hover:text-ivory underline-offset-4 hover:underline">
                Industries
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ivory">
              {industryName}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
              Industry
            </p>
            <h1
              id="industry-hero-heading"
              className="font-display text-[length:var(--type-display-hero)] font-normal leading-[1.05]"
            >
              {headline}
            </h1>
            <p className="mt-6 max-w-[42ch] font-sans text-base text-slate md:text-lg">{subhead}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" variant="primary" tone="on-ink" size="large">
                Talk to Us About {industryName}
              </Button>
              <Button href="#relevant-services" variant="secondary" tone="on-ink" size="large">
                See Relevant Services
              </Button>
            </div>
          </div>

          <div className="md:col-span-5">
            <MediaFrame alt={`${industryName} — representative visual`} aspect="4/5" />
          </div>
        </div>
      </Container>
    </section>
  );
}
