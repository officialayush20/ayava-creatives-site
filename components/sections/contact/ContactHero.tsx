import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Intentionally the shortest, quietest hero on the site (~48vh, ivory, no
 * video/canvas/count-up) per contact-page-layout-spec §1 — this page should
 * feel like a fast lane, not another cinematic pitch, and stays fast-loading
 * since it's the site's highest-intent page.
 */
export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="flex min-h-[48vh] items-center bg-inverse-surface bg-[image:var(--gradient-dawn-mesh)] bg-cover py-16 md:py-24"
    >
      <Container className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-hairline">
          Start a Project
        </p>
        <h1 className="font-display text-[length:var(--type-display-hero)] font-normal leading-[1.05] text-inverse-content">
          Tell Us What You&apos;re Trying to Fix.
        </h1>
        <p className="mt-5 max-w-[52ch] font-sans text-base text-inverse-content/70 md:text-lg">
          No sales script, no discovery-call theater — just tell us where your marketing is
          leaking, and we&apos;ll tell you plainly whether we&apos;re the right team to fix it.
        </p>
        <div className="mt-8">
          <Button href="#intake-form" variant="primary" tone="on-ivory" size="large">
            Start the Intake Form
          </Button>
        </div>
        <a
          href="#alt-contact"
          className="mt-6 font-sans text-sm text-inverse-content/60 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface"
        >
          Prefer to talk first? Jump to contact options ↓
        </a>
      </Container>
    </section>
  );
}
