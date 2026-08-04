import { Container } from "@/components/ui/Container";

/**
 * Thin hero wrapper for the Insights hub — reuses SectionHeader's primitives
 * (eyebrow + display heading) rather than the full component, since this
 * hero also needs a supporting line SectionHeader doesn't have a slot for.
 * insights-page-layout-spec.md §1.1.
 */
export function InsightsHero() {
  return (
    <section aria-labelledby="insights-hero-heading" className="bg-ink py-16 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
            Field Notes
          </p>
          <h1
            id="insights-hero-heading"
            className="font-display text-[length:var(--type-display-hero)] font-normal leading-[1.05] text-ivory"
          >
            Field Notes, Not Filler
          </h1>
          <p className="mt-6 max-w-[50ch] font-sans text-base text-slate md:text-lg">
            A working library, not a content calendar. Some pieces are live. Others are announced
            ahead of publication. All of it comes out of work we&apos;ve actually shipped for
            clients — not generic marketing-blog filler.
          </p>
        </div>
      </Container>
    </section>
  );
}
