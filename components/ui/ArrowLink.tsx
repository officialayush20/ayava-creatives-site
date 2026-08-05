import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  tone?: "on-ink" | "on-ivory";
  className?: string;
};

/** Text link with a trailing arrow that nudges right on hover/focus. */
export function ArrowLink({ href, children, tone = "on-ink", className = "" }: ArrowLinkProps) {
  // `tone` prop names kept for call-site stability; internally resolved
  // through semantic role tokens. See docs/light-gradient-theme-spec.md §6.
  const color = tone === "on-ink" ? "text-content" : "text-inverse-content";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-sans text-sm font-medium ${color} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        tone === "on-ink" ? "focus-visible:ring-offset-surface" : "focus-visible:ring-offset-inverse-surface"
      } ${className}`}
    >
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}
