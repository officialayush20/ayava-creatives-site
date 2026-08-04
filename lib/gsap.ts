"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP/ScrollTrigger registration must happen client-side only — importing
// and registering at module scope in a "use client" file is safe under
// Next.js because client components are only evaluated in the browser after
// hydration, but we still guard on `typeof window` to be defensive against
// any future SSR/RSC boundary changes and to avoid double-registration
// warnings in dev's fast-refresh.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Brand-standard scroll-reveal easing — slow, confident, never bouncy. */
export const EASE = "power3.out";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
