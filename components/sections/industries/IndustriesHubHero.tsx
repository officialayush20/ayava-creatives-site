import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Short, index-page framing hero for `/industries` — deliberately NOT the
 * homepage's full-viewport cinematic hero (no HeroCanvasSlot, no stat
 * ticker). Single column, left-aligned, content-driven height per
 * industries-hub-layout-spec.md §1. No CTA row here — the grid below is
 * the primary navigation, the CTA Band closes the page instead.
 */
export function IndustriesHubHero() {
  return (
    <section aria-labelledby="industries-hub-heading" className="flex min-h-[32vh] items-center bg-ink py-16 md:min-h-[40vh] md:py-24">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10 md:mb-12">
          <ol className="flex items-center gap-2 font-sans text-xs text-slate">
            <li>
              <Link
                href="/"
                className="transition-colors duration-200 ease-out hover:text-ivory underline-offset-4 hover:underline"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ivory">
              Industries
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl md:col-span-8">
          <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
            Industries
          </p>
          <h1
            id="industries-hub-heading"
            className="font-display text-[clamp(28px,8vw,56px)] font-normal leading-[1.05] text-ivory"
          >
            We don&apos;t run one playbook across ten verticals.
          </h1>
          <p className="mt-6 max-w-[60ch] font-sans text-base text-slate md:text-lg">
            Every industry buys differently, trusts differently, and converts on a different
            timeline. We build the specific strategy your vertical actually runs on — not a
            generic template with your logo swapped in.
          </p>
        </div>
      </Container>
    </section>
  );
}
