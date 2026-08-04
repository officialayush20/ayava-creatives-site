# Meta Ads + Contact — Creative Review

**Overall verdict: CONTACT PASSES WITH REVISIONS. META ADS FAILS AND NEEDS A FIX PASS.**

The homepage lessons were half-learned. The gold-numeral ruling was applied where it was explicitly named (`OurApproach`) and ignored where the same logic obviously applies (`IntakeForm` step counter). Rust discipline is clean — genuinely the best-executed new token on the site. But Meta Ads contains the most template-looking element built so far (the Pricing card wall), an off-palette raw `bg-white`, and an adjacent-ivory collision that is the exact defect I blocked on the homepage. Contact is the stronger page, and its main problem is a step count that argues against its own premise.

## 1. Gold audit

**OurApproach — VERIFIED PASS.** `components\sections\meta-ads\OurApproach.tsx:52` renders `font-display text-3xl text-slate`. The build report is truthful; the correction was actually carried, and the comment at `:30-35` states the reasoning correctly. That's the standard — the rule was internalized, not just complied with.

**IntakeForm — VIOLATION.** `components\sections\contact\IntakeForm.tsx:132`:

```tsx
Step <span className="text-gold">{current}</span> of {TOTAL_STEPS} — {name}
```

Precisely the failure ruled on for `ServicesShowcase`/`AyavaMethod`/`WhyAyava`, transposed into a new file. A step counter is a position indicator, not evidence. Required: remove the `<span>`; plain `text-ivory`.

**Pricing — VIOLATION, worst element on either page.** `components\sections\meta-ads\Pricing.tsx:73`:

```tsx
? "border-gold bg-white md:-translate-y-4"
```

`bg-white` is not a brand token — pure `#FFFFFF` against `#F8F1E2` reads as a cold blue-white hole punched in a warm ivory field. `border-gold` on a full card perimeter is not a hairline and not a numeric value — the largest single gold surface on the site, on a section with no numbers at all. `md:-translate-y-4` + a "Most Popular" tag is the SaaS pricing-table cliché — self-refuting on a page whose thesis is "scoped to your account, not a template."

Required: delete the `featured` treatment. All three tiers `border-slate-deep/40`, no fill, no lift, no tag. If a lead tier must be signalled, one `border-t border-gold` hairline on the top edge only.

**Approved as-is:** every `hover:border-gold`/`focus-visible:ring-gold` across `CrossLinks.tsx`, `LeadCapture.tsx`, `FormField.tsx`, `AltContactPaths.tsx`, `ContactHero.tsx`, `IntakeForm.tsx` — transient, 1px, state-only, tone-correct `ring-offset-*` throughout.

## 2. Rust / rust-raise audit — PASS, no exceptions

No fills, no bold, no uppercase, nothing above 12px against a 14px ceiling, no shake/flash/pulse, no rust on any submit button. Clean sweep.

**Viridian adjacency** — passes on a technicality: rust and viridian never co-render only because the success view replaces the form. Comment that the mutual exclusivity is load-bearing. Also: `IntakeForm.tsx:318` uses a 56px tinted disc for the success check — a fill. Tighten to `border border-[color:var(--color-viridian)]/40` with a full-viridian stroke icon, no tint.

## 3. Case-study empty state — CONCEPT APPROVED, EXECUTION REJECTED

`CaseStudySpotlight.tsx`. Refusing to fabricate is correct and a brand asset. Fails on visual (a small centered bordered box in a py-40 section reads as a broken CMS query / apology, not confidence) and copy ("Our *first* documented Meta Ads case study" tells an enterprise buyer this agency has never documented a Meta Ads result).

Required:
1. Drop the card — full `Container` width, left-aligned, same `SectionHeader` treatment as everything else.
2. Replace copy with something like: "A documented Meta Ads case study is in the field now. We'd rather publish confirmed numbers than dress up a project that hasn't been measured — so here's what we'll report when it lands: cost per qualified lead before and after, creative win rate by audience segment, and spend efficiency across the retargeting funnel."
3. Render those three metrics as a 3-up hairline-ruled row, text-slate labels, em-dash where the figure will go.
4. CTA label → "Talk Through Your Account".

## 4. Contact form — 5 STEPS IS WRONG. TRIM TO 3.

Density inversion: step 2 is 6 buttons + optional textarea; step 3 is one question, an entire screen; step 4 is 16 buttons; step 5 is textarea + dropzone + review. Merge steps 2 and 3, fold Review into the final screen:

1. **About Your Business** (unchanged)
2. **Goals & Budget** — goal grid and budget list stacked together
3. **Scope & Brief** — services grid, then notes + upload, then the review `dl`

`TOTAL_STEPS = 3`; remap `jumpToStep` targets; merge `validateStep` for goal+budget surfacing both errors together.

Also: `IntakeForm.tsx:304` re-inlines Container's gutter classes by hand instead of using `<Container>`; standardize card padding to `p-6 md:p-12` (matches `LeadCapture`).

## 5. Composition rhythm

**Meta Ads** — `Pricing` immediately followed by `FAQ`, both ivory, no rule between (the exact defect blocked on the homepage's ResultsStrip/FeaturedCaseStudies). Required: `FAQ.tsx` → `bg-ink`, `tone="on-ink"`.

Grid monotony: four grids in seven sections (OurApproach 4-col, Deliverables 2-col, Pricing 3-col, CrossLinks 4-col) vs. only two asymmetric 12-col uses (ServiceHero 7/5, ProblemWeSolve 4/8) — and those two are the best-composed sections. Convert `OurApproach` to stacked full-width rows on a 3/9 split instead of a 4-col grid.

Cadence flat: `py-16 md:py-40` on six of seven sections. `ProblemWeSolve` → `md:py-28`, `Pricing` → `md:py-48`.

**Contact — PASS**, better composed than Meta Ads. The `AltContactPaths` → `OfficeCard` adjacency (pt-6 + border-t as a coda, not a new section) is exactly the intentional rhythm break asked for. Keep `ResponseTimeBand`'s cadence variation as-is.

## 6. Typography and spacing consistency

Six different display-type clamp values have accumulated across two pages with no shared source. Consolidate to three tokens: `--type-display-hero`, `--type-display-section`, `--type-display-card`.

`Pricing.tsx` is the only `align="center"` SectionHeader on the site and its heading/paragraph alignment disagree at `md` breakpoint — use `align="left"` instead. Same defect in `CaseStudySpotlight` (moot once §3 applied).

`ProblemWeSolve` bypasses SectionHeader with a bare `<h2>` and no eyebrow — add one ("The Problem") with a stronger headline.

`Deliverables` checklist icons are the most generic block on the page — replace with hairline-ruled rows matching OurApproach's rail treatment.

`ServiceHero`'s "Image pending" placeholder sits in the most important viewport on the page — until a real asset exists, consider running the hero as a confident 7-col with generous whitespace rather than a visibly empty 5-col frame.

## Required-change checklist

**Blockers**
1. `Pricing.tsx` — delete `featured` treatment (no bg-white, no border-gold perimeter, no translate, no "Most Popular" tag).
2. `IntakeForm.tsx:132` — remove `text-gold` from step numeral.
3. `FAQ.tsx` (Meta Ads) — `bg-ivory` → `bg-ink`, `tone="on-ink"`.
4. `IntakeForm.tsx` — 5 steps → 3; merge Goals+Budget; fold Review into final step.
5. `CaseStudySpotlight.tsx` — drop card wrapper, full width, rewritten copy, 3-up metric row.

**Before the animation pass**
6. `OurApproach.tsx` — 4-col grid → stacked 3/9 rows.
7. `Deliverables.tsx` — drop check icons, hairline rows.
8. Type-scale tokens in globals.css; retire ad-hoc clamps.
9. `Pricing.tsx` — `align="left"`.
10. `IntakeForm.tsx` — use `<Container>`; normalize padding to `p-6 md:p-12`.
11. `IntakeForm.tsx:318` — viridian tint disc → hairline ring; comment the rust/viridian exclusivity.
12. `ProblemWeSolve.tsx` — add eyebrow.
13. Cadence: `ProblemWeSolve` `md:py-28`, `Pricing` `md:py-48`.

**Flag for separate site-wide verification**
14. `components\ui\SectionHeader.tsx` sets no explicit color on the `<h2>`, so it inherits `--color-ivory` from body — on every `tone="on-ivory"` section the heading should theoretically render ivory-on-ivory. If that's not actually happening on screen, the mechanism needs to be made explicit; if it is happening, it's a critical bug affecting the homepage and both new pages. Add explicit `tone === "on-ivory" ? "text-ink" : "text-ivory"`.
