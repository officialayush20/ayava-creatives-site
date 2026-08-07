import { Container } from "@/components/ui/Container";

/**
 * Persistent, non-dismissible "pending legal review" banner. Renders
 * whenever draftStatus is "draft" — a single conditional so removing it
 * once real content lands is a one-line flip, not a rebuild.
 * legal-page-layout-spec.md §0. Exact copy per docs/legal-pages-copy.md §0
 * — must not be softened/shortened without legal sign-off.
 */
export function DraftNotice() {
  return (
    <div className="border-y border-bronze bg-surface py-6">
      <Container>
        <p className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-content">
          Draft &mdash; Pending Legal Review
        </p>
        <p className="mt-2 max-w-[70ch] font-sans text-sm text-hairline-strong">
          This is a substantive draft, written to reflect this site&apos;s actual data
          practices and service terms &mdash; it is not generic filler. It has not been
          reviewed by a licensed advocate, however, and must not be relied upon as
          Ayava Creatives&apos; final, legally binding policy until that review is complete.
        </p>
      </Container>
    </div>
  );
}
