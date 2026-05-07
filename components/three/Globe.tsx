'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

const HUBS: { lat: number; lng: number; name: string }[] = [
  { lat: 51.5,  lng: -0.1,  name: 'LON' },
  { lat: 40.7,  lng: -74.0, name: 'NYC' },
  { lat: 37.7,  lng: -122.4, name: 'SFO' },
  { lat: 35.6,  lng: 139.7, name: 'TYO' },
  { lat: 1.35,  lng: 103.8, name: 'SIN' },
  { lat: 25.2,  lng: 55.3,  name: 'DXB' },
  { lat: -33.8, lng: 151.2, name: 'SYD' },
  { lat: 48.8,  lng: 2.3,   name: 'PAR' },
  { lat: 19.4,  lng: -99.1, name: 'MEX' },
  { lat: -23.5, lng: -46.6, name: 'GRU' },
  { lat: 52.5,  lng: 13.4,  name: 'BER' },
  { lat: 41.0,  lng: 28.9,  name: 'IST' },
];

const ARCS: [number, number][] = [
  [0,1],[0,7],[1,8],[1,9],[2,3],[2,4],[3,4],[5,6],[5,10],[6,4],[7,11],[8,9],[10,11],[10,1],[11,5]
];

function latLngToVec3(lat: number, lng: number, r = 2): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(r * Math.sin(phi) * Math.cos(theta));
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRot = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Fibonacci dots
  const dotPositions = useMemo(() => {
    const N = 1200;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - 2 * (i / N));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      arr[i * 3 + 0] = 2 * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = 2 * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = 2 * Math.cos(phi);
    }
    return arr;
  }, []);

  // Arc lines
  const arcLines = useMemo(() => {
    return ARCS.map(([i, j]) => {
      const start = latLngToVec3(HUBS[i].lat, HUBS[i].lng, 2.02);
      const end = latLngToVec3(HUBS[j].lat, HUBS[j].lng, 2.02);
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.7);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      return { geom, points };
    });
  }, []);

  useEffect(() => {
    function onDown(e: MouseEvent) { dragging.current = true; lastPos.current = { x: e.clientX, y: e.clientY }; }
    function onUp() { dragging.current = false; }
    function onMove(e: MouseEvent) {
      if (!dragging.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      targetRot.current.y += dx * 0.005;
      targetRot.current.x = Math.max(-1, Math.min(1, targetRot.current.x + dy * 0.005));
      lastPos.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    if (!dragging.current) targetRot.current.y += dt * 0.06;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.current.y, 0.08);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot.current.x, 0.08);
  });

  return (
    <group ref={groupRef}>
      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshBasicMaterial color="#b8c8e0" transparent opacity={0.05} />
      </mesh>
      {/* Inner sphere */}
      <mesh>
        <sphereGeometry args={[1.98, 64, 64]} />
        <meshStandardMaterial color="#0a0a0c" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Fibonacci dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.018} color="#ffffff" transparent opacity={0.55} />
      </points>
      {/* Hub markers */}
      {HUBS.map((hub, i) => {
        const pos = latLngToVec3(hub.lat, hub.lng, 2.05);
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        );
      })}
      {/* Arcs */}
      {arcLines.map((a, i) => (
        <line key={i}>
          <primitive object={a.geom} />
          <lineBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </line>
      ))}
    </group>
  );
}

export function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-3, -2, -3]} intensity={0.6} color="#b8c8e0" />
        <GlobeMesh />
      </Suspense>
    </Canvas>
  );
}
