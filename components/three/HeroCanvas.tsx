"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

// Code-split: the three/@react-three/fiber bundle only downloads once this
// component mounts client-side, and only for visitors who pass the
// reduced-motion + WebGL checks below — it never blocks the hero's LCP text.
// Renders the real Ayava mark as a 3D plaque (components/three/HeroLogoObject.tsx).
// The earlier abstract grid-lattice (components/three/HeroLattice.tsx) is kept
// in the repo for reference/reuse but no longer mounted here.
const HeroLogoObject = dynamic(() => import("@/components/three/HeroLogoObject"), {
  ssr: false,
});

function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Static, theme-aware stand-in for the 3D lattice — rendered for
 * prefers-reduced-motion users, WebGL-unsupported browsers, and as the
 * instant-paint state before the 3D bundle finishes loading. CSS-only, no
 * network request, so it never affects LCP.
 */
function StaticFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="h-[60%] w-[80%] rounded-sm border border-hairline opacity-70" />
    </div>
  );
}

/**
 * Client-only capability gate for HeroLattice. Renders StaticFallback until
 * proven safe to mount the real canvas: reduced-motion preference and WebGL
 * support are both checked before the lazy 3D bundle is even requested.
 */
export function HeroCanvas() {
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!supportsWebGL()) return;
    setCanRender3D(true);
  }, []);

  if (!canRender3D) {
    return <StaticFallback />;
  }

  return <HeroLogoObject />;
}
