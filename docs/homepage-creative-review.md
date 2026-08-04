# Homepage Creative Review — Brand Fidelity Check

**Overall verdict: PASS WITH REQUIRED REVISIONS.** Token discipline is real — no stock photography, no second accent color, no fake logos, no fabricated testimonials, honest placeholders throughout. That puts this above most agency sites. But the single most important rule — *gold = evidence* — has been honored in letter and broken in spirit.

## 1. Gold audit — VIOLATION (spirit, not letter)

Every gold instance is on a border, a focus ring, or numeric text. Intent is broken, though. Current gold numerals:

- `components\sections\ServicesShowcase.tsx:41` — 15 ordinals `01`–`15` at `text-2xl`
- `components\sections\AyavaMethod.tsx:32,44` — 5 ordinals
- `components\sections\WhyAyava.tsx:45` — 4 ordinals
- `components\ui\StatCounter.tsx:60` (Hero only) — 3 **actual metrics**

**24 decorative ordinals vs 3 real metrics.** The rule was never "gold marks digits," it was "gold marks proof." When an enumerated bullet gets the same treatment as a performance figure, the accent stops signalling *this number is the argument* and starts signalling *this is a numbered list* — the exact agency-default texture the constraint exists to prevent. It also blows the ~4% budget: 15 gold numerals across a card wall is confetti.

Required: `ServicesShowcase.tsx:41` gold → `text-slate` and drop to `text-sm tracking-[0.1em]` (fifteen big serif numerals compete with the service names, which are the content). `AyavaMethod.tsx:32,44` and `WhyAyava.tsx:45` gold → `text-slate`. In AyavaMethod, spend the gold instead on promoting the existing `border-t border-slate-deep` rail to `border-gold/40` on the first step only — one hairline, not five numerals. After this, gold numerals exist only where `StatCounter` renders them.

Approved as-is: all `hover:border-gold` / `focus-visible:border-gold` (`Button.tsx:56,58`, `ServicesShowcase.tsx:37`, `IndustriesGrid.tsx:22`, `NewsletterForm.tsx:45,61`) — transient, 1px, state-only. Gold as *response to intent* rather than decoration is the strongest thing in the build. All `focus-visible:ring-gold` approved; the tone-aware `ring-offset-*` in `ArrowLink.tsx:18` and `IndustriesGrid.tsx:22` is exactly right.

Two adjacent problems: `Button.tsx:56` `hover:bg-ivory/90` — fading a fill on hover is a bootstrap reflex and reads disabled-adjacent; the gold hairline is already the signal, so remove it and keep the fill constant. `ServicesShowcase.tsx:48` — a persistent `→` on all 15 cards is clutter; make it `opacity-0 group-hover:opacity-100` on the same 200ms as the border.

## 2. Viridian — FORGOTTEN. Deploy exactly once.

Zero occurrences codebase-wide. Optional, so not a violation — but zero forfeits the one thing stopping this palette from reading as generic dark/gold, the most copied luxury shorthand on the internet.

Ruling: one use, and it goes to the map marker. `components\sections\GlobalPresence.tsx:15` — `border-gold bg-ivory` → `border-viridian/60 bg-viridian`. A location pin is a data point, which is precisely the viridian brief; it reads as instrumentation, not ornament, and gives the page one moment no template has. Keep viridian off every other homepage section; reserve the rest for case-study charts.

## 3. The primary-button call — override was RIGHT, execution INCOMPLETE

I back the engineer. A gold-fill CTA was the worst option available: it blows the viewport budget in one element and, decisively, collapses the system — if gold is a button fill it can no longer mean *proof* on a number. The spec line loses, the token rule stands. Ivory-fill on ink is correct: max contrast, zero accent spend, gold hairline arrives as hover reward. Not ink-fill-with-gold-text either — gold text at button scale is gold-as-fill by another name and fails contrast at these weights.

But `Button.tsx:55-58` hardcodes `bg-ivory text-ink` and `focus-visible:ring-offset-ink` with no tone awareness. A primary button on any `bg-ivory` section renders ivory-on-ivory, invisible, with a broken focus ring. It only doesn't bite today because `Hero.tsx:49` and `CtaBand.tsx:18` are both on ink — and it bites immediately once CtaBand inverts per §4. Add `tone?: "on-ink" | "on-ivory"`; `on-ivory` primary = `bg-ink text-ivory hover:shadow-[0_0_0_1px_var(--color-gold)]`, secondary = `border-slate-deep text-ink hover:border-gold`, `ring-offset-ivory` throughout. `ArrowLink` and `Tag` already do this correctly — `Button` is the odd one out.

## 4. Composition rhythm — weakest area

Sequence: `ink · ivory · ink · ivory · ivory · ink · ivory · ink · ivory · ink · ink · ink`

**4A. BLOCKER — the evidence section is in the wrong colorway.** `ResultsStrip.tsx:17` is `bg-ivory` with `text-ink` numerals (`:29`). The one section that exists purely to make numbers persuade is the one section with no gold — while 15 service ordinals get gold two sections away. The brand argument is running backwards. Change to `bg-ink` and render the four figures through `StatCounter tone="on-ink"` so they come up gold. This also fixes the adjacent-ivory collision (ResultsStrip + FeaturedCaseStudies currently merge into one undifferentiated light zone with no rule between them). Keep the honest disclaimer at `:22-25` — it's a credibility asset — just move it to `text-slate`.

**4B. REQUIRED — invert the CTA band.** The tail is three consecutive ink sections (GlobalPresence, CtaBand, MegaFooter), ~1.5 screens of unbroken black, and `CtaBand.tsx:8` opens with `border-t border-slate-deep`, making the closing CTA read as a footer preamble rather than the page's climax. Make it `bg-ivory`, drop the `border-t`, let the primary button go ink-fill via the new tone prop. A full-bleed ivory slab after a long dark run is the strongest structural move available and costs zero accent budget.

**4C. Cadence (not blockers).** Nearly every section is `py-16 md:py-40` + left-aligned `SectionHeader` + card grid; three grids in five sections. The 12-col grid is barely used asymmetrically — only `ServicesShowcase.tsx:38`'s `md:col-span-6` and `WhyAyava.tsx:28,36`'s 4/8. `FeaturedCaseStudies`' alternating 7/5 is the model. Vary rhythm deliberately: tighter near hero (`md:py-28`), more generous on the ivory anchors (`md:py-48`); let one section run full-bleed.

**4D. Real bug.** `CtaBand.tsx:10` passes `md:px-[16.66%]` into `Container`, colliding with its own `md:px-8 lg:px-10 xl:px-16 2xl:px-20` (`Container.tsx:17`). Two `px-*` utilities at the same breakpoint — winner depends on CSS source order, not intent. Use default `Container` with an inner `mx-auto max-w-3xl`.

**Does it read as Ayava?** With 1, 2, 4A and 4B applied — yes. As currently built — no. Gold impressions are dominated by numbered lists, the visual signature of every services-grid template online.

## 5. Typography — serviceable for layout, NOT for what this brand rests on

Structure, hierarchy, measure (`max-w-[44ch]` at `Hero.tsx:36,43` — correct) and clamp scales are all judgeable today.

But: **Georgia sets old-style (non-lining) figures by default.** Every gold numeral on this page is currently rendering with hanging digits dropping below the baseline at unequal heights. GT Sectra Display and Canela both set lining figures with high stroke contrast. The single most brand-critical element in the system — the numeral as evidence — cannot be assessed right now and looks materially worse than it will. Do not let anyone judge the stat treatment on current screenshots.

Also, `system-ui` on Windows resolves to Segoe UI: humanist, round-terminaled, considerably warmer than Söhne or Neue Haas. The UI currently reads friendlier and softer than specified.

Ruling: swap the interim fallbacks now, pre-licensing. `Instrument Serif` is already one of the three named display candidates and is free — load it via `next/font/google` with `Inter` as the sans proxy, inserted ahead of Georgia/system-ui in `--font-display` / `--font-sans` (`app\globals.css:47,52`). Keep the licensed names first so the purchase is a no-op.

## Required-change checklist

Blockers (1–6): 1) `ServicesShowcase.tsx:41` gold ordinals → slate, `text-sm`. 2) `AyavaMethod.tsx:32,44` gold → slate. 3) `WhyAyava.tsx:45` gold → slate. 4) `ResultsStrip.tsx:17,29` → `bg-ink` + gold `StatCounter`. 5) `CtaBand.tsx:8,10` → `bg-ivory`, drop `border-t`, fix `px` collision. 6) `Button.tsx:54-58` add `tone` prop, remove `hover:bg-ivory/90`.

Before the animation pass (7–9): 7) `GlobalPresence.tsx:15` marker → viridian. 8) `ServicesShowcase.tsx:48` arrow reveals on hover. 9) `app\globals.css:47,52` interim font swap.
