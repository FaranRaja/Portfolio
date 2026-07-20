import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Minimal star field — no Drei Stars (saves ~40KB)
function Stars() {
  const ref = useRef<THREE.Points>(null);
  const positions = new Float32Array(500 * 3);
  for (let i = 0; i < 500 * 3; i++) positions[i] = (Math.random() - 0.5) * 120;
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#a3a3a3" size={0.08} transparent opacity={0.5} />
    </points>
  );
}

// Orbiting ring
function Ring({ radius, speed, color, rx, ry, rz }: {
  radius: number; speed: number; color: string; rx: number; ry: number; rz: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.rotation.x = rx * t;
    ref.current.rotation.y = ry * t;
    ref.current.rotation.z = rz * t;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.016, 12, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

// Laptop built from BoxGeometry only — no RoundedBox import
function Laptop() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.18;
    groupRef.current.position.y = Math.sin(t * 0.55) * 0.1;
  });

  const accentColor = '#ffffff';
  const baseColor   = '#111111';
  const screenBg    = '#050505';

  // Code line data: [x-offset, y-offset, width]
  const codeLines: [number, number, number][] = [
    [-0.2, 0.38, 0.55], [0.15, 0.2, 0.7], [-0.1, 0.02, 0.45],
    [0.1, -0.16, 0.6],  [-0.05, -0.34, 0.5],
  ];
  const lineColors = ['#a3a3a3', '#ffffff', '#737373', '#a3a3a3', '#ffffff'];

  return (
    <group ref={groupRef}>
      {/* Base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2.4, 0.09, 1.6]} />
        <meshStandardMaterial color={baseColor} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Keyboard tray */}
      <mesh position={[0, 0.01, 0.06]}>
        <boxGeometry args={[2.0, 0.015, 1.2]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.12} roughness={0.9} />
      </mesh>
      {/* Screen panel */}
      <group position={[0, 0.78, -0.78]} rotation={[-0.55, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.4, 1.55, 0.055]} />
          <meshStandardMaterial color="#111122" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Screen face */}
        <mesh position={[0, 0, 0.038]}>
          <boxGeometry args={[2.15, 1.32, 0.01]} />
          <meshStandardMaterial color={screenBg} emissive={accentColor} emissiveIntensity={0.06} />
        </mesh>
        {/* Code lines */}
        {codeLines.map(([x, y, w], i) => (
          <mesh key={i} position={[x, y, 0.048]}>
            <boxGeometry args={[w, 0.042, 0.005]} />
            <meshStandardMaterial color={lineColors[i]} emissive={lineColors[i]} emissiveIntensity={1} />
          </mesh>
        ))}
      </group>
      {/* Hinge */}
      <mesh position={[0, 0.035, -0.76]}>
        <boxGeometry args={[2.42, 0.07, 0.07]} />
        <meshStandardMaterial color="#0d0d20" metalness={1} roughness={0.05} />
      </mesh>
    </group>
  );
}

// Small floating particles
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 80;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.022} transparent opacity={0.55} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <Stars />
      <Particles />
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 4, 4]}   intensity={2.5} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={1.2} color="#a3a3a3" />
      <pointLight position={[0, 0.9, -0.3]} intensity={1} color="#ffffff" distance={3} />
      <Ring radius={2.1} speed={0.22} color="#ffffff" rx={0.4} ry={1}   rz={0.2} />
      <Ring radius={2.7} speed={0.14} color="#a3a3a3" rx={1}   ry={0.2} rz={0.5} />
      <Ring radius={3.2} speed={0.09} color="#444444" rx={0.2} ry={0.5} rz={1}   />
      <Laptop />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.6} />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 1, 5.5], fov: 42 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
