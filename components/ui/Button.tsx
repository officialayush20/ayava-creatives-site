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
 * stay legible: "on-ink" (default) is for use on bg-ink sections, "on-ivory"
 * is for use on bg-ivory sections.
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
    "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const ringOffset = tone === "on-ink" ? "focus-visible:ring-offset-2 focus-visible:ring-offset-ink" : "focus-visible:ring-offset-2 focus-visible:ring-offset-ivory";

  const sizes = {
    default: "px-6 py-3 text-sm",
    large: "px-8 py-4 text-base",
  };

  const variants = {
    "on-ink": {
      primary: "bg-ivory text-ink hover:shadow-[0_0_0_1px_var(--color-gold)] rounded-full",
      secondary:
        "bg-transparent text-ivory border border-slate hover:border-gold hover:text-ivory rounded-full",
      ghost: "bg-transparent text-ivory underline-offset-4 hover:underline px-0 py-1",
    },
    "on-ivory": {
      primary: "bg-ink text-ivory hover:shadow-[0_0_0_1px_var(--color-gold)] rounded-full",
      secondary:
        "bg-transparent text-ink border border-slate-deep hover:border-gold hover:text-ink rounded-full",
      ghost: "bg-transparent text-ink underline-offset-4 hover:underline px-0 py-1",
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
