import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Honest "not hiring, but interested" hero (careers-page-layout-spec.md
 * §1) — shortest hero class on the site, ivory, centered. Warm framing:
 * never states the closed-door fact without immediately pivoting to the
 * invitation.
 */
export function CareersHero() {
  return (
    <section
      aria-labelledby="careers-hero-heading"
      className="flex min-h-[50vh] items-center bg-ivory py-16 md:py-24"
    >
      <Container className="flex max-w-3xl flex-col">
        <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate-deep">
          Careers
        </p>
        <h1 className="font-display text-[clamp(32px,4.5vw,60px)] font-normal leading-[1.05] text-ink">
          We&apos;re not hiring right now — but we&apos;d still like to hear from you.
        </h1>
        <p className="mt-5 max-w-[52ch] font-sans text-base text-ink/70 md:text-lg">
          Ayava is a lean, founder-led studio today. When that changes, I&apos;d rather already
          know who&apos;s interested than start from zero. Tell me a bit about yourself below.
        </p>
        <div className="mt-8">
          <Button href="#interest-form" variant="primary" tone="on-ivory" size="large">
            Introduce Yourself
          </Button>
        </div>
      </Container>
    </section>
  );
}
