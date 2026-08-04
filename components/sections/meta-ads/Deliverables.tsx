"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal } from "@/lib/useScrollReveal";

const deliverables = [
  "Meta Pixel & Conversions API setup and verification",
  "Full account audit (for existing accounts) before strategy begins",
  "Audience research and segmentation (core, lookalike, interest, retargeting)",
  "Creative brief development per audience segment",
  "Ad creative testing plan (static, carousel, video, Reels placements)",
  "Campaign structure built for clean signal reading (no audience overlap)",
  "Budget allocation and bid-strategy management",
  "Retargeting funnel design across warm-audience stages",
  "Ongoing creative refresh to prevent ad fatigue",
  "Performance reporting tied to the agreed conversion event",
  "Standing review cadence with your team",
  "Recommendations for creative and landing-page improvements based on live performance data",
];

const tools = ["Meta Business Suite", "Meta Ads Manager", "Google Analytics", "Canva", "Adobe Premiere Pro"];

/**
 * §4 Deliverables + §5 Tools, composed as one tightly-coupled sub-section
 * per the spec's template-level rhythm note (hairline divider, no full
 * section-break padding between them).
 */
export function Deliverables() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="deliverables-heading" className="bg-ivory py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="What's included"
          title="Deliverables."
          headingId="deliverables-heading"
          tone="on-ivory"
          className="mb-12 md:mb-16"
        />
        <ul data-reveal-item className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
          {deliverables.map((item) => (
            <li key={item} className="border-t border-slate-deep/30 py-4">
              <span className="font-sans text-sm text-ink/80 md:text-base">{item}</span>
            </li>
          ))}
        </ul>

        <div data-reveal-item className="mt-16 border-t border-slate-deep/40 pt-10 md:mt-20 md:pt-12">
          <p className="mb-6 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate-deep">
            Tools &amp; Platforms
          </p>
          <ul
            aria-label="Tools and platforms used: Meta Business Suite, Meta Ads Manager, Google Analytics, Canva, Adobe Premiere Pro."
            className="flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            {tools.map((tool) => (
              <li key={tool} className="font-sans text-sm font-medium tracking-wide text-ink/70">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
