import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  tone?: "on-ink" | "on-ivory";
  className?: string;
};

/** Text link with a trailing arrow that nudges right on hover/focus. */
export function ArrowLink({ href, children, tone = "on-ink", className = "" }: ArrowLinkProps) {
  const color = tone === "on-ink" ? "text-ivory" : "text-ink";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-sans text-sm font-medium ${color} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
        tone === "on-ink" ? "focus-visible:ring-offset-ink" : "focus-visible:ring-offset-ivory"
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
