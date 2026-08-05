"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type StickyCTAProps = {
  serviceName: string;
};

/**
 * Simplified persistent CTA rather than the full spec'd StickyServiceCTA /
 * StickyMobileCTABar pair (service-page-layout-spec §12) — same deliberate
 * deviation as the original Meta Ads implementation, now parameterized by
 * service name. Two-sentinel show/hide logic preserved: appear after Hero,
 * disappear once the Lead-Capture widget is already in view.
 *
 * Promoted from `components/sections/meta-ads/StickyCTA.tsx`.
 */
export function StickyCTA({ serviceName }: StickyCTAProps) {
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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-surface/95 backdrop-blur transition-opacity duration-200 ease-out motion-reduce:transition-none ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1760px] items-center justify-between gap-4 px-4 py-3 md:px-10">
        <p className="hidden font-sans text-sm text-hairline-strong sm:block">Ready to talk about {serviceName}?</p>
        <Button href="/contact" variant="primary" tone="on-ink" className="w-full sm:w-auto">
          Get a Quote
        </Button>
      </div>
    </div>
  );
}
