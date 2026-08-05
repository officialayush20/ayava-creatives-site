import { ProblemStatement } from "@/components/sections/ProblemStatement";

/**
 * Core philosophy narrative (pricing-page-layout-spec.md §2) — reuses the
 * ProblemStatement pattern introduced on the About page.
 */
export function HowWePrice() {
  return (
    <ProblemStatement
      headingId="how-we-price-heading"
      statement="A fixed package is a guess about your account before we've looked at it."
      tone="on-ink"
    >
      <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-hairline-strong md:text-lg">
        <p>
          Fixed pricing tiers work when every customer needs roughly the same thing. Marketing
          doesn&apos;t work that way. A single-location business running one paid channel and a
          five-market e-commerce brand running six don&apos;t belong on the same price sheet — put
          them there anyway and one of them overpays for capacity they don&apos;t use, while the
          other gets a scope too thin to move the number that matters.
        </p>
        <p>
          So we price by scope, not by tier. Before we name a figure, we look at which services
          the work actually needs, how much campaign volume has to be supported, and whether the
          engagement is a defined project or an ongoing channel to manage. The quote comes out of
          that scoping conversation — it isn&apos;t selected off a menu.
        </p>
        <p>
          This takes slightly longer than handing over a rate card. It also means the number you
          get is the number your account actually needs, not the number that happened to be
          printed on a tier closest to your budget.
        </p>
      </div>
    </ProblemStatement>
  );
}
