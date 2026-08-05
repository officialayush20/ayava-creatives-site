"use client";

import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { useScrollReveal } from "@/lib/useScrollReveal";

const ADDRESS = "Ayava Creatives, ISBT, Haridwar Road, Kargi Chowk, Dehradun, India";
const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

/**
 * No real HQ photo exists yet — per the "no fabricated stock office photo"
 * guidance in contact-page-layout-spec §4, this ships text-only + a Get
 * Directions link rather than a generic stand-in image. STUB flag: swap in
 * a real photo once sourced.
 */
export function OfficeCard() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="office-heading" className="bg-inverse-surface pb-16 pt-6 md:pb-40 md:pt-6">
      <Container>
        <div data-reveal-item className="border-t border-hairline/30 pt-12 md:pt-16">
          <div className="mx-auto max-w-xl text-center">
            <h2 id="office-heading" className="font-display text-2xl font-normal text-inverse-content">
              Visit the Studio
            </h2>
            <p className="mt-4 font-sans text-base text-inverse-content/70">
              Ayava Creatives
              <br />
              ISBT, Haridwar Road, Kargi Chowk
              <br />
              Dehradun, India
            </p>
            <p className="mt-4 font-sans text-sm text-inverse-content/60">
              Based in Dehradun. Working with clients wherever they are.
            </p>
            <div className="mt-6">
              <ArrowLink href={MAPS_HREF} tone="on-ivory" className="mx-auto w-fit">
                Get Directions
              </ArrowLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
