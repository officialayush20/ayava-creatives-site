type FilterChipProps = {
  label: string;
  active: boolean;
  onToggle: () => void;
};

/**
 * Interactive extension of `Tag`'s pill styling (work-hub-layout-spec.md §2).
 * Kept as its own small component rather than adding interactive props to
 * the shared display-only `Tag` — active state is a gold underline + gold
 * border, never a fill, per the gold-restricted-to-hairlines rule.
 */
export function FilterChip({ label, active, onToggle }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onToggle}
      className={`inline-flex items-center rounded-full border bg-transparent px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory ${
        active
          ? "border-gold text-ink border-b-2"
          : "border-slate-deep text-ink hover:border-gold/60"
      }`}
    >
      {label}
    </button>
  );
}
