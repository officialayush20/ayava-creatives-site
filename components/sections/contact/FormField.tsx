"use client";

import { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  helper?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Label + input slot + helper/error message wrapper, reused across every
 * step of the intake form. Error copy uses the rust-raise token (this card
 * sits on the ink-raise dark surface) per the creative-director's usage
 * rules in globals.css: text only, never bold/uppercase, never > 14px, no
 * animation. Pass the id returned by `fieldDescribedBy` as the input's own
 * `aria-describedby` at the call site (this wrapper renders the message
 * elements but doesn't own the actual `<input>`).
 */
export function FormField({ id, label, error, helper, required, className = "", children }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block font-sans text-sm font-medium text-ivory">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-slate">
            *
          </span>
        ) : null}
      </label>
      {children}
      <div aria-live="polite">
        {helper && !error ? (
          <p id={`${id}-helper`} className="mt-2 font-sans text-xs text-slate">
            {helper}
          </p>
        ) : null}
        {error ? (
          <p id={`${id}-error`} className="mt-2 font-sans text-xs normal-case text-[color:var(--color-rust-raise)]">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function fieldDescribedBy(id: string, helper?: string, error?: string) {
  return [helper && !error ? `${id}-helper` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ") || undefined;
}

export const inputBaseClass =
  "w-full rounded-sm border bg-transparent px-4 py-3 font-sans text-sm text-ivory placeholder:text-slate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-raise transition-colors duration-200 ease-out";

export function inputBorderClass(hasError?: boolean) {
  return hasError
    ? "border-[color:var(--color-rust-raise)]"
    : "border-slate hover:border-ivory focus-visible:border-ivory";
}
