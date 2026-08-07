"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeColors } from "@/components/three/useThemeColors";

/**
 * The hero's signature 3D visual: the actual Ayava mark, rendered as a
 * floating plaque rather than an abstract stand-in. A solid card (theme-
 * colored) carries the real logo texture on a slightly raised front plane,
 * so the mark reads as an embossed object, not a flat decal. Replaces the
 * earlier abstract grid-lattice placeholder (components/three/HeroLattice.tsx,
 * kept in the repo for reference/reuse elsewhere, no longer mounted here).
 */
function LogoPlaqueScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { card, cardEdge, isDark } = useThemeColors();
  const texturePath = isDark ? "/logo-icon-dark.png" : "/logo-icon.png";
  const texture = useLoader(THREE.TextureLoader, texturePath);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
  }, [texture]);

  // Slow continuous turn, appropriate for a discrete recognizable object
  // (unlike the old abstract lattice, a logo plaque reads as intentional
  // rather than "screensaver" at this speed) — one full revolution ~46s,
  // plus a gentle bob so it never looks perfectly mechanical.
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.135;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef} rotation={[-0.18, 0, 0]}>
      {/* Card — gives the plaque real depth/shadowing */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.9, 1.9, 0.14]} />
        <meshStandardMaterial color={card} roughness={0.55} metalness={0.08} />
      </mesh>

      {/* Hairline edge, same family as the site's rule color */}
      <mesh>
        <boxGeometry args={[1.94, 1.94, 0.1]} />
        <meshBasicMaterial color={cardEdge} wireframe transparent opacity={0.25} />
      </mesh>

      {/* The real mark, raised slightly proud of the card face, unlit so
          its true brand colors render without scene-light tinting. */}
      <mesh position={[0, 0, 0.075]}>
        <planeGeometry args={[1.55, 1.55]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/**
 * Root canvas — mirrors HeroLattice's performance profile: capped DPR,
 * low-power GPU preference, single draw call worth of geometry, no
 * post-processing. Mounted only behind the same reduced-motion + WebGL gate
 * (components/three/HeroCanvas.tsx).
 */
export default function HeroLogoObject() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0.6, 0.35, 3.4], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      resize={{ debounce: 0 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 4]} intensity={0.9} />
      <directionalLight position={[-2, -1, -3]} intensity={0.25} />
      <Suspense fallback={null}>
        <LogoPlaqueScene />
      </Suspense>
    </Canvas>
  );
}
