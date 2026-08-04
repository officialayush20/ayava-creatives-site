# Phase 2 Batch — Creative Review

**Overall verdict: CONDITIONAL PASS. About and Pricing pass outright and are the best-composed pages on the site. Work/Case Study and the Industry template FAIL and need a fix pass before animation work.**

The specifically-named lessons were learned. The generalizations were not — again. `EngagementModels` obeys the Meta Ads Pricing ruling perfectly because that ruling named it by file. `WorkGridSection`, `ArticleGrid`, `WorkHero`, `FilterChip`, `NextCaseStudyPreview` and `MetricsEmptyState` each re-commit a defect ruled on in a *different* file. Across four build sessions, rulings are being applied as string-matches, not as system rules.

## 1. Gold audit

**PASS** — all 5 Pricing sections, all 5 About sections, both Legal pages, Careers, Services hub, Industry template body. `components\sections\legal\*` is gold-free apart from `LegalToc.tsx:50`'s focus ring (correct/required).

**VIOLATION 1 — filter counters in gold (2 files).** `components\sections\work\WorkGridSection.tsx:91` and `components\sections\insights\ArticleGrid.tsx:68`:
```tsx
Showing <span className="font-display text-gold">{filtered.length}</span> of {caseStudies.length} projects
```
Byte-for-byte the `IntakeForm` step-counter ruling. A UI state readout is the least persuasive number on the page and it flickers gold on every chip click. Required: drop the span, plain `text-slate-deep`, both files.

**VIOLATION 2 — `components\sections\work\WorkHero.tsx:29-32`.** Gold "8 projects across 8 industries" sitting eight lines under an H1 that already reads "Eight projects, eight industries." A literal restatement of the headline in digits, and it's *inventory*, not outcome — at this scale it advertises smallness. Required: delete the `<p>` entirely.

**VIOLATION 3 — `components\sections\work\FilterChip.tsx:19-22`** (systemic, both hubs):
```tsx
? "border-gold text-ink border-b-2"
: "border-slate-deep text-ink hover:border-gold/60"
```
Header comment claims "never a fill." Wrong test. Filters are multi-select — every chip can be gold-outlined at once, a larger continuous gold surface than the Meta Ads pricing card blocked earlier, in the most recognizable SaaS-filter texture there is. Required: active = `border-slate-deep border-b-2 border-b-gold text-ink font-medium`; remove `hover:border-gold/60`.

**VIOLATION 4 — display-scale gold text on hover.** `components\sections\case-study\NextCaseStudyPreview.tsx:24` puts `group-hover:text-gold` on a `clamp(28px,5vw,52px)` heading with a whole-block hover target, on all 8 case studies — the largest gold surface on the site. Same move at `components\sections\insights\ArticleCard.tsx:39-41`. `components\sections\work\CaseStudyCard.tsx:33` does it correctly with `group-hover:border-gold` on a transparent bottom border. Required: standardize on the CaseStudyCard treatment.

Approved as-is: all `focus-visible:ring-gold` in the batch (tone-correct `ring-offset-*` throughout).

## 2. Pricing page — PASS

`components\sections\pricing\EngagementModels.tsx` — VERIFIED PASS. Single `HairlineRowList`, no grid at any breakpoint, no fill/lift/featured tier/badge — the correct response to a ruling, internalized and made undriftable.

`components\sections\pricing\WhatThisIsnt.tsx` — VERIFIED PASS. Same primitive, matches `WhatShapesAQuote` exactly.

Rhythm PASS: ivory → ink → ivory → ink → ivory → ink → ivory. Zero collisions. The model for the rest of the batch.

## 3. Composition rhythm — a 4th AND a 5th instance of the same-tone collision exist

**3A. BLOCKER — case study template, five consecutive ivory sections (×8 pages).** `app\(marketing)\work\[slug]\page.tsx:50-55` — four `NarrativeStage` sections all `bg-ivory`, then `MetricsEmptyState` also ivory. ~4 screens of unbroken ivory. Required: add a `tone` prop to `NarrativeStage`; alternate ivory (Challenge) → ink (Strategy) → ivory (Execution) → ink (Results); alternate cadence.

`CaseStudyHero` (ink) → `SnapshotBar` (ink) is approved — an intentional hero coda.

**3B. BLOCKER — industry template ivory→ivory (×10 pages).** `app\(marketing)\industries\[slug]\page.tsx:61-67` — `IndustryCaseStudy` (ivory) directly into `IndustryFAQ` (ivory), "fixed" with only a 1px 40%-opacity hairline that can't separate 640px of ivory. ×10 pages, highest-volume brand defect in the batch. Required: `IndustryFAQ tone="on-ink"`, delete the compensating hairline.

**3C/3D/3E PASS:** About, Work hub, Careers, Insights, Article, Legal — no collisions.

## 4. SectionHeader tone — PASS, no regressions

Verified every on-ivory caller in the batch against its section background — all correct, no ivory-on-ivory reintroduced.

## 5. About founder narrative — VERDICT: CONFIDENT. Passes decisively.

Strongest copy on the site. Argues from sequence, not adjectives — volunteers the in-progress-degree fact outright rather than glossing over it, converting a potential objection into the thesis. `LeanTeamFeature.tsx` closes without a flinch.

Two copy notes for founder judgment: (a) stating current full-time employment at NextepSolution risks reading as "side project" — wording/positioning call, not a defect. (b) the "Real Project Work" row dumps all 8 project names into one dense line — cap at 4 + "and four more — see Work."

**Layout bug:** `components\sections\about\FounderNarrative.tsx:79` — `md:col-span-5 md:col-start-9` overflows a 12-col grid (spans columns 9–13). Should be `md:col-span-4 md:col-start-9`.

## 6. Brand coherence across four sessions — DRIFT IS VISIBLE, and it's a centering drift

Fundamentals held: no stock photography, no second accent color, honest placeholders, no fabricated metrics/testimonials across 8 case studies.

The drift is compositional. The approved batch is left-aligned editorial asymmetry end to end — that's the actual signature. This batch ships 6 centered blocks: `pricing\PhilosophyHero.tsx`, `careers\CareersHero.tsx`, `insights\ArticleHero.tsx`, `services\ServicesHubHero.tsx`, `case-study\NextCaseStudyPreview.tsx`, `careers\RedirectBand.tsx`. A centered column with eyebrow-above/paragraph-below is the default marketing-site hero — reads "starter kit." Required: left-align `ServicesHubHero`, `CareersHero`, `ArticleHero` to match `WorkHero`/`IndustriesHubHero`. Keep `PhilosophyHero`, `RedirectBand`, `NextCaseStudyPreview` (each earns centering for a specific reason).

Second signal: `HairlineRowList` is the batch's best asset (5 sections) but `RelevantServices.tsx` runs a 4-col card grid on all 10 industry pages while `IndustriesGrid` runs square cards — two competing answers to "list of linked things." Not a blocker; flag for consolidation.

## 7. `MetricsEmptyState` — REJECTED (×8 pages)

`components\sections\case-study\MetricsEmptyState.tsx` is a small bordered centered box at the visual climax of every case study — the exact pattern already rejected once as `CaseStudySpotlight` ("reads as a broken CMS query or an apology"), rebuilt in a new file with a comment explaining why it's supposedly different. The comment correctly distinguishes the content problem, then reproduces the visual pattern that was the actual objection. Required: delete the section and its usage. If a placeholder is non-negotiable: full-width, left-aligned, no border, forward-looking named metrics with em-dashes (same pattern as the already-approved CaseStudySpotlight fix).

## Required-change checklist

**Blockers**
1. `components\sections\work\WorkGridSection.tsx` + `components\sections\insights\ArticleGrid.tsx` — remove gold from result counters.
2. `components\sections\work\WorkHero.tsx` — delete gold count line.
3. `components\sections\work\FilterChip.tsx` — neutral perimeter + gold bottom edge only, remove hover gold.
4. `components\sections\case-study\NextCaseStudyPreview.tsx` + `components\sections\insights\ArticleCard.tsx` — hover gold text → hover gold border.
5. `components\sections\case-study\NarrativeStage.tsx` — add tone prop; alternate ivory/ink + cadence.
6. `app\(marketing)\industries\[slug]\page.tsx` — `IndustryFAQ tone="on-ink"`; delete compensating hairline.
7. `components\sections\case-study\MetricsEmptyState.tsx` — delete + remove usage, replace with full-width honest pattern.
8. `components\sections\about\FounderNarrative.tsx` — grid overflow fix (col-span-5 → col-span-4).

**Before animation pass**
9. Left-align `ServicesHubHero`, `CareersHero`, `ArticleHero`.
10. Founder sign-off on employment framing; trim the "At a Glance" project-list row to 4 + "and four more."
11. `IndustryNarrative` → use `SectionHeader` instead of hand-rolled markup.
12. Consolidate `RelevantServices`/`IndustriesGrid` toward one shared pattern.

**Verified pass, no action:** `pricing\EngagementModels.tsx`, `pricing\WhatThisIsnt.tsx`, full pricing rhythm; `components\sections\legal\*` gold-free; `SectionHeader` tone system; About narrative; `SnapshotBar` ink-on-ink adjacency.
