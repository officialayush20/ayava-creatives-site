type FilterChipProps = {
  label: string;
  active: boolean;
  onToggle: () => void;
};

/**
 * Interactive extension of `Tag`'s pill styling (work-hub-layout-spec.md §2).
 * Kept as its own small component rather than adding interactive props to
 * the shared display-only `Tag` — active state is a neutral perimeter with a
 * gold accent on the bottom edge only (chips are multi-select, so a full
 * gold outline on several chips at once would be too large a gold surface).
 */
export function FilterChip({ label, active, onToggle }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onToggle}
      className={`inline-flex items-center rounded-full border bg-transparent px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface ${
        active
          ? "border-hairline border-b-2 border-b-gold text-inverse-content font-medium"
          : "border-hairline text-inverse-content"
      }`}
    >
      {label}
    </button>
  );
}
