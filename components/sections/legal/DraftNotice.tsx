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
    <div className="border-y border-bronze bg-ink py-6">
      <Container>
        <p className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-ivory">
          Draft &mdash; Pending Legal Review
        </p>
        <p className="mt-2 max-w-[70ch] font-sans text-sm text-slate">
          This page is placeholder content for structural/design purposes only. It has not been
          reviewed by counsel and must not be treated as Ayava Creatives&apos; actual
          privacy/terms policy until replaced with reviewed copy.
        </p>
      </Container>
    </div>
  );
}
