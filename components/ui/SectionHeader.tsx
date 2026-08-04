import { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  headingId: string;
  align?: "left" | "center";
  action?: ReactNode;
  tone?: "on-ink" | "on-ivory";
  className?: string;
};

/**
 * Eyebrow + H2 + optional right-aligned action link.
 * `headingId` is required so the parent <section> can point
 * aria-labelledby at this heading per the a11y baseline.
 */
export function SectionHeader({
  eyebrow,
  title,
  headingId,
  align = "left",
  action,
  tone = "on-ink",
  className = "",
}: SectionHeaderProps) {
  const eyebrowColor = tone === "on-ink" ? "text-slate" : "text-slate-deep";
  // Explicit heading color per tone — the h2 has no ancestor color class,
  // so without this it silently inherits body's `color: var(--color-ivory)`
  // and renders invisible ivory-on-ivory on every tone="on-ivory" section.
  const headingColor = tone === "on-ivory" ? "text-ink" : "text-ivory";

  return (
    <div
      className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${
        align === "center" ? "text-center md:text-left" : ""
      } ${className}`}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p
            className={`mb-3 font-sans text-xs font-medium uppercase tracking-[0.18em] ${eyebrowColor}`}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className={`font-display text-[length:var(--type-display-section)] font-normal leading-[1.05] ${headingColor}`}
        >
          {title}
        </h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
