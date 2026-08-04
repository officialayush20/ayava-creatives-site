import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NarrativeColumn } from "@/components/ui/NarrativeColumn";

const credentials = [
  { label: "Education", value: "BCA — Himgiri Zee University (2023–2026)" },
  { label: "Full-Stack Development", value: "NextepSolution" },
  { label: "Web Development", value: "Dreamzcraft" },
  { label: "Performance Marketing", value: "banksathi" },
  {
    label: "Real Project Work",
    value: "NextepSolution, Nextep Ventures, Dreamzcraft, FineTaxConsultancy, Woodcraft Store Premium, Wooden Handicraft 3D, Aura Estates, College IQ",
  },
];

/**
 * Founder narrative / manifesto (about-page-layout-spec.md §2). Editorial
 * asymmetric layout: prose column + a compact CredentialsRail surfacing
 * concrete facts for scanners. Employment tenure/title framing is left out
 * of the visible copy per the copy doc's flag that exact dates need
 * founder sign-off before publishing — company/role nature only is shown.
 */
export function FounderNarrative() {
  return (
    <section aria-labelledby="founder-narrative-heading" className="bg-ivory py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="The Story"
          title="How Ayava started."
          headingId="founder-narrative-heading"
          tone="on-ivory"
          className="mb-12 md:mb-16"
        />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <NarrativeColumn tone="on-ivory">
              <p>I didn&apos;t start as a marketer. I started as a developer.</p>
              <p>
                Before Ayava existed, I was building the things other people would eventually
                market — CRM dashboards, e-commerce stores, product sites for platforms that
                needed to work, not just look good in a pitch deck. That&apos;s where the instinct
                for this agency comes from: I&apos;ve been on the other side of the table, shipping
                the code that a campaign either supports or embarrasses.
              </p>
              <p>
                I&apos;m currently a Full-Stack Developer &amp; Growth Marketer at NextepSolution,
                where I work across both the build and the go-to-market side of a CRM platform —
                the same split that Ayava now runs on. Before that, I was a Web Developer at
                Dreamzcraft, and before that, a Performance Marketing Specialist at banksathi,
                running paid acquisition day to day. That sequence — dev, dev, marketing, both —
                isn&apos;t a resume gap. It&apos;s the actual order I learned this in: build first,
                then learn to sell what you built, then realize the two were never separate
                disciplines to begin with.
              </p>
              <p>
                Alongside that, I&apos;ve been finishing a Bachelor of Computer Applications at
                Himgiri Zee University. The degree and the client work have run in parallel, not
                one after the other — most of what&apos;s in this section happened while I was
                still a student, which is worth saying plainly rather than glossing over.
              </p>
              <p>
                The projects that taught me the most weren&apos;t hypothetical. NextepSolution and
                Nextep Ventures gave me the B2B/SaaS side — selling to operators who research
                before they&apos;ll talk to anyone. Dreamzcraft and FineTaxConsultancy gave me
                service-business sites where trust has to be established in the first scroll.
                Woodcraft Store Premium and Wooden Handicraft 3D gave me e-commerce — product
                pages that either convert or don&apos;t, no ambiguity. Aura Estates gave me luxury
                real estate, where restraint sells harder than noise. College IQ gave me the
                hardest brief of the group: explain an AI-driven product to people who&apos;ve
                never used one, in language a first-time visitor understands in under a minute.
              </p>
              <p>
                Ayava Creatives is what happens when you stop treating &ldquo;the developer&rdquo;
                and &ldquo;the marketer&rdquo; as two different people in two different meetings.
                I&apos;m both, on every account I take on.
              </p>
            </NarrativeColumn>
          </div>
          <div className="md:col-span-5 md:col-start-9">
            <div className="md:sticky md:top-32">
              <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate-deep">
                At a Glance
              </p>
              <dl className="flex flex-col">
                {credentials.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex flex-col gap-1 py-4 ${
                      index === 0 ? "border-t border-slate-deep" : ""
                    } border-b border-slate-deep`}
                  >
                    <dt className="font-sans text-xs uppercase tracking-[0.1em] text-slate-deep">
                      {item.label}
                    </dt>
                    <dd className="font-sans text-sm text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
