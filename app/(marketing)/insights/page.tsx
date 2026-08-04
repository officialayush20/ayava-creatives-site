import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { CtaBand } from "@/components/sections/CtaBand";
import { InsightsHero } from "@/components/sections/insights/InsightsHero";
import { ArticleGrid } from "@/components/sections/insights/ArticleGrid";

export const metadata: Metadata = {
  title: "Insights | Ayava Creatives",
  description:
    "A working library, not a content calendar — field notes sourced from the studio's own project work.",
};

export default function InsightsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <InsightsHero />
        <ArticleGrid />
        <CtaBand
          headline="Want this kind of thinking applied to your own site?"
          supportingLine="Everything above comes out of client work. Bring us yours and find out what we'd actually build."
          primaryHref="/contact"
          primaryLabel="Get Free Audit"
          secondary={{ href: "/contact#call", label: "Book Strategy Call" }}
          tone="on-ink"
        />
      </main>
      <MegaFooter />
    </>
  );
}
