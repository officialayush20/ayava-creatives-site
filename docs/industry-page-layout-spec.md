# Ayava Creatives — Individual Industry Page Template Layout Spec
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft
Applies to all 10 industry pages: Real Estate, D2C/E-commerce, Healthcare, Hospitality & Travel, FinTech, Fashion & Luxury, EdTech, SaaS/Tech, Automotive, F&B/QSR.

Inherits all Foundations from `homepage-layout-spec.md` §0 (grid, spacing scale, breakpoints, section rhythm, color usage baseline, type scale, accessibility baseline). Component names reuse the homepage/service-page inventory wherever equivalent; new components follow the same PascalCase convention.

**Route pattern:** `/industries/[industry-slug]` — one template, 10 content instances driven by a shared `industries[]` data model (same source as the Industries Hub grid).

## Why this is NOT a reskinned service-page template

The service-page template (`service-page-layout-spec.md`) is deliverable-led: hero → problem → approach → deliverables → tools → case study → pricing → FAQ → cross-links → lead capture. It answers "here's what we do, and how you buy it."

The industry page is buyer-vertical-led. It answers "here's how we understand your market's specific dynamics" first, and only THEN connects that understanding to relevant services — services are a cross-link destination here, not the spine of the page. Concretely, this template:

- Has no Pricing section at all (pricing lives on service pages, not here — an industry page recommending 3–5 services with 3 pricing tiers each would be incoherent; if a reader wants pricing they click through to the specific service).
- Has no "Tools & Platforms" section (tool stacks are a service-level credibility signal, not an industry-level one).
- Replaces "Our Approach" (a numbered service methodology) with "How We Think About [Industry]" — a narrative about the vertical's buyer psychology and market structure, not a numbered production process.
- Replaces the service template's single "Relevant Case Study" with a case-study spotlight that is explicitly allowed to be an honest empty state more often than not (only 4 of 10 industries have a clean 1:1 portfolio match — see mapping table below), using the corrected full-width non-card pattern from `service-contact-creative-review.md` §3.
- FAQ objections here are vertical-specific buyer concerns ("how do you handle HIPAA-adjacent healthcare messaging," "how do you protect a luxury brand's price positioning in performance ads") — not service-mechanics questions ("what's included in a Meta Ads audit").

Applied corrections baked in from the start (per `homepage-creative-review.md` / `service-contact-creative-review.md`):
- Gold restricted to hairlines/real numeric values only — no fill, no full-perimeter card border, no decorative accent.
- No decorative numbering on any list in this template.
- Ink/ivory alternation, no same-tone adjacency without a hairline/spacing break.
- `SectionHeader` default `align="left"` everywhere on this template — no center-aligned headers.
- Case-study spotlight uses the corrected full-width, non-card, left-aligned pattern (see §4 below) — never the centered bordered box that was rejected on Meta Ads.
- If any service pricing is referenced/previewed here (it should not be, per above) it must never use the fill+border+lift "featured tier" cliché.

**Data model implication for engineer:** every content slot below is a CMS field across the 10 instances. Fields common to all: `industryName`, `industrySlug`, `heroHeadline`, `heroSubhead`, `industryNarrative` (rich text/paragraphs), `narrativeThemes[]` (structured sub-points within the narrative, see §2), `relevantServiceSlugs[]` (3–5 of the 15), `caseStudyRef` (nullable), `faqItems[]`.

---

## 0. Template-Level Notes

**Background rhythm for this template (6 sections):** ink (Hero) → ivory (How We Think About [Industry]) → ink (Relevant Services) → ivory or ink (Case Study Spotlight — see §4 tone logic) → ivory (FAQ, break from Case Study via hairline if same tone lands adjacent) → ink (CTA Band + footer). Verify no two adjacent sections share a tone without a hairline/spacing break, same rule as service template §0.

**Route/slug mapping (10 industries), matches Industries Hub spec:**

| Slug | Industry |
|---|---|
| `real-estate` | Real Estate |
| `d2c-ecommerce` | D2C / E-commerce |
| `healthcare` | Healthcare |
| `hospitality-travel` | Hospitality & Travel |
| `fintech` | FinTech |
| `fashion-luxury` | Fashion & Luxury |
| `edtech` | EdTech |
| `saas-tech` | SaaS / Tech |
| `automotive` | Automotive |
| `fnb-qsr` | F&B / QSR |

---

## 1. Hero — Vertical-Specific Pain-Point Framing

**Layout:** Ink background, NOT full-viewport (same reasoning as service-page hero — subpage, wayfinding-first). Height: content-driven, `~72vh` desktop min. Breadcrumb row at top: `Home / Industries / {Industry Name}`, reuse `Breadcrumb` component, current page `aria-current="page"`.

Content: asymmetric 7/5 split, same pattern as service-page hero. Cols 1–7: eyebrow label ("Industry"), H1 framed around the vertical's core pain point/context — NOT a generic "{Industry} Marketing Services" label. Use the hub's one-line hook copy (from `homepage-copy.md` §7, reused verbatim on the Hub page) as the conceptual seed, but the H1 here should expand it into a fuller headline, not just restate the hook verbatim (the hook already lives on the Hub tile linking here — repeating it identically as the H1 would read as lazy and miss the chance to go deeper). Body-L subhead max-width 42ch expanding on the specific market dynamic (e.g. Real Estate: high-consideration purchase cycle and trust-building via visual-heavy marketing; SaaS: research-heavy buyers and longer sales cycles). CTA row: primary "Talk to Us About {Industry}" → `/contact`, secondary ghost "See Relevant Services" → anchors to §3 on same page.

Cols 8–12: `IndustryHeroVisual` slot — static image or short looping visual representative of the vertical (real estate: architectural/interior imagery; SaaS: product-UI-adjacent abstract visual; etc.) — coordinate with creative-director. Same lightweight-asset guidance as service-page hero (§1 of service spec) — this repeats 10x, keep it performant, no WebGL canvas.

**Responsive:** identical collapse pattern to service-page hero §1 — 1024/768: visual moves below text, full-width 16:9/4:3, reduced height; text full-width cols 1–8 of 8-col grid. 428/375: headline `clamp(28px, 8vw, 36px)`, breadcrumb truncates if needed, CTAs stack full-width, visual 4:5 or 1:1.

**Components:** `IndustryHero` (new — structurally identical to `ServiceHero`, distinct name since content model differs; if engineer prefers, this can be the SAME component as `ServiceHero` with a generic prop interface — flag as an implementation-efficiency option, not a hard requirement of this spec), `Breadcrumb` (reused), `IndustryHeroVisual` (new slot, same rules as `ServiceHeroVisual`), `Button` (reused).

**Interaction/state notes:** identical to `ServiceHero` — breadcrumb hover/focus, visual slot video rules (poster + play affordance, no autoplay-with-sound, loading skeleton, error fallback) if video is used.

**Content slots:** `heroHeadline` (vertical-specific pain-point framing, copywriter — informed by the narrative brief in §2 below so Hero and Narrative aren't redundant, Hero states the tension, Narrative unpacks it), `heroSubhead`, hero visual asset, 2 CTA label/hrefs. SEO: H1 should carry this page's primary long-tail intent target (e.g. "marketing for real estate developers") — coordinate with seo-strategist.

---

## 2. "How We Think About [Industry]" — Vertical Narrative

**Layout:** Ivory background, full `160px`/`64px` section rhythm. This is the structural replacement for the service-template's "Problem We Solve" block, but expanded and reframed: not "the problem," but "our read on how this market works" — a strategic point of view, which is what a buyer in a specific vertical is actually evaluating an agency on (do they get my industry, or are they going to run a generic playbook at me).

Asymmetric split: cols 1–4 = H2 ("How We Think About {Industry}"), optional 1-line strategic thesis statement beneath it (Body, bronze), NOT sticky by default here (reserve `StickyHeader` sticky behavior for pages where the right column is long enough to warrant it — most industry narratives will run 3 structured themes, short enough that sticky adds little; use as static by default, sticky as an opt-in if content runs long). Cols 5–12: structured content, NOT a single narrative paragraph block like the service template's `NarrativeBlock` — instead 3 discrete `NarrativeTheme` rows, each addressing one specific dynamic of the vertical (e.g. for Real Estate: "High-Consideration Purchase" / "Trust Before the Site Visit" / "Visual-Heavy Decision-Making"; for SaaS: "Research-Heavy Buyers" / "Longer, Multi-Stakeholder Sales Cycles" / "Product-Led Growth vs. Sales-Led Motion"). Each `NarrativeTheme`: short title (H3), 2–3 sentence body (Body), separated by `1px` slate-deep hairline dividers (NOT gold — gold restriction applies, this is not a numeric value).

This structured 3-theme format (vs. service template's freer 2–3 paragraph block) is the key content-model difference: it forces every industry page to actually articulate 3 distinct, concrete market dynamics rather than one vague paragraph of "we understand your industry" filler — directly serving the "vertical-specific case studies & strategy" framing from the blueprint.

**Responsive:**
- 1024/768: left header stacks above the 3 themes, full-width.
- 428/375: same stack, `NarrativeTheme` rows keep hairline dividers, `24px` gap.

**Components:** `IndustryNarrative` (new), `NarrativeTheme` (new — title + body + hairline divider, reusable across all 10 pages).

**Interaction/state notes:** Static, scroll-fade-in only (defer choreography to motion-designer). No loading/error/empty states.

**Content slots:** `narrativeThemes[]` — exactly 3 per industry, title + 2–3 sentence body each. This is a copywriter/strategist deliverable requiring real domain thinking per vertical, not filler — seed themes below for the 10 industries as a starting brief (not final copy):

| Industry | Suggested 3 narrative themes (brief, not final copy) |
|---|---|
| Real Estate | High-consideration purchase cycle; trust-building before the site visit; visual-heavy decision-making (renders, virtual tours, staging) |
| D2C/E-commerce | Repeat-purchase economics over one-time acquisition; conversion-rate/CRO as the compounding lever; content-to-commerce attribution |
| Healthcare | Trust and credibility signals before first contact; compliance-aware messaging (no overclaiming outcomes); local-search and appointment-conversion focus |
| Hospitality & Travel | Visual-first discovery (imagery drives booking intent); seasonal/demand-driven campaign pacing; review/reputation signals as a booking trust factor |
| FinTech | Explaining complexity simply without regulatory risk; building trust in a category with inherent skepticism; compliance-reviewed creative/copy workflows |
| Fashion & Luxury | Brand-equity protection while still performance-marketing; price-positioning discipline (no discount-driven creative that erodes premium perception); visual craft as the product |
| EdTech | Long consideration → enrollment → completion funnel (3 distinct conversion events, not 1); parent/learner dual-audience messaging where applicable; outcome-credibility (placement/results claims must be substantiated) |
| SaaS/Tech | Research-heavy, self-serve-informed buyers before sales contact; longer multi-stakeholder B2B sales cycles; content/SEO as top-of-funnel given buyer research behavior |
| Automotive | Research-tab-to-showroom journey (heavy pre-purchase online research, offline conversion); local-inventory/dealer-tie-in considerations; visual/spec-heavy comparison content |
| F&B/QSR | Short decision cycles, high-frequency repeat intent; hyper-local/geo-targeted campaign pacing; app-order and delivery-platform integration as a conversion channel |

Founder/strategist to confirm and refine — these are directional briefs for the copywriter, not finished narrative copy, and must reflect Ayava's actual point of view, not generic industry-report language.

---

## 3. Relevant Services for This Industry

**Layout:** Ink background. `SectionHeader` cols 1–6, `align="left"`, eyebrow "Where We'd Start" or "Relevant Services" + H2. Below: reuse `ServiceCard` (standard variant, condensed, same component as service-template's §9 Related Services Cross-Links) in a row of 3–5 cards — NOT all 15 services, curated per industry per the task instruction.

**Curated service mapping (3–5 of the 15 per industry, first-pass recommendation, confirm with strategist/PM as a single lookup table matrix, same governance model as service-template §9/§10):**

| Industry | Recommended relevant services (3–5) |
|---|---|
| Real Estate | Website Design, Video & Motion Production, Meta Ads/SMM, SEO |
| D2C/E-commerce | E-commerce Growth, Meta Ads, Analytics/CRO, Email/CRM Marketing, Influencer Marketing |
| Healthcare | SEO, Website Design, Content Marketing, PR/Reputation Management |
| Hospitality & Travel | Meta Ads/SMM, Influencer Marketing, Video & Motion Production, SEO |
| FinTech | Content Marketing, SEO, PR/Reputation Management, Google Ads |
| Fashion & Luxury | Branding, Influencer Marketing, Meta Ads/SMM, Video & Motion Production |
| EdTech | Google Ads, Content Marketing, SEO, Email/CRM Marketing |
| SaaS/Tech | SEO, Content Marketing, Google Ads, Email/CRM Marketing, AI Marketing |
| Automotive | SEO, Video & Motion Production, Meta Ads, Google Ads |
| F&B/QSR | Meta Ads/SMM, Influencer Marketing, App Store Marketing/ASO (delivery apps), SEO |

**Responsive:** identical collapse pattern to service-template §9 — 1024: 3 per row; 768: 2 per row; 428/375: horizontal swipeable strip (scroll-snap), consistent with cross-link row treatment elsewhere.

**Components:** `ServiceCard` (reused, standard variant), `RelatedGrid` (reused from service-template inventory).

**Interaction/state notes:** identical to service-template §9 — standard hover/focus/active states, cards link to `/services/[slug]`.

**Content slots:** `relevantServiceSlugs[]` — 3–5 per industry per table above (confirm with strategist), each card pulls its name/1-line description from the existing services data model (no new copy needed here beyond the curation decision itself).

---

## 4. Case Study Spotlight (Honest, Vertical-Matched)

**Layout:** Uses the CORRECTED pattern from `service-contact-creative-review.md` §3, applied to both the matched and empty-state cases — full `Container` width, left-aligned, same `SectionHeader` treatment as every other section on the page. NO centered bordered card, regardless of whether a real project matches. Background: ivory if the previous section (§3) was ink, maintaining alternation — verify against §0 rhythm table, adjust if content length shifts actual rendered adjacency.

**Two content states, same layout shell:**

**State A — Matched project exists (4 of 10 industries):** Full-width `CaseStudySpread` (reused from homepage/service-template inventory), cols 7 media / cols 5 text (or reverse), `MediaFrame`, project name, `IndustryTag`, 2–3 line qualitative scope/deliverables summary, `ArrowLink` "View Case Study." `StatCounter` row ONLY if real confirmed metrics exist for that project (same fabrication-risk rule as service-template §6) — omit entirely, do not render empty stat boxes, if unconfirmed.

**State B — No matched project (6 of 10 industries):** Do NOT render a generic "coming soon" filler card. Follow the corrected pattern exactly: full-width, left-aligned `SectionHeader`-style block, honest copy explaining the agency is building documented work in this vertical and stating specifically what it will report when it lands (mirroring the Meta Ads correction's structure: name the vertical, name what will be measured), followed by a 3-up hairline-ruled metric-placeholder row (text-slate labels, em-dash where the figure will go — same visual pattern as the corrected `CaseStudySpotlight`), CTA "Talk Through Your {Industry} Project" → `/contact`.

**Case-study-to-industry mapping (honest, from the real 8-project portfolio):**

| Industry | Portfolio match | State |
|---|---|---|
| Real Estate | Aura Estates | A — strong 1:1 match |
| EdTech | College IQ | A — strong 1:1 match |
| SaaS/Tech | NextepSolution or Nextep Ventures | A — reasonable match (confirm which project is more SaaS/Tech vs. general B2B with founder) |
| D2C/E-commerce | Woodcraft Store Premium or Wooden Handicraft 3D | A — strong 1:1 match (pick one as primary, other available as secondary if a second industry needs it, e.g. Fashion & Luxury if a craft/handicraft angle fits — confirm with creative-director, do not force it if it doesn't fit) |
| Healthcare | No match | B — empty state |
| Hospitality & Travel | No match | B — empty state |
| FinTech | FineTaxConsultancy is finance-adjacent (tax/accounting, not FinTech proper) — do NOT force this as a FinTech match, it would be dishonest positioning (a tax consultancy site is not a FinTech product) | B — empty state (flag FineTaxConsultancy as a possible general "Professional Services" case study elsewhere if that industry category ever gets added, but not here) |
| Fashion & Luxury | No clean match (Dreamzcraft is unclear/general — do not force) | B — empty state |
| Automotive | No match | B — empty state |
| F&B/QSR | No match | B — empty state |

This is a deliberately honest split (4 matched / 6 empty-state) — do not stretch weak fits into State A. An empty state executed well (per the corrected pattern) reads as confidence; a forced mismatched case study reads as dishonest and undermines the entire "vertical-specific expertise" premise this template exists to prove.

**Responsive:** State A — identical collapse to homepage/service-template Case Study pattern (media stacks above text at 1024/768, locks to 4:5/1:1 at 428/375, stat row 2-col or stacked by count). State B — 3-up metric-placeholder row becomes stacked single column at 768 and below, matching the corrected Meta Ads empty-state's own responsive behavior (confirm exact breakpoint with frontend-engineer against the live corrected component).

**Components:** `CaseStudySpread` (reused, State A), `IndustryCaseStudyEmptyState` (new — same corrected full-width pattern as Meta Ads' fixed `CaseStudySpotlight`, generalized for reuse across the 6 empty-state industry pages rather than one-off per page; recommend actually promoting the corrected Meta Ads component to a shared `CaseStudyEmptyState` primitive used by BOTH the service template's empty-state services AND this template's empty-state industries, since the pattern and rules are identical — flag to frontend-engineer as a refactor opportunity), `StatCounter` (reused, conditional), `SectionHeader` (reused, `align="left"`).

**Interaction/state notes:** State A — same single-clickable-region pattern as homepage/service-template case studies (one `<a>` wrapping the spread). State B — CTA button standard states, no clickable-region trick needed (it's a normal button, not a card-link).

**Content slots:** `caseStudyRef` (nullable — project slug/id from the 8-project portfolio, or `null` for empty-state industries), for State B: `emptyStateMetricLabels[]` (3 labels of what WILL be measured once a project lands, vertical-specific — e.g. Healthcare: "appointment-booking conversion rate," "cost per qualified patient lead," "local-search visibility lift"), CTA label + href. Copywriter to draft State B copy per the 6 empty-state industries following the Meta Ads correction's exact structural pattern (name the vertical, name 3 specific things that will be reported, confident tone not apologetic).

---

## 5. FAQ — Industry-Specific Objections

**Layout:** Ivory background (verify against §0 rhythm — insert hairline break if §4 landed ivory too). `SectionHeader` cols 1–6, `align="left"` ("Common Questions About {Industry} Marketing" or similar). Accordion list cols 1–8, reuse `FAQAccordion`/`FAQItem` exactly as specified in service-template §8 (same interaction model: `aria-expanded`/`aria-controls`, multiple-open-simultaneously allowed, chevron rotation respects reduced-motion, `FAQPage` JSON-LD schema requirement carries over identically).

**Responsive:** identical to service-template §8 collapse pattern.

**Components:** `FAQAccordion`, `FAQItem` (both reused from service-template inventory, no new components needed).

**Interaction/state notes:** identical to service-template §8.

**Content slots:** `faqItems[]` — 5–8 per industry, but the QUESTION CONTENT is categorically different from service-page FAQs: these should be vertical-specific buyer objections and compliance/domain concerns, not service-mechanics questions. Seed examples (briefs, not final copy) to hand to copywriter/seo-strategist:

- Real Estate: "How do you handle high-value property photography/video at scale?" / "Can you work with our existing CRM/lead-routing setup?"
- Healthcare: "How do you keep messaging compliant while still being persuasive?" / "Do you have experience with HIPAA-adjacent data handling in ad platforms?"
- FinTech: "How do you handle regulatory review of ad creative before launch?" / "Can you work within RBI/financial-advertising guidelines?" (India-specific regulatory context — confirm exact regulator references with founder/legal before publishing)
- Fashion & Luxury: "How do you performance-market without discount-driven creative that hurts brand positioning?"
- SaaS/Tech: "How do you shorten a multi-stakeholder B2B sales cycle?" / "Do you work with product-led-growth motions, or only sales-led?"
- EdTech: "How do you measure success beyond enrollment (i.e. completion/outcomes)?"
- Automotive: "Can you integrate with dealer/local-inventory feeds?"
- F&B/QSR: "Can you run hyper-local geo-targeted campaigns per outlet?" / "Do you integrate with delivery-platform (Swiggy/Zomato-equivalent) promotion tools?"

seo-strategist to supply the actual target long-tail queries per vertical (these should be genuine search-intent-driven, not just brainstormed); copywriter to draft 2–4 sentence answers, genuinely useful per the same standard as service-template §8.

---

## 6. CTA Band

**Layout:** Ink background, reuse `CTABand` component exactly as specified in homepage §13 / used identically on Industries Hub §3. Content centered col 3–10, H2 + supporting line + single primary CTA.

**Responsive:** identical to homepage §13.

**Components:** `CTABand` (reused), `Button` (reused).

**Interaction/state notes:** standard button states per accessibility baseline.

**Content slots:** CTA headline — industry-specific this time (unlike the Hub's industry-agnostic CTA), e.g. mail-merge-style "Let's Talk About Your {Industry} Project" (generic template copy is fine here per the same reasoning as service-template's `StickyServiceCTA` — this doesn't need bespoke per-industry copywriting), supporting line, button label + href to `/contact`.

---

## Component Inventory Summary (this template)

**New:** `IndustryHero` (or reuse `ServiceHero` generically — engineer's call), `IndustryHeroVisual` (or reuse `ServiceHeroVisual`), `IndustryNarrative`, `NarrativeTheme`, `IndustryCaseStudyEmptyState` (recommend promoting to shared `CaseStudyEmptyState` primitive with the service template, see §4 note).

**Reused as-is:** `Breadcrumb`, `SectionHeader` (`align="left"` only), `ServiceCard`, `RelatedGrid`, `CaseStudySpread`, `MediaFrame`, `IndustryTag`, `StatCounter`, `ArrowLink`, `FAQAccordion`, `FAQItem`, `CTABand`, `Button`.

---

## Accessibility Notes (template-specific, beyond baseline)

- `<section aria-labelledby>` landmark structure for all 6 sections, per baseline.
- §4 State B (empty-state case study) must not use `aria-hidden` or otherwise hide the honest explanation from screen readers — it is real content, not decorative filler, and should be as discoverable as State A's spread.
- §3 curated service cards need `aria-label` = full service name (same rule as homepage/service-template `ServiceCard` usage) since cards are the primary link mechanism into the 15-service catalog from this page.
- FAQ schema requirement (`FAQPage`/`Question`/`Answer` JSON-LD) carries over from service-template §8 — coordinate with seo-strategist before the accordion data layer is built so content stays schema-extractable (plain text, no embedded rich elements inside answers).

## SEO/Content Notes (for seo-strategist/copywriter handoff)

- Each of the 10 pages targets long-tail, vertical-specific intent ("marketing agency for [industry]," "[industry] digital marketing") distinct from both the Hub page's broad head-term and the 15 service pages' service-specific intent — three distinct SEO layers across Hub / Industry / Service pages, coordinate internal-linking strategy across all three so they reinforce rather than cannibalize each other.
- `relevantServiceSlugs[]` links from this page into services, and the reverse (`relatedIndustrySlugs[]` on service pages, per service-template §10) should be internally consistent — if Real Estate lists Website Design as relevant, Website Design's related-industries list should include Real Estate. Recommend building the full service↔industry relationship matrix once as a single shared lookup table (per both templates' existing recommendation) rather than maintaining two independent curation passes that can drift out of sync.
