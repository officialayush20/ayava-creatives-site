import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/sections/legal/DraftNotice";
import { LegalToc } from "@/components/sections/legal/LegalToc";
import { LegalSection } from "@/components/sections/legal/LegalSection";
import type { LegalDoc } from "@/lib/legal-data";

type LegalPageLayoutProps = {
  doc: LegalDoc;
};

/**
 * Shared template for Privacy Policy / Terms of Service. Gold-free by
 * design (legal-page-layout-spec.md §0 — nothing here has earned a gold
 * accent). No CtaBand — deliberate spec exception (§1.5), the page ends
 * with the last LegalSection then straight into MegaFooter.
 */
export function LegalPageLayout({ doc }: LegalPageLayoutProps) {
  const showToc = doc.sections.length > 5 || doc.sections.length >= 2;

  return (
    <>
      <SiteHeader />
      <main>
        <section aria-labelledby="legal-hero-heading" className="bg-ink py-12 md:py-24">
          <Container>
            <div className="max-w-2xl">
              <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
                Legal
              </p>
              <h1
                id="legal-hero-heading"
                className="font-display text-[length:var(--type-display-hero)] font-normal leading-[1.05] text-ivory"
              >
                {doc.title}
              </h1>
              <p className="mt-4 font-sans text-sm text-slate">
                {doc.draftStatus === "draft"
                  ? "Draft — not yet published"
                  : `Last updated: ${doc.lastUpdated}`}
              </p>
            </div>
          </Container>
        </section>

        <DraftNotice />

        <section aria-label={`${doc.title} content`} className="bg-ivory py-16 md:py-24">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
              {showToc ? (
                <div className="lg:col-span-3">
                  <LegalToc sections={doc.sections} />
                </div>
              ) : null}
              <div className={showToc ? "lg:col-span-9" : "lg:col-span-12"}>
                <div className="flex flex-col gap-16 md:gap-16">
                  {doc.sections.map((section) => (
                    <LegalSection key={section.id} section={section} />
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <MegaFooter />
    </>
  );
}
