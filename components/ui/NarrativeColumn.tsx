import { ReactNode } from "react";

type NarrativeColumnProps = {
  children: ReactNode;
  tone?: "on-ink" | "on-ivory";
  className?: string;
};

/**
 * Plain typographic prose wrapper — long-form paragraphs with generous
 * spacing, no complex layout of its own. Introduced for About's founder
 * narrative (about-page-layout-spec.md §2) and reused for Careers' culture
 * paragraphs (careers-page-layout-spec.md §2) per that spec's explicit
 * reuse note.
 */
export function NarrativeColumn({ children, tone = "on-ivory", className = "" }: NarrativeColumnProps) {
  const textColor = tone === "on-ink" ? "text-content/90" : "text-inverse-content/80";

  return (
    <div
      className={`flex max-w-[65ch] flex-col gap-6 font-sans text-base leading-relaxed md:text-lg ${textColor} ${className}`}
    >
      {children}
    </div>
  );
}
