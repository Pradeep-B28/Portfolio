import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function VaultDustParticles({ count = 150 }) {
  const pointsRef = useRef();

  // Create particle positions and velocities once
  const [positions, speeds] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10 + 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      spd[i * 3] = (Math.random() - 0.5) * 0.005;
      spd[i * 3 + 1] = Math.random() * 0.004 + 0.002;
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, spd];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const attr = geo.attributes.position;
    const array = attr.array;

    for (let i = 0; i < count; i++) {
      array[i * 3] += speeds[i * 3];
      array[i * 3 + 1] += speeds[i * 3 + 1];
      array[i * 3 + 2] += speeds[i * 3 + 2];

      // Respawn when drift exceeds top boundary
      if (array[i * 3 + 1] > 7) {
        array[i * 3 + 1] = -3;
        array[i * 3] = (Math.random() - 0.5) * 16;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#E0B45C"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}
