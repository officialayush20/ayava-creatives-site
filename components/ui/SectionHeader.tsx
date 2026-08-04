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
          className="font-display text-[clamp(28px,4vw,44px)] font-normal leading-[1.05]"
        >
          {title}
        </h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
