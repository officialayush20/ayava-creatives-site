# Ayava Creatives — Services Hub (`/services`) Layout Spec
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft

This page inherits all Foundations from `homepage-layout-spec.md` §0 (12-col grid, breakpoint table, spacing scale, section rhythm, color usage baseline, type scale, accessibility baseline) and reuses the component inventory from that doc and `service-page-layout-spec.md` — not restated in full below. Applies the gold-restriction and background-alternation corrections documented in `homepage-creative-review.md` and `service-contact-creative-review.md` from the start, rather than shipping the violation and fixing it later.

**Route:** `/services` — static index page, one build, links out to `/services/[slug]` (15 entries; only `/services/meta-ads` currently resolves, the other 14 are real routes that 404 until built — no placeholder-disabled styling, no "coming soon" treatment on the links themselves).

**Fixes required in existing code as part of this build:** `components/sections/ServicesShowcase.tsx:37` hardcodes `href="/services"` on every card — this is the homepage teaser grid, not this page, but the same defect must not be repeated here. Every `ServiceCard` on this hub page must link to its actual `/services/[slug]` destination.

---

## Grouping decision — GROUPED, not flat. Definitive call.

Flat 15-item grid is the right call for the *homepage teaser* (`ServicesShowcase`), where the job is "prove range fast, in one scroll, inside a page about something else." It is the wrong call for this page. The hub page's entire job is wayfinding — a visitor arrived because they want *one specific thing* (or a cluster of related things), and 15 undifferentiated cards in a row force them to read all 15 one-line descriptions serially to find it. That's the definition of poor scannability, and repeating the homepage's exact card treatment here would also read as a re-skinned duplicate of a section the visitor may have just scrolled past.

**Decision: 4 named category groups**, each its own `<section>` with its own `SectionHeader`, in this fixed order:

1. **Paid Media** — Meta Ads, Google Ads
2. **Organic & Content** — SEO, Content Marketing, Social Media Marketing (SMM)
3. **Brand & Creative** — Branding, Video & Motion Production, Website Design
4. **Growth Systems** — Email/CRM Marketing, Analytics/CRO, E-commerce Growth, AI Marketing, App Store Marketing/ASO, Influencer Marketing, PR/Reputation Management

Rationale for this exact split (per the four options given in the brief): Paid Media and Organic & Content are the two channel-execution categories buyers search for by name ("meta ads agency," "SEO services") — keeping them separate instead of merging into one "Marketing Channels" bucket preserves that search-intent legibility. Brand & Creative groups the three visually/asset-driven disciplines that typically get briefed together. Growth Systems is intentionally the largest bucket (7 services) because these are the "systems and infrastructure" services that are harder to self-select without more context — grouping them together under one framing header does real work (see copy below) rather than just being a leftover pile.

This also solves the monotony problem named in the review docs: four groups of 2/3/3/7 items naturally produce four *different* grid shapes (a 2-up row reads nothing like a 7-up wall), which is real layout variation, not just a cosmetic label change on an identical grid.

---

## 1. Hero — Short, Confident, Non-Redundant

**Layout:** Ink background. NOT full-viewport — this is a wayfinding page, shorter than homepage's cinematic hero and shorter than a service page's outcome hero (which at least frames one service). Height: content-driven, roughly 40–48vh desktop, no `HeroCanvasSlot`, no stat ticker — those belong to the homepage and would be redundant here. Breadcrumb row at top (`Home / Services`, current page `aria-current="page"`, not a link), same treatment as `service-page-layout-spec.md` §1.

Content: centered, narrow column, cols 3–10 (not the asymmetric 7/5 split used on homepage/service-page heroes — this page has no adjacent visual asset to balance against, and a centered short statement reads as an index/directory rather than a pitch). Eyebrow label ("Services"), H1 (short — 4–8 words, framing not selling; homepage hero already made the range-and-ambition argument in "Marketing, engineered like infrastructure" and the Services Showcase subhead already said "the 15 systems... from Meta Ads to CRO to AI marketing" — this H1 must not restate that). Suggested direction for copywriter: something that frames the page as a menu/starting point rather than a claim, e.g. "Fifteen services. Pick your starting point." or "Where to begin." — short, no subhead-length restating of the homepage pitch. One short supporting line (max 1 sentence, ≤14 words) is permitted below the H1 if it adds wayfinding value (e.g. "Grouped by what you're trying to fix first."), not brand voice repetition. No CTA buttons in the hero — the entire rest of the page is the CTA (each card is a link); a hero CTA row here would just duplicate the first group below the fold for no reason.

**Responsive:**
- 1920/1440: as above, centered cols 3–10.
- 1024/768: centered, full-width of the 8-col container, breadcrumb unchanged.
- 428/375: H1 `clamp(28px, 8vw, 40px)`, breadcrumb truncates if needed, supporting line (if present) wraps naturally, no stacking needed since there are no buttons.

**Components:** `ServiceHero` (reused from service-page template, but rendered without `ServiceHeroVisual` slot and without CTA row — flag to engineer: either add an `variant="index"` prop to the existing `ServiceHero` that omits the visual-slot column and CTA row and switches the text block to centered cols 3–10, or use `Breadcrumb` + a lighter-weight `PageHero` wrapper if reshaping `ServiceHero` is more invasive than it's worth — recommend the prop approach since `Breadcrumb` + heading rhythm should stay identical across all subpages), `Breadcrumb` (reused).

**Interaction/state notes:** Static, no interaction. Breadcrumb link hover/focus per standard.

**Content slots:** H1 copy (per above, copywriter to finalize exact wording — direction given, not dictated), optional 1-line supporting text, breadcrumb.

---

## 2. Category Groups (4 sections, ivory/ink alternating)

Each of the four categories is its own `<section aria-labelledby="{category}-heading">`, giving four independent landmarks a screen-reader user can jump between — critical on a directory page where "skip to the group I want" is the primary navigation pattern, not "read linearly."

**Background alternation (fixes the ink-hero-into-ink-group defect proactively):** Hero is ink. Group 1 (Paid Media) → ivory. Group 2 (Organic & Content) → ink. Group 3 (Brand & Creative) → ivory. Group 4 (Growth Systems) → ink. This gives a clean ink/ivory/ink/ivory/ink rhythm across hero+4 groups with no two adjacent sections sharing a background, and ends the group sequence on ink so the closing CTA band (§3, ivory per the homepage-review's CTA-band inversion ruling) reads as a deliberate final light beat rather than more of the same dark run.

**Section header per group:** `SectionHeader`, eyebrow = the category name in the label slot is redundant with the H2 title itself being the category name — recommend eyebrow = a 2–4 word framing phrase (e.g. eyebrow "Category 01 of 04" is tempting but reintroduces a decorative-numbering pattern into the eyebrow slot; avoid it — use eyebrow = short descriptor instead, e.g. Group 1 eyebrow "Paid Acquisition", H2 title "Paid Media", or fold framing into the H2 alone and skip the eyebrow for these four headers). Recommend: H2 = category name exactly as listed above, eyebrow = one short clause naming the shared outcome of that group, authored by copywriter (not invented here) — e.g. directionally "Spend that's traced to revenue" for Paid Media, "Own the channels you don't rent" for Growth Systems. Tone matches `tone` prop of whichever background the section sits on (`on-ivory` groups get `tone="on-ivory"`, `on-ink` groups get `tone="on-ink"` — this is the exact bug flagged in `service-contact-creative-review.md` §6 item 14; confirm the `SectionHeader` fix (explicit `text-ink`/`text-ivory` per tone) is live before this page ships, since this page has more tone-alternating headers in sequence than any page built so far).

**No gold numerals anywhere in this section.** Per both creative reviews, gold is reserved for hairlines/focus states/real metrics only. Do not number the groups (no "01 Paid Media"), do not number the cards within a group. If a card needs a visual anchor beyond its name, use an icon slot (see `ServiceCard` below) — never a gold ordinal. This applies even though the homepage's `ServicesShowcase` still numbers cards in slate (post-review-fix) — slate ordinals are acceptable there as an inherited pattern; do not introduce a *gold* ordinal fresh on this page, and prefer dropping numerals from these cards entirely rather than copying even the slate-numeral pattern, since four separate groups of differently-sized card counts make sequential 01–15 numbering meaningless/confusing across group boundaries anyway (numbering would have to restart per group or fake a global count — simplest fix: no numbers on hub cards at all).

### Card component: reuse `ServiceCard`, new `compact` variant

Reuse the `ServiceCard` component and visual language established in `ServicesShowcase.tsx` (border-hairline card, `hover:border-gold`, name + description, arrow reveal on hover) — do not invent a new card component, per the instruction to reuse the pattern where it fits. It fits, with three required changes from the homepage instance:

1. **Real hrefs, not `/services`.** Each card's `href` = `/services/{slug}`. Meta Ads → `/services/meta-ads` (real page). The other 14 → their eventual slugs (`/services/google-ads`, `/services/seo`, `/services/content-marketing`, `/services/smm`, `/services/branding`, `/services/video-motion`, `/services/website-design`, `/services/email-crm`, `/services/analytics-cro`, `/services/ecommerce-growth`, `/services/ai-marketing`, `/services/aso`, `/services/influencer-marketing`, `/services/pr-reputation` — engineer/PM to confirm final slug spelling matches whatever slug convention is used when those pages are eventually built, so links don't need rewriting later; use the same slug the Meta Ads page already established as the pattern: lowercase, hyphenated, no service-category prefix).
2. **No number badge** (see above — drop the `<span>{number}</span>` slot entirely for this page's card instance; add a `showNumber?: boolean` prop defaulting to `true` so the homepage instance is unaffected, hub page passes `showNumber={false}`).
3. **Compact sizing.** Group 4 (Growth Systems) has 7 items — at the homepage's `min-h-[280px]` card size that's a very tall section. Add a `compact` size variant: `min-h-[160px]` desktop (matches the mobile min-height already used on homepage), tighter internal padding (`p-6` instead of `p-8`), used for all four hub groups (all groups use `compact`, not just the large one, so card size is visually consistent across the page — only the grid column-count varies per group, not card height).

**Grid per group (12-col desktop):**
- **Group 1 — Paid Media (2 items):** 2 cards, `md:col-span-6` each — a full-width 2-up row, no featured/asymmetric tile (asymmetric 6/6-vs-uneven only matters when count is odd/large; 2 clean halves is the correct read here, and echoes the homepage's use of 6-col spans elsewhere without literally reusing the "one featured tile" pattern).
- **Group 2 — Organic & Content (3 items):** 3 cards, `md:col-span-4` each — even 3-up row.
- **Group 3 — Brand & Creative (3 items):** 3 cards, `md:col-span-4` each — even 3-up row (same shape as Group 2 is fine since they're separated by an ink section between them; visual rhythm break comes from the background alternation, not forced grid variance within a 3-item group).
- **Group 4 — Growth Systems (7 items):** `md:col-span-3` each → 4-per-row grid, wrapping to a partial last row (3 cards on row 2, left-aligned not stretched/centered — do not force-stretch the last row to fill 4 columns, matches the "last row left-aligned" convention already used for `IndustryGrid` at 1024 in the homepage spec).

Gap: `24px` desktop, `20px` tablet, `16px` mobile (matches homepage §3 gap scale exactly, per spacing-scale reuse rule).

**Responsive (per group, all groups follow this pattern applied to their own item count):**
- 1920/1440: as specified per group above.
- 1024: Group 1 unchanged (2-up fits easily at 944px). Groups 2/3 stay 3-up if the 944px container supports ~300px cards at `compact` size (it does, matches homepage §3's 1024 allowance) — else drop to 2-up + 1 wrapping, left-aligned. Group 4 drops from 4-per-row to 3-per-row (last row: 1 card, left-aligned).
- 768: Group 1 stays 2-up (halves of an 8-col grid, `col-span-4` each). Groups 2/3 drop to 2-up + 1 wrapping. Group 4 drops to 2-per-row (4 rows, last row 1 card).
- 428/375: all groups become 1-per-row, full-width stacked cards, gap `16px`, `compact` card min-height reduces to `140px` (tighter than the desktop 160px since single-column mobile cards don't need to compete visually with siblings beside them).

**Components:** `ServicesGrid` (reused, parameterized per group's item count/column-span rather than hardcoded to homepage's 15), `ServiceCard` (reused, extended with `showNumber` and `size="compact"` props as specified above), `SectionHeader` (reused, tone alternating per group background as specified above).

**Interaction/state notes:** Identical to homepage §3 `ServiceCard` — hover: border animates to gold (1px hairline only, not a fill — consistent with the review's ruling against `bg-white`/full-gold-border card fills on Meta Ads Pricing), arrow slides right 4px and reveals from `opacity-0`. Focus mirrors hover for keyboard nav, each card is a real `<a>` (Next.js `Link`), one tab stop per card, `aria-label` = `"{service name} — {one-line outcome copy}"`. Active/pressed: `scale-[0.98]`. No loading/error/empty states (static content, all 15 services always render regardless of whether their destination page exists yet — a 404 on click is an acceptable, expected state for the 14 unbuilt pages per task scope, not something this page's UI needs to signal in advance with disabled styling).

**Content slots (per card, all 15):** service name + one-line outcome copy — **reuse verbatim from `homepage-copy.md` §3 "Services Showcase," do not rewrite.** Mapped to groups:

| Group | Service | Copy (verbatim from homepage-copy.md) | Slug |
|---|---|---|---|
| Paid Media | Meta Ads | Every rupee of ad spend traced back to a rupee of revenue. | `/services/meta-ads` (real) |
| Paid Media | Google Ads | Capture demand at the exact second someone searches for you. | `/services/google-ads` |
| Organic & Content | SEO | Rank where buyers look first, not where algorithms feel generous. | `/services/seo` |
| Organic & Content | Content Marketing | Content built to compound in search and shareability, not just publish and disappear. | `/services/content-marketing` |
| Organic & Content | Social Media Marketing (SMM) | Turn scrolling into a scheduled habit around your brand. | `/services/smm` |
| Brand & Creative | Branding | A visual and verbal identity competitors can't casually copy. | `/services/branding` |
| Brand & Creative | Video & Motion Production | Motion that earns the first three seconds and keeps them. | `/services/video-motion` |
| Brand & Creative | Website Design | A site engineered to convert visitors on the first scroll, not the fifth. | `/services/website-design` |
| Growth Systems | Email/CRM Marketing | The channel you own, engineered to outperform the channels you rent. | `/services/email-crm` |
| Growth Systems | Analytics/CRO | Decisions made on data, not on whoever pitched loudest in the meeting. | `/services/analytics-cro` |
| Growth Systems | E-commerce Growth | Every step of the funnel audited until checkout stops leaking revenue. | `/services/ecommerce-growth` |
| Growth Systems | AI Marketing | Automation that scales judgment, not just tasks. | `/services/ai-marketing` |
| Growth Systems | App Store Marketing/ASO | Ranked higher, installed more, uninstalled less. | `/services/aso` |
| Growth Systems | Influencer Marketing | Borrowed trust, deployed with the same rigor as paid media. | `/services/influencer-marketing` |
| Growth Systems | PR/Reputation Management | Control the narrative before the internet writes it for you. | `/services/pr-reputation` |

Group order within Growth Systems above (Email/CRM, Analytics/CRO, E-commerce Growth, AI Marketing, ASO, Influencer, PR) follows the order given in the task brief — no reordering needed.

---

## 3. CTA Band

**Layout:** Reuse the `CtaBand` component exactly as corrected in `homepage-creative-review.md` §4B — `bg-ivory`, no `border-t`, primary button via `Button` `tone="on-ivory"` (ink-fill). This is the same component instance used on the homepage, not a new one — do not build a second CTA band component. Content cols 3–10, centered, per that spec.

**Placement rationale:** Since Group 4 (the last category group) is ink, an ivory CTA band closes the page on the same "full-bleed ivory slab after a dark run" beat the homepage review specifically validated as the strongest structural move available — reusing a proven pattern rather than inventing a new closing treatment.

**Responsive:** Identical to `homepage-layout-spec.md` §13 (typographic clamp scaling, buttons stack full-width at 428/375 with `16px` gap).

**Components:** `CtaBand` (reused, unmodified), `Button` (reused).

**Interaction/state notes:** Standard button states, per `Button.tsx`'s existing implementation (already tone-aware, already reviewed/approved).

**Content slots:** Headline should be distinct from the homepage's CTA band ("Your next campaign shouldn't be a guess.") since a returning-in-session visitor may see both — direction for copywriter: something that closes the "you just browsed 15 options" moment, e.g. "Not sure which one you need? Start with a conversation, not a menu." Primary CTA → `/contact` (per task scope), label reuse "Book Strategy Call" or "Talk Through Your Goals" (copywriter to confirm against Contact page's actual intake-form entry copy for consistency — `IntakeForm.tsx` per `service-contact-creative-review.md` is the destination flow). No secondary CTA needed here (homepage already offers the two-tier "Get Free Audit" / "Book Strategy Call" choice; this band can be single-CTA to keep the closing moment decisive rather than repeating that same choice a third time on the visitor's path).

---

## Full Page Section Sequence (background rhythm summary)

`Hero (ink) → Paid Media (ivory) → Organic & Content (ink) → Brand & Creative (ivory) → Growth Systems (ink) → CTA Band (ivory) → Mega-Footer (ink, reused unmodified)`

No two adjacent sections share a background. Gold appears only on hover/focus hairlines and on `hover:shadow-[0_0_0_1px_var(--color-gold)]` per `Button.tsx`'s existing primary treatment in the CTA band — zero gold ordinals, zero gold fills, consistent with both creative-review documents.

---

## Cross-Section Notes for Engineer

1. **New/extended components required:** `ServiceCard` gets two new optional props (`showNumber?: boolean` default `true`, `size?: "default" | "compact"` default `"default"`) — extend the existing component in `components/sections/ServicesShowcase.tsx`'s `ServiceCard`, or better, extract `ServiceCard` into `components/ui/ServiceCard.tsx` as a standalone reusable component now that a second page needs it with variant props, and have both `ServicesShowcase.tsx` (homepage) and this new hub page's group sections import the shared component — avoids drift between two copy-pasted card implementations. `ServiceHero` gets an optional `variant?: "default" | "index"` prop per §1 above (omits visual slot + CTA row, centers text block).
2. **New page-level component:** `ServiceCategorySection` (new) — thin wrapper taking `{ eyebrow, title, headingId, tone, services[], columns }` so the four group sections share one implementation rather than four hand-built one-off sections; reduces the risk of the four groups drifting out of sync on spacing/props over time.
3. **Slug convention lock-in:** the 14 not-yet-built slugs listed in the content table above should be treated as the canonical slugs once those pages are built — if a different slug is chosen later during actual page build-out, this hub page's links must be updated to match (single source of truth should be a shared `services` data file/constant, not slugs hardcoded independently in two places — recommend extracting a shared `lib/services-data.ts` with `{name, slug, description}[]` that both `ServicesShowcase.tsx` and this hub page import, replacing the two currently-independent hardcoded arrays).
4. **Landmark structure:** Hero + 4 category sections + CTA band = 6 `<section aria-labelledby="...">` regions total on this page, each with its heading `id` matching, per the accessibility baseline.
5. **No STUB DATA on this page** — all copy sources from already-approved `homepage-copy.md` service lines verbatim; no new placeholder content, no new metrics, no new claims introduced.
