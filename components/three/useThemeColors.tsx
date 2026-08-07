"use client";

import { useEffect, useState } from "react";

type LatticeColors = {
  /** Outer shell edges — restrained, low-opacity structural lines. */
  line: string;
  /** Outer shell nodes — faint, same family as body/content color. */
  node: string;
  /** Inner shell (edges + nodes) — the one earned accent use per brand rule. */
  nodeCore: string;
  /** HeroLogoObject plaque body color. */
  card: string;
  /** HeroLogoObject plaque hairline wireframe color. */
  cardEdge: string;
  /** True when the current theme is dark — lets consumers swap texture assets. */
  isDark: boolean;
};

const DARK: LatticeColors = {
  line: "#2a2d30", // --color-slate-deep
  node: "#8a8c8f", // --color-slate
  nodeCore: "#cba135", // --color-gold — sole accent, inner shell only
  card: "#1c1f22", // --color-slate-deep family, slightly raised off pure ink
  cardEdge: "#8a8c8f", // --color-slate
  isDark: true,
};

const LIGHT: LatticeColors = {
  line: "#b6b5c1", // --color-rule-strong
  node: "#61647a", // --color-graphite-muted
  nodeCore: "#0b39a8", // --color-cobalt — sole accent, inner shell only
  card: "#fcf9f8", // --color-porcelain-raise
  cardEdge: "#b6b5c1", // --color-rule-strong
  isDark: false,
};

/**
 * Reads `<html data-theme>` and returns the lattice's theme-appropriate
 * colors, updating live when ThemeToggle flips the attribute (no reload
 * required, matching the rest of the site's instant theme-switch behavior).
 */
export function useThemeColors(): LatticeColors {
  const [colors, setColors] = useState<LatticeColors>(() => {
    if (typeof document === "undefined") return DARK;
    return document.documentElement.dataset.theme === "light" ? LIGHT : DARK;
  });

  useEffect(() => {
    const root = document.documentElement;

    const read = () => {
      setColors(root.dataset.theme === "light" ? LIGHT : DARK);
    };
    read();

    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return colors;
}
