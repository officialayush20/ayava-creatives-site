# Service Template (×15 pages) — Creative Review

**Overall verdict: CONDITIONAL PASS.** The visual system is clean — this is the first batch where prior rulings were *generalized* rather than string-matched. Gold audit passes outright, the empty state uses the corrected full-width pattern, and the grid-monotony/cadence notes from the Meta Ads review were actually carried into the promoted components. It fails on four things: a same-tone collision now shipping ×15, a nested-anchor HTML bug ×8, an eyebrow that contradicts its own heading on the AI Marketing exception, and — the real problem — content-level repetition that no amount of layout variety would fix.

## 1. Gold audit — PASS, no violations

`OurApproach.tsx` step numerals: slate, correct at any step count. `Pricing.tsx` featured tier: only a gold top-edge hairline, no fill/lift/badge, verified across all 15 tier configurations. `CaseStudyEmptyState.tsx` em-dash placeholders: slate, not gold. All remaining gold is transient hover borders / focus rings with tone-correct offsets. Nothing to change.

## 2. Empty-state pattern — PASS, correct primitive

`CaseStudyEmptyState.tsx` is the corrected pattern (full-width, left-aligned, no card/border/centering) — confirmed correct on Influencer, ASO, Video/Motion, PR, AI Marketing, Meta Ads.

Two refinements:
- `CaseStudyEmptyState.tsx` hairline isn't tone-aware — masked today since always called on ink, but should be `tone === "on-ink" ? "border-slate-deep" : "border-slate-deep/40"`.
- **Copy repetition:** the heading "In Progress, Not Invented" appears verbatim 5 times in `lib/service-page-content.ts`. Give each a service-specific heading in the same register (e.g. Video: "Nothing Shipped We Can Show Honestly"; ASO: "No Listing We've Measured Yet"; PR: "We Haven't Owned a Narrative Long Enough to Prove It").

## 3. AI Marketing explainer — modelling right, labelling wrong

Correct call to route through the shared shell rather than fork a component; doesn't read as bolted-on. Two fixes:
- The eyebrow reads "Case Study Spotlight" over a body that says there is no case study — thread an optional `eyebrow` prop through and set it to "How We'd Approach It" for AI Marketing.
- Add an optional `metricsLead` line before the em-dash row here specifically, since on this page the row means "there's no engagement" not "results are pending" — one line like "If we ran this for you, this is what we'd hold ourselves to:" converts absence into method.

This is the strongest copy in the batch — distinguishing College IQ as a client's AI *product* from an Ayava AI-*marketing* engagement is a distinction only a confident firm draws in public.

## 4. Composition rhythm ×15 — VERDICT: UNIFORM STRUCTURE IS CORRECT. DO NOT ADD PER-SERVICE VISUAL VARIATION.

A service index is a catalogue, judged on consistency, not surprise. Per-service visual variation: **rejected, do not build it.** The rhythm is well-executed with deliberate cadence variation, and grid monotony was already fixed (OurApproach's 3/9 rows, Deliverables' hairline rows).

**But the templated feeling is real, and it lives in the copy, not the layout:**
- 12 of 15 `problem.title` values open with "Most." — cap at 4 of 15; the 3 exceptions in the file are already the best lines.
- 8 titles are near-verbatim restatements of their own first paragraph — paragraph[0] must advance the argument, never re-open it.
- 13 of 15 pricing tier sets use identical generic `genericTiers()` content, directly undercutting the section's own hardcoded headline "Scoped to your project, not a template." Fix: write real per-service tiers (Meta Ads shows the model), or drop tiers on those pages for a single `HairlineRowList` of what changes scope (the pattern already approved in `pricing/EngagementModels.tsx`).
- Every section eyebrow/title is hardcoded identically across all 15 pages except `approachEyebrow`/`approachTitle` — and those two are the ones that make each page feel authored. Make Pricing's title content-driven at minimum.
- `ServiceHero.tsx` hardcodes "See Case Study" on all 15 pages, including the 5 state-B pages where it jumps to a section admitting there isn't one — an overclaim in the first viewport. Make the label content-driven.

Restated: keep the skeleton identical; make the sentences unique. Structure is the brand; copy is the product.

## 5. FAQ → Related Services collision — RULING: MERGE THE TWO CROSS-LINK SECTIONS INTO ONE IVORY SECTION

Confirmed: FAQ (ink) runs straight into Related Services (ink), no rule between, ~1,000px of unbroken ink on all 15 pages including Meta Ads.

Do not just flip Related Services to ivory (creates an ivory→ivory collision with the already-ivory Related Industries after it). Do not add a hairline (established already that 1px can't separate large same-tone runs).

**Fix: collapse Related Services + Related Industries into one `bg-ivory` section.** One SectionHeader ("Where This Fits" / "Pairs well with, and who we run it for."), related services as a HairlineRowList, then a hairline break, then the existing industry chip row — the same in-house pattern already proven on Deliverables+Tools in this same template.

This resolves: perfect ink/ivory alternation end to end, retires the 4-col card grid flagged for consolidation in the phase 2 review, drops the page from 10 sections to 9, and leaves Pricing as the sole remaining card grid (strengthening it by contrast).

Interim fallback only if the merge must be deferred: swap both sections' tones (Related Services → ivory, Related Industries → ink). The merge is the correct answer.

## 6. Bugs found in the template

- **BLOCKER — nested anchors** in `CaseStudySpotlight.tsx` (×8 state-A pages): an outer `<a>` wraps an inner `ArrowLink` (also an `<a>`). Invalid HTML, hydration/tab-order issues, screen readers announce two overlapping links. Fix: outer element → `<div className="group">`, keep the single ArrowLink as the real link, add `group-hover:border-gold` on the media wrapper (the CaseStudyCard treatment) since `group` is declared but currently unused.
- `LeadCapture.tsx` success-branch heading has no `id`, so `aria-labelledby="lead-capture-heading"` on the parent section dangles after submit — add the missing id.
- `Pricing.tsx` — the featured card's gold top-edge hairline visibly collides with its own rounded corner against the slate-deep perimeter — square the top edge.
- Placeholder density (judgment call, not a defect): every page shows an "Image pending" hero frame plus a second placeholder on state-A pages, and two projects (Aura Estates, Wooden Handicraft 3D) each spotlight on two different services — a visitor browsing multiple pages sees the same placeholder twice. Standing recommendation: run ServiceHero confidently full-width until real assets exist, rather than a visibly empty media slot.

## Required-change checklist

**Blockers**
1. `CaseStudySpotlight.tsx` — remove nested anchor; add `group-hover:border-gold`.
2. Merge Related Services + Related Industries into one ivory section.
3. `lib/service-page-content.ts` — rewrite `problem.title` (≤4 of 15 open with "Most"; none restated by their own first paragraph).
4. `lib/service-page-content.ts` — replace generic pricing tiers (13 pages) with real scope copy, or convert to a tier-less HairlineRowList.
5. `lib/service-page-content.ts` — 5 distinct empty-state headings replacing the verbatim "In Progress, Not Invented".

**Before the animation pass**
6. Thread `eyebrow` through CaseStudySpotlight's state B; AI Marketing → "How We'd Approach It".
7. Add optional `metricsLead` to CaseStudyEmptyState; set on AI Marketing.
8. CaseStudyEmptyState — tone-aware hairline opacity.
9. LeadCapture — missing heading id.
10. ServiceHero — content-driven secondary CTA label (not hardcoded "See Case Study" on state-B pages).
11. Pricing — content-driven section title; fix gold-hairline/corner-radius collision.
12. ServiceHero — reconsider the placeholder media slot while every asset is a placeholder.

**Verified pass, no action:** gold discipline across all template components; Pricing featured treatment across all 15 configurations; CaseStudyEmptyState full-width honest pattern; OurApproach/Deliverables layout; cadence variation; SectionHeader tone system; uniform section sequence across 15 pages (correct by design).
