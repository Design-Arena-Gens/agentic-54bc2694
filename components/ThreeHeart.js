'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function createHeartShape() {
  const shape = new THREE.Shape();
  // Heart 2D path using bezier curves
  const x = 0, y = 0;
  shape.moveTo(x, y);
  shape.bezierCurveTo(x, y, x - 0.5, y - 0.5, x - 1, y);
  shape.bezierCurveTo(x - 1.8, y + 0.9, x - 0.8, y + 2.2, x, y + 2.6);
  shape.bezierCurveTo(x + 0.8, y + 2.2, x + 1.8, y + 0.9, x + 1, y);
  shape.bezierCurveTo(x + 0.5, y - 0.5, x, y, x, y);
  return shape;
}

export default function ThreeHeart() {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const shape = createHeartShape();
    const extrudeSettings = { depth: 0.8, bevelEnabled: true, bevelSegments: 8, steps: 3, bevelSize: 0.07, bevelThickness: 0.1 };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    // Scale up
    geom.scale(0.9, 0.9, 0.9);
    return geom;
  }, []);

  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#e11d48'),
      metalness: 0.0,
      roughness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.0,
      thickness: 1.0,
      sheen: 1.0,
      sheenRoughness: 0.6,
      sheenColor: new THREE.Color('#ff6b6b')
    });
    mat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `#include <color_fragment>
         float pulse = 0.3 + 0.7 * vViewPosition.z / 5.0; // subtle depth tint
         diffuseColor.rgb = mix(diffuseColor.rgb, vec3(1.0, 0.4, 0.5), clamp(pulse, 0.0, 1.0));
        `
      );
    };
    return mat;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const bpm = 72.0 / 60.0; // beats per second
    const heartbeat = Math.sin(2.0 * Math.PI * bpm * t) ** 8; // sharp peaks
    const scale = 1.0 + heartbeat * 0.08;
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scale);
      meshRef.current.rotation.y = Math.sin(t * 0.6) * 0.2;
      meshRef.current.position.y = Math.sin(t * 1.2) * 0.03;
    }
  });

  return (
    <group position={[0, 0.2, 0]}>
      <mesh ref={meshRef} geometry={geometry} material={material} castShadow receiveShadow />
    </group>
  );
}
