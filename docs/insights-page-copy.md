# Ayava Creatives — Insights Hub + Article Copy
Owner: Copywriter/Content Strategist · Companion to `docs/insights-page-layout-spec.md` · Status: v1 draft

Reuses the exact seed data and language already live in `components/sections/InsightsPreview.tsx` — titles and Ref lines below are verbatim, not rewritten. Category taxonomy follows the spec's §1.2 placeholder set. All copy is written for the current state of the page: three announced pieces, zero published bodies. Nothing here fabricates an excerpt, read time, byline, or publish date for unwritten work.

---

## 1. Hub Page (`/insights`)

### 1.1 Hero

**Eyebrow:** Field Notes

**H1:** Field Notes, Not Filler

*(Reused verbatim from `InsightsPreview.tsx` per spec §1.1 — keeps the homepage teaser and hub page reading as one continuous promise rather than two competing headlines.)*

**Supporting line (Body-L, max 50ch):**

> A working library, not a content calendar. Some pieces are live. Others are announced ahead of publication. All of it comes out of work we've actually shipped for clients — not generic marketing-blog filler.

---

### 1.2 Category Filter Bar

**Filter label:** Category

**Category chips:**

1. **Strategy & Platforms** — pieces on the systems behind the work: CRM/SaaS websites, platform positioning, the infrastructure decisions that don't show up in a portfolio screenshot.
2. **Industry Playbooks** — sector-specific plays: what actually moves a luxury real estate buyer, an EdTech parent, a category the reader's business sits inside.
3. **Craft & Process** — how the studio builds: design systems, copy discipline, the process work behind the polish.

**Result count copy pattern (reuse Work hub convention):**

> Showing **{N}** of **{M}** articles

**Clear filters link label:** Clear filters

**No-results state (H3 + supporting line + secondary Button, left-aligned, full-width — never a centered apology box):**

- H3: "Nothing here yet in that category."
- Supporting line: "This category is on the roadmap but hasn't produced a piece worth publishing. Browse everything below, or check back — we only publish when there's something worth reading."
- Button label: "Clear filters"

---

### 1.3 Article Cards — Coming-Soon Stub Copy

Per spec §0/§1.3, category is inferred from each article's actual subject matter and mapped to the taxonomy above. "Ref" lines are reused verbatim from `InsightsPreview.tsx`; teaser lines below are new, written to the "state what the piece will cover" standard from spec §2.2 — no padded filler, no invented metrics.

**1. "What a CRM Platform's Website Needs That a Landing Page Doesn't"**
- Slug: `crm-platform-website`
- Category: Strategy & Platforms
- Ref line (verbatim): Ref: NextepSolution learnings
- Teaser (1–2 sentences): A CRM platform isn't selling a single conversion moment — it's selling trust to a buyer who will live inside the product for years. This piece breaks down what changes in site structure, proof, and pacing when the thing you're selling is a system, not a product.

**2. "Selling Luxury Real Estate Online Without Looking Like Every Other Listing Site"**
- Slug: `luxury-real-estate-landing-pages`
- Category: Industry Playbooks
- Ref line (verbatim): Ref: Aura Estates
- Teaser (1–2 sentences): Most real estate sites default to the same template: grid of listings, search filter, contact form. This piece covers what it takes to make a luxury property feel like a luxury property online — pacing, imagery discipline, and the restraint that signals price point before a single number does.

**3. "Explaining AI-Powered EdTech to Non-Technical Buyers"**
- Slug: `ai-edtech-non-technical-buyers`
- Category: Industry Playbooks
- Ref line (verbatim): Ref: College IQ
- Teaser (1–2 sentences): The buyer for an EdTech platform is rarely the person who understands the AI underneath it. This piece looks at how to explain a technical product to a non-technical decision-maker without either dumbing it down or losing them in jargon.

**Coming-soon pill label (reuse exact `InsightsPreview.tsx` treatment):** Coming soon

---

### 1.4 Article Template — Coming-Soon Body Branch (`/insights/[slug]`)

Per spec §2.2: honest statement + 2–3 talking points derived from the angle, no fabricated body. Applies the same copy to all three stubs, parameterized by article.

**Statement pattern (Body-L, max 60ch):**

> This piece is announced, not yet published. Here's what it'll cover when it goes live:

**Talking points (bulleted, derived from each Ref/title — not padded):**

*CRM Platform piece:*
- What a CRM buyer needs to see before they'll trust the product with their pipeline
- Why landing-page conventions (single CTA, single scroll) break down for a multi-stakeholder platform sale
- Structural lessons pulled directly from the NextepSolution build

*Luxury Real Estate piece:*
- Why listing-site templates undersell high-value property
- How pacing and imagery signal price point before the numbers do
- What changed in the Aura Estates site to move it out of "generic listing site" territory

*EdTech piece:*
- Why the buyer and the user of an EdTech product are rarely the same person
- How to explain an AI-driven feature set to someone evaluating on outcomes, not architecture
- What College IQ's positioning had to solve for a non-technical buying committee

**Fallback button (only if ≥1 published article exists, per spec §2.2 — otherwise omit or point to `/contact`):**
- Label: "Browse Published Insights" → `/insights`
- If zero published articles exist site-wide: omit button entirely (current state — all three stubs, so this button should not render yet).

---

### 1.5 CTA Band

**Headline:**

> Want this kind of thinking applied to your own site?

**Supporting line:**

> Everything above comes out of client work. Bring us yours and find out what we'd actually build.

**Primary CTA (low-commitment):** Get Free Audit → `/contact`
**Secondary CTA (high-commitment):** Book Strategy Call → `/contact#call`

---

## Notes for engineering / content ops

- No excerpt, read time, publish date, or byline should render anywhere for these three entries — they have `status: "coming-soon"`, and per spec that branch renders no prose at all.
- If a fourth+ article is added to either "Industry Playbooks" bucket, revisit whether EdTech warrants its own category (spec §1.2 flags this as a judgment call to confirm at volume, not before).
- Related Articles rail (§2.4) should not render on any of these three pages until ≥2 published articles exist — currently zero, so omit entirely.
