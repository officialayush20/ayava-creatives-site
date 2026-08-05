import { ReactNode } from "react";

export type HairlineRowItem = {
  title: string;
  description: ReactNode;
  /** Optional short illustrative example line, rendered below the
   * description in a quieter weight — used by Pricing's Engagement Models
   * section (layout spec §4) for longer-form rows. */
  example?: ReactNode;
};

type HairlineRowListProps = {
  items: HairlineRowItem[];
  tone?: "on-ink" | "on-ivory";
  numbered?: boolean;
  className?: string;
};

/**
 * Shared full-width hairline-row list — the pattern used by the homepage's
 * WhyAyava differentiators, and reused (per about-page-layout-spec.md §5/§6
 * and pricing-page-layout-spec.md §3/§4) instead of any card-grid shape.
 * Deliberately the only list treatment allowed on the Pricing page per its
 * binding "no card grid" constraint.
 */
export function HairlineRowList({
  items,
  tone = "on-ink",
  numbered = true,
  className = "",
}: HairlineRowListProps) {
  const borderColor = "border-hairline";
  const titleColor = tone === "on-ink" ? "text-content" : "text-inverse-content";
  const descColor = tone === "on-ink" ? "text-hairline-strong" : "text-hairline";
  const exampleColor = tone === "on-ink" ? "text-hairline-strong/80" : "text-hairline/80";
  const numColor = tone === "on-ink" ? "text-hairline-strong" : "text-hairline";

  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li
          key={item.title}
          data-reveal-item
          className={`flex items-start gap-4 py-8 md:py-10 ${
            index === 0 ? `border-t ${borderColor}` : ""
          } border-b ${borderColor}`}
        >
          {numbered ? (
            <span className={`font-display text-xl shrink-0 ${numColor}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
          <div>
            <h3 className={`font-display text-lg font-normal md:text-xl ${titleColor}`}>
              {item.title}
            </h3>
            <div className={`mt-2 font-sans text-sm leading-relaxed ${descColor}`}>
              {item.description}
            </div>
            {item.example ? (
              <p className={`mt-2 font-sans text-sm italic ${exampleColor}`}>{item.example}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
