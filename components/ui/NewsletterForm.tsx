"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

/** Email input + submit, with full default/loading/success/error state set. */
export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    // No backend wired up yet — simulate submit so the interaction states
    // are demonstrably correct; replace with real endpoint when available.
    window.setTimeout(() => {
      setStatus("success");
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
          aria-invalid={status === "error"}
          className="w-full border-b border-hairline-strong bg-transparent px-1 py-2 font-sans text-sm text-content placeholder:text-hairline-strong focus-visible:outline-none focus-visible:border-accent"
        />
        {status === "error" ? (
          <p id="newsletter-error" role="alert" className="mt-2 font-sans text-xs text-content">
            {errorMessage}
          </p>
        ) : null}
        {status === "success" ? (
          <p aria-live="polite" className="mt-2 font-sans text-xs text-hairline-strong">
            You&apos;re on the list.
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 rounded-full border border-hairline-strong px-6 py-2 font-sans text-sm font-medium text-content transition-colors duration-200 ease-out hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Subscribe"}
      </button>
    </form>
  );
}
