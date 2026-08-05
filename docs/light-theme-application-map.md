# Atelier Light — Application Map

Companion to `docs/light-gradient-theme-spec.md`. That document defines the token
system and the rules; this document tells the frontend-engineer exactly where
to apply them, page by page, component by component, with zero ambiguity.
Nothing here changes layout, structure, or content — this is a re-skin only.

Relevant files read for this map: `app/globals.css`, `components/ui/Button.tsx`,
`components/ui/SectionHeader.tsx`, `components/sections/SiteHeader.tsx`,
`components/sections/Hero.tsx`, `components/sections/ResultsStrip.tsx`,
`components/sections/CtaBand.tsx`, `components/sections/service-template/*`,
`components/sections/contact/ContactHero.tsx`,
`components/sections/legal/LegalPageLayout.tsx`.

---

## Task 1 — Theme toggle UX

### Placement

`components/sections/SiteHeader.tsx`. Two insertion points in the existing markup:

- **Desktop**: inside the `<nav aria-label="Primary" className="hidden md:block">` flex
  row, as the last item after "Contact" — a vertical hairline divider
  (`w-px h-4 bg-hairline`, using the semantic token so it re-themes automatically)
  separates it from the last nav link, then the toggle sits flush against the
  right edge of the `Container`, replacing the current dead space between nav
  and the (currently absent) header CTA.
- **Mobile**: inside the `id="mobile-nav"` panel, as its own row directly below
  the `<ul>` of links, above the panel's bottom padding — full-width row,
  label left-aligned, switch right-aligned, separated from the link list by
  one `border-t border-hairline`.

Do not put it in the mobile header bar itself (top row with logo + hamburger)
— that bar is already at capacity (logo, hamburger) at 375px and a third
control there fails thumb-reach and visual-crowding checks.

### Control choice: not a sun/moon icon

**Decision: a labeled two-position segmented switch reading "Dark / Light" as
text, not iconography.** Rationale: this is a decisive editorial choice
("Atelier Dark" vs "Atelier Light" are two *temperatures* of one brand, not a
generic light/dark mode utility), and a sun/moon glyph pair is the exact
cliché this whole design system is built to avoid (see spec §7 "reject on
sight" — the same instinct that banned gradient buttons and stock photography
applies to the toggle icon). Text is also unambiguous at 1x pixel density and
needs no icon-library dependency.

**Component structure** (new primitive, `components/ui/ThemeToggle.tsx`):

```
<button
  role="switch"
  aria-checked={isLight}
  aria-label="Switch to light theme" / "Switch to dark theme" (dynamic, describes the destination state)
  onClick={toggleTheme}
  className="theme-toggle"
>
  <span className="theme-toggle-track">
    <span className="theme-toggle-option" data-active={!isLight}>Dark</span>
    <span className="theme-toggle-option" data-active={isLight}>Light</span>
    <span className="theme-toggle-thumb" />
  </span>
</button>
```

Visually: a pill-shaped track (`rounded-full`, height 32px, width ~88px)
containing the two text labels side by side, with a sliding thumb (a
translucent rounded rect, not a filled circle — avoids reading as an on/off
iOS-style switch, reads instead as a two-state selector consistent with the
site's rectangular/editorial vocabulary, e.g. the filter-chip pattern already
in `work/FilterChip.tsx`) that sits behind whichever label is active.

**States** (defined per current theme, since the control itself sits in a
themed header and must read correctly before and after the switch):

| State | Dark theme (current, on `bg-ink`) | Light theme (on `bg-surface`) |
|---|---|---|
| Default | Track: `1px solid var(--color-slate-deep)`, transparent fill. Inactive label: `text-slate`. Active label: `text-ivory`. Thumb: `bg-ink-raise` | Track: `1px solid var(--color-hairline)`. Inactive label: `text-graphite-muted` equivalent (`text-content-muted`). Active label: `text-content`. Thumb: `bg-surface-raise` |
| Hover | Track border → `var(--color-slate)` (dark) | Track border → `var(--color-rule-strong)` |
| Focus-visible | `2px solid var(--color-gold)` ring, 2px offset, offset color = surface (existing Button/SectionHeader focus pattern, generalized via `--color-accent` token so it becomes gold on dark / verdigris on light automatically) | Same, resolves to `2px solid var(--color-verdigris)` |
| Active/pressed | Thumb `scale(0.96)` for 100ms on click (matches existing `active:scale-[0.98]` convention on `Button`) | Same |
| Disabled | N/A — this control has no disabled state; it is always interactive once JS/hydration completes | — |
| Loading (pre-hydration) | Server-rendered in the theme matching the SSR `data-theme` attribute (see Persistence below) — no separate loading skeleton, no flash | — |

Thumb transition: `transform 200ms cubic-bezier(0.16,1,0.3,1)` sliding
between the two label positions — same easing token as the rest of the site's
motion system (`EASE` in `lib/gsap.ts` / the CSS equivalent already used for
Button hover states). No color-fade cross-dissolve on the whole page when
switching — the `[data-theme]` attribute swap is a hard cut, applied to
`<html>`, which is intentional (an instant, confident temperature change) not
something that needs to be softened with a transition; a temporary
`transition: background-color 250ms ease-out, color 250ms ease-out` may be
added to `body` and major surface elements to keep the swap from feeling like
a jump-cut, but no gradient or component transitions cross-fade.

### Persistence and default

- **Default for new visitors: dark.** The brand identity is dark-first (this
  is stated explicitly in the existing `globals.css` comment: "Brand is
  dark-first by identity"). The light theme is a deliberate parallel
  offering, not a replacement or an assumed preference — flipping the default
  would contradict the creative director's existing "dark-first" ruling
  without a stated reason to overturn it. New/first-time visitors with no
  stored preference get dark.
- **No `prefers-color-scheme` involvement** — confirmed already banned by the
  spec (§6, "no `prefers-color-scheme`, stays an editorial choice"). The
  toggle is the only way theme changes; OS-level light/dark settings are
  ignored entirely, for both themes.
- **Persistence: `localStorage`, key `ayava-theme`, values `"dark" | "light"`.**
  Once a visitor explicitly toggles, that choice persists across page
  navigation (client-side nav already keeps `<html data-theme>` stable since
  it's set outside the React tree) and across return visits indefinitely,
  until they toggle again or clear storage. No cookie needed since there is
  no server-personalized content depending on theme (this is presentation-only)
  — but see the SSR note below for why a cookie is nonetheless the more
  correct implementation.
- **Flash-of-wrong-theme prevention (exact behavior):**
  1. Preferred implementation: mirror the localStorage value into a
     **cookie** (`ayava-theme`, `SameSite=Lax`, 1-year expiry, set at the same
     time `localStorage` is set) so the Next.js server component reading
     `cookies()` in `app/layout.tsx` can render `<html data-theme={cookieValue ?? undefined}>`
     on the very first server-rendered response — no client flash at all,
     since the correct theme is already in the initial HTML.
  2. If a cookie is out of scope for this pass, the fallback is a
     synchronous **inline blocking script** in `<head>`, before any
     stylesheet paints content, that reads `localStorage.getItem('ayava-theme')`
     and sets `document.documentElement.dataset.theme = value` immediately.
     This is the standard no-flash pattern and is an acceptable substitute,
     but the cookie approach is preferred because it also makes the correct
     theme visible in server-rendered HTML (better for SSR consistency,
     no white-flash edge case on very slow JS parse).
  3. Either way: default (`data-theme` attribute absent, or explicitly
     `data-theme="dark"`) must resolve to dark, since dark tokens are the
     `@theme` root defaults with no `[data-theme]` selector required — this
     is already true by construction per the spec's token architecture
     (dark literals are the unscoped defaults; light is the override branch).
     So "no stored value" naturally renders correctly dark with zero extra
     logic — only the light path needs the attribute set before paint.

---

## Task 2 — Page-by-page gradient mapping

Rule recap: exactly one Dawn Mesh (hero, above the fold) and exactly one
Verdigris Deep slab per page, never both types of gradient in one viewport
together, never behind body-copy stacks/forms/tables/card-grids.

### Homepage (`app/page.tsx` — sections in order: Hero, TrustBar, WhyAyava/ProblemStatement, ServicesShowcase, ResultsStrip, AyavaMethod, FeaturedCaseStudies, TestimonialTheater, GlobalPresence, InsightsPreview, CtaBand)

- **Dawn Mesh → `Hero`** (`components/sections/Hero.tsx`). Replaces `bg-ink`
  with `background: var(--gradient-dawn-mesh)` on `[data-theme="light"]` only
  (dark theme keeps flat `bg-ink` unchanged). Applies behind the H1 + one lead
  paragraph only, per spec §2 — the stat row at the bottom of Hero
  (`role="region" aria-label="Ayava Creatives at a glance"`) sits on a
  **flat `canvas` band below the mesh**, not on the gradient itself: the
  `HeroCanvasSlot` decorative overlay and the stat strip's `border-slate-deep`
  divider already visually separate hero-top from hero-bottom, so cut the
  Dawn Mesh off at that existing divider line (i.e., gradient only spans the
  `flex-1 items-center` content block, not the full section height) — this
  keeps `StatCounter` numerals (which use tabular-nums, a "proof" element per
  §3) off the gradient and on flat canvas where they're guaranteed contrast.
- **Verdigris Deep → `CtaBand`** (closing section, `tone="on-ink"` variant),
  not `ResultsStrip`. Justification: `ResultsStrip`'s four metrics are
  explicitly placeholder/TBC values (`[X]+`) pending real figures — putting
  the site's single most premium gradient behind unverified placeholder
  numbers is a poor investment of the one-slab budget, and metrics are a
  "proof" element that the spec says Verdigris (the accent) should mark, not
  necessarily the backdrop. `CtaBand` is the natural closing-slab candidate:
  it's the last thing a visitor sees, it's copy + two buttons (no dense card
  grid, no form), and a dark inverted slab as the final beat mirrors how the
  dark theme already treats `CtaBand` as a `bg-ink` closing moment. Convert
  its `tone="on-ink"` background from flat `bg-ink` to
  `background: var(--gradient-verdigris-deep)` in the light theme only.
- Everything else in between (`TrustBar`, `WhyAyava`, `ServicesShowcase`,
  `ResultsStrip`, `AyavaMethod`, `FeaturedCaseStudies`, `TestimonialTheater`,
  `GlobalPresence`, `InsightsPreview`) stays flat `canvas` /
  `canvas-sink` alternation — no gradient. This also satisfies the "≤35% of
  scroll height" gradient budget by construction, since a homepage this long
  with only hero + one closing band in gradient is comfortably under budget.

### Service page template (`app/(marketing)/services/[slug]/page.tsx`, sections: `ServiceHero`, `ProblemWeSolve`, `OurApproach`, `Deliverables`, `CaseStudySpotlight`, `Pricing`, `LeadCapture`, `FAQ`, `CrossLinks`, `StickyCTA`)

- **Dawn Mesh → `ServiceHero`** (`components/sections/service-template/ServiceHero.tsx`).
  Same rule as homepage Hero: gradient sits behind the H1 + subhead paragraph
  in the `md:col-span-7` text column only. The `MediaFrame` slot in
  `md:col-span-5` and the breadcrumb nav row keep their own flat/neutral
  treatment (a `MediaFrame` counts as a "card" for gradient-exclusion
  purposes — never place imagery/card surfaces directly on the mesh per §2's
  "never on cards" rule, so the mesh must not visually bleed under the media
  frame's own background; constrain the gradient to the text column's
  bounding box, not the full section width).
- **Verdigris Deep → `CaseStudySpotlight`** (state A only — the real,
  matched-project variant), not `Pricing` and not `LeadCapture`. Justification:
  - `Pricing` is explicitly ruled out — the spec says gradients are "never
    behind... a card grid," and `Pricing`'s tiered layout is a 3-column card
    grid (`grid grid-cols-1 gap-6 md:grid-cols-3`) when tiers exist, and even
    in the tier-less path it's a dense `HairlineRowList` (effectively a data
    list, not a hero moment) — wrong content type for a gradient slab either way.
  - `LeadCapture` is explicitly ruled out per the "never behind... a form"
    rule (spec §2) — both its variants (calculator-teaser and mini-intake
    form) are literal forms.
  - `CaseStudySpotlight` state A is the correct fit: it's the section built
    specifically to be the page's one moment of real proof/narrative weight
    (headline + qualitative body copy + one image + one ArrowLink — no form,
    no card grid), which matches Verdigris's brand definition as the tone
    that "marks proof and intent." Apply `--gradient-verdigris-deep` to that
    section's `bg-ink` background, restricted to the state-A layout; state B
    (`CaseStudyEmptyState`) stays flat `inverse-surface` (`#0F1114`) per spec
    §1 ("rare flat dark slab when not using Gradient B") since an empty-state
    admission of "no case study yet" shouldn't be dressed in the site's most
    premium visual treatment — that would misrepresent confidence the section
    itself disclaims.
  - Every other section (`ProblemWeSolve`, `OurApproach`, `Deliverables`,
    `Pricing`, `LeadCapture`, `FAQ`, `CrossLinks`) stays flat canvas/
    canvas-sink alternation with no gradient. `StickyCTA` (a persistent bar,
    not a full section) must never carry a gradient regardless — it's chrome,
    not content, and a moving/sticky gradient surface would also violate the
    "no scroll-scrubbed gradient" rule by proxy of constantly reflowing in
    the viewport.

This mapping is identical across all 15 service pages since they share one
template component tree (`lib/service-page-content.ts` only varies copy).

### Industry page template (`components/sections/industries/IndustryHero.tsx`, `IndustryNarrative`, `RelevantServices`, `IndustryCaseStudy`, `IndustryFAQ`, closing `CtaBand`)

- **Dawn Mesh → `IndustryHero`**, same H1+subhead-only constraint as the two
  heroes above.
- **Verdigris Deep → `IndustryCaseStudy`** (structurally the same component
  family as service `CaseStudySpotlight`, same justification: real
  qualitative case narrative, no form, no card grid). Do **not** also apply
  it to the closing `CtaBand` on industry pages — that would be two gradient
  slabs on one page, banned outright. If a given industry page's
  `IndustryCaseStudy` is in its empty-state variant, fall back to
  `inverse-surface` flat, and do not shift the gradient onto `CtaBand`
  instead, to keep the rule mechanical and unambiguous rather than a
  per-page judgment call — the closing `CtaBand` across industry pages stays
  a flat `bg-ink`/`inverse-surface` band even when it means a given industry
  page has zero Verdigris Deep slabs. (One slab **per page** is a ceiling,
  not a quota — pages are allowed to have zero.)

### Work hub (`/work`) and case-study template (`/work/[slug]`)

- **Work hub** (`WorkHero`, `WorkGridSection`, `FilterChip`, closing `CtaBand`):
  Dawn Mesh → `WorkHero` (H1 + subhead only, filter chips below stay off the
  gradient on flat canvas since `WorkGridSection`'s filter/grid UI is
  interactive chrome, not hero copy). Verdigris Deep → the closing `CtaBand`
  is the only candidate here (there's no case-study spotlight moment on the
  hub itself, and the grid of `CaseStudyCard`s is explicitly a card grid,
  banned from gradients) — apply it there, same treatment as homepage's `CtaBand`.
- **Individual case study template** (`CaseStudyHero`, `SnapshotBar`,
  `NarrativeStage`, `MetricsEmptyState`, `NextCaseStudyPreview`): Dawn Mesh →
  `CaseStudyHero` (H1 + one-line subhead only; if `SnapshotBar` sits
  immediately below and contains metric numerals, it must sit on flat canvas
  below the mesh cutoff line, matching the homepage Hero's stat-strip
  precedent — metrics never sit on Dawn Mesh per §5's "ink-muted banned on
  Dawn Mesh" contrast rule and metrics typically pair with muted labels).
  Verdigris Deep → `NarrativeStage` (the long-form narrative body is
  disqualified — it's the "paragraph stack" the spec explicitly bans
  gradients behind) is **not** the right target; instead apply it to
  `NextCaseStudyPreview` (a single next-project teaser card — small, one
  CTA, closing-moment component, functionally the same shape as a `CtaBand`)
  if it's a single link/CTA construct, or omit the slab entirely on this
  template if `NextCaseStudyPreview` renders as a card (cards are banned).
  Read `NextCaseStudyPreview`'s actual markup before implementing; if it is
  a bordered card component, this template gets **zero** Verdigris Deep
  usage rather than force-fitting one, consistent with the "zero is allowed"
  principle above.

### About / Pricing / Careers / Insights

- **About** (`FounderHero`, `WhyAyavaExists`, `LeanTeamFeature`,
  `ValuesPrinciples`, `FounderNarrative`): Dawn Mesh → `FounderHero`.
  Verdigris Deep → `FounderNarrative` if it is a text-forward narrative
  section without a card grid (treat it like `NarrativeStage` — verify
  before implementing whether it's a paragraph stack that should be
  disqualified, in which case use `WhyAyavaExists` instead if that section
  is a single-statement/manifesto-style block rather than a multi-paragraph
  stack). Default safe choice if uncertain: apply Verdigris Deep to the
  closing `CtaBand` shared component instead, since that component's shape
  (headline + 1 supporting line + 2 buttons, no form/grid) is pre-validated
  gradient-safe across every page it appears on.
- **Pricing** (`PhilosophyHero`, `WhatShapesAQuote`, `EngagementModels`,
  `WhatThisIsnt`, `PricingFAQ`): Dawn Mesh → `PhilosophyHero`. Verdigris Deep
  → none of the mid-page sections qualify (`EngagementModels` and
  `WhatShapesAQuote` are list/row constructs, `WhatThisIsnt` is a negative-
  space statement section better left flat for tonal reasons — a premium
  gradient behind "what we are not" reads as incongruous). If this page ends
  in a shared `CtaBand`, put Verdigris Deep there; if it does not, this page
  gets zero Verdigris Deep slabs.
- **Careers** (`CareersHero`, `WhyAyavaEventually`, `RedirectBand`,
  `CareersInterestForm`): Dawn Mesh → `CareersHero`. Verdigris Deep → none —
  `CareersInterestForm` is a form (banned), `RedirectBand` is a short
  utility redirect notice, not a closing-CTA-scale moment. Zero Verdigris
  Deep on this page; that's correct, not a gap.
- **Insights hub + article template** (`InsightsHero`/`ArticleHero`,
  `ArticleGrid`/`ArticleBody`, `RelatedArticles`): Dawn Mesh → `InsightsHero`
  on the hub, `ArticleHero` on individual articles (H1 + dek only, never
  behind the article body — `ArticleBody` is precisely the "paragraph
  stack" the spec bans gradients behind, and `ArticleComingSoonBody` must
  also stay flat). Verdigris Deep → none on the hub (`ArticleGrid` is a card
  grid, banned) and none on the article template (long-form body dominates
  the page; `RelatedArticles` is another card grid). Both templates ship
  with zero Verdigris Deep slabs — correct per the "ceiling not quota" rule.

### Contact page

- Dawn Mesh → `ContactHero` **may** carry it (confirmed: the spec's "never
  behind a form" rule applies to the actual form fields, and `ContactHero`
  itself has zero form fields — it's H1 + subhead + one CTA button + one
  text link, same shape as every other approved Dawn Mesh hero). Apply
  `--gradient-dawn-mesh` there, replacing `bg-ivory` in the light theme.
- **`IntakeForm` (`components/sections/contact/IntakeForm.tsx`) must render
  on flat `canvas`/`canvas-raise`, never on any gradient**, confirmed
  per spec. Likewise `AltContactPaths`, `OfficeCard`, `ContactFAQ`,
  `ResponseTimeBand` stay flat canvas/canvas-sink alternation.
- Verdigris Deep → **omit entirely on the Contact page.** This page is
  explicitly the site's "fast lane, not another cinematic pitch" (per the
  existing `ContactHero` code comment) — a second premium gradient slab
  after the hero would work against that stated intent, and there is no
  closing `CtaBand` on this template to host it safely anyway (the page's
  own form is the CTA). Zero Verdigris Deep slabs on Contact, by design.

### Legal pages (Privacy / Terms)

- **Confirmed: no gradients at all**, of either kind. `LegalPageLayout.tsx`
  is explicitly documented as "Gold-free by design... nothing here has
  earned a gold accent" in the dark theme's own code comments — the same
  reasoning extends directly to Verdigris (the light theme's accent
  successor) and to both gradients, which the spec treats as an even more
  premium/decorative register than a hairline accent. Legal pages stay
  entirely flat `canvas` (hero) → `canvas-sink` (DraftNotice, if styled as a
  recessed band) → `canvas` (content), with zero motion and zero gradient
  surfaces, consistent with the existing "utility page" treatment. This is
  the one template type where the re-skin is 100 percent mechanical token
  substitution with no gradient decisions to make at all.

---

## Task 3 — What needs zero special-case work vs. what needs gradient layering

### Re-themes automatically via semantic token remapping (no special-case code)

Every section currently branching on `tone="on-ink" | "on-ivory"` (soon
`"default" | "inverse"`) and consuming `bg-ink` / `bg-ivory` / `text-ivory` /
`text-ink` / `text-slate` / `border-slate-deep` needs **only** the planned
`Button`, `SectionHeader`, `ArrowLink`, `Tag`, `StatCounter` refactor to
resolve through `--color-surface` / `--color-content` / etc. Once that
refactor lands, these get correct light-theme output with no further
per-component work:

- `TrustBar`, `WhyAyava`, `ProblemStatement`, `ServicesShowcase`,
  `AyavaMethod`, `FeaturedCaseStudies`, `TestimonialTheater`,
  `GlobalPresence`, `InsightsPreview` (homepage mid-sections)
- `ResultsStrip` (flat, no gradient per Task 2 — pure token remap)
- `ProblemWeSolve`, `OurApproach`, `Deliverables`, `FAQ`, `CrossLinks`
  (service template)
- `RelevantServices`, `IndustryNarrative`, `IndustryFAQ` (industry template)
- `WorkGridSection`, `FilterChip`, `CaseStudyCard` (work hub)
- `SnapshotBar`, `NarrativeStage`, `MetricsEmptyState` (case study template
  — unless `NarrativeStage` is confirmed as the Verdigris Deep target above,
  in which case it moves to the special-case list)
- `WhyAyavaExists`, `LeanTeamFeature`, `ValuesPrinciples` (About)
- `WhatShapesAQuote`, `EngagementModels`, `WhatThisIsnt`, `PricingFAQ` (Pricing)
- `WhyAyavaEventually`, `RedirectBand`, `CareersInterestForm` (Careers)
- `ArticleGrid`, `ArticleCard`, `RelatedArticles`, `ArticleComingSoonBody` (Insights)
- `AltContactPaths`, `OfficeCard`, `ContactFAQ`, `ResponseTimeBand`, `IntakeForm`, `FormField` (Contact)
- `DraftNotice`, `LegalToc`, `LegalSection` (Legal)
- `MegaFooter` (global — flat surface, token remap only)
- `Pricing` and `LeadCapture` (service template) — explicitly excluded from
  gradients per Task 2, so despite being "interesting" sections they are
  pure token-remap work, same as the list above
- `SiteHeader` itself (nav chrome) — token remap only; the new `ThemeToggle`
  is the sole net-new element here

### Needs gradient special-casing (net-new conditional styling, not just token remap)

These specific components require an explicit `[data-theme="light"]`
gradient background rule (via a `--gradient-*` token, never a literal
`linear-gradient(`/`radial-gradient(` in the component per the spec's grep-
auditability rule) layered on top of the token remap:

- `Hero` (homepage) — Dawn Mesh, constrained to text column, cut off above stat strip
- `CtaBand` (homepage instance, `tone="on-ink"`) — Verdigris Deep
- `ServiceHero` (service template, all 15 pages) — Dawn Mesh, constrained to `md:col-span-7` text column
- `CaseStudySpotlight` state A (service template) — Verdigris Deep
- `IndustryHero` — Dawn Mesh
- `IndustryCaseStudy` — Verdigris Deep
- `WorkHero` — Dawn Mesh
- `CtaBand` (work hub closing instance) — Verdigris Deep
- `CaseStudyHero` (case study template) — Dawn Mesh
- `FounderHero` / `PhilosophyHero` / `CareersHero` / `InsightsHero` / `ArticleHero` — Dawn Mesh only, each is its own component instance
- `ContactHero` — Dawn Mesh only (confirmed no Verdigris Deep on this page)
- Every closing `CtaBand` instance elsewhere in the site that is confirmed
  (per Task 2, page by page) to host Verdigris Deep — implement this as a
  new `gradient?: "verdigris-deep"` prop on the shared `CtaBand` component
  rather than forking it, so the special case is one prop, not a duplicate
  component; pages that don't want it simply omit the prop and get the
  existing flat-token-remap treatment.

Recommend adding this as a lint-adjacent checklist for code review: any PR
touching a `bg-ink`/`bg-ivory` background that also introduces a
`--gradient-*` reference must cite which line item above it corresponds to,
so a stray gradient can't silently appear on a card grid or form section
during implementation.
