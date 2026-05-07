'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

interface Planet {
  vex: string;
  name: string;
  type: string;
  description: string;
  stats: { label: string; value: string }[];
  color: string;
  size: number;
  orbit: number;
  speed: number;
  geom: 'icosa' | 'sphere' | 'octa' | 'wire' | 'cube' | 'torus';
}

const PLANETS: Planet[] = [
  {
    vex: 'VEX/I', name: 'Cognitive', type: 'Cognitive Infrastructure',
    description: 'Continuous AI intake, conflict-checking and routing across every operational surface.',
    stats: [
      { label: 'systems', value: '12' },
      { label: 'ops · 24h', value: '184k' },
      { label: 'capture', value: '98.4%' },
    ],
    color: '#e8eef6', size: 0.42, orbit: 3.4, speed: 0.16, geom: 'icosa',
  },
  {
    vex: 'VEX/II', name: 'Operational Intelligence', type: 'Intelligence Stack',
    description: 'Continuous read of the operating environment — every signal rendered legible.',
    stats: [
      { label: 'systems', value: '14' },
      { label: 'signals · d', value: '2.4M' },
      { label: 'precision', value: '96.2%' },
    ],
    color: '#b8c8e0', size: 0.50, orbit: 4.5, speed: 0.12, geom: 'sphere',
  },
  {
    vex: 'VEX/III', name: 'Enterprise Automation', type: 'Workflow Engine',
    description: 'Workflow execution at planetary scale — regulated, observable, reversible.',
    stats: [
      { label: 'workflows · d', value: '14.2k' },
      { label: 'systems', value: '14' },
      { label: 'success', value: '99.4%' },
    ],
    color: '#f0c264', size: 0.46, orbit: 5.6, speed: 0.10, geom: 'octa',
  },
  {
    vex: 'VEX/IV', name: 'Autonomous Workflows', type: 'Autonomous Loops',
    description: 'Self-managing operational loops that improve their own posture.',
    stats: [
      { label: 'loops live', value: '4.2k' },
      { label: 'auto-resolve', value: '87.6%' },
      { label: 'sectors', value: '26' },
    ],
    color: '#6cf07a', size: 0.48, orbit: 6.7, speed: 0.085, geom: 'wire',
  },
  {
    vex: 'VEX/V', name: 'AI Command Layer', type: 'Command Matrix',
    description: 'Override, escalate, intervene — at any layer of the stack.',
    stats: [
      { label: 'operators', value: '8.4k' },
      { label: 'firms', value: '420' },
      { label: 'audit · y', value: '1.2k' },
    ],
    color: '#c8d0d8', size: 0.44, orbit: 7.8, speed: 0.07, geom: 'cube',
  },
  {
    vex: 'VEX/VI', name: 'Neural Operations Grid', type: 'Operations Mesh',
    description: 'Distributed coordination across geographies, systems, and time-zones.',
    stats: [
      { label: 'continents', value: '6' },
      { label: 'deployments', value: '247' },
      { label: 'latency', value: '142ms' },
    ],
    color: '#7d8a9c', size: 0.52, orbit: 9.0, speed: 0.058, geom: 'torus',
  },
];

function Sun() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.18;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff" emissive="#b8c8e0" emissiveIntensity={0.65}
          metalness={0.4} roughness={0.3}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.18} />
      </mesh>
      <pointLight intensity={3.2} color="#b8c8e0" distance={20} />
    </group>
  );
}

function PlanetMesh({
  planet, index, hovered, active, onHover, onClick,
}: {
  planet: Planet; index: number;
  hovered: boolean; active: boolean;
  onHover: (h: boolean) => void; onClick: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const speedFactor = hovered ? 0.5 : 1;
    const t = Date.now() * 0.0001 * planet.speed * speedFactor;
    const angle = t * 8 + index * 1.0;
    ref.current.position.x = Math.cos(angle) * planet.orbit;
    ref.current.position.z = Math.sin(angle) * planet.orbit;
    ref.current.position.y = Math.sin(angle * 1.3) * 0.4;
    if (meshRef.current) {
      const spinSpeed = hovered ? 1.6 : 1;
      meshRef.current.rotation.y += dt * 0.4 * spinSpeed;
      meshRef.current.rotation.x += dt * 0.2 * spinSpeed;
    }
    if (haloRef.current) {
      const targetScale = active ? 6.5 : hovered ? 5.5 : 4;
      haloRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      const mat = haloRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, active ? 1 : hovered ? 0.95 : 0.5, 0.08);
    }
  });

  function geom() {
    switch (planet.geom) {
      case 'icosa':  return <icosahedronGeometry args={[planet.size, 1]} />;
      case 'octa':   return <octahedronGeometry args={[planet.size, 0]} />;
      case 'cube':   return <boxGeometry args={[planet.size * 1.4, planet.size * 1.4, planet.size * 1.4]} />;
      case 'torus':  return <torusGeometry args={[planet.size, planet.size * 0.3, 16, 64]} />;
      case 'wire':
      case 'sphere':
      default:       return <sphereGeometry args={[planet.size, 32, 32]} />;
    }
  }

  return (
    <group ref={ref}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover(true); document.body.style.cursor = 'none'; }}
        onPointerOut={() => onHover(false)}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        {geom()}
        {planet.geom === 'wire' ? (
          <meshBasicMaterial color={planet.color} wireframe transparent opacity={0.85} />
        ) : (
          <meshStandardMaterial
            color={planet.color}
            metalness={0.4}
            roughness={0.3}
            emissive={planet.color}
            emissiveIntensity={hovered ? 0.4 : 0.2}
            transparent
            opacity={planet.geom === 'sphere' ? 0.65 : 1}
          />
        )}
      </mesh>
      <mesh ref={haloRef}>
        <sphereGeometry args={[planet.size * 1.1, 16, 16]} />
        <meshBasicMaterial color={planet.color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const N = 1500;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - 2 * (i / N));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 28 + Math.random() * 18;
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.006; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.7} />
    </points>
  );
}

function CameraBreathing() {
  const { camera } = useThree();
  useFrame(() => {
    const t = Date.now() * 0.001;
    camera.position.y = 1.8 + Math.sin(t * 0.18) * 0.18;
    camera.position.x = Math.sin(t * 0.12) * 0.45;
    camera.position.z = 14.5 + Math.cos(t * 0.10) * 0.32;
    camera.lookAt(0, Math.sin(t * 0.10) * 0.08, 0);
  });
  return null;
}

export function SolarSystem() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 1.6, 14], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <CameraBreathing />
          <Starfield />
          <Sun />
          {PLANETS.map((p, i) => (
            <PlanetMesh
              key={i} planet={p} index={i}
              hovered={hoveredIdx === i}
              active={activeIdx === i}
              onHover={(h) => setHoveredIdx(h ? i : null)}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* HUD overlays */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 rounded-full border border-line bg-ink/70 backdrop-blur-md z-10">
        <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-text-2">VEX/CORE</span>
        <span className="text-line">·</span>
        <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-signal-green inline-flex items-center gap-2"><span className="live-d" />operational</span>
        <span className="text-line">·</span>
        <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-text-3">79 nodes · 142ms · 6 continents</span>
      </div>

      {/* Detail panels */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.6, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotateX: -20 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 right-8 -translate-y-1/2 w-[300px] glass border border-white/15 rounded-xl p-6 z-10 shadow-lift"
          >
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-3 right-3 w-7 h-7 grid place-items-center text-text-3 hover:text-text border border-line rounded-full transition-all hover:rotate-90 hover:border-white/40"
              aria-label="Close"
            >×</button>
            <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-text-2 mb-2">{PLANETS[activeIdx].vex} · operational</div>
            <h4 className="font-serif italic text-3xl text-text leading-tight mb-2">{PLANETS[activeIdx].name}</h4>
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-text px-2 py-0.5 inline-block border border-line rounded mb-3">{PLANETS[activeIdx].type}</div>
            <p className="text-text-2 text-[12.5px] leading-relaxed mb-4">{PLANETS[activeIdx].description}</p>
            <div className="grid grid-cols-3 gap-px bg-line border border-line rounded-md overflow-hidden mb-4">
              {PLANETS[activeIdx].stats.map((s, i) => (
                <div key={i} className="bg-ink-2/80 p-3">
                  <div className="font-serif italic text-lg text-text leading-none">{s.value}</div>
                  <div className="font-mono text-[8px] tracking-[0.14em] uppercase text-text-3 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="activity-bars">
              {Array.from({ length: 14 }).map((_, i) => (
                <i key={i} style={{ ['--bd' as any]: `${1.4 + (i % 5) * 0.18}s`, ['--bdd' as any]: `${(i % 6) * 0.12}s` }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
