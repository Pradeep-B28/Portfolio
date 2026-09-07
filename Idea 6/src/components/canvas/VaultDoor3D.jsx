import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function VaultDoor3D({ isOpen = false, onDoorClick }) {
  const wheelRef = useRef();
  const doorHingeRef = useRef();

  useFrame((_, delta) => {
    // Wheel spin animation when opening
    if (wheelRef.current) {
      if (isOpen) {
        wheelRef.current.rotation.z += delta * 3;
      } else {
        wheelRef.current.rotation.z += delta * 0.2; // Slow idle turn
      }
    }

    // Door swing open hinge animation
    if (doorHingeRef.current) {
      const targetAngle = isOpen ? -Math.PI * 0.45 : 0;
      doorHingeRef.current.rotation.y += (targetAngle - doorHingeRef.current.rotation.y) * 0.08;
    }
  });

  return (
    <group position={[-6.2, 0, 0.5]}>
      {/* Heavy Steel Door Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 6.2, 0.4]} />
        <meshStandardMaterial color="#1E2228" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Hinge Mechanism Pivot */}
      <group ref={doorHingeRef} position={[0, 0, 0]}>
        {/* Vault Door Body */}
        <mesh position={[-1.6, 0, 0.1]} onClick={onDoorClick} cursor="pointer">
          <cylinderGeometry args={[1.5, 1.5, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial
            color="#2A2F38"
            metalness={0.85}
            roughness={0.35}
          />
        </mesh>

        {/* Outer Steel Rim */}
        <mesh position={[-1.6, 0, 0.26]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.52, 1.52, 0.05, 32]} />
          <meshStandardMaterial color="#E0B45C" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Central Locking Wheel Hub */}
        <group ref={wheelRef} position={[-1.6, 0, 0.32]}>
          {/* Wheel Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.06, 16, 32]} />
            <meshStandardMaterial color="#E0B45C" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Wheel Spokes */}
          {[0, Math.PI / 3, (2 * Math.PI) / 3].map((angle, idx) => (
            <mesh key={idx} rotation={[0, 0, angle]}>
              <boxGeometry args={[1.0, 0.08, 0.06]} />
              <meshStandardMaterial color="#E0B45C" metalness={0.95} roughness={0.15} />
            </mesh>
          ))}
          {/* Center Vault Logo Emblem */}
          <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
            <meshStandardMaterial color="#11141A" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* Heavy Hinge Clamps */}
        <mesh position={[0, 1.8, 0.15]}>
          <boxGeometry args={[0.4, 0.3, 0.3]} />
          <meshStandardMaterial color="#3A404B" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -1.8, 0.15]}>
          <boxGeometry args={[0.4, 0.3, 0.3]} />
          <meshStandardMaterial color="#3A404B" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}
