"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeColors } from "@/components/three/useThemeColors";

/**
 * Builds a low-poly icosphere "shell" of nodes plus the edges between
 * nearby nodes, evoking a wireframe systems/network diagram rather than a
 * decorative primitive. Deterministic (no randomness) so SSR/CSR and repeat
 * mounts are always identical.
 */
function useLatticeGeometry(detail: number, radius: number) {
  return useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(radius, detail);
    const posAttr = ico.getAttribute("position");
    const vertexCount = posAttr.count;

    // De-duplicate vertices (IcosahedronGeometry emits duplicates at
    // triangle seams) so edges don't double up and nodes don't overdraw.
    const key = (x: number, y: number, z: number) =>
      `${x.toFixed(3)}_${y.toFixed(3)}_${z.toFixed(3)}`;
    const uniquePoints: THREE.Vector3[] = [];
    const seen = new Map<string, number>();
    for (let i = 0; i < vertexCount; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
      const k = key(v.x, v.y, v.z);
      if (!seen.has(k)) {
        seen.set(k, uniquePoints.length);
        uniquePoints.push(v);
      }
    }

    // Edges: connect each unique point to its nearest neighbors within a
    // threshold distance (derived from the icosphere's average edge length),
    // producing the lattice/network look without relying on face indices
    // (which reference the duplicated, seam-split vertex set).
    const avgEdge = (radius * 2) / Math.pow(2, detail + 1);
    const threshold = avgEdge * 1.3;
    const edgePositions: number[] = [];
    for (let i = 0; i < uniquePoints.length; i++) {
      for (let j = i + 1; j < uniquePoints.length; j++) {
        if (uniquePoints[i].distanceTo(uniquePoints[j]) < threshold) {
          edgePositions.push(
            uniquePoints[i].x,
            uniquePoints[i].y,
            uniquePoints[i].z,
            uniquePoints[j].x,
            uniquePoints[j].y,
            uniquePoints[j].z,
          );
        }
      }
    }

    const nodePositions = new Float32Array(uniquePoints.length * 3);
    uniquePoints.forEach((v, i) => {
      nodePositions[i * 3] = v.x;
      nodePositions[i * 3 + 1] = v.y;
      nodePositions[i * 3 + 2] = v.z;
    });

    return {
      nodePositions,
      edgePositions: new Float32Array(edgePositions),
    };
  }, [detail, radius]);
}

function LatticeScene() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const { line, node, nodeCore } = useThemeColors();

  // Two nested shells (outer coarse, inner finer) counter-rotating slowly —
  // reads as a precise, engineered "system" rather than a spinning toy.
  const outer = useLatticeGeometry(1, 1.6);
  const inner = useLatticeGeometry(0, 0.85);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.045;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.00008) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.09;
      innerRef.current.rotation.z += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <group>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[outer.edgePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={line}
            transparent
            opacity={0.45}
          />
        </lineSegments>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[outer.nodePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial color={node} size={0.028} sizeAttenuation />
        </points>
      </group>

      <group ref={innerRef}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[inner.edgePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={nodeCore} transparent opacity={0.65} />
        </lineSegments>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[inner.nodePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial color={nodeCore} size={0.045} sizeAttenuation />
        </points>
      </group>
    </group>
  );
}

/**
 * Root canvas for the hero's signature 3D visual. Kept deliberately cheap:
 * two nested wireframe icosphere lattices (well under 1k vertices combined),
 * no textures, no post-processing, DPR capped — comfortably holds 50fps+ on
 * mid-range hardware. Mounted only by HeroCanvasSlot behind a lazy
 * `next/dynamic` boundary, a WebGL support check, and a
 * prefers-reduced-motion gate (see components/sections/Hero.tsx).
 */
export default function HeroLattice() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <LatticeScene />
    </Canvas>
  );
}
