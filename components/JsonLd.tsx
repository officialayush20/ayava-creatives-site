/**
 * Renders a JSON-LD structured-data block. Server component — no
 * client-side JS needed, and keeping it server-rendered means the script
 * tag is present in the initial HTML for crawlers that don't execute JS.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
