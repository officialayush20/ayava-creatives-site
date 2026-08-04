import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Lightweight hero for the /services index page. `ServiceHero` (used on
 * `/services/meta-ads`) is a page-specific component living under
 * components/sections/meta-ads/ built for that one service page's
 * asymmetric outcome-hero layout — it isn't a generalized/reusable
 * component yet (per that page's own comment, the template lift is
 * deliberately deferred until a second service page is commissioned).
 * Reshaping it here would be the more invasive path the layout spec
 * explicitly permits skipping; this is the lighter-weight equivalent:
 * ink background, breadcrumb + centered short copy, no visual slot, no CTA.
 */
export function ServicesHubHero() {
  return (
    <section className="bg-ink py-16 md:py-24">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10 md:mb-14">
          <ol className="flex items-center gap-2 font-sans text-sm text-slate">
            <li>
              <Link
                href="/"
                className="transition-colors duration-200 ease-out hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ivory">
              Services
            </li>
          </ol>
        </nav>
        <div className="max-w-3xl md:col-span-8">
          <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
            Services
          </p>
          <h1 className="font-display text-[clamp(28px,8vw,56px)] font-normal leading-[1.05] text-ivory">
            Fifteen services. Pick your starting point.
          </h1>
          <p className="mt-4 max-w-xl font-sans text-base text-slate md:text-lg">
            Grouped by what you&apos;re trying to fix first.
          </p>
        </div>
      </Container>
    </section>
  );
}
