"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

// Code-split: the three/@react-three/fiber bundle only downloads once this
// component mounts client-side, and only for visitors who pass the
// reduced-motion + WebGL checks below — it never blocks the hero's LCP text.
const HeroLattice = dynamic(() => import("@/components/three/HeroLattice"), {
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
      <div
        className="h-[70%] w-[70%] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-accent) 0%, transparent 2%), " +
            "repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 11%, var(--color-hairline) 11.4%, transparent 11.8%)",
        }}
      />
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

  return <HeroLattice />;
}
