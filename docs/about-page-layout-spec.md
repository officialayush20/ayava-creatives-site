# Ayava Creatives — About / Founder Page Layout Spec
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft
Route: `/about` (currently a dead nav link)

Inherits all Foundations from `homepage-layout-spec.md` §0 (12-col grid, spacing scale, breakpoints, section rhythm, color usage baseline, type scale, accessibility baseline). Reuses `Button` (`tone`/`variant` as implemented), `SectionHeader`, `Container`, `CtaBand` (`tone` prop), `Tag`, `MediaFrame`, `ArrowLink` as-is. No new primitives invented where an existing one covers the need.

**Founder framing (binding constraint, confirmed by client):** this is a single-founder narrative, not a team page. Do not build a team grid, do not imply headcount beyond Ayush Saini, do not use plural "we/our team" language in a way that fabricates a bigger organization — "we" is acceptable in a founder-voice sense ("the way we work") but any explicit team-size claim must be singular/honest. The "lean team" framing is a stated credibility angle, not something to soften or hide.

**Gold discipline:** gold stays restricted to hairlines, focus rings, and real numeric values (years active, project count if confirmed, method step numerals) — never a card fill, never a decorative "founder portrait frame," never a badge/pill background. This page has no fabricated stats; any number used must be real or explicitly marked STUB.

---

## Page section order

1. Hero — founder-led framing (not a generic "About Us" hero)
2. Founder Narrative / Manifesto (Ayush Saini's story)
3. Why Ayava Exists (the gap in agency-client relationships)
4. The Ayava Method (reference/reuse homepage pattern)
5. Values / Operating Principles
6. "Lean, Founder-Led — And That's a Feature" (honesty section)
7. CTA Band → `/contact`
8. Footer (reuse `MegaFooter`)

**Background rhythm:** ink (Hero) → ivory (Founder Narrative) → ink (Why Ayava Exists) → ivory (Ayava Method — NOTE: homepage's Method section is ink; on this page recommend ivory here specifically to avoid 2 consecutive ink sections against Why Ayava Exists, see note in §4) → ink (Values) → ivory (Lean-Team Honesty section) → ink (CTA Band) → ink (Footer). No more than 2 consecutive same-background sections without a hairline/spacing break, per homepage rule.

---

## 1. Hero — Founder-Led Framing

**Layout:** Ink background, NOT full-viewport cinematic (this isn't the homepage — reserve that treatment for the homepage only). Content-driven height, `~60vh` desktop min. Asymmetric split: text block cols 1–7, portrait/photo slot cols 8–12 (a real photo of Ayush, not a stock/illustrated placeholder — flag as content dependency below).

- Eyebrow (Label, bronze): "About Ayava"
- H1 (display, `clamp(40px, 6vw, 88px)`, line-height 1.0, max 2 lines, left-aligned): founder-forward statement, e.g. "One founder. Full accountability. No account-manager layer." (copywriter to finalize — must read as a position, not a slogan)
- Subhead (Body-L, max-width 48ch, `24px` below H1): 1–2 lines naming Ayush directly and what he does, e.g. "Ayava Creatives is built and run by Ayush Saini — a full-stack developer and growth marketer who builds and markets the work himself."
- `PortraitFrame` (new, thin wrapper around `MediaFrame`): real photo of Ayush, 4:5 aspect, cols 8–12, no gold border/frame — a plain `1px` bronze hairline edge only, per the "no decorative gold fill" rule.

**Responsive:**
- 1920/1440: as above.
- 1024/768: portrait moves below text, full-width, text block becomes full-width (cols 1–8 of 8-col grid).
- 428/375: H1 `clamp(30px, 9vw, 40px)`, 3 lines max, portrait 1:1 or 4:5, full-width, stacked below text.

**Components:** `FounderHero` (new), `PortraitFrame` (new), `MediaFrame` (reused).

**Interaction/state notes:** Static, no count-up/canvas/marquee — this hero should load fast and read as sincere, not spectacle. Standard focus/hover states inherited from `Button` if a CTA is added here (recommend NOT adding a CTA in the hero itself — let the narrative build to the CTA band at the end, avoid premature conversion pressure on a trust-building page).

**Content slots:** H1 copy, subhead copy, **real photo of Ayush Saini (content dependency — flag to founder/PM; do not ship a stock photo or illustrated avatar in its place, run text-only hero with generous whitespace on cols 1–7 if a photo isn't ready by launch, matching the `ServiceHero` precedent noted in the creative-review doc for "image pending" states)**.

---

## 2. Founder Narrative / Manifesto

**Layout:** Ivory background, `160px`/`64px` padding. Asymmetric editorial layout, NOT centered: `SectionHeader` cols 1–6, left-aligned, eyebrow "The Story," H2 e.g. "How Ayava started." Below, a long-form narrative column cols 1–7, with a secondary "credentials rail" cols 9–12 running alongside it (sticky on desktop, optional) surfacing concrete facts as they're mentioned in the prose rather than a generic bio-bullet list.

- Narrative column (Body-L, max-width ~65ch, `24px` paragraph spacing): the actual story — full-stack developer + growth marketer background, real project experience (NextepSolution, Dreamzcraft, banksathi), BCA at Himgiri Zee University. Written in first person or close third, copywriter's call, but must stay grounded in verifiable specifics rather than generic "passionate about marketing" language.
- `CredentialsRail` (new component, cols 9–12): compact list of concrete anchors pulled out of the narrative for scanners who won't read the full prose — e.g. "BCA, Himgiri Zee University," "Full-stack development — NextepSolution," "Growth marketing — Dreamzcraft," "banksathi" — each a short `Label`+`Body` pair, `1px` bronze-hairline divider between rows, no icons/badges (avoid resume-template look).

**Responsive:**
- 1024: `CredentialsRail` un-stickies, moves below the narrative column as a simple horizontal wrap of short tags/rows instead of a vertical rail; narrative column widens to cols 1–8 of 8-col grid.
- 768/428/375: single column — narrative first, `CredentialsRail` collapses to a simple stacked list below it, `48px` gap above.

**Components:** `SectionHeader`, `NarrativeColumn` (new — just a typographic wrapper, not a complex component), `CredentialsRail` (new).

**Interaction/state notes:** Static content, standard scroll-fade-in on paragraph blocks (staggered, subtle — flag to motion-designer, not choreographed here). No hover/interactive elements in this section beyond any inline links (e.g. if NextepSolution/Dreamzcraft are named and a live portfolio link exists, use standard `ArrowLink`/inline-link treatment with underline-on-hover, `target="_blank" rel="noopener"` + visually-hidden "opens in new tab" text per site convention).

**Content slots:** Full narrative copy (copywriter, working from Ayush's real portfolio — NextepSolution, Dreamzcraft, banksathi experience, BCA Himgiri Zee University — do not embellish beyond what's confirmed; if exact role/dates/scope at NextepSolution or banksathi need confirmation, flag to founder before publishing specifics like job titles or tenure lengths).

---

## 3. Why Ayava Exists (The Gap He Saw)

**Layout:** Ink background, `160px`/`96px` padding (slightly tighter bottom since Method section follows closely in argument, not just visually). Asymmetric split matching homepage §8 "Why Ayava" pattern: left col 1–4 = large H2 statement (the "gap" framed as a single sharp sentence), right col 5–12 = 2–3 short paragraphs elaborating the problem in agency-client relationships he set out to fix (e.g. account-manager layers diluting the person who actually understands the work, generic retainers replacing scoped thinking — copywriter to draft from founder's actual stated frustration, not invented industry generalizations).

**Responsive:**
- 1024/768: left statement un-stickies, stacks above the paragraphs, full-width.
- 428/375: same stacked order, no layout changes needed beyond standard type clamp.

**Components:** Reuse the same structural pattern as homepage `DifferentiatorList`/`StickyHeader` wrapper conceptually, but this section is prose-driven, not a list of rows — new component `ProblemStatement` (new, simple 2-col split: sticky headline + prose body), distinct from `DifferentiatorList` which is a row-list pattern used in §5 below.

**Interaction/state notes:** Static, fade/slide-in on scroll for the paragraph block, no hover interaction (informational, not clickable).

**Content slots:** The "gap" headline + 2–3 paragraphs (copywriter, grounded in founder's real point of view — this is where the founder's actual operating philosophy goes, coordinate with creative-director on tone/voice before finalizing language).

---

## 4. The Ayava Method

**Layout:** Reuse the homepage's `MethodTimeline`/`MethodStep`/`ConnectorLine` components directly — same structure as `homepage-layout-spec.md` §6, do not rebuild. On this page, set background to **ivory** (deliberate deviation from homepage's ink treatment) specifically to preserve the ink→ivory→ink alternation given §3 (ink) precedes and §5 (ink) follows — flag this tone swap to frontend-engineer: `MethodTimeline` needs a `tone` prop (`on-ink` default / `on-ivory`) if it doesn't already support one, following the same pattern established by `Button`/`CtaBand`.

- Optional short intro line above the step sequence specific to this page's context: "This is how every Ayava engagement runs — the same process whether it's a landing page or a full growth program." (ties the generic Method component back into the founder-narrative frame, avoid just dropping it in with zero connective tissue).

**Responsive:** Identical breakpoint behavior to homepage §6 (vertical switch at 1024 and below).

**Components:** `MethodTimeline`, `MethodStep`, `ConnectorLine` (all reused, `tone` prop extension flagged above), `SectionHeader`.

**Content slots:** Reuse the exact same step content as the homepage instance (single source of truth — do not fork a second copy of the method's 4–5 steps; if step copy needs page-specific framing, only the intro line above should vary, not the step names/descriptions themselves).

---

## 5. Values / Operating Principles

**Layout:** Ink background, `160px`/`96px` padding. `SectionHeader` cols 1–6, eyebrow "How I Work" (or "Operating Principles" — copywriter's call), H2. Below: reuse the homepage `DifferentiatorList`/`DifferentiatorRow` pattern from §8 of the homepage spec — asymmetric left col 1–4 sticky intro (optional) + right col 5–12 list of 4–6 rows, each row: title (H3) + 2-line description, `1px` bronze hairline dividers between rows, no icons required (icons optional, same treatment as homepage if used).

**Responsive:** Identical to homepage §8 (left statement un-stickies and stacks at 1024/768, icon-inline-left/text-right retained at mobile if icons are used).

**Components:** `DifferentiatorList`, `DifferentiatorRow` (both reused from homepage inventory), `SectionHeader`.

**Content slots:** 4–6 value/principle titles + descriptions — must be specific operating commitments (e.g. "Direct communication, no relay," "Scoped to the actual problem, not a template package," "I build what I market — no handoff gap between strategy and execution") rather than generic agency-values language ("innovation," "excellence"). Copywriter to draft from founder's actual working style; coordinate with creative-director on voice.

---

## 6. "Lean, Founder-Led — And That's a Feature"

**Layout:** Ivory background, `160px`/`64px` padding. This is the section that does the direct work of reframing single-founder status as a credibility angle rather than a limitation — give it deliberate visual weight, not a throwaway paragraph. `SectionHeader` cols 1–6, eyebrow "Why Founder-Led," H2 e.g. "Currently a team of one. Here's why that's the point." Below: asymmetric layout, cols 1–6 = short direct statement (Body-L, 2–3 sentences, plainly acknowledging current scale), cols 7–12 = a 3-row comparison list (NOT a vs.-table/checkmark-grid cliché — keep it as simple stacked rows, matching the hairline-row treatment used elsewhere on the site) contrasting what direct-founder access means in practice: e.g. "Direct access" / "No account-manager relay — you talk to the person doing the work," "Operator, not just strategist" / "The same person who scopes the campaign builds and ships it," "Full accountability" / "One name attached to every deliverable, no diffusion of responsibility across a bench."

**Responsive:**
- 1024/768: stacks — statement above, rows below, full-width.
- 428/375: same stack, rows keep single-line label + 2-line description each, `24px` gap between rows.

**Components:** `DifferentiatorRow` (reused — same row primitive as §5, different content, avoid a third bespoke component for what is structurally the same pattern), `SectionHeader`.

**Interaction/state notes:** Static, standard scroll-fade-in, no hover/click targets (informational only).

**Content slots:** The framing statement + 3 access/accountability contrast rows (copywriter, tone must read confident and specific, not defensive — this section exists precisely so a visitor never has to wonder "is this a real agency or one guy," so it should state the fact plainly and immediately pivot to why that's an advantage, not apologize for it).

---

## 7. CTA Band

**Layout:** Reuse `CtaBand` component exactly as implemented (`tone="on-ink"`). Headline should tie back to the founder-direct-access framing established in §6, e.g. "Talk to the person who'll actually do the work." Primary CTA → `/contact`, secondary → `/contact#call` (or the relevant anchor once Contact page's call-booking path is finalized, per `contact-page-layout-spec.md` §3).

**Components:** `CtaBand` (reused, no modification).

**Content slots:** Headline, supporting line, button labels/hrefs.

---

## Cross-Section Notes for Engineer

1. **New components introduced on this page:** `FounderHero`, `PortraitFrame`, `NarrativeColumn`, `CredentialsRail`, `ProblemStatement`. **Reused as-is:** `SectionHeader`, `Container`, `Button`, `CtaBand`, `MediaFrame`, `ArrowLink`, `DifferentiatorList`/`DifferentiatorRow`, `MethodTimeline`/`MethodStep`/`ConnectorLine` (with a `tone` prop extension flagged in §4), `MegaFooter`.
2. **Content dependencies to flag before launch:** real photo of Ayush Saini (§1 — do not ship stock/illustrated placeholder), exact specifics of NextepSolution/Dreamzcraft/banksathi roles and tenure (§2 — confirm before publishing anything beyond company names and general nature of the work), values/principles copy (§5) and founder-led framing copy (§6) both need founder review for tone accuracy, not just factual accuracy.
3. **No team grid, no plural-headcount implication anywhere on this page** — this is the binding constraint from the client brief; if a future engineer or copywriter drafts a "Meet the Team" style module for this route, that is out of scope and should be flagged back to the founder, not silently added.
4. **Accessibility baseline from homepage §0 applies in full**: every top-level section is a `<section aria-labelledby="...">` landmark, focus rings, AA contrast, reduced-motion handling on all scroll-triggered fades.
5. **Method section reuse (§4) is the one cross-page dependency** — confirm with frontend-engineer that adding a `tone` prop to `MethodTimeline` doesn't break the homepage instance; default should remain `on-ink` to avoid changing homepage behavior.
