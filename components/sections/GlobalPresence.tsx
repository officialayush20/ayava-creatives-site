import { Container } from "@/components/ui/Container";

/**
 * Static/CSS-only placeholder in place of a real map graphic (the
 * webgl-3d-artist / illustration pass comes later). The location list below
 * is the accessible source of truth, not the decorative graphic.
 */
function MapPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex aspect-[2/1] w-full max-w-4xl items-center justify-center overflow-hidden rounded-sm border border-slate-deep bg-ink-raise"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,var(--color-slate-deep)_0%,transparent_55%)]" />
      <span className="relative h-2 w-2 rounded-full border border-gold bg-ivory" />
      <span className="absolute font-sans text-xs uppercase tracking-[0.2em] text-slate">
        Map graphic pending
      </span>
    </div>
  );
}

export function GlobalPresence() {
  return (
    <section aria-labelledby="global-presence-heading" className="bg-ink py-16 md:py-40">
      <Container>
        <h2
          id="global-presence-heading"
          className="max-w-2xl font-display text-[clamp(28px,4vw,44px)] font-normal leading-[1.05]"
        >
          Based in Dehradun. Built for anywhere.
        </h2>
        <p className="mt-6 max-w-xl font-sans text-sm text-slate">
          Ayava Creatives operates from Dehradun, India, serving clients across a growing set of
          regions with the same operating system: audit, architect, build, measure, scale.
        </p>

        <div className="mt-16">
          <MapPlaceholder />
        </div>

        <div className="mt-12">
          <h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
            Locations
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
            <li className="font-sans text-sm text-ivory">Dehradun, India &mdash; Headquarters</li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
