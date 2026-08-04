# Ayava Creatives — Insights Hub + Article Template Layout Spec
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft

Applies the grid/spacing/color/type/a11y baseline defined in `docs/homepage-layout-spec.md` §0 and the discipline corrections in `docs/service-contact-creative-review.md` (gold restricted to hairlines/real numbers/state only, no `bg-white`, no centered "apology" empty states, `SectionHeader` explicit tone color, section backgrounds never 2+ consecutive identical without a break). Reuses `Container`, `SectionHeader`, `Button`, `ArrowLink`, `Tag`, `MediaFrame`, `CtaBand`, `FilterChip` (from `components/sections/work/FilterChip.tsx`), `CaseStudyEmptyState` pattern as a reference model (not reused directly — new `ArticleComingSoon` variant defined below, same principle).

Route structure: `/insights` (hub), `/insights/[slug]` (article template — both stub and published states).

---

## 0. Content model (drives both pages)

Every article is one object, whether stub or published:

```
{
  slug: string
  title: string
  category: string            // one of a small fixed taxonomy, see §1.2
  status: "coming-soon" | "published"
  angle?: string               // stub only — the "Ref:" line from InsightsPreview
  excerpt?: string              // published only
  readTime?: string             // published only, e.g. "6 min read"
  publishDate?: string          // published only, ISO, rendered "Aug 4, 2026"
  author: "Ayush Saini"          // constant, published only (stub has no byline)
  coverImage?: MediaFrame source // published only
  body?: RichContent[]           // published only — see §3.2
  relatedSlugs?: string[]        // published only
}
```

The 3 existing "coming soon" titles from `components/sections/InsightsPreview.tsx` are the seed data for `status: "coming-soon"` entries — reuse verbatim, do not rewrite:

1. "What a CRM Platform's Website Needs That a Landing Page Doesn't" — Ref: NextepSolution learnings
2. "Selling Luxury Real Estate Online Without Looking Like Every Other Listing Site" — Ref: Aura Estates
3. "Explaining AI-Powered EdTech to Non-Technical Buyers" — Ref: College IQ

New `lib/insights-data.ts` should mirror the shape of `lib/case-studies-data.ts` (array + derived filter lists), giving these three entries slugs (e.g. `crm-platform-website`, `luxury-real-estate-landing-pages`, `ai-edtech-non-technical-buyers`) so `/insights/[slug]` resolves today even with zero published bodies. **STUB DATA note:** category values below are placeholder taxonomy inferred from the 3 known angles (Product/Platform, Real Estate & Luxury, EdTech) — confirm final category list against blueprint content strategy before adding more articles; do not invent categories beyond what's needed for these 3 + reasonable near-term additions.

---

## 1. Hub Page (`/insights`)

### 1.1 Hero

**Layout:** Ink background, `128px`/`64px` vertical padding (matches Work hub proportions, not full-viewport hero — this is a utility hub, not the homepage). `SectionHeader`-style block, cols 1–7, left-aligned: eyebrow "Field Notes", H1 "Insights, Not Filler" (or align with `InsightsPreview`'s existing "Field Notes, Not Filler" framing — reuse that exact language for continuity), one supporting line (Body-L, max 50ch) stating plainly that this is a working library — some pieces are live, others are announced ahead of publication, sourced from the studio's own project work rather than generic marketing-blog filler.

**Responsive:** Standard clamp scaling per homepage type tokens. 428/375: full-width text block, no canvas/decoration needed (this hero is text-only, not a WebGL slot).

**Components:** `InsightsHero` (new, thin wrapper reusing `SectionHeader` primitives — not a full custom hero, this hub doesn't need Hero's ceremony).

**Content slots:** Eyebrow, H1, supporting line. No stats/CTAs in the hero itself — filter bar and grid do the work below.

### 1.2 Category/Tag Filter Bar

**Pattern reuse:** Identical mechanism to Work hub's filter bar (`components/sections/work/WorkGridSection.tsx` §"Filter Bar") — client-side, synchronous (dataset will stay small for a long time, no debounce/loading state needed), single filter group here (category only — no second dimension like Work's industry+service, since Insights doesn't have that axis yet).

**Layout:** Ivory background begins here (ink hero → ivory filter+grid zone = one clean break, satisfies the "no 2+ consecutive same-bg" rule). `border-b border-slate-deep/20 pb-8` bar, `Container`, row of `FilterChip`s (reuse component as-is, no new variant needed) under a `text-xs uppercase tracking-[0.18em] text-slate-deep` label "Category". Result count line right-aligned per Work hub's pattern (`Showing N of M articles`, `aria-live="polite"`, gold reserved for the numeral only since it's a real count — consistent with the gold-restricted-to-real-numbers rule), with a "Clear filters" text link appearing only when a filter is active.

Categories (v1, expand later): `All` (implicit — no chip, chips are additive OR-filter same as Work hub), `Strategy & Platforms`, `Industry Playbooks`, `Craft & Process`. Map the 3 seed articles: CRM piece → Strategy & Platforms; Real Estate piece → Industry Playbooks; EdTech piece → Industry Playbooks (or its own if volume grows).

**Responsive:** Chips wrap (`flex flex-wrap gap-2`) at all breakpoints, no horizontal scroll needed at this chip count. Result count stacks below chip row at 428/375 (`flex-col`, matching Work hub's `md:flex-row` breakpoint).

**Components:** `FilterChip` (reused, no changes).

**Interaction/state notes:** Same as Work hub — `role="group" aria-label="Filter articles by category"`, keyboard-operable buttons with `aria-pressed`, focus ring standard. No-results state: same honest, full-width, left-aligned pattern as Work hub's no-results block (H3 + supporting line + "Clear filters" `Button` secondary) — never a centered apology box.

### 1.3 Article Grid

**Layout:** Continues the ivory zone from §1.2 (one continuous section, filter bar + grid, matching Work hub's `WorkGridSection` structure — filter and grid are one `<section>`, not two). 12-col desktop grid, 3 cards per row (4 cols each), no asymmetric "featured" opener needed at this stage (only 3 items total — an asymmetric single-featured layout looks unbalanced with 2 leftover cards; revisit an asymmetric variant once article count clears ~6). Gap `32px` desktop / `24px` mobile.

**ArticleCard (new component, expands on the inline card markup currently duplicated in `InsightsPreview.tsx`):**
- `MediaFrame` cover image, `16/9`, tone-aware placeholder if no cover image supplied yet.
- Category `Tag` (bronze pill, reuse `components/ui/Tag.tsx` as-is).
- Title: H3, `font-display`, 2-line clamp.
- Below title, one of two footer treatments based on `status`:
  - **Published:** excerpt (1 line, Body/sm, `text-slate-deep`), then a `Caption`-size meta row: `{readTime} · {publishDate}`.
  - **Coming soon:** the `angle`/reference line (Caption, `text-slate-deep/70`, exactly the "Ref: …" treatment from `InsightsPreview.tsx`) plus a "Coming soon" `Tag`-style pill (outline, `border-slate-deep/30`, `text-slate-deep`, uppercase — reuse the exact classes already in `InsightsPreview.tsx:51`, do not invent a new pill treatment).

**Card link behavior:** Published cards are fully clickable (single-link-per-card pattern, same nested-link caution as Case Studies section on homepage) routing to `/insights/[slug]`. Coming-soon cards are **not links** — render as a `<div>` with the same visual card shape but no href, no hover-navigate affordance, since there is nothing to visit yet. This avoids a broken/empty-page click target. Optionally, coming-soon cards can be `aria-disabled` styled slightly muted (`opacity-90`, no hover-scale on the image) to visually signal non-interactivity, consistent with "do not overclaim."

**Responsive:**
- 1024: 3-per-row retained if container comfortably fits (~300px cards), else 2-per-row with 3rd wrapping left-aligned.
- 768: 2-col grid.
- 428/375: 1-col stacked, `24px` gap.

**Components:** `ArticleGrid` (wraps grid + filter bar as one section, parallel to `WorkGridSection`), `ArticleCard` (variants: `published` / `coming-soon`).

**Interaction/state notes:** Published card hover/focus: image scale 1.03, title color-shift to gold (matches homepage Insights Preview + Case Studies hover convention). Coming-soon card: no hover-navigate treatment (per above) — a static card, still passes AA contrast, still legible, just not a link.

### 1.4 CTA Band

Reuse `components/sections/CtaBand.tsx` as-is, `tone="on-ink"`, ink background (closes the page on ink, mirrors Work hub's closing CTA). Suggested copy direction (final copy owned by copywriter): headline about wanting the studio's thinking applied to the reader's business, primary CTA → `/contact`, secondary → `/contact#call`. Do not fabricate specific numbers/claims in this CTA copy.

---

## 2. Article Template (`/insights/[slug]`)

Single template, two rendering branches driven by `status`. **Never fabricate a fake body for a `coming-soon` entry** — the stub branch renders no prose at all, by design.

### 2.1 Shared Hero (both states)

**Layout:** Ink background, `96px`/`48px` vertical padding (shorter than hub hero — this page's real content is the article body, hero should not dominate). Content centered on a narrow measure, cols 3–10 (this is the one hub/article-level exception to left-aligned `SectionHeader` convention — long-form reading content benefits from a centered, book-like entry point; the homepage/section-level left-align rule governs marketing sections, not editorial article pages).

- Category `Tag` (bronze pill), centered, `16px` above title.
- Title: H1, `font-display`, `clamp(32px, 4vw, 56px)`, line-height 1.05, max 3 lines, centered.
- Meta row below title, `24px` gap, Caption size, `text-slate` on ink: for **published** → `Ayush Saini · {readTime} · {publishDate}`; for **coming-soon** → no byline (there is no author of an unwritten piece), instead a single line: `Coming soon — {angle reference}` styled identically to the hub card's Ref line, plus a `Tag`-style "Coming soon" pill.
- No cover image bleeding into the hero itself — cover image (published only) renders as the first element of the body column below, not behind the title, to keep title contrast reliable (avoids image-behind-text contrast risk flagged as an a11y baseline concern).

**Responsive:** 1024/768: cols narrow to full container width, still centered text block. 428/375: title drops to `clamp(28px, 9vw, 36px)`, meta row wraps to 2 lines if needed, still centered.

**Components:** `ArticleHero` (new).

### 2.2 Coming-Soon Body Branch

**Layout:** Ivory section immediately below hero (ink → ivory break). Full `Container` width, left-aligned (back to standard section convention once past the centered editorial hero) — same principle as `CaseStudyEmptyState`: no small centered bordered "apology" box.

Content: a short honest statement (Body-L, max 60ch) that this piece is announced but not yet published, framed the same confident way as the Meta Ads case-study fix in the creative review — state what the piece will cover (2–3 bullet-style talking points derived from the `angle`/reference, not padded filler), then a `Button` (`variant="secondary"`, `tone="on-ivory"`) linking back to `/insights` labeled "Browse Published Insights" (only shown if at least one published article exists — otherwise omit the button or point to `/contact`).

**Component:** `ArticleComingSoonBody` (new) — structurally the same idea as `CaseStudyEmptyState` (honest, full-width, left-aligned, no fabricated content) but for article stubs rather than case-study metrics; do not force-reuse `CaseStudyEmptyState` itself since its metric-row shape (3 dash-value stats) doesn't fit an article context — build a sibling component following the identical principle.

No "Related Articles" section renders on a coming-soon page if fewer than 2 other published articles exist (avoids an empty/near-empty related rail) — if 2+ published articles exist, show related per §2.4 using category match, excluding self.

### 2.3 Published Body Branch — Long-form Prose Layout

**Measure/line-length:** Body copy container max-width `72ch` (the standard readable prose measure — wider than the `60ch`/`70ch` used for shorter marketing paragraphs elsewhere on the site, since this is sustained reading, not a scannable pitch). Centered within `Container`, effectively cols 3–9 at 1920/1440 (narrower than the hero's 3–10 to keep body text tighter than the display headline).

**Typography treatment within body (semantic tokens, not raw px — extend existing type-scale tokens):**
- Body paragraph: `Body` token, `text-ink`, line-height 1.7 (looser than UI copy's 1.5–1.6, appropriate for sustained reading), `24px` space between paragraphs.
- H2 (major section break within article): `font-display`, `Body-L`-to-H3-range size, `text-ink`, `64px` top margin / `24px` bottom margin — reuses the same section-rhythm scale as the rest of the site (not an invented value).
- H3 (sub-section): `font-sans` bold or `font-display` at a smaller step than H2 (engineer/creative-director to confirm final numeric step against the type-scale token set — semantic intent: clearly subordinate to H2, still distinct from body weight), `40px` top margin / `16px` bottom.
- Blockquote: left border `4px solid` bronze (`border-bronze`), `24px` left padding, `font-display` italic-style Body-L size, `text-slate-deep`, no background fill (per gold/color-fill discipline — a blockquote is not the place for a gold treatment; bronze is correct here as it's structural/secondary, not an accent-on-a-real-number).
- Unordered/ordered lists: `Body` size, `1.7` line-height, `24px` left indent, `8px` gap between items, markers in `text-bronze` (not gold — gold stays reserved for hairlines/real numbers/state, list markers are decorative structure not a metric).
- Inline links within body copy: `text-ink underline underline-offset-4 decoration-slate-deep/40 hover:decoration-gold` — never a full gold text link (keeps gold restricted to accent/state per the established rule; the underline decoration may pick up gold on hover as a transient state change, consistent with how hairline borders are allowed to shift to gold on hover elsewhere).
- Cover image (if present): renders as the first block-level element in the body column, `MediaFrame` `16/9`, full measure width, `48px` bottom margin before body copy starts, with a `Caption`-size credit/alt line below if applicable.
- Pull-quote/stat callouts (optional, only if a real number is being cited): may use gold for the numeral specifically, following the exact same rule already applied to `WorkGridSection`'s result count (`font-display text-gold` on the number only, surrounding text stays `text-ink`/`text-slate-deep`) — this is the one place gold may appear in body copy, and only for a genuine cited figure, never decoratively.

**Rich content model (`RichContent[]`):** array of typed blocks — `{ type: "paragraph" | "h2" | "h3" | "blockquote" | "list", ordered?: boolean, items?: string[], text?: string }` — rendered by a single `ArticleBody` component mapping block type to the treatments above. Keep the model simple (no arbitrary embedded components/MDX complexity needed yet) since zero real articles exist — this can be upgraded to MDX later without changing the visual spec.

**Responsive:** 1024: measure holds at `72ch` but container narrows, effectively fills more of the available width — fine, `72ch` is a max not a fixed value. 768: same. 428/375: measure becomes fluid full-width minus outer margin (a `ch`-based measure naturally becomes near-full-width on narrow viewports), font sizes step down per standard mobile Body size, H2/H3 margins compress to `48px`/`32px` respectively to avoid excessive scroll on small screens.

**Components:** `ArticleBody`, `ArticleH2`, `ArticleBlockquote`, `ArticleList` (or one `ArticleBody` component internally switching on block type — engineer's call on componentization granularity, spec only requires the visual/spacing rules above be centrally defined once, not per-article).

**Accessibility:** Heading hierarchy inside body must nest correctly under the page H1 (H2 first, then H3 — never skip to H3 first). Body content region: `<article>` landmark wrapping hero-meta + body, with the H1 as its accessible name. Reading-progress or table-of-contents is **not required** for articles at this length/volume (optional future enhancement only if articles regularly exceed ~1500 words — flag, don't build now).

### 2.4 Related Articles

**Layout:** Ivory section (if body was ivory) or ink (alternate for rhythm — recommend ink here to bookend against the CTA band that follows on ivory, avoiding 2 consecutive ivory sections: hero-ink → body-ivory → related-ink → cta-ink is fine since related+cta being both ink is acceptable per the "no more than 2 consecutive without a break" rule, or insert a hairline `border-t` between them as the required break). `SectionHeader` "More Field Notes", left-aligned, cols 1–6. Below: up to 3 `ArticleCard`s (same component as hub grid, `published` variant only — never show a coming-soon card in a related rail, since a reader mid-article shouldn't be routed to a dead end), selected by matching `category`, excluding the current article, falling back to most-recent-published if fewer than 3 same-category matches exist.

**Empty state:** if zero other published articles exist yet, omit this section entirely (return `null` from the component) rather than rendering an empty grid or a "coming soon" filler here — this section only appears once there's something real to relate to.

**Components:** `RelatedArticles` (wraps `ArticleGrid`'s card rendering, reused, not duplicated).

### 2.5 CTA Band

Reuse `components/sections/CtaBand.tsx`, `tone="on-ink"`, standard closing pattern (matches every other page).

---

## 3. Component Inventory Summary (new components to build)

| Component | Purpose | Reuses |
|---|---|---|
| `InsightsHero` | Hub page hero | `Container`, `SectionHeader` primitives |
| `ArticleGrid` | Filter bar + card grid, hub page | `FilterChip`, `ArticleCard`, pattern-matches `WorkGridSection` |
| `ArticleCard` | Grid card, `published`/`coming-soon` variants | `MediaFrame`, `Tag` |
| `ArticleHero` | Article template hero, both states | `Tag` |
| `ArticleComingSoonBody` | Honest stub-state body | Same principle as `CaseStudyEmptyState`, sibling not reuse |
| `ArticleBody` | Long-form prose renderer for `RichContent[]` | New, houses H2/blockquote/list treatments |
| `RelatedArticles` | Related rail on article page | `ArticleGrid`'s card logic, `SectionHeader` |

New data file: `lib/insights-data.ts` (mirrors `lib/case-studies-data.ts` shape: array of articles + derived `categoryFilters` list).

**Accessibility baseline reminder (applies throughout, per homepage §0):** every filter chip keyboard-operable with visible focus ring; every card either a genuine link (published) or a non-interactive static block (coming-soon) — never a link to nowhere; heading hierarchy correct (H1 article title → H2/H3 within body, never skipped); `aria-live="polite"` on the hub's result-count region; contrast checked on all text/background pairs per WCAG 2.2 AA, including the muted "coming soon" pill treatments which must still hit 4.5:1 despite being intentionally subdued.
