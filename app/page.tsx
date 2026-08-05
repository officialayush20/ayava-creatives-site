import { SiteHeader } from "@/components/sections/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { ResultsStrip } from "@/components/sections/ResultsStrip";
import { FeaturedCaseStudies } from "@/components/sections/FeaturedCaseStudies";
import { AyavaMethod } from "@/components/sections/AyavaMethod";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { WhyAyava } from "@/components/sections/WhyAyava";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { CtaBand } from "@/components/sections/CtaBand";
import { MegaFooter } from "@/components/sections/MegaFooter";

// Awards Wall and Testimonial Theater are intentionally omitted from the
// live composition: no real awards/press or approved client testimonials
// exist yet, and the copy/layout specs both instruct against shipping
// fabricated placeholders for either. Both are ready to add once real
// content exists (see components/sections/TestimonialTheater.tsx).

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <ServicesShowcase />
        <ResultsStrip />
        <FeaturedCaseStudies />
        <AyavaMethod />
        <IndustriesGrid />
        <WhyAyava />
        <InsightsPreview />
        <GlobalPresence />
        <CtaBand gradient="verdigris-deep" />
      </main>
      <MegaFooter />
    </>
  );
}
