"use client";

import { useEffect, useLayoutEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Mounts Lenis smooth scroll globally and syncs it with GSAP's ScrollTrigger
 * (which drives all section reveal animations). Renders nothing.
 *
 * Reduced-motion fallback: when the user has requested reduced motion, Lenis
 * is never instantiated — native browser scroll takes over untouched, and
 * ScrollTrigger-driven reveals are separately skipped at the section level
 * (see lib/useScrollReveal.ts), so there is no motion-dependent behavior
 * left active for these users.
 */
export function SmoothScrollProvider() {
  // Belt-and-suspenders alongside the inline `history.scrollRestoration =
  // 'manual'` script in app/layout.tsx's <head> (that's the actual fix for
  // the browser restoring a stale scrollY on load — see comment there).
  // useLayoutEffect fires before paint, so if anything still lands us away
  // from the top (e.g. scrollRestoration support gaps in some browsers),
  // this corrects it before the user ever sees the wrong position.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // cubic-out, matches brand easing feel
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return null;
}
