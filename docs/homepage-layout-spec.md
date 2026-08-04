# Ayava Creatives — Homepage Layout Spec
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft

## 0. Foundations (apply to every section below)

**Grid system:** 12-column editorial grid, asymmetric use encouraged (do not center everything — favor 5/7, 4/8, 3/9 splits over 6/6).

| Breakpoint | Container max-width | Columns | Gutter | Outer margin |
|---|---|---|---|---|
| 1920 | 1760px | 12 | 24px | 80px |
| 1440 | 1280px | 12 | 24px | 64px |
| 1024 (tablet landscape) | 944px | 12 | 20px | 40px |
| 768 (tablet portrait) | 688px | 8 | 20px | 32px |
| 428 (mobile large) | fluid | 4 | 16px | 20px |
| 375 (mobile) | fluid | 4 | 16px | 16px |

**Spacing scale (extend existing token set, do not invent new values):** `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200` (px, mapped to Tailwind spacing scale — engineer should register these as the canonical section-rhythm scale if not already present).

**Section vertical rhythm:**
- Desktop (1440/1920): `160px` top/bottom padding between major sections, `96px` for tightly related sub-sections.
- Tablet (768/1024): `96px`.
- Mobile (375/428): `64px`.

**Color usage baseline:** ink (#0B0A08) as primary background for hero/theater/CTA-band sections; ivory (#F8F1E2) as primary background for content-dense sections (Services, Results, Method, Industries, Insights); gold (#CBA135) reserved for accents/CTAs/active states only — never as a large fill; bronze (#6B5A2E) for secondary text/dividers on ivory, or muted UI chrome on ink.

**Type scale note:** display font (serif) for all headlines H1–H3; sans (grotesque) for body, labels, UI chrome, nav, buttons. Do not use display font below 20px. Engineer/creative-director to confirm final numeric type scale — this doc references "H1/H2/H3/Body-L/Body/Label/Caption" as semantic tokens rather than raw px, to avoid one-off values.

**Accessibility baseline (applies everywhere):**
- All interactive elements: visible focus ring, 2px, gold on ink backgrounds / ink on ivory backgrounds, offset 2px, never `outline: none` without replacement.
- Contrast: all text must hit WCAG 2.2 AA (4.5:1 body, 3:1 large text ≥24px/19px-bold). Gold-on-ivory and gold-on-ink text must be checked — gold (#CBA135) on ivory (#F8F1E2) fails AA for body text; restrict gold text to large headline sizes or use bronze/ink for body copy on ivory.
- All decorative motion/marquees/carousels: respect `prefers-reduced-motion` — pause auto-scroll, disable parallax.
- All custom carousels/tickers: keyboard-operable (arrow keys + Tab-reachable controls), `aria-live="polite"` on ticker/counter regions that update passively, `role="region"` + `aria-label` on each major section.
- Landmark structure: each of the 14 sections is a `<section>` with an accessible name (`aria-labelledby` pointing to its heading id).

---

## 1. Cinematic Hero

**Layout:** Full-viewport height (`100svh`, fallback `100vh`), ink background. Content on asymmetric 7-col left block (cols 1–7), vertically centered with slight upward bias (align content to 45% viewport height, not exact center, to leave room for the stat ticker docked at bottom). Cols 8–12 reserved for WebGL/motion canvas (coordinate with webgl-3d-artist) — on this doc treat as an empty layout slot, `HeroCanvasSlot`, absolutely positioned behind/beside text with `z-index` below text.

- Kinetic headline: oversized display type, ~`clamp(48px, 7vw, 128px)` at 1920, line-height 0.95, max 2 lines. Left-aligned to col 1.
- Subheadline: Body-L, max-width 44ch, col 1–6, `24px` below headline.
- CTA row: two buttons (primary gold-fill "Start Your Project", secondary ghost-outline "See Our Work"), `40px` below subhead, `16px` gap between buttons.
- Live stat ticker: docked full-width strip pinned to bottom of viewport, ink-bronze border-top 1px, horizontal row of 3–4 stats (e.g. "120+ Projects Delivered", "8 Industries", "24hr Avg Response"), each stat = number (animated count-up on load) + label.

**Responsive:**
- 1920/1440: as above, canvas slot visible cols 8–12.
- 1024/768: text block becomes full-width (cols 1–8 of 8-col grid), canvas slot moves behind text as full-bleed background layer at reduced opacity/scale, or hides entirely if performance-costly (flag to webgl-3d-artist for a decision). Stat ticker becomes horizontally scrollable single row (no wrap) with scroll-snap.
- 428/375: Headline drops to `clamp(32px, 10vw, 44px)`, 3 lines max. CTA buttons stack full-width. Stat ticker becomes 2x2 grid instead of a row, or horizontally swipeable strip with visible partial-next-card affordance.

**Components:** `Hero`, `KineticHeadline`, `HeroCanvasSlot` (3D placeholder), `StatTicker`, `StatCounter`, `Button` (primary/secondary variants).

**Interaction/state notes:** Headline may have scroll-triggered exit (parallax fade/scale on scroll past hero) — flag for motion-designer, don't implement choreography here. StatCounter count-up triggers once on mount/in-view, respects reduced-motion (render final value immediately, no animation). Buttons: default/hover(scale 1.02 + gold glow on primary, gold border fill on secondary)/focus(ring)/active(scale .98)/disabled(50% opacity, not used here but define for reuse).

**Content slots:** Headline copy, subheadline copy, 2 CTA labels + hrefs, 3–4 stat number+label pairs (real figures once available; placeholder now — flag as **STUB DATA**, do not fabricate false claims like "500+ clients" — use accurate figures scoped to founder's actual portfolio, e.g. "8 Industries Served", "100% Client-Led Process," or mark explicitly TBD).

---

## 2. Trust Bar (Client Logo Marquee)

**Layout:** Full-width ivory strip, `96px` vertical padding (desktop) / `48px` (mobile). Optional small eyebrow label centered or left-aligned col 1 ("Trusted across industries"). Logos in infinite horizontal marquee, single row, ungapped rhythm of `64px` between logo blocks, logos vertically centered, uniform max-height `32px` (ink or bronze monochrome treatment for visual consistency, regardless of source logo color).

**Responsive:** Marquee speed/logo size scales down on mobile (max-height 24px, gap 40px). Marquee never wraps — always horizontal scroll/marquee at all breakpoints.

**Components:** `LogoMarquee`, `LogoTile`.

**Interaction/state notes:** Auto-scrolling marquee, pause-on-hover (desktop) and pause-on-touch (mobile), pause entirely under `prefers-reduced-motion` and render as a static wrapped row instead. Marquee must be `aria-hidden` decorative duplicate set with one accessible list of logos exposed via visually-hidden `<ul>` for screen readers (avoid announcing infinite duplicated DOM).

**Content slots:** **STUB DATA — no real client logos yet.** Use text-based placeholder wordmarks styled as logo tiles (e.g. simple sans-serif company-name treatments) sourced from the 8 real portfolio names (NextepSolution, Nextep Ventures, Dreamzcraft, FineTaxConsultancy, Woodcraft Store Premium, Wooden Handicraft 3D, Aura Estates, College IQ) as legitimate placeholders since these are real projects — do not invent additional fake client names beyond this list.

---

## 3. Services Showcase (15 services, interactive grid)

**Layout:** Ink or ivory background (recommend ink for contrast against surrounding ivory sections — alternate section backgrounds through the page for rhythm). Section header: eyebrow label + H2, cols 1–6, left-aligned. Grid below: 12-col desktop grid, 3 services per row of 4 columns each → 5 rows of 3, OR asymmetric editorial layout: first service tile spans 6 cols (featured/larger card), remaining 14 tiles in a 4-col-each grid (4 per row). Recommend the latter for "editorial asymmetry" — 1 hero tile + standard grid below.

- Each ServiceCard: number (01–15, display font, bronze), service name (H3), 1-line description (Body, truncated/revealed on hover or always visible per card height), icon or micro-illustration slot, arrow/chevron affordance.
- Card min-height desktop: `280px`. Gap: `24px` (desktop), `20px` (tablet), `16px` (mobile).

**Responsive:**
- 1920/1440: as above, 4 cards per row (12-col / 3-col-each) after the featured tile.
- 1024: 3-col-each → still readable at 944px container, or drop featured-tile span to 8-col if too cramped; grid becomes 3 per row.
- 768: 2 per row (4-col-each of 8-col grid).
- 428/375: 1 per row, full-width stacked cards, gap `16px`, card min-height reduces to `160px`, description can collapse to expand-on-tap (accordion) to save vertical space — flag as optional; default is show full copy, no accordion needed if copy is short.

**Components:** `ServicesGrid`, `ServiceCard` (variants: featured/standard), `SectionHeader`.

**Interaction/state notes:** Card hover (desktop): background shifts to slight gold-tinted overlay or border animates gold, description text reveals if truncated, icon/arrow slides right 4px. Focus state mirrors hover for keyboard nav (cards are `<a>` or `<button>` — must be tabbable, one card per tab stop, `aria-label` = full service name). Active/pressed: scale .98. No loading/error/empty states needed (static content). Scroll-trigger: cards fade/slide up on enter-viewport, staggered — flag for motion-designer.

**Content slots:** 15 service names + 1-line descriptions + icon/illustration per service (copywriter + creative-director). Pull the 15-service list from the master blueprint's service taxonomy (not fabricated here — engineer/copywriter should reference blueprint PDF directly for exact names).

---

## 4. Results Strip (animated counters)

**Layout:** Full-width band, ivory or ink (contrast against Services above — pick opposite), `128px` vertical padding desktop / `64px` mobile. Row of 4 stat blocks, evenly split 12-col grid → 3 cols each. Each block: large number (display font, gold or ink depending on bg), label below (Label token), optional short qualifier caption.

**Responsive:** 1024/768: 2x2 grid. 428/375: stacked single column, `48px` gap between stat blocks, or horizontal swipe row with snap — prefer stacked for readability since this is a "credibility" section, not a carousel.

**Components:** `ResultsStrip`, `StatCounter` (reuse from Hero), `SectionHeader` (optional eyebrow above).

**Interaction/state notes:** Count-up animation triggered on scroll-into-view (IntersectionObserver, threshold ~0.4), plays once. Reduced-motion: render final numbers directly, no count animation. `aria-live="off"` here (not passive/ambient like a ticker) with the final value present in DOM text immediately for SR users (don't rely on animated JS text as the only accessible value — set the real number as text content, animate a visual overlay if needed, or ensure SR reads final value not intermediate frames).

**Content slots:** **STUB DATA** — 4 real, honest metrics tied to the actual current portfolio (e.g. "8 Industries Served," "8 Flagship Projects Delivered," "100% Founder-Led Delivery," "X Years Active") — copywriter/founder to confirm real numbers; do not invent inflated stats (no fake "500+ clients").

---

## 5. Featured Case Studies (3 flagship stories)

**Layout:** Ivory background. Section header cols 1–6. Below: 3 case-study blocks stacked vertically (not a 3-col row) — each full-width editorial spread alternating image-left/text-right, then text-left/image-right, then image-left/text-right again, for visual rhythm. Each spread: image/media col span 7, text col span 5 (or reverse), `96px` vertical gap between the 3 spreads.

- Each block: client/project name (H2 or H3), industry tag (Label, bronze pill), 2–3 line result summary, "View Case Study" link with arrow, large hero image/video-still of the work.

**Responsive:**
- 1024/768: image and text stack (image on top, full-width; text below, full-width), alternating left/right pattern collapses to consistent image-top/text-bottom for all 3.
- 428/375: same stacked pattern, image aspect ratio locks to 4:5 or 1:1 to control height, tighter gap `48px` between blocks.

**Components:** `CaseStudySpread`, `IndustryTag`, `MediaFrame` (image/video), `ArrowLink`.

**Interaction/state notes:** Image has subtle hover zoom (scale 1.03, desktop only, on hover of entire card). Entire spread is one clickable region (card-link pattern) — ensure only one focusable element per spread (wrap whole block in single `<a>` or use a single visible link with the rest as non-interactive, to avoid nested-link a11y issues). Scroll-trigger: fade/slide-in per spread — flag for motion-designer.

**Content slots:** Use 3 of the real portfolio projects as flagship placeholders — recommend Aura Estates (real estate/luxury — strong visual fit), Woodcraft Store Premium or Wooden Handicraft 3D (e-commerce/craft — strong visual fit), and NextepSolution or Dreamzcraft (tech/services). Copywriter to write result-summary copy per project; **note to founder: confirm actual measurable outcomes (traffic/conversion/revenue lift) before publishing claims — if unavailable, keep summaries qualitative (scope/deliverables) rather than fabricating metrics.**

---

## 6. The Ayava Method (4–5 step process)

**Layout:** Ink background. Header cols 1–6. Steps laid out as a horizontal numbered sequence on desktop: 12-col grid split evenly across 4 or 5 steps (5 steps = ~2.4 cols each, uneven — recommend either locking to 4 steps for clean 3-col-each, or using a horizontal-scroll rail for 5 steps rather than forcing an uneven grid). Recommend: connecting horizontal line/rule threading through step numbers (bronze, 1px) as a visual spine.

- Each step: large number (01–05, display font, gold), step title (H3), 2-line description (Body), connecting line to next step.

**Responsive:**
- 1024: steps may wrap to 2 rows (3+2 or 2+2+1) — connecting line breaks/reroutes per row, or switch to vertical layout at this breakpoint if the line-routing gets messy (recommend vertical switch at 1024 for simplicity).
- 768/428/375: vertical stacked list, connecting line becomes vertical rule on the left (col 1), numbers left-aligned, `32px` gap between steps.

**Components:** `MethodTimeline`, `MethodStep`, `ConnectorLine` (horizontal variant desktop, vertical variant mobile).

**Interaction/state notes:** Scroll-triggered: connector line "draws" progressively as user scrolls through section (line-drawing animation) — flag for motion-designer, but note the underlying mechanism (SVG stroke-dashoffset tied to scroll progress) so engineer can scaffold the SVG structure. Steps fade in individually as they enter viewport.

**Content slots:** 4–5 step names + descriptions (Discover, Strategize, Build, Launch, Optimize — or per blueprint's actual named process; pull exact step names from blueprint PDF, not invented here).

---

## 7. Industries We Dominate (10 industry tiles)

**Layout:** Ivory background. Header cols 1–6. Grid: 10 tiles, 5 cols x 2 rows at desktop (12-col grid → each tile spans ~2.4 cols; recommend evening this out as a fixed 5-column CSS grid independent of the 12-col text grid, common for tile grids). Gap `16px`. Each tile: square or 4:5 aspect, background image/texture representing industry, industry name overlay (bottom-left, Label/H3 size), on-hover reveal of a 1-line "what we do here" caption.

**Responsive:**
- 1024: 4 cols x 3 rows (last row has 2 tiles, left-aligned not centered/stretched).
- 768: 3 cols, wraps to 4 rows.
- 428/375: 2 cols x 5 rows, gap `12px`, tiles aspect-ratio 1:1 to keep touch targets reasonably large (min 44x44px interactive area — tiles are far larger than minimum so this is not a concern here).

**Components:** `IndustryGrid`, `IndustryTile`.

**Interaction/state notes:** Hover (desktop): image scales 1.05, dark gradient overlay intensifies, caption fades in. Focus: same treatment for keyboard nav, each tile is a link/button with `aria-label` = "{Industry name} — {one-line description}". Mobile: no hover state available — caption should be always-visible (not hover-gated) on touch breakpoints, since there's no hover to reveal it.

**Content slots:** 10 industry names + 1-line "what we do" captions + representative imagery (per blueprint's industry list — pull exact 10 from blueprint PDF).

---

## 8. Why Ayava (Differentiators)

**Layout:** Ink background. Asymmetric split: left col 1–4 = large H2 statement + intro line (sticky-positioned on desktop scroll within section bounds, optional), right col 5–12 = list of 4–6 differentiator rows, each row: icon/number + title (H3) + 2-line description, divided by 1px bronze hairline rules between rows.

**Responsive:**
- 1024/768: left statement un-stickies, stacks above the list, full-width.
- 428/375: same stacked order, differentiator rows lose icon-left/text-right inline layout and stack icon-above-text if icons are used, or keep icon inline at reduced size (24px) if space allows — prefer icon inline-left, text right even on mobile since it's just icon+heading+body, not a full 2-col layout.

**Components:** `DifferentiatorList`, `DifferentiatorRow`, `StickyHeader` (optional sticky behavior wrapper).

**Interaction/state notes:** Rows fade/slide in on scroll, staggered. No hover interaction needed (static informational rows) beyond a subtle hairline-to-gold transition on hover if rows are ever made clickable (they're not, by default — flag as optional future enhancement, not required now).

**Content slots:** 4–6 differentiator titles + descriptions (e.g. "Founder-Led Delivery," "Multi-Industry Range," "Enterprise-Grade Craft at Boutique Scale," etc.) — copywriter to draft based on blueprint positioning; these should be true differentiators specific to Ayava/Ayush's actual practice, not generic agency claims.

---

## 9. Testimonial Theater (video carousel)

**Layout:** Full-bleed ink section, `160px`/`64px` vertical padding. Large central video/quote stage, cols 3–10 (centered, generous side margins for "theater" framing), 16:9 or cinematic 2:1 video frame. Below/beside: thumbnail rail of other testimonials (avatar/name/company), horizontal row, active one highlighted with gold underline/border.

**Responsive:**
- 1024: stage narrows to cols 2–11 (mostly full-width), thumbnail rail remains horizontal scroll.
- 768/428/375: stage full-width (full container), thumbnail rail becomes horizontally swipeable strip below, scroll-snap per item, min touch target 44px height per thumbnail.

**Components:** `TestimonialTheater`, `VideoStage`, `TestimonialThumb`, `CarouselControls` (prev/next arrows + dot/index indicator).

**Interaction/state notes:** Must be fully keyboard operable: arrow-key or Tab+Enter to switch active testimonial, visible focus states on thumbnails and controls. Video: default state = poster image + play button overlay (do NOT autoplay video with sound); loading state = spinner/skeleton on poster while video metadata loads; error state = fallback to quote-only text card if video fails to load, with clear "video unavailable" affordance rather than a broken player. Carousel auto-advance (if any) must pause on hover/focus and respect reduced-motion (disable auto-advance entirely, require manual nav).

**Content slots:** **STUB DATA — no real client testimonials/video yet.** Use placeholder quote cards styled identically to final treatment, clearly marked in CMS/content model as `status: placeholder`, sourced ideally from real (even if brief/informal) feedback from the 8 portfolio clients if any exists, otherwise generic aspirational placeholder text clearly flagged for founder to replace before launch — do not publish fabricated client quotes attributed to real company names without consent.

---

## 10. Awards & Press Wall

**Layout:** Ivory background, `96px` padding. Simple horizontal wall/grid of press-logo or award-badge tiles, similar treatment to Trust Bar but static grid (not marquee) since likely fewer items: 6-col grid desktop (up to 6 per row), wraps as needed.

**Responsive:** 768: 3-col grid. 428/375: 2-col grid.

**Components:** `PressWall`, `PressTile` (logo or badge + optional publication name label).

**Interaction/state notes:** Static, no animation beyond standard scroll-fade-in. If tiles link out to press articles, they need hover underline + focus state + `target="_blank" rel="noopener"` + visually-hidden "opens in new tab" text.

**Content slots:** **STUB DATA — no real awards/press yet.** Recommend omitting this section entirely from initial launch (flag to project-manager/creative-director) rather than filling with fake press logos — publishing fabricated award/press claims is a credibility and potential legal risk. If section is kept for future-proofing, build it with an "empty state" (e.g. hidden via feature flag) until real content exists, rather than fake placeholders shipped to production.

---

## 11. Insights Preview (3 articles)

**Layout:** Ink or ivory (alternate from Awards above). Header cols 1–6 with "View All Insights" link right-aligned same row (cols 7–12, right edge). Below: 3-col grid, 1 card each, equal width (4 cols each of 12).

- Each ArticleCard: image (16:9), category tag (Label, bronze), title (H3), 1-line excerpt, read-time/date (Caption).

**Responsive:**
- 1024: 3-col retained if it fits (944px container / 3 ≈ 300px cards, workable) — else drop to 2-col + 1 wrapping.
- 768: 2-col grid, 3rd card spans full width below or wraps to 2nd row alone (left-aligned, not stretched).
- 428/375: 1-col stacked, `24px` gap.

**Components:** `InsightsGrid`, `ArticleCard`.

**Interaction/state notes:** Card hover: image scale 1.03, title underline or color-shift to gold. Focus mirrors hover. Entire card single click-target pattern (same nested-link caution as Case Studies section).

**Content slots:** 3 article title/excerpt/category/image placeholders — **STUB DATA**, articles don't exist yet; copywriter/content team to produce actual blog posts pre-launch, or section ships with "Coming Soon" placeholder cards clearly marked, per project-manager's call on launch scope.

---

## 12. Global Presence Map

**Layout:** Full-bleed ink section. Header centered or left col 1–6. Large map visualization centered, cols 2–11, world map (stylized/line-art, ink+bronze+gold treatment) with location pins/markers for Dehradun (HQ) and any served regions/client locations. Below or beside map: simple text list of locations (city, country) as an accessible fallback to the visual map.

**Responsive:**
- 1024/768: map scales down, retains full-width within container, pins may need larger touch targets on tablet.
- 428/375: consider swapping the interactive/decorative map for a simplified static graphic + the location list becoming the primary content (map as decorative background, list as the actual readable content), since detailed interactive maps are hard to use well at 375px width.

**Components:** `GlobalMap` (coordinate with webgl-3d-artist if this is a 3D/interactive globe rather than flat map — flag that decision explicitly), `LocationList`, `MapPin`.

**Interaction/state notes:** If pins are interactive (tooltip on hover/click showing location detail), ensure keyboard access (pins as focusable buttons) and that the same information exists in the plain-text `LocationList` for screen-reader/no-JS fallback — never make the map the sole source of this information.

**Content slots:** HQ location (Dehradun, India — real), plus any additional service regions/target markets (per blueprint — likely aspirational "global" positioning even if current client base is India-based; copy should be honest about HQ vs. aspirational service area, e.g. "Headquartered in Dehradun. Serving clients worldwide" rather than implying physical offices that don't exist).

---

## 13. CTA Band

**Layout:** Full-width ink (or gold-accented dark) band, `128px`/`64px` padding, content centered, max-width col 3–10 (narrow, focused). Large H2 statement, short supporting line, single primary CTA button (large size variant), optional secondary "Book a Call" link below/beside.

**Responsive:** Scales typographically per standard clamp; buttons stack full-width at 428/375 with `16px` gap.

**Components:** Reuse `Button`, plus `CTABand` wrapper.

**Interaction/state notes:** Standard button states (default/hover/focus/active). This band may be sticky-adjacent to a persistent mobile CTA bar elsewhere in the site (flag as a global-nav concern, not this section specifically).

**Content slots:** CTA headline, supporting line, button label + href (likely to intake form / package builder flow — coordinate routing with frontend-engineer).

---

## 14. Mega-Footer

**Layout:** Ivory or ink (recommend ink to bookend the page against the ink hero). 12-col grid: logo+tagline+social block col 1–3, then 3–4 link columns (Services, Company, Resources, Legal) spanning col 4–12 evenly (each ~2.25 cols), bottom bar below with copyright + legal links + language/region switcher if applicable, full-width, `32px` top border (bronze hairline).

- Newsletter signup input may live in the logo block or its own column — include as a component: email input + submit button, inline on desktop, stacked on mobile.

**Responsive:**
- 1024: link columns may reduce to 3 across, logo block full-width above.
- 768: 2-col link layout (2 columns of links per row), logo/newsletter block full-width above.
- 428/375: all columns stack fully, each link group becomes a collapsible accordion (optional, to reduce scroll length) or simply stacks with headers — recommend simple stack (no accordion) for a footer, accordions add unnecessary interaction cost; keep it a straightforward vertical list grouped by heading.

**Components:** `MegaFooter`, `FooterLinkColumn`, `NewsletterForm`, `SocialLinks`, `FooterBottomBar`.

**Interaction/state notes:** `NewsletterForm` needs full state set: default, focus (input), hover (submit button), loading (submit button spinner + disabled state on submit), success (inline confirmation message, `aria-live="polite"`), error (inline validation message tied to input via `aria-describedby`, e.g. invalid email format). All footer links need standard hover/focus underline treatment; keyboard tab order should follow visual column order (logo → links col 1 → links col 2 → ... → bottom bar).

**Content slots:** Logo/tagline, social links (real handles once available, else omit rather than link to empty/placeholder profiles), link column contents (Services list = the 15 services or a curated subset, Company = About/Careers/Contact, Resources = Insights/Case Studies, Legal = Privacy/Terms), newsletter copy, copyright line, physical/registered address if required legally for an India-based business (confirm with founder/legal).

---

## Cross-Section Notes for Engineer

1. **Reusable component inventory to build once, use everywhere:** `Button` (primary/secondary/ghost variants x default/hover/focus/active/disabled/loading), `SectionHeader` (eyebrow+H2+optional right-aligned link), `StatCounter`, `ArrowLink`, `Tag`/`IndustryTag`/`IndustryLabel` (pill component), `MediaFrame` (consistent image/video wrapper with lazy-load + aspect-ratio locking), `CarouselControls`.
2. **Section background alternation:** ink → ivory → ink → ivory... is not required to be strict every single section (some are ink-ink adjacent by design, e.g. Testimonial Theater following Why Ayava), but no more than 2 consecutive sections should share the same background without a visual break (border, spacing, or accent shift) to keep scroll rhythm legible.
3. **All "STUB DATA" flags above must be tracked in a content checklist** (recommend project-manager maintain this) so nothing marked stub ships to production without founder sign-off, especially anything touching client names, testimonials, metrics, or press/award claims — reputational and legal risk if fabricated.
4. **Performance flag:** Hero WebGL canvas + Global Presence Map (if 3D) + Testimonial video are the three heaviest assets on this page — coordinate lazy-loading/code-splitting strategy with frontend-engineer so hero is interactive fast (LCP target) even if canvas loads slightly after.
5. **Every section is a `<section aria-labelledby="...">` landmark** with its H2/H3 carrying the matching `id`, per the accessibility baseline in section 0.
