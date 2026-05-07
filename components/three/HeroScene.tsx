'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function AICore() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef1 = useRef<THREE.Mesh>(null);
  const wireRef2 = useRef<THREE.Mesh>(null);
  const horizonRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.06;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.25;
      innerRef.current.rotation.z += delta * 0.12;
    }
    if (wireRef1.current) wireRef1.current.rotation.y -= delta * 0.42;
    if (wireRef2.current) wireRef2.current.rotation.y += delta * 0.28;
    if (horizonRef.current) horizonRef.current.rotation.z += delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Glowing inner icosahedron */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#b8c8e0"
          emissiveIntensity={0.45}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh ref={wireRef1}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Outer wireframe */}
      <mesh ref={wireRef2}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Orbital rings */}
      {[1.6, 2.0, 2.45, 2.9, 3.4].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.15, 0, i * 0.4]}>
          <ringGeometry args={[r, r + 0.012, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18 - i * 0.025} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Horizon ring */}
      <mesh ref={horizonRef} rotation={[0, 0, 0]}>
        <ringGeometry args={[3.9, 3.92, 256]} />
        <meshBasicMaterial color="#b8c8e0" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Bloom point lights */}
      <pointLight position={[2, 2, 2]} intensity={2.8} color="#b8c8e0" distance={8} />
      <pointLight position={[-2, -1, 2]} intensity={1.6} color="#ffffff" distance={6} />
    </group>
  );
}

function ChromePlate({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.15;
      ref.current.position.y = position[1] + Math.sin(Date.now() * 0.0008 + position[0]) * 0.08;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[0.6, 0.6, 0.02]} />
      <meshStandardMaterial color="#e8eef6" metalness={0.95} roughness={0.15} />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <AICore />

        {/* Floating chrome plates */}
        <ChromePlate position={[3.6, 1.2, -1]} rotation={[0.3, -0.4, 0.1]} scale={1.2} />
        <ChromePlate position={[-3.4, -0.8, -0.5]} rotation={[-0.2, 0.5, -0.15]} scale={1.0} />
        <ChromePlate position={[3.0, -1.5, 0.5]} rotation={[0.4, 0.2, 0.05]} scale={0.85} />
        <ChromePlate position={[-3.8, 1.6, -1.5]} rotation={[-0.3, -0.3, 0.2]} scale={1.3} />
      </Suspense>
    </Canvas>
  );
}
