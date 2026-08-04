# Ayava Creatives — Pricing Philosophy Page Layout Spec
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft
Route: `/pricing` (currently a dead nav link)

Inherits all Foundations from `homepage-layout-spec.md` §0. Reuses `Button`, `SectionHeader`, `Container`, `CtaBand`, `FAQAccordion`/`FAQItem` (from `service-page-layout-spec.md` §8), `ArrowLink` as-is.

**Binding constraint (client-confirmed):** this is a philosophy/approach page, NOT a numeric price-comparison table. Do not build a 3-tier pricing-card wall — the creative-review doc (`docs/service-contact-creative-review.md` §1) already flagged that exact pattern as the worst-executed element on the Meta Ads service page (`bg-white` fill, gold-border perimeter, translate-lift, "Most Popular" tag — a SaaS-pricing-table cliché that self-refutes a "scoped to your account" thesis). This page must not reintroduce any version of that pattern. It also must not duplicate or conflict with the `pricingTiers` slot already defined in `docs/service-page-layout-spec.md` for individual service pages — this page is the philosophy-level explainer that those per-service tier slots point back to, not a competing numeric price list.

**Gold discipline:** gold restricted to hairlines/focus rings/real numeric values only. This page is intentionally light on numbers (that's the point — no fixed price list), so gold usage here should be minimal, mostly focus states and possibly a single confirmed stat if the founder provides one (e.g. years of scoping experience) — do not invent a number to justify using gold somewhere.

---

## Page section order

1. Hero — philosophy framing, not a price list
2. How We Price (core philosophy narrative)
3. What Shapes a Quote (factors)
4. Engagement Models (project vs. retainer vs. audit)
5. What This Isn't (no hidden fees / lock-in — flagged, needs founder confirmation)
6. FAQ
7. CTA Band → `/contact`
8. Footer

**Background rhythm:** ivory (Hero) → ink (How We Price) → ivory (What Shapes a Quote) → ink (Engagement Models) → ivory (What This Isn't) → ink (FAQ — per the creative-review's explicit correction to never let an ivory FAQ sit directly against another ivory section) → ink (CTA Band, or ivory if the section before was forced ink — verify no 2 consecutive same-tone sections land adjacent once final content length is known) → ink (Footer).

---

## 1. Hero — Philosophy Framing

**Layout:** Ivory background, content-driven height `~55vh` desktop min (not full-viewport — this page is a reasoning document, not a cinematic entry point). Centered column, cols 3–10 (matches Contact page's centered "direct" framing rather than the homepage's asymmetric editorial split — pricing pages benefit from reading as plain-spoken, not theatrical).

- Eyebrow (Label, bronze): "How We Price"
- H1 (display, `clamp(36px, 5vw, 72px)`, centered, max 2 lines): a statement that immediately signals "no fixed packages," e.g. "Every quote is built for the account it's for — not pulled off a shelf."
- Subhead (Body-L, max-width 56ch, centered, `20px` below H1): reinforces the custom-scoping premise honestly, e.g. "We don't sell fixed retainer tiers. Every engagement is scoped to your channels, budget, and goals before we name a number."
- No CTA in the hero itself — let the page build its case first, CTA lands at the end per §7 (same pattern as the About page).

**Responsive:**
- 1920/1440: as above.
- 1024/768: column narrows to cols 2–7 of 8-col grid.
- 428/375: H1 `clamp(28px, 8vw, 36px)`, 3 lines max, subhead wraps naturally.

**Components:** `PhilosophyHero` (new, thin wrapper — no canvas/ticker, same simplicity class as `ContactHero`).

**Content slots:** H1, subhead copy — copywriter, tone should read matter-of-fact and confident, not apologetic about not having a price list (avoid language that sounds like a dodge, e.g. never "contact us for pricing" alone with no reasoning — the whole point of this page is to supply the reasoning).

---

## 2. How We Price (Core Philosophy Narrative)

**Layout:** Ink background, `160px`/`96px` padding. Asymmetric split matching the About page's `ProblemStatement` pattern: left col 1–4 = short H2 statement, right col 5–12 = 2–3 paragraphs of prose explaining why custom quotes replace fixed packages — the actual reasoning (every engagement scoped to real channels/budget/goals rather than a one-size-fits-all retainer; a fixed package either overcharges a narrow-scope client or underscopes a complex one).

**Responsive:** Identical to About page §3 (`ProblemStatement`) — left statement stacks above prose at 1024/768, no structural change at mobile beyond type clamp.

**Components:** `ProblemStatement` (reused from About page spec — same 2-col sticky-headline + prose pattern, register it as a shared cross-page component rather than rebuilding), `SectionHeader` is NOT used here (this section follows the sticky-statement pattern instead, consistent with its About-page precedent).

**Content slots:** Core philosophy paragraphs — copywriter, working from founder's actual reasoning. Must stay grounded (e.g. "most agencies price by hours or by generic tier; we price by what the account actually needs" is fine if true — do not assert claims about "most agencies" that read as unverifiable industry-wide generalizations dressed as fact; keep comparisons implicit/positional rather than making explicit competitor claims).

---

## 3. What Shapes a Quote (Factors)

**Layout:** Ivory background, `160px`/`64px` padding. `SectionHeader` cols 1–6, left-aligned, eyebrow "What Goes Into a Quote," H2 e.g. "Three things determine the number." Below: reuse the `DifferentiatorList`/`DifferentiatorRow` hairline-row pattern (same component as homepage §8 / About page §5) — NOT cards, NOT a pricing-table shape, just 3 rows.

Rows (illustrative — copywriter/founder to confirm exact framing):
1. **Services selected** — which of the 15 services (or combination) the engagement actually needs.
2. **Campaign scale** — ad spend / channel count / content volume the work has to support.
3. **Engagement shape** — one-time project vs. ongoing retainer (ties directly into §4 below).

**Responsive:** Identical to homepage §8 `DifferentiatorList` behavior (stacks at 1024/768, icon-inline retained at mobile if icons used).

**Components:** `DifferentiatorList`, `DifferentiatorRow` (both reused), `SectionHeader`.

**Content slots:** 3 factor titles + 2-line descriptions — copywriter, grounded in the real inputs a founder would actually ask about during scoping (coordinate with founder directly rather than inventing generic "factors that affect pricing" boilerplate).

---

## 4. Engagement Models

**Layout:** Ink background, `160px`/`96px` padding. `SectionHeader` cols 1–6, eyebrow "How Engagements Are Structured," H2. Below: 3 items, laid out as full-width stacked rows (NOT a 3-card grid — explicitly avoiding the tiered-card silhouette this page is designed to steer clear of), each row: model name (H3) + 2–3 line description of when it fits + a short illustrative example (Body, slate), separated by `1px` bronze hairline dividers, `48px` vertical padding per row.

1. **Project-Based** — a defined scope with a start and end (e.g. a website build, a brand identity, a single campaign launch).
2. **Ongoing Retainer** — continuous management of a channel or set of channels (e.g. always-on paid media, ongoing SEO/content).
3. **One-Time Audit** — a scoped diagnostic engagement (e.g. an account/creative audit) with a defined deliverable and no ongoing commitment.

If a founder confirms a 4th model exists (e.g. hybrid), add as a 4th row using the identical pattern — do not restructure into a grid to "fit" more items; the row pattern scales indefinitely.

**Responsive:** Rows remain full-width single-column at every breakpoint (this section never becomes a multi-column grid, by design — it is the section most at risk of drifting back toward a pricing-card layout, so lock it structurally as rows across all breakpoints).

**Components:** `EngagementModelRow` (new — a full-width row variant, distinct from `DifferentiatorRow` only in that it's built for 3 longer-form entries rather than 4–6 short ones; if `DifferentiatorRow` can flex to this content length without visual strain, reuse it directly instead of introducing a new component — flag to frontend-engineer to make that call once real copy length is known).

**Content slots:** 3 model names + descriptions + illustrative examples — copywriter, working from founder's actual service structure.

---

## 5. What This Isn't

**Layout:** Ivory background, `160px`/`64px` padding. `SectionHeader` cols 1–6, eyebrow "What This Isn't," H2 e.g. "No surprises once we start." Below: short list (2–4 items max) of explicit non-behaviors, same hairline-row pattern as §3, each row a single short claim (Label/H3 weight) + 1-line elaboration.

**CRITICAL — do not assert unconfirmed claims.** The brief flags "no hidden fees, no lock-in contracts" as things this page *might* say — these are commitments, not neutral facts, and must be explicitly confirmed by the founder before publishing. Render this section in the spec/build process with each candidate claim marked, e.g.:
- "No hidden fees" — **NEEDS FOUNDER CONFIRMATION** before shipping; if unconfirmed at launch, omit this row entirely rather than publish an unverified commitment.
- "No lock-in contracts" — **NEEDS FOUNDER CONFIRMATION**; if retainers do in fact require a minimum term, this claim must not ship as written — either omit or replace with the accurate honest version (e.g. "Retainers have a clear minimum term, stated upfront — no auto-renewal surprises," if that's closer to the truth).

Do not let this section ship with fewer than 2 confirmed rows if included at all — if nothing is confirmed by launch, cut the section rather than publish placeholder/aspirational claims about billing practices, since this is exactly the kind of reputational/legal-risk content flagged elsewhere in the homepage spec (§Cross-Section-Notes item 3).

**Responsive:** Same as §3's row pattern.

**Components:** `DifferentiatorRow` (reused).

**Content slots:** 2–4 confirmed non-behavior claims (founder sign-off required per above — track in the same content checklist referenced in the homepage spec).

---

## 6. FAQ

**Layout:** Ink background (per the background-rhythm correction noted at the top of this doc, and per the creative-review's explicit rule against an ivory FAQ sitting undivided against another ivory section). Reuse `FAQAccordion`/`FAQItem` exactly as implemented for the service-page template and Contact page, `tone="on-ink"`. `SectionHeader` cols 1–6, left-aligned (per the creative-review's correction against center-aligned `SectionHeader` usage — `align="left"` only, no exceptions). Narrower reading column, cols 1–8.

**Suggested question set** (copywriter to finalize):
1. "Why don't you list fixed prices?" — restates §2's core reasoning briefly, for scanners who skip straight to FAQ.
2. "How long does it take to get a quote?" — sets expectation; do not invent a number here without founder confirmation (same rule as the Contact page's response-time band).
3. "Is there a minimum engagement size?" — same content-fact caution as Contact page FAQ §6 item 3 — do not let copywriter improvise this without founder input.
4. "Can I start with a smaller project before committing to a retainer?" — reinforces §4's project-based model as a low-commitment entry point.
5. "What happens if my needs change mid-engagement?" — reassurance-focused, addresses fear of being locked into a wrong-fit scope.

**Responsive:** Same collapse-to-full-width pattern as service-template/Contact FAQ at 768 and below.

**Components:** `FAQAccordion`, `FAQItem` (both reused), `SectionHeader`.

**Content slots:** 5 Q&A pairs — same founder-input caution as items 2–3 above.

---

## 7. CTA Band

**Layout:** Reuse `CtaBand` exactly as implemented. Headline should route directly toward getting scoped, e.g. "Ready to see what your project actually costs?" Primary CTA → `/contact` (recommend deep-linking toward the Contact intake form's budget-range step if the frontend-engineer can wire an anchor/pre-fill, e.g. `/contact#intake-form`, coordinate exact anchor with `contact-page-layout-spec.md` §2 — this page is the natural on-ramp into that form's Goals & Budget step). Secondary → omit or `/contact#call` per standard `CtaBand` default.

**Components:** `CtaBand` (reused).

**Content slots:** Headline, supporting line, button label/href (confirm anchor-linking approach with frontend-engineer).

---

## Cross-Section Notes for Engineer

1. **New components introduced on this page:** `PhilosophyHero`, `EngagementModelRow` (or reuse `DifferentiatorRow` if content length allows, per §4 note). **Reused as-is:** `SectionHeader`, `Container`, `Button`, `CtaBand`, `FAQAccordion`/`FAQItem`, `DifferentiatorList`/`DifferentiatorRow`, `ProblemStatement` (introduced in `about-page-layout-spec.md` §3, register as shared), `MegaFooter`.
2. **Hard structural rule for this page specifically:** no 3-up card grid anywhere on this route, no card with a lift/translate/tag/perimeter-gold-border treatment — every list on this page (Factors, Engagement Models, What This Isn't) uses the same full-width hairline-row pattern. This is a deliberate, binding stylistic constraint given the exact failure mode already documented on the Meta Ads page's `Pricing.tsx`.
3. **Content dependencies requiring founder sign-off before launch:** §5 "What This Isn't" claims (fees/lock-in — do not ship unconfirmed), §6 FAQ items 2–3 (turnaround time, minimum engagement size), §2's philosophy paragraphs (should reflect founder's actual reasoning, not generic copywriter-invented rationale).
4. **Relationship to `service-page-layout-spec.md`:** this page is the philosophy-level explainer; the `pricingTiers` slot on individual service pages (e.g. Meta Ads) should link back here for "how we think about pricing," and this page's CTA should route forward into a specific service's intake or the general Contact form — coordinate the exact cross-link placement with frontend-engineer so the two don't duplicate content or contradict each other on tier language.
5. **Accessibility baseline from homepage §0 applies in full** — landmark structure, focus rings, AA contrast, reduced-motion handling.
