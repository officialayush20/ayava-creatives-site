import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Client Portal Login | Ayava Creatives",
  robots: { index: false, follow: false },
};

export default function PortalLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface py-24">
      <Container className="max-w-md">
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="font-display text-lg font-normal text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Ayava Creatives
          </Link>
          <h1 className="mt-6 font-display text-3xl font-normal text-content">Client Portal</h1>
          <p className="mt-2 font-sans text-sm text-content-body">
            Sign in to view your campaign performance, reports, and billing.
          </p>
        </div>

        <div className="rounded-sm border border-hairline bg-surface-raise p-8">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center font-sans text-xs text-content-muted">
          Not a client yet?{" "}
          <Link href="/contact" className="text-content underline underline-offset-4 hover:text-accent">
            Get in touch
          </Link>{" "}
          to start a project.
        </p>
      </Container>
    </main>
  );
}
