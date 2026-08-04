"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FormField, inputBaseClass, inputBorderClass, fieldDescribedBy } from "./FormField";

const TOTAL_STEPS = 3;

const stepNames = ["Business Info", "Goals & Budget", "Scope & Brief"];

const goalOptions = [
  "More Leads",
  "More Sales",
  "Brand Awareness",
  "Website Traffic",
  "App Installs",
  "Not Sure Yet",
];

const budgetOptions = [
  "Under ₹50,000",
  "₹50,000–₹1,50,000",
  "₹1,50,000–₹5,00,000",
  "₹5,00,000+",
  "Prefer to discuss",
];

// Exact service list per components/sections/ServicesShowcase.tsx — kept as
// its own copy here (not imported) since ServicesShowcase exports a
// section component, not a data module; duplicating a 15-item string list
// is cheaper and safer than reshaping that file's public surface for one
// consumer.
const serviceOptions = [
  "Social Media Marketing (SMM)",
  "Meta Ads",
  "Google Ads",
  "SEO",
  "Website Design",
  "Branding",
  "Content Marketing",
  "Influencer Marketing",
  "Email/CRM Marketing",
  "App Store Marketing/ASO",
  "Video & Motion Production",
  "PR/Reputation Management",
  "E-commerce Growth",
  "Analytics/CRO",
  "AI Marketing",
];

const NOT_SURE_OPTION = "Not sure yet — I need a recommendation";

/**
 * Frontend/backend handoff contract per contact-page-layout-spec §2.7 — the
 * single source of truth `backend-engineer` should build `/api/contact`
 * against.
 */
type ContactFormPayload = {
  fullName: string;
  email: string;
  company?: string;
  role?: string;
  phone?: string;
  website?: string;
  primaryGoal: string;
  goalNotes?: string;
  budgetRange: string;
  servicesNeeded: string[];
  additionalNotes?: string;
  attachedFile?: { name: string; size: number };
  submittedAt: string;
};

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  primaryGoal: string;
  goalNotes: string;
  budgetRange: string;
  servicesNeeded: string[];
  additionalNotes: string;
};

const emptyForm: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  primaryGoal: "",
  goalNotes: "",
  budgetRange: "",
  servicesNeeded: [],
  additionalNotes: "",
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

/**
 * Mock submission — there is no real backend yet.
 * TODO(backend-engineer): wire to real /api/contact endpoint. See
 * docs/contact-page-layout-spec.md §2.7 for the ContactFormPayload shape
 * and the recommended fetch('/api/contact', { method: 'POST', body: FormData | JSON })
 * strategy. This function is an obvious, isolated stub — swapping its body
 * for a real fetch call is the entire integration; nothing else in this
 * component needs to change.
 */
async function submitContactForm(
  payload: ContactFormPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  // MOCK ONLY — simulates network latency + a successful response so the
  // full loading/success UI is demonstrable end-to-end before a real
  // backend exists. This must never be mistaken for a working integration.
  // `payload` isn't sent anywhere yet (see TODO above); referenced here so
  // its shape stays part of this function's real signature for whoever
  // wires up the fetch call, without tripping unused-var lint in the mock.
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 1400));
  return { ok: true };
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function StepIndicator({ current, name }: { current: number; name: string }) {
  const percent = (current / TOTAL_STEPS) * 100;
  return (
    <div className="mb-8">
      <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.14em] text-ivory">
        Step {current} of {TOTAL_STEPS} — {name}
      </p>
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-valuetext={`Step ${current} of ${TOTAL_STEPS}, ${name}`}
        className="h-1 w-full overflow-hidden rounded-full bg-slate-deep"
      >
        <div
          className="h-full rounded-full bg-ivory transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function IntakeForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stepError, setStepError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Shared across the step-1/2/3 <h3> headings below (~line 365+) — safe
  // only because exactly one step's block renders at a time (the others are
  // `null`). If a future refactor ever renders two steps' content
  // simultaneously (e.g. a "review all steps" mode), this ref must be split
  // per-heading or focus-on-step-change will silently target the wrong node.
  const headingRef = useRef<HTMLHeadingElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `Step ${step} of ${TOTAL_STEPS}: ${stepNames[step - 1]}`;
    }
  }, [step]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }

  function toggleService(service: string) {
    setForm((prev) => {
      const isSelected = prev.servicesNeeded.includes(service);
      const next = isSelected
        ? prev.servicesNeeded.filter((item) => item !== service)
        : [...prev.servicesNeeded, service];
      return { ...prev, servicesNeeded: next };
    });
    setStepError(null);
  }

  function validateStep(current: number): boolean {
    const nextErrors: Record<string, string> = {};

    if (current === 1) {
      if (form.fullName.trim().length < 2) nextErrors.fullName = "Enter your full name.";
      if (!isValidEmail(form.email)) nextErrors.email = "Enter a valid email address.";
    }

    if (current === 2) {
      const missing: string[] = [];
      if (!form.primaryGoal) missing.push("a primary goal");
      if (!form.budgetRange) missing.push("a budget range");
      if (missing.length > 0) {
        setStepError(`Select ${missing.join(" and ")} to continue.`);
        return false;
      }
    }

    if (current === 3) {
      if (form.servicesNeeded.length === 0) {
        setStepError("Select at least one service.");
        return false;
      }
    }

    setErrors(nextErrors);
    setStepError(null);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  }

  function goBack() {
    setStepError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  }

  function jumpToStep(target: number) {
    setStepError(null);
    setStep(target);
  }

  function handleFileChange(selected: File | null) {
    setFileError(null);
    if (!selected) {
      setFile(null);
      return;
    }
    const allowed = [".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg"];
    const extension = selected.name.slice(selected.name.lastIndexOf(".")).toLowerCase();
    if (!allowed.includes(extension)) {
      setFileError("That file type isn't supported. Use PDF, DOC, DOCX, PNG, or JPG.");
      return;
    }
    const maxBytes = 20 * 1024 * 1024;
    if (selected.size > maxBytes) {
      setFileError("File is larger than 20MB. Please attach a smaller file.");
      return;
    }
    setFile(selected);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validateStep(1)) {
      setStep(1);
      return;
    }

    setStatus("loading");
    setSubmitError(null);

    const payload: ContactFormPayload = {
      fullName: form.fullName,
      email: form.email,
      company: form.company || undefined,
      phone: form.phone || undefined,
      website: form.website || undefined,
      primaryGoal: form.primaryGoal,
      goalNotes: form.goalNotes || undefined,
      budgetRange: form.budgetRange,
      servicesNeeded: form.servicesNeeded,
      additionalNotes: form.additionalNotes || undefined,
      attachedFile: file ? { name: file.name, size: file.size } : undefined,
      submittedAt: new Date().toISOString(),
    };

    const result = await submitContactForm(payload);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setSubmitError(result.message);
    }
  }

  const currentStepName = stepNames[step - 1];

  return (
    <section id="intake-form" aria-labelledby="intake-form-heading" className="bg-ink py-16 pb-12 md:py-40 md:pb-24">
      <Container>
        <h2 id="intake-form-heading" className="sr-only">
          Let&apos;s Scope Your Project
        </h2>

        {/* Visually-hidden live region announcing step changes, separate
            from the focused heading, per contact-page-layout-spec §2.8. */}
        <div ref={liveRegionRef} aria-live="polite" className="sr-only" />

        <div className="mx-auto max-w-3xl rounded-sm border border-slate bg-ink-raise p-6 md:p-12">
          {/* The rust-error state (stepError/submitError, above) and this
              viridian success state must remain mutually exclusive — never
              rendered in the same viewport. That's currently guaranteed
              structurally (this block replaces the entire form, so the
              error paragraphs above can't co-render with it), not by an
              explicit check — preserve that structure in any future edit. */}
          {status === "success" ? (
            <div aria-live="polite" className="flex flex-col items-center gap-6 py-8 text-center">
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
              <h3 className="font-display text-2xl font-normal">Got It.</h3>
              <p className="max-w-[48ch] font-sans text-sm text-slate">
                Your project details are in front of us now, not a queue. We&apos;ll review what
                you shared and follow up at the email or number you gave us.
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact#alt-contact" variant="secondary" tone="on-ink">
                  Book a Strategy Call Now
                </Button>
                <Button href="/services" variant="ghost" tone="on-ink">
                  Explore Our Services
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-busy={status === "loading"}>
              <StepIndicator current={step} name={currentStepName} />

              {stepError ? (
                <p role="alert" className="mb-6 font-sans text-xs normal-case text-[color:var(--color-rust-raise)]">
                  {stepError}
                </p>
              ) : null}

              {status === "error" && submitError ? (
                <p role="alert" aria-live="assertive" className="mb-6 font-sans text-xs normal-case text-[color:var(--color-rust-raise)]">
                  {submitError}{" "}
                  <a href="mailto:info@ayavacreatives.com" className="underline underline-offset-4">
                    info@ayavacreatives.com
                  </a>
                </p>
              ) : null}

              {step === 1 ? (
                <div className="flex flex-col gap-5">
                  <h3 ref={headingRef} tabIndex={-1} className="font-display text-xl font-normal focus:outline-none">
                    About Your Business
                  </h3>
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <FormField id="fullName" label="Full Name" required error={errors.fullName}>
                      <input
                        id="fullName"
                        type="text"
                        disabled={status === "loading"}
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="Your name"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={fieldDescribedBy("fullName", undefined, errors.fullName)}
                        className={`${inputBaseClass} ${inputBorderClass(Boolean(errors.fullName))}`}
                      />
                    </FormField>
                    <FormField id="company" label="Business/Brand Name">
                      <input
                        id="company"
                        type="text"
                        disabled={status === "loading"}
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        placeholder="Your company or brand"
                        className={`${inputBaseClass} ${inputBorderClass(false)}`}
                      />
                    </FormField>
                  </div>
                  <FormField
                    id="email"
                    label="Email"
                    required
                    error={errors.email}
                    helper="Where we'll send your audit or proposal."
                  >
                    <input
                      id="email"
                      type="email"
                      readOnly={status === "loading"}
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@company.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={fieldDescribedBy("email", "Where we'll send your audit or proposal.", errors.email)}
                      className={`${inputBaseClass} ${inputBorderClass(Boolean(errors.email))}`}
                    />
                  </FormField>
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <FormField id="phone" label="Phone (optional)">
                      <input
                        id="phone"
                        type="tel"
                        disabled={status === "loading"}
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+91"
                        className={`${inputBaseClass} ${inputBorderClass(false)}`}
                      />
                    </FormField>
                    <FormField
                      id="website"
                      label="Website/Social Handle (optional)"
                      helper="So we can look before we talk."
                    >
                      <input
                        id="website"
                        type="text"
                        disabled={status === "loading"}
                        value={form.website}
                        onChange={(e) => update("website", e.target.value)}
                        placeholder="yoursite.com or @handle"
                        aria-describedby={fieldDescribedBy("website", "So we can look before we talk.")}
                        className={`${inputBaseClass} ${inputBorderClass(false)}`}
                      />
                    </FormField>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="flex flex-col gap-6">
                  <h3 ref={headingRef} tabIndex={-1} className="font-display text-xl font-normal focus:outline-none">
                    Goals &amp; Budget
                  </h3>
                  <fieldset>
                    <legend className="mb-3 font-sans text-sm font-medium text-ivory">
                      Primary goal — pick the closest one, we&apos;ll refine it together.
                    </legend>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {goalOptions.map((option) => {
                        const selected = form.primaryGoal === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={selected}
                            disabled={status === "loading"}
                            onClick={() => {
                              update("primaryGoal", option);
                              setStepError(null);
                            }}
                            className={`rounded-sm border px-4 py-3 text-left font-sans text-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-raise disabled:opacity-50 ${
                              selected
                                ? "border-ivory bg-ivory/10 text-ivory"
                                : "border-slate text-slate hover:border-ivory hover:text-ivory"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <FormField id="goalNotes" label="Anything Specific We Should Know? (optional)">
                    <textarea
                      id="goalNotes"
                      rows={4}
                      readOnly={status === "loading"}
                      maxLength={500}
                      value={form.goalNotes}
                      onChange={(e) => update("goalNotes", e.target.value)}
                      placeholder="e.g. 'Our ad costs have doubled and we don't know why.'"
                      aria-describedby="goalNotes-counter"
                      className={`${inputBaseClass} ${inputBorderClass(false)} resize-none`}
                    />
                    <p id="goalNotes-counter" className="mt-2 text-right font-sans text-xs text-slate">
                      {form.goalNotes.length}/500
                    </p>
                  </FormField>
                  <fieldset>
                    <legend className="mb-3 font-sans text-sm text-slate">
                      Monthly marketing budget — this helps us recommend the right scope, not
                      oversell or undersell you.
                    </legend>
                    <div className="flex flex-col gap-3">
                      {budgetOptions.map((option) => {
                        const selected = form.budgetRange === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={selected}
                            disabled={status === "loading"}
                            onClick={() => {
                              update("budgetRange", option);
                              setStepError(null);
                            }}
                            className={`flex items-center justify-between rounded-sm border px-4 py-4 text-left font-sans text-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-raise disabled:opacity-50 ${
                              selected
                                ? "border-ivory bg-ivory/10 text-ivory"
                                : "border-slate text-slate hover:border-ivory hover:text-ivory"
                            }`}
                          >
                            <span>{option}</span>
                            {selected ? (
                              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0">
                                <path d="M4 10.5l3.5 3.5L16 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="flex flex-col gap-8">
                  <h3
                    ref={headingRef}
                    tabIndex={-1}
                    aria-describedby="services-helper"
                    className="font-display text-xl font-normal focus:outline-none"
                  >
                    Scope &amp; Brief
                  </h3>
                  <p id="services-helper" className="font-sans text-sm text-slate">
                    Select as many as apply. Not sure? Select &ldquo;Not sure yet&rdquo; below and
                    we&apos;ll help you figure it out.
                  </p>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {serviceOptions.map((service) => {
                      const selected = form.servicesNeeded.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          aria-pressed={selected}
                          disabled={status === "loading"}
                          onClick={() => toggleService(service)}
                          className={`flex min-h-[56px] items-center justify-between gap-3 rounded-sm border px-4 py-3 text-left font-sans text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-raise disabled:opacity-50 ${
                            selected
                              ? "border-ivory bg-ivory/10 text-ivory"
                              : "border-slate text-slate hover:border-ivory hover:text-ivory"
                          }`}
                        >
                          <span>{service}</span>
                          {selected ? (
                            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0">
                              <path d="M4 10.5l3.5 3.5L16 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : null}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      aria-pressed={form.servicesNeeded.includes(NOT_SURE_OPTION)}
                      disabled={status === "loading"}
                      onClick={() => toggleService(NOT_SURE_OPTION)}
                      className={`flex min-h-[56px] items-center justify-between gap-3 rounded-sm border px-4 py-3 text-left font-sans text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-raise disabled:opacity-50 md:col-span-2 xl:col-span-3 ${
                        form.servicesNeeded.includes(NOT_SURE_OPTION)
                          ? "border-ivory bg-ivory/10 text-ivory"
                          : "border-slate text-slate hover:border-ivory hover:text-ivory"
                      }`}
                    >
                      <span>{NOT_SURE_OPTION}</span>
                      {form.servicesNeeded.includes(NOT_SURE_OPTION) ? (
                        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0">
                          <path d="M4 10.5l3.5 3.5L16 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </button>
                  </div>

                  <FormField id="additionalNotes" label="Anything else? (optional)">
                    <textarea
                      id="additionalNotes"
                      rows={5}
                      disabled={status === "loading"}
                      value={form.additionalNotes}
                      onChange={(e) => update("additionalNotes", e.target.value)}
                      placeholder="Timeline, past agency experience, anything else worth knowing."
                      className={`${inputBaseClass} ${inputBorderClass(false)} resize-none`}
                    />
                  </FormField>

                  <div>
                    <label className="mb-2 block font-sans text-sm font-medium text-ivory">
                      Upload a brief or reference file (optional)
                    </label>
                    <p className="mb-3 font-sans text-xs text-slate">
                      PDF, DOC, or slide deck — brand guidelines, RFP, whatever you&apos;ve
                      already got. Under 20MB.
                    </p>
                    {file ? (
                      <div className="flex items-center justify-between rounded-sm border border-slate px-4 py-3">
                        <span className="font-sans text-sm text-ivory">
                          {file.name} <span className="text-slate">({Math.round(file.size / 1024)} KB)</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleFileChange(null)}
                          disabled={status === "loading"}
                          className="font-sans text-xs text-slate underline-offset-4 hover:text-ivory hover:underline disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-slate px-4 py-6 text-center">
                        <p className="font-sans text-xs text-slate">Drag a file here, or</p>
                        <label className="cursor-pointer rounded-full border border-slate px-5 py-2 font-sans text-sm text-ivory transition-colors duration-200 ease-out hover:border-ivory focus-within:outline-none focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 focus-within:ring-offset-ink-raise">
                          Browse files
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            disabled={status === "loading"}
                            onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    )}
                    {fileError ? (
                      <p role="alert" className="mt-2 font-sans text-xs normal-case text-[color:var(--color-rust-raise)]">
                        {fileError}
                      </p>
                    ) : null}
                  </div>

                  <div className="border-t border-slate-deep pt-6">
                    <h4 className="mb-4 font-sans text-sm font-medium uppercase tracking-[0.14em] text-slate">
                      Review
                    </h4>
                    <dl className="flex flex-col divide-y divide-slate-deep">
                      {[
                        { label: "Name", value: form.fullName || "—", step: 1 },
                        { label: "Email", value: form.email || "—", step: 1 },
                        { label: "Company", value: form.company || "—", step: 1 },
                        { label: "Goal", value: form.primaryGoal || "—", step: 2 },
                        { label: "Budget", value: form.budgetRange || "—", step: 2 },
                        {
                          label: "Services",
                          value: form.servicesNeeded.length ? form.servicesNeeded.join(", ") : "—",
                          step: 3,
                        },
                      ].map((row) => (
                        <div key={row.label} className="flex items-start justify-between gap-4 py-3">
                          <div>
                            <dt className="font-sans text-xs uppercase tracking-[0.1em] text-slate">{row.label}</dt>
                            <dd className="mt-1 font-sans text-sm text-ivory">{row.value}</dd>
                          </div>
                          <button
                            type="button"
                            onClick={() => jumpToStep(row.step)}
                            disabled={status === "loading"}
                            className="shrink-0 font-sans text-xs text-slate underline-offset-4 hover:text-ivory hover:underline disabled:opacity-50"
                          >
                            Edit
                          </button>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <p className="font-sans text-xs text-slate">
                    We personally read every inquiry — no auto-triage, no ticket queue. We&apos;ll
                    get back to you as soon as we&apos;ve actually looked at what you sent, not on
                    a countdown timer.
                  </p>
                </div>
              ) : null}

              <div className="mt-12 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 1 || status === "loading"}
                  className="font-sans text-sm text-slate underline-offset-4 hover:text-ivory hover:underline disabled:pointer-events-none disabled:opacity-30"
                >
                  Back
                </button>
                {step < TOTAL_STEPS ? (
                  <Button type="button" onClick={goNext} variant="primary" tone="on-ink" size="large">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" variant="primary" tone="on-ink" size="large" disabled={status === "loading"}>
                    {status === "loading" ? "Sending…" : "Send It Over"}
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
