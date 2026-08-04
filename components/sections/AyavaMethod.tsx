import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  { title: "Audit", description: "We map the current state — every channel, every leak — before touching a single campaign." },
  { title: "Architect", description: "We design the system: channel mix, funnel, and message, sequenced for compounding return." },
  { title: "Build", description: "We execute — creative, media, code, copy — to a single strategy, not fifteen disconnected vendors." },
  { title: "Measure", description: "We instrument everything, so results are read from dashboards, not assumed from vibes." },
  { title: "Scale", description: "What works gets funded harder. What doesn't gets cut fast. No sentimental campaigns." },
];

export function AyavaMethod() {
  return (
    <section aria-labelledby="method-heading" className="bg-ink py-16 md:py-40">
      <Container>
        <SectionHeader
          eyebrow="How we operate"
          title="The Ayava Method."
          headingId="method-heading"
          tone="on-ink"
          className="mb-16 md:mb-20"
        />

        {/* 5 steps — horizontal-scroll rail at desktop (per spec's recommendation
            for uneven 5-across grids), vertical stacked list from tablet down. */}
        <ol className="hidden gap-8 overflow-x-auto pb-4 lg:flex lg:gap-6">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative min-w-[240px] flex-1 border-t border-slate-deep pt-6"
            >
              <span className="font-display text-3xl text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-normal">{step.title}</h3>
              <p className="mt-2 font-sans text-sm text-slate">{step.description}</p>
            </li>
          ))}
        </ol>

        <ol className="flex flex-col gap-8 border-l border-slate-deep pl-6 lg:hidden">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="font-display text-2xl text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-normal">{step.title}</h3>
              <p className="mt-2 font-sans text-sm text-slate">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
