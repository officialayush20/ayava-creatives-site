export type RichContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] };

export type Article = {
  slug: string;
  title: string;
  category: string;
  status: "coming-soon" | "published";
  /** Stub only — the "Ref: ..." line from InsightsPreview. */
  angle?: string;
  /** Stub only — 1-2 sentence teaser, not a fabricated excerpt. */
  teaser?: string;
  /** Stub only — 2-3 talking points the piece will cover, per copy doc §1.4. */
  talkingPoints?: string[];
  /** Published only. */
  excerpt?: string;
  readTime?: string;
  publishDate?: string;
  author?: "Ayush Saini";
  coverImage?: string;
  body?: RichContentBlock[];
  relatedSlugs?: string[];
};

/**
 * Single source of truth for Insights content — mirrors lib/case-studies-data.ts
 * shape. The 3 seed entries are the real "coming soon" titles already live on
 * the homepage (components/sections/InsightsPreview.tsx), reused verbatim per
 * insights-page-layout-spec.md §0 and insights-page-copy.md. Zero published
 * articles exist yet — every entry below is status: "coming-soon" until real
 * long-form copy is written.
 */
export const articles: Article[] = [
  {
    slug: "crm-platform-website",
    title: "What a CRM Platform's Website Needs That a Landing Page Doesn't",
    category: "Strategy & Platforms",
    status: "published",
    excerpt:
      "A CRM platform isn't selling a single conversion moment — it's selling trust to a buyer who will live inside the product for years. Here's what changes in site structure, proof, and pacing when the thing you're selling is a system, not a product.",
    readTime: "8 min read",
    publishDate: "2026-08-05",
    author: "Ayush Saini",
    body: [
      {
        type: "paragraph",
        text: "Most software marketing sites are built on a landing-page skeleton, even when the product underneath them isn't a landing-page product. One hero, one value proposition, one CTA, a scroll of logos and features, done. That skeleton works when the buying decision is genuinely simple — a single user, a single moment of intent, a card swipe away from resolution. It breaks down almost immediately once the product in question is a CRM.",
      },
      {
        type: "paragraph",
        text: "We ran into this directly while building the site for NextepSolution, a B2B CRM platform. The instinct going in might have been to treat it like any other SaaS launch: punchy headline, feature grid, pricing table, sign-up button. What became clear early on is that a CRM buyer isn't making a landing-page decision. They're making an infrastructure decision — one that will shape how their sales team works for years, that multiple stakeholders will weigh in on, and that carries real switching costs if it goes wrong. A site built for a five-second decision undersells a five-month one.",
      },
      {
        type: "h2",
        text: "The buyer isn't buying a feature. They're buying a future workflow.",
      },
      {
        type: "paragraph",
        text: "When someone evaluates a CRM, they're not asking \"does this look nice.\" They're asking a much more specific, much more skeptical set of questions: will this actually fit how my team already sells? Will it break when we scale from 10 reps to 100? Will my ops lead be able to configure it without filing a support ticket every week? Will the data migrate cleanly, or will I be re-entering three years of pipeline history by hand?",
      },
      {
        type: "paragraph",
        text: "None of those questions get answered by a feature list. They get answered by evidence that the platform understands the operational reality it's stepping into — which means the site's job isn't to describe features, it's to demonstrate operational fluency.",
      },
      {
        type: "blockquote",
        text: "A landing page sells a moment. A platform site has to sell a future — and a future can't be sold in one scroll.",
      },
      {
        type: "h2",
        text: "Why the single-CTA, single-scroll model breaks down",
      },
      {
        type: "paragraph",
        text: "The classic landing-page convention — one primary action, minimal branching, funnel the visitor toward a single button — assumes one decision-maker making one decision in one sitting. A CRM sale rarely works that way.",
      },
      {
        type: "h3",
        text: "Multiple stakeholders, multiple entry questions",
      },
      {
        type: "paragraph",
        text: "A CRM purchase usually involves a sales leader evaluating pipeline visibility, an ops or RevOps person evaluating configurability and integrations, sometimes IT evaluating security and data handling, and a finance stakeholder evaluating total cost against the incumbent tool. Each of them lands on the site with a different question already in mind, and a single generic hero message can't answer all four simultaneously without answering none of them well.",
      },
      {
        type: "h3",
        text: "The decision isn't made in one sitting",
      },
      {
        type: "paragraph",
        text: "Enterprise and mid-market software decisions get revisited across multiple sessions — someone finds the site, reads a page, closes the tab, comes back a week later with a colleague, digs into a different section entirely. A site architected for a single linear scroll has no good answer for a visitor on their third visit who already knows the basics and now wants integration depth or security specifics.",
      },
      {
        type: "h2",
        text: "What changes structurally: use-case-led navigation over a feature list",
      },
      {
        type: "paragraph",
        text: "The structural fix isn't more content — it's different architecture. Instead of a flat \"Features / Pricing / About\" template, a platform site needs to be organized around the operational problems its buyers actually search for and describe in their own language: pipeline visibility for a sales manager, territory and quota management for RevOps, integration with the tools already in the stack for IT, reporting cadence for the leadership team that has to present numbers upward.",
      },
      {
        type: "paragraph",
        text: "That reframing matters more than it sounds. A feature list asks the visitor to do the translation work themselves — to read \"custom pipeline stages\" and mentally connect it to their own broken sales process. Use-case-led navigation does that translation for them. It says, in effect: here is the problem you have, and here is exactly how this platform solves it. That's a much shorter cognitive distance between \"I have a problem\" and \"this understands my problem.\"",
      },
      {
        type: "list",
        items: [
          "Structure primary navigation around buyer problems, not internal product-team feature names",
          "Give each core capability its own page framed against the operational scenario it resolves, not just a spec sheet",
          "Let a visiting operator self-identify their situation quickly, instead of forcing them to reverse-engineer relevance from a list",
        ],
      },
      {
        type: "h2",
        text: "Proof has to look operational, not decorative",
      },
      {
        type: "paragraph",
        text: "On a consumer landing page, a star rating or a logo wall does most of the trust-building work. For a CRM buyer, that kind of decorative proof reads as marketing noise rather than evidence. What actually builds trust is proof that looks operational: specifics about how the platform handles data migration, what the actual onboarding timeline looks like, how permissions and roles are structured, what happens when a team scales past its current headcount.",
      },
      {
        type: "paragraph",
        text: "This is one of the clearest lessons from working on a genuinely operational CRM product rather than a lightweight tool: the site has to read as if it was built by people who understand CRM operations, because the credibility bar for this category is set by operational fluency, not visual polish. Polish still matters — but it's table stakes, not the differentiator.",
      },
      {
        type: "h2",
        text: "Pacing: build toward depth, don't front-load everything",
      },
      {
        type: "paragraph",
        text: "A landing page is paced for urgency — get the value proposition across fast, before the visitor bounces. A platform site has to be paced for depth without losing the visitor who does want the fast version. The practical resolution is layering: a fast, legible first-minute overview for the curiosity-stage visitor, with clear paths deeper into the site for the visitor who's already three sessions in and evaluating seriously. Nobody should have to read the entire site to get the headline answer, and nobody who wants the depth should hit a wall after the first section.",
      },
      {
        type: "h2",
        text: "The takeaway",
      },
      {
        type: "paragraph",
        text: "The mistake isn't building a bad landing page for a CRM. It's building a landing page at all when what the product actually needs is a small piece of software-shaped infrastructure — architected around real buyer use cases, paced for a multi-session, multi-stakeholder decision, and proven with operational specifics instead of decorative trust signals. Get that structural decision right first, and the copy, design, and CTAs that sit on top of it have something real to work with.",
      },
    ],
    relatedSlugs: ["ai-edtech-non-technical-buyers"],
  },
  {
    slug: "luxury-real-estate-landing-pages",
    title: "Selling Luxury Real Estate Online Without Looking Like Every Other Listing Site",
    category: "Industry Playbooks",
    status: "published",
    excerpt:
      "Most real estate sites default to the same template: grid of listings, search filter, contact form. Here's what it actually takes to make a luxury property feel like a luxury property online — pacing, imagery discipline, and the restraint that signals price point before a single number does.",
    readTime: "7 min read",
    publishDate: "2026-08-05",
    author: "Ayush Saini",
    body: [
      {
        type: "paragraph",
        text: "Open ten real estate websites in a row and count how many of them look meaningfully different from each other. A grid of thumbnail listings. A search bar with filters for bedrooms and price range. A contact form beneath the fold. It's a template built for volume — for helping someone compare forty options quickly — and it's the single worst structure you could put a luxury property inside.",
      },
      {
        type: "paragraph",
        text: "This became the central problem to solve while building the site for Aura Estates, a luxury real-estate developer. The properties themselves could stand against any high-end development. The site, as briefed, needed to communicate that caliber before a visitor ever picked up the phone or filled out an inquiry form — and the standard listing-site template was actively working against that goal.",
      },
      {
        type: "h2",
        text: "The listing-grid template optimizes for the wrong thing",
      },
      {
        type: "paragraph",
        text: "A grid of comparable listings is a tool for filtering. It treats every property as one interchangeable row in a dataset, distinguished mainly by price and square footage. That's exactly the right tool when someone is choosing between forty mid-market apartments in the same neighborhood. It's exactly the wrong tool when the property is the kind of asset that's meant to feel singular, considered, and worth a premium that a spreadsheet comparison can't fully capture.",
      },
      {
        type: "paragraph",
        text: "Put a luxury property inside a comparison-shopping interface and you've already told the visitor how to evaluate it: as one option among many, filtered on the same axes as everything else. That framing works directly against the price point.",
      },
      {
        type: "blockquote",
        text: "A luxury buyer isn't comparison-shopping a spreadsheet. Design the page like it's a comparison tool, and you've already undersold the property.",
      },
      {
        type: "h2",
        text: "Restraint is the signal, not the absence of a signal",
      },
      {
        type: "paragraph",
        text: "The instinct when building a premium product's site is often to add — more copy explaining the amenities, more badges, more stats about square footage and finishes. For a luxury audience, that instinct usually backfires. Buyers at this price point are used to environments where quality is implied by what's been left out: the empty space in a well-designed showroom, the single well-chosen object instead of a shelf of them.",
      },
      {
        type: "paragraph",
        text: "Restraint on a property page works the same way. Large-format imagery given genuine room to breathe, copy trimmed to only what earns its place next to the visuals, and a deliberate absence of the clutter that usually fills real-estate pages — pop-ups, banner stacks, comparison widgets — all signal price point before a single number appears on the page. The white space isn't empty. It's doing persuasive work.",
      },
      {
        type: "h2",
        text: "Pacing the page like a property viewing, not a search result",
      },
      {
        type: "paragraph",
        text: "One of the more useful reframes in this kind of build is to stop thinking about the site as a search results page and start thinking about it as a guided viewing. A serious buyer touring a physical property doesn't start with the floor plan and the price sheet — they start with the arrival, the first impression of the space, the way light moves through a room, and only later get into the practical details that actually close the decision.",
      },
      {
        type: "list",
        items: [
          "Open on atmosphere and spatial context — renders and imagery that establish the feeling of the place before any specifications",
          "Move into lifestyle framing — how the property is actually lived in, not just how it's laid out",
          "Close with the practical decision-making details — specifications, location context, and a clear, low-friction way to inquire",
        ],
      },
      {
        type: "h3",
        text: "Why sequence matters more than content here",
      },
      {
        type: "paragraph",
        text: "Nearly all of the information a real-estate site needs to contain is standard: images, specs, location, contact path. What differentiates a luxury experience isn't unique information, it's the order and pacing in which that information is revealed. Front-load the spec sheet and the whole page reads like a database entry. Sequence it to mirror how a genuine buyer evaluates a home in person, and the same information reads as considered.",
      },
      {
        type: "h2",
        text: "Imagery discipline over imagery volume",
      },
      {
        type: "paragraph",
        text: "It's tempting to treat more photos as automatically more persuasive — show every angle, every room, every fixture. In practice, an undisciplined gallery does the opposite of what's intended: it reads as an inventory, not a story. A tighter, more deliberately sequenced set of images, each one earning its place and given enough room on the page to actually be looked at rather than thumbnail-scrolled past, does more to establish quality than an exhaustive photo dump ever will.",
      },
      {
        type: "h2",
        text: "The test we used",
      },
      {
        type: "paragraph",
        text: "Every design decision on the Aura Estates build was tested against one question: does this make the property feel more valuable, or does it just make the page feel more decorated? Those aren't the same thing, and it's an easy line to cross without noticing — an added flourish, an extra badge, an animated transition that draws attention to itself instead of to the property. The decisions that passed the test were almost always the ones that removed something rather than added it.",
      },
      {
        type: "h2",
        text: "The takeaway",
      },
      {
        type: "paragraph",
        text: "Selling luxury property online isn't a copywriting problem or a photography problem in isolation — it's a pacing and restraint problem. The moment a high-value property gets dropped into a search-and-filter template built for volume, the price point starts working against itself. Build the page instead like a guided viewing, let visual hierarchy do the selling, and trim relentlessly toward whatever actually earns its place next to the property. Everything else is decoration competing with the thing you're actually trying to sell.",
      },
    ],
    relatedSlugs: ["crm-platform-website"],
  },
  {
    slug: "ai-edtech-non-technical-buyers",
    title: "Explaining AI-Powered EdTech to Non-Technical Buyers",
    category: "Industry Playbooks",
    status: "published",
    excerpt:
      "The buyer for an EdTech platform is rarely the person who understands the AI underneath it. Here's how to explain a technical product to a non-technical decision-maker without either dumbing it down or losing them in jargon.",
    readTime: "7 min read",
    publishDate: "2026-08-05",
    author: "Ayush Saini",
    body: [
      {
        type: "paragraph",
        text: "There's a specific trap that AI-driven products fall into on their own marketing sites: they explain the product to the people who already understand it. Architecture diagrams, model names, technical differentiators — all genuinely interesting to another engineer, and almost entirely useless to the person actually evaluating whether to buy. This mismatch is especially costly in EdTech, where the person making the purchasing decision is very often not the person who understands, or needs to understand, the technology underneath.",
      },
      {
        type: "paragraph",
        text: "That gap was the central problem while building the marketing site for College IQ, an AI-driven learning platform. The product itself is genuinely technical — there's real underlying complexity in how it adapts to a learner. The challenge wasn't explaining a simple product simply. It was explaining a complex one to two very different audiences, students and institutions, without diluting what actually made it different, and without requiring either audience to understand the technology to appreciate the outcome.",
      },
      {
        type: "h2",
        text: "The buyer and the user are rarely the same person",
      },
      {
        type: "paragraph",
        text: "In consumer software, the person who signs up is usually the person who uses the product, which means the marketing site can speak to one persona end to end. EdTech breaks that assumption almost by default. A parent or an institutional buyer is often making the purchasing decision on behalf of a student who will actually use the product day to day — and increasingly, an institutional evaluation committee is making a decision on behalf of an entire cohort of students and teachers they've never individually consulted.",
      },
      {
        type: "paragraph",
        text: "That means a single explanation of the product has to satisfy at least two evaluation criteria at once: does this actually help a learner (the outcome a parent or teacher cares about), and does this operate reliably and credibly at scale (the outcome an institutional buyer cares about). Neither of those questions is answered by describing the AI itself.",
      },
      {
        type: "blockquote",
        text: "Nobody buys an algorithm. They buy the outcome the algorithm produces — and the moment you explain the algorithm instead of the outcome, you've lost a non-technical buyer.",
      },
      {
        type: "h2",
        text: "Explain the AI in outcome terms, not architecture terms",
      },
      {
        type: "paragraph",
        text: "A common instinct with a genuinely sophisticated AI product is to want credit for the sophistication — to explain the model, the personalization engine, the technical mechanism that makes it work. That instinct is understandable and, for a non-technical buyer, almost entirely beside the point. What they're actually evaluating is a much simpler question: does this get a specific kind of student to a specific kind of result, reliably, and how would I know if it's working?",
      },
      {
        type: "h3",
        text: "Translate mechanism into behavior",
      },
      {
        type: "paragraph",
        text: "Instead of describing what the AI does technically, describe what a learner using the product actually experiences and does differently as a result. \"The system identifies knowledge gaps and adjusts difficulty in real time\" is more useful to a non-technical evaluator than any description of the model behind it — because it's stated as a behavior they can picture and evaluate against their own understanding of how their students or child actually learn.",
      },
      {
        type: "h3",
        text: "Give evaluators something to check, not just something to believe",
      },
      {
        type: "paragraph",
        text: "Non-technical buyers, especially institutional ones, are naturally skeptical of AI claims they can't independently verify. The more useful move is to give them a way to check the claim against something they already understand and trust — established learning outcomes, standard curriculum benchmarks, or a clear description of what data informs the system's decisions — rather than asking them to simply take the technology's sophistication on faith.",
      },
      {
        type: "h2",
        text: "Two audiences, one site: structure over volume",
      },
      {
        type: "paragraph",
        text: "The tempting fix for a two-audience problem is to write more content — a students' section and a separate institutions' section, each exhaustively covering every possible question. In practice, volume isn't the answer; structure is. The more effective approach is prioritizing a small number of clear explanatory steps that map to how each audience actually makes their decision, rather than a feature-dense page that assumes the visitor already understands the product well enough to appreciate the features being listed.",
      },
      {
        type: "list",
        items: [
          "Map navigation and page flow to the actual decision journey — what a first-time visitor needs in the first minute, versus what a more informed, returning visitor needs to dig into",
          "Let a non-technical parent or student find a plain-language path through the product without ever being routed through technical detail they didn't ask for",
          "Give the more scrutinizing institutional evaluator a clear, deeper path to the specifics they need — reliability, data handling, outcomes — without cluttering the first-time experience for everyone else",
        ],
      },
      {
        type: "h2",
        text: "Don't dumb it down — translate it",
      },
      {
        type: "paragraph",
        text: "There's a real risk on the opposite end of this problem: oversimplifying to the point that a genuinely differentiated, technically sophisticated product reads as generic. \"Personalized learning, powered by AI\" is a sentence that could describe almost any EdTech product on the market, technically accurate or not. The goal isn't to strip out what makes the product different — it's to translate what makes it different into language a non-technical buyer can actually evaluate and trust, without losing the substance underneath.",
      },
      {
        type: "h2",
        text: "The takeaway",
      },
      {
        type: "paragraph",
        text: "Explaining an AI-powered product to a non-technical buyer isn't a simplification exercise — it's a translation exercise. The buyer doesn't need to understand the mechanism; they need to trust the outcome and be able to evaluate it against criteria they already understand. Structure the site around the real decision journeys of the people actually making the call, describe behavior instead of architecture, and give evaluators something verifiable to check the claims against. Get that translation right, and the sophistication of the underlying product becomes an asset instead of a barrier.",
      },
    ],
    relatedSlugs: ["luxury-real-estate-landing-pages"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/** Distinct categories represented across all articles, in first-appearance order. */
export const categoryFilters = Array.from(new Set(articles.map((a) => a.category)));

/** Published-only subset — currently empty; drives the "Related Articles" /
 * "Browse Published Insights" gating logic per the copy doc's explicit rule
 * that neither should render until >=1 (or >=2) published pieces exist. */
export const publishedArticles = articles.filter((a) => a.status === "published");
