import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function SurveillanceCamera3D({ position = [-6, 3.2, 2], side = "left" }) {
  const cameraHeadRef = useRef();
  const ledRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (cameraHeadRef.current) {
      const offset = side === "left" ? 0 : Math.PI;
      cameraHeadRef.current.rotation.y = Math.sin(t * 0.5 + offset) * 0.4 + (side === "left" ? 0.3 : -0.3);
    }
    if (ledRef.current) {
      ledRef.current.material.emissiveIntensity = Math.sin(t * 4) > 0 ? 3 : 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Wall mount bracket */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[0.2, 0.4, 0.4]} />
        <meshStandardMaterial color="#2A2F37" metalness={0.8} roughness={0.3} />
      </mesh>
      
      {/* Camera Swivel Arm */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3]} />
        <meshStandardMaterial color="#3A404A" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Panning Camera Head */}
      <group ref={cameraHeadRef} position={[0, -0.25, 0.1]}>
        {/* Main Body */}
        <mesh rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 0.5, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#1F232A" metalness={0.85} roughness={0.25} />
        </mesh>
        
        {/* Lens Rim */}
        <mesh position={[0, 0, 0.26]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.05, 16]} />
          <meshStandardMaterial color="#E0B45C" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Lens Glass */}
        <mesh position={[0, 0, 0.28]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#001122" roughness={0.1} />
        </mesh>

        {/* Blinking REC LED */}
        <mesh ref={ledRef} position={[0.1, 0.1, 0.26]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color="#FF0040" emissive="#FF0040" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}
