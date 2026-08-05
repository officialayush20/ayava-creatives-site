import { ProblemStatement } from "@/components/sections/ProblemStatement";

/**
 * "Why Ayava Exists" (about-page-layout-spec.md §3) — the founder's actual
 * point of view on the agency-client translation problem, using the shared
 * ProblemStatement pattern.
 */
export function WhyAyavaExists() {
  return (
    <ProblemStatement
      headingId="why-ayava-exists-heading"
      statement="Most agency relationships have a translation problem."
      tone="on-ink"
    >
      <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-hairline-strong md:text-lg">
        <p>
          By the time I started taking on marketing work directly, I&apos;d already sat in enough
          client meetings — as the developer, not the marketer — to see the same pattern repeat:
          the person pitching the strategy wasn&apos;t the person who understood how the product
          actually worked, and the person who understood the product wasn&apos;t in the room.
          Somewhere between the account manager, the strategist, and the person actually touching
          the ad account or the codebase, the original problem gets restated three times and
          understood fully by none of them.
        </p>
        <p>
          That&apos;s not a dramatic industry failure — it&apos;s just a structural one. Add enough
          layers between a client and the work, and something gets lost in each handoff, even
          with good people at every layer.
        </p>
        <p>
          Ayava exists to remove the layers, not manage them better. I scope the work, I build
          it, and I run it. When something needs to change mid-campaign, there&apos;s no relay —
          I&apos;m already looking at the same dashboard the client is asking about.
        </p>
      </div>
    </ProblemStatement>
  );
}
