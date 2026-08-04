import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/sections/legal/LegalPageLayout";
import { privacyDoc } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Privacy Policy | Ayava Creatives",
  description: "Ayava Creatives' privacy policy — draft, pending legal review.",
};

export default function PrivacyPage() {
  return <LegalPageLayout doc={privacyDoc} />;
}
