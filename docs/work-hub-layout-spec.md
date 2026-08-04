# Ayava Creatives — Work/Portfolio Hub (`/work`) Layout Spec
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft
Consistency source: `docs/homepage-layout-spec.md` (grid, spacing scale, breakpoints, tokens, a11y baseline — inherited, not restated) and `docs/case-study-layout-spec.md` (taxonomy, `status` model, empty-state rules — inherited, not restated).

## 0. Foundations (inherited, hub-specific notes only)

**Grid/breakpoints/spacing/type:** identical to homepage spec section 0. Do not redefine.

**Color usage on this page:** ink → ivory → ink, 3 sections total, standard alternation, no two consecutive same-tone sections. Hero = ink. Filter Bar + Grid = one continuous ivory zone (filter bar is chrome for the grid below it, not a separate section visually — same logic as Snapshot Bar's continuity with Case Study Hero). CTA Band = ink, bookending the page against the hero.

**Gold discipline (per both creative reviews):** gold restricted to hairlines, focus rings, and real numeric values. This page's only legitimate numeral is the live filtered-result count ("Showing 8 of 8 projects" / "Showing 3 of 8 projects") — that count may take a gold treatment on the digit only, small scale, per the `StatCounter`-adjacent numeral rule, NOT the whole "8" in headline size. Filter chips/tabs use gold only as the active-state 1px underline or border, never a gold fill. No card gets a gold border perimeter, no "featured" card treatment, no lift/translate, no badge/ribbon — this is the exact SaaS-pricing-card-wall defect the Meta Ads review blocked; the same discipline applies to a portfolio card wall.

**Reused components (do not rebuild):** `Button`, `SectionHeader`, `Tag` (industry/service filter chips reuse this, neutral slate default / gold-underline active variant — not a new component), `ArrowLink`, `MediaFrame`, `Container`. New components introduced by this page: `WorkHero`, `FilterBar`, `FilterChip`, `ResultCount`, `CaseStudyCard`, `CaseStudyGrid`, `NoResultsState`, `StatusPill` (draft/review indicator — internal-facing convention, see §3).

**Accessibility baseline:** inherits homepage §0 in full. Filter interactions specifically: filter bar is a `role="group"` with `aria-label="Filter case studies"`; each `FilterChip` is a real `<button>` with `aria-pressed` reflecting active state (not `aria-selected`, since multiple chips can be active simultaneously — see §2 mechanics); result grid region has `aria-live="polite"` on the `ResultCount` text node only (not the whole grid — re-announcing the entire grid on every filter change is noisy) so screen-reader users hear "Showing 3 of 8 projects" without the grid itself needing `aria-live`.

---

## 1. Hero — Index-Page Framing

**Layout:** NOT full-viewport (this is an index/utility page, not the cinematic homepage hero — full-bleed 100svh here would be an empty-feeling gesture in front of a mostly-white content page below it). Ink background, `160px` top padding / `96px` bottom padding (desktop), `64px`/`48px` (mobile) — shorter than homepage Hero, closer to a standard section open.

- Eyebrow label ("Our Work" or "Portfolio"), Label token, bronze.
- H1: display serif, `clamp(40px, 5.5vw, 72px)` — smaller than homepage's kinetic headline (that's the flagship statement; this is a section title doing honest work), max 2 lines, left-aligned cols 1–7.
- Supporting line: Body-L, max-width 52ch, cols 1–7, `24px` below H1. Copy should be scoped and honest given only 8 projects exist — recommend something like "Eight projects, eight industries, one founder-led process." rather than volume-implying language ("hundreds of brands," "our extensive portfolio") — do not let hero copy overpromise what the grid below can back up.
- No CTA buttons in this hero (the CTA is the whole page → individual case studies; a duplicate "See Our Work" button pointing at content 200px below it is redundant chrome). Optional: small `ResultCount`-style static line ("8 projects across 8 industries") sitting where a CTA row would go — real number, so gold-numeral treatment is earned here specifically.

**Responsive:**
- 1920/1440: as above.
- 1024/768: text block full-width (cols 1–8 of 8-col grid).
- 428/375: H1 clamps `clamp(30px, 8vw, 40px)`, 3 lines max, supporting line max-width drops to 38ch.

**Components:** `WorkHero`, `SectionHeader`-style heading block (not full `SectionHeader` component, since this is a hero not a mid-page section — but same type tokens).

**Interaction/state notes:** Static, no motion beyond standard page-load fade (no scroll-triggered choreography needed — this is a short, utilitarian hero).

**Content slots:** Eyebrow, H1, supporting line, optional real project/industry count line. All copy must stay honest about current scale (8 projects) — no "hundreds," no "trusted by leading brands" language without named clients backing it.

---

## 2. Filter Bar — Mechanics and Layout

**Definitive mechanics call: client-side, multi-select tag filtering, tab/chip-style UI (not a dropdown).** Rationale: 8 items is a small enough dataset that dropdown UI (which implies scanning a long list you can't see) would undersell the content and add an unnecessary click-to-open step; a visible chip row lets users see the entire taxonomy at a glance, which reads as intentional curation rather than sparse inventory. Filtering is fully client-side (no page reload, no server round-trip) — all 8 case studies' metadata ships with the page.

**Taxonomy (reuses Snapshot Bar's fields from case-study-layout-spec.md):** two filter groups —
1. **Industry** (single value per project, e.g. Real Estate, E-Commerce, Tech/SaaS, Craft/Handmade, Finance/Consulting, Education)
2. **Services Used** (multi-value per project, pulled from the 15-service taxonomy — only the services actually represented across the 8 projects should appear as filter options; do not list all 15 services as filters if only 6–7 are actually used across the current portfolio, since unused filter options that always return zero results are a dead-end UX pattern)

Both groups render as filter chips in the same horizontal bar, visually grouped with a small Label above each group ("Industry" / "Service"). No "Duration" or "Region" filters — those fields exist for narrative color on the individual case study page, not as meaningful filter axes at 8-item scale (region is currently ~100% India-based; filtering by it would be pointless).

**Layout:** Ivory background, continuous with grid below (no section break — same visual zone), `48px` top padding / `32px` bottom padding before grid starts, sits directly below Hero with no additional gap (bar's own top padding IS the gap). Two rows: "Industry" chip row, `12px` below it "Service" chip row. `ResultCount` sits right-aligned on the same line as an "All Work" reset link/chip, e.g. layout: left side = filter chip groups (cols 1–9), right side = `ResultCount` text + "Clear filters" link (cols 10–12, right-aligned, only visible when a filter is active).

- `FilterChip`: pill shape, `1px` slate-deep border default, Body/Label-size text, `8px 16px` padding. Default state: transparent fill, slate-deep border, ink text. Active state: ink fill... — no, per gold-fill-ban and card-wall-cliché warnings, do NOT use a filled-pill active state (that's exactly the "gold fill" and "cliché badge" pattern flagged in the reviews). **Active state: transparent fill retained, border shifts slate-deep → gold, text shifts ink → ink (unchanged) with a `2px` gold underline/bottom-border as the primary active signal** — consistent with the homepage/service-page rule that gold marks intent/state transiently, never as a fill or perimeter-on-a-content-card. This keeps chips visually calm even with several active simultaneously.
- Chips wrap to multiple lines if the row overflows at narrower widths (no horizontal scroll needed at this item count — industry chips ≤6, service chips ≤8ish, both wrap cleanly).

**Responsive:**
- 1920/1440/1024: two-row chip layout as above, `ResultCount` right-aligned inline with first chip row.
- 768: chip rows wrap naturally within 8-col container, `ResultCount`+"Clear filters" drops to its own row below both chip groups, left-aligned.
- 428/375: chip rows wrap to as many lines as needed (expect 2–3 lines per group at this width), `12px` row gap, `8px` chip gap; `ResultCount` sits full-width below both groups, `Clear filters` inline next to it (not a separate row) to conserve vertical space.

**Components:** `FilterBar`, `FilterChip` (variant of `Tag` component — reuse `Tag`'s base styling, extend with `active`/interactive states since homepage `Tag` is likely display-only), `ResultCount`.

**Interaction/state notes — full state set:**
- **Default:** no filters active, all 8 cards visible, `ResultCount` reads "8 projects" (no "Clear filters" link shown).
- **Active-filter (single or multi-select within and across both groups, AND logic across groups / OR logic within a group):** e.g. selecting "E-Commerce" (Industry) + "Web Design" (Service) shows projects matching E-Commerce AND (Web Design among their services). Selecting two Industry chips simultaneously (e.g. "E-Commerce" + "Craft/Handmade") is OR logic within that group (shows projects matching either). `ResultCount` updates live via `aria-live="polite"` region, e.g. "Showing 3 of 8 projects." Grid re-flows with a brief fade/reorder transition (150–200ms, respects `prefers-reduced-motion` — instant reflow, no transition, if reduced-motion is set).
- **No-results state:** if a filter combination (only possible with multi-group AND logic) returns zero projects, render `NoResultsState` in place of the grid — centered message within the grid's container bounds (not a tiny box floating in a huge empty area — match the "confident full-width, not a small bordered apology box" lesson from the Meta Ads case-study-empty-state review): headline-weight line ("No projects match that combination yet") + one Body line ("Try clearing a filter, or view all 8 projects.") + a "Clear filters" `Button` (secondary variant). Given only 8 projects across a handful of tags, true zero-result states should be rare — but must still be designed, not left to crash/blank.
- **Loading:** not applicable — client-side filtering of 8 static items is instant, no async/loading state needed.
- **Focus:** each `FilterChip` gets standard 2px gold focus ring (on-ivory tone = ink ring per the token rule... — confirm against Button.tsx's tone-aware ring fix from the homepage review: on ivory backgrounds, focus ring should be ink or gold-on-ivory-checked-for-contrast; use the same tone-aware ring approach already fixed in `Button.tsx`, do not reintroduce a low-contrast gold-on-ivory ring here).
- **Keyboard:** chips are Tab-reachable in DOM order (Industry group, then Service group, then Clear-filters link), Enter/Space toggles, no arrow-key requirement (this is a set of independent toggle buttons, not a single-select tab list — `role="group"`, not `role="tablist"`, since multi-select is allowed).

**Content slots:** Industry filter values = distinct industries actually represented across the 8 projects (derive from each project's Snapshot Bar `Industry` field once populated — do not invent industries not present in the real portfolio). Service filter values = distinct services actually used across the 8 projects (subset of the 15-service taxonomy, derive from real `Services Used` fields, not the full list).

---

## 3. Case Study Grid

**Layout:** Ivory background, continuous with Filter Bar above (same section, no break), `64px` top padding above grid (below filter bar) / `160px` bottom padding (closing the ivory zone before CTA Band) desktop, `96px`/`64px` mobile. 12-col grid, cards at `4-col span` each → **3 per row desktop** (1920/1440). This is a deliberate, denser-than-Featured-Case-Studies treatment — the homepage's `CaseStudySpread` pattern (full-width alternating editorial spreads) is right for showcasing 3 flagship stories with maximum drama, but wrong here: repeating that pattern 8 times would make the hub page absurdly long (8 full-viewport-ish spreads) and is the wrong density for a *browsing* page vs. a *storytelling* page. Use a grid-of-cards instead, sized generously enough (not a cramped 4-up or 5-up wall) that 8 cards still reads as a considered, gallery-quality set rather than a database dump.

- Gap: `32px` horizontal / `48px` vertical (desktop) — generous, editorial gap, not a tight SaaS-card-wall gap (reinforces "intentional, not sparse-trying-to-look-full" per the brief).
- To reinforce intentionality at 8 items (not implying hundreds): **first card in the grid is a featured/larger tile spanning 8 cols with the next 2 cards stacked in the remaining 4 cols (2 cards × 4-col span stacked vertically)** — same "1 hero tile + standard grid" asymmetric logic as homepage `ServicesShowcase` — then rows 2 onward revert to a plain 3-per-row 4-col grid for the remaining 5 cards (row of 3, row of 2 left-aligned not stretched/centered). This asymmetric opening row is the single "featured" moment allowed on the page and should be assigned editorially (creative-director/founder pick the strongest project, e.g. Aura Estates per homepage's own flagship recommendation) rather than defaulting to array order or most-recent.

**`CaseStudyCard` anatomy (standard variant):**
- `MediaFrame` (image, aspect-ratio locked 4:5 standard-card / 16:9 or wider for the featured 8-col tile), reused component, lazy-loaded.
- Below image: Industry `Tag` (neutral slate/bronze, not gold — matches homepage `IndustryTag` neutral convention), client/project name (H3, display serif), 1–2 line qualitative summary (Body, e.g. "Full-site rebuild and product catalog restructure" — scope language, not outcome-metric language, consistent with `draft`-status Results-stage rules from the case-study spec), `ArrowLink` ("View Case Study →") bottom-left or as the card's implicit full-card link affordance.
- **No card fill change, no border-color change to gold, no lift/translate, no shadow-pop, no "Case Study" ribbon/badge on hover** — these are the exact template-cliché treatments flagged in both creative reviews. **Approved hover treatment (desktop only):** image scale 1.02 within its `MediaFrame` (mirrors homepage `CaseStudySpread` / Insights `ArticleCard` hover, already-approved pattern), project name text shifts ink → gold... — no, per the gold-restricted-to-hairlines-and-real-numbers rule, do not shift body/heading text color to gold on hover either (that's decorative gold, not evidence-gold). **Corrected hover treatment: image scale 1.02, `ArrowLink` arrow slides right 4px (existing `ArrowLink` hover behavior, already built), a `1px` gold underline draws beneath the project name (hairline, not a fill/color change to the text itself)** — consistent with the "gold as hairline signal" pattern used for active filter chips above.
- Entire card is a single clickable region (one `<a>` wrapping the card, or one visible focusable link with the rest non-interactive) — same nested-link caution as homepage `CaseStudySpread`/`ArticleCard`/`NextCaseStudyPreview`.

**Status handling (per case-study-layout-spec.md's draft/review/live model) — the definitive call for this page:** Per that spec, a `draft` case study "is not linked from Featured Case Studies/Insights nav until `review`." The Work Hub is itself functionally equivalent to that nav-linking gate — **the Work Hub grid only lists case studies with `status: review` or `status: live`.** A pure `draft` (no confirmed narrative/snapshot fields at all) does not appear here either, same rule as elsewhere on the site. Given the brief states most/all of the 8 currently qualify only as draft-with-incomplete-metrics (not necessarily draft-with-no-narrative), the realistic expectation is: **all 8 case studies can and should reach `review` status** (Challenge/Strategy/Execution/Results narrative + Snapshot Bar fields are "always writable" per that spec, with metrics/quote/gallery as the pieces still pending) — so all 8 populate this grid at launch, each rendering the `review`-status version of its own page with honest empty states on the sections still missing data. This avoids the launch-blocking problem of a near-empty hub page while staying fully honest: the hub itself does not surface a "draft" chip/badge implying reduced quality (that reads as an internal CMS status leaking onto a public page — cluttered, and slightly damaging framing, "this one's unfinished," to show to prospects) since every card visible has real narrative content behind it. `StatusPill` is defined here as an **internal/CMS-only construct** (for the project-manager's content-tracking use, e.g. a Storybook/CMS preview flag), not a public-facing UI element on `/work` — do not render draft/review status badges on the public card.

**Responsive:**
- 1024: featured-tile row becomes 6-col span (featured) + 6-col span (2 stacked at 6-col, or drop the asymmetric opener entirely at this width and go straight to a uniform 2-per-row grid — recommend dropping the asymmetric opener at 1024, since a 6/6 split with 2 stacked cards inside one half gets visually cramped at 944px container width; simplicity wins here). Standard grid: 2 per row (6-col span each).
- 768: 2 per row (4-col span each of 8-col grid), no featured-tile treatment (uniform grid throughout at this breakpoint and below).
- 428/375: 1 per row, full-width stacked cards, `32px` gap, image aspect ratio locks to 4:5 (consistent with mobile card conventions elsewhere on the site).

**Components:** `CaseStudyGrid`, `CaseStudyCard` (variants: `featured` / `standard` — same variant-naming convention as homepage `ServiceCard`), `Tag` (reused, industry label), `ArrowLink` (reused), `MediaFrame` (reused).

**Interaction/state notes:** Scroll-trigger fade/slide-in per card row, staggered, on first render only (not re-triggered on filter changes — filter-change re-flow uses the lighter 150–200ms fade/reorder noted in §2, not a full scroll-entrance replay). Loading state: not applicable (all 8 case studies' metadata + thumbnails are known at build time, no async fetch). Error state: if a specific `MediaFrame` image fails to load, same ink-bronze placeholder-tile fallback convention as case-study-layout-spec's Gallery `GalleryTile` error state (never a broken-image browser icon).

**Content slots:** 8 real portfolio projects — NextepSolution, Nextep Ventures, Dreamzcraft, FineTaxConsultancy, Woodcraft Store Premium, Wooden Handicraft 3D, Aura Estates, College IQ. Each card needs: thumbnail image (real project asset, same rights-cleared rule as case-study-layout-spec's Hero requirement — no stock substitutes), industry tag, 1–2 line qualitative scope summary (writable now per the "always writable" narrative rule), href to its `/work/[slug]` case study page. Featured/hero card slot: 1 project, editorially assigned (recommend Aura Estates, consistent with homepage's own flagship pick, for cross-page consistency of "which project is the flagship").

---

## 4. CTA Band

**Layout:** Reuses homepage `CtaBand` pattern exactly (per homepage-creative-review.md's corrected version: ink... — confirm against that review's §4B ruling that the homepage CtaBand was corrected TO ivory, not ink, to bookend a long dark run). On this page the preceding run is ivory (Filter Bar + Grid, one long ivory zone), so the correct bookend direction here is **ink** (mirrors this page's own Hero, closing ink→ivory→ink, consistent with the "no more than 2 consecutive same-tone sections" rule and directly parallel to how case-study-layout-spec bookends its own template ink→...→ink). Do not copy the homepage CtaBand's ivory decision mechanically — that call was specific to homepage's preceding run of dark sections; apply the same *reasoning* (break up the longest same-tone run) rather than the same literal color here.

`128px`/`64px` padding, content centered, max-width cols 3–10. H2 statement (e.g. "Want to see your project here next?"), short supporting line, single primary `Button` (ink section → ivory-fill primary per the tone-aware `Button` fix from the homepage review), optional secondary "Book a Call" `ArrowLink`.

**Responsive:** Standard clamp scaling; buttons stack full-width at 428/375 with `16px` gap, matching homepage `CtaBand` responsive behavior exactly.

**Components:** Reuse `Button`, `CTABand` wrapper (same component as homepage, different copy/context — do not fork a new component).

**Interaction/state notes:** Standard button states (default/hover/focus/active), identical to homepage `CtaBand` — no new states introduced.

**Content slots:** CTA headline, supporting line, button label + href to `/contact` (per task brief — this is the Work Hub's terminal CTA, routes to the intake flow, not to another case study).

---

## Cross-Section Notes for Engineer

1. **No new visual language introduced.** Every component on this page is either a direct reuse (`Button`, `SectionHeader`-pattern, `Tag`, `ArrowLink`, `MediaFrame`, `Container`, `CtaBand`) or a small extension of an existing pattern (`FilterChip` extends `Tag` with interactive/active states; `CaseStudyCard` extends the `featured`/`standard` variant convention already established by homepage `ServiceCard`). Flag any case where reuse turns out to be impractical (e.g. if `Tag` genuinely can't take an interactive/active prop without a larger refactor) back to this spec rather than inventing a parallel component silently.
2. **Filtering is entirely client-side and synchronous** — no loading states, no skeleton screens, no debounce needed at 8-item scale. This is a deliberate simplicity call given current data volume; if the portfolio grows well past ~30–40 projects in the future, this page should be revisited for pagination/server-side filtering, but do not over-engineer for that scale now.
3. **Status/visibility gate:** query for `status: review` OR `status: live` case studies only, sorted with the editorially-assigned featured project first, remainder in a defined manual or reverse-chronological order (confirm with project-manager) — never surface `draft`-status (no-narrative-yet) projects on this page, consistent with case-study-layout-spec's own nav-linking rule.
4. **Section background sequence for this page: ink (Hero) → ivory (Filter Bar + Grid, one continuous zone) → ink (CTA Band).** Three sections total, clean alternation, no adjacency issues to flag.
5. **Every section is a `<section aria-labelledby="...">` landmark**, per the site-wide accessibility baseline; the Filter Bar + Grid zone may be one landmark (`aria-labelledby` pointing to a visually-hidden or the Hero's H1 id) rather than two separate landmarks, since they are one continuous visual/content zone, not two competing sections — consistent with how Case Study Hero + Snapshot Bar are treated as one continuous block in case-study-layout-spec.md.
6. **Cross-check before build:** confirm the actual distinct Industry and Service values present across the 8 real projects with the project-manager/content owner before hardcoding filter chip options — this spec defines the *mechanics* and *taxonomy source* (Snapshot Bar fields) but not the literal option list, which must come from real project data, not be invented here.
