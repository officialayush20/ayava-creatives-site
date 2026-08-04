import { RichContentRenderer } from "@/components/ui/RichContentRenderer";
import type { LegalSectionData } from "@/lib/legal-data";

type LegalSectionProps = {
  section: LegalSectionData;
};

/**
 * Repeating H2 (+ optional H3 subsections) + prose body block. Reuses
 * RichContentRenderer's block-type switch rather than a parallel renderer.
 * The H2's own top-margin *is* the section gap — no extra wrapper margin.
 * legal-page-layout-spec.md §1.4.
 */
export function LegalSection({ section }: LegalSectionProps) {
  return (
    <div className="mx-auto max-w-[72ch]">
      <h2
        id={section.id}
        className="scroll-mt-24 font-display text-2xl font-normal leading-[1.15] text-ink first:mt-0 md:text-3xl"
      >
        {section.heading}
      </h2>
      {section.body ? (
        <div className="mt-6">
          <RichContentRenderer blocks={section.body} />
        </div>
      ) : null}
      {section.subsections?.map((subsection) => (
        <div key={subsection.heading} className="mt-10">
          <h3 className="font-sans text-lg font-bold leading-[1.2] text-ink">
            {subsection.heading}
          </h3>
          <div className="mt-4">
            <RichContentRenderer blocks={subsection.body} />
          </div>
        </div>
      ))}
    </div>
  );
}
