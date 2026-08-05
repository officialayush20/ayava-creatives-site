import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { CtaBand } from "@/components/sections/CtaBand";
import { AyavaMethod } from "@/components/sections/AyavaMethod";
import { FounderHero } from "@/components/sections/about/FounderHero";
import { FounderNarrative } from "@/components/sections/about/FounderNarrative";
import { WhyAyavaExists } from "@/components/sections/about/WhyAyavaExists";
import { ValuesPrinciples } from "@/components/sections/about/ValuesPrinciples";
import { LeanTeamFeature } from "@/components/sections/about/LeanTeamFeature";

export const metadata: Metadata = buildMetadata({
  title: "About | Ayava Creatives",
  description:
    "Ayava Creatives is built and run by Ayush Saini — a full-stack developer and growth marketer who builds the product and markets it, without an account-manager layer.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <FounderHero />
        <FounderNarrative />
        <WhyAyavaExists />
        <AyavaMethod
          tone="on-ivory"
          introLine="This is how every Ayava engagement runs — the same process whether it's a landing page or a full growth program."
        />
        <ValuesPrinciples />
        <LeanTeamFeature />
        <CtaBand
          tone="on-ink"
          headline="Talk to the person who'll actually do the work."
          supportingLine="No account manager, no relay — your first conversation is your last handoff."
          primaryHref="/contact"
          primaryLabel="Get Free Audit"
          secondary={{ href: "/contact#call", label: "Book Strategy Call" }}
        />
      </main>
      <MegaFooter />
    </>
  );
}
