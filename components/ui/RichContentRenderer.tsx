import { MediaFrame } from "@/components/ui/MediaFrame";
import type { RichContentBlock } from "@/lib/insights-data";

type RichContentRendererProps = {
  blocks: RichContentBlock[];
  coverImage?: string;
  coverAlt?: string;
};

/**
 * Long-form prose renderer shared by the Insights article template
 * (insights-page-layout-spec.md §2.3) and legal pages
 * (legal-page-layout-spec.md §1.4 — "literally import and reuse it").
 * Single component switching on block type — 72ch measure, section-rhythm
 * spacing pulled from the site's existing scale, gold reserved only for a
 * cited numeral in a pull-quote (not used here, no real figures exist yet).
 */
export function RichContentRenderer({ blocks, coverImage, coverAlt }: RichContentRendererProps) {
  return (
    <div className="mx-auto max-w-[72ch]">
      {coverImage ? (
        <MediaFrame
          src={coverImage}
          alt={coverAlt ?? "Article cover"}
          aspect="16/9"
          className="mb-12"
        />
      ) : null}
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="mt-6 font-sans text-base leading-[1.7] text-ink first:mt-0"
              >
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2
                key={index}
                className="mt-16 mb-6 font-display text-2xl font-normal leading-[1.15] text-ink md:mt-16 md:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={index}
                className="mt-10 mb-4 font-sans text-lg font-bold leading-[1.2] text-ink md:mt-10"
              >
                {block.text}
              </h3>
            );
          case "blockquote":
            return (
              <blockquote
                key={index}
                className="mt-6 border-l-4 border-bronze pl-6 font-display text-lg italic leading-[1.5] text-slate-deep"
              >
                {block.text}
              </blockquote>
            );
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className="mt-6 flex flex-col gap-2 pl-6 font-sans text-base leading-[1.7] text-ink marker:text-bronze"
                style={{ listStyleType: block.ordered ? "decimal" : "disc" }}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ListTag>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
