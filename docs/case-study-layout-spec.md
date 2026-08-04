# Ayava Creatives — Case Study Page Layout Spec
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft
Consistency source: `docs/homepage-layout-spec.md` (grid, spacing scale, breakpoints, tokens, a11y baseline all inherited from that doc — not restated in full here except where case-study-specific).

## 0. Foundations (inherited, case-study-specific notes only)

**Grid/breakpoints/spacing scale:** identical to homepage spec section 0 (12-col grid, 1920/1440/1024/768/428/375 breakpoints, `4–200px` spacing scale, `160/96/64px` section rhythm). Do not redefine.

**Color usage on this template:** ink primary background for Hero, Snapshot Bar, Next-Case-Study Preview (bookend pattern, same logic as homepage hero/footer). Ivory primary background for the four narrative sections (Challenge/Strategy/Execution/Results), Before/After block, Quote block, Gallery. Gold restricted to hairline rules and numeric values in charts/StatCounters only — a case study page is chart-heavy, so gold discipline matters most here: gold marks the *number*, never the bar/line fill itself. Viridian is the single data-viz jewel tone for this page — use it once, as the primary chart color (bars/lines) for the Before/After comparison; do not also introduce it in the narrative in-line charts (keep those ink/bronze/slate to preserve viridian's "one moment" status per the token restriction).

**Typography:** display serif for H1 (case study title)/H2 (narrative stage headings)/pull-quote; sans for body, labels, captions, snapshot bar, chart axis labels, nav.

**Accessibility baseline:** inherits homepage section 0 in full (focus rings, AA contrast, reduced-motion, `aria-live` on passive counters, landmark structure). Additional case-study-specific rules are called out per section below.

---

## Content-Completeness Checklist (governs what can ship per case study)

Because none of the 8 real portfolio projects (NextepSolution, Nextep Ventures, Dreamzcraft, FineTaxConsultancy, Woodcraft Store Premium, Wooden Handicraft 3D, Aura Estates, College IQ) currently have verified before/after metrics, client quotes, or a curated asset gallery, **the template must render correctly in three distinct completeness states**, and the CMS content model should carry a `status` field per case study:

| Status | Meaning | What renders |
|---|---|---|
| `draft` | Narrative only, no metrics/quote/gallery confirmed | Sections 1–3 render with real scope/deliverable copy; Sections 4–6 render in their **Empty State** (see below), not with fabricated content. Page is not linked from Featured Case Studies/Insights nav until `review`. |
| `review` | Narrative + at least partial real data (e.g. real gallery assets exist but no client quote yet) | Each section independently resolves real content vs. empty state per its own field-level completeness — a case study can have a real gallery and still show Quote-block empty state. |
| `live` | All required fields present and founder-approved | Full render, no empty states, safe to link from Homepage Featured Case Studies and Insights. |

**Per-case-study field checklist (content team / founder sign-off before `live`):**
- [ ] Hero image/video — real asset from the actual project, rights-cleared
- [ ] Snapshot bar: Industry, Services Used, Duration, Region — factual, confirmable
- [ ] Challenge narrative (qualitative, always writable from known project scope)
- [ ] Strategy narrative (qualitative, always writable)
- [ ] Execution narrative (qualitative, always writable)
- [ ] Results narrative — **qualitative claims only** until real metrics exist (e.g. "redesigned checkout flow and expanded product catalog structure" is fine; "42% conversion lift" is NOT fine without a verified source)
- [ ] Before/after metric pairs — each metric requires a named, verifiable source (client-reported figure, analytics screenshot, etc.) logged in CMS `metric.source` field; no metric ships without one
- [ ] Client quote text — requires written/recorded consent from the actual client, attributed with real name+title+company
- [ ] Client headshot — requires client-provided or client-approved photo
- [ ] Gallery assets (min. recommend 4, max 12) — real deliverables from the project, rights-cleared for public display
- [ ] Next-case-study relation — auto-derived, no manual content needed

This checklist should be surfaced to the project-manager agent as the authoritative "is this case study publishable" gate.

---

## 1. Full-Bleed Hero (Image/Video)

**Layout:** Full-viewport height (`100svh`, fallback `100vh`), ink background, media as full-bleed cover (`object-fit: cover`). Content overlay: eyebrow label ("Case Study"), client/project name as H1 (display serif), 1-line project-type descriptor (Body-L), positioned bottom-left on a gradient scrim (ink 0%→70% opacity bottom 40% of viewport) for legibility over any image. Content block cols 1–7, anchored to bottom with `64px` bottom offset (desktop).

- Scroll-cue affordance (small down-chevron or "Scroll" label) bottom-right, col 11–12.

**Responsive:**
- 1920/1440: as above.
- 1024/768: content block widens to cols 1–8 (of 8-col grid), bottom offset reduces to `48px`.
- 428/375: content block full-width minus outer margin, bottom offset `32px`, H1 clamps `clamp(32px, 9vw, 44px)`, descriptor line optional-hide if space tight (prioritize H1 + eyebrow).

**Components:** `CaseStudyHero`, `MediaFrame` (video variant — poster + no-autoplay-with-sound rule same as homepage Testimonial Theater), `ScrollCue`.

**Interaction/state notes:** If video: default = poster + play button overlay (muted autoplay loop is acceptable here only if silent and `prefers-reduced-motion` disables autoplay, replacing with static poster); loading = skeleton/poster held; error = fallback to static hero image, never a broken player. Scroll-triggered parallax/scale-out on hero as user scrolls into Snapshot Bar — flag for motion-designer, don't implement choreography here.

**Content slots:** Hero media (image or video), eyebrow, client/project name, 1-line descriptor. All must be real project assets — **no stock photography substitutes for a named real client project**; if no real hero asset exists yet for a project, that case study stays `draft` and is excluded from public nav.

---

## 2. Snapshot Bar

**Layout:** Full-width ink strip immediately below hero (no gap — visually continuous with hero via a `1px` bronze/slate-deep hairline top border), `48px` vertical padding desktop / `32px` mobile. Horizontal row of 4 data points evenly split across 12-col grid (3 cols each): Industry, Services Used, Duration, Region. Each data point: Label token (small caps or Caption size, slate) above, value (Body, ivory) below. Divided by `1px` vertical hairline rules (slate-deep) between the 4 items, not full-width borders.

- "Services Used" value may contain 2–4 comma-separated service names (or small pill/tag list, reuse `IndustryTag` component pattern from homepage styled neutrally, not gold) — allow this cell to wrap to 2 lines if needed while the other 3 stay single-line.

**Responsive:**
- 1920/1440/1024: 4-across row as described.
- 768: 2x2 grid, hairlines only between adjacent cells (right border on col 1, bottom border on row 1).
- 428/375: stacked single column, `1px` bottom hairline between each of the 4 rows, `16px` vertical padding per row, label+value inline on same row (label left, value right) to conserve vertical space rather than stacking label-above-value.

**Components:** `SnapshotBar`, `SnapshotItem`, `Tag` (reused, neutral slate variant for Services Used pills).

**Interaction/state notes:** Static, no interaction. This is a `<dl>` semantically (definition list: Industry/Services Used/Duration/Region as `<dt>`, values as `<dd>`) for correct SR structure, wrapped in `role="group"` with `aria-label="Project snapshot"`.

**Content slots:** Industry (1 value), Services Used (2–4 values from the 15-service taxonomy), Duration (e.g. "6 weeks" — real, confirmable), Region (e.g. "Dehradun, India" or client's region). All four fields are factual/low-risk and should be completable for every real project even at `draft` status — this section should basically never need an empty state.

---

## 3. Narrative Flow: Challenge → Strategy → Execution → Results

**Layout:** Ivory background, one continuous section broken into 4 internal stages, each stage a distinct `<section>` landmark of its own (not one giant unlabeled block) so SR users get 4 named regions, not 1. Each stage: `96px` vertical padding between stages (desktop) / `64px` (mobile) — tighter than the `160px` major-section rhythm since these 4 are one narrative arc.

**Per-stage layout (alternating asymmetric split, same rhythm logic as homepage Featured Case Studies spreads):**
- Challenge: text col 1–5, in-line data visual (if any) col 7–12.
- Strategy: reversed — visual col 1–6, text col 8–12.
- Execution: text col 1–5, visual col 7–12 (same as Challenge, creates ABAB rhythm across 4 stages... actually use Challenge/Execution same side, Strategy/Results reversed, so pattern is A-B-A-B for clean alternation).
- Results: visual col 1–6, text col 8–12.

- Each stage: stage label (Label/Caption, e.g. "01 — The Challenge", bronze/gold numeral per homepage Method-step convention), H2 stage heading (display serif), body copy (2–4 short paragraphs, Body-L), optional in-line data visualization slot.

**In-line data visualization slot (`InlineDataViz`):** small supporting chart (e.g. a simple bar/donut/line illustrating one Challenge/Strategy/Execution data point — NOT the Before/After comparison, that lives in Section 4). This is optional per stage — only render if real supporting data exists (e.g. "Execution" stage might show a simple timeline/Gantt-style bar of deliverable phases, which is process data, not outcome data, and is safe to show even pre-metrics). Style: ink/bronze/slate line work on ivory, no viridian here (viridian reserved for Section 4 per token rule).

**Responsive:**
- 1024: text/visual split narrows but keeps side-by-side (5/7 or 6/8 → adjust to fit 12-col at 944px; visual may shrink, text col count can widen slightly, e.g. text 1–6, visual 7–12).
- 768: stack — text full-width first, visual below (or visual above text if the visual is the more important element for that stage — recommend consistent text-first for reading order/SR order regardless of desktop visual arrangement, controlled via CSS order property, not DOM order, so DOM stays text-then-visual always).
- 428/375: same stacked pattern, `48px` gap between text and visual within a stage, `64px` between stages.

**Components:** `NarrativeStage` (variant per stage: challenge/strategy/execution/results), `StageLabel`, `InlineDataViz` (chart variants: bar/donut/timeline — coordinate exact chart component API with frontend-engineer), `SectionHeader`-style stage heading (reuse pattern, not full component).

**Interaction/state notes:** Stage content fades/slides in on scroll enter, staggered text-then-visual — flag choreography detail to motion-designer. `InlineDataViz` charts: if built as SVG/Canvas, must have an `aria-label` or adjacent visually-hidden text summary describing the data point (charts are never the sole carrier of information — same rule as homepage Global Presence Map). No loading/error states needed if charts render from static build-time content; if charts are data-fetched, define skeleton (pulse placeholder matching chart bounding box) + error (fallback to text-only stat, no broken chart render).

**Content slots (per stage):** stage heading + 2–4 paragraphs of real, qualitative narrative copy (writable today from known project scope for all 8 real projects) + optional `InlineDataViz` data point (only if real process data exists, e.g. "3 design iterations", "6-week build phase" — process facts, not outcome claims). **Results stage specifically: keep to qualitative scope/deliverable summary language until Section 4's metrics are verified — do not state a quantified outcome in Results-stage prose that isn't backed by a sourced metric in Section 4.**

---

## 4. Before/After Metric Comparison (animated charts)

**Layout:** Ivory background (or subtle ivory-to-off-white panel differentiation, `1px` slate-deep border frame around the whole block to set it apart as a distinct "data module" within the ivory flow), `96px` padding. Section header centered or left col 1–6: "Results at a Glance" (or similar). Below: grid of metric-pair cards, 2–4 cards depending on how many verified metrics exist, 3 cols each (12-col / 3–4 per row) for 3–4 metrics, or 6 cols each (2 per row) for exactly 2 metrics — component should be flexible to card count, not hard-coded to 4.

**Each MetricComparisonCard:**
- Metric label (Label token, e.g. "Organic Traffic")
- Before value (StatCounter, muted/slate treatment, smaller)
- After value (StatCounter, viridian accent for the bar/line + gold for the numeral per token rule — this is the one sanctioned viridian use on the page)
- Small animated bar or line chart visualizing before→after (viridian fill for the "after" bar/line, slate for "before")
- Source citation line (Caption, e.g. "Source: Client-reported Google Analytics, Jan–Jun 2026") — **mandatory, always visible, not a tooltip** — this is a trust/credibility requirement, not decoration.

**Responsive:**
- 1920/1440/1024: grid as above (3–4 or 2 across depending on count).
- 768: 2 across regardless of count (wraps to additional rows).
- 428/375: 1 across, stacked, `24px` gap, chart width scales to full card width.

**Components:** `MetricComparisonGrid`, `MetricComparisonCard`, `StatCounter` (reused, before/after variants), `InlineChart` (bar/line variant, viridian/slate palette), `SourceCitation`.

**Interaction/state notes:** Count-up + bar/line-draw animation triggered on scroll-into-view, once, IntersectionObserver ~0.4 threshold, respects `prefers-reduced-motion` (render final state immediately, no animation) — same pattern as homepage Results Strip. `aria-live` not needed here (not ambient/passive — content is present in DOM at load, animation is purely decorative reveal); ensure final before/after numeric values exist as real text content in DOM immediately, not injected only post-animation.

**Empty state (required — this is the section most likely to lack real data):** When no verified metrics exist for a case study (`draft`/`review` status, metrics field empty), render `MetricComparisonGrid` in its empty variant: a single centered card/message, ink-on-ivory or bordered panel, text: "Measured results for this project are being finalized." + optionally a link back to qualitative Results-stage copy above ("Read about the outcomes ↑"). **Do not render fabricated or estimated numbers, do not render zeroes/dashes styled as if they were real metrics, and do not silently omit the section (an abrupt gap reads as a bug) — the empty state must be an intentional, styled component**, not a blank space or console-error-prone missing-data crash.

**Content slots:** 2–4 metric pairs (label, before value, after value, source citation) **per project, only once verified** — currently STUB/UNAVAILABLE for all 8 real portfolio projects per the founder's confirmation; every case study ships with the Empty State variant until real, sourced metrics are provided. Flag to project-manager: this is the top content-acquisition priority before any case study can go fully `live`.

---

## 5. Client Quote Block (with headshot)

**Layout:** Ink background (bookend contrast against surrounding ivory sections, consistent with homepage's ink/ivory alternation rule), `128px`/`64px` padding. Centered, narrow max-width col 3–10. Large pull-quote (display serif, ivory, `clamp(28px, 3.5vw, 44px)`), quote marks as a decorative bronze/gold glyph (small, not oversized — respect gold's ≤4%-viewport restriction, treat as a hairline-scale accent not a fill). Below quote: attribution row — circular headshot (`64px` diameter) + name (Body, bold) + title/company (Caption, slate) inline.

**Responsive:**
- 1024/768: same centered layout, max-width col 2–11.
- 428/375: full-width minus margin, pull-quote clamps to `clamp(22px, 6vw, 28px)`, attribution row stacks headshot-above-name-title if inline doesn't fit at 375 (test at build; prefer keeping inline with `40px` headshot if it fits, since stacking breaks the compact attribution pattern).

**Components:** `QuoteBlock`, `Avatar` (circular, with fallback — see below), `QuoteMark` (decorative glyph).

**Interaction/state notes:** Static, no animation beyond standard scroll-fade-in. `Avatar` fallback state (required): if no headshot image available/consented, render initials-on-slate-deep-circle fallback (never a generic silhouette stock icon — initials are more honest and avoid implying a photo exists) — but per the empty-state rule below, prefer omitting the whole block over showing a fallback-avatar quote with placeholder text.

**Empty state (required):** When no real, consented client quote exists for a project (true for all 8 real projects currently, per founder's confirmation — no client testimonials collected yet), **omit the Quote Block section entirely from that case study's render** rather than showing a placeholder/lorem-ipsum quote attributed to a real company name. This section should be conditionally rendered based on a CMS boolean (`hasQuote`), not always-present-with-empty-state like Section 4 — because an empty visual "quote card" with no quote reads as broken, whereas simply not having the section is a normal, honest content gap. Page layout (section spacing) must gracefully close the gap (next section's top padding absorbs the space, no orphaned empty band).

**Content slots:** Quote text (real, consented), client name, title, company, headshot. **None of these exist yet for any real project** — flag to project-manager as a content-acquisition task (reach out to the 8 past clients for permission + a short quote + photo) before any case study can show this section.

---

## 6. Visual Gallery of Creative Assets

**Layout:** Ivory background, `96px`/`64px` padding. Header cols 1–6 ("The Work" or similar). Masonry-style or fixed-aspect grid below: recommend a flexible grid (not strict masonry, which has a11y/DOM-order complications) — CSS grid with `auto-flow: dense`, mixed tile sizes (some 6-col-span "hero" images, most 4-col-span standard), all tiles snap to a shared row-height unit so the grid stays orderly. Gap `24px` desktop / `16px` mobile.

- Each `GalleryTile`: image (lazy-loaded, `MediaFrame` component reused from homepage), optional caption overlay on hover (what the asset is, e.g. "Homepage hero — desktop", Caption size, ink scrim gradient bottom).

**Responsive:**
- 1920/1440: mixed 6-col/4-col grid as above, ~3–4 tiles per visual row depending on span mix.
- 1024: simplify to uniform 2-col grid (drop the mixed-span pattern — too fragile at 944px), still `auto-flow: dense` for minor size variation if desired, or fully uniform for simplicity (recommend uniform at this breakpoint).
- 768: 2-col grid, uniform tiles.
- 428/375: 1-col stacked, full-width tiles, `16px` gap, images at consistent 4:5 or 16:9 aspect (pick one per project type — e.g. product shots 1:1, web/UI shots 16:9 — define per-project in CMS, not hard-coded to the component).

**Components:** `AssetGallery`, `GalleryTile`, `MediaFrame` (reused), optional `Lightbox` (if clicking a tile opens a fullscreen viewer — recommend yes for a portfolio-quality gallery).

**Interaction/state notes:** Tile hover (desktop): image scale 1.02, caption overlay fades in. Focus: same treatment, tile is a `<button>` (opens lightbox) with `aria-label` describing the asset. `Lightbox` if implemented: full keyboard trap while open (Tab cycles within, Esc closes, focus returns to triggering tile on close), arrow-key next/prev, `aria-modal="true"`, `role="dialog"`, background scroll-locked, respects reduced-motion for open/close transition (fade instead of scale/slide). Loading: skeleton placeholder per tile while image lazy-loads (shared `MediaFrame` behavior). Error: broken-image fallback treatment (ink-bronze placeholder tile with a small icon, not a broken-image browser icon) if an asset fails to load.

**Empty state (required):** Recommend minimum 4 gallery assets to render the section meaningfully; if fewer than 4 real assets exist for a project, render available assets in a simpler single-row layout (no forced grid padding to fake a fuller gallery) rather than padding with unrelated/generic imagery. If zero assets exist, omit the section entirely (same conditional-render logic as Quote Block) — do not fill with stock imagery under a real client's name.

**Content slots:** 4–12 real creative assets per project (screenshots, mockups, photography of the actual delivered work), rights-cleared for public display. For the 8 real portfolio projects this is likely the most readily available content type (design files/screenshots probably already exist from delivery) — flag to project-manager as the fastest section to bring to `live` status, ahead of quotes/metrics.

---

## 7. Next Case Study Preview (infinite scroll pattern)

**Layout:** Full-bleed ink section (bookend against Hero, closes the page the way it opened), `160px`/`64px` padding, but visually treated as a transitional/navigational band rather than a content section — shorter effective content height than a full section even though padding matches rhythm scale. Centered content col 3–10: small eyebrow ("Next Case Study"), large client/project name (H2 display serif, acts as the link), thumbnail/preview image (16:9 or the project's hero image at reduced scale) below or beside name, arrow affordance.

- "Infinite scroll pattern" clarification: this is a **single next-item preview component** styled to imply continuation (not an actual infinite-scroll content feed within the case study page itself — case studies are discrete pages, not a feed). The "infinite" quality comes from site structure: Case Study A's Next-Preview links to Case Study B, whose own Next-Preview links to Case Study C, etc., cycling back to A after the last — giving users an endless browse path across page loads, without literal infinite-scroll DOM injection on one page (which would be an a11y/SEO anti-pattern for a page-based case-study template). Confirm this interpretation with project-manager/creative-director if literal in-page infinite scroll was intended instead.

**Responsive:**
- 1024/768: same centered pattern, max-width col 2–11.
- 428/375: stacked (eyebrow → name → thumbnail → arrow), full-width minus margin, thumbnail aspect locks 16:9.

**Components:** `NextCaseStudyPreview`, `MediaFrame` (reused), `ArrowLink` (reused from homepage).

**Interaction/state notes:** Entire block is one clickable region (card-link pattern, same nested-link caution as homepage Featured Case Studies / Insights cards — single focusable element per block). Hover: thumbnail scale 1.02, name color-shift to gold, arrow slides right 4px (mirrors homepage ArrowLink hover convention). Preload the next case study's hero asset on hover/focus-intent for perceived-instant navigation (performance flag for frontend-engineer, optional enhancement not required for v1).

**Content slots:** Next case study's project name + thumbnail — auto-derived from a defined ordering of the 8 (and future) case studies in CMS, no manual per-page content needed beyond maintaining that order. Only cycle through case studies with `status: live` — a `draft` case study should never appear as a "next" suggestion since it isn't publicly linkable yet.

---

## Cross-Section Notes for Engineer

1. **Reusable component inventory (reuse from homepage, do not rebuild):** `Button`, `SectionHeader`, `StatCounter`, `ArrowLink`, `Tag`/`IndustryTag`, `MediaFrame`, `CarouselControls` (if Lightbox needs prev/next), `SnapshotItem`'s `Tag` styling variant. New components introduced by this template: `CaseStudyHero`, `ScrollCue`, `SnapshotBar`, `NarrativeStage`, `StageLabel`, `InlineDataViz`, `MetricComparisonGrid`, `MetricComparisonCard`, `InlineChart`, `SourceCitation`, `QuoteBlock`, `Avatar`, `QuoteMark`, `AssetGallery`, `GalleryTile`, `Lightbox`, `NextCaseStudyPreview`.
2. **Section background bookend pattern:** ink (Hero) → ink (Snapshot Bar, continuous) → ivory (Narrative x4) → ivory (Before/After, bordered panel) → ink (Quote) → ivory (Gallery) → ink (Next Preview). No more than 2 consecutive same-background sections without a visual break, consistent with homepage rule; Snapshot Bar's continuity with Hero is an intentional exception (same visual block, not two competing sections).
3. **CMS-driven conditional rendering is the core architectural requirement of this template.** Unlike the homepage (mostly fixed content), this template must render correctly across `draft`/`review`/`live` states and per-field presence (metrics, quote, gallery count) — build Sections 4–6 as independently-optional from the start, not retrofitted later. See Content-Completeness Checklist above for the exact field-level logic.
4. **Chart component consolidation:** `InlineDataViz` (Section 3, process-data, ink/slate/bronze palette) and `InlineChart` (Section 4, outcome-data, viridian/slate palette) should likely share one underlying chart-rendering component with palette as a prop — flag to frontend-engineer to avoid building two chart systems. Keep the palette restriction (viridian only in Section 4) enforced at the design/content level regardless of shared code.
5. **Every section is a `<section aria-labelledby="...">` landmark**, per homepage accessibility baseline. Sections 4/5/6 additionally need `aria-live` NOT applied (these are not ambient regions) but do need their empty/omitted states to not leave orphaned ARIA landmarks with no content (if a section is omitted, omit its `<section>` wrapper entirely, don't render an empty landmark).
6. **Metric sourcing is a legal/reputational gate, not just a content nicety** — Section 4's `SourceCitation` requirement and the overall Content-Completeness Checklist should be treated as launch-blocking for any case study claiming quantified results, consistent with the same caution already applied to homepage's Results Strip and Featured Case Studies stub-data flags.
