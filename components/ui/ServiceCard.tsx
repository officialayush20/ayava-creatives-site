import Link from "next/link";

type ServiceCardProps = {
  slug: string;
  name: string;
  description: string;
  /** 12-col span classes for the card at md breakpoint and up, e.g. "md:col-span-6". */
  spanClassName?: string;
  /** Sequential display number (e.g. "01"). Only rendered when `showNumber` is true. */
  number?: string;
  /** Homepage teaser shows a slate ordinal per card; the hub page omits it entirely. */
  showNumber?: boolean;
  /** "compact" is used everywhere a page needs a shorter card (hub page groups). */
  size?: "default" | "compact";
  /** Which background the card sits on — controls text/border/focus colors so it stays legible on both surfaces. */
  tone?: "on-ink" | "on-ivory";
};

/**
 * Shared service link card — border-hairline, `hover:border-gold`,
 * name + one-line description, arrow reveal on hover/focus. Used by both
 * the homepage's `ServicesShowcase` (flat teaser grid) and the `/services`
 * hub page (grouped sections) so the two never drift into separate
 * copy-pasted implementations.
 */
export function ServiceCard({
  slug,
  name,
  description,
  spanClassName = "",
  number,
  showNumber = true,
  size = "default",
  tone = "on-ink",
}: ServiceCardProps) {
  const sizeClasses =
    size === "compact"
      ? "min-h-[140px] p-6 md:min-h-[160px]"
      : "min-h-[160px] p-6 md:min-h-[280px] md:p-8";

  const isOnIvory = tone === "on-ivory";
  const ringOffset = isOnIvory
    ? "focus-visible:ring-offset-ivory"
    : "focus-visible:ring-offset-ink";
  const headingColor = isOnIvory ? "text-ink" : "text-ivory";
  const arrowColor = isOnIvory ? "text-ink" : "text-ivory";

  return (
    <Link
      href={`/services/${slug}`}
      aria-label={`${name} — ${description}`}
      data-reveal-item
      className={`group flex flex-col justify-between rounded-sm border border-slate-deep transition-colors duration-200 ease-out hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${ringOffset} active:scale-[0.98] ${sizeClasses} ${spanClassName}`}
    >
      {showNumber && number ? (
        <span className="font-sans text-sm tracking-[0.1em] text-slate">{number}</span>
      ) : null}
      <div>
        <h3 className={`font-display text-xl font-normal leading-tight md:text-2xl ${headingColor}`}>
          {name}
        </h3>
        <p className="mt-3 font-sans text-sm text-slate">{description}</p>
      </div>
      <span
        aria-hidden="true"
        className={`mt-4 inline-block w-fit font-sans text-sm opacity-0 transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:opacity-100 ${arrowColor}`}
      >
        &rarr;
      </span>
    </Link>
  );
}
