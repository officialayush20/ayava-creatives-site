"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { servicePageContent, type LeadCaptureConfig } from "@/lib/service-page-content";

type LeadCaptureProps = {
  /** Service slug, not the resolved config object — `computeEstimate` is a
   * function, and Next.js RSC props can't carry a function reference from a
   * Server Component across to a Client Component. Resolving content here,
   * inside the client module, keeps the function entirely in the client
   * bundle instead of crossing that boundary. */
  slug: string;
};

/**
 * Embedded lead-capture per service-page-layout-spec §11. Variant A is a
 * lightweight mini intake form (Name/Email/Company/stage), variant B is a
 * directional, client-side-only calculator teaser — no fabricated
 * numeric forecasts, per every service's copy doc instruction.
 *
 * Promoted from `components/sections/meta-ads/LeadCapture.tsx` (which was
 * variant B) and generalized to also support variant A for the services
 * that use a simple intake form instead.
 */
export function LeadCapture({ slug }: LeadCaptureProps) {
  const config = servicePageContent[slug].leadCapture;

  if (config.variant === "B") {
    return <CalculatorLeadCapture config={config} />;
  }
  return <FormLeadCapture config={config} />;
}

function CalculatorLeadCapture({ config }: { config: Extract<LeadCaptureConfig, { variant: "B" }> }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const estimate = useMemo(() => config.computeEstimate(values), [config, values]);

  return (
    <section aria-labelledby="lead-capture-heading" className="bg-ink py-16 md:py-40">
      <Container>
        <div className="mx-auto max-w-3xl rounded-sm border border-slate bg-ink-raise p-6 md:p-12">
          <h2 id="lead-capture-heading" className="font-display text-[length:var(--type-display-card)] font-normal">
            {config.headline}
          </h2>
          <p className="mt-3 font-sans text-sm text-slate">{config.helperText}</p>

          <div className="mt-8 flex flex-col gap-6">
            {config.fields.map((field) => (
              <fieldset key={field.key}>
                <legend className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.14em] text-slate">
                  {field.legend}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {field.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={values[field.key] === option}
                      onClick={() => setValues((prev) => ({ ...prev, [field.key]: option }))}
                      className={`rounded-full border px-4 py-2 font-sans text-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                        values[field.key] === option
                          ? "border-ivory bg-ivory/10 text-ivory"
                          : "border-slate text-slate hover:border-ivory hover:text-ivory"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div
            aria-live="polite"
            className="mt-8 rounded-sm border border-slate-deep bg-ink p-6 font-sans text-sm text-slate"
          >
            {estimate ?? config.emptyStateText}
          </div>

          <Button href="/contact" variant="primary" tone="on-ink" size="large" className="mt-8 w-full sm:w-auto">
            Get Full Quote
          </Button>
        </div>
      </Container>
    </section>
  );
}

function FormLeadCapture({ config }: { config: Extract<LeadCaptureConfig, { variant: "A" }> }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [stage, setStage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter your name and a valid email.");
      return;
    }
    setError(null);
    setStatus("submitting");
    // No backend wired yet — simulate submission per the lightweight-feeder
    // intent of this widget (routes into the real intake flow separately).
    window.setTimeout(() => setStatus("success"), 400);
  }

  return (
    <section aria-labelledby="lead-capture-heading" className="bg-ink py-16 md:py-40">
      <Container>
        <div className="mx-auto max-w-2xl rounded-sm border border-slate bg-ink-raise p-6 md:p-12">
          {status === "success" ? (
            <div aria-live="polite">
              <h2 id="lead-capture-heading" className="font-display text-[length:var(--type-display-card)] font-normal">
                {config.successMessage}
              </h2>
              <Button href="/contact" variant="primary" tone="on-ink" size="large" className="mt-8 w-full sm:w-auto">
                {config.secondaryCtaLabel}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} aria-busy={status === "submitting"} noValidate>
              <h2 id="lead-capture-heading" className="font-display text-[length:var(--type-display-card)] font-normal">
                {config.headline}
              </h2>

              {error ? (
                <p role="alert" className="mt-4 rounded-sm border border-[color:var(--color-rust-raise)]/60 px-4 py-3 font-sans text-xs normal-case text-[color:var(--color-rust-raise)]">
                  {error}
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-6">
                <FormField id="lc-name" label="Name" value={name} onChange={setName} required disabled={status === "submitting"} />
                <FormField id="lc-email" label="Email" type="email" value={email} onChange={setEmail} required disabled={status === "submitting"} />
                <FormField id="lc-company" label="Company (optional)" value={company} onChange={setCompany} disabled={status === "submitting"} />

                <div>
                  <label htmlFor="lc-stage" className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.14em] text-slate">
                    Project stage
                  </label>
                  <select
                    id="lc-stage"
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    disabled={status === "submitting"}
                    className="w-full rounded-sm border border-slate bg-ink px-4 py-3 font-sans text-sm text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50"
                  >
                    <option value="">Select an option</option>
                    <option value="exploring">Just exploring</option>
                    <option value="ready">Ready to start</option>
                    <option value="brief">Have a specific brief</option>
                  </select>
                </div>
              </div>

              <Button type="submit" variant="primary" tone="on-ink" size="large" className="mt-8 w-full sm:w-auto" disabled={status === "submitting"}>
                {status === "submitting" ? "Submitting…" : "Submit"}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.14em] text-slate">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className="w-full rounded-sm border border-slate bg-ink px-4 py-3 font-sans text-sm text-ivory placeholder:text-slate/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50"
      />
    </div>
  );
}
