import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <section
      aria-labelledby="cta-band-heading"
      className="border-t border-slate-deep bg-ink py-16 md:py-32"
    >
      <Container className="flex flex-col items-center text-center md:px-[16.66%]">
        <h2
          id="cta-band-heading"
          className="font-display text-[clamp(28px,5vw,52px)] font-normal leading-[1.05]"
        >
          Your next campaign shouldn&apos;t be a guess.
        </h2>
        <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Button href="/contact" variant="primary" size="large" className="w-full sm:w-auto">
            Get Free Audit
          </Button>
          <Button href="/contact#call" variant="ghost" size="large" className="w-full sm:w-auto">
            Book a Call
          </Button>
        </div>
      </Container>
    </section>
  );
}
