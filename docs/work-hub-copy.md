# Ayava Creatives — Work/Portfolio Hub (`/work`) Copy
Voice: confident, precise, outcome-obsessed. Honest about current scale — 8 real projects, no volume-inflating language.
Structure per `work-hub-layout-spec.md`: Hero / Filter Bar / Case Study Grid / CTA Band.

---

## 1. Hero

**Eyebrow:** Our Work

**H1:** Eight projects, eight industries, one founder-led process.

**Supporting line:** Every build on this page was designed, architected, and executed under one operator's direct involvement — not handed off across five subcontractors. Fewer projects, more scrutiny on each.

**Optional real-count line (gold numeral on the "8"):** 8 projects across 8 industries.

*Note: per work-hub-layout-spec.md's honesty requirement — no "hundreds of brands," no "trusted by leading brands" language. The number 8 is real and load-bearing; it is the entire pitch of this hero, not a limitation to hide.*

---

## 2. Filter Bar

**Group labels:** "Industry" / "Service"

**Industry filter chip labels** (derive final list from confirmed project-industry tags — draft set based on the 8 real projects):
- Real Estate
- E-Commerce
- Tech / SaaS
- Craft / Handmade
- Finance / Consulting
- Education

**Service filter chip labels** (subset of the 15-service taxonomy actually represented across the 8 projects — draft set, confirm against real deliverables per project before hardcoding):
- Website Design
- Branding
- SEO
- E-commerce Growth
- Analytics/CRO
- Content Marketing

**Result count copy:**
- Default: "8 projects"
- Filtered: "Showing [X] of 8 projects"
- Zero-result headline: "No projects match that combination yet"
- Zero-result body: "Try clearing a filter, or view all 8 projects."
- Zero-result CTA: "Clear filters"

**Clear-filters link label:** Clear filters

*Note to project-manager/content-owner: the industry and service chip lists above are directional drafts built from the known project list (NextepSolution, Nextep Ventures, Dreamzcraft, FineTaxConsultancy, Woodcraft Store Premium, Wooden Handicraft 3D, Aura Estates, College IQ). Per the layout spec's explicit instruction, confirm the actual distinct values against real project metadata before implementation — do not hardcode this draft list as final.*

---

## 3. Case Study Grid — Card Copy (1–2 line scope summaries)

Per the spec, card summaries are scope/deliverable language, not outcome-metric language (all 8 projects are `review`-status, not `live` with confirmed metrics).

**Featured/hero card (editorially assigned): Aura Estates**
Industry tag: Real Estate
Summary: A landing-page experience built around visual restraint and property-led storytelling for a luxury real-estate developer.

**NextepSolution**
Industry tag: Tech / SaaS
Summary: Web architecture and use-case-led navigation for a B2B CRM platform.

**Nextep Ventures**
Industry tag: Tech / SaaS
Summary: Platform build for a two-sided B2B marketplace and auction system.

**Dreamzcraft**
Industry tag: Web Architecture
Summary: Site-architecture build focused on structural clarity and scalable page design.

**FineTaxConsultancy**
Industry tag: Finance / Consulting
Summary: Website build for a tax and accounting consultancy, positioned for client trust and service clarity.

**Woodcraft Store Premium**
Industry tag: E-Commerce
Summary: Full storefront build for a handcrafted-wood product line, from catalog structure to checkout.

**Wooden Handicraft 3D**
Industry tag: Craft / Handmade
Summary: Product-showcase e-commerce experience engineered to present individually crafted pieces at a premium standard online.

**College IQ**
Industry tag: Education
Summary: Clarity-first marketing site for an AI-driven EdTech platform, mapping a complex product into a first-minute-understandable journey.

---

## 4. CTA Band

**H2:** Want to see your project here next?

**Supporting line:** Every case study on this page started as a first conversation. Yours can too.

**Primary CTA:** Get Free Audit
**Secondary CTA (ArrowLink):** Book a Call

---

## Notes for Frontend Engineer / Project Manager
1. Hero copy deliberately avoids any implied scale beyond the real 8-project count, per the layout spec's explicit direction against "hundreds of brands" language.
2. Card summaries are scope-only (no outcome claims) consistent with all 8 case studies being `review`-status per `case-study-layout-spec.md`'s completeness model — do not add metric language to cards until individual case study pages carry sourced metrics.
3. Filter taxonomy (Industry/Service chip lists) is a draft seeded from known project types — flagged above for confirmation against real project metadata before hardcoding, per the layout spec's own cross-check requirement (§2, point 6 of Cross-Section Notes).
4. Industry tags used here should stay consistent with whatever final industry taxonomy is used across `/industries` pages and individual case-study Snapshot Bars, to avoid drift between three places the same industry label appears.
