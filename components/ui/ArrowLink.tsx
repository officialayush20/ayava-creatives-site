import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  tone?: "on-ink" | "on-ivory";
  className?: string;
  /** Renders as a real `<a>` with target="_blank" + rel="noopener noreferrer", with sr-only "(opens in new tab)" affordance. */
  external?: boolean;
};

/** Text link with a trailing arrow that nudges right on hover/focus. */
export function ArrowLink({
  href,
  children,
  tone = "on-ink",
  className = "",
  external = false,
}: ArrowLinkProps) {
  // `tone` prop names kept for call-site stability; internally resolved
  // through semantic role tokens. See docs/light-gradient-theme-spec.md §6.
  const color = tone === "on-ink" ? "text-content" : "text-inverse-content";
  const sharedClassName = `group inline-flex items-center gap-2 font-sans text-sm font-medium ${color} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
    tone === "on-ink" ? "focus-visible:ring-offset-surface" : "focus-visible:ring-offset-inverse-surface"
  } ${className}`;

  const content = (
    <>
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      {external && <span className="sr-only"> (opens in new tab)</span>}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={sharedClassName}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={sharedClassName}>
      {content}
    </Link>
  );
}
