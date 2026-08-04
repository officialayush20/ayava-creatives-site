# Ayava Creatives — Service Page Template Layout Spec
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft
Applies to all 15 service pages: SMM, Meta Ads, Google Ads, SEO, Website Design, Branding, Content Marketing, Influencer Marketing, Email/CRM Marketing, App Store Marketing/ASO, Video & Motion Production, PR/Reputation Management, E-commerce Growth, Analytics/CRO, AI Marketing.

This template inherits all Foundations from `homepage-layout-spec.md` §0 (grid, spacing scale, breakpoints, section rhythm, color usage baseline, type scale, accessibility baseline) — not restated in full below, only extended/referenced. Component names below reuse the homepage inventory (`Button`, `SectionHeader`, `StatCounter`, `ArrowLink`, `Tag`/`IndustryTag`, `MediaFrame`, `CarouselControls`) wherever equivalent; new components are named following the same PascalCase convention.

**Route pattern:** `/services/[service-slug]` — one template, 15 content instances driven by CMS/data model, not 15 hand-built pages.

---

## 0. Template-Level Notes

**Background rhythm for this template (12 sections):** ink (Hero) → ivory (Problem) → ink (Approach) → ivory (Deliverables) → ivory (Tools, no break — acceptable per homepage rule §Cross-Section-Notes as long as a visual divider hairline separates them) → ink (Case Study) → ivory (Pricing) → ivory (FAQ, same note as Tools) → ink (Cross-links: Services) → ivory (Cross-links: Industries) → ink (Lead-capture) → footer (ink, per homepage Mega-Footer). Sticky CTA sidebar (§12) overlays independent of this rhythm, on ink or ivory equally — verify contrast per background it currently sits over (crossfade its own internal bg or use a semi-opaque ink/ivory chip regardless of page section behind it, so it never needs to swap and cause flicker).

**Data model implication for engineer:** every content slot below must be a CMS field, not hardcoded — 15 services populate the same template. Fields common to all: `serviceName`, `serviceSlug`, `heroHeadline`, `heroSubhead`, `problemNarrative`, `approachSteps[]`, `deliverables[]`, `tools[]`, `caseStudyRef`, `pricingTiers[]`, `faqItems[]`, `relatedServiceSlugs[]`, `relatedIndustrySlugs[]`.

---

## 1. Hero — Outcome-Led Headline + Relevant Visual

**Layout:** Ink background, NOT full-viewport (unlike homepage cinematic hero — this is a shorter, wayfinding-first hero since it's a subpage). Height: `content-driven, min ~72vh desktop`. Breadcrumb row at top (`Home / Services / {Service Name}`), `48px` below top nav, cols 1–12, Caption size, bronze text, `/` separators, current page not a link (`aria-current="page"`).

Content: asymmetric 7/5 split like homepage hero. Cols 1–7: eyebrow label ("Service"), H1 outcome-led headline (e.g. "Paid Media That Pays for Itself," not "Meta Ads Services" — outcome framing per service, copywriter-authored), Body-L subhead max-width 42ch, CTA row (primary "Get a Quote" → routes to Package Builder/intake flow anchor at §11 or full flow; secondary ghost "See Case Study" → anchors to §6 on same page). Cols 8–12: `ServiceHeroVisual` slot — static image, short looping video, or motion graphic representative of the service (coordinate with creative-director/webgl-3d-artist on treatment; do NOT default to WebGL canvas here, keep this hero lighter-weight than homepage for performance since it repeats 15x across the site).

**Responsive:**
- 1920/1440: as above.
- 1024/768: visual slot moves below text, full-width, 16:9 or 4:3 frame, reduced height (~40vh equivalent). Text block full-width (cols 1–8 of 8-col grid).
- 428/375: Headline `clamp(28px, 8vw, 36px)`, breadcrumb truncates to `Home / ... / {Service Name}` if path too long, CTAs stack full-width, visual slot 4:5 or 1:1 to control height.

**Components:** `ServiceHero`, `Breadcrumb`, `KineticHeadline` (reuse, smaller clamp range), `ServiceHeroVisual` (new slot), `Button` (reuse).

**Interaction/state notes:** Breadcrumb links: standard hover underline + focus ring. Visual slot: if video, same rules as Testimonial Theater's `VideoStage` (poster + play affordance, no autoplay-with-sound, loading skeleton, error fallback to static image). No count-up/ticker in this hero (that lives in Results Strip pattern reused at §6 case study spotlight, not here).

**Content slots:** `heroHeadline` (outcome-led, service-specific — SEO copy priority keyword should appear naturally, coordinate with seo-strategist), `heroSubhead`, hero visual asset, 2 CTA label/hrefs.

---

## 2. "The Problem We Solve" Narrative Block

**Layout:** Ivory background, `96px` sub-section rhythm (tightly related to Hero above it conceptually, but full `160px` section gap desktop / `64px` mobile per standard rhythm since it's a new `<section>`). Asymmetric split: cols 1–4 = short H2 ("The Problem" or service-specific framing) sticky-optional (reuse `StickyHeader` wrapper pattern from homepage §8, optional, same caveat), cols 5–12 = 2–3 paragraph narrative (Body-L), may include 1 pull-quote style callout (larger Body-L or small H3 treatment, bronze left-border accent, NOT gold per token restriction) mid-paragraph for scannability.

**Responsive:**
- 1024/768: left header un-stickies, stacks above narrative, full-width.
- 428/375: same stack, pull-quote callout full-width with `16px` left-border + `16px` padding.

**Components:** `NarrativeBlock` (new — reuse `StickyHeader` wrapper if used), `PullQuote` (new, small reusable component).

**Interaction/state notes:** Static content, no interaction beyond standard scroll-fade-in (defer choreography to motion-designer). No loading/error/empty states (static copy).

**Content slots:** `problemNarrative` (2–3 paragraphs, service-specific pain points the target buyer feels — copywriter, informed by ICP research), optional 1 pull-quote line.

---

## 3. Our Approach — Numbered Methodology

**Layout:** Ink background. This is the service-specific counterpart to homepage's "Ayava Method" (§6 of homepage spec) — **reuse `MethodTimeline`/`MethodStep`/`ConnectorLine` components directly**, do not build new ones. Same layout rules apply: horizontal numbered sequence desktop (recommend locking to 4 steps per service for clean 3-col-each grid; if a service genuinely needs 5, switch to horizontal-scroll rail rather than forcing uneven columns — same guidance as homepage). Section header cols 1–6 with eyebrow "Our Approach to {Service Name}".

**Responsive:** Identical to homepage §6 — vertical stack with left connector rule at 1024 and below (recommend vertical switch at 1024, not just mobile, for consistency).

**Components:** `MethodTimeline`, `MethodStep`, `ConnectorLine` (all reused, homepage inventory).

**Interaction/state notes:** Same as homepage §6 — scroll-triggered line-draw (SVG stroke-dashoffset), staggered step fade-in, defer choreography to motion-designer.

**Content slots:** `approachSteps[]` — 4 (or 5, flagged) step name + description pairs, unique per service (e.g. SEO might be "Audit → Technical Fix → Content & Authority → Track & Iterate"; Meta Ads might be "Audit & Pixel Setup → Creative & Audience Strategy → Launch & Optimize → Scale & Report"). Copywriter/strategist to author per service — not invented here, pull from master blueprint's per-service methodology if defined there, else draft against known Ayava practice.

---

## 4. Deliverables Checklist

**Layout:** Ivory background. Header cols 1–6. Below: checklist grid, 2-col on desktop (cols 1–6 / 7–12 split, or true 2-column CSS grid independent of 12-col if item count is large), each item: check-icon (viridian accent permitted here as the page's single jewel-tone use, OR ink checkmark — recommend ink/bronze checkmark by default and reserve viridian for the one data-viz use elsewhere on page if a chart exists in Pricing/Case Study; do not double-use viridian on one page) + item label (Body), rows separated by `1px` bronze-hairline-equivalent (use slate-deep per token set) dividers or simple `16px` vertical gap without rules — recommend gap-only for a lighter checklist feel.

**Responsive:**
- 1024: 2-col retained if item count ≤ 10, else single column.
- 768/428/375: single column, `12px` gap between items, checkmark icon `20px`, left-aligned with `12px` gap to label text.

**Components:** `ChecklistGrid` (new), `ChecklistItem` (new).

**Interaction/state notes:** Static list, no interaction. Icons are decorative (`aria-hidden="true"`) with the check-state implied by the item simply being present in the list — do not rely on icon alone to convey meaning (list semantics: use a real `<ul>`, not divs, for SR users).

**Content slots:** `deliverables[]` — 6–12 concrete deliverable line items per service (e.g. for SEO: "Full technical SEO audit," "Keyword & competitor research," "On-page optimization (up to X pages)," "Monthly performance report" — copywriter to draft per service, must be concrete/deliverable not vague ("SEO magic")).

---

## 5. Tools & Platforms Used (Logo Row)

**Layout:** Ivory background, no section-break padding from §4 above beyond a `1px` slate-deep hairline divider + `48px` padding (treat as a tightly-coupled sub-section, not a full new section — visually reads as "part of" the deliverables/credibility block). Static grid (not marquee, per homepage's Awards Wall precedent for finite small sets): row of tool/platform logos, uniform max-height `28px`, grayscale/monochrome treatment (ink or slate) by default, full color on hover (desktop) as a small delight — optional, confirm with creative-director.

Grid: flex-wrap row, centered or left-aligned to cols 1–8, `40px` gap between logos, wraps naturally.

**Responsive:** 768: gap reduces to `24px`. 428/375: logos wrap to a tighter grid, max-height `20px`, `20px` gap, may need 2 logos per visual "row" minimum for balance — allow natural wrap, do not force a rigid column count at this size.

**Components:** `ToolsRow` (new), `PressTile`-equivalent pattern reused (rename `ToolTile` for semantic clarity in this context, same visual treatment as homepage `PressTile`).

**Interaction/state notes:** If any logo is a link to the platform (generally not needed — decorative credibility signal only), same external-link a11y rules as homepage Press Wall (`target="_blank" rel="noopener"` + visually-hidden "opens in new tab"). Default: NOT links, purely decorative row with a visually-hidden text list of tool names for SR users (`aria-label="Tools and platforms used: Meta Business Suite, Google Ads, SEMrush, HubSpot..."` on the wrapper, or a visually-hidden `<ul>` matching the homepage LogoMarquee accessible-list pattern).

**Content slots:** `tools[]` — service-specific real platform logos (e.g. SEO: SEMrush, Ahrefs, Google Search Console, Screaming Frog; Meta Ads: Meta Business Suite, Meta Ads Manager; Email/CRM: HubSpot, Klaviyo, Mailchimp; Analytics/CRO: Google Analytics 4, Hotjar, GTM). These are real third-party tool logos (not client logos) — safe to use with standard trademark-fair-use caveat (flag to legal/founder: confirm acceptable use of third-party logos, typically fine for "tools we use" context but worth a one-line sign-off).

---

## 6. Relevant Case Study Spotlight (with Metrics)

**Layout:** Ink background, full `160px`/`64px` section rhythm (new distinct section, visual break from Tools above). Reuses homepage's `CaseStudySpread` pattern but single-instance (not 3-stacked) and includes a compact stat row. Layout: cols 7 media / cols 5 text (or reverse, alternate per service programmatically — even-indexed services image-left, odd-indexed text-left, for template variety across the 15 pages) with `MediaFrame`.

Below/within the text column: 2–3 `StatCounter` instances in a tight row (reuse homepage component) IF real metrics exist for that project; if not, this row is omitted entirely (see content-slot note below — do not render empty stat boxes).

**Responsive:**
- 1024/768: media stacks above text, full-width, same as homepage Case Study collapse pattern.
- 428/375: media locks to 4:5 or 1:1, stat row (if present) becomes 2-col or stacked depending on count (2 stats = side by side; 3 stats = stacked to avoid cramped digits).

**Components:** `CaseStudySpread` (reused), `IndustryTag` (reused), `MediaFrame` (reused), `ArrowLink` (reused), `StatCounter` (reused, conditional render).

**Interaction/state notes:** Same single-clickable-region pattern as homepage Case Studies (one `<a>` wrapping the spread, avoid nested links). `StatCounter` count-up on scroll-into-view, reduced-motion renders final value directly, same as homepage §4 rules.

**Content slots — service-to-project mapping (plausible spotlight candidates from the real 8-project portfolio, NOT fabricated pairings, confirm final choice with founder/creative-director per service):**

| Service | Suggested case-study project | Rationale |
|---|---|---|
| Website Design | Aura Estates, or Woodcraft Store Premium | Strong visual/design-forward builds |
| E-commerce Growth | Woodcraft Store Premium, Wooden Handicraft 3D | Actual e-commerce builds |
| Branding | Wooden Handicraft 3D, or Aura Estates | Visual identity-driven projects |
| SEO | FineTaxConsultancy, College IQ | Service/lead-gen businesses where organic visibility matters |
| Content Marketing | College IQ, FineTaxConsultancy | Education/professional-services content needs |
| Google Ads | NextepSolution, Nextep Ventures | B2B/tech lead-gen fit |
| Meta Ads / SMM | Aura Estates, Woodcraft Store Premium | Visual/consumer-facing brands suit social ad formats |
| Analytics/CRO | Woodcraft Store Premium, Wooden Handicraft 3D | E-commerce = natural CRO narrative |
| App Store Marketing/ASO | **No portfolio project maps to this** — flag: omit case study spotlight for this service page at launch, or use a generic "coming soon" empty-state (see below) rather than force-fitting an unrelated project |
| Video & Motion Production | Aura Estates (if video assets exist) or omit if none produced | Confirm actual video deliverables existed before claiming |
| PR/Reputation Management | **No clear portfolio match** — same omit/empty-state guidance as ASO |
| Email/CRM Marketing | FineTaxConsultancy, Nextep Ventures | B2B/service businesses plausible for CRM flows, confirm actual email work was delivered |
| Influencer Marketing | **No clear portfolio match** — omit/empty-state |
| AI Marketing | **No clear portfolio match** — this is likely a new/forward-looking service offering; omit case study, consider replacing this section with a "How we approach AI marketing" explainer for this one page only (content-model flag, not a layout change) |
| Dreamzcraft, NextepSolution unused above | Available as secondary options for Website Design / Branding / Google Ads if primary picks don't fit — flexible pool |

**CRITICAL — metrics honesty flag:** We do not have real, confirmed performance metrics (traffic %, conversion lift, revenue figures) for most of these 8 projects yet. The `StatCounter` row in this section must NOT render fabricated numbers. Content model should support a case study with ZERO stats (qualitative-only spread: project scope + deliverables + a MediaFrame, no numbers) as the default/safe state until founder confirms real, measurable outcomes per project. Mark every stat field in the CMS as `status: needs-confirmation` until sourced. For the 3–4 services with no portfolio match at all, render an **empty state**: a simpler prompt card ("We're building our {service} portfolio — talk to us about how we'd approach your project" + CTA into the lead-capture form) instead of a fabricated or borrowed case study.

---

## 7. Pricing Tiers Relevant to This Service

**Layout:** Ivory background. Header cols 1–6, centered eyebrow+H2 optional ("Investment" or "Packages"). Below: 3-col tier grid (12-col grid → 4 cols each), middle tier visually emphasized (raised card, subtle border-glow gold hairline only — 1px max, per gold-restriction token rule; do NOT gold-fill the card background) with a "Most Popular" `Tag` (reuse homepage `Tag`/`IndustryTag` pattern, restyle label).

Each `PricingCard`: tier name (H3), price (display font, large — gold color permitted here since it's a numeric/metric value per token rules), price qualifier ("starting at" / "/month", Caption), 4–8 feature line items (reuse `ChecklistItem` pattern from §4 for visual consistency), CTA button (`Button`, primary on emphasized tier / secondary on others).

**Responsive:**
- 1024: 3-col retained if container allows (944px/3 ≈ workable), else emphasized-tier-first single column with others below.
- 768: stacks to single column, emphasized tier shown first (reorder in DOM, not just visually, so keyboard/SR order matches visual priority).
- 428/375: single column full-width cards, `24px` gap, emphasized tier badge remains visible at top of that card.

**Components:** `PricingGrid` (new), `PricingCard` (new), `Tag` (reused), `ChecklistItem` (reused), `Button` (reused).

**Interaction/state notes:** Card hover (desktop, non-emphasized cards): subtle lift (`translateY(-4px)` + shadow), emphasized card has no additional hover-lift since it's already raised by default. Focus states on CTA buttons standard. No loading/error state needed (static pricing display) — BUT if pricing is later made dynamic/config-driven (tie-in with Package Builder/quote configurator flow), this section may need a "calculating..." loading skeleton — flag as a future enhancement, out of scope for this static tier display.

**Content slots:** **PLACEHOLDER-NEEDED — real pricing figures not locked yet.** `pricingTiers[]` = 3 tiers per service (naming convention TBD with founder — suggest generic "Starter / Growth / Enterprise" or service-specific naming, confirm with creative-director/copywriter for voice consistency), each with price, qualifier, and 4–8 feature bullets. Until real numbers are confirmed, render tier names + feature lists with price field showing "Custom Quote" or "Contact for Pricing" rather than a placeholder number like "$X,XXX" — do not ship fake numeric placeholders that could be mistaken for real pricing if a launch deadline is missed and this slips into production un-reviewed. Flag this explicitly in CMS as `status: pricing-tbd` per tier.

---

## 8. FAQ Accordion (Schema-Marked for SEO)

**Layout:** Ivory or ink (recommend ink here to create the break before ending on ink for cross-links §9 — check against template-level rhythm note in §0; adjust if needed once real content length is known). Header cols 1–6 ("Frequently Asked Questions"). Accordion list, cols 1–8 (not full-width — narrower reading column improves scanability), each `FAQItem`: question row (Body-L, bold or H3-light weight, full-width clickable row with chevron/plus icon right-aligned) + collapsible answer panel (Body, `16px` top padding when open).

**Responsive:** Same column narrowing pattern down to full-width at 768 and below. 428/375: question text may wrap to 2 lines, chevron icon stays fixed top-right of row (not vertically centered against wrapped text, to avoid icon drifting oddly — align to first line).

**Components:** `FAQAccordion` (new), `FAQItem` (new).

**Interaction/state notes:** Full keyboard operability: each question is a `<button aria-expanded="true|false" aria-controls="{answer-id}">`, answer panel `id` matches, `aria-hidden` toggles with expanded state. Only one item open at a time is a UX choice, not an a11y requirement — recommend allowing multiple open simultaneously (simpler mental model, avoids surprising auto-collapse of a different item). Chevron rotates 180deg on open (respects reduced-motion: instant swap, no rotation transition). Default state: all collapsed. No loading/error/empty states (static content, though if FAQ count is 0 for a given service, section should not render at all rather than show an empty header).

**SEO/schema requirement:** Each FAQItem's question/answer pair must be marked up with `FAQPage`/`Question`/`Answer` JSON-LD schema (coordinate exact implementation with seo-strategist and frontend-engineer) — this is a content/structured-data requirement, not a visual one, but flagging here since it constrains the component (question and answer text must exist as clean plain-text content, not embed rich interactive elements inside answers that would break schema extraction).

**Content slots:** `faqItems[]` — 5–8 question/answer pairs per service, written to target actual search-intent long-tail queries (seo-strategist to supply target questions, copywriter to draft answers). Answers should be genuinely useful (2–4 sentences), not thin SEO-bait content.

---

## 9. Related Services Cross-Links

**Layout:** Ink background. Header cols 1–6 ("Related Services" or "Pairs Well With"). Below: horizontal row of 3–4 compact service cards, reusing a condensed variant of homepage `ServiceCard` (standard variant, not featured) — cols 1–12 split evenly into 3 or 4.

**Responsive:**
- 1024: 3 per row.
- 768: 2 per row.
- 428/375: horizontal swipeable strip (scroll-snap) rather than full stack, since these are secondary/exploratory links, not primary content — keeps vertical scroll length reasonable on a page that already has 12 sections.

**Components:** `ServiceCard` (reused, standard variant), `RelatedGrid` (new, thin wrapper) or reuse `ServicesGrid` in a "compact" mode if engineer prefers a single configurable component over two.

**Interaction/state notes:** Identical hover/focus/active states as homepage §3 `ServiceCard`. Cards link to other `/services/[slug]` pages within this same template.

**Content slots:** `relatedServiceSlugs[]` — 3–4 manually curated or rule-based (same category/complementary function) related services per service page (e.g. SEO page links to Content Marketing, Analytics/CRO, Google Ads). Curation logic: strategist/PM to define the relationship matrix once across all 15 services rather than ad hoc per page, so it's consistent (e.g. a simple lookup table: service → array of related slugs).

---

## 10. Related Industry Cross-Links

**Layout:** Ivory background. Header cols 1–6 ("Who We Do This For" or "Industries We Serve With This Service"). Below: reuse homepage `IndustryTile` pattern but condensed to a horizontal row of 3–5 tiles rather than the full 10-tile grid (this is a filtered subset relevant to the current service, not the full industry list).

**Responsive:** Same collapse pattern as homepage §7 `IndustryGrid` but scaled to fewer items — 1024: row of 3–4; 768: 2-col wrap; 428/375: horizontal swipe strip (consistent with §9 mobile treatment above, both are secondary cross-link rows).

**Components:** `IndustryTile` (reused), `IndustryGrid` (reused, subset mode).

**Interaction/state notes:** Identical to homepage §7 — hover reveal on desktop, always-visible caption on touch breakpoints (no-hover fallback), focus states mirror hover, `aria-label` = "{Industry} — {one-line description}" per tile.

**Content slots:** `relatedIndustrySlugs[]` — 3–5 industries most relevant to this service, pulled from the master blueprint's 10-industry taxonomy. Mapping logic same principle as §9: define once as a lookup table (service → relevant industries) for consistency across all 15 pages.

---

## 11. Embedded Lead-Capture Mini-Form / Calculator

**Layout:** Ink background, narrower centered column (cols 3–10) similar to homepage CTA Band framing, but this is a functional embedded form/calculator, not just a CTA button. Two possible variants depending on service (content-model decision, not purely visual):

**Variant A — Mini intake form** (for most services): H2 prompt ("Let's Scope Your {Service Name} Project"), short form: Name, Email, Company (optional), 1 dropdown ("Project stage: Just exploring / Ready to start / Have a specific brief"), submit button. This is a lightweight capture, NOT the full multi-step Smart Intake Form (that lives on its own dedicated flow/page — this is a feeder into it).

**Variant B — Simple calculator widget** (for services where a quick estimate makes sense, e.g. Meta Ads/Google Ads "estimated ad spend → estimated reach" or Website Design "pages needed → estimated timeline"): 2–3 input fields (sliders or number inputs) driving a live-updating output value, "Get Full Quote" CTA below the estimate that routes into the full Package Builder/Quote Configurator flow (separate flow spec, see note below).

Card container: `padding: 48px` desktop / `24px` mobile, ivory or ink-raise (#141210) surface on the ink section background to create card separation (`ink-raise` token — use here, appropriate use case per token set), `1px` slate border.

**Responsive:**
- 1024/768: form/calculator fields stack to single column within the card, card width scales to container.
- 428/375: full-width card (minus outer margin), all fields full-width stacked, `16px` gap between fields, submit button full-width.

**Components:** `LeadCaptureCard` (new), `MiniIntakeForm` (new) OR `MiniCalculator` (new) — content model picks variant per service, `FormField` (new, reusable: label + input/select/slider + error message slot), `Button` (reused).

**Interaction/state notes — full state set required (per task instructions):**
- **Default:** empty fields, placeholder text in inputs, submit button enabled-but-inert (or disabled until required fields filled — recommend enabled with inline validation on submit, less friction than disabled-until-valid for a short form).
- **Focus:** standard 2px ring per accessibility baseline, applied per input.
- **Hover:** submit button standard `Button` hover treatment; input fields get subtle border-color shift (slate → ink/ivory depending on bg) on hover to signal interactivity.
- **Active/typing:** border stays in focus-ring state while typing, live character count only if a field has a max-length (unlikely needed here).
- **Loading (submit):** button shows spinner + disabled state, fields become read-only/disabled during submission to prevent double-submit, `aria-busy="true"` on the form.
- **Error:** field-level inline error message below the offending field (`role="alert"` or `aria-live="polite"` region tied via `aria-describedby`), e.g. "Please enter a valid email." Form-level error (submission failed, e.g. network issue) shown as a banner at top of card, `aria-live="assertive"` since it's an unexpected failure state, with a retry affordance.
- **Empty (calculator variant, pre-interaction):** output value shows a neutral placeholder ("Enter your details above to see an estimate") rather than a `$0` or `0` that could read as a real (low) estimate.
- **Success:** form replaced in-place (not a separate page navigation, to keep user on-page) with a confirmation message + optional secondary CTA ("Book a call now" / "Explore another service"), `aria-live="polite"` announcement.

**Content slots:** Variant choice per service (A or B) — PM/strategist to decide which services benefit from a calculator vs. simple form (recommend calculator only for Meta Ads, Google Ads, Website Design, E-commerce Growth, App Store Marketing where a quick numeric estimate is meaningful; simple intake form for the rest). Form copy (prompt headline, field labels, success message) — copywriter. **This section's calculator variant is a simplified single-page teaser of the full ROI Calculator / Package Builder flow — see §"Related Multi-Step Flows" below for the dedicated flow spec; do not conflate the two in implementation, this embedded widget should be lightweight (client-side estimate only, no backend quote generation) while the full flow is the authoritative configurator.**

---

## 12. Sticky CTA Sidebar on Scroll

**Layout:** Fixed/sticky positioned element, NOT part of the 12-col document-flow grid — overlays independently. Desktop (1440/1920): docks to right edge, `24px` from viewport right edge, vertically centered or pinned to a fixed offset from top (recommend `pinned at 50% viewport height, translateY(-50%)`, so it doesn't drift with scroll once engaged), appears after user scrolls past the Hero section (trigger: Hero's bottom edge exits viewport), disappears/pauses when user reaches the embedded Lead-Capture section (§11) or Footer, since the primary CTA is already in view at that point (avoid redundant competing CTAs on screen simultaneously).

Compact card: service name (Caption/Label), short prompt ("Ready to talk?"), primary `Button` (small/compact variant — flag to engineer if a new compact `Button` size token is needed, extend the existing variant set rather than one-off styling), optional secondary "Call us" link with phone number if applicable.

**Responsive:**
- 1024: same right-dock behavior if container width allows without overlapping content margin; if cramped, reduce to icon-only collapsed state that expands on hover/tap (flag as optional — simpler to just keep it compact-card at this size if margin allows, confirm against actual 1024 outer-margin math: 40px margin should be sufficient for an 80–100px-wide compact sidebar chip).
- 768: convert to a bottom-docked horizontal bar (full-width, fixed to viewport bottom) instead of a right-side sidebar — sidebars don't work well on tablet-portrait/mobile widths. Bar contains service name (optional, may omit if space-constrained) + single primary CTA button, `56px` height, ink-raise or ink background with `1px` top border (slate-deep).
- 428/375: same bottom-docked bar pattern, full-width button fills most of the bar with minimal padding, ensure it does not overlap/obscure the embedded lead-capture form or footer CTA when those are in view (same show/hide trigger logic as desktop — hide when §11 or footer enters viewport).

**Components:** `StickyServiceCTA` (new, desktop/sidebar variant), `StickyMobileCTABar` (new, mobile/tablet variant) — likely two components sharing a data/logic layer (visibility trigger, content) but different visual shells given how different sidebar-vs-bar patterns are; flag to frontend-engineer whether to implement as one component with responsive CSS repositioning (position:fixed right→bottom via media query) vs. two components — either is valid, recommend one component with responsive positioning if the internal content structure stays simple (name+prompt+button), to avoid duplicated logic.

**Interaction/state notes:** Visibility is scroll-triggered (IntersectionObserver watching Hero-bottom and Lead-Capture-top/Footer-top as sentinels) — entrance/exit transition (fade+slight slide) is a motion-designer call, but note the underlying show/hide trigger logic here so engineer can scaffold sentinels independent of the animation choreography. Must respect `prefers-reduced-motion` (no slide, just instant show/hide or simple opacity fade without transform). Fully keyboard-accessible: when visible, the CTA button/link must be in the natural tab order (not visually-floating-but-DOM-detached in a way that breaks tab order — position it in the DOM near the top of the page content or use appropriate tabindex management so it doesn't force keyboard users through 11 sections before reaching a persistently-visible CTA; recommend placing it early in DOM order with `position:fixed` visually, common accessible pattern). On focus (e.g. user tabs to it), it should already be visible regardless of scroll position — do not gate visibility purely on scroll if that would hide a focused, interactive element from view.

**Content slots:** `serviceName` (from same CMS field as Hero), short CTA prompt copy (can be generic template copy: "Ready to talk about {service}?" — mail-merge style, not unique per-service copywriting needed here), CTA button label/href (same destination as Hero primary CTA, likely intake form or this page's §11 lead-capture anchor), optional phone number (real, once available — flag if not yet confirmed).

---

## Related Multi-Step Flows (Referenced, Not Detailed Here)

This service template's §11 embedded widget and CTAs route into larger multi-step flows that deserve their own dedicated flow specs (separate deliverable, flagging scope here so nothing is assumed to be covered by this doc):
- **Smart Intake Form** (multi-step qualification form)
- **Package Builder / Quote Configurator** (the authoritative pricing/quote tool, distinct from the lightweight §11 calculator teaser)
- **ROI Calculator** (likely its own standalone marketing tool/page, possibly linked from relevant service pages e.g. Meta Ads/Google Ads/E-commerce Growth)
- **Client Portal Login/Dashboard** (post-sale, not part of the public service-page funnel)

These four flows are NOT specified in this document and should be treated as open scope for a follow-up UX flow spec (user-flow diagrams, step-by-step field lists, state handling per step) — flag to project-manager to schedule as next deliverable.

---

## Cross-Section Notes for Engineer (Service Template)

1. **New components introduced in this template** (not in homepage inventory, register alongside it): `ServiceHero`, `Breadcrumb`, `ServiceHeroVisual`, `NarrativeBlock`, `PullQuote`, `ChecklistGrid`, `ChecklistItem`, `ToolsRow`, `ToolTile`, `PricingGrid`, `PricingCard`, `FAQAccordion`, `FAQItem`, `LeadCaptureCard`, `MiniIntakeForm`, `MiniCalculator`, `FormField`, `StickyServiceCTA`, `StickyMobileCTABar`.
2. **Reused-as-is from homepage inventory:** `Button`, `SectionHeader`, `StatCounter`, `ArrowLink`, `Tag`/`IndustryTag`, `MediaFrame`, `MethodTimeline`/`MethodStep`/`ConnectorLine`, `ServiceCard`, `IndustryTile`/`IndustryGrid`, `CaseStudySpread`, `StickyHeader` (optional wrapper).
3. **Placeholder-needed flag (pricing):** §7 Pricing Tiers has no locked figures. Ship with "Custom Quote"/"Contact for Pricing" copy, never a fabricated numeric placeholder, tracked in CMS as `status: pricing-tbd`.
4. **Fabrication-risk flag (case studies):** §6 Case Study Spotlight — most of the 8 real projects lack confirmed measurable metrics. Default to qualitative-only spreads (no `StatCounter` row) until founder confirms real numbers per project; 3–4 services (ASO, PR/Reputation, Influencer Marketing, AI Marketing) have no clean portfolio match at all and should render an empty-state prompt card instead of a forced/borrowed case study.
5. **Schema/SEO dependency:** §8 FAQ requires `FAQPage` JSON-LD — coordinate implementation with seo-strategist before engineering builds the accordion data layer, so question/answer text stays clean and schema-extractable.
6. **This template is data-driven, not 15 bespoke pages** — all content slots listed per section must map to CMS fields per the data model note in §0.
7. **Accessibility baseline from homepage §0 applies in full**, including landmark structure (`<section aria-labelledby>`), focus rings, contrast rules, reduced-motion handling, and keyboard operability for all interactive components listed above (accordion, sticky CTA, forms, cross-link grids).
