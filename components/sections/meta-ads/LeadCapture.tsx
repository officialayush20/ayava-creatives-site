"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const spendRanges = [
  "Under ₹50,000/mo",
  "₹50,000 – ₹1,50,000/mo",
  "₹1,50,000 – ₹5,00,000/mo",
  "₹5,00,000+/mo",
];

const goals = ["Leads", "Sales", "App Installs", "Awareness"];
const accountStatuses = ["New account", "Existing account"];

const structureByGoal: Record<string, string> = {
  Leads: "a lead-gen-optimized campaign structure with dedicated retargeting for form abandoners",
  Sales: "a purchase-optimized structure with a retargeting funnel across cart and product-view stages",
  "App Installs": "an app-install campaign structure with post-install event optimization once volume allows",
  Awareness: "a reach-and-frequency structure feeding a retargeting funnel for later-stage conversion",
};

/**
 * Variant B — simple calculator widget teaser (service-page-layout-spec
 * §11, Meta Ads is calculator-eligible per the spec's guidance). This is
 * intentionally a lightweight, client-side-only directional estimate — no
 * invented reach/ROAS number renders, per meta-ads-page-copy.md's explicit
 * instruction. It is a feeder into the real Contact/intake flow, not a
 * duplicate of it.
 */
export function LeadCapture() {
  const [spend, setSpend] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState("");

  const estimate = useMemo(() => {
    if (!spend || !goal || !status) return null;
    const existingNote =
      status === "Existing account"
        ? "We'd start with a full audit of what's already running before changing anything."
        : "We'd start clean with pixel setup and a controlled testing phase.";
    return `Based on your inputs, here's what a testing structure could look like: ${structureByGoal[goal]}. ${existingNote}`;
  }, [spend, goal, status]);

  return (
    <section aria-labelledby="lead-capture-heading" className="bg-ink py-16 md:py-40">
      <Container>
        <div className="mx-auto max-w-3xl rounded-sm border border-slate bg-ink-raise p-6 md:p-12">
          <h2 id="lead-capture-heading" className="font-display text-[clamp(24px,3vw,32px)] font-normal">
            Let&apos;s Scope Your Meta Ads Project
          </h2>
          <p className="mt-3 font-sans text-sm text-slate">
            A quick, directional estimate — not a quote. For a real quote, this routes into our
            full intake flow.
          </p>

          <div className="mt-8 flex flex-col gap-6">
            <fieldset>
              <legend className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.14em] text-slate">
                Monthly ad spend
              </legend>
              <div className="flex flex-wrap gap-2">
                {spendRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    aria-pressed={spend === range}
                    onClick={() => setSpend(range)}
                    className={`rounded-full border px-4 py-2 font-sans text-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                      spend === range
                        ? "border-ivory bg-ivory/10 text-ivory"
                        : "border-slate text-slate hover:border-ivory hover:text-ivory"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.14em] text-slate">
                Primary goal
              </legend>
              <div className="flex flex-wrap gap-2">
                {goals.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={goal === option}
                    onClick={() => setGoal(option)}
                    className={`rounded-full border px-4 py-2 font-sans text-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                      goal === option
                        ? "border-ivory bg-ivory/10 text-ivory"
                        : "border-slate text-slate hover:border-ivory hover:text-ivory"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.14em] text-slate">
                Current account status
              </legend>
              <div className="flex flex-wrap gap-2">
                {accountStatuses.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={status === option}
                    onClick={() => setStatus(option)}
                    className={`rounded-full border px-4 py-2 font-sans text-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                      status === option
                        ? "border-ivory bg-ivory/10 text-ivory"
                        : "border-slate text-slate hover:border-ivory hover:text-ivory"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div
            aria-live="polite"
            className="mt-8 rounded-sm border border-slate-deep bg-ink p-6 font-sans text-sm text-slate"
          >
            {estimate ?? "Enter your details above to see how we'd structure your campaign."}
          </div>

          <Button href="/contact" variant="primary" tone="on-ink" size="large" className="mt-8 w-full sm:w-auto">
            Get Full Quote
          </Button>
        </div>
      </Container>
    </section>
  );
}
