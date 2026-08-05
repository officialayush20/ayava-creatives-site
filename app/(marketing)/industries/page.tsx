import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { CtaBand } from "@/components/sections/CtaBand";
import { IndustriesHubHero } from "@/components/sections/industries/IndustriesHubHero";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { industries } from "@/lib/industries-data";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve | Ayava Creatives",
  description:
    "Ten verticals, ten different playbooks — marketing built around how each industry's buyers actually decide.",
  path: "/industries",
});

function IndustryTile({ slug, name, hook }: { slug: string; name: string; hook: string }) {
  return (
    <a
      href={`/industries/${slug}`}
      aria-label={`${name} — ${hook}`}
      data-reveal-item
      className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-sm border border-hairline bg-surface-raise p-4 transition-colors duration-200 ease-out hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(160deg,var(--color-ink-raise)_0%,var(--color-slate-deep)_100%)] opacity-70 transition-transform duration-300 ease-out group-hover:scale-105"
      />
      <div className="relative">
        <h3 className="font-sans text-sm font-medium text-content md:text-base">{name}</h3>
        <p className="mt-1 font-sans text-xs text-hairline-strong opacity-100 md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
          {hook}
        </p>
      </div>
    </a>
  );
}

export default function IndustriesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <IndustriesHubHero />

        <section aria-labelledby="all-industries-heading" className="bg-inverse-surface py-16 md:py-40">
          <Container>
            <SectionHeader
              eyebrow="All Industries"
              title="Ten verticals. Ten different playbooks."
              headingId="all-industries-heading"
              tone="on-ivory"
              className="mb-12 md:mb-16"
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
              {industries.map((industry) => (
                <IndustryTile key={industry.slug} slug={industry.slug} name={industry.name} hook={industry.hook} />
              ))}
            </div>
          </Container>
        </section>

        <CtaBand
          headline="Tell us which vertical. We'll bring the playbook."
          primaryHref="/contact"
          primaryLabel="Start Your Project"
          secondary={null}
        />
      </main>
      <MegaFooter />
    </>
  );
}
