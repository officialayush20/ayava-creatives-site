# Ayava Creatives — Industries Hub Layout Spec (`/industries`)
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft

Inherits all Foundations from `homepage-layout-spec.md` §0 (grid, spacing scale, breakpoints, section rhythm, color usage baseline, type scale, accessibility baseline) and the corrections logged in `homepage-creative-review.md` / `service-contact-creative-review.md`. Applied corrections baked into this spec from the start (not left for a review pass):

- Gold restricted to hairlines and real numeric values only — never a card-fill, never a full-perimeter border, never a decorative accent on non-numeric content.
- No decorative numbering (no "01–10" numerals on industry tiles).
- Ink/ivory alternation with no two consecutive sections sharing a tone without a hairline/spacing break.
- `SectionHeader` default `align="left"` (center-align is a flagged inconsistency site-wide — do not use `align="center"` on this page).
- No pricing-table "featured card" cliché anywhere on this page (does not apply directly — no pricing here — but the same fill+border+lift pattern must not be reused for any "featured industry" treatment; all 10 tiles are visually equal weight, no featured tile).

**Route:** `/industries` — single static-content page (not CMS-templated like the 15 service pages), but the 10-item grid should still pull from the shared `industries[]` data model (same source of truth as homepage §7 `IndustryGrid` and the individual industry-page template) rather than being hand-duplicated content.

---

## Page Structure (3 sections)

1. Hub Hero
2. Industries Grid (10 items)
3. CTA Band

Background rhythm: ink (Hero) → ivory (Grid) → ink (CTA Band). Clean alternation, no adjacency issue.

---

## 1. Hub Hero

**Purpose:** Short, index-page framing. This is NOT a re-run of the homepage cinematic hero (no full-viewport height, no `HeroCanvasSlot`, no stat ticker) and NOT redundant with the homepage's "Industries We Dominate" section teaser copy — this hero should frame the hub as "pick your vertical" wayfinding, distinct value prop: depth per industry, not just breadth.

**Layout:** Ink background, breadcrumb row at top (`Home / Industries`, `Industries` not a link, `aria-current="page"`) — reuse `Breadcrumb` component from service-page template. Content: NOT the 7/5 asymmetric split used elsewhere (no visual media slot needed for an index page) — single column, cols 1–8, left-aligned. Height: content-driven, `~40vh` desktop min (shorter than both homepage hero and individual service-page hero, since this page's real content is the grid below).

- Eyebrow label: "Industries"
- H1: index-framing headline distinct from homepage's industries teaser — e.g. framing around "we don't run one playbook across ten verticals" (exact copy = copywriter's call, framing brief only: this headline should promise vertical-specific depth, not restate the homepage's one-liner)
- Body-L subhead, max-width 60ch, col 1–7
- No CTA buttons in the hero itself (the grid below is the primary navigation; a CTA band closes the page instead of duplicating "Start Your Project" this high up)

**Responsive:**
- 1920/1440: as above.
- 1024/768: unchanged proportionally, text block cols 1–8 of the 8-col grid, `~32vh` min height.
- 428/375: headline `clamp(28px, 8vw, 36px)`, breadcrumb stays single-level (no truncation needed, path is short).

**Components:** `IndustriesHubHero` (new, thin wrapper — reuses `Breadcrumb`, plain H1/Body-L, no new visual primitives), `Breadcrumb` (reused from service template).

**Interaction/state notes:** Static, no interaction beyond breadcrumb link hover/focus (standard underline + focus ring). No entrance choreography required beyond standard scroll-fade-in if the page-level motion system applies one uniformly.

**Content slots:** `hubHeadline`, `hubSubhead` — copywriter to draft, framing brief above. SEO: this H1 should carry the primary "industries we serve" / "marketing agency for [vertical]" intent target — coordinate exact phrasing with seo-strategist since this is a page seo-strategist will want to own for a broad head-term.

---

## 2. Industries Grid (10 items, full copy reuse)

**Layout:** Ivory background. `SectionHeader` cols 1–6, `align="left"`, eyebrow "All Industries" + H2 (short, e.g. "Ten verticals. Ten different playbooks." — copywriter's call, must not duplicate the Hero H1 verbatim). Below: reuse homepage `IndustryGrid`/`IndustryTile` components as-is per the task's "reuse components/ui/* as-is" instruction, but this is the FULL 10-tile version (not the 3–5-item filtered subset used on service pages) and each tile is now a real navigable link to `/industries/[slug]`, not a decorative homepage teaser tile.

Grid: fixed 5-column CSS grid at desktop (independent of 12-col text grid, per homepage §7 precedent), `16px` gap. Each `IndustryTile`: background image/texture, industry name overlay bottom-left, hover-reveal 1-line hook caption on desktop.

**Content mapping — reuse the one-line hook copy verbatim from `homepage-copy.md` §7 "Industries We Dominate," do not rewrite:**

| # | Industry | Slug | Hook copy (verbatim from homepage-copy.md) |
|---|---|---|---|
| 1 | Real Estate | `real-estate` | "Sell the property before the site visit." |
| 2 | D2C / E-commerce | `d2c-ecommerce` | "Turn one-time buyers into repeat revenue." |
| 3 | Healthcare | `healthcare` | "Build trust before the first appointment is booked." |
| 4 | Hospitality & Travel | `hospitality-travel` | "Convert browsing into bookings, not just wishlists." |
| 5 | FinTech | `fintech` | "Explain complex products in language regulators and users both accept." |
| 6 | Fashion & Luxury | `fashion-luxury` | "Protect brand equity while still performance-marketing." |
| 7 | EdTech | `edtech` | "Turn curiosity into enrollment, and enrollment into completion." |
| 8 | SaaS / Tech | `saas-tech` | "Sell to operators who research before they ever talk to sales." |
| 9 | Automotive | `automotive` | "Move buyers from research tab to showroom floor." |
| 10 | F&B / QSR | `fnb-qsr` | "Fill tables and app orders on the same week's budget." |

Slugs above are the recommended route param for Part B's individual industry-page template (`/industries/[slug]`) — confirm final slugs with frontend-engineer/seo-strategist before implementation, but this is the sane default mapping.

**No decorative numbering:** tiles are NOT labeled 1–10 visually (unlike a service card's `01–15` treatment which was already flagged as an area to watch — do not introduce numbering here at all; industries are not a sequence, ordering is arbitrary/alphabetical-or-blueprint-order and should not imply rank or process-step).

**Responsive:** identical collapse pattern to homepage §7 `IndustryGrid`:
- 1024: 4 cols × 3 rows (last row 2 tiles, left-aligned not stretched/centered).
- 768: 3 cols, wraps to 4 rows.
- 428/375: 2 cols × 5 rows, gap `12px`, tiles 1:1 aspect ratio, caption always-visible (no hover-gate on touch).

**Components:** `IndustryGrid` (reused, full 10-item mode — same component service pages use in subset mode, just fed the complete list), `IndustryTile` (reused), `SectionHeader` (reused, `align="left"`).

**Interaction/state notes:** Identical to homepage §7 — hover (desktop): image scale 1.05, gradient overlay intensifies, caption fades in; focus mirrors hover; each tile is a real `<a href="/industries/{slug}">` (not a homepage teaser button) with `aria-label="{Industry name} — {hook line}"`. Standard 2px focus ring, gold-on-ink is not applicable here (ivory background) — use ink focus ring per accessibility baseline. No loading/error/empty state needed (fully static, all 10 items always present).

**Content slots:** `sectionEyebrow`, `sectionHeadline` (H2, distinct from Hero H1) — copywriter. All 10 tile hook lines: reuse verbatim from `homepage-copy.md` §7, do not rewrite (per task instruction). Representative imagery per industry — creative-director/asset sourcing, same imagery set as homepage §7 tiles may be reused here for consistency (same tiles, now linking somewhere real instead of being decorative).

---

## 3. CTA Band

**Layout:** Ink background, reuse homepage `CTABand` component as-is. `128px`/`64px` padding, content centered, max-width col 3–10. H2 statement + short supporting line + single primary CTA button routing to `/contact`.

Do not introduce a secondary "Book a Call" link if the homepage CTA Band doesn't have one by then — keep this band's component identical to the reused pattern, only copy differs.

**Responsive:** identical to homepage §13 — typographic clamp scaling, buttons stack full-width at 428/375.

**Components:** `CTABand` (reused, homepage inventory), `Button` (reused).

**Interaction/state notes:** Standard button states (default/hover/focus/active), per accessibility baseline.

**Content slots:** CTA headline (industry-agnostic since this is the hub page, not a specific vertical — e.g. framing around "tell us which vertical, we'll bring the playbook," exact copy = copywriter), supporting line, button label ("Start Your Project" or equivalent, reuse site-wide CTA label convention) + href to `/contact`.

---

## Component Inventory Summary (this page)

**New:** `IndustriesHubHero` (thin wrapper only — no new visual primitives).
**Reused as-is:** `Breadcrumb`, `SectionHeader` (`align="left"`), `IndustryGrid`, `IndustryTile`, `CTABand`, `Button`.

No new components beyond the single hero wrapper — this page is intentionally a thin, mostly-reused-component assembly since its job is navigation, not new content density.

---

## Accessibility Notes (page-specific, beyond baseline)

- Landmark structure: 3 `<section aria-labelledby>` regions per accessibility baseline in `homepage-layout-spec.md` §0.
- The 10-tile grid must expose an accessible name per tile combining industry + hook line (see `aria-label` note above) since the hook line is the actual value proposition, not decorative — a screen-reader user tabbing through tiles by name alone would miss the entire point of the page.
- Page `<title>` / H1 should clearly signal this is the industries index, distinct from any individual industry page title, for screen-reader users navigating via headings/landmarks list.

---

## SEO/Content Notes (for seo-strategist/copywriter handoff)

- This page is a natural target for broad "[agency] for [industry]" / "industries we serve" head-term intent — H1 and eyebrow copy should be written with that in mind, distinct from the more specific long-tail intent each individual industry page (Part B) will target.
- Each `IndustryTile` link should use real anchor text (industry name, not "Learn More") for internal-linking SEO value into the 10 individual industry pages.
- Consider a `BreadcrumbList` JSON-LD schema on this page matching the visual `Breadcrumb`, consistent with schema treatment already required on service pages' FAQ section.
