import { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  tone?: "on-ink" | "on-ivory";
  className?: string;
};

/** Small pill label used for industry tags, category labels, etc. */
export function Tag({ children, tone = "on-ivory", className = "" }: TagProps) {
  const toneClasses =
    tone === "on-ivory"
      ? "border-slate-deep/30 text-slate-deep bg-transparent"
      : "border-slate/40 text-slate bg-transparent";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-sans text-xs font-medium uppercase tracking-[0.1em] ${toneClasses} ${className}`}
    >
      {children}
    </span>
  );
}
