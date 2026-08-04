import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <section
      aria-labelledby="cta-band-heading"
      className="bg-ivory py-16 md:py-32"
    >
      <Container className="flex flex-col items-center text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <h2
            id="cta-band-heading"
            className="font-display text-[clamp(28px,5vw,52px)] font-normal leading-[1.05] text-ink"
          >
            Your next campaign shouldn&apos;t be a guess.
          </h2>
          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Button
              href="/contact"
              variant="primary"
              tone="on-ivory"
              size="large"
              className="w-full sm:w-auto"
            >
              Get Free Audit
            </Button>
            <Button
              href="/contact#call"
              variant="ghost"
              tone="on-ivory"
              size="large"
              className="w-full sm:w-auto"
            >
              Book a Call
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
