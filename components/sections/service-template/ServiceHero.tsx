import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";

type ServiceHeroProps = {
  serviceName: string;
  headline: string;
  subhead: string;
  heroImageAlt: string;
  /** Content-driven per service — state-B (empty-state) pages must not
   * claim "See Case Study" when the section they jump to admits there
   * isn't one yet. */
  secondaryCtaLabel: string;
};

/**
 * Shorter, wayfinding-first hero for service subpages (not the homepage's
 * full-viewport cinematic hero) per service-page-layout-spec §1. Static
 * MediaFrame slot deliberately — no WebGL canvas here, this hero repeats
 * across all service pages so it must stay lightweight for performance.
 *
 * Promoted from `components/sections/meta-ads/ServiceHero.tsx` into the
 * shared service-template directory now that a second real service page
 * exists — parameterized by content rather than hardcoded per service.
 */
export function ServiceHero({ serviceName, headline, subhead, heroImageAlt, secondaryCtaLabel }: ServiceHeroProps) {
  return (
    <section aria-labelledby="service-hero-heading" className="bg-surface pt-8 pb-16 md:pt-12 md:pb-24">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10 md:mb-12">
          <ol className="flex flex-wrap items-center gap-2 font-sans text-xs text-hairline-strong">
            <li>
              <Link href="/" className="hover:text-content underline-offset-4 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/services" className="hover:text-content underline-offset-4 hover:underline">
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-content">
              {serviceName}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
          {/*
            Dawn Mesh (light theme only — no-op in dark, the custom property
            is unset there): constrained to the text column only, never
            bleeding under the MediaFrame slot. See
            docs/light-theme-application-map.md, service-template mapping.
          */}
          <div
            className="md:col-span-7 bg-[image:var(--gradient-dawn-mesh)] bg-cover"
          >
            <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-content-body">
              Service
            </p>
            <h1 className="font-display text-[length:var(--type-display-hero)] font-normal leading-[1.05]">
              {headline}
            </h1>
            <p className="mt-6 max-w-[42ch] font-sans text-base text-content-body md:text-lg">{subhead}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" variant="primary" tone="on-ink" size="large">
                Get a Quote
              </Button>
              <Button href="#case-study" variant="secondary" tone="on-ink" size="large">
                {secondaryCtaLabel}
              </Button>
            </div>
          </div>

          <div className="md:col-span-5">
            <MediaFrame alt={heroImageAlt} aspect="4/5" />
          </div>
        </div>
      </Container>
    </section>
  );
}
