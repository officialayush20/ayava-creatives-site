"use client";

import { Container } from "@/components/ui/Container";
import { useScrollReveal } from "@/lib/useScrollReveal";

const differentiators = [
  {
    title: "One team, fifteen disciplines.",
    description: "No handoffs between five different agencies who've never spoken to each other.",
  },
  {
    title: "Strategy before spend.",
    description: "Every campaign starts with an audit, not an invoice.",
  },
  {
    title: "Built by operators, not just marketers.",
    description:
      "Ayush Saini's portfolio spans CRM platforms, B2B marketplaces, and e-commerce builds — we understand the product, not just the ad account.",
  },
  {
    title: "Dehradun-based, globally deployed.",
    description: "Local overhead, international-standard execution.",
  },
];

export function WhyAyava() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} aria-labelledby="why-ayava-heading" className="bg-ink py-16 md:py-40">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4" data-reveal-item>
            <h2
              id="why-ayava-heading"
              className="font-display text-[clamp(28px,4vw,44px)] font-normal leading-[1.05] md:sticky md:top-32"
            >
              Why Ayava.
            </h2>
          </div>
          <div className="md:col-span-8">
            <ul>
              {differentiators.map((item, index) => (
                <li
                  key={item.title}
                  data-reveal-item
                  className={`flex items-start gap-4 py-8 ${
                    index === 0 ? "border-t border-slate-deep" : ""
                  } border-b border-slate-deep`}
                >
                  <span className="font-display text-xl text-slate">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-normal md:text-xl">{item.title}</h3>
                    <p className="mt-2 font-sans text-sm text-slate">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
