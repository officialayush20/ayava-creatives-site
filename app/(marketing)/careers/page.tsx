import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { WhyAyavaEventually } from "@/components/sections/careers/WhyAyavaEventually";
import { CareersInterestForm } from "@/components/sections/careers/CareersInterestForm";
import { RedirectBand } from "@/components/sections/careers/RedirectBand";

export const metadata: Metadata = {
  title: "Careers | Ayava Creatives",
  description:
    "Ayava isn't hiring right now, but we'd still like to hear from you. Tell us a little about yourself and we'll keep it on file.",
};

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <CareersHero />
        <WhyAyavaEventually />
        <CareersInterestForm />
        <RedirectBand />
      </main>
      <MegaFooter />
    </>
  );
}
