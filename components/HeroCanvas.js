'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import ThreeHeart from './ThreeHeart';
import Particles from './Particles';

export default function HeroCanvas() {
  const dpr = useMemo(() => (typeof window !== 'undefined' && window.devicePixelRatio ? Math.min(window.devicePixelRatio, 2) : 1), []);
  return (
    <Canvas dpr={dpr} camera={{ position: [0, 0.5, 3.4], fov: 45 }}>
      <color attach="background" args={[0, 0, 0]} />
      <fog attach="fog" args={[0x000000, 6, 12]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={1.2} color={'#ffd1d1'} />
      <pointLight position={[-3, 2, -2]} intensity={0.6} color={'#ccddff'} />

      <Suspense fallback={null}>
        <Particles count={600} radius={7} />
        <ThreeHeart />
        <Environment preset="city" />
        <ContactShadows position={[0, -0.8, 0]} opacity={0.35} blur={2.4} scale={7} far={3.6} />
      </Suspense>

      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} minPolarAngle={Math.PI/2.5} maxPolarAngle={Math.PI/2.0} />
    </Canvas>
  );
}
