/**
 * Per-industry content for the `/industries/[slug]` template — copy is
 * verbatim from `docs/industries-page-copy.md`. Single source of truth for
 * the dynamic industry-page route; `lib/industries-data.ts` remains the
 * source of truth for slug/name/hook used by the Hub grid + homepage tease.
 */

export type NarrativeThemeData = {
  title: string;
  body: string;
};

export type CaseStudyStateA = {
  state: "A";
  title: string;
  body: string;
  href: string;
};

export type CaseStudyStateB = {
  state: "B";
  body: string;
  metrics: string[];
};

export type FAQItemData = {
  question: string;
  answer: string;
};

export type IndustryPageContent = {
  slug: string;
  heroHeadline: string;
  heroSubhead: string;
  narrativeThemes: [NarrativeThemeData, NarrativeThemeData, NarrativeThemeData];
  relevantServiceSlugs: string[];
  caseStudy: CaseStudyStateA | CaseStudyStateB;
  faqItems: FAQItemData[];
};

// The Work Hub + individual case study template (`/work/[slug]`) already
// exist (built in a parallel session — see `lib/case-studies-data.ts`), so
// State A spotlights deep-link directly to the matching project rather than
// the generic `/work` hub.

export const industryPageContent: Record<string, IndustryPageContent> = {
  "real-estate": {
    slug: "real-estate",
    heroHeadline: "A property is the largest purchase most buyers will ever make. Market it like one.",
    heroSubhead:
      "Real estate is a high-consideration, high-emotion sale that's decided long before a site visit — in renders, in virtual tours, in the thirty seconds a buyer spends deciding whether your listing looks trustworthy enough to click into. We build the digital presence that carries that weight.",
    narrativeThemes: [
      {
        title: "High-Consideration, Long-Cycle Decisions",
        body: "Nobody buys property on impulse. The buyer journey runs weeks or months, across multiple sessions, multiple family members, multiple comparisons against competing developments. A real-estate site has to perform across that entire arc — not just capture a first click, but hold a prospect's attention and answer their questions on visit four as well as visit one.",
      },
      {
        title: "Trust Before the Site Visit",
        body: "By the time a serious buyer books a physical walkthrough, they've already decided you're credible. That decision is made entirely online — through photography quality, copy that doesn't oversell, and a site that loads fast and looks built, not templated. We treat the pre-visit digital experience as the actual sales pitch, because it is.",
      },
      {
        title: "Visual-Heavy Decision-Making",
        body: "Renders, floor plans, virtual tours, and neighborhood context do the persuading that a salesperson would do in person. We architect real-estate sites around visual hierarchy first — the property is the product, and the design's job is to get out of its way while still making it load, scale, and convert.",
      },
    ],
    relevantServiceSlugs: ["website-design", "video-motion-production", "meta-ads", "seo"],
    caseStudy: {
      state: "A",
      title: "Aura Estates — Luxury Real Estate",
      body: "Aura Estates needed a digital presence that matched the caliber of the properties themselves — most real-estate sites undersell what they're selling. Ayava designed and built a landing-page experience centered on visual restraint and property-led storytelling, engineered to hold a high-intent buyer's attention through the full decision journey.",
      href: "/work/aura-estates",
    },
    faqItems: [
      {
        question:
          "How do you handle high-value property photography and video at scale, especially for multiple listings or a single flagship development?",
        answer:
          "We work from your existing photography/render assets where they exist, and coordinate directly with your visual team or vendors where they don't. The site architecture is built to accommodate galleries, virtual tours, and floor-plan overlays without slowing the page down — high-resolution visuals and fast load times aren't a trade-off we accept.",
      },
      {
        question: "Can you work with our existing CRM or lead-routing setup?",
        answer:
          "Yes. We design lead-capture forms and inquiry flows to integrate with the CRM you already run rather than forcing a new system on your sales team — the goal is qualified leads landing where your team already works, not a parallel tool nobody checks.",
      },
      {
        question: "We already have a site. Do we need a full rebuild, or can you work with what exists?",
        answer:
          "Depends what's underperforming. We start with an audit — page speed, conversion points, visual quality, mobile experience — before recommending a rebuild versus a targeted redesign. We don't sell rebuilds by default.",
      },
      {
        question: "How do you market a property before it's even built (pre-launch/under-construction)?",
        answer:
          "Pre-launch marketing leans harder on renders, narrative, and trust signals (developer credibility, project timeline transparency) since there's no finished product to photograph yet. We build the site and campaign to sell the vision credibly, without overpromising on delivery.",
      },
    ],
  },

  "d2c-ecommerce": {
    slug: "d2c-ecommerce",
    heroHeadline: "The first sale is the expensive one. The tenth is where the margin lives.",
    heroSubhead:
      "D2C economics reward brands that convert repeat buyers, not just first-time clicks. We build the storefront, funnel, and retention systems that turn one purchase into a habit — because acquisition cost only makes sense against lifetime value.",
    narrativeThemes: [
      {
        title: "Repeat-Purchase Economics Over One-Time Acquisition",
        body: "Most D2C brands over-invest in the first sale and under-invest in the fifth. We build acquisition and retention as one system — Meta Ads spend paired with the email/CRM flows and product experience that make a second purchase more likely than a first. Growth that only counts new customers is growth with a ceiling.",
      },
      {
        title: "Conversion-Rate Optimization as the Compounding Lever",
        body: "A 1-point lift in conversion rate compounds across every future campaign, every future channel, every future dollar spent on traffic. We treat CRO — checkout friction, product-page clarity, mobile speed — as infrastructure work, not a one-off audit, because the store is the asset every ad ever points to.",
      },
      {
        title: "Content-to-Commerce Attribution",
        body: "D2C buyers research before they buy — reviews, unboxing content, comparison posts. We build the content and influencer layer to be traceable back to revenue, not just engagement, so spend gets justified by sales, not vanity metrics.",
      },
    ],
    relevantServiceSlugs: [
      "ecommerce-growth",
      "meta-ads",
      "analytics-cro",
      "email-crm-marketing",
      "influencer-marketing",
    ],
    caseStudy: {
      state: "A",
      title: "Woodcraft Store Premium & Wooden Handicraft 3D — E-commerce",
      body: "Two craft-led e-commerce builds, same underlying discipline: sell handmade product at scale without losing the texture that makes it worth buying. Woodcraft Store Premium is a full storefront build; Wooden Handicraft 3D is a product-showcase experience engineered to make individually crafted pieces feel as premium online as they are in hand. Ayava built both around clean product architecture and a checkout flow that doesn't leak revenue between browse and buy.",
      href: "/work/woodcraft-store-premium",
    },
    faqItems: [
      {
        question: "We already run ads. Why isn't revenue scaling with ad spend?",
        answer:
          "Usually it's a funnel-leak problem, not an ad problem — checkout drop-off, slow load, unclear product pages. We audit the full path from click to purchase before recommending more spend, because pouring traffic into a leaky funnel just makes the leak bigger.",
      },
      {
        question: "How do you measure whether influencer or content marketing is actually driving sales?",
        answer:
          "We build attribution into the campaign from day one — unique discount codes, UTM-tagged links, post-purchase surveys — so spend on creators and content is judged against revenue, not follower counts or likes.",
      },
      {
        question: "We're on Shopify/WooCommerce/[platform]. Do you work within our existing stack?",
        answer:
          "Yes — we build and optimize within your current platform rather than migrating you unnecessarily. A platform switch is only recommended if it's genuinely limiting growth, not as a default agency upsell.",
      },
      {
        question: "Can you help with retention, or only acquisition/ads?",
        answer:
          "Both, and we treat them as one system. Email/CRM flows, post-purchase sequences, and loyalty mechanics are where repeat revenue actually gets built — acquisition gets someone in the door, retention is what makes that door-opening worth the cost.",
      },
    ],
  },

  healthcare: {
    slug: "healthcare",
    heroHeadline: "Patients don't book with the clinic that shouts loudest. They book with the one they trust first.",
    heroSubhead:
      "Healthcare marketing sits on a different foundation than most verticals — credibility has to be earned before a single word of persuasion works, and every claim has to survive scrutiny. We build the presence and campaigns that establish trust before the first appointment.",
    narrativeThemes: [
      {
        title: "Trust and Credibility Signals Before First Contact",
        body: "A prospective patient is evaluating risk, not just service — credentials, reviews, clarity of care information. We build sites and content that surface those trust signals prominently and honestly, because in healthcare, the \"sale\" is really a decision to trust someone with your health.",
      },
      {
        title: "Compliance-Aware Messaging, No Overclaiming",
        body: "We don't write outcome guarantees a clinic can't stand behind. Healthcare copy has to persuade within real constraints — no promised results, no exaggerated before/afters — and we treat that constraint as a discipline, not a limitation, because overclaiming erodes exactly the trust the whole category depends on.",
      },
      {
        title: "Local Search and Appointment-Conversion Focus",
        body: "Most healthcare decisions are hyper-local — \"near me,\" insurance-network, availability-driven. We prioritize local SEO, Google Business Profile optimization, and appointment-booking conversion paths over broad-reach brand campaigns, because that's where the actual patient search behavior lives.",
      },
    ],
    relevantServiceSlugs: ["seo", "website-design", "content-marketing", "pr-reputation-management"],
    caseStudy: {
      state: "B",
      body: "We haven't yet published a documented healthcare case study. Rather than stretch a project from an adjacent industry to fill this space, we'd rather tell you exactly what we'll report when a healthcare engagement lands: local-search visibility lift for the practice's core specialties, cost per qualified appointment booking, and patient-review volume and rating trend over the engagement period.",
      metrics: ["Local-search visibility", "Cost per qualified booking", "Review volume/rating trend"],
    },
    faqItems: [
      {
        question: "How do you keep messaging compliant while still being persuasive?",
        answer:
          "We write to what's provable and let the specificity of real care information do the persuading — clear service descriptions, physician credentials, patient-friendly explanations of procedures — rather than reaching for guaranteed-outcome language that a clinic legally and ethically shouldn't make.",
      },
      {
        question: "Do you have experience handling patient-adjacent data responsibly across ad platforms?",
        answer:
          "We follow strict data-handling practices for any patient-facing forms or ad targeting — no health-condition-based audience targeting that could expose sensitive inferences, and no collection of medical information through marketing touchpoints beyond what's needed to route an inquiry.",
      },
      {
        question: "Our reviews are mixed. Can marketing fix that?",
        answer:
          "Marketing can't fabricate trust that isn't earned operationally, but it can make sure your best, most representative reviews are visible where prospective patients actually look, and build a reputation-management process (via PR/Reputation Management) to respond to and improve review patterns over time.",
      },
      {
        question: "We're a multi-location practice. Can you handle location-specific local SEO?",
        answer:
          "Yes — multi-location healthcare SEO requires distinct, non-duplicated content and Google Business Profile management per location, which is exactly the kind of structured, unglamorous execution we build for.",
      },
    ],
  },

  "hospitality-travel": {
    slug: "hospitality-travel",
    heroHeadline: "Nobody books a room from a spec sheet. They book from a feeling.",
    heroSubhead:
      "Hospitality and travel are sold on imagery and imagined experience before a single amenity list gets read. We build the visual-first discovery layer and booking-conversion path that turn browsing into a confirmed reservation.",
    narrativeThemes: [
      {
        title: "Visual-First Discovery",
        body: "A traveler decides emotionally before they decide logistically — imagery of the room, the view, the experience drives intent long before dates and pricing get checked. We prioritize photography and video quality and placement as the primary conversion lever, not an afterthought bolted onto a booking widget.",
      },
      {
        title: "Seasonal, Demand-Driven Campaign Pacing",
        body: "Hospitality demand isn't flat — it spikes around seasons, holidays, and events, and campaigns that ignore that rhythm waste spend in the troughs and underinvest in the peaks. We build media plans that flex with actual demand curves, not a static monthly budget.",
      },
      {
        title: "Review and Reputation Signals as a Booking Trust Factor",
        body: "Before a traveler commits, they check reviews — often more than they check your own site. We treat reputation management and review visibility as part of the booking funnel itself, not a separate PR concern, because a bad review left unanswered can undo a well-run ad campaign.",
      },
    ],
    relevantServiceSlugs: ["meta-ads", "influencer-marketing", "video-motion-production", "seo"],
    caseStudy: {
      state: "B",
      body: "We haven't yet published a documented hospitality or travel case study. Rather than force a fit from an unrelated project, here's what we'll report when one lands: direct-booking conversion rate versus OTA-referred traffic, cost per confirmed booking, and seasonal campaign ROI across peak versus off-peak periods.",
      metrics: ["Direct-booking conversion rate", "Cost per confirmed booking", "Seasonal campaign ROI"],
    },
    faqItems: [
      {
        question: "We already list on Booking.com/Airbnb/OTAs. Why invest in our own marketing?",
        answer:
          "OTAs take a commission on every booking they source. Driving direct bookings — through your own site, SEO, and retargeting — protects margin on every reservation an OTA would otherwise have clipped. We're not suggesting you drop OTA listings, just that direct demand shouldn't be left entirely on the table.",
      },
      {
        question: "How do you handle seasonal demand swings in a media budget?",
        answer:
          "We build the annual plan around your actual booking calendar — heavier spend ahead of and during peak windows, retention/off-peak-offer campaigns in the troughs — rather than spreading budget evenly across a year that isn't evenly demanded.",
      },
      {
        question: "Can you help us respond to and improve our review profile?",
        answer:
          "Yes, through PR/Reputation Management — response protocols, review-solicitation timing after a positive stay, and visibility of your strongest reviews across the channels prospective guests actually check.",
      },
      {
        question: "Do you work with influencer/creator partnerships for travel content?",
        answer:
          "Yes — we vet creators for actual audience-travel-intent fit rather than raw follower count, and structure partnerships (stay-for-content, paid collaboration, or hybrid) around trackable outcomes like referral bookings, not just posted content.",
      },
    ],
  },

  fintech: {
    slug: "fintech",
    heroHeadline: "Explain the product simply enough to trust, precisely enough to survive scrutiny.",
    heroSubhead:
      "FinTech buyers are skeptical by default, and regulators are watching every claim. We build marketing that makes complex financial products understandable without oversimplifying them into something legally indefensible.",
    narrativeThemes: [
      {
        title: "Explaining Complexity Without Regulatory Risk",
        body: "Financial products are genuinely complicated, and the temptation to oversimplify for marketing's sake is exactly where FinTech messaging gets into trouble. We write to clarify mechanics honestly — fees, risk, terms — rather than smoothing them over, because a confused or misled prospect is a compliance liability, not a conversion.",
      },
      {
        title: "Building Trust in a Category with Inherent Skepticism",
        body: "Money is personal, and most people have a healthy default distrust of a new financial product. We lean on transparency, real credentials, and specific (not vague) claims to earn trust incrementally, rather than trying to shortcut it with hype-driven creative that a financially literate audience will see through immediately.",
      },
      {
        title: "Compliance-Reviewed Creative and Copy Workflows",
        body: "Financial advertising in India operates under real regulatory constraints. We build review checkpoints into the campaign workflow so creative and copy are vetted before launch, not after a complaint — treating compliance as a production step, not an afterthought.",
      },
    ],
    relevantServiceSlugs: ["content-marketing", "seo", "pr-reputation-management", "google-ads"],
    caseStudy: {
      state: "B",
      body: "We haven't yet published a documented FinTech case study, and we want to be precise about why: our portfolio includes FineTaxConsultancy, a tax and accounting consultancy website — real financial-services work, but tax/accounting, not a FinTech product. We're not going to relabel that project to manufacture a fit. Here's what we'll report when an actual FinTech engagement lands: qualified lead volume by product line, cost per compliant conversion, and organic visibility for core product-category search terms.",
      metrics: ["Qualified lead volume", "Cost per compliant conversion", "Organic visibility, core terms"],
    },
    faqItems: [
      {
        question: "How do you handle regulatory review of ad creative before launch?",
        answer:
          "We build a review step into the campaign timeline before anything goes live — working with your compliance/legal function (or ours, where you need the extra layer) so creative and copy are cleared before spend starts, not flagged after.",
      },
      {
        question: "Can you work within RBI or other financial-advertising guidelines?",
        answer:
          "We work within the specific regulatory framework that applies to your product category — the exact rules differ by product (lending, payments, investment platforms), and we confirm the applicable guidelines with you and your legal counsel at project start rather than assuming a one-size approach.",
      },
      {
        question: "Our product is genuinely complex. How do you market it without dumbing it down?",
        answer:
          "We don't simplify by removing accurate information — we simplify by sequencing it well, using structure (comparisons, clear tiers, plain-language explainers) so complexity is navigable rather than diluted.",
      },
      {
        question: "How do you build trust for a new/unfamiliar FinTech brand with no track record yet?",
        answer:
          "Early-stage trust-building leans on transparency (clear terms, visible security/compliance credentials), third-party validation where available (press, partnerships), and content that demonstrates expertise rather than just asserting it.",
      },
    ],
  },

  "fashion-luxury": {
    slug: "fashion-luxury",
    heroHeadline: "Performance-market the brand without discounting the brand.",
    heroSubhead:
      "Luxury and fashion marketing runs on a tension most agencies resolve by defaulting to discount-driven ads that quietly erode the premium they're supposed to protect. We hold that line — performance marketing disciplined enough to convert without cheapening the product.",
    narrativeThemes: [
      {
        title: "Brand-Equity Protection While Still Performance-Marketing",
        body: "Every discount code, every \"SALE\" creative, every aggressive retargeting sequence chips at the perception a luxury brand spent years building. We run performance campaigns that convert without leaning on the price-cutting tactics that work for commodity products but actively damage premium positioning.",
      },
      {
        title: "Price-Positioning Discipline",
        body: "Luxury buyers pay for scarcity and perceived value as much as the product itself. We're deliberate about when (and whether) promotional mechanics appear at all — full-price creative and scarcity-driven urgency, not blanket discounting, is usually the more defensible lever.",
      },
      {
        title: "Visual Craft as the Product",
        body: "In fashion and luxury, the creative isn't advertising the product — the creative quality IS part of the product experience. We treat photography, video, and art direction with the same rigor a luxury brand applies to its physical goods, because a cheap-looking ad undersells an expensive product regardless of targeting accuracy.",
      },
    ],
    relevantServiceSlugs: ["branding", "influencer-marketing", "meta-ads", "video-motion-production"],
    caseStudy: {
      state: "B",
      body: "We haven't yet published a documented fashion or luxury case study. Our craft-focused e-commerce work (Woodcraft Store Premium, Wooden Handicraft 3D) is adjacent in spirit — premium product presentation — but we're not going to force a handicraft e-commerce build into a fashion/luxury slot it wasn't built for. Here's what we'll report when a fashion or luxury engagement lands: full-price conversion rate (non-discounted traffic), average order value trend, and brand-search volume lift over the campaign period.",
      metrics: ["Full-price conversion rate", "Average order value trend", "Brand-search volume lift"],
    },
    faqItems: [
      {
        question: "How do you performance-market without discount-driven creative that hurts our brand positioning?",
        answer:
          "We lean on scarcity, exclusivity, and full-price storytelling (limited drops, editorial-quality creative, precise audience targeting) rather than percentage-off messaging — the goal is demand that doesn't require a discount to close.",
      },
      {
        question: "Can you protect our brand's visual identity across a performance-ad account run by an agency?",
        answer:
          "Yes — we build campaigns from established brand guidelines rather than defaulting to generic ad-template creative, and any new creative direction gets reviewed against brand standards before it runs at scale.",
      },
      {
        question: "Do you work with influencer partnerships that fit a luxury positioning, or only mass-market creators?",
        answer:
          "We select partners for audience-fit and aesthetic alignment with your brand tier, not just reach — a luxury brand paired with a mass-discount-code creator undermines positioning regardless of follower count.",
      },
      {
        question:
          "We're worried performance marketing will make us look like every other DTC brand chasing conversions. How do you avoid that?",
        answer:
          "By treating creative quality as non-negotiable and resisting the generic performance-marketing playbook (aggressive discount urgency, templated ad formats) that works for commodity products but reads as off-brand for luxury.",
      },
    ],
  },

  edtech: {
    slug: "edtech",
    heroHeadline: "Enrollment is the easy metric. Completion is the real one.",
    heroSubhead:
      "EdTech has three conversion events, not one — curiosity to enrollment, enrollment to activation, activation to completion — and marketing that only optimizes the first is optimizing the wrong funnel. We build for the whole arc.",
    narrativeThemes: [
      {
        title: "A Three-Stage Funnel, Not One",
        body: "Most EdTech marketing stops measuring at \"enrolled.\" We treat enrollment, activation (did they actually start), and completion as three distinct conversion events worth tracking and optimizing separately — because a platform full of enrolled-but-inactive users isn't actually growing, it's just spending.",
      },
      {
        title: "Dual-Audience Messaging Where It Applies",
        body: "Depending on the product, the buyer and the user aren't always the same person — a parent decides, a student uses; an institution procures, faculty and students adopt. We design messaging that speaks to both audiences distinctly rather than blending them into a message that satisfies neither.",
      },
      {
        title: "Outcome Claims Have to Be Substantiated",
        body: "Placement rates, skill outcomes, and results claims are the most persuasive lever in EdTech marketing — and the most scrutinized. We don't publish an outcome claim we can't back with a real, sourced number, because an EdTech brand's credibility is its entire product in a category built on trust in future results.",
      },
    ],
    relevantServiceSlugs: ["google-ads", "content-marketing", "seo", "email-crm-marketing"],
    caseStudy: {
      state: "A",
      title: "College IQ — AI-Driven EdTech Platform",
      body: "College IQ needed a product website that could explain a technically complex, AI-powered offering to students and institutions without diluting what made it genuinely different. Ayava architected the platform's marketing site around clarity-first UX — mapping the AI-powered learning journey into a structure a first-time visitor could understand in under a minute.",
      href: "/work/college-iq",
    },
    faqItems: [
      {
        question: "How do you measure success beyond enrollment — do you track completion or outcomes too?",
        answer:
          "Where the data is available, yes — we build funnels that track activation and completion, not just sign-up, and structure ongoing CRM/email campaigns around re-engaging learners who enroll but stall, since that's where most EdTech platforms actually lose value.",
      },
      {
        question: "Our audience includes both parents/institutions (payers) and students (users). How do you handle that in messaging?",
        answer:
          "We build distinct messaging tracks for each audience — decision-maker messaging (outcomes, credibility, ROI of the program) separate from user-facing messaging (experience, ease of use, peer relevance) — rather than one generic message trying to serve both.",
      },
      {
        question: "Can you help us market results/placement rates without overstating them?",
        answer:
          "We'll help you present real numbers as persuasively and clearly as possible, but we won't draft a claim you can't substantiate with a source — that's a compliance and trust risk in EdTech specifically, where outcome claims are heavily scrutinized by prospective students and parents.",
      },
      {
        question: "We're a new platform with no track record yet. How do you market that honestly?",
        answer:
          "Early-stage EdTech marketing leans on product clarity, founder/team credibility, and pilot-program or early-cohort results if any exist — we won't manufacture a completion-rate claim that doesn't exist yet, but we will make sure what IS true about your platform is communicated as clearly as possible.",
      },
    ],
  },

  "saas-tech": {
    slug: "saas-tech",
    heroHeadline: "Your buyer already researched you before your sales team ever spoke to them.",
    heroSubhead:
      "B2B SaaS buyers self-serve their way through most of the decision before a demo call happens — reading docs, comparing competitors, checking reviews. We build the content, SEO, and site architecture that wins the research phase, so sales inherits a warm, informed lead instead of a cold one.",
    narrativeThemes: [
      {
        title: "Research-Heavy, Self-Serve-Informed Buyers",
        body: "By the time a B2B buyer books a call, they've usually read your docs, compared you to two competitors, and checked reviews on a third-party site. We build the top-of-funnel content and site experience to win that self-directed research phase, because a lead who arrives already informed converts faster and churns less.",
      },
      {
        title: "Longer, Multi-Stakeholder Sales Cycles",
        body: "SaaS deals rarely close on one decision-maker's say-so — there's a champion, a budget-holder, sometimes a technical evaluator, each needing different proof. We architect messaging and content to serve multiple stakeholder types across a longer cycle, not a single-CTA landing page built for a one-call close.",
      },
      {
        title: "Use-Case-Led Positioning Over Feature Lists",
        body: "Operators buy software to solve a specific operational problem, not to acquire a feature list. We position platform capabilities against the real problems buyers search for and describe in their own language, rather than leading with a spec sheet.",
      },
    ],
    relevantServiceSlugs: ["seo", "content-marketing", "google-ads", "email-crm-marketing", "ai-marketing"],
    caseStudy: {
      state: "A",
      title: "NextepSolution & Nextep Ventures — B2B Platforms",
      body: "NextepSolution is a CRM platform built to sell software to operators, not consumers — a different trust bar entirely. Ayava built the platform's web architecture around use-case-led navigation, positioning its capabilities against the operational problems its buyers actually search for. Nextep Ventures, a B2B marketplace and auction platform, required a parallel but distinct approach: architecture built for two-sided marketplace dynamics — buyers and sellers, each needing their own clear path in.",
      href: "/work/nextepsolution",
    },
    faqItems: [
      {
        question: "How do you shorten a multi-stakeholder B2B sales cycle?",
        answer:
          "We build content and site structure that pre-answers the questions each stakeholder type (champion, budget-holder, technical evaluator) typically raises, so your sales team spends fewer calls re-explaining basics and more time on the decisions that actually need a human.",
      },
      {
        question: "Do you work with product-led-growth motions, or only sales-led?",
        answer:
          "Both — the right marketing motion depends on your product's actual adoption model. PLG needs conversion-optimized self-serve onboarding and in-product marketing touchpoints; sales-led needs stronger top-of-funnel content and lead qualification. We build to whichever motion your product actually runs on, not a default template.",
      },
      {
        question: "Our category is technical. How do you market it without oversimplifying?",
        answer:
          "We write from real understanding of the operational problem your software solves, not generic SaaS marketing copy — our own portfolio includes building CRM and marketplace platforms directly, so the positioning comes from product understanding, not just messaging templates.",
      },
      {
        question: "How do you measure SaaS marketing performance beyond top-of-funnel traffic?",
        answer:
          "We track it against the metrics that actually matter for SaaS economics — qualified pipeline generated, cost per qualified lead, and (where visibility exists) downstream conversion to trial/demo — not just impressions or site visits.",
      },
    ],
  },

  automotive: {
    slug: "automotive",
    heroHeadline: "The sale starts on a research tab. It still has to close on the showroom floor.",
    heroSubhead:
      "Automotive buyers do most of their decision-making online — specs, comparisons, reviews — before ever stepping into a dealership. We build the digital research experience that gets them there already decided.",
    narrativeThemes: [
      {
        title: "Research-Tab-to-Showroom Journey",
        body: "Automotive purchases are heavily researched online but still typically close offline — a dealership visit, a test drive, a finance conversation. We design the digital journey to move a buyer through comparison and consideration efficiently, so the eventual showroom visit is a confirmation step, not the start of the sales process.",
      },
      {
        title: "Local-Inventory and Dealer-Tie-In Considerations",
        body: "Unlike a pure e-commerce sale, automotive marketing usually has to connect back to specific local inventory and dealer relationships. We build campaigns and site structure that account for that — location-aware content, inventory-linked messaging — rather than treating it as a generic national brand campaign.",
      },
      {
        title: "Visual and Spec-Heavy Comparison Content",
        body: "Buyers cross-shop on specs, trims, and visuals before they ever ask a salesperson a question. We build comparison-ready content (specs, imagery, feature breakdowns) that competes directly in that research phase, rather than assuming persuasion only happens in person.",
      },
    ],
    relevantServiceSlugs: ["seo", "video-motion-production", "meta-ads", "google-ads"],
    caseStudy: {
      state: "B",
      body: "We haven't yet published a documented automotive case study. Here's what we'll report when one lands: cost per qualified test-drive or dealership-visit lead, organic visibility for model and comparison search terms, and video engagement/completion rates on spec and walkthrough content.",
      metrics: ["Cost per qualified visit lead", "Organic visibility, model terms", "Video engagement/completion rate"],
    },
    faqItems: [
      {
        question: "Can you integrate with our dealer or local-inventory feed?",
        answer:
          "We build campaigns and site structure to work with the inventory-feed and dealer-locator systems you already have rather than requiring a separate parallel setup — confirm your current tooling with us at project start and we'll scope integration accordingly.",
      },
      {
        question: "Most of our sales happen in person. How does digital marketing actually move that needle?",
        answer:
          "Digital is where the pre-visit decision gets made — a buyer who arrives already comparing your specific model against two competitors is a fundamentally easier close than cold showroom foot traffic. We measure success partly on qualified lead volume feeding that in-person process, not on online transactions alone.",
      },
      {
        question: "How do you handle marketing across multiple locations/dealerships?",
        answer:
          "Similar to multi-location healthcare or hospitality — distinct, locally-relevant content and local-search optimization per location, tied back to a consistent brand-level campaign strategy.",
      },
      {
        question: "Can you produce the kind of spec/walkthrough video content buyers actually compare us on?",
        answer:
          "Yes — video and motion production for spec breakdowns, feature walkthroughs, and comparison content is one of our core service lines, built specifically for the comparison-heavy research phase automotive buyers go through.",
      },
    ],
  },

  "fnb-qsr": {
    slug: "fnb-qsr",
    heroHeadline: "The decision to order takes ten seconds. The campaign has to be ready for all of them.",
    heroSubhead:
      "Food and quick-service marketing runs on short decision cycles, hyper-local relevance, and delivery-app integration — a different pace and geography than almost any other vertical. We build for that speed.",
    narrativeThemes: [
      {
        title: "Short Decision Cycles, High-Frequency Repeat Intent",
        body: "Nobody spends three weeks deciding where to order lunch. F&B marketing has to be fast, visually appetite-driving, and built for repeat purchase frequency — a customer who orders weekly is worth building a retention system around, not just a one-time acquisition funnel.",
      },
      {
        title: "Hyper-Local, Geo-Targeted Campaign Pacing",
        body: "A QSR brand's actual competition is whatever's within delivery radius or walking distance, not a national category. We build campaigns geo-targeted to real catchment areas per outlet, and pace spend around local demand patterns (mealtimes, weekday/weekend swings) rather than running one flat national campaign.",
      },
      {
        title: "App-Order and Delivery-Platform Integration",
        body: "A meaningful share of F&B revenue now flows through delivery platforms, not direct channels. We treat delivery-app visibility and promotion as a real conversion channel to manage deliberately, alongside — not separate from — direct ordering and in-store campaigns.",
      },
    ],
    relevantServiceSlugs: ["meta-ads", "influencer-marketing", "app-store-marketing", "seo"],
    caseStudy: {
      state: "B",
      body: "We haven't yet published a documented F&B or QSR case study. Here's what we'll report when one lands: cost per order across direct and delivery-platform channels, repeat-order rate within a defined period, and local-search visibility lift per outlet.",
      metrics: ["Cost per order (direct vs. delivery)", "Repeat-order rate", "Local-search visibility per outlet"],
    },
    faqItems: [
      {
        question: "Can you run hyper-local, geo-targeted campaigns per outlet rather than one blanket citywide campaign?",
        answer:
          "Yes — outlet-level geo-targeting based on actual delivery/walk-in radius is standard for how we'd structure a multi-location F&B campaign, since a single national or citywide campaign wastes spend outside each location's real catchment.",
      },
      {
        question: "Do you integrate with delivery-platform promotion tools (Swiggy/Zomato-equivalent)?",
        answer:
          "We coordinate campaign strategy around delivery-platform visibility and promotions alongside your direct-channel marketing, so the two reinforce rather than compete for the same customer's attention.",
      },
      {
        question: "Our margins are thin. How do you keep customer acquisition cost sustainable?",
        answer:
          "We prioritize retention and repeat-order mechanics (loyalty, retargeting existing customers, geo-targeted efficiency) precisely because thin-margin F&B economics can't sustain high one-time acquisition costs — repeat customers are the actual profit driver in this category.",
      },
      {
        question: "Can you help with influencer/food-content marketing specifically?",
        answer:
          "Yes — food and QSR content performs differently than most categories (visual appetite appeal, short-form video, local food creators), and we select and brief creators specifically for that format rather than treating it as generic influencer marketing.",
      },
    ],
  },
};

export function getIndustryPageContent(slug: string): IndustryPageContent | undefined {
  return industryPageContent[slug];
}
