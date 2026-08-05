/**
 * Per-service content for the shared service-page template
 * (`components/sections/service-template/*`). Copy is verbatim from
 * `docs/remaining-services-copy.md` (companion to the already-built
 * `docs/meta-ads-page-copy.md`). Single source of truth consumed by both
 * the existing `/services/meta-ads` page (post-refactor) and the 7 new
 * `/services/[slug]` pages built alongside it.
 */

export type ApproachStep = {
  title: string;
  description: string;
};

export type CaseStudyStateA = {
  state: "A";
  /** Slug into lib/case-studies-data.ts for the deep-link + media. */
  projectSlug: string;
  heading: string;
  body: string;
  ctaLabel: string;
};

export type CaseStudyStateB = {
  state: "B";
  /** Overrides the default "Case Study Spotlight" eyebrow — needed on
   * pages like AI Marketing where that default would contradict a body
   * that explicitly says no case study exists yet. */
  eyebrow?: string;
  heading: string;
  body: string;
  /** Optional line rendered before the em-dash metrics row, for cases
   * (like AI Marketing) where the row means "no engagement exists" rather
   * than "results are pending" and needs that reframing. */
  metricsLead?: string;
  metrics: string[];
  ctaLabel: string;
};

export type PricingTier = {
  name: string;
  featured?: boolean;
  features: string[];
};

/**
 * A single "what shapes the scope" factor — the tier-less alternative to
 * `PricingTier`, rendered as a `HairlineRowList` (the pattern already
 * approved on `pricing/EngagementModels.tsx`). Used for every service page
 * whose pricing genuinely doesn't have distinct named tiers rather than
 * writing 13+ sets of cosmetically-different tier copy to fill a card grid
 * (see decision note above `Pricing.tsx`).
 */
export type PricingScopeFactor = {
  title: string;
  description: string;
};

export type FAQItemData = {
  question: string;
  answer: string;
};

export type CalcField = {
  legend: string;
  key: string;
  options: string[];
};

export type LeadCaptureConfig =
  | {
      variant: "A";
      headline: string;
      successMessage: string;
      secondaryCtaLabel: string;
    }
  | {
      variant: "B";
      headline: string;
      helperText: string;
      fields: CalcField[];
      computeEstimate: (values: Record<string, string>) => string | null;
      emptyStateText: string;
    };

export type ServicePageContent = {
  slug: string;
  name: string;
  metaDescription: string;
  hero: {
    headline: string;
    subhead: string;
    heroImageAlt: string;
    /** Content-driven secondary CTA label — real case-study (state A) pages
     * keep "See Case Study"; state-B (empty-state) pages get an honest
     * label that doesn't overclaim a case study that doesn't exist yet. */
    secondaryCtaLabel: string;
  };
  problem: {
    title: string;
    paragraphs: [string, string];
    quote: string;
    closing: string;
  };
  approachEyebrow: string;
  approachTitle: string;
  approachSteps: ApproachStep[];
  deliverables: string[];
  tools: string[];
  caseStudy: CaseStudyStateA | CaseStudyStateB;
  pricingDescription: string;
  /** Present only for pages with genuinely distinct, named tiers (Meta Ads
   * currently the only one) — otherwise use `pricingScopeFactors`. */
  pricingTiers?: PricingTier[];
  /** Tier-less "what shapes the scope" list — the default for every page
   * that doesn't have real per-tier differentiation. See decision note
   * above `Pricing.tsx`. */
  pricingScopeFactors?: PricingScopeFactor[];
  faqItems: FAQItemData[];
  relatedServiceSlugs: string[];
  relatedIndustries: string[];
  leadCapture: LeadCaptureConfig;
};

export const servicePageContent: Record<string, ServicePageContent> = {
  "meta-ads": {
    slug: "meta-ads",
    name: "Meta Ads",
    metaDescription:
      "We run Meta Ads as a revenue system, not a boost-button habit — every audience, creative, and rupee of spend tied back to a measurable outcome.",
    hero: {
      headline: "Paid Media That Pays for Itself",
      subhead:
        "We run Meta Ads as a revenue system, not a boost-button habit — every audience, creative, and rupee of spend tied back to a measurable outcome, not a vanity impression count.",
      heroImageAlt: "Meta Ads campaign dashboard and creative review",
      secondaryCtaLabel: "See What We'll Report",
    },
    problem: {
      title: "Most accounts don't fail. They go unwatched.",
      paragraphs: [
        "Budgets get set once at kickoff and then treated as finished work, not a live decision that needs revisiting. The same three creatives run for months past their expiry date. Audiences overlap and cannibalize each other's reach. And by the time someone checks the dashboard, the account has been quietly burning spend on fatigue and guesswork for weeks.",
        "The second failure mode is worse: campaigns optimized for the wrong signal entirely. Cheap clicks that never convert. Likes and comments mistaken for pipeline. A pixel that was never configured to track what the business actually sells, so every “optimization” the algorithm makes is optimizing for the wrong outcome.",
      ],
      quote:
        "A campaign that isn't instrumented to measure the right event isn't being optimized — it's being guessed at, with a bigger budget.",
      closing:
        "We treat Meta Ads as infrastructure: an audience-and-creative testing system that gets sharper every week it runs, reporting on the metric that actually moves your business — not the one that's easiest to screenshot.",
    },
    approachEyebrow: "Our Approach to Meta Ads",
    approachTitle: "A testing system, not a boost button.",
    approachSteps: [
      {
        title: "Audit & Pixel Setup",
        description:
          "Before a single rupee moves, we audit the existing account (if one exists), verify Meta Pixel and Conversions API implementation, and confirm every event we optimize toward maps to a real business outcome — purchase, lead, booking — not a proxy metric that flatters the dashboard.",
      },
      {
        title: "Audience & Creative Strategy",
        description:
          "We build the audience architecture — core, lookalike, interest, and retargeting segments — sized and structured to avoid overlap, then brief creative concepts against each segment's actual buying stage, not a single generic ad running everywhere.",
      },
      {
        title: "Launch & Structured Testing",
        description:
          "Campaigns launch inside a controlled testing structure: multiple creative variants per audience, isolated enough to read signal cleanly, with a defined budget and timeline per test — no guessing when a “failed” ad simply hadn't spent enough to reach significance.",
      },
      {
        title: "Scale & Report",
        description:
          "Winning combinations get budget; underperformers get cut on a schedule, not on sentiment. Retargeting sequences layer in against warm audiences at each funnel stage, and reporting ties spend directly to the outcome defined in Step 1 — reviewed with you on a standing cadence, not just at contract renewal.",
      },
    ],
    deliverables: [
      "Meta Pixel & Conversions API setup and verification",
      "Full account audit (for existing accounts) before strategy begins",
      "Audience research and segmentation (core, lookalike, interest, retargeting)",
      "Creative brief development per audience segment",
      "Ad creative testing plan (static, carousel, video, Reels placements)",
      "Campaign structure built for clean signal reading (no audience overlap)",
      "Budget allocation and bid-strategy management",
      "Retargeting funnel design across warm-audience stages",
      "Ongoing creative refresh to prevent ad fatigue",
      "Performance reporting tied to the agreed conversion event",
      "Standing review cadence with your team",
      "Recommendations for creative and landing-page improvements based on live performance data",
    ],
    tools: ["Meta Business Suite", "Meta Ads Manager", "Google Analytics", "Canva", "Adobe Premiere Pro"],
    caseStudy: {
      state: "B",
      heading: "The Numbers Aren't In Yet",
      body: "A documented Meta Ads case study is in the field now. We'd rather publish confirmed numbers than dress up a project that hasn't been measured — so here's what we'll report when it lands: cost per qualified lead before and after, creative win rate by audience segment, and spend efficiency across the retargeting funnel.",
      metrics: [
        "Cost per qualified lead, before and after",
        "Creative win rate by audience segment",
        "Spend efficiency across the retargeting funnel",
      ],
      ctaLabel: "Talk Through Your Account",
    },
    pricingDescription:
      "Meta Ads engagements are scoped to your ad spend, account complexity, and creative production needs — a brand new account and an established one with a full retargeting funnel are not the same job, and we don't price them as if they were.",
    pricingTiers: [
      {
        name: "Starter",
        features: [
          "Pixel & Conversions API setup",
          "Single-market audience strategy",
          "Core creative testing plan",
          "Monthly performance report",
        ],
      },
      {
        name: "Growth",
        featured: true,
        features: [
          "Everything in Starter",
          "Multi-segment audience architecture",
          "Full retargeting funnel design",
          "Ongoing creative refresh cadence",
          "Standing review call",
        ],
      },
      {
        name: "Enterprise",
        features: [
          "Everything in Growth",
          "Multi-account / multi-market structure",
          "Dedicated creative production support",
          "Custom reporting cadence",
        ],
      },
    ],
    faqItems: [
      {
        question: "How much should I be spending on Meta Ads to see results?",
        answer:
          "There's no universal minimum — it depends on your average order value, sales cycle, and how much room the algorithm needs to exit the learning phase. We'll walk through your specific numbers on a strategy call rather than quote a generic figure that may not apply to your business.",
      },
      {
        question: "How long before we know if a campaign is working?",
        answer:
          "Meta's algorithm needs a meaningful volume of conversion events to exit its learning phase and optimize reliably — this typically takes longer than a few days and shorter than a few months, but the exact window depends on your budget and conversion volume. We set testing timelines upfront so “is it working” has a clear, agreed checkpoint rather than a moving goalpost.",
      },
      {
        question: "Do you handle the creative (images, video) too, or just media buying?",
        answer:
          "Both. We brief, produce, and test ad creative against each audience segment — Meta Ads without creative strategy is just a media-buying exercise, and creative is usually the bigger lever on performance than bid strategy.",
      },
      {
        question: "What if we already have an account running — do you start from scratch?",
        answer:
          "No. We audit what's there first: pixel setup, account structure, historical performance. If something's working, we keep it and build on it. If something's actively hurting performance, we'll tell you plainly why before we change it.",
      },
      {
        question: "Do you manage Instagram ads as well as Facebook?",
        answer:
          "Yes — Meta Ads Manager runs both platforms from a single campaign structure, and we plan placements (Feed, Stories, Reels) across both as part of the same strategy, not as separate line items.",
      },
    ],
    relatedServiceSlugs: ["google-ads", "analytics-cro", "content-marketing", "video-motion-production"],
    relatedIndustries: ["D2C / E-commerce", "Real Estate", "Hospitality & Travel", "Fashion & Luxury", "F&B / QSR"],
    leadCapture: {
      variant: "B",
      headline: "Let's Scope Your Meta Ads Project",
      helperText: "A quick, directional estimate — not a quote. For a real quote, this routes into our full intake flow.",
      fields: [
        { legend: "Monthly ad spend", key: "spend", options: ["Under ₹50,000/mo", "₹50,000 – ₹1,50,000/mo", "₹1,50,000 – ₹5,00,000/mo", "₹5,00,000+/mo"] },
        { legend: "Primary goal", key: "goal", options: ["Leads", "Sales", "App Installs", "Awareness"] },
        { legend: "Current account status", key: "status", options: ["New account", "Existing account"] },
      ],
      computeEstimate: (values) => {
        if (!values.spend || !values.goal || !values.status) return null;
        const structureByGoal: Record<string, string> = {
          Leads: "a lead-gen-optimized campaign structure with dedicated retargeting for form abandoners",
          Sales: "a purchase-optimized structure with a retargeting funnel across cart and product-view stages",
          "App Installs": "an app-install campaign structure with post-install event optimization once volume allows",
          Awareness: "a reach-and-frequency structure feeding a retargeting funnel for later-stage conversion",
        };
        const existingNote =
          values.status === "Existing account"
            ? "We'd start with a full audit of what's already running before changing anything."
            : "We'd start clean with pixel setup and a controlled testing phase.";
        return `Based on your inputs, here's what a testing structure could look like: ${structureByGoal[values.goal]}. ${existingNote}`;
      },
      emptyStateText: "Enter your details above to see how we'd structure your campaign.",
    },
  },

  "google-ads": {
    slug: "google-ads",
    name: "Google Ads",
    metaDescription:
      "We don't chase attention on Google Ads — we intercept intent, building campaigns around what a buyer typed the moment before they were ready to act.",
    hero: {
      headline: "Capture Demand at the Exact Second Someone Searches",
      subhead:
        "We don't chase attention on Google Ads — we intercept intent. Every campaign is built around what a buyer typed into the search bar the moment before they were ready to act.",
      heroImageAlt: "Google Ads account dashboard and search campaign review",
      secondaryCtaLabel: "See Case Study",
    },
    problem: {
      title: "Budget leaks, structurally.",
      paragraphs: [
        "Most Google Ads accounts leak budget in the same three places: broad match keywords pulling in traffic that was never going to convert, ad copy that reads like every competitor's ad copy, and landing pages that send high-intent search traffic to a generic homepage instead of a page built to close the specific query that brought them there. The account “runs,” impressions climb, and nobody can explain why cost-per-lead keeps drifting up.",
        "The deeper problem is structural: campaigns built once, at kickoff, and never re-architected as search terms, competition, and Quality Score shift underneath them. Negative keyword lists go stale. Bid strategies get set to “maximize clicks” and left there indefinitely, optimizing for the wrong signal entirely.",
      ],
      quote:
        "Google Ads doesn't reward the biggest budget — it rewards the account that answers the search query most precisely, at every level: keyword, ad, and landing page.",
      closing:
        "We treat the account as a living structure that gets sharper on a schedule, not a set-and-forget line item.",
    },
    approachEyebrow: "Our Approach to Google Ads",
    approachTitle: "An account that gets sharper on a schedule.",
    approachSteps: [
      {
        title: "Account Audit & Intent Mapping",
        description:
          "We audit the existing account structure (if one exists) — keyword match types, Quality Score, wasted spend by search term — and map remaining budget against the actual buying intent behind each keyword cluster, separating “research” queries from “ready to buy” queries.",
      },
      {
        title: "Campaign Architecture & Keyword Build",
        description:
          "We rebuild (or build fresh) campaign structure around tightly themed ad groups, exact and phrase match anchored to genuine intent, and an aggressive negative-keyword list from day one — not bolted on three months later after the budget's already been spent finding it.",
      },
      {
        title: "Ad Copy, Extensions & Landing Page Alignment",
        description:
          "Every ad is written to match the specific query cluster it serves, with sitelinks, callouts, and structured snippets filled in rather than left default. Landing pages are matched to ad intent — a search for “emergency plumber near me” should never land on a homepage.",
      },
      {
        title: "Bid Optimization & Reporting",
        description:
          "Bid strategy is chosen against your actual conversion data (not a platform default), budgets shift toward what's proven to convert, and reporting ties spend to cost-per-acquisition against the outcome that matters to your business — reviewed with you on a standing cadence.",
      },
    ],
    deliverables: [
      "Full account audit (for existing accounts) with wasted-spend analysis",
      "Keyword research and intent-tier mapping (research vs. transactional)",
      "Campaign and ad group architecture rebuild",
      "Negative keyword list build and ongoing maintenance",
      "Ad copy development (Search, Display, Performance Max as relevant)",
      "Ad extensions setup (sitelinks, callouts, structured snippets)",
      "Landing page-to-ad intent alignment review",
      "Conversion tracking and Google Tag Manager setup/verification",
      "Bid strategy selection and ongoing management",
      "Search term report review and refinement (recurring)",
      "Monthly performance reporting tied to cost-per-acquisition",
      "Standing review cadence with your team",
    ],
    tools: ["Google Ads", "Google Tag Manager", "Google Analytics 4", "Google Merchant Center", "SEMrush"],
    caseStudy: {
      state: "A",
      projectSlug: "nextepsolution",
      heading: "A B2B Platform Built for a Search-Driven Buyer",
      body: "NextepSolution is a CRM platform selling into a B2B buyer who researches before they ever fill out a form — the kind of buyer that starts with a Google search, not a scroll. Our involvement centered on the site architecture and conversion pathway that any future search campaign would need to land on: clear product pages mapped to specific buyer questions, not a single generic feature list.",
      ctaLabel: "See the Full Project",
    },
    pricingDescription:
      "Google Ads spend, competitiveness of your keyword space, and the number of campaign types you're running (Search, Shopping, Performance Max, Display) all change the size of the job — we scope against your actual account, not a one-size template.",
    pricingScopeFactors: [
      { title: "Monthly ad spend", description: "The volume flowing through the account shapes how much testing and management the job actually requires." },
      { title: "Keyword space competitiveness", description: "A crowded, high-CPC category needs tighter ongoing optimization than a niche one." },
      { title: "Campaign types running", description: "Search-only is a different job than Search plus Shopping, Performance Max, and Display together." },
      { title: "New account vs. existing", description: "An existing account starts with a full audit; a new one starts with clean architecture." },
    ],
    faqItems: [
      {
        question: "How is Google Ads different from SEO — do I need both?",
        answer:
          "Google Ads buys placement now; SEO earns it over time without ongoing spend per click. They work well together — paid search validates which keywords actually convert, and that data often sharpens SEO priorities. Whether you need both depends on how much of your target search volume SEO alone can realistically capture in your timeframe.",
      },
      {
        question: "What's a realistic minimum budget to start?",
        answer:
          "It depends on your average deal size and how competitive your keyword space is — a plumber bidding on “emergency plumber near me” and a SaaS company bidding on “CRM software” have wildly different cost-per-click realities. We'll walk through your specific numbers on a strategy call.",
      },
      {
        question: "Do you manage Shopping and Performance Max campaigns, or just Search?",
        answer:
          "Both, where relevant to your business. Shopping and Performance Max require product feed hygiene and different creative inputs than Search — we scope which campaign types make sense for your catalog and goals rather than defaulting to Search-only.",
      },
      {
        question: "How quickly will we see results?",
        answer:
          "Search ads can generate traffic immediately, but reliable performance data — enough conversions to make confident bidding decisions — takes longer than a few days. We set a testing window upfront so “is it working” has an agreed checkpoint.",
      },
      {
        question: "What happens to our existing account if we already have one running?",
        answer:
          "We audit before we touch anything: search term history, Quality Score, what's actually converting. We don't rebuild for the sake of rebuilding — if something's working, we keep it and improve around it.",
      },
    ],
    relatedServiceSlugs: ["meta-ads", "analytics-cro", "website-design", "seo"],
    relatedIndustries: ["B2B / SaaS", "Real Estate", "Legal & Professional Services", "Home Services", "Healthcare"],
    leadCapture: {
      variant: "B",
      headline: "Let's Scope Your Google Ads Account",
      helperText: "A quick, directional estimate — not a quote. For a real quote, this routes into our full intake flow.",
      fields: [
        { legend: "Monthly ad spend", key: "spend", options: ["Under ₹50,000/mo", "₹50,000 – ₹1,50,000/mo", "₹1,50,000 – ₹5,00,000/mo", "₹5,00,000+/mo"] },
        { legend: "Primary campaign type", key: "campaign", options: ["Search", "Shopping", "Performance Max", "Display"] },
        { legend: "Current account status", key: "status", options: ["New", "Existing"] },
      ],
      computeEstimate: (values) => {
        if (!values.spend || !values.campaign || !values.status) return null;
        const note =
          values.status === "Existing"
            ? "We'd start with a full audit of what's already running before rebuilding anything."
            : "We'd start clean with campaign architecture built around your keyword intent tiers.";
        return `Based on your inputs, here's the campaign structure we'd start with: a ${values.campaign}-led build matched to your keyword intent tiers. ${note}`;
      },
      emptyStateText: "Enter your details above to see how we'd structure your account.",
    },
  },

  seo: {
    slug: "seo",
    name: "SEO",
    metaDescription:
      "We build SEO as compounding infrastructure — technical foundations, content, and authority stacked in the right order.",
    hero: {
      headline: "Rank Where Buyers Actually Look First",
      subhead:
        "We build SEO as compounding infrastructure — technical foundations, content, and authority stacked in the right order — so your rankings survive algorithm updates instead of evaporating with them.",
      heroImageAlt: "SEO technical audit and keyword research dashboard",
      secondaryCtaLabel: "See Case Study",
    },
    problem: {
      title: "Content can't fix a broken foundation.",
      paragraphs: [
        "Most businesses treat SEO as a content volume game — publish more blog posts, hope Google notices. Meanwhile the technical foundation underneath is quietly capping every page's potential: slow load times, broken internal linking, duplicate content, no clear information architecture for search engines to crawl. Content built on a broken foundation doesn't rank no matter how well it's written.",
        "The second failure mode is misaligned targeting: keywords chosen for search volume instead of buyer intent, competing against pages with ten years of accumulated authority for terms that were never realistically winnable, while the actual long-tail queries their buyers search sit untouched.",
      ],
      quote:
        "You cannot content your way out of a technical problem, and you cannot technical-fix your way into rankings without content that actually answers the query.",
      closing: "We sequence SEO the way it compounds: fix what's broken, then build what's missing, in that order.",
    },
    approachEyebrow: "Our Approach to SEO",
    approachTitle: "Fix what's broken, then build what's missing.",
    approachSteps: [
      {
        title: "Technical Audit",
        description:
          "We crawl the full site — indexation status, site speed, mobile usability, structured data, internal linking, crawl errors — and fix what's actively suppressing rankings before any content strategy begins. Content built on a broken technical foundation underperforms regardless of quality.",
      },
      {
        title: "Keyword & Competitor Research",
        description:
          "We map keyword opportunities against real buyer intent and realistic ranking difficulty — not just search volume — and study what's currently ranking to understand what Google is already rewarding for each target term.",
      },
      {
        title: "Content & On-Page Optimization",
        description:
          "We build or optimize content against the mapped keyword strategy: search-intent-matched page structure, on-page SEO (titles, headers, internal linking), and content depth that genuinely answers the query rather than padding word count.",
      },
      {
        title: "Authority Building & Iteration",
        description:
          "We pursue link building and digital PR opportunities relevant to your industry, then track ranking movement, organic traffic, and conversion data monthly — reallocating effort toward what's actually moving, not what was planned six months ago.",
      },
    ],
    deliverables: [
      "Full technical SEO audit (crawlability, indexation, site speed, mobile usability)",
      "Structured data / schema markup implementation",
      "Keyword research and competitor gap analysis",
      "Content strategy mapped to buyer search intent",
      "On-page optimization (titles, meta descriptions, headers, internal linking)",
      "Content briefs and/or content production (scoped per engagement)",
      "Link building / digital PR outreach strategy",
      "Google Search Console and Google Analytics 4 setup/verification",
      "Local SEO setup (Google Business Profile) where relevant",
      "Monthly ranking and organic traffic reporting",
      "Core Web Vitals monitoring and remediation recommendations",
      "Standing review cadence with your team",
    ],
    tools: ["SEMrush", "Ahrefs", "Google Search Console", "Screaming Frog", "Google Analytics 4"],
    caseStudy: {
      state: "A",
      projectSlug: "finetaxconsultancy",
      heading: "A Trust Business Built to Be Findable",
      body: "FineTaxConsultancy is a professional services business where organic visibility does real work — a tax consultancy's next client is very often someone searching a specific, urgent query, not scrolling a feed. Our build focused on the site's information architecture and on-page foundation: clear service pages structured around the actual questions prospective clients search, and a technical base clean enough for search engines to fully index.",
      ctaLabel: "See the Full Project",
    },
    pricingDescription:
      "What we quote follows what the site actually needs. A five-page brochure site needing a technical cleanup and a thousand-SKU catalog needing sustained content and link building aren't the same job, and pricing them identically would either overcharge the small site or underfund the big one.",
    pricingScopeFactors: [
      { title: "Site size and technical debt", description: "A five-page brochure site and a thousand-page catalog carry very different technical audit scope." },
      { title: "Keyword space competitiveness", description: "Winning against a decade of accumulated authority takes more sustained work than an under-served niche." },
      { title: "Content production included", description: "Strategy-and-briefs-only is a lighter engagement than full content production." },
      { title: "Audit-only vs. full program", description: "A one-time technical fix and an ongoing content-and-link-building program are different jobs." },
    ],
    faqItems: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "Longer than paid media, and there's no honest universal number — it depends on your domain's current authority, technical debt, and how competitive your keyword space is. We set milestone checkpoints (technical fixes, initial ranking movement, traffic growth) so progress is visible before rankings alone tell the full story.",
      },
      {
        question: "Do you write the content, or just tell us what to write?",
        answer:
          "Both, scoped to what you need — some clients want full content production, others have an in-house team and just need briefs and strategy. We define this explicitly at the start of the engagement.",
      },
      {
        question: "Is SEO a one-time project or ongoing?",
        answer:
          "Technical fixes can be largely one-time, but rankings are relative to what competitors are doing — if they keep publishing and building authority and you stop, you lose ground. Most SEO work that sustains results is ongoing.",
      },
      {
        question: "Will AI-generated search results (AI Overviews, etc.) make SEO less useful?",
        answer:
          "Search behavior is shifting, not disappearing — being cited as a source within AI-generated answers still depends on the same fundamentals: technical accessibility, clear structure, and genuine topical authority. We build toward those fundamentals rather than chasing a single feature that may change again.",
      },
      {
        question: "How do you pick which keywords to target?",
        answer:
          "We weigh search volume against buyer intent and realistic ranking difficulty against current competition — a high-volume keyword you can't realistically win in a reasonable timeframe is worse than a lower-volume one that converts and is actually winnable.",
      },
    ],
    relatedServiceSlugs: ["content-marketing", "analytics-cro", "website-design", "google-ads"],
    relatedIndustries: ["Professional Services", "B2B / SaaS", "Healthcare", "E-commerce / D2C", "Education"],
    leadCapture: {
      variant: "A",
      headline: "Let's Scope Your SEO Project",
      successMessage:
        "Got it — we'll follow up with next steps. In the meantime, feel free to book a strategy call directly.",
      secondaryCtaLabel: "Book a Strategy Call",
    },
  },

  "website-design": {
    slug: "website-design",
    name: "Website Design",
    metaDescription:
      "We design and build websites as revenue infrastructure — fast, structurally sound, and laid out around how your specific visitor actually decides.",
    hero: {
      headline: "A Site Engineered to Convert on the First Scroll",
      subhead:
        "We design and build websites as revenue infrastructure — fast, structurally sound, and laid out around how your specific visitor actually decides, not a template borrowed from a portfolio site.",
      heroImageAlt: "Website design wireframes and visual design system",
      secondaryCtaLabel: "See Case Study",
    },
    problem: {
      title: "A polished screenshot isn't a functioning site.",
      paragraphs: [
        "Most business websites are decoration, not infrastructure. They look acceptable in a screenshot and fail in practice: slow load times that lose mobile visitors before the hero image finishes loading, navigation built around the org chart instead of the buyer's decision path, and a homepage that tries to say everything at once and therefore convinces no one of anything.",
        "The second failure is treating the website as a one-time deliverable instead of a living asset. It launches, gets forgotten, and six months later still reflects a business that's since evolved — wrong pricing, dead case studies, a contact form nobody's checked in weeks.",
      ],
      quote:
        "A website's job isn't to look impressive in isolation — it's to move a specific visitor, with a specific question, one step closer to a decision.",
      closing: "We design and build with that job in mind from the first wireframe, not as a polish pass at the end.",
    },
    approachEyebrow: "Our Approach to Website Design",
    approachTitle: "Built to move a specific visitor, on purpose.",
    approachSteps: [
      {
        title: "Discovery & Information Architecture",
        description:
          "We map your buyer's actual decision journey — what they need to know, in what order, before they'll act — and structure the site's navigation and page hierarchy around that journey, not your internal org chart.",
      },
      {
        title: "Wireframing & Visual Design",
        description:
          "We wireframe key pages for flow and hierarchy before any visual design begins, then design against your brand system (or build the visual foundation if one doesn't exist yet) with conversion points — forms, CTAs, proof — placed deliberately, not as an afterthought.",
      },
      {
        title: "Build & Performance Engineering",
        description:
          "We build on a modern stack chosen for your actual needs (from lightweight static builds to full CMS-driven platforms), with performance treated as a design constraint from day one — Core Web Vitals, mobile responsiveness, and load speed are not a cleanup pass.",
      },
      {
        title: "QA, Launch & Handover",
        description:
          "We test across devices and browsers, verify every form and integration actually works, and hand over a site you can maintain — clean documentation, CMS training where relevant, and a clear path for updates that doesn't require calling us for every text change.",
      },
    ],
    deliverables: [
      "Discovery workshop and site information architecture",
      "Wireframes for key pages (homepage, service/product pages, contact)",
      "Custom visual design aligned to brand system",
      "Responsive build (desktop, tablet, mobile)",
      "Performance optimization (Core Web Vitals, image/asset optimization)",
      "CMS setup where applicable, with editor training",
      "Contact form and lead-capture integration",
      "Cross-browser and cross-device QA testing",
      "Basic on-page SEO foundation (meta tags, semantic structure, sitemap)",
      "Analytics and tracking setup (Google Analytics 4, Tag Manager)",
      "Launch support and post-launch bug-fix window",
      "Documentation for future maintenance",
    ],
    tools: ["Figma", "Next.js", "Webflow", "Tailwind CSS", "Vercel"],
    caseStudy: {
      state: "A",
      projectSlug: "aura-estates",
      heading: "A Luxury Landing Page Built to Match the Product",
      body: "Aura Estates needed a landing page that read as premium as the real estate it was selling — no template shortcuts, no stock-photo staging. We built the site's visual language and page structure around a buyer who scrolls slowly and expects restraint: generous whitespace, imagery given room to breathe, and a conversion path that doesn't rush a high-consideration decision.",
      ctaLabel: "See the Full Project",
    },
    pricingDescription:
      "A five-page landing site and a twenty-five-page platform with booking logic are different builds by any honest measure — page count, custom functionality, and whether a brand system already exists all move the number, so we quote against the actual build spec, not a tiered package.",
    pricingScopeFactors: [
      { title: "Page count", description: "A five-page site and a twenty-five-page site are different builds, not the same template scaled up." },
      { title: "Custom functionality", description: "Booking systems, e-commerce, or gated content each add real scope beyond a standard page build." },
      { title: "Existing brand system or not", description: "Designing within an established system is lighter than establishing the visual foundation from scratch." },
      { title: "Content readiness", description: "Whether final copy and imagery already exist changes the timeline and scope materially." },
    ],
    faqItems: [
      {
        question: "Do you design and develop, or just one or the other?",
        answer:
          "Both, as one continuous process — design decisions get made with build constraints in mind from the start, which avoids the common failure of a beautiful design that's expensive or impossible to build performantly.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "Yes. If you already have a brand system, we design within it. If you don't, or it hasn't been extended to digital before, we'll flag that early since website design without a clear brand foundation tends to drift page to page.",
      },
      {
        question: "What platform do you build on — WordPress, Webflow, custom code?",
        answer:
          "A marketing team updating pages weekly needs a visual CMS like Webflow; a site with almost no post-launch content changes is often better served by a faster, leaner custom Next.js build with no CMS overhead at all. We pick the stack against how the site will actually be maintained six months from now, not what's fastest for us to ship.",
      },
      {
        question: "How long does a typical website project take?",
        answer:
          "It depends heavily on page count, content readiness (do you have final copy and images, or are we producing those too), and revision rounds. We give a realistic timeline once scope is defined, not a marketing-page estimate.",
      },
      {
        question: "Will the site be optimized for search from launch?",
        answer:
          "We build the technical SEO foundation — clean structure, proper metadata, sitemap, fast load times — as standard. A full SEO strategy (content, link building, ongoing optimization) is a separate, deeper engagement if you need it.",
      },
    ],
    relatedServiceSlugs: ["branding", "seo", "analytics-cro", "ecommerce-growth"],
    relatedIndustries: ["Real Estate", "E-commerce / D2C", "Hospitality & Travel", "Professional Services", "Fashion & Luxury"],
    leadCapture: {
      variant: "B",
      headline: "Let's Scope Your Website Project",
      helperText: "A quick, directional estimate — not a quote. For a real quote, this routes into our full intake flow.",
      fields: [
        { legend: "Pages needed", key: "pages", options: ["1–5 pages", "6–12 pages", "13–25 pages", "25+ pages"] },
        { legend: "Functionality needed", key: "functionality", options: ["E-commerce", "Booking", "CMS", "Gated content"] },
        { legend: "Timeline urgency", key: "timeline", options: ["Flexible", "Standard", "Urgent"] },
      ],
      computeEstimate: (values) => {
        if (!values.pages || !values.functionality || !values.timeline) return null;
        return `Based on your inputs, here's a realistic project shape: a ${values.pages.toLowerCase()} build with ${values.functionality.toLowerCase()} functionality, scoped against a ${values.timeline.toLowerCase()} timeline.`;
      },
      emptyStateText: "Enter your details above to see a realistic project shape.",
    },
  },

  branding: {
    slug: "branding",
    name: "Branding",
    metaDescription:
      "We build brand systems from strategy down — positioning, voice, and visual identity locked together tightly.",
    hero: {
      headline: "An Identity Competitors Can't Casually Copy",
      subhead:
        "We build brand systems from strategy down — positioning, voice, and visual identity locked together tightly enough that a competitor lifting your color palette still wouldn't sound or feel like you.",
      heroImageAlt: "Brand identity system, logo marks, and typography board",
      secondaryCtaLabel: "See Case Study",
    },
    problem: {
      title: "A mood board isn't a brand strategy.",
      paragraphs: [
        "Most brand identities are chosen, not built — a logo picked from a mood board, a color palette selected because it looked nice in the deck, a tone of voice that was never actually written down anywhere so every piece of content sounds slightly different. It photographs fine in isolation and falls apart the moment it has to scale across a website, an ad, a product package, and a sales deck consistently.",
        "The deeper problem is strategic: a visual identity built before the positioning underneath it was decided. Nobody can articulate why the brand looks the way it does, which means nobody can defend it when a new designer, a new agency, or a rebrand pressure test comes along — it just gets changed.",
      ],
      quote:
        "A brand identity that can't be explained can't be defended — and if you can't defend it, you'll rebrand again in eighteen months for no better reason than boredom.",
      closing:
        "We build the strategic layer first, so the visual and verbal identity that follows has a reason to exist and hold.",
    },
    approachEyebrow: "Our Approach to Branding",
    approachTitle: "Strategy first, so the identity has a reason to hold.",
    approachSteps: [
      {
        title: "Positioning & Strategy",
        description:
          "We define what you actually stand for, who you're for, and what makes you genuinely different from the alternative your buyer would otherwise choose — the strategic foundation every visual and verbal decision gets tested against.",
      },
      {
        title: "Verbal Identity",
        description:
          "We develop tone of voice, messaging pillars, and naming conventions (product names, taglines where relevant) so the brand sounds consistent whether it's a website, an ad, or a customer service email — documented, not tribal knowledge.",
      },
      {
        title: "Visual Identity System",
        description:
          "We design the logo system, color palette, typography, and imagery guidelines built to scale across every surface you actually use — not just the surfaces that looked good in the pitch deck.",
      },
      {
        title: "Brand Guidelines & Rollout",
        description:
          "We document everything in a usable brand guideline (not a 40-page PDF nobody opens) and support rollout across your priority touchpoints — website, social, packaging, sales collateral — so the system gets used consistently from day one.",
      },
    ],
    deliverables: [
      "Brand positioning and strategy document",
      "Competitive and category audit",
      "Verbal identity: tone of voice guidelines and messaging pillars",
      "Naming support (product/tagline, where scoped)",
      "Logo design and logo system (primary, secondary, icon marks)",
      "Color palette and typography system",
      "Imagery and iconography guidelines",
      "Brand guidelines document",
      "Priority touchpoint rollout support (website, social templates, business collateral)",
      "Brand asset file handover (source files, export formats)",
    ],
    tools: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Notion"],
    caseStudy: {
      state: "A",
      projectSlug: "wooden-handicraft-3d",
      heading: "A Visual Identity Built to Sell Craftsmanship",
      body: "Wooden Handicraft 3D needed its visual identity to communicate something specific — handmade texture and material quality — in a product-showcase e-commerce format where photography and layout do most of the persuading. Our work focused on the visual system: how product imagery, typography, and layout worked together to signal craftsmanship rather than mass production.",
      ctaLabel: "See the Full Project",
    },
    pricingDescription:
      "A ground-up identity build, a repositioning of a brand that already has real equity, and a narrower visual refresh sit at genuinely different depths of strategic work — we price the depth the project actually calls for, not a flat branding-package rate.",
    pricingScopeFactors: [
      { title: "Build, reposition, or refresh", description: "A from-zero identity, a strategic repositioning, and a narrower visual refresh are different depths of engagement." },
      { title: "Verbal and visual scope", description: "Full tone-of-voice and naming work adds scope beyond a visual-identity-only project." },
      { title: "Touchpoint rollout breadth", description: "Website, social, packaging, and sales collateral each add rollout work beyond the core system." },
      { title: "Strategy phase depth", description: "Genuine positioning and competitive audit work takes real time — rushing it is the biggest cause of a brand that doesn't hold." },
    ],
    faqItems: [
      {
        question: "Do we need full brand strategy, or can we just get a logo?",
        answer:
          "You can request logo-only work, but we'll flag if we think it's the wrong order — a logo designed without positioning underneath it tends to get second-guessed and redesigned within a year. We'll tell you honestly which path fits your situation.",
      },
      {
        question: "How long does a full branding project take?",
        answer:
          "Longer than most people expect, mainly because the strategy phase (positioning, competitive audit, stakeholder alignment) genuinely takes real time if done properly — rushing it is the single biggest cause of a brand that gets abandoned early.",
      },
      {
        question: "Can you rebrand an existing business without losing brand recognition we've already built?",
        answer:
          "Yes — this is a repositioning/evolution engagement, distinct from a from-zero build. We audit what equity already exists (name recognition, existing visual cues customers associate with you) before deciding what to keep and what to change.",
      },
      {
        question: "Do you design packaging and physical collateral, or just digital?",
        answer:
          "Both — but they're not the same design problem. Packaging has to survive dielines, substrate, and print-vendor constraints a screen never imposes, and colors that look right in Figma can shift under a specific printing process. We scope physical collateral as its own production step, not a resize of the digital assets.",
      },
      {
        question: "What do we actually receive at the end of the engagement?",
        answer:
          "A documented brand guideline, full logo file package in usable formats, and the strategic rationale behind the decisions — so a future designer, employee, or agency can pick it up and apply it consistently without guessing.",
      },
    ],
    relatedServiceSlugs: ["website-design", "content-marketing", "video-motion-production", "social-media-marketing"],
    relatedIndustries: ["E-commerce / D2C", "Fashion & Luxury", "Hospitality & Travel", "Food & Beverage", "Real Estate"],
    leadCapture: {
      variant: "A",
      headline: "Let's Scope Your Branding Project",
      successMessage: "Got it — we'll follow up with next steps.",
      secondaryCtaLabel: "Book a Strategy Call",
    },
  },

  "content-marketing": {
    slug: "content-marketing",
    name: "Content Marketing",
    metaDescription:
      "We plan content against search intent and buyer stage from the start, so what you publish keeps earning traffic and trust months after it goes live.",
    hero: {
      headline: "Content Built to Compound, Not Just Publish and Disappear",
      subhead:
        "We plan content against search intent and buyer stage from the start, so what you publish keeps earning traffic and trust months after it goes live — instead of vanishing off the feed by the following Tuesday.",
      heroImageAlt: "Content strategy editorial calendar and keyword mapping",
      secondaryCtaLabel: "See Case Study",
    },
    problem: {
      title: "A publishing calendar isn't a strategy.",
      paragraphs: [
        "Most content programs run on a publishing calendar, not a strategy — a blog post because “we should probably post something this week,” disconnected from what your buyer is actually searching for or where they are in their decision. It gets published, gets a handful of views, and never gets referenced again.",
        "The second failure is treating content as a volume game rather than a compounding asset. A page that ranked position four eighteen months ago sits untouched while a competitor's fresher, updated version overtakes it. Nothing internally links a new post back to the three related pieces already published, so Google never learns the site has topical depth on the subject — each article competes against its own back catalog instead of reinforcing it.",
      ],
      quote:
        "Content that isn't built around a specific buyer question, at a specific stage, isn't a content strategy — it's a publishing habit.",
      closing:
        "We plan content as an asset with a job — rank, educate, or convert — not as a box to check on a calendar.",
    },
    approachEyebrow: "Our Approach to Content Marketing",
    approachTitle: "Content with a job, not a calendar to fill.",
    approachSteps: [
      {
        title: "Content Audit & Strategy",
        description:
          "We audit what already exists (if anything), identify content gaps against your buyer's actual search behavior and decision stages, and build a content strategy organized around topics you can realistically own — not just topics that sound good.",
      },
      {
        title: "Topic & Keyword Mapping",
        description:
          "We map specific content pieces to specific search terms and buyer questions, sequenced so early pieces build the topical foundation later pieces can link back to and benefit from.",
      },
      {
        title: "Production & Optimization",
        description:
          "We write, edit, and structure content for both the reader and the search engine — clear answers up front, genuine depth beyond a surface-level summary, and on-page SEO built in, not bolted on after publishing.",
      },
      {
        title: "Distribution & Performance Review",
        description:
          "We plan where content gets distributed beyond the blog — email, social, sales enablement — and review performance monthly against traffic, engagement, and (where trackable) conversion influence, refreshing top performers rather than abandoning them.",
      },
    ],
    deliverables: [
      "Content audit of existing assets",
      "Content strategy and editorial calendar",
      "Keyword and topic-cluster mapping",
      "Content briefs (structure, target query, internal linking plan)",
      "Article/blog production (scoped volume per engagement)",
      "On-page SEO optimization per piece",
      "Content repurposing plan (blog to social/email where relevant)",
      "Internal linking strategy across the content library",
      "Performance tracking and monthly reporting",
      "Quarterly content refresh recommendations for top-performing pieces",
    ],
    tools: ["SEMrush", "Google Search Console", "Surfer SEO", "Notion", "Grammarly"],
    caseStudy: {
      state: "A",
      projectSlug: "college-iq",
      heading: "Education Content for a Considered Decision",
      body: "College IQ, an AI-driven EdTech platform, sits in a category where prospective users research heavily before committing — the kind of decision content marketing genuinely influences. Our involvement centered on structuring the platform's informational content around the real questions students and parents search before choosing an EdTech product, rather than generic feature descriptions.",
      ctaLabel: "See the Full Project",
    },
    pricingDescription:
      "The line item that actually moves the price is production: how many pieces, how deep each one runs (a 600-word explainer versus a 3,000-word pillar page), and whether you need strategy alone or writing carried through to publish. We quote against that reality, not a flat per-post rate.",
    pricingScopeFactors: [
      { title: "Production volume", description: "A smaller set of pieces built around real search demand is a different scope than a high-volume calendar." },
      { title: "Content depth", description: "Short-form pieces and long-form pillar content take meaningfully different production time." },
      { title: "Strategy-only or full production", description: "Some teams need briefs and direction; others need the writing done end to end." },
      { title: "Distribution scope", description: "Planning where content gets repurposed and shared is different from executing paid distribution or email sends directly." },
    ],
    faqItems: [
      {
        question: "How much content do we need to publish to see results?",
        answer:
          "Consistency and relevance matter more than raw volume — a smaller number of pieces genuinely built around real search demand will usually outperform a high-volume calendar of generic posts. We scope volume against your specific content gaps, not a fixed number.",
      },
      {
        question: "Do you write the content yourselves, or manage freelance writers?",
        answer:
          "Both models are available depending on the volume and specialization required — we'll recommend whichever fits your budget and subject-matter depth needs, and we're transparent about which model applies to your engagement.",
      },
      {
        question: "How does content marketing relate to SEO?",
        answer:
          "They're deeply linked but not identical — SEO includes the technical and authority work that lets content rank, while content marketing is the strategy and production of what actually gets published. We often run them together for exactly this reason.",
      },
      {
        question: "Can you write for a technical or highly regulated industry?",
        answer:
          "Yes, with the right subject-matter input from your team — we handle the structure, search optimization, and writing craft; you (or a subject-matter expert we loop in) verify technical or regulatory accuracy before anything publishes.",
      },
      {
        question: "Do you handle distribution too, or just writing?",
        answer:
          "We build a distribution plan as part of the strategy (where content gets shared, repurposed, or embedded in other channels), though execution of paid distribution or email sends is typically scoped as a separate, connected service.",
      },
    ],
    relatedServiceSlugs: ["seo", "social-media-marketing", "email-crm-marketing", "branding"],
    relatedIndustries: ["Education", "B2B / SaaS", "Professional Services", "Healthcare", "Finance"],
    leadCapture: {
      variant: "A",
      headline: "Let's Scope Your Content Marketing Program",
      successMessage: "Got it — we'll follow up with next steps.",
      secondaryCtaLabel: "Book a Strategy Call",
    },
  },

  "email-crm-marketing": {
    slug: "email-crm-marketing",
    name: "Email/CRM Marketing",
    metaDescription:
      "We build the flows, segmentation, and CRM discipline that make email your highest-margin channel — the one you own, not the ones you rent.",
    hero: {
      headline: "The Channel You Own, Engineered to Outperform the Ones You Rent",
      subhead:
        "Every platform you advertise on can change its algorithm or its price overnight. Your email list can't be de-ranked. We build the flows, segmentation, and CRM discipline that make it your highest-margin channel.",
      heroImageAlt: "Email flow automation and CRM segmentation dashboard",
      secondaryCtaLabel: "See Case Study",
    },
    problem: {
      title: "A list isn't a CRM strategy.",
      paragraphs: [
        "Most businesses treat email as a broadcast channel — one list, one monthly newsletter, sent to everyone regardless of where they are in the relationship. Open rates decline, unsubscribes creep up, and the channel gets blamed for “not working” when the actual problem is that a first-time visitor and a five-year customer are receiving the identical message.",
        "The deeper problem is a CRM that exists but isn't actually used to segment or trigger anything — customer data sits in a database, unconnected to the marketing that could be personalized against it. Abandoned carts go unaddressed. Win-back sequences for lapsed customers don't exist. Every send is manual instead of built once and left to run.",
      ],
      quote: "A list of email addresses isn't a CRM strategy — it's a spreadsheet with a send button.",
      closing:
        "We build segmentation and automated flows first, so the channel does compounding work instead of requiring a manual campaign every single time.",
    },
    approachEyebrow: "Our Approach to Email/CRM Marketing",
    approachTitle: "Flows built once, doing compounding work.",
    approachSteps: [
      {
        title: "List Audit & Segmentation Strategy",
        description:
          "We audit existing list health (engagement, deliverability, data hygiene) and build a segmentation model based on behavior and lifecycle stage — new subscriber, repeat customer, lapsed customer — not a single undifferentiated list.",
      },
      {
        title: "Automated Flow Build",
        description:
          "We build the core automation flows that should run without a human sending each one manually: welcome series, abandoned cart/browse, post-purchase, win-back — each triggered by actual behavior, not a calendar date.",
      },
      {
        title: "Campaign Strategy & Content",
        description:
          "We plan and produce ongoing campaign sends (promotional, editorial, product) layered on top of the automated flows, written and designed to match brand voice rather than generic template copy.",
      },
      {
        title: "Testing, Deliverability & Reporting",
        description:
          "We A/B test subject lines and send times, monitor deliverability (sender reputation, spam complaints, inbox placement), and report on open, click, and — where trackable — revenue-per-send, refining the program month over month.",
      },
    ],
    deliverables: [
      "Email list audit and data hygiene review",
      "Segmentation strategy (behavior and lifecycle-based)",
      "Automated flow build: welcome series, abandoned cart, post-purchase, win-back",
      "Email template design aligned to brand system",
      "Ongoing campaign calendar and copywriting",
      "A/B testing plan (subject lines, send times, content)",
      "Deliverability monitoring and sender reputation management",
      "CRM integration and data sync verification",
      "Monthly performance reporting (opens, clicks, revenue-per-send where trackable)",
      "List growth strategy recommendations",
    ],
    tools: ["HubSpot", "Klaviyo", "Mailchimp", "Zoho CRM"],
    caseStudy: {
      state: "A",
      projectSlug: "nextep-ventures",
      heading: "CRM Infrastructure for a B2B Marketplace",
      body: "Nextep Ventures, a B2B marketplace and auction platform, involves a buyer relationship with multiple touchpoints over time — the kind of business where CRM-driven communication (not one-off broadcast email) genuinely matters. Our work focused on the underlying platform and data structure that CRM-driven communication would run on top of.",
      ctaLabel: "See the Full Project",
    },
    pricingDescription:
      "List size, how many automated flows actually need building, and whether we're standing up a CRM from scratch or working inside one you already run — those three levers change the job, and the quote follows them, not a flat monthly retainer figure.",
    pricingScopeFactors: [
      { title: "List size", description: "Segmentation and deliverability work scale with the number of subscribers actually being managed." },
      { title: "Number of flows needed", description: "A welcome series alone is lighter than welcome, abandoned cart, post-purchase, and win-back built together." },
      { title: "Platform setup scope", description: "Working within an existing CRM is different from standing up the platform itself." },
      { title: "Campaign cadence", description: "Ongoing promotional and editorial sends add scope on top of the core automated flows." },
    ],
    faqItems: [
      {
        question: "We already have Mailchimp/Klaviyo set up — do you rebuild from scratch?",
        answer:
          "No. We audit what's already built — existing flows, segmentation, deliverability health — and improve on it. If your welcome series is working, we keep it and add what's missing rather than rebuilding for its own sake.",
      },
      {
        question: "How is this different from just sending a monthly newsletter ourselves?",
        answer:
          "A newsletter is one broadcast to everyone; CRM marketing is behavior-triggered and segmented — a cart abandoner gets a different message than a five-time customer, automatically, without someone manually building each send.",
      },
      {
        question: "Will this hurt our deliverability if we send more emails?",
        answer:
          "Sending more to a poorly segmented list can hurt deliverability — sending more relevant, well-targeted emails to the right segments typically improves engagement, which is what protects deliverability. We monitor sender reputation as a standing part of the engagement specifically to catch this.",
      },
      {
        question: "Do you handle SMS/WhatsApp marketing too, or just email?",
        answer:
          "Primarily email/CRM, though we can scope adjacent channels (SMS, WhatsApp) if your platform supports it and your audience is a genuine fit — we won't add a channel just because it's available.",
      },
      {
        question: "What CRM platform should we use if we don't have one yet?",
        answer:
          "A D2C store with a single funnel is usually better served by Klaviyo's e-commerce-native segmentation than a full sales CRM it doesn't need; a B2B business with a sales cycle and pipeline stages needs HubSpot or Zoho's deal-tracking, which Klaviyo doesn't do. We recommend the platform that matches your actual sales motion, not whichever one we're most familiar with.",
      },
    ],
    relatedServiceSlugs: ["ecommerce-growth", "analytics-cro", "content-marketing", "ai-marketing"],
    relatedIndustries: ["E-commerce / D2C", "B2B / SaaS", "Professional Services", "Hospitality & Travel"],
    leadCapture: {
      variant: "A",
      headline: "Let's Scope Your Email/CRM Program",
      successMessage: "Got it — we'll follow up with next steps.",
      secondaryCtaLabel: "Book a Strategy Call",
    },
  },

  "ecommerce-growth": {
    slug: "ecommerce-growth",
    name: "E-commerce Growth",
    metaDescription:
      "We treat e-commerce growth as a full-funnel discipline — traffic, merchandising, and checkout flow diagnosed together.",
    hero: {
      headline: "Every Step of the Funnel Audited Until Checkout Stops Leaking Revenue",
      subhead:
        "We treat e-commerce growth as a full-funnel discipline — traffic, merchandising, and checkout flow diagnosed together, because a store that's optimized for clicks but leaks at checkout is optimized for the wrong number.",
      heroImageAlt: "E-commerce funnel audit and checkout flow diagnostics",
      secondaryCtaLabel: "See Case Study",
    },
    problem: {
      title: "More traffic into a leaking funnel just leaks faster.",
      paragraphs: [
        "Most e-commerce stores optimize the top of the funnel — more traffic, more ad spend, more campaigns — while the actual leak is further down: a slow product page, a checkout flow with too many steps, shipping costs revealed only at the final step, or a mobile experience that was never actually tested on the devices most of the traffic arrives on. More traffic into a leaking funnel just means more people leaking out of it faster.",
        "The second failure is treating store growth as a series of disconnected tactics — a paid campaign here, a discount code there — instead of a coordinated system where merchandising, pricing, and retention decisions reinforce each other.",
      ],
      quote:
        "Driving more traffic to a store with a broken checkout doesn't grow the business — it just grows the number of people who leave frustrated.",
      closing: "We diagnose the full funnel before we recommend where to spend the next rupee of acquisition budget.",
    },
    approachEyebrow: "Our Approach to E-commerce Growth",
    approachTitle: "Diagnose the funnel before scaling spend into it.",
    approachSteps: [
      {
        title: "Funnel Audit",
        description:
          "We map the full buyer journey — product discovery, product page, cart, checkout — and identify where visitors are actually dropping off, using real behavioral data rather than assuming based on industry norms.",
      },
      {
        title: "Store & Merchandising Optimization",
        description:
          "We fix product page conversion elements (imagery, copy, social proof, urgency signals used honestly), collection/category structure, and site search so browsing actually leads toward purchase.",
      },
      {
        title: "Checkout & Retention Systems",
        description:
          "We reduce checkout friction (steps, surprise costs, guest checkout options) and build retention mechanics — email flows, loyalty or repeat-purchase incentives — so growth doesn't depend entirely on acquiring new customers every month.",
      },
      {
        title: "Acquisition Alignment & Iteration",
        description:
          "Only once the funnel itself converts well do we scale acquisition spend into it deliberately, tracking store-wide metrics (not just campaign-level ones) monthly and iterating on whichever stage is currently the biggest leak.",
      },
    ],
    deliverables: [
      "Full-funnel audit (discovery through checkout)",
      "Product page conversion optimization",
      "Collection/category structure and site search review",
      "Checkout flow friction audit and recommendations",
      "Cart abandonment recovery strategy",
      "Pricing and shipping-cost presentation review",
      "Retention and repeat-purchase strategy",
      "Mobile commerce experience testing and fixes",
      "Store analytics and conversion tracking setup",
      "Monthly store-wide performance reporting",
      "Acquisition-to-funnel alignment recommendations",
    ],
    tools: ["Shopify", "Google Analytics 4", "Hotjar", "Klaviyo"],
    caseStudy: {
      state: "A",
      projectSlug: "woodcraft-store-premium",
      heading: "A Full E-commerce Build for a Premium Catalog",
      body: "Woodcraft Store Premium required a store architecture built to carry a premium product catalog convincingly — product photography given real weight, category structure that made browsing intuitive rather than overwhelming, and a checkout flow built without unnecessary friction. Our work covered the store's structural and merchandising foundation that ongoing funnel optimization would build on.",
      ctaLabel: "See the Full Project",
    },
    pricingDescription:
      "A diagnostic pass, a full funnel rebuild, and a standing optimization retainer are three jobs at three different depths — we scope against which one your store actually needs this quarter, not a bundled package that assumes all three.",
    pricingScopeFactors: [
      { title: "Audit-only, rebuild, or retainer", description: "A diagnostic pass, a full funnel rebuild, and an ongoing optimization retainer are different engagements." },
      { title: "Catalog complexity", description: "A handful of products and a large, multi-category catalog need different merchandising depth." },
      { title: "Checkout and retention scope", description: "Fixing checkout friction is a narrower job than also building out loyalty and repeat-purchase mechanics." },
      { title: "Acquisition alignment", description: "Whether spend scaling is included, or the engagement stops at fixing the funnel itself." },
    ],
    faqItems: [
      {
        question: "Do you rebuild our store, or optimize what we have?",
        answer:
          "Usually optimize first — most stores don't need a full rebuild, they need specific, identified friction points fixed. We only recommend a rebuild if the audit genuinely shows the existing platform or structure is the limiting factor.",
      },
      {
        question: "What platform do you work with — Shopify, WooCommerce, custom builds?",
        answer:
          "Primarily Shopify — its checkout, app ecosystem, and Liquid theming give us the most room to fix merchandising and checkout friction without a rebuild. On WooCommerce or a custom cart, some fixes (native upsells, one-click checkout) simply aren't available at the platform level, and we'll say so plainly rather than promise a workaround that doesn't exist.",
      },
      {
        question: "How is this different from Meta/Google Ads services?",
        answer:
          "Ads services drive traffic to the store; e-commerce growth optimizes what happens once that traffic arrives. Running one without the other tends to waste money — we often recommend pairing them.",
      },
      {
        question: "Can you help with abandoned cart recovery specifically?",
        answer:
          "Yes — this typically involves both a technical flow (automated recovery emails/SMS) and a diagnostic step (why is cart abandonment high in the first place — cost surprises, trust signals missing, technical friction) rather than treating recovery emails as a standalone fix.",
      },
      {
        question: "How quickly can we expect to see conversion rate improve?",
        answer:
          "It depends on current baseline traffic volume (enough visits to get statistically meaningful data) and how many friction points exist. We prioritize the highest-impact fixes first and set a review checkpoint rather than a guessed timeline.",
      },
    ],
    relatedServiceSlugs: ["analytics-cro", "email-crm-marketing", "meta-ads", "website-design"],
    relatedIndustries: ["E-commerce / D2C", "Fashion & Luxury", "Home & Lifestyle", "Food & Beverage"],
    leadCapture: {
      variant: "B",
      headline: "Let's Scope Your Store's Growth Plan",
      helperText: "A quick, directional estimate — not a quote. For a real quote, this routes into our full intake flow.",
      fields: [
        { legend: "Monthly store traffic", key: "traffic", options: ["Under 5,000", "5,000–25,000", "25,000–100,000", "100,000+"] },
        { legend: "Current conversion rate", key: "conversion", options: ["Not sure", "Under 1%", "1–3%", "3%+"] },
        { legend: "Primary bottleneck", key: "bottleneck", options: ["Traffic", "Product pages", "Checkout", "Retention"] },
      ],
      computeEstimate: (values) => {
        if (!values.traffic || !values.conversion || !values.bottleneck) return null;
        return `Based on your inputs, here's where we'd look first: your ${values.bottleneck.toLowerCase()} stage, diagnosed against your current traffic volume before we touch acquisition spend.`;
      },
      emptyStateText: "Enter your details above to see where we'd start.",
    },
  },

  "influencer-marketing": {
    slug: "influencer-marketing",
    name: "Influencer Marketing",
    metaDescription:
      "We run influencer partnerships the way we run paid campaigns — vetted for genuine audience fit, briefed against a specific outcome, and measured, not just gifted and hoped for.",
    hero: {
      headline: "Borrowed Trust, Deployed With the Same Rigor as Paid Media",
      subhead:
        "We run influencer partnerships the way we run paid campaigns — vetted for genuine audience fit, briefed against a specific outcome, and measured, not just gifted and hoped for.",
      heroImageAlt: "Creator content review board for an influencer marketing campaign",
      secondaryCtaLabel: "See Our Approach",
    },
    problem: {
      title: "Reach isn't the same currency as relevance.",
      paragraphs: [
        "Most influencer marketing is chosen on follower count and gut feeling — a creator with a large audience but no genuine overlap with your actual buyer, briefed loosely with \"just talk about the product however feels natural,\" and then never measured against anything beyond the vanity metrics on the post itself. The brand gets content; it rarely gets a business outcome.",
        "The second failure is treating each partnership as a one-off transaction instead of a system. No consistent briefing process, no clear usage rights negotiated for the content afterward, no tracking mechanism (unique codes, links) to separate what actually drove action from what just generated impressions.",
      ],
      quote: "An influencer partnership without a tracked outcome isn't marketing — it's a sponsorship you can't measure.",
      closing:
        "We select for audience fit over reach, brief for a specific outcome, and build measurement into the partnership from the start.",
    },
    approachEyebrow: "Our Approach to Influencer Marketing",
    approachTitle: "Vetted for fit, briefed for an outcome, measured either way.",
    approachSteps: [
      {
        title: "Audience Fit & Creator Vetting",
        description:
          "We identify creators whose actual audience overlaps with your buyer — reviewing engagement quality and audience demographics, not just follower count — and vet for brand safety and past partnership authenticity before any outreach.",
      },
      {
        title: "Briefing & Content Strategy",
        description:
          "We brief creators against a specific outcome and message architecture while preserving their authentic voice — over-scripted influencer content reads as an ad and underperforms, so briefs set boundaries and goals, not a script to read verbatim.",
      },
      {
        title: "Campaign Execution & Tracking",
        description:
          "We negotiate usage rights, set up trackable links or codes per creator, and manage the rollout timeline across single-creator and multi-creator campaigns alike, so performance can be attributed at the individual-partnership level.",
      },
      {
        title: "Measurement & Repeat Partnerships",
        description:
          "We report on what's actually trackable — click-throughs, code redemptions, engagement quality — and identify which creator relationships are worth building into ongoing partnerships versus one-off activations.",
      },
    ],
    deliverables: [
      "Creator research and audience-fit vetting",
      "Outreach and partnership negotiation",
      "Creative brief development per creator/campaign",
      "Usage rights and contract terms negotiation",
      "Trackable link/code setup per creator",
      "Content review and approval coordination",
      "Campaign timeline and rollout management",
      "Performance tracking and attribution reporting",
      "Recommendations for ongoing vs. one-off partnerships",
    ],
    tools: ["Instagram Creator Marketplace", "Modash", "Bitly", "Airtable"],
    caseStudy: {
      state: "B",
      heading: "No Campaign We'd Stand Behind Yet",
      body: "We haven't yet run a documented influencer marketing campaign we can show real numbers for. Rather than borrow an unrelated project to fill this space, we'd rather show you real results once they exist. In the meantime, talk to us about how we'd approach your category.",
      metrics: [
        "Trackable click-throughs by creator",
        "Code/link redemption rate",
        "Engagement quality by audience segment",
      ],
      ctaLabel: "Talk to Us About Your Brand",
    },
    pricingDescription:
      "Creator tier, how many partnerships are running in parallel, and whether this is a single activation or a standing ambassador program each change the negotiation and management load — we quote against the actual roster, not a flat per-creator rate.",
    pricingScopeFactors: [
      { title: "Creator tier", description: "Micro-influencer partnerships and macro-creator campaigns carry very different negotiation and cost profiles." },
      { title: "Number of partnerships", description: "A single-creator activation is a lighter job than a multi-creator campaign run in parallel." },
      { title: "Single campaign or ongoing program", description: "A one-off activation and a standing ambassador-style program are scoped differently." },
      { title: "Usage rights complexity", description: "Negotiating broader content usage rights (paid ads, long-term reuse) adds scope beyond the post itself." },
    ],
    faqItems: [
      {
        question: "Should we work with micro-influencers or larger creators?",
        answer:
          "It depends on your goal — micro-influencers typically deliver higher engagement rates and tighter audience relevance at lower cost per partnership, while larger creators buy reach faster. We'll recommend a mix based on your budget and what you're actually trying to achieve.",
      },
      {
        question: "How do you measure ROI on influencer content?",
        answer:
          "Through trackable mechanisms built in from the start — unique discount codes, dedicated links, UTM-tagged content — rather than relying on the platform's native engagement metrics alone, which don't tell you whether the partnership actually drove action.",
      },
      {
        question: "Do you handle payment and contracts with creators?",
        answer:
          "Yes, as part of the engagement — negotiation, usage rights, and contract terms are managed so you're not exposed to ambiguity about what you can do with the content afterward.",
      },
      {
        question: "Can we reuse influencer content in our own paid ads?",
        answer:
          "Only if usage rights are negotiated for that upfront — this is exactly the kind of detail we build into the contract before content goes live, so you're not stuck asking permission after the fact.",
      },
      {
        question: "How long before we see if a partnership is working?",
        answer:
          "Depends on the creator's typical posting cadence and audience behavior, but we set a defined review window per campaign so \"did this work\" has a clear checkpoint rather than an indefinite wait.",
      },
    ],
    relatedServiceSlugs: ["social-media-marketing", "content-marketing", "video-motion-production", "pr-reputation-management"],
    relatedIndustries: ["Fashion & Luxury", "E-commerce / D2C", "Food & Beverage", "Beauty & Wellness", "Hospitality & Travel"],
    leadCapture: {
      variant: "A",
      headline: "Let's Scope Your Influencer Marketing Program",
      successMessage: "Got it — we'll follow up with next steps.",
      secondaryCtaLabel: "Book a Strategy Call",
    },
  },

  "app-store-marketing": {
    slug: "app-store-marketing",
    name: "App Store Marketing/ASO",
    metaDescription:
      "App Store Optimization is the SEO of the app economy — we optimize what actually drives store-search visibility and install intent, not just the screenshots that looked best in a meeting.",
    hero: {
      headline: "Ranked Higher, Installed More, Uninstalled Less",
      subhead:
        "App Store Optimization is the SEO of the app economy — we optimize what actually drives store-search visibility and install intent, not just the screenshots that looked best in a meeting.",
      heroImageAlt: "App store listing optimization review across iOS and Android",
      secondaryCtaLabel: "See Our Approach",
    },
    problem: {
      title: "Most listings get built once and never revisited.",
      paragraphs: [
        "Keyword fields get chosen without real research, screenshots show features instead of outcomes, and the description reads like it was written for the founder's pride rather than the searcher's decision. Meanwhile install-to-uninstall ratio (the metric that actually determines long-term store ranking on some platforms) gets ignored entirely in favor of raw install count.",
        "The second failure is disconnecting ASO from the rest of acquisition — paid user acquisition campaigns running with zero connection to what the store listing itself is optimized to convert, so traffic arrives and bounces at the listing page before it ever reaches the app.",
      ],
      quote:
        "An app store listing is a landing page you don't get to A/B test as freely as a website — every keyword and screenshot choice has to be right the first time, or you're paying for traffic that arrives and leaves.",
      closing:
        "We treat the listing as conversion infrastructure, researched and tested with the same rigor as any other acquisition channel.",
    },
    approachEyebrow: "Our Approach to ASO",
    approachTitle: "The listing, treated as conversion infrastructure.",
    approachSteps: [
      {
        title: "Keyword Research & Competitive Audit",
        description:
          "We research store-search keyword opportunities specific to iOS App Store and Google Play (they rank differently), and audit competitor listings to understand what's currently winning visibility in your category.",
      },
      {
        title: "Listing Optimization",
        description:
          "We optimize title, subtitle/short description, keyword fields, and full description against researched terms, and rework screenshots and preview video framing around outcomes the searcher cares about, not just feature call-outs.",
      },
      {
        title: "Conversion Rate Testing",
        description:
          "Where the platform supports it, we run structured tests on icon, screenshots, and preview video to identify what actually improves listing-page-to-install conversion, rather than guessing which creative direction performs best.",
      },
      {
        title: "Ratings, Reviews & Ongoing Iteration",
        description:
          "We build a review-prompt strategy timed to genuine positive-experience moments (not a blanket popup on first open), monitor ranking and conversion data monthly, and iterate the listing as competitors and algorithm weighting shift.",
      },
    ],
    deliverables: [
      "ASO keyword research (iOS App Store and Google Play, separately)",
      "Competitor listing audit",
      "Title, subtitle, and keyword field optimization",
      "App description copywriting",
      "Screenshot and preview video creative direction",
      "A/B testing plan for creative assets (where platform-supported)",
      "Review-prompt strategy and timing recommendations",
      "Category and localization recommendations (where relevant)",
      "Monthly ranking and conversion-rate reporting",
      "Ongoing listing iteration based on performance data",
    ],
    tools: ["App Store Connect", "Google Play Console", "Sensor Tower", "AppTweak"],
    caseStudy: {
      state: "B",
      heading: "No Listing We've Measured Yet",
      body: "No portfolio project we've shipped maps honestly to an app store listing engagement yet — we build our portfolio with real, documented work, not borrowed relevance. Talk to us about your app and how we'd approach the listing.",
      metrics: ["Store-search keyword ranking", "Listing-to-install conversion rate", "Install-to-uninstall ratio"],
      ctaLabel: "Talk to Us About Your App",
    },
    pricingDescription:
      "A fresh listing build, an optimization pass on a listing that's already live, and an ongoing program with structured creative testing each require different research and iteration depth — we price against which of those three your app actually needs.",
    pricingScopeFactors: [
      { title: "New listing or optimization pass", description: "Building a listing from scratch and optimizing a live one require different research depth." },
      { title: "Platforms covered", description: "iOS, Android, or both — each store's algorithm is researched and optimized separately." },
      { title: "One-time or ongoing program", description: "Initial optimization is a defined project; sustained ranking needs ongoing monitoring." },
      { title: "Creative testing scope", description: "Structured A/B testing on icon, screenshots, and preview video adds scope beyond a static listing pass." },
    ],
    faqItems: [
      {
        question: "Is ASO a one-time setup or an ongoing service?",
        answer:
          "Initial optimization can be a defined project, but rankings shift as competitors update their listings and platform algorithms change — most clients who see sustained results treat it as an ongoing, monitored program.",
      },
      {
        question: "Do you run paid user acquisition too, or just organic ASO?",
        answer:
          "ASO is organic store-search optimization; paid UA (App campaigns on Google/Meta) is a related but distinct discipline we can scope alongside it — they perform better connected than run in isolation, since paid traffic still lands on the same listing.",
      },
      {
        question: "How different is optimizing for iOS App Store vs. Google Play?",
        answer:
          "Meaningfully different — the ranking algorithms weight keyword fields, ratings, and metadata differently between the two stores, so we research and optimize each platform's listing separately rather than treating them as one job.",
      },
      {
        question: "Can ASO help if our app already has bad reviews?",
        answer:
          "It can help going forward — a strong review-prompt strategy timed to positive moments improves the trend — but ASO doesn't erase existing negative reviews. If ratings are a serious issue, we'll be direct about that being a product/support problem ASO alone can't fix.",
      },
      {
        question: "What's a realistic timeline to see ranking improvement?",
        answer:
          "It depends on your category's competitiveness and current listing quality — we set a review checkpoint after initial optimization rather than promising a fixed timeline upfront.",
      },
    ],
    relatedServiceSlugs: ["google-ads", "meta-ads", "analytics-cro", "ai-marketing"],
    relatedIndustries: ["B2B / SaaS", "E-commerce / D2C", "Healthcare", "Education"],
    leadCapture: {
      variant: "B",
      headline: "Let's Scope Your ASO Project",
      helperText: "A quick, directional estimate — not a quote. For a real quote, this routes into our full intake flow.",
      fields: [
        { legend: "Platform(s)", key: "platform", options: ["iOS", "Android", "Both"] },
        { legend: "Current listing status", key: "status", options: ["New listing", "Existing — needs optimization"] },
        { legend: "Primary goal", key: "goal", options: ["Installs", "Conversion rate", "Ratings recovery"] },
      ],
      computeEstimate: (values) => {
        if (!values.platform || !values.status || !values.goal) return null;
        return `Based on your inputs, here's where we'd start: a ${values.platform.toLowerCase()} listing pass focused on ${values.goal.toLowerCase()}, treating this as ${
          values.status.toLowerCase().startsWith("new") ? "a fresh listing build" : "an optimization pass on what's already live"
        }.`;
      },
      emptyStateText: "Enter your details above to see where we'd start.",
    },
  },

  "video-motion-production": {
    slug: "video-motion-production",
    name: "Video & Motion Production",
    metaDescription:
      "We produce video and motion content built for how it's actually watched — sound-off on a feed, fast-skipping on a story, patient on a landing page.",
    hero: {
      headline: "Motion That Earns the First Three Seconds and Keeps Them",
      subhead:
        "We produce video and motion content built for how it's actually watched — sound-off on a feed, fast-skipping on a story, patient on a landing page — not a single cut repurposed everywhere and hoping it works.",
      heroImageAlt: "Video production edit timeline with platform-specific cuts",
      secondaryCtaLabel: "See Our Approach",
    },
    problem: {
      title: "A single cut can't serve every platform's attention span.",
      paragraphs: [
        "Most brand video is produced for a single context — usually a polished, long-form brand film — and then force-fit into every placement it's later needed for: cropped awkwardly into a Story, missing captions for sound-off feed viewing, paced for a cinema attention span on a platform where the average viewer decides to keep watching in under two seconds.",
        "The second failure is treating production as the end of the process instead of the start of a testing cycle. One hero video gets made, runs everywhere, and never gets iterated against what's actually retaining viewers versus losing them in the first three seconds — the exact data that would make the next piece better.",
      ],
      quote: "The best-produced video in the world fails if it was cut for the wrong platform's attention span.",
      closing:
        "We plan format and pacing per placement from the brief stage, and treat performance data as an input to the next cut, not an afterthought.",
    },
    approachEyebrow: "Our Approach to Video & Motion Production",
    approachTitle: "Format planned per placement, from the brief stage.",
    approachSteps: [
      {
        title: "Creative Brief & Format Planning",
        description:
          "We define the message and format per intended placement upfront — a 6-second bumper, a 30-second feed ad, and a 2-minute brand film are different creative problems, not the same video trimmed three ways.",
      },
      {
        title: "Pre-Production",
        description:
          "We script, storyboard, and plan shoot or animation logistics (location, talent, motion-graphics scope) against the defined format and message, so production days aren't spent improvising decisions that should've been made earlier.",
      },
      {
        title: "Production & Post",
        description:
          "We shoot or animate, then edit with platform-specific pacing, captions for sound-off viewing, and a hook built for the first three seconds — followed by color, sound design, and motion graphics polish appropriate to the format's actual viewing context.",
      },
      {
        title: "Distribution Cuts & Iteration",
        description:
          "We deliver format-specific exports (feed, Stories/Reels, landing page, YouTube) from a single production, and where performance data is available, use retention drop-off points to inform the next cut's pacing and hook.",
      },
    ],
    deliverables: [
      "Creative brief and format-per-placement planning",
      "Scripting and storyboarding",
      "Shoot production (location/studio, talent coordination) or motion-graphics animation",
      "Editing with platform-specific pacing",
      "Caption/subtitle burn-in for sound-off viewing",
      "Color grading and sound design",
      "Motion graphics and title/lower-third design",
      "Format-specific export package (Feed, Stories/Reels, landing page, YouTube)",
      "Thumbnail/cover frame selection",
      "Performance-informed iteration recommendations (where data is available)",
    ],
    tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Cinema 4D"],
    caseStudy: {
      state: "B",
      heading: "Nothing Shipped We Can Show Honestly",
      body: "We haven't yet shipped a documented video/motion production project we can spotlight with confidence — several portfolio projects involved web and brand work, but not confirmed video deliverables. Talk to us about your project instead of us dressing up an unrelated one.",
      metrics: ["Hook retention in the first 3 seconds", "Completion rate by format", "Cut-to-cut engagement drop-off"],
      ctaLabel: "Talk to Us About Your Project",
    },
    pricingDescription:
      "What actually drives the cost on a production is format count, whether the concept calls for a shoot, animation, or both, and how many shoot days it genuinely requires — we scope against the production plan, not a flat day rate.",
    pricingScopeFactors: [
      { title: "Format count", description: "One hero cut is a different job than a full set of platform-specific exports." },
      { title: "Live-action, motion graphics, or both", description: "Shoots and animation are different production paths, often combined on one project." },
      { title: "Shoot-day requirements", description: "Location, talent, and crew needs scale the production timeline and cost directly." },
      { title: "Revision rounds", description: "Scoped and confirmed in the brief before production starts, so expectations are clear on both sides." },
    ],
    faqItems: [
      {
        question: "Do you handle both filming and animation, or just one?",
        answer:
          "Both, scoped per project — live-action shoots and motion-graphics animation are different disciplines with different production paths, and many projects use a mix of the two.",
      },
      {
        question: "Can one production be cut into multiple ad formats?",
        answer:
          "Yes, and we plan for it from the brief stage — shooting or animating with multiple downstream cuts in mind is far more efficient than trying to force a single long-form cut into a 6-second bumper after the fact.",
      },
      {
        question: "Do you write scripts, or do we need to provide them?",
        answer:
          "We write scripts as part of the creative process, informed by your brand voice and the message goals for each format — you review and approve before production begins.",
      },
      {
        question: "How many revision rounds are included?",
        answer:
          "This is scoped per project and confirmed in the brief before production starts, so expectations are clear on both sides before any billable production time is spent.",
      },
      {
        question: "What if we only need a few short social clips, not a full production?",
        answer:
          "We scope smaller-format projects too — not every engagement needs a full shoot day; some are lighter motion-graphics or edit-only jobs, and we'll recommend the right scope for your actual need rather than upselling a bigger production.",
      },
    ],
    relatedServiceSlugs: ["social-media-marketing", "meta-ads", "branding", "influencer-marketing"],
    relatedIndustries: ["Fashion & Luxury", "Hospitality & Travel", "Food & Beverage", "E-commerce / D2C"],
    leadCapture: {
      variant: "A",
      headline: "Let's Scope Your Video Project",
      successMessage: "Got it — we'll follow up with next steps.",
      secondaryCtaLabel: "Book a Strategy Call",
    },
  },

  "pr-reputation-management": {
    slug: "pr-reputation-management",
    name: "PR/Reputation Management",
    metaDescription:
      "We manage brand reputation as an active discipline — proactive coverage, review response, and crisis-readiness — rather than something you only think about the week a bad review goes viral.",
    hero: {
      headline: "Control the Narrative Before the Internet Writes It for You",
      subhead:
        "We manage brand reputation as an active discipline — proactive coverage, review response, and crisis-readiness — rather than something you only think about the week a bad review goes viral.",
      heroImageAlt: "Reputation monitoring dashboard across press and review platforms",
      secondaryCtaLabel: "See Our Approach",
    },
    problem: {
      title: "By the time you respond, someone else already wrote the story.",
      paragraphs: [
        "Most businesses only engage with PR and reputation management reactively — a bad review, a social media complaint that's picking up traction, a negative press mention — and by the time it's addressed, the narrative has already been set by whoever spoke first and loudest. Meanwhile positive coverage opportunities (founder story angles, product launches genuinely newsworthy to a trade publication, customer success stories) go untouched because nobody owns proactive outreach.",
        "The second failure is inconsistent review and reputation monitoring — no defined process for responding to reviews across platforms, no early-warning system for reputation risk, so problems compound in public for days before anyone at the company even sees them.",
      ],
      quote:
        "The businesses that handle a crisis well aren't the ones with the best crisis response — they're the ones who already had a reputation, and a process, before the crisis started.",
      closing:
        "We build the proactive layer (coverage, review management, monitoring) so that if a reactive moment does arrive, you're not starting from zero credibility.",
    },
    approachEyebrow: "Our Approach to PR/Reputation Management",
    approachTitle: "The proactive layer, built before the reactive moment.",
    approachSteps: [
      {
        title: "Reputation Audit & Monitoring Setup",
        description:
          "We audit current sentiment across reviews, press mentions, and social conversation, and set up ongoing monitoring so reputation-affecting moments are caught early, not discovered days later in a comment thread.",
      },
      {
        title: "Proactive PR Strategy",
        description:
          "We identify genuinely newsworthy angles (founder story, product milestones, industry commentary opportunities) and pitch relevant press and publications — proactive coverage that builds credibility before it's needed defensively.",
      },
      {
        title: "Review & Response Management",
        description:
          "We build a defined process for responding to reviews across platforms — timely, on-brand, and consistent — including a clear escalation path for reviews that need more than a template response.",
      },
      {
        title: "Crisis Readiness & Response",
        description:
          "We prepare a crisis response framework in advance (who approves messaging, what channels get used, response time targets) so that if a reputation event does happen, the response is fast and considered rather than improvised under pressure.",
      },
    ],
    deliverables: [
      "Reputation and sentiment audit (reviews, press, social mentions)",
      "Ongoing reputation monitoring setup",
      "Proactive PR angle development and media pitch strategy",
      "Press outreach and relationship building with relevant publications",
      "Review response process and templates across platforms",
      "Escalation protocol for high-risk reviews or complaints",
      "Crisis response framework and messaging approval chain",
      "Monthly sentiment and coverage reporting",
      "Founder/spokesperson media-readiness guidance where relevant",
    ],
    tools: ["Google Alerts", "Brand24", "Meltwater", "Google Business Profile"],
    caseStudy: {
      state: "B",
      heading: "We Haven't Owned a Narrative Long Enough to Prove It",
      body: "No portfolio project we've delivered maps honestly to a PR or reputation-management engagement yet. Rather than stretch an unrelated project to fit, we'd rather talk through your specific reputation situation directly.",
      metrics: ["Response time to new reviews", "Sentiment trend over time", "Proactive coverage secured"],
      ctaLabel: "Talk to Us About Your Situation",
    },
    pricingDescription:
      "Building proactive coverage, running ongoing sentiment monitoring, and managing an active crisis sit at genuinely different urgency levels — we scope and price against which situation you're actually in, not a single retainer template stretched to cover all three.",
    pricingScopeFactors: [
      { title: "Proactive, monitoring, or crisis response", description: "Building coverage, ongoing sentiment monitoring, and active crisis response carry very different urgency and depth." },
      { title: "Urgency", description: "An active reputation issue is triaged and scoped differently from a standing intake." },
      { title: "Review and response volume", description: "The platforms and volume of reviews being actively managed shapes the ongoing workload." },
      { title: "Media relationship building", description: "Ongoing press outreach and relationship development add scope beyond a single pitch cycle." },
    ],
    faqItems: [
      {
        question: "We're dealing with a reputation issue right now — how fast can you start?",
        answer:
          "Tell us the situation directly and we'll be honest about what's realistic — active reputation issues need immediate triage, and we prioritize scoping calls for genuinely urgent situations rather than a standard intake queue.",
      },
      {
        question: "Can you get negative reviews removed?",
        answer:
          "We can't guarantee removal — platforms have their own policies, and legitimate reviews generally stay up regardless of how negative they are. What we can do is build a strong, consistent response pattern and a growing base of positive reviews that puts any individual negative one in fair context.",
      },
      {
        question: "Do you guarantee press coverage?",
        answer:
          "No, and we won't promise it — media coverage depends on genuine newsworthiness and an outlet's own editorial judgment, which we don't control. We commit to strong pitching and relevant angle development, not a guaranteed placement count.",
      },
      {
        question: "How is this different from social media management?",
        answer:
          "Social media management is about your own channels; PR/reputation management is about how you're discussed and reviewed across channels you don't own — press, review platforms, public conversation. They're related but distinct disciplines, and we scope accordingly.",
      },
      {
        question: "What does ongoing reputation monitoring actually catch?",
        answer:
          "New reviews across platforms, press or blog mentions, and significant shifts in social sentiment — flagged early enough that you can respond while it's still a small, manageable situation rather than a bigger one.",
      },
    ],
    relatedServiceSlugs: ["influencer-marketing", "content-marketing", "social-media-marketing", "branding"],
    relatedIndustries: ["Hospitality & Travel", "Healthcare", "Professional Services", "Food & Beverage", "Real Estate"],
    leadCapture: {
      variant: "A",
      headline: "Let's Talk About Your Reputation",
      successMessage: "Got it — we'll follow up with next steps. If this is urgent, please also call us directly.",
      secondaryCtaLabel: "Book a Strategy Call",
    },
  },

  "analytics-cro": {
    slug: "analytics-cro",
    name: "Analytics/CRO",
    metaDescription:
      "We build the measurement infrastructure first, then run structured conversion testing on top of it — so every design or copy change is validated by real visitor behavior, not internal opinion.",
    hero: {
      headline: "Decisions Made on Data, Not on Whoever Pitched Loudest in the Meeting",
      subhead:
        "We build the measurement infrastructure first, then run structured conversion testing on top of it — so every design or copy change is validated by real visitor behavior, not internal opinion.",
      heroImageAlt: "Conversion funnel and A/B test dashboard review",
      secondaryCtaLabel: "See Case Study",
    },
    problem: {
      title: "Most analytics are installed but not actually instrumented.",
      paragraphs: [
        "Most businesses have analytics installed but not actually instrumented — Google Analytics sitting on the site collecting pageviews while the events that actually matter (form submissions, add-to-carts, key button clicks) go untracked. Decisions get made on gut feeling or whoever argued most convincingly in the meeting, because there's no reliable data to settle the disagreement.",
        "The second failure is running \"tests\" that aren't really tests — a redesign shipped based on a hunch, with no control group and no way to know afterward whether it actually helped or just felt better to the team that built it.",
      ],
      quote:
        "An opinion about what will convert better is a hypothesis, not a decision — it only becomes a decision once it's been tested against real behavior.",
      closing:
        "We fix the measurement layer first, because a conversion test run on broken tracking just produces confident wrong answers.",
    },
    approachEyebrow: "Our Approach to Analytics/CRO",
    approachTitle: "Measurement fixed first, then tested against real behavior.",
    approachSteps: [
      {
        title: "Tracking Audit & Instrumentation",
        description:
          "We audit existing analytics setup, identify tracking gaps (events, goals, e-commerce tracking), and build proper instrumentation via Google Tag Manager so every meaningful visitor action is actually captured, not assumed.",
      },
      {
        title: "Behavioral Research",
        description:
          "We layer qualitative data — heatmaps, session recordings, on-site surveys — on top of quantitative analytics to understand not just where visitors drop off, but why, before proposing a fix based on assumption.",
      },
      {
        title: "Hypothesis-Driven Testing",
        description:
          "We prioritize test ideas by potential impact and confidence, then run structured A/B or multivariate tests with defined success metrics and statistical significance thresholds set before the test starts, not interpreted loosely after.",
      },
      {
        title: "Iteration & Reporting",
        description:
          "We report results honestly — including tests that don't produce a winner, which is still a useful finding — and roll validated wins into the site permanently, feeding what we learned into the next test hypothesis.",
      },
    ],
    deliverables: [
      "Analytics and tracking audit (GA4, Tag Manager, e-commerce tracking)",
      "Event and goal instrumentation setup",
      "Conversion funnel mapping and drop-off analysis",
      "Heatmap and session recording setup and review",
      "On-site survey/feedback tool setup where relevant",
      "Test hypothesis backlog, prioritized by impact and confidence",
      "A/B / multivariate test design and execution",
      "Statistical significance review per test",
      "Monthly reporting on test results and funnel performance",
      "Dashboard build for ongoing self-serve visibility",
    ],
    tools: ["Google Analytics 4", "Google Tag Manager", "Hotjar", "VWO", "Convert"],
    caseStudy: {
      state: "A",
      projectSlug: "wooden-handicraft-3d",
      heading: "Measurement Foundations for a Product-Led Store",
      body: "Wooden Handicraft 3D's product-showcase format depends on visitors engaging deeply with imagery before deciding to buy — exactly the kind of behavior that needs proper event tracking to understand, not just pageview counts. Our work established the analytics and tracking foundation this kind of product-discovery-driven store needs before any conversion testing program could run credibly on top of it.",
      ctaLabel: "See the Full Project",
    },
    pricingDescription:
      "Whether we're starting from broken instrumentation or a solid analytics foundation, and whether you need a one-off audit or a standing testing program, changes the job materially — we quote against where your tracking actually is, not where a template assumes it is.",
    pricingScopeFactors: [
      { title: "Current tracking maturity", description: "Starting from broken instrumentation is a different job than building on a solid analytics foundation." },
      { title: "Testing cadence", description: "A one-off audit and an ongoing testing program are scoped and priced differently." },
      { title: "Traffic volume", description: "Enough traffic to reach statistical significance changes whether formal split testing or qualitative research leads." },
      { title: "Qualitative research needs", description: "Heatmaps, session recordings, and on-site surveys add scope beyond the core analytics build." },
    ],
    faqItems: [
      {
        question: "We already have Google Analytics installed — isn't that enough?",
        answer:
          "Installed and instrumented are different things. GA4 by default captures pageviews, not the specific actions (form starts, add-to-carts, scroll depth on key pages) that actually tell you where the funnel breaks — that requires deliberate event setup, which most sites are missing.",
      },
      {
        question: "How long does an A/B test need to run?",
        answer:
          "Until it reaches statistical significance, which depends on your traffic volume and the size of the effect you're testing for — we set this threshold before the test starts so results aren't called early just because they look promising after two days.",
      },
      {
        question: "What if a test doesn't produce a clear winner?",
        answer:
          "That's still a useful result — it tells us the hypothesis wasn't the lever we thought it was, which redirects the next test toward a more promising area rather than continuing to iterate on something that isn't the actual bottleneck.",
      },
      {
        question: "Do you need a minimum amount of traffic to run CRO testing?",
        answer:
          "Yes, meaningfully — testing on very low traffic takes a long time to reach significance or risks false positives. For lower-traffic sites, we often start with qualitative research (heatmaps, session recordings) and direct, evidence-informed changes instead of formal split testing.",
      },
      {
        question: "Is this only for e-commerce sites, or does it apply to lead-gen sites too?",
        answer:
          "Applies to both — the specific events tracked differ (purchases vs. form submissions/demo requests), but the underlying discipline of instrumenting, hypothesizing, and testing is the same.",
      },
    ],
    relatedServiceSlugs: ["ecommerce-growth", "website-design", "google-ads", "ai-marketing"],
    relatedIndustries: ["E-commerce / D2C", "B2B / SaaS", "Real Estate", "Professional Services"],
    leadCapture: {
      variant: "A",
      headline: "Let's Scope Your Analytics/CRO Program",
      successMessage: "Got it — we'll follow up with next steps.",
      secondaryCtaLabel: "Book a Strategy Call",
    },
  },

  "ai-marketing": {
    slug: "ai-marketing",
    name: "AI Marketing",
    metaDescription:
      "We deploy AI where it genuinely compounds marketing output — segmentation, personalization, and workflow automation — without pretending a chatbot bolted onto your site counts as an AI strategy.",
    hero: {
      headline: "Automation That Scales Judgment, Not Just Tasks",
      subhead:
        "We deploy AI where it genuinely compounds marketing output — segmentation, personalization, and workflow automation — without pretending a chatbot bolted onto your site counts as an AI strategy.",
      heroImageAlt: "AI-assisted marketing workflow and automation review",
      secondaryCtaLabel: "How We'd Approach It",
    },
    problem: {
      title: "Most \"AI marketing\" is a single tool bolted onto an existing process.",
      paragraphs: [
        "Most \"AI marketing\" being sold right now is a single tool bolted onto an existing process — an AI writing assistant generating generic copy, or a chatbot answering questions worse than a well-built FAQ page — with no underlying strategy about where automation would actually create leverage versus where it just produces plausible-sounding noise faster.",
        "The deeper problem is treating AI as a replacement for marketing judgment instead of a multiplier on it. Personalization at scale, predictive segmentation, automated reporting synthesis — these genuinely save time and improve targeting when implemented against a clear strategy. Generating fifty AI blog posts nobody asked for does not.",
      ],
      quote:
        "AI doesn't replace the decision about what to say to whom — it lets you execute that decision at a scale a human team alone couldn't reach.",
      closing:
        "We identify where AI-driven automation actually compounds your existing marketing system, and implement it there — not everywhere it's technically possible.",
    },
    approachEyebrow: "Our Approach to AI Marketing",
    approachTitle: "Automation deployed where it compounds, not everywhere it's possible.",
    approachSteps: [
      {
        title: "Opportunity Audit",
        description:
          "We assess your current marketing stack and workflows to find where AI-driven automation would create genuine leverage — repetitive segmentation, personalization at a scale manual work can't reach, reporting synthesis — versus where it wouldn't meaningfully help.",
      },
      {
        title: "Tool & Workflow Design",
        description:
          "We select and configure the specific tools (predictive segmentation, dynamic content personalization, AI-assisted creative production, automated reporting) matched to the identified opportunity, integrated into your existing marketing stack rather than run as a disconnected side project.",
      },
      {
        title: "Implementation with Human Review",
        description:
          "We implement with a human-in-the-loop checkpoint on anything customer-facing — AI-assisted output gets reviewed against brand voice and accuracy before it ships, because AI output without review is exactly the \"guessed at scale\" problem we're trying to avoid.",
      },
      {
        title: "Measurement & Iteration",
        description:
          "We measure whether the automation is actually producing better outcomes (not just more output) and iterate the workflow — including recommending we stop using AI for a given task if the data shows it's not outperforming the manual process.",
      },
    ],
    deliverables: [
      "Marketing stack and workflow audit for AI-automation opportunities",
      "Tool selection and configuration recommendations",
      "Predictive segmentation / audience-scoring setup where applicable",
      "Dynamic content personalization setup where applicable",
      "AI-assisted creative production workflow (with human review checkpoint)",
      "Automated reporting/dashboard synthesis setup",
      "Chatbot/conversational AI implementation where genuinely warranted (scoped honestly, not defaulted to)",
      "Human-review process documentation for AI-assisted outputs",
      "Performance measurement framework (output quality, not just volume)",
      "Ongoing iteration recommendations",
    ],
    tools: ["HubSpot AI", "Klaviyo AI", "Jasper", "ChatGPT / Claude (API-integrated workflows)", "Zapier", "Make"],
    // AI Marketing deliberately breaks the standard state-A/state-B binary
    // per docs/remaining-services-copy.md §13 and the layout spec's own
    // flag on this service: not a forced/borrowed case study, not a plain
    // empty state either — an explainer that explicitly disclaims College
    // IQ (a client's AI *product*) from being mistaken for an Ayava
    // AI-*marketing* engagement. Modeled as state "B" (renders through the
    // same `CaseStudyEmptyState` shell used for genuinely-empty services)
    // since the shared component only supports A/B, but the heading/body
    // copy carries the explainer framing rather than a "nothing here yet"
    // apology — this is the smallest change that stays honest without
    // forking the shared component for one page.
    caseStudy: {
      state: "B",
      eyebrow: "How We'd Approach It",
      heading: "How We'd Approach This for You",
      body: "College IQ, one of our portfolio projects, is itself an AI-driven EdTech platform — but that's a client who builds AI product, not an Ayava AI-marketing engagement, and we won't blur the two just because both involve the word \"AI.\" We don't yet have a documented AI-marketing engagement of our own to spotlight honestly. If you're evaluating where AI-driven automation could genuinely help your marketing, talk to us — we'll tell you plainly where it would help and where it wouldn't.",
      metricsLead: "If we ran this for you, this is what we'd hold ourselves to:",
      metrics: [
        "Automation leverage identified vs. manual baseline",
        "Human-review checkpoint pass rate",
        "Outcome lift on the automated task, once measured",
      ],
      ctaLabel: "Talk to Us About Your Marketing Stack",
    },
    pricingDescription:
      "Which workflows are actually worth automating, how deeply they need to integrate with your existing stack, and whether this is a one-time build or an ongoing managed service — those determine the quote. We won't scope automation you don't need just to round out a package.",
    pricingScopeFactors: [
      { title: "Workflows being automated", description: "Automated reporting synthesis is a lighter job than a full personalization or segmentation build." },
      { title: "Integration complexity", description: "Connecting into an existing stack via native features or automation platforms changes the setup scope." },
      { title: "One-time setup or managed service", description: "A defined implementation project and an ongoing managed service are scoped differently." },
      { title: "Human-review scope", description: "The review checkpoint required for customer-facing output adds process, not just tooling." },
    ],
    faqItems: [
      {
        question: "Will AI replace our need for human marketers?",
        answer:
          "No — we position AI as a multiplier on judgment, not a replacement for it. Strategy, brand voice decisions, and creative direction stay human; AI handles the scale and repetition that would otherwise consume that human time.",
      },
      {
        question: "Isn't AI-generated content risky for brand voice and accuracy?",
        answer:
          "Yes, if it ships unreviewed — which is why every AI-assisted customer-facing output goes through a human review checkpoint in our process. We treat AI output as a draft accelerant, not a final product.",
      },
      {
        question: "What's a realistic first project if we're just starting with AI marketing?",
        answer:
          "Usually something with clear, measurable leverage and low brand risk — automated reporting synthesis or predictive segmentation tends to be a safer, higher-confidence starting point than customer-facing generative content.",
      },
      {
        question: "Can you integrate AI tools into our existing CRM/marketing stack, or does it require switching platforms?",
        answer:
          "In most cases we integrate into what you already use rather than requiring a platform switch — many modern marketing platforms (HubSpot, Klaviyo) have AI features built in, and additional tools can often connect via API or automation platforms like Zapier/Make.",
      },
      {
        question: "How do you measure if the AI automation is actually working?",
        answer:
          "Against the same outcome metrics the underlying task was already measured on — a personalization engine is judged on conversion lift, not on how sophisticated the model sounds. If it's not outperforming the manual baseline, we say so and adjust.",
      },
    ],
    relatedServiceSlugs: ["analytics-cro", "email-crm-marketing", "content-marketing", "app-store-marketing"],
    relatedIndustries: ["B2B / SaaS", "E-commerce / D2C", "Education", "Professional Services"],
    leadCapture: {
      variant: "A",
      headline: "Let's Scope Your AI Marketing Opportunity",
      successMessage: "Got it — we'll follow up with next steps.",
      secondaryCtaLabel: "Book a Strategy Call",
    },
  },

  "social-media-marketing": {
    slug: "social-media-marketing",
    name: "Social Media Marketing (SMM)",
    metaDescription:
      "We run social as a content system with a strategy underneath it — consistent posting cadence, platform-specific formats, and community management.",
    hero: {
      headline: "Turn Scrolling Into a Scheduled Habit Around Your Brand",
      subhead:
        "We run social as a content system with a strategy underneath it — consistent posting cadence, platform-specific formats, and community management — not a monthly content calendar assembled the week it's due.",
      heroImageAlt: "Social media content calendar and platform-native creative review",
      secondaryCtaLabel: "See Case Study",
    },
    problem: {
      title: "Being everywhere is why nowhere notices you.",
      paragraphs: [
        "Most brand social accounts post inconsistently, in a format that doesn't match how the platform's algorithm actually distributes content, with captions written for the brand's internal voice rather than the audience actually scrolling past. Engagement stalls, and the account gets treated as a broadcast channel — post and disappear — instead of a two-way conversation with the people already following.",
        "The second failure is chasing every platform equally instead of prioritizing where your actual audience spends attention. A brand with limited content production capacity spread thin across five platforms typically underperforms the same brand focused deliberately on the two platforms where its buyer actually is.",
      ],
      quote:
        "Consistency beats intensity on social — an account that posts reliably three times a week outperforms one that posts twelve times one week and disappears for the next three.",
      closing:
        "We build the content system and platform priority first, so posting is sustainable and strategic, not a scramble every Monday morning.",
    },
    approachEyebrow: "Our Approach to SMM",
    approachTitle: "Platform priority and a content system, before a single post.",
    approachSteps: [
      {
        title: "Audit & Platform Prioritization",
        description:
          "We audit existing account performance and audience behavior, then prioritize platforms based on where your actual buyer spends attention — not an attempt to be equally present everywhere with limited content resources.",
      },
      {
        title: "Content Strategy & Pillars",
        description:
          "We define content pillars (education, product, community, behind-the-scenes — whichever mix fits your brand) and a sustainable posting cadence, so content has a strategic reason to exist rather than filling a calendar slot.",
      },
      {
        title: "Production & Community Management",
        description:
          "We produce platform-native content (not the same asset cross-posted identically everywhere) and manage the two-way part of social — responding to comments and DMs in your brand voice, on a defined response-time standard.",
      },
      {
        title: "Performance Review & Iteration",
        description:
          "We review engagement, reach, and (where trackable) follower-to-conversion signal monthly, and adjust content pillars and format mix based on what's actually resonating, not what we assumed would resonate at kickoff.",
      },
    ],
    deliverables: [
      "Social account and competitor audit",
      "Platform prioritization strategy",
      "Content pillar definition and posting cadence plan",
      "Monthly content calendar",
      "Platform-native content production (feed, Stories/Reels, as relevant per platform)",
      "Caption copywriting per platform's voice conventions",
      "Community management (comments, DMs) within defined response standards",
      "Hashtag and discoverability strategy where platform-relevant",
      "Monthly engagement and reach reporting",
      "Content pillar/format iteration based on performance",
    ],
    tools: ["Meta Business Suite", "Later", "Buffer", "Canva", "Instagram Insights", "TikTok Analytics"],
    caseStudy: {
      state: "A",
      projectSlug: "aura-estates",
      heading: "A Visual-First Brand Built for a Visual-First Platform",
      body: "Aura Estates operates in a category — luxury real estate — where social platforms genuinely reward slow, high-quality visual storytelling over high-frequency posting. Our involvement centered on the brand's visual system and site presence, the foundation a social content strategy for this kind of brand needs to draw from consistently.",
      ctaLabel: "See the Full Project",
    },
    pricingDescription:
      "Platform count, production volume, and whether community management sits with us or stays in-house are the real cost drivers — we quote against the platforms you're actually prioritizing, not a flat per-platform fee.",
    pricingScopeFactors: [
      { title: "Number of platforms managed", description: "One or two well-run platforms is a different scope than a presence spread across five." },
      { title: "Production volume", description: "Posting cadence and format mix directly shape the production workload each month." },
      { title: "Community management included", description: "Handling comments and DMs within a defined response standard adds ongoing scope." },
      { title: "In-house vs. full-service", description: "Some teams handle publishing themselves and just need strategy; others need the full production loop." },
    ],
    faqItems: [
      {
        question: "How many platforms should we actually be on?",
        answer:
          "Fewer than most brands default to, usually — we recommend prioritizing one or two platforms your specific buyer actually uses well over spreading thin across five. We'll make this recommendation based on your audience, not a generic \"be everywhere\" default.",
      },
      {
        question: "Do you handle community management (replying to comments/DMs)?",
        answer:
          "Yes, scoped to a defined response-time standard and brand-voice guidelines — though for larger accounts with high volume, we'll be upfront about what's realistically included versus what would need a dedicated resource.",
      },
      {
        question: "How is this different from paid Meta Ads?",
        answer:
          "SMM is organic content and community strategy; Meta Ads is paid media targeting and testing. They reinforce each other — organic content often informs which creative concepts are worth testing with ad spend — but they're distinct disciplines with different goals and metrics.",
      },
      {
        question: "What if we don't have enough product/content to post consistently?",
        answer:
          "We'll flag this directly during the audit — a sustainable content strategy has to match your actual production capacity, and we'd rather recommend a lower, sustainable cadence than promise a volume that collapses after the first month.",
      },
      {
        question: "Do you use AI tools to generate content?",
        answer:
          "Selectively, for efficiency in specific parts of the workflow (caption drafting, ideation), always with human review before anything publishes — we don't run fully automated AI-generated content on client accounts without oversight.",
      },
    ],
    relatedServiceSlugs: ["meta-ads", "content-marketing", "influencer-marketing", "video-motion-production"],
    relatedIndustries: ["Fashion & Luxury", "Food & Beverage", "Hospitality & Travel", "E-commerce / D2C", "Real Estate"],
    leadCapture: {
      variant: "A",
      headline: "Let's Scope Your Social Media Program",
      successMessage: "Got it — we'll follow up with next steps.",
      secondaryCtaLabel: "Book a Strategy Call",
    },
  },
};

export function getServicePageContent(slug: string): ServicePageContent | undefined {
  return servicePageContent[slug];
}
