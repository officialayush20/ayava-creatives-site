# Ayava Creatives — Legal Page Template Layout Spec (Privacy Policy / Terms of Service)
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft

This is deliberately a lightweight spec — legal pages are a content-formatting problem, not a design problem. One shared template renders both `/privacy` and `/terms` (route slugs to be confirmed with `MegaFooter.tsx`, which currently promises "Privacy Policy" and "Terms of Service" as the two Legal-column links and a duplicate "Privacy"/"Terms" pair in the bottom bar — both link sets must point at these two real routes once built; they currently point at `href="#"`).

Applies the shared grid/spacing/type/a11y baseline from `docs/homepage-layout-spec.md` §0. Reuses `Container`, `SectionHeader`-style heading treatment (not the full `SectionHeader` component, since this page has no eyebrow/action-link pattern to speak of — a simpler heading block, see §1). No gold usage anywhere on this template — there are no real numbers, CTAs, or interactive states here worth an accent; keep it entirely ink/bronze/slate, gold-free by design (the most disciplined possible application of the "gold is earned, not decorative" rule is to use zero gold on a page that has nothing to earn it with).

---

## 0. Critical content-status requirement

**No real legal content exists yet.** Both pages must render an unmissable, impossible-to-mistake-for-final draft-status banner at the very top of the body content, above the table of contents, until real counsel-reviewed copy replaces it. This is not optional and not a subtle footnote — legal pages with placeholder text are a real liability if a visitor or crawler treats them as binding.

**`DraftNotice` component:**
- Full-width band, `bg-ink` regardless of the rest of the page's background (this is the one deliberate high-contrast interruption on an otherwise quiet page), `border-y border-bronze` (1px, top and bottom, structural not accent).
- Content: a small warning-style icon or simply bold label text — "DRAFT — PENDING LEGAL REVIEW" (`font-sans`, uppercase, `tracking-[0.14em]`, `text-ivory`, bold weight) — followed by one plain-language sentence: "This page is placeholder content for structural/design purposes only. It has not been reviewed by counsel and must not be treated as Ayava Creatives' actual privacy/terms policy until replaced with reviewed copy."
- Padding `24px` vertical, `Container` horizontal.
- **This banner must be trivially removable** — implemented as a single conditional block (e.g. a `draftStatus: "draft" | "final"` prop/flag on the page) so that flipping it off once real content lands is a one-line change, not a re-build. Do not hardcode the warning text inline with the rest of the body such that removing it risks touching real content.
- No dismiss/close control — this is not a cookie-banner-style dismissible notice, it must persist on every view including for returning visitors, since its purpose is legal-status signaling, not UX politeness.

---

## 1. Shared Template Structure

### 1.1 Hero

**Layout:** Ink background, `96px`/`48px` vertical padding (short, utility hero — same proportion logic as the Insights article hero, this page's substance is the body text, not the hero). `Container`, left-aligned, cols 1–8.

- Eyebrow: "Legal" (`text-xs uppercase tracking-[0.18em] text-slate`).
- H1: page title — "Privacy Policy" or "Terms of Service" (`font-display`, `clamp(32px, 4vw, 56px)`, same scale as Insights article H1 — legal pages and article pages share a "utility long-form page" H1 treatment, distinct from marketing-section H2s).
- "Last updated" line directly below H1, `16px` gap: `Caption`/small `Body` size, `text-slate`, format "Last updated: {Month D, YYYY}" — while status is `draft`, this line instead reads "Draft — not yet published" (do not print a fabricated "last updated" date on unreviewed content; a date implies the content was actually finalized/reviewed on that date, which would be false).

**Responsive:** Standard clamp scaling. 428/375: full-width text block.

**Components:** Reuses the same lightweight heading-block pattern as `ArticleHero`'s meta row (Insights spec) but left-aligned rather than centered — legal pages are reference documents to scan, not editorial pieces to read start-to-finish, so left-aligned + scannable (with a TOC, see §1.3) is the correct pattern here, distinct from the article template's centered editorial hero.

### 1.2 Draft Notice

`DraftNotice` component, per §0, renders immediately after the hero, full-width, before the body/TOC begins.

### 1.3 Table of Contents (conditional)

**When to show:** only if the document has more than ~5 top-level (H2) sections — both Privacy and Terms will very likely exceed this in their real final form, so plan for it to render by default; but the template must support a document short enough not to need it (early draft stub content may have only 2–3 placeholder sections).

**Layout:** Ivory background begins here (ink hero+notice → ivory body zone, one clean break). `Container`, cols 1–4 as a sidebar on desktop (1440/1920/1024), body text cols 5–12. On 768 and below, TOC collapses to a simple non-sticky block above the body (not a sidebar — no room), rendered as a plain vertical list, not an accordion (matches the "no unnecessary interaction cost" principle already applied to the footer spec).

- TOC sidebar is `sticky` positioned (`top: 96px` to clear header) on desktop only, so it stays visible while scrolling the long body — standard reference-document pattern.
- Each TOC entry: `font-sans text-sm`, `text-slate-deep` default, jumps to the matching `<h2 id="...">` anchor via `<a href="#section-id">`. Active-section state (whichever H2 is currently in viewport) gets `text-ink` + `border-l-2 border-bronze pl-3` (a structural left-rule indicator, not a gold accent — this is navigational state, not a "real number," so bronze is correct per the gold-discipline rule).
- Numbers before each TOC entry (1, 2, 3…) may be `text-slate-deep`, plain, never gold — these are outline numerals, not metrics.

**Components:** `LegalToc` (new) — internally just a `<nav aria-label="Table of contents">` with an `<ol>`, using `IntersectionObserver` to track the active section for the sticky-highlight state (same underlying mechanism already used for scroll-reveal elsewhere in the codebase, reusable pattern not a new dependency).

**Accessibility:** `<nav aria-label="Table of contents">` landmark; each anchor link is a real in-page anchor (works without JS, the active-state highlight is a progressive enhancement layered on top, not required for the links themselves to function); skip-to-content is unaffected (this is supplementary in-page nav, not the primary landmark).

### 1.4 Body Content — `LegalSection`

**Structure:** The document is a flat array of sections, each rendered by one repeating `LegalSection` component:

```
{
  id: string          // anchor target, matches TOC entry
  heading: string      // H2
  subsections?: { heading: string; body: RichContent[] }[]  // optional H3s within
  body?: RichContent[]  // used if no subsections
}
```

Reuses the same `RichContent[]` block model already defined in the Insights spec (`docs/insights-page-layout-spec.md` §2.3 — `paragraph | h2 | h3 | blockquote | list`) rather than inventing a second prose model — legal body copy needs the same primitives (paragraphs, lists, occasional emphasis) and nothing more exotic.

**Type scale for body prose (reuse Insights article body tokens exactly — do not invent a separate scale for legal):**
- H2 (section heading): `font-display`, same size step as `ArticleH2`, `text-ink`, `64px` top margin / `24px` bottom (compressed to `48px`/`16px` on mobile) — each H2 gets `id="{section.id}"` for the TOC anchor.
- H3 (subsection): same as `ArticleH3` — `font-sans` bold or smaller `font-display` step, `40px` top margin / `16px` bottom (mobile `32px`/`12px`).
- Body paragraph: `Body` token, `text-ink`, line-height `1.7`, `72ch` max measure (identical to article body — legal text benefits from the same readable-measure discipline, arguably more so given density), `24px` between paragraphs.
- Lists (common in legal docs — data-categories, user-rights enumerations, etc.): same treatment as article lists, `1.7` line-height, bronze markers, `8px` item gap; numbered lists for anything sequential/procedural (e.g. "how to request data deletion" steps), bulleted for enumerations with no inherent order.
- No blockquote usage expected in legal copy — component exists in the shared `RichContent` model but is not a primary pattern here; if a defined term or quoted external clause needs visual separation, reuse the same bronze-left-border blockquote treatment rather than inventing a new "callout" style.
- Defined terms (e.g. "Personal Data", "Service") may render as `font-medium text-ink` inline emphasis on first definition — no special component needed, this is a `<strong>`/`font-medium` inline treatment within a paragraph block, not a new block type.
- Cross-references to the sibling legal doc or to `/contact` (e.g. "contact us at…") use the same inline-link treatment as article body links: `underline underline-offset-4 decoration-slate-deep/40 hover:decoration-gold` — this is the one place gold may appear as a hover-state decoration, consistent with the article template's link rule, not a new exception.

**Section spacing rhythm:** `64px` gap between top-level `LegalSection` blocks on desktop (matches the H2 top-margin value, so consecutive sections don't double up spacing — the H2's own top-margin *is* the section gap, don't add a second wrapper margin on top of it), `48px` on tablet, `32px` on mobile — following the same compressed proportions used throughout the site's responsive rhythm scale (§0 of the homepage spec: `4,8,12,16,24,32,48,64,96,128,160,200`, all values here pulled directly from that scale, nothing new).

**Components:** `LegalSection`, reusing `ArticleBody`'s block-renderer internals from the Insights spec (same `paragraph/h2/h3/blockquote/list` switch) rather than building a parallel renderer — if `ArticleBody` is implemented as a generic `RichContentRenderer`, legal pages should literally import and reuse it.

### 1.5 No CTA Band

Legal pages intentionally **do not** end with `CtaBand` — a "Start Your Project" pitch immediately after Privacy Policy/Terms text is tonally wrong (undermines the seriousness of the page and reads as opportunistic). The page ends with the last `LegalSection`, then goes straight into `MegaFooter`. This is a deliberate exception to the site's usual every-page-ends-in-CTA pattern — flag this explicitly to the frontend engineer so it isn't "fixed" by accident during a later consistency pass.

---

## 2. Responsive Summary

| Breakpoint | TOC | Body measure | Section gap |
|---|---|---|---|
| 1920/1440 | Sticky left sidebar, cols 1–4 | `72ch` max, cols 5–12 | 64px |
| 1024 | Sticky left sidebar (narrower, cols 1–3 of 12) | `72ch` max within remaining cols | 64px |
| 768 | Collapses to static block above body, full width | Fluid, near-full container width | 48px |
| 428/375 | Static list above body, full width | Fluid full-width minus outer margin | 32px |

---

## 3. Component Inventory Summary

| Component | Purpose | Reuses |
|---|---|---|
| `DraftNotice` | Persistent, non-dismissible "pending legal review" banner | New |
| `LegalToc` | Sticky (desktop) / static (mobile) table of contents with active-section tracking | New nav wrapper, shared `IntersectionObserver` pattern |
| `LegalSection` | Repeating H2 (+optional H3 subsections) + prose body block | Shares `RichContentRenderer`/`ArticleBody` internals with Insights template |

New data files: `lib/legal-privacy-data.ts`, `lib/legal-terms-data.ts` (each exporting a `sections: LegalSection[]` array plus `lastUpdated: string | null` and `draftStatus: "draft" | "final"`), or a single `lib/legal-data.ts` keyed by doc if the two share enough boilerplate scaffolding (cookie-policy-adjacent clauses, contact-for-data-requests clause, etc.) to warrant one file — engineer's call, not a design constraint.

**Footer link wiring:** `components/sections/MegaFooter.tsx` currently has both the Legal column ("Privacy Policy", "Terms of Service") and the bottom-bar pair ("Privacy", "Terms") pointing at `href="#"` — both must be updated to point at the real `/privacy` and `/terms` routes once this template ships, so there are no dead legal links left in production once these pages exist.

**Accessibility baseline reminder (per homepage §0):** heading hierarchy strictly nested (H1 → H2 → H3, never skipped) since this is the page type most likely to be parsed by assistive tech users specifically looking for a named clause; TOC is a genuine in-page nav landmark, functions without JS; draft banner text is real DOM text (not an image), so it's guaranteed to be read by screen readers and indexed by search crawlers — this is intentional, the draft status must be discoverable by every access method, not just visually. All text (including the draft-notice bold label on ink) checked against WCAG 2.2 AA contrast.
