import type { FAQItemData } from "@/components/ui/FAQAccordion";

/**
 * Extracted from components/sections/pricing/PricingFAQ.tsx into a plain
 * (non-"use client") module — same fix as lib/contact-faq-items.ts, see
 * that file's comment for why. A Server Component importing a plain data
 * constant from a "use client" file can fail to prerender in production
 * builds (observed as "TypeError: a.map is not a function").
 */
export const pricingFaqItems: FAQItemData[] = [
  {
    question: "Why don't you list fixed prices?",
    answer:
      "Because a fixed price assumes every account needs the same thing. We scope each engagement to your actual channels, budget, and goals first, then quote — see How We Price above for the full reasoning.",
  },
  {
    question: "Can I start with a smaller project before committing to a retainer?",
    answer:
      "Yes. Project-based work is a common way to start — it lets us both see how the engagement runs before either of us commits to something ongoing.",
  },
  {
    question: "What happens if my needs change mid-engagement?",
    answer:
      "Scope gets revisited, not locked in place. If your goals or budget shift, the plan is rescoped with you rather than run on autopilot against a brief that no longer fits.",
  },
];
