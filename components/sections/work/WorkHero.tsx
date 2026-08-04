import { Container } from "@/components/ui/Container";
import { caseStudies } from "@/lib/case-studies-data";

/**
 * Work Hub hero — an index-page open, not the cinematic homepage hero.
 * Static, no scroll choreography (work-hub-layout-spec.md §1). The optional
 * count line is the page's one legitimate gold numeral (real, load-bearing
 * figure — not a headline-scale decorative gold use).
 */
export function WorkHero() {
  const projectCount = caseStudies.length;
  const industryCount = new Set(caseStudies.map((s) => s.industry)).size;

  return (
    <section aria-labelledby="work-hero-heading" className="bg-ink pt-16 pb-12 md:pb-24 md:pt-40">
      <Container>
        <div className="max-w-[52ch] md:max-w-none md:[&>*]:max-w-[62ch]">
          <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">Our Work</p>
          <h1
            id="work-hero-heading"
            className="max-w-[16ch] font-display text-[clamp(30px,8vw,72px)] font-normal leading-[1.05] text-ivory md:max-w-[12ch]"
          >
            Eight projects, eight industries, one founder-led process.
          </h1>
          <p className="mt-6 max-w-[38ch] font-sans text-base text-slate md:max-w-[52ch] md:text-lg">
            Every build on this page was designed, architected, and executed under one operator&rsquo;s direct
            involvement — not handed off across five subcontractors. Fewer projects, more scrutiny on each.
          </p>
          <p className="mt-8 font-sans text-sm text-slate">
            <span className="font-display text-gold">{projectCount}</span> projects across{" "}
            <span className="font-display text-gold">{industryCount}</span> industries
          </p>
        </div>
      </Container>
    </section>
  );
}
