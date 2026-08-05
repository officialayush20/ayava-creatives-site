import { ReactNode } from "react";
import Link from "next/link";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "large";
  tone?: "on-ink" | "on-ivory";
  className?: string;
  disabled?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * Button primitive: primary / secondary / ghost.
 *
 * Brand-token note: gold is restricted to hairlines + numeric text per the
 * hard rule in globals.css ("never as a large fill"). The layout spec's
 * literal wording ("primary gold-fill") conflicts with that rule, so this
 * implementation treats gold as a focus-ring / hover-accent color only —
 * primary buttons use an ivory fill (on ink) / ink fill (on ivory) instead
 * of a gold fill. Flagged in the handoff notes.
 *
 * `tone` controls which surface the button sits on so fills/focus rings
 * stay legible: "on-ink" (default) is for use on bg-surface sections, "on-ivory"
 * is for use on bg-inverse-surface sections.
 */
export function Button({
  children,
  variant = "primary",
  size = "default",
  tone = "on-ink",
  className = "",
  disabled = false,
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  // `tone` names ("on-ink" / "on-ivory") are kept as the external prop
  // contract to avoid touching every call site, but internally both now
  // resolve through the semantic role tokens (--color-surface/--color-content/
  // --color-inverse-*) so the same markup re-themes correctly under
  // [data-theme="light"] with no per-component light fork. See
  // docs/light-gradient-theme-spec.md §6.
  const ringOffset =
    tone === "on-ink"
      ? "focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      : "focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface";

  const sizes = {
    default: "px-6 py-3 text-sm",
    large: "px-8 py-4 text-base",
  };

  // `btn-primary-gradient` is a no-op class in dark theme (the rule that
  // reads it lives entirely under `[data-theme="light"] .btn-primary-gradient`
  // in globals.css) — the dark theme's `bg-content text-surface` primary
  // fill is completely unaffected by adding this class name. Only the
  // primary variant gets it; secondary/ghost are untouched in both themes.
  const variants = {
    "on-ink": {
      primary:
        "btn-primary-gradient bg-content text-surface hover:shadow-[0_0_0_1px_var(--color-accent)] rounded-full",
      secondary:
        "bg-transparent text-content border border-hairline-strong hover:border-accent hover:text-content rounded-full",
      ghost: "bg-transparent text-content underline-offset-4 hover:underline px-0 py-1",
    },
    "on-ivory": {
      primary:
        "btn-primary-gradient bg-inverse-content text-inverse-surface hover:shadow-[0_0_0_1px_var(--color-accent)] rounded-full",
      secondary:
        "bg-transparent text-inverse-content border border-hairline hover:border-accent hover:text-inverse-content rounded-full",
      ghost: "bg-transparent text-inverse-content underline-offset-4 hover:underline px-0 py-1",
    },
  };

  const classes = `${base} ${ringOffset} ${variant === "ghost" ? "" : sizes[size]} ${variants[tone][variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
