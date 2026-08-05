"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal } from "@/lib/useScrollReveal";
import type { NarrativeThemeData } from "@/lib/industry-page-content";

type NarrativeThemeProps = NarrativeThemeData & {
  /** Omit the top hairline on the first row so it doesn't double up against
   * the header's own bottom rule. */
  isFirst?: boolean;
};

/** Title + body + hairline divider row — reusable across all 10 industry pages. */
export function NarrativeTheme({ title, body, isFirst = false }: NarrativeThemeProps) {
  return (
    <div data-reveal-item className={`${isFirst ? "" : "border-t border-hairline/40"} py-6 first:pt-0 md:py-8`}>
      <h3 className="font-display text-xl font-normal leading-tight text-inverse-content md:text-2xl">{title}</h3>
      <p className="mt-3 max-w-[65ch] font-sans text-sm leading-relaxed text-hairline md:text-base">{body}</p>
    </div>
  );
}

type IndustryNarrativeProps = {
  industryName: string;
  themes: [NarrativeThemeData, NarrativeThemeData, NarrativeThemeData];
};

/**
 * "How We Think About [Industry]" — structural replacement for the
 * service-template's numbered "Our Approach," per industry-page-layout-spec
 * §2. Static by default (not sticky — themes run short enough that sticky
 * adds little, per spec).
 */
export function IndustryNarrative({ industryName, themes }: IndustryNarrativeProps) {
  const revealRef = useScrollReveal<HTMLElement>({ stagger: 0.08 });

  return (
    <section
      ref={revealRef}
      aria-labelledby="industry-narrative-heading"
      className="bg-inverse-surface py-16 md:py-40"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeader
              eyebrow="Our Point of View"
              title={`How We Think About ${industryName}`}
              headingId="industry-narrative-heading"
              tone="on-ivory"
            />
          </div>
          <div className="md:col-span-8">
            {themes.map((theme, index) => (
              <NarrativeTheme key={theme.title} {...theme} isFirst={index === 0} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
