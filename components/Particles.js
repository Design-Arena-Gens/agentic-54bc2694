'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Particles({ count = 500, radius = 6 }) {
  const points = useRef();
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random point in sphere shell
      const r = radius * (0.6 + Math.random() * 0.4);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos.set([x, y, z], i * 3);
      const c = new THREE.Color().setHSL(0.97 + Math.random() * 0.03, 0.6, 0.55);
      col.set([c.r, c.g, c.b], i * 3);
    }
    return { positions: pos, colors: col };
  }, [count, radius]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.getElapsedTime();
    points.current.rotation.y = t * 0.02;
    points.current.rotation.x = Math.sin(t * 0.2) * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial vertexColors size={0.02} sizeAttenuation depthWrite={false} opacity={0.8} transparent />
    </points>
  );
}
