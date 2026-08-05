import { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  tone?: "on-ink" | "on-ivory";
  className?: string;
};

/** Small pill label used for industry tags, category labels, etc. */
export function Tag({ children, tone = "on-ivory", className = "" }: TagProps) {
  // `tone` prop names kept for call-site stability; internally resolved
  // through semantic role tokens. See docs/light-gradient-theme-spec.md §6.
  const toneClasses =
    tone === "on-ivory"
      ? "border-hairline/30 text-hairline bg-transparent"
      : "border-hairline-strong/40 text-hairline-strong bg-transparent";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-sans text-xs font-medium uppercase tracking-[0.1em] ${toneClasses} ${className}`}
    >
      {children}
    </span>
  );
}
