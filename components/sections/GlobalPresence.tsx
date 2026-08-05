"use client";

import { Container } from "@/components/ui/Container";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { GlobalPresenceMap } from "@/components/sections/GlobalPresenceMap";

export function GlobalPresence() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="global-presence-heading" className="bg-surface py-16 md:py-40">
      <Container>
        <h2
          id="global-presence-heading"
          data-reveal-item
          className="max-w-2xl font-display text-[clamp(28px,4vw,44px)] font-normal leading-[1.05]"
        >
          Based in Dehradun. Built for anywhere.
        </h2>
        <p data-reveal-item className="mt-6 max-w-xl font-sans text-sm text-hairline-strong">
          Ayava Creatives operates from Dehradun, India, serving clients across a growing set of
          regions with the same operating system: audit, architect, build, measure, scale.
        </p>

        <div className="mt-16" data-reveal-item>
          <GlobalPresenceMap />
        </div>

        <div className="mt-12" data-reveal-item>
          <h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-hairline-strong">
            Locations
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
            <li className="font-sans text-sm text-content">Dehradun, India &mdash; Headquarters</li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
