"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NarrativeColumn } from "@/components/ui/NarrativeColumn";
import { useScrollReveal } from "@/lib/useScrollReveal";

/**
 * "Why Ayava (Eventually)" (careers-page-layout-spec.md §2) — brief,
 * conversational culture note in the founder's voice, not a bullet/value
 * card grid. Shorter section padding than the standard rhythm per spec.
 */
export function WhyAyavaEventually() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="why-eventually-heading" className="bg-ink py-16 md:py-24">
      <Container>
        <SectionHeader
          eyebrow="Why People Might Want to Work Here"
          title="What it's like at Ayava, even at this size."
          headingId="why-eventually-heading"
          tone="on-ink"
          className="mb-10 md:mb-12"
        />
        <div data-reveal-item>
        <NarrativeColumn tone="on-ink">
          <p>
            Right now, Ayava is me — which means whoever joins next won&apos;t be the fifth hire in
            a department, they&apos;ll be working directly alongside the person who scopes, builds,
            and runs every account. No management layers to route through, no bureaucracy sized
            for a company that doesn&apos;t exist yet.
          </p>
          <p>
            The work itself spans further than most agencies at this stage: real estate,
            e-commerce, EdTech, B2B SaaS, and more — the same range covered on the{" "}
            <a
              href="/about"
              className="text-ivory underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              About
            </a>{" "}
            page. Whoever comes on board will touch work with actual production and revenue
            stakes attached, not internal practice projects.
          </p>
          <p>
            If that sounds like the kind of place you&apos;d want to build something early,
            I&apos;d rather have your details on file now than post a generic job listing later
            and start from a cold list.
          </p>
        </NarrativeColumn>
        </div>
      </Container>
    </section>
  );
}
