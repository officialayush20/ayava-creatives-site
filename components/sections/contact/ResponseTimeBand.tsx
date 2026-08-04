import { Container } from "@/components/ui/Container";

/**
 * CRITICAL — no fabricated SLA. contact-page-copy.md deliberately does not
 * supply a numeric response-time commitment ("no auto-triage, no ticket
 * queue... as soon as we've actually looked", not a countdown timer), so
 * this band carries that honest qualitative framing rather than inventing
 * an "[X] business hours" figure. Swap in a literal number only once
 * founder sign-off exists — do not let a placeholder number silently ship.
 */
export function ResponseTimeBand() {
  return (
    <section aria-labelledby="response-time-heading" className="bg-ink py-12 md:py-24">
      <Container className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 id="response-time-heading" className="font-display text-[length:var(--type-display-card)] font-normal">
          We personally read every inquiry.
        </h2>
        <p className="mt-4 font-sans text-base text-slate">
          No auto-triage, no ticket queue. We&apos;ll get back to you as soon as we&apos;ve
          actually looked at what you sent, not on a countdown timer.
        </p>
      </Container>
    </section>
  );
}
