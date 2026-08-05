export type NarrativeStage = {
  label: string; // e.g. "01 — The Challenge"
  heading: string;
  paragraphs: string[];
};

export type CaseStudy = {
  id: string;
  slug: string;
  name: string;
  descriptor: string;
  industry: string;
  servicesUsed: string[];
  /** "TBC" per case-studies-copy.md — never invent a figure. */
  duration: string;
  region: string;
  /** Featured/hero card summary used on /work grid + card copy. */
  cardSummary: string;
  narrative: {
    challenge: NarrativeStage;
    strategy: NarrativeStage;
    execution: NarrativeStage;
    results: NarrativeStage;
  };
  /** Whether >=4 real, rights-cleared gallery assets exist. None do yet. */
  hasGallery: boolean;
  /** Live, verified project URL — "Visit Live Site" link. */
  liveUrl: string;
  /** Real screenshot of the live site, hosted on the founder's own portfolio site. */
  screenshotUrl: string;
  /** Descriptive alt text for the screenshot. */
  screenshotAlt: string;
};

/**
 * Single source of truth for all 8 real portfolio projects — snapshot bar
 * fields, full narrative copy (verbatim from docs/case-studies-copy.md),
 * and card summaries (verbatim from docs/work-hub-copy.md). Both the Work
 * Hub (/work — filter taxonomy + grid) and individual case study pages
 * (/work/[slug] — generateStaticParams + full render) import from here so
 * the two never drift out of sync.
 *
 * Duration/Region are marked "TBC" per the copy doc's explicit instruction
 * not to invent figures. Region is drafted as "Dehradun, India" per the
 * founder's known base, flagged in the copy doc for per-client confirmation.
 *
 * Order below is the Next-Case-Study cycle order fixed in the copy doc:
 * Aura Estates -> College IQ -> NextepSolution -> Nextep Ventures ->
 * Dreamzcraft -> FineTaxConsultancy -> Woodcraft Store Premium ->
 * Wooden Handicraft 3D -> cycles back to Aura Estates.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "aura-estates",
    slug: "aura-estates",
    name: "Aura Estates",
    descriptor: "Luxury real-estate landing-page experience",
    industry: "Real Estate",
    servicesUsed: ["Website Design", "Video & Motion Production", "SEO"],
    duration: "TBC",
    region: "Dehradun, India",
    cardSummary:
      "A landing-page experience built around visual restraint and property-led storytelling for a luxury real-estate developer.",
    narrative: {
      challenge: {
        label: "01 — The Challenge",
        heading: "The Challenge",
        paragraphs: [
          "Luxury real estate is sold on perception before it's sold on square footage. Aura Estates had properties that could stand against any high-end development, but a digital presence that didn't yet communicate that caliber — most real-estate marketing sites default to dense listing grids and generic templates, which flatten exactly the sense of exclusivity a luxury buyer is paying for.",
          "The brief wasn't \"build a website.\" It was \"make the site feel as considered as the property.\"",
        ],
      },
      strategy: {
        label: "02 — The Strategy",
        heading: "The Strategy",
        paragraphs: [
          "We started from restraint, not addition. Luxury buyers don't need more information competing for attention — they need fewer, better-chosen visual and narrative beats that let the property carry the page.",
          "The strategy centered the experience on property-led storytelling: renders, spatial context, and lifestyle framing sequenced to mirror how a serious buyer actually evaluates a home, from first impression through to the practical details that close a decision.",
        ],
      },
      execution: {
        label: "03 — The Execution",
        heading: "The Execution",
        paragraphs: [
          "We designed and built a landing-page experience where visual hierarchy does the selling — large-format imagery given room to breathe, copy trimmed to what earns its place next to the visuals, and a page structure engineered to hold a high-intent buyer's attention through a full decision journey rather than losing them after the hero section.",
          "Every design decision was tested against one question: does this make the property feel more valuable, or just more decorated?",
        ],
      },
      results: {
        label: "04 — Results",
        heading: "Results",
        paragraphs: [
          "Aura Estates now has a digital presence built to match the tier of property it represents — a landing page engineered around trust-building and visual restraint, ready to carry a high-consideration buyer from first click through to inquiry.",
        ],
      },
    },
    hasGallery: false,
    liveUrl: "https://ayushsainisample1.netlify.app",
    screenshotUrl:
      "https://ayushsainiportfolio.netlify.app/projects/screenshots/aura-estates.webp",
    screenshotAlt: "Aura Estates luxury real-estate landing page screenshot",
  },
  {
    id: "college-iq",
    slug: "college-iq",
    name: "College IQ",
    descriptor: "AI-driven EdTech platform marketing site",
    industry: "Education",
    servicesUsed: ["Website Design", "Content Marketing", "SEO"],
    duration: "TBC",
    region: "Dehradun, India",
    cardSummary:
      "Clarity-first marketing site for an AI-driven EdTech platform, mapping a complex product into a first-minute-understandable journey.",
    narrative: {
      challenge: {
        label: "01 — The Challenge",
        heading: "The Challenge",
        paragraphs: [
          "College IQ's core product is genuinely technical — an AI-driven learning platform with real underlying complexity. The challenge wasn't explaining a simple product simply; it was explaining a complex one without diluting what made it different, to two distinct audiences (students and institutions) who needed to understand the value proposition fast, without a background in the underlying technology.",
        ],
      },
      strategy: {
        label: "02 — The Strategy",
        heading: "The Strategy",
        paragraphs: [
          "We built the site's architecture around clarity-first UX — treating the AI-powered learning journey as something to be mapped and sequenced for a first-time visitor, not summarized in marketing jargon.",
          "The strategy prioritized structure over volume: fewer, clearer explanatory steps rather than a feature-dense page that would require a visitor to already understand the product to appreciate it.",
        ],
      },
      execution: {
        label: "03 — The Execution",
        heading: "The Execution",
        paragraphs: [
          "We designed navigation and page flow around the actual learner and institutional decision journey — what a first-time visitor needs to understand in the first minute versus what a returning, more-informed visitor needs to dig into.",
          "Content was structured so a non-technical parent or student and a more scrutinizing institutional evaluator could both find their own path through the same site without either audience feeling underserved.",
        ],
      },
      results: {
        label: "04 — Results",
        heading: "Results",
        paragraphs: [
          "College IQ's marketing site now translates a technically sophisticated AI-driven platform into a structure a first-time visitor can understand in under a minute — built to serve both the curiosity-stage visitor and the more deliberate institutional evaluator.",
        ],
      },
    },
    hasGallery: false,
    liveUrl: "https://collegeiqapp.netlify.app",
    screenshotUrl:
      "https://ayushsainiportfolio.netlify.app/projects/screenshots/college-iq.webp",
    screenshotAlt: "College IQ AI-driven EdTech platform marketing site screenshot",
  },
  {
    id: "nextepsolution",
    slug: "nextepsolution",
    name: "NextepSolution",
    descriptor: "B2B CRM platform web architecture",
    industry: "Tech / SaaS",
    servicesUsed: ["Website Design", "SEO", "Content Marketing"],
    duration: "TBC",
    region: "Dehradun, India",
    cardSummary: "Web architecture and use-case-led navigation for a B2B CRM platform.",
    narrative: {
      challenge: {
        label: "01 — The Challenge",
        heading: "The Challenge",
        paragraphs: [
          "NextepSolution is a CRM platform selling to operators, not consumers — a fundamentally different trust bar than a typical software marketing site. B2B buyers evaluating a CRM aren't persuaded by consumer-style ad copy; they're persuaded by evidence that the platform understands their actual operational workflow.",
          "A generic SaaS-template site would have undersold a genuinely operational product.",
        ],
      },
      strategy: {
        label: "02 — The Strategy",
        heading: "The Strategy",
        paragraphs: [
          "We built the site's architecture around use-case-led navigation rather than a flat feature list — positioning NextepSolution's capabilities directly against the operational problems its buyers search for and describe in their own language.",
          "The goal was a site that reads as built by people who understand CRM operations, because it was.",
        ],
      },
      execution: {
        label: "03 — The Execution",
        heading: "The Execution",
        paragraphs: [
          "Navigation, page structure, and content hierarchy were built around real buyer use cases rather than a generic \"Features / Pricing / About\" template. Each core capability was framed against the specific operational problem it solves, so a visiting operator could self-identify their situation quickly rather than reverse-engineering relevance from a feature list.",
        ],
      },
      results: {
        label: "04 — Results",
        heading: "Results",
        paragraphs: [
          "NextepSolution's web architecture now speaks directly to the operators evaluating it — positioned around real operational problems rather than a generic software feature list, built to shorten the gap between first visit and qualified interest.",
        ],
      },
    },
    hasGallery: false,
    liveUrl: "https://nextepsolution.com",
    screenshotUrl:
      "https://ayushsainiportfolio.netlify.app/projects/screenshots/nextepsolution.webp",
    screenshotAlt: "NextepSolution B2B CRM platform website screenshot",
  },
  {
    id: "nextep-ventures",
    slug: "nextep-ventures",
    name: "Nextep Ventures",
    descriptor: "B2B marketplace and auction platform",
    industry: "Tech / SaaS",
    servicesUsed: ["Website Design", "Branding"],
    duration: "TBC",
    region: "Dehradun, India",
    cardSummary: "Platform build for a two-sided B2B marketplace and auction system.",
    narrative: {
      challenge: {
        label: "01 — The Challenge",
        heading: "The Challenge",
        paragraphs: [
          "Nextep Ventures needed a platform built for a two-sided marketplace and auction model — a structurally different problem from a single-audience B2B site like a CRM. Buyers and sellers need distinct, equally clear paths into the same platform, and an auction mechanic adds a layer of real-time trust and clarity requirements that a standard marketplace doesn't carry.",
        ],
      },
      strategy: {
        label: "02 — The Strategy",
        heading: "The Strategy",
        paragraphs: [
          "We approached the build as two parallel user journeys sharing one platform, not one journey with a secondary audience bolted on. Buyer-side and seller-side navigation, messaging, and onboarding were architected separately from the start, with the auction mechanic itself treated as a core trust-and-clarity design problem.",
        ],
      },
      execution: {
        label: "03 — The Execution",
        heading: "The Execution",
        paragraphs: [
          "We built the platform's architecture to keep both sides of the marketplace legible at every step — clear seller-side listing and auction-setup flows, clear buyer-side discovery and bidding flows, without either audience's needs compromising the other's experience.",
          "Branding work reinforced credibility across both sides, since a marketplace's trust signal has to hold for buyers and sellers simultaneously.",
        ],
      },
      results: {
        label: "04 — Results",
        heading: "Results",
        paragraphs: [
          "Nextep Ventures now runs on a platform architecture built specifically for its two-sided marketplace and auction dynamics — distinct, clear paths for buyers and sellers rather than a single generic marketplace template stretched to fit both.",
        ],
      },
    },
    hasGallery: false,
    liveUrl: "https://nextepventures.com",
    screenshotUrl:
      "https://ayushsainiportfolio.netlify.app/projects/screenshots/nextep-ventures.webp",
    screenshotAlt: "Nextep Ventures B2B marketplace and auction platform screenshot",
  },
  {
    id: "dreamzcraft",
    slug: "dreamzcraft",
    name: "Dreamzcraft",
    descriptor: "Website architecture build",
    industry: "Web Architecture",
    servicesUsed: ["Website Design"],
    duration: "TBC",
    region: "Dehradun, India",
    cardSummary: "Site-architecture build focused on structural clarity and scalable page design.",
    narrative: {
      challenge: {
        label: "01 — The Challenge",
        heading: "The Challenge",
        paragraphs: [
          "Dreamzcraft's brief was foundational rather than campaign-specific: build a website architecture that could hold up structurally — clean information hierarchy, scalable page templates, and a build that wouldn't need to be re-architected the moment the business's content needs grew.",
          "It's the less glamorous half of web work, and the half that determines whether everything built on top of it holds up.",
        ],
      },
      strategy: {
        label: "02 — The Strategy",
        heading: "The Strategy",
        paragraphs: [
          "We prioritized structural clarity over decorative complexity. Rather than front-loading visual flourishes, the strategy focused on getting the underlying architecture — navigation logic, page templates, content structure — right first, on the reasoning that a well-architected site ages better and scales more easily than a visually elaborate one built on a shaky structural foundation.",
        ],
      },
      execution: {
        label: "03 — The Execution",
        heading: "The Execution",
        paragraphs: [
          "We built the site's page architecture and navigation system to be genuinely scalable — templated in a way that new content and pages could be added without requiring a structural rebuild each time.",
          "Design decisions were made in service of that scalability, keeping the system consistent and legible rather than optimizing for a single flashy first impression at the expense of everything built after it.",
        ],
      },
      results: {
        label: "04 — Results",
        heading: "Results",
        paragraphs: [
          "Dreamzcraft now has a website architecture built for structural longevity — a foundation designed to scale with the business's content needs rather than requiring a rebuild at the next stage of growth.",
        ],
      },
    },
    hasGallery: false,
    liveUrl: "https://dreamzcraft.com",
    screenshotUrl:
      "https://ayushsainiportfolio.netlify.app/projects/screenshots/dreamzcraft.webp",
    screenshotAlt: "Dreamzcraft website architecture homepage screenshot",
  },
  {
    id: "finetaxconsultancy",
    slug: "finetaxconsultancy",
    name: "FineTaxConsultancy",
    descriptor: "Tax and accounting consultancy website",
    industry: "Finance / Consulting",
    servicesUsed: ["Website Design", "SEO"],
    duration: "TBC",
    region: "Dehradun, India",
    cardSummary:
      "Website build for a tax and accounting consultancy, positioned for client trust and service clarity.",
    narrative: {
      challenge: {
        label: "01 — The Challenge",
        heading: "The Challenge",
        paragraphs: [
          "A tax consultancy sells expertise and trustworthiness before it sells any specific service — a prospective client is evaluating \"can I trust this firm with my finances\" as much as \"does this firm do what I need.\" FineTaxConsultancy needed a site that established that credibility clearly, without the generic, dated feel that a lot of consultancy sites default to.",
        ],
      },
      strategy: {
        label: "02 — The Strategy",
        heading: "The Strategy",
        paragraphs: [
          "We treated clarity and credibility as the two design priorities, in that order. The strategy focused on making services, expertise areas, and the firm's actual value proposition immediately legible — a prospective client shouldn't have to dig to understand what the firm does and why they should trust them.",
        ],
      },
      execution: {
        label: "03 — The Execution",
        heading: "The Execution",
        paragraphs: [
          "We built the site around clear service-area structure and straightforward, jargon-light explanations of what the consultancy offers — the kind of plain, confident copy that reads as competence rather than trying to sound impressive.",
          "Design choices favored a clean, professional register appropriate to the category, avoiding both the generic-corporate-template look and any tone that would feel unserious for a financial-services context.",
        ],
      },
      results: {
        label: "04 — Results",
        heading: "Results",
        paragraphs: [
          "FineTaxConsultancy now has a website built to establish credibility clearly and quickly — service areas and expertise communicated in language a prospective client can evaluate and trust without friction.",
        ],
      },
    },
    hasGallery: false,
    liveUrl: "https://finetaxconsultancy.com",
    screenshotUrl:
      "https://ayushsainiportfolio.netlify.app/projects/screenshots/finetaxconsultancy.webp",
    screenshotAlt: "FineTaxConsultancy tax and accounting consultancy website screenshot",
  },
  {
    id: "woodcraft-store-premium",
    slug: "woodcraft-store-premium",
    name: "Woodcraft Store Premium",
    descriptor: "E-commerce storefront for handcrafted wood products",
    industry: "E-Commerce",
    servicesUsed: ["E-commerce Growth", "Website Design", "Analytics/CRO"],
    duration: "TBC",
    region: "Dehradun, India",
    cardSummary:
      "Full storefront build for a handcrafted-wood product line, from catalog structure to checkout.",
    narrative: {
      challenge: {
        label: "01 — The Challenge",
        heading: "The Challenge",
        paragraphs: [
          "Handcrafted wood products carry a story that's easy to lose in a generic e-commerce template — mass-market storefront patterns built for volume products tend to flatten the texture and craft that make a handmade product worth its price.",
          "Woodcraft Store Premium needed a full storefront that could scale sales operationally while still presenting each product as genuinely crafted, not mass-produced.",
        ],
      },
      strategy: {
        label: "02 — The Strategy",
        heading: "The Strategy",
        paragraphs: [
          "We built the store around clean product-catalog architecture that could scale without losing product-level craft storytelling — categorization and navigation designed for browsability, paired with product pages structured to give each item room to communicate its material, process, and craftsmanship.",
        ],
      },
      execution: {
        label: "03 — The Execution",
        heading: "The Execution",
        paragraphs: [
          "We built the storefront end-to-end — catalog structure, product-page templates, and a checkout flow specifically audited for friction points, since every step of drop-off between browse and purchase is revenue the store never fully captures.",
          "Design decisions balanced operational scalability against the product storytelling that differentiates handcrafted goods from commodity e-commerce.",
        ],
      },
      results: {
        label: "04 — Results",
        heading: "Results",
        paragraphs: [
          "Woodcraft Store Premium now runs on a storefront built for both scale and craft-forward storytelling — a catalog structure and checkout flow engineered to convert without flattening what makes the product distinct.",
        ],
      },
    },
    hasGallery: false,
    liveUrl: "https://woodcrafts-store.netlify.app",
    screenshotUrl:
      "https://ayushsainiportfolio.netlify.app/projects/screenshots/woodcraft-store.webp",
    screenshotAlt: "Woodcraft Store Premium e-commerce storefront screenshot",
  },
  {
    id: "wooden-handicraft-3d",
    slug: "wooden-handicraft-3d",
    name: "Wooden Handicraft 3D",
    descriptor: "Product-showcase e-commerce experience",
    industry: "Craft / Handmade",
    servicesUsed: ["E-commerce Growth", "Website Design"],
    duration: "TBC",
    region: "Dehradun, India",
    cardSummary:
      "Product-showcase e-commerce experience engineered to present individually crafted pieces at a premium standard online.",
    narrative: {
      challenge: {
        label: "01 — The Challenge",
        heading: "The Challenge",
        paragraphs: [
          "Individually crafted wooden handicraft pieces are sold in person on texture, weight, and detail — qualities a flat product photo struggles to convey. The challenge was making each piece feel as premium and tangible online as it is in hand, without the product looking flattened into a generic e-commerce thumbnail grid.",
        ],
      },
      strategy: {
        label: "02 — The Strategy",
        heading: "The Strategy",
        paragraphs: [
          "We centered the strategy on product presentation as the primary conversion driver — treating each handicraft piece's product page as a showcase, not just a catalog entry. The goal was to give shoppers enough visual and descriptive detail to trust the craftsmanship and materials without ever having held the piece.",
        ],
      },
      execution: {
        label: "03 — The Execution",
        heading: "The Execution",
        paragraphs: [
          "We built a product-showcase experience engineered around detailed imagery, clear material and process information, and a browsing structure that lets shoppers move between related pieces easily.",
          "The emphasis throughout was making individually crafted, non-mass-produced goods feel appropriately premium in a digital format that usually favors standardized, mass-market product presentation.",
        ],
      },
      results: {
        label: "04 — Results",
        heading: "Results",
        paragraphs: [
          "Wooden Handicraft 3D now presents individually crafted pieces with the level of product-page detail and care that matches how they're actually sold in person — a showcase experience built to earn trust in craftsmanship shoppers can't physically handle before buying.",
        ],
      },
    },
    hasGallery: false,
    liveUrl: "https://wooden-handicraft-site.netlify.app",
    screenshotUrl:
      "https://ayushsainiportfolio.netlify.app/projects/screenshots/wooden-handicraft.webp",
    screenshotAlt: "Wooden Handicraft 3D product-showcase e-commerce screenshot",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** Next-in-cycle case study, wrapping from the last back to the first. */
export function getNextCaseStudy(currentSlug: string): CaseStudy {
  const index = caseStudies.findIndex((study) => study.slug === currentSlug);
  const nextIndex = index === -1 ? 0 : (index + 1) % caseStudies.length;
  return caseStudies[nextIndex];
}

/** Distinct industries actually represented across the 8 projects, in first-appearance order. */
export const industryFilters = Array.from(new Set(caseStudies.map((s) => s.industry)));

/** Distinct services actually used across the 8 projects, in first-appearance order. */
export const serviceFilters = Array.from(
  new Set(caseStudies.flatMap((s) => s.servicesUsed)),
);

/** Editorially-assigned flagship project — Aura Estates, per work-hub-layout-spec.md §3
 * and consistent with the homepage's own flagship pick. */
export const featuredSlug = "aura-estates";
