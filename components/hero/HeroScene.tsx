"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- soft round sprite for the particle field ----------------------------
function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function ParticleField({ count = 1600 }: { count?: number }) {
  const map = useDotTexture();
  const points = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const lime = new THREE.Color("#b8d444");
    const indigo = new THREE.Color("#5b57c4");
    for (let i = 0; i < count; i++) {
      // Cluster into a soft disc so the field reads as depth, not noise.
      const r = Math.pow(Math.random(), 0.7) * 7.5;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = Math.sin(theta) * r - 1.5;
      const c = Math.random() > 0.4 ? lime : indigo;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        map={map}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// A single glowing arc traced from the Glomark symbol's own comet shape —
// a closed loop, built from a smooth curve and layered a few times with
// growing radius + falling opacity to fake a soft bloom. No independent
// motion of its own; it just rides the shared slow rotation in Rig.
function Arc({
  curvePoints,
  color = "#b8d444",
}: {
  curvePoints: [number, number, number][];
  color?: string;
}) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        curvePoints.map((p) => new THREE.Vector3(...p)),
        true,
        "catmullrom",
        0.5,
      ),
    [curvePoints],
  );

  const layers = [
    { r: 0.032, o: 0.85 },
    { r: 0.09, o: 0.18 },
    { r: 0.18, o: 0.06 },
  ];

  return (
    <group>
      {layers.map((l, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 220, l.r, 10, true]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={l.o}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);

  useFrame((state, delta) => {
    // Track scroll progress across the first viewport (hero region).
    const p =
      typeof window !== "undefined"
        ? Math.min(1, window.scrollY / (window.innerHeight || 1))
        : 0;
    scroll.current += (p - scroll.current) * Math.min(1, delta * 3);

    if (group.current) {
      const g = group.current;
      // Base slow rotation + gentle lean toward the pointer + scroll morph.
      const targetY =
        state.clock.elapsedTime * 0.08 +
        state.pointer.x * 0.35 +
        scroll.current * 0.6;
      const targetX = -state.pointer.y * 0.25 + scroll.current * 0.5;
      g.rotation.y += (targetY - g.rotation.y) * Math.min(1, delta * 2.2);
      g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 2.2);
      // Dolly the whole scene back slightly as you scroll away.
      g.position.z = -scroll.current * 1.6;
      g.scale.setScalar(1 - scroll.current * 0.12);
    }
  });

  return <group ref={group}>{children}</group>;
}

// Twin-arc motif traced directly from the Glomark symbol's own two comet
// shapes (public/brand/glomark-symbol.svg), sampled point-for-point along
// each shape's outline and centered on the mark's shared origin — so this
// is the actual logo, not an abstract approximation of it.
const ARC_A: [number, number, number][] = [
  [-1.576, 2.584, 0],
  [-1.125, 3.107, 0.059],
  [-1.073, 3.763, 0.116],
  [-1.597, 4.188, 0.172],
  [-2.28, 4.273, 0.225],
  [-2.966, 4.175, 0.274],
  [-3.612, 3.934, 0.318],
  [-4.208, 3.583, 0.357],
  [-4.751, 3.154, 0.39],
  [-5.247, 2.671, 0.416],
  [-5.818, 2.664, 0.435],
  [-5.71, 3.338, 0.446],
  [-5.45, 3.979, 0.45],
  [-5.78, 3.655, 0.446],
  [-6.122, 3.054, 0.435],
  [-6.359, 2.404, 0.416],
  [-6.482, 1.723, 0.39],
  [-6.489, 1.032, 0.357],
  [-6.378, 0.35, 0.318],
  [-6.156, -0.305, 0.274],
  [-5.829, -0.915, 0.225],
  [-5.353, -1.401, 0.172],
  [-4.829, -1.112, 0.116],
  [-4.936, -0.434, 0.059],
  [-5.089, 0.238, 0],
  [-5.061, 0.928, -0.059],
  [-4.859, 1.589, -0.116],
  [-4.484, 2.167, -0.172],
  [-3.949, 2.602, -0.225],
  [-3.301, 2.838, -0.274],
  [-2.617, 2.83, -0.318],
  [-2.653, 2.244, -0.357],
  [-3.048, 1.676, -0.39],
  [-3.45, 1.113, -0.416],
  [-3.83, 0.534, -0.435],
  [-4.152, -0.078, -0.446],
  [-4.372, -0.733, -0.45],
  [-4.449, -1.42, -0.446],
  [-4.342, -2.095, -0.435],
  [-3.815, -2.518, -0.416],
  [-3.611, -2.249, -0.39],
  [-3.714, -1.564, -0.357],
  [-3.705, -0.87, -0.318],
  [-3.579, -0.193, -0.274],
  [-3.322, 0.45, -0.225],
  [-2.961, 1.04, -0.172],
  [-2.53, 1.581, -0.116],
  [-2.06, 2.09, -0.059],
];
const ARC_B: [number, number, number][] = [
  [2.98, 1.721, 0],
  [2.349, 2.433, 0.059],
  [1.832, 3.234, 0.116],
  [1.388, 3.012, 0.172],
  [0.926, 2.176, 0.225],
  [0.339, 1.429, 0.274],
  [0.92, 1.03, 0.318],
  [1.519, 1.745, 0.357],
  [1.348, 0.807, 0.39],
  [1.001, -0.082, 0.416],
  [0.422, -0.837, 0.435],
  [-0.42, -1.257, 0.446],
  [-1.254, -0.898, 0.45],
  [-1.411, 0.02, 0.446],
  [-1.056, 0.903, 0.435],
  [-0.443, 1.627, 0.416],
  [0.21, 2.33, 0.39],
  [0.797, 3.079, 0.357],
  [1.143, 3.949, 0.318],
  [0.679, 4.751, 0.274],
  [-0.143, 5.234, 0.225],
  [-1.059, 5.486, 0.172],
  [-2.015, 5.553, 0.116],
  [-2.961, 5.448, 0.059],
  [-3.877, 5.176, 0],
  [-4.719, 4.735, -0.059],
  [-4.702, 4.052, -0.116],
  [-3.841, 4.458, -0.172],
  [-2.921, 4.696, -0.225],
  [-1.97, 4.74, -0.274],
  [-1.03, 4.561, -0.318],
  [-0.311, 3.975, -0.357],
  [-0.318, 3.043, -0.39],
  [-0.822, 2.243, -0.416],
  [-1.45, 1.52, -0.435],
  [-2.047, 0.769, -0.446],
  [-2.486, -0.074, -0.45],
  [-2.628, -1.014, -0.446],
  [-2.421, -1.935, -0.435],
  [-1.812, -2.646, -0.416],
  [-0.878, -2.628, -0.39],
  [-0.02, -2.215, -0.357],
  [0.721, -1.608, -0.318],
  [1.333, -0.886, -0.274],
  [1.783, -0.037, -0.225],
  [2.002, 0.88, -0.172],
  [2.09, 1.568, -0.116],
  [2.843, 1.029, -0.059],
];

export default function HeroScene({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      frameloop="always"
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <Rig>
        <ParticleField />
        {/* Pushed into the open side of the hero opposite the headline
            (right in English, left in Arabic — the whole layout mirrors)
            and well back in depth: small and soft enough to read as a
            quiet signature mark rather than competing with the text. */}
        <group position={[mirrored ? -3.9 : 3.9, -0.1, -2.5]} scale={0.5}>
          <Arc curvePoints={ARC_A} color="#b8d444" />
          <Arc curvePoints={ARC_B} color="#7d79e0" />
        </group>
      </Rig>
    </Canvas>
  );
}
