"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Simplified persistent CTA rather than the full spec'd StickyServiceCTA /
 * StickyMobileCTABar pair (service-page-layout-spec §12). Deviation, noted:
 * the full spec calls for two responsive shells with IntersectionObserver
 * sentinels on both the Hero and the Lead-Capture/Footer boundary, an
 * icon-collapsed 1024 state, and a dedicated compact Button size token. That
 * is a reasonable amount of net-new surface for a single-page CTA whose job
 * is simple: "always give a scrolled-past-hero visitor a way back to
 * Contact." This implementation keeps the two-sentinel show/hide logic (the
 * core UX requirement — appear after Hero, disappear once the Lead-Capture
 * widget is already in view so we never show two competing CTAs at once)
 * but renders one bottom-docked bar at every breakpoint instead of a
 * separate desktop right-rail shell, and reuses the existing `Button`
 * sizes rather than introducing a new compact variant. Placed early in DOM
 * order (rendered right after the Hero) so it never breaks natural tab
 * order for keyboard users, positioned visually via `fixed`.
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.querySelector('[aria-labelledby="service-hero-heading"]');
    const leadCaptureSection = document.querySelector('[aria-labelledby="lead-capture-heading"]');
    if (!heroSection || !leadCaptureSection) return;

    let heroVisible = true;
    let leadCaptureVisible = false;

    function update() {
      setVisible(!heroVisible && !leadCaptureVisible);
    }

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );
    const leadCaptureObserver = new IntersectionObserver(
      ([entry]) => {
        leadCaptureVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );

    heroObserver.observe(heroSection);
    leadCaptureObserver.observe(leadCaptureSection);

    return () => {
      heroObserver.disconnect();
      leadCaptureObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-deep bg-ink/95 backdrop-blur transition-opacity duration-200 ease-out motion-reduce:transition-none ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1760px] items-center justify-between gap-4 px-4 py-3 md:px-10">
        <p className="hidden font-sans text-sm text-slate sm:block">Ready to talk about Meta Ads?</p>
        <Button href="/contact" variant="primary" tone="on-ink" className="w-full sm:w-auto">
          Get a Quote
        </Button>
      </div>
    </div>
  );
}
