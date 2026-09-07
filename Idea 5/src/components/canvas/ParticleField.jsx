import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function seededValue(index, offset = 0) {
  const value = Math.sin(index * 91.173 + offset * 17.31) * 43758.5453;
  return value - Math.floor(value);
}

export default function ParticleField({
  count = 180,
  primaryColor = '#00F0FF'
}) {
  const pointsRef = useRef();
  const glowRef = useRef();

  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const primary = new THREE.Color(primaryColor);
    const secondary = new THREE.Color('#FF2ED1');

    for (let index = 0; index < count; index += 1) {
      const index3 = index * 3;
      const radius = 4 + seededValue(index, 1) * 8;
      const angle = seededValue(index, 2) * Math.PI * 2;
      const height = -2.4 + seededValue(index, 3) * 8;

      positions[index3] = Math.cos(angle) * radius;
      positions[index3 + 1] = height;
      positions[index3 + 2] = Math.sin(angle) * radius - 1.6;

      const particleColor = index % 5 === 0 ? secondary : primary;
      colors[index3] = particleColor.r;
      colors[index3 + 1] = particleColor.g;
      colors[index3 + 2] = particleColor.b;
    }

    return { positions, colors };
  }, [count, primaryColor]);

  // 100% GPU-accelerated rotation — 0 CPU array mutations per frame
  useFrame((state, delta) => {
    const points = pointsRef.current;
    const glow = glowRef.current;

    if (!points || !glow) return;

    const time = state.clock.getElapsedTime();
    points.rotation.y += delta * 0.04;
    points.rotation.x = Math.sin(time * 0.3) * 0.03;

    glow.rotation.y -= delta * 0.02;
    glow.rotation.z = Math.cos(time * 0.2) * 0.02;
  });

  return (
    <group>
      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleData.positions.length / 3}
            array={particleData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color={primaryColor}
          transparent
          opacity={0.15}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleData.positions.length / 3}
            array={particleData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleData.colors.length / 3}
            array={particleData.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.65}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}