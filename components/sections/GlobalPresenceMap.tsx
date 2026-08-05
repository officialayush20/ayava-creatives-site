"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Deterministic pseudo-random generator (mulberry32) so the dot field is
 * identical on server and client — avoids hydration mismatches that
 * Math.random() would cause in a "use client" component still SSR'd once.
 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Dehradun's position within the visual's abstract coordinate space (not a
// literal equirectangular projection — see component doc comment below).
const HQ = { x: 30, y: 46 };

type Dot = { x: number; y: number; r: number; o: number };

function buildDotField(): Dot[] {
  const rand = mulberry32(1337);
  const dots: Dot[] = [];
  for (let i = 0; i < 220; i++) {
    const x = rand() * 100;
    const y = rand() * 100;
    const dist = Math.hypot(x - HQ.x, (y - HQ.y) * 1.4);
    // Density/brightness falls off with distance from HQ — visually honest
    // to "Dehradun HQ, growing set of regions": the field reads as organic
    // reach radiating outward, not a fixed set of claimed office markers.
    const falloff = Math.max(0, 1 - dist / 78);
    if (rand() > falloff * 0.9 + 0.06) continue;
    dots.push({
      x,
      y,
      r: 0.5 + falloff * 1.1 + rand() * 0.4,
      o: 0.12 + falloff * 0.55 + rand() * 0.15,
    });
  }
  return dots;
}

const DOTS = buildDotField();

/**
 * Abstract, non-literal "reach" visual for the Global Presence section.
 *
 * Deliberately not a rotating 3D globe or a labelled world map with pinned
 * office markers — both would either read as a generic agency-site cliché
 * (the globe) or overclaim scale the business doesn't have (pins imply
 * confirmed offices in named countries, which isn't true; Dehradun is the
 * only confirmed location). Instead this renders a single confirmed HQ
 * point with concentric pulses and a density-graded dot field that thins
 * out toward the edges — legible as "one real base, open/growing reach"
 * rather than "we have offices everywhere."
 *
 * Built as layered SVG/CSS with a scroll-scrubbed parallax (via the same
 * GSAP/ScrollTrigger stack already loaded for the page's other scroll
 * reveals) rather than a second WebGL canvas: the homepage already carries
 * one Three.js hero bundle elsewhere, and a second live WebGL context on
 * the same page would cost real frame budget for a secondary, below-the-
 * fold section that reads best restrained anyway. This keeps the section
 * static-renderable (no canvas, no lazy JS bundle to code-split) while
 * still achieving genuine depth: three parallax layers moving at different
 * scroll-scrub rates, elevation via drop-shadow, and a gradient vignette.
 */
export function GlobalPresenceMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<SVGGElement>(null);
  const midRef = useRef<SVGGElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return; // fallback: static layout, no parallax, no pulse animation
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.to(backRef.current, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(midRef.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(frontRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="relative mx-auto aspect-[2/1] w-full max-w-4xl overflow-hidden rounded-sm border border-hairline bg-surface-raise"
    >
      {/* Base elevation gradient — reads as depth without a literal ground plane */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background:
            "radial-gradient(60% 70% at 30% 46%, var(--color-accent) 0%, transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 100 50"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {/* Back layer: density-graded dot field, thinning toward the edges */}
        <g ref={backRef}>
          {DOTS.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y * 0.5}
              r={d.r * 0.35}
              className="fill-hairline-strong"
              opacity={d.o}
            />
          ))}
        </g>

        {/* Mid layer: concentric pulse rings radiating from the HQ point */}
        <g ref={midRef}>
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={HQ.x}
              cy={HQ.y * 0.5}
              r={2}
              className="global-presence-ring fill-none stroke-accent"
              strokeWidth={0.15}
              style={{ animationDelay: `${i * 1.4}s` }}
            />
          ))}
        </g>
      </svg>

      {/* Front layer: the confirmed HQ marker, elevated above the field */}
      <div
        ref={frontRef}
        className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
        style={{ left: `${HQ.x}%`, top: `${HQ.y}%` }}
      >
        <span
          className="global-presence-dot relative flex h-2.5 w-2.5 items-center justify-center rounded-full bg-accent"
          style={{ filter: "drop-shadow(0 2px 6px var(--color-accent))" }}
        />
        <span className="whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.2em] text-content">
          Dehradun &mdash; HQ
        </span>
      </div>
    </div>
  );
}
