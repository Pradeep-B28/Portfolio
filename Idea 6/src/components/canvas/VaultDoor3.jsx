import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { vaultSounds } from '../../utils/vaultSounds';

export function VaultDoor3({ isOpen, onUnlock }) {
  const doorHingeRef = useRef();
  const gearRef = useRef();

  useFrame((_, delta) => {
    // Door swing open hinge (swings wide out to -Math.PI * 0.8 so it never blocks vaults)
    if (doorHingeRef.current) {
      const targetAngle = isOpen ? -Math.PI * 0.8 : 0;
      doorHingeRef.current.rotation.y += (targetAngle - doorHingeRef.current.rotation.y) * 0.08;
    }

    // Combination gears spin
    if (gearRef.current) {
      gearRef.current.rotation.z += delta * (isOpen ? 6 : 0.5);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    vaultSounds.playDoor3Unlock();
    onUnlock();
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Heavy Circular Frame Outer Perimeter (Hollow Torus Ring) */}
      <mesh position={[0, 0, -0.05]}>
        <torusGeometry args={[3.6, 0.35, 16, 32]} />
        <meshStandardMaterial color="#1E232D" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Gold Trim Outer Rim */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[3.3, 0.08, 16, 32]} />
        <meshStandardMaterial color="#E0B45C" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Hinge Pivot (Mounted on Left Side) */}
      <group ref={doorHingeRef} position={[-3.3, 0, 0]}>
        {/* Main Gold-Faced Circular Vault Door */}
        <mesh position={[3.3, 0, 0.1]} onClick={handleClick} cursor="pointer">
          <cylinderGeometry args={[3.2, 3.2, 0.25, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial
            color="#2A2215"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>

        {/* Polished Gold Face Ring */}
        <mesh position={[3.3, 0, 0.23]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.8, 0.08, 16, 32]} />
          <meshStandardMaterial color="#E0B45C" metalness={0.98} roughness={0.08} />
        </mesh>

        {/* Combination Gears Mechanism */}
        <group ref={gearRef} position={[3.3, 0, 0.26]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.9, 0.9, 0.06, 24]} />
            <meshStandardMaterial color="#E0B45C" metalness={0.95} roughness={0.1} />
          </mesh>
          {[0, Math.PI / 3, (2 * Math.PI) / 3].map((angle, idx) => (
            <mesh key={idx} rotation={[0, 0, angle]}>
              <boxGeometry args={[2.0, 0.12, 0.08]} />
              <meshStandardMaterial color="#B8860B" metalness={0.95} roughness={0.1} />
            </mesh>
          ))}
        </group>

        {/* Digital Pin Pad Lock Display */}
        <mesh position={[3.3, 0, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 16]} />
          <meshStandardMaterial
            color="#090C12"
            emissive={isOpen ? "#00FF88" : "#E0B45C"}
            emissiveIntensity={1.5}
          />
        </mesh>
      </group>

      {/* Chamber Label Sign */}
      <mesh position={[0, 3.4, 0.25]}>
        <boxGeometry args={[5.5, 0.5, 0.05]} />
        <meshStandardMaterial color="#0E1218" metalness={0.9} />
      </mesh>
      <Text
        position={[0, 3.4, 0.29]}
        fontSize={0.2}
        color={isOpen ? "#00FF88" : "#E0B45C"}
        fontWeight="bold"
        anchorX="center"
        anchorY="middle"
      >
        {isOpen ? "DOOR 03 : ALGORITHMIC SANCTUM [OPEN]" : "DOOR 03 : ALGORITHMIC & PEDAGOGY SANCTUM"}
      </Text>
    </group>
  );
}

