import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { CtaBand } from "@/components/sections/CtaBand";
import { WorkHero } from "@/components/sections/work/WorkHero";
import { WorkGridSection } from "@/components/sections/work/WorkGridSection";

export const metadata: Metadata = buildMetadata({
  title: "Our Work | Ayava Creatives",
  description:
    "Eight projects, eight industries, one founder-led process — the real portfolio behind Ayava Creatives.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <WorkHero />
        <WorkGridSection />
        <CtaBand
          headline="Want to see your project here next?"
          supportingLine="Every case study on this page started as a first conversation. Yours can too."
          primaryHref="/contact"
          primaryLabel="Get Free Audit"
          secondary={{ href: "/contact#call", label: "Book a Call" }}
          tone="on-ink"
          gradient="cobalt-deep"
        />
      </main>
      <MegaFooter />
    </>
  );
}
