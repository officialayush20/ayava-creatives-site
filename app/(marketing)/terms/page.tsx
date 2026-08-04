import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/sections/legal/LegalPageLayout";
import { termsDoc } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Terms of Service | Ayava Creatives",
  description: "Ayava Creatives' terms of service — draft, pending legal review.",
};

export default function TermsPage() {
  return <LegalPageLayout doc={termsDoc} />;
}
