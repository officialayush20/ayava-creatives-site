import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { MegaFooter } from "@/components/sections/MegaFooter";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { IntakeForm } from "@/components/sections/contact/IntakeForm";
import { AltContactPaths } from "@/components/sections/contact/AltContactPaths";
import { OfficeCard } from "@/components/sections/contact/OfficeCard";
import { ResponseTimeBand } from "@/components/sections/contact/ResponseTimeBand";
import { ContactFAQ } from "@/components/sections/contact/ContactFAQ";

export const metadata: Metadata = {
  title: "Contact | Ayava Creatives",
  description:
    "Tell us what you're trying to fix. No sales script, no discovery-call theater — start a project with Ayava Creatives.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ContactHero />
        <IntakeForm />
        <AltContactPaths />
        <OfficeCard />
        <ResponseTimeBand />
        <ContactFAQ />
      </main>
      <MegaFooter />
    </>
  );
}
