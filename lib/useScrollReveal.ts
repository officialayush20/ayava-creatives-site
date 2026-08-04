"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/gsap";

type ScrollRevealOptions = {
  /** Selector (scoped to the container ref) for items to stagger. Defaults to direct children marked with data-reveal-item. */
  itemSelector?: string;
  /** Seconds between each staggered item's start. */
  stagger?: number;
  /** Vertical offset (px) items travel from. */
  y?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** ScrollTrigger start position. */
  start?: string;
  /** Disable the hook entirely (e.g. section handles its own bespoke timeline). */
  disabled?: boolean;
};

/**
 * Shared fade-up-on-scroll pattern used across most homepage sections below
 * the hero: reveal is a single ScrollTrigger per container, firing once when
 * ~20% of the section is visible, with children staggered rather than all
 * animating at once. Respects prefers-reduced-motion by skipping GSAP
 * entirely and leaving elements at their natural (final) CSS state.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>({
  itemSelector = "[data-reveal-item]",
  stagger = 0.06,
  y = 24,
  duration = 0.9,
  start = "top 80%",
  disabled = false,
}: ScrollRevealOptions = {}) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    if (disabled) return;
    if (prefersReducedMotion()) return; // fallback: elements render at final state, no motion created

    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(itemSelector);
    const items = targets.length > 0 ? Array.from(targets) : [container];

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration,
        ease: EASE,
        stagger,
        scrollTrigger: {
          trigger: container,
          start,
          once: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [itemSelector, stagger, y, duration, start, disabled]);

  return containerRef;
}

export { gsap, ScrollTrigger };
