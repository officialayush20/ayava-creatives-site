"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FormField, fieldDescribedBy } from "@/components/sections/contact/FormField";
import { useScrollReveal } from "@/lib/useScrollReveal";

const areaOptions = ["Design", "Development", "Marketing/Growth", "Strategy/Account", "Other"];

/**
 * Frontend/backend handoff contract, mirroring the Contact form's
 * ContactFormPayload pattern (contact-page-layout-spec.md §2.7) for
 * consistency — the single source of truth `backend-engineer` should build
 * an eventual `/api/careers-interest` endpoint against.
 */
type CareersInterestPayload = {
  fullName: string;
  email: string;
  areaOfInterest?: string;
  note?: string;
  submittedAt: string;
};

type FormState = {
  fullName: string;
  email: string;
  areaOfInterest: string;
  note: string;
};

const emptyForm: FormState = {
  fullName: "",
  email: "",
  areaOfInterest: "",
  note: "",
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

/**
 * Mock submission — there is no real backend yet.
 * TODO(backend-engineer): wire to a real /api/careers-interest endpoint.
 * See CareersInterestPayload above for the payload shape and
 * contact-page-layout-spec.md §2.7 for the recommended fetch strategy this
 * mirrors. This function is an obvious, isolated stub — swapping its body
 * for a real fetch call is the entire integration; nothing else in this
 * component needs to change.
 */
async function submitCareersInterest(
  payload: CareersInterestPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  // MOCK ONLY — simulates network latency + a successful response so the
  // full loading/success UI is demonstrable end-to-end before a real
  // backend exists. This must never be mistaken for a working integration.
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { ok: true };
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const NOTE_MAX_LENGTH = 500;
const inputBase =
  "w-full rounded-sm border bg-transparent px-4 py-3 font-sans text-sm text-ink placeholder:text-slate-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory transition-colors duration-200 ease-out";

function inputBorder(hasError?: boolean) {
  return hasError
    ? "border-[color:var(--color-rust)]"
    : "border-slate-deep hover:border-ink focus-visible:border-ink";
}

/**
 * Single-screen, 4-field interest form (careers-page-layout-spec.md §3).
 * Explicitly NOT IntakeForm's multi-step machinery — reuses only the
 * underlying FormField primitive, with its own lighter state set
 * (default/focus/error/loading/success) that mirrors the Contact form's
 * implementation patterns for consistency without the step complexity.
 */
export function CareersInterestForm() {
  // Reveal is scoped to the heading only (data-reveal-item below) — the
  // form card itself is intentionally excluded from scroll-triggered
  // motion so input fields never fade/animate in.
  const revealRef = useScrollReveal<HTMLElement>();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};
    if (form.fullName.trim().length < 2) nextErrors.fullName = "Enter your full name.";
    if (!isValidEmail(form.email)) nextErrors.email = "Enter a valid email address.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setSubmitError(null);

    const payload: CareersInterestPayload = {
      fullName: form.fullName,
      email: form.email,
      areaOfInterest: form.areaOfInterest || undefined,
      note: form.note || undefined,
      submittedAt: new Date().toISOString(),
    };

    const result = await submitCareersInterest(payload);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setSubmitError(result.message);
    }
  }

  function handleRetry() {
    setStatus("idle");
    setSubmitError(null);
  }

  return (
    <section
      ref={revealRef}
      id="interest-form"
      aria-labelledby="interest-form-heading"
      className="bg-ivory py-16 md:py-24"
    >
      <Container>
        <div data-reveal-item>
          <SectionHeader
            eyebrow="Stay on Our Radar"
            title="Tell us a little about yourself."
            headingId="interest-form-heading"
            tone="on-ivory"
            className="mb-10 md:mb-12"
          />
        </div>

        <div className="mx-auto max-w-2xl rounded-sm border border-slate-deep bg-ivory p-6 md:p-12">
          {status === "success" ? (
            <div aria-live="polite" className="flex flex-col items-center gap-6 py-4 text-center">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--color-viridian)]/40 text-[color:var(--color-viridian)]"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                  <path
                    d="M5 12.5l4.5 4.5L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="font-display text-2xl font-normal text-ink">
                Thanks — we&apos;ll keep this on file.
              </h3>
              <p className="max-w-[44ch] font-sans text-sm text-ink/70">
                We&apos;ll reach out if something opens up that fits.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-busy={status === "loading"}>
              {status === "error" && submitError ? (
                <p
                  role="alert"
                  aria-live="assertive"
                  className="mb-6 font-sans text-xs normal-case text-[color:var(--color-rust)]"
                >
                  {submitError}{" "}
                  <a href="mailto:info@ayavacreatives.com" className="underline underline-offset-4">
                    info@ayavacreatives.com
                  </a>
                </p>
              ) : null}

              <div className="flex flex-col gap-5">
                <FormField id="careers-fullName" label="Full Name" required error={errors.fullName}>
                  <input
                    id="careers-fullName"
                    type="text"
                    readOnly={status === "loading"}
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={fieldDescribedBy("careers-fullName", undefined, errors.fullName)}
                    className={`${inputBase} ${inputBorder(Boolean(errors.fullName))}`}
                  />
                </FormField>

                <FormField
                  id="careers-email"
                  label="Email"
                  required
                  error={errors.email}
                  helper="Enter a valid email address."
                >
                  <input
                    id="careers-email"
                    type="email"
                    readOnly={status === "loading"}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@email.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={fieldDescribedBy("careers-email", "Enter a valid email address.", errors.email)}
                    className={`${inputBase} ${inputBorder(Boolean(errors.email))}`}
                  />
                </FormField>

                <FormField id="careers-area" label="Area of Interest (optional)">
                  <select
                    id="careers-area"
                    disabled={status === "loading"}
                    value={form.areaOfInterest}
                    onChange={(e) => update("areaOfInterest", e.target.value)}
                    className={`${inputBase} ${inputBorder(false)}`}
                  >
                    <option value="">Select an area</option>
                    {areaOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField id="careers-note" label="Anything Else? (optional)">
                  <textarea
                    id="careers-note"
                    rows={3}
                    readOnly={status === "loading"}
                    maxLength={NOTE_MAX_LENGTH}
                    value={form.note}
                    onChange={(e) => update("note", e.target.value)}
                    placeholder="Anything you'd like us to know — portfolio link, background, timing."
                    className={`${inputBase} ${inputBorder(false)} resize-none`}
                  />
                </FormField>
              </div>

              <div className="mt-8">
                <Button type="submit" variant="primary" tone="on-ivory" disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send Introduction"}
                </Button>
                {status === "error" ? (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="ml-4 font-sans text-sm text-ink/60 underline-offset-4 hover:underline"
                  >
                    Try Again
                  </button>
                ) : null}
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
