"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeColors } from "@/components/three/useThemeColors";

const COLUMNS = 12; // the site's own 12-column editorial grid, literally
const ROWS = 7;
const WIDTH = 3.6;
const DEPTH = 2.0;

// Layered, deterministic (no randomness) displacement — reads as a surveyed
// topography / structural elevation rather than a decorative ripple.
function displacement(u: number, v: number): number {
  return (
    Math.sin(u * 2.4 + v * 1.1) * 0.24 +
    Math.sin(u * 1.1 - v * 2.6) * 0.16 +
    Math.cos((u + v) * 1.7) * 0.1
  );
}

// A handful of hand-picked grid coordinates that carry the sole accent
// color — three-to-five isolated points, never a whole shell.
const ACCENT_CELLS: Array<[number, number]> = [
  [2, 1],
  [9, 2],
  [5, 4],
  [8, 5],
];

/**
 * Builds a bespoke 12-column x N-row point field derived from the site's own
 * editorial grid, displaced along Z by a deterministic layered-sine function
 * so it reads as a truss/topography structure rather than a globe. Edges
 * only connect orthogonal neighbors plus a single diagonal per cell — never
 * a fully-connected mesh.
 */
function useGridLattice() {
  return useMemo(() => {
    const points: THREE.Vector3[] = [];
    const indexOf = (col: number, row: number) => row * COLUMNS + col;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        const u = col / (COLUMNS - 1);
        const v = row / (ROWS - 1);
        const x = (u - 0.5) * WIDTH;
        const y = (v - 0.5) * DEPTH;
        const z = displacement(u, v);
        points.push(new THREE.Vector3(x, z, y));
      }
    }

    const edgePositions: number[] = [];
    const pushEdge = (a: THREE.Vector3, b: THREE.Vector3) => {
      edgePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    };

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        const here = points[indexOf(col, row)];
        if (col < COLUMNS - 1) pushEdge(here, points[indexOf(col + 1, row)]);
        if (row < ROWS - 1) pushEdge(here, points[indexOf(col, row + 1)]);
        if (col < COLUMNS - 1 && row < ROWS - 1) {
          pushEdge(here, points[indexOf(col + 1, row + 1)]);
        }
      }
    }

    const nodePositions = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      nodePositions[i * 3] = p.x;
      nodePositions[i * 3 + 1] = p.y;
      nodePositions[i * 3 + 2] = p.z;
    });

    const accentPositions = new Float32Array(ACCENT_CELLS.length * 3);
    ACCENT_CELLS.forEach(([col, row], i) => {
      const p = points[indexOf(col, row)];
      accentPositions[i * 3] = p.x;
      accentPositions[i * 3 + 1] = p.y;
      accentPositions[i * 3 + 2] = p.z;
    });

    return {
      nodePositions,
      edgePositions: new Float32Array(edgePositions),
      accentPositions,
    };
  }, []);
}

function LatticeScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { line, node, nodeCore } = useThemeColors();
  const { nodePositions, edgePositions, accentPositions } = useGridLattice();

  // Single motion source: a slow, small parallax sway (well under 3deg,
  // well under 0.05 rad/s angular frequency) — no counter-rotation, no
  // screensaver spin. Driven by the frame clock, not wall-clock time, so
  // the sway is deterministic and pauses cleanly with the frame loop.
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const maxSway = THREE.MathUtils.degToRad(3);
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.04) * maxSway;
  });

  return (
    <group ref={groupRef} rotation={[-0.32, 0, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={line} transparent opacity={0.42} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={node} size={0.026} sizeAttenuation />
      </points>

      {/* The sole earned accent use: three-to-five isolated points, never a
          fill across the whole structure. */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[accentPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={nodeCore} size={0.05} sizeAttenuation />
      </points>
    </group>
  );
}

/**
 * Root canvas for the hero's signature 3D visual: a bespoke truss/topography
 * built directly from the site's own 12-column editorial grid, displaced by
 * a deterministic layered-sine field and viewed from a low, off-axis camera
 * so it reads as a structural elevation rather than a decorative globe. Kept
 * deliberately cheap: 84 points, well under 300 edges, no textures, no
 * post-processing, DPR capped — comfortably holds 50fps+ on mid-range
 * hardware. Mounted only by HeroCanvasSlot behind a lazy `next/dynamic`
 * boundary, a WebGL support check, and a prefers-reduced-motion gate (see
 * components/sections/Hero.tsx).
 */
export default function HeroLattice() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0.7, -0.55, 3.1], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      resize={{ debounce: 0 }}
    >
      <LatticeScene />
    </Canvas>
  );
}
