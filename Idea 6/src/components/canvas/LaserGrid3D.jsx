import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function LaserGrid3D({ laserActive = true }) {
  const groupRef = useRef();
  const laser1Ref = useRef();
  const laser2Ref = useRef();
  const laser3Ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (laser1Ref.current) {
      laser1Ref.current.position.y = Math.sin(t * 1.5) * 1.8 + 0.5;
    }
    if (laser2Ref.current) {
      laser2Ref.current.position.x = Math.cos(t * 1.2) * 2.5;
    }
    if (laser3Ref.current) {
      laser3Ref.current.rotation.z = Math.sin(t * 0.8) * 0.2;
    }
  });

  if (!laserActive) return null;

  return (
    <group ref={groupRef} position={[0, 0, 1.2]}>
      {/* Laser Layer 1: Horizontal sweep */}
      <group ref={laser1Ref} position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[14, 0.025, 0.025]} />
          <meshBasicMaterial color="#FF0040" transparent opacity={0.85} />
        </mesh>
        {/* Glow halo */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[14, 0.08, 0.08]} />
          <meshBasicMaterial color="#FF0040" transparent opacity={0.25} />
        </mesh>
      </group>

      {/* Laser Layer 2: Vertical sweep */}
      <group ref={laser2Ref} position={[0, 0.5, 0.1]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.025, 7, 0.025]} />
          <meshBasicMaterial color="#FF0040" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.08, 7, 0.08]} />
          <meshBasicMaterial color="#FF0040" transparent opacity={0.25} />
        </mesh>
      </group>

      {/* Laser Layer 3: Diagonal grid */}
      <group ref={laser3Ref} position={[0, 0.5, -0.1]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[16, 0.02, 0.02]} />
          <meshBasicMaterial color="#FF0040" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Motion Sensor Emitters at top corners */}
      <mesh position={[-6, 3.8, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FF0040" emissive="#FF0040" emissiveIntensity={2} />
      </mesh>
      <mesh position={[6, 3.8, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FF0040" emissive="#FF0040" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}
