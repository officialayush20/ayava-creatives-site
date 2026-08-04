import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";

/**
 * Shorter, wayfinding-first hero for service subpages (not the homepage's
 * full-viewport cinematic hero) per service-page-layout-spec §1. Static
 * MediaFrame slot deliberately — no WebGL canvas here, this hero repeats
 * across 15 service pages so it must stay lightweight for performance.
 */
export function ServiceHero() {
  return (
    <section aria-labelledby="service-hero-heading" className="bg-ink pt-8 pb-16 md:pt-12 md:pb-24">
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
              <Link href="/services" className="hover:text-ivory underline-offset-4 hover:underline">
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ivory">
              Meta Ads
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
              Service
            </p>
            <h1 className="font-display text-[length:var(--type-display-hero)] font-normal leading-[1.05]">
              Paid Media That Pays for Itself
            </h1>
            <p className="mt-6 max-w-[42ch] font-sans text-base text-slate md:text-lg">
              We run Meta Ads as a revenue system, not a boost-button habit — every audience,
              creative, and rupee of spend tied back to a measurable outcome, not a vanity
              impression count.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" variant="primary" tone="on-ink" size="large">
                Get a Quote
              </Button>
              <Button href="#case-study" variant="secondary" tone="on-ink" size="large">
                See Case Study
              </Button>
            </div>
          </div>

          <div className="md:col-span-5">
            <MediaFrame alt="Meta Ads campaign dashboard and creative review" aspect="4/5" />
          </div>
        </div>
      </Container>
    </section>
  );
}
