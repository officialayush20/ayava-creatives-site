"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { FormField, inputBaseClass, inputBorderClass, fieldDescribedBy } from "@/components/sections/contact/FormField";

/**
 * Single-admin credentials login for the portal shell (see lib/auth.ts).
 * No "forgot password" flow — out of scope until real client accounts
 * exist, per the founder's own reset path (update PORTAL_ADMIN_PASSWORD_HASH
 * directly in the secrets manager/env).
 */
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);
    setSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setSubmitting(false);

    if (!result || result.error) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    const from = searchParams.get("from");
    router.push(from && from.startsWith("/portal") ? from : "/portal/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <FormField id="portal-email" label="Email" required>
        <input
          id="portal-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={`${inputBaseClass} ${inputBorderClass(Boolean(error))}`}
        />
      </FormField>

      <FormField id="portal-password" label="Password" required error={error}>
        <input
          id="portal-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-describedby={fieldDescribedBy("portal-password", undefined, error)}
          className={`${inputBaseClass} ${inputBorderClass(Boolean(error))}`}
        />
      </FormField>

      <Button type="submit" variant="primary" size="default" className="w-full" disabled={submitting}>
        {submitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
