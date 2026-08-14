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

// A single glowing arc (comet trail) built from a smooth curve, layered a few
// times with growing radius + falling opacity to fake a soft bloom.
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
        false,
        "catmullrom",
        0.5,
      ),
    [curvePoints],
  );

  const layers = [
    { r: 0.045, o: 1.0 },
    { r: 0.12, o: 0.28 },
    { r: 0.26, o: 0.1 },
  ];

  return (
    <group>
      {layers.map((l, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 140, l.r, 10, false]} />
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

// Twin-arc motif echoing the Glomark symbol's two comet strokes.
const ARC_A: [number, number, number][] = [
  [-4.2, 2.6, -1],
  [-2.2, 1.1, 0.4],
  [-0.2, -0.2, 0.9],
  [1.8, -1.2, 0.3],
  [3.6, -1.7, -0.8],
];
const ARC_B: [number, number, number][] = [
  [-3.4, -2.4, -0.6],
  [-1.4, -1.0, 0.6],
  [0.5, 0.1, 1.0],
  [2.4, 1.2, 0.4],
  [4.2, 2.2, -0.7],
];

export default function HeroScene() {
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
        <Arc curvePoints={ARC_A} color="#b8d444" />
        <Arc curvePoints={ARC_B} color="#7d79e0" />
      </Rig>
    </Canvas>
  );
}
