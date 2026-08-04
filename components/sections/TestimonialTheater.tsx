import { Container } from "@/components/ui/Container";

export type Testimonial = {
  quote: string;
  name: string;
  company: string;
  videoSrc?: string;
  posterSrc?: string;
};

type TestimonialTheaterProps = {
  testimonials: Testimonial[];
};

/**
 * No real client testimonials/video exist yet (copy doc: "do not publish
 * placeholder quotes as if real"). This component is built to spec so it's
 * ready to receive real content, but is NOT composed into the live
 * homepage until `testimonials` has real, approved entries — per the
 * honesty rule. Currently omitted from app/page.tsx.
 */
export function TestimonialTheater({ testimonials }: TestimonialTheaterProps) {
  if (testimonials.length === 0) {
    return (
      <section
        aria-labelledby="testimonial-theater-heading"
        className="bg-ink py-16 md:py-40"
      >
        <Container className="text-center">
          <h2 id="testimonial-theater-heading" className="font-display text-2xl font-normal">
            Client stories, coming soon.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-sm text-slate">
            We&apos;re collecting and approving real client testimonials before publishing this
            section.
          </p>
        </Container>
      </section>
    );
  }

  const [active] = testimonials;

  return (
    <section aria-labelledby="testimonial-theater-heading" className="bg-ink py-16 md:py-40">
      <Container>
        <h2 id="testimonial-theater-heading" className="sr-only">
          What clients say
        </h2>
        <blockquote className="mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl font-normal leading-snug md:text-3xl">
            &ldquo;{active.quote}&rdquo;
          </p>
          <footer className="mt-6 font-sans text-sm text-slate">
            {active.name}, {active.company}
          </footer>
        </blockquote>
      </Container>
    </section>
  );
}
