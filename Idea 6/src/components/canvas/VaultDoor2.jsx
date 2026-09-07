import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { vaultSounds } from '../../utils/vaultSounds';

export function VaultDoor2({ isOpen, onUnlock }) {
  const mainDoorRef = useRef();
  const irisRef = useRef();

  useFrame((_, delta) => {
    // Vertical retraction animation (retracts up to Y=8.0 so it never blocks vaults)
    if (mainDoorRef.current) {
      const targetY = isOpen ? 8.0 : 0;
      mainDoorRef.current.position.y += (targetY - mainDoorRef.current.position.y) * 0.08;
    }

    // Iris rotation
    if (irisRef.current) {
      irisRef.current.rotation.z += delta * (isOpen ? 4 : 0.8);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    vaultSounds.playDoor2Unlock();
    onUnlock();
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Hexagonal Frame Perimeter Border Ring (Hollow Torus) */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[4.8, 0.4, 16, 6]} rotation={[0, 0, Math.PI / 6]} />
        <meshStandardMaterial color="#141820" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Glowing Neon Cyan Inner Trim */}
      <mesh position={[0, 0, 0.05]}>
        <torusGeometry args={[4.4, 0.08, 16, 6]} rotation={[0, 0, Math.PI / 6]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={isOpen ? 1.8 : 0.6}
        />
      </mesh>

      {/* Retractable Vertical Titanium Main Door */}
      <group ref={mainDoorRef} position={[0, 0, 0.1]} onClick={handleClick} cursor="pointer">
        <mesh>
          <cylinderGeometry args={[4.5, 4.5, 0.2, 6]} rotation={[Math.PI / 2, 0, Math.PI / 6]} />
          <meshStandardMaterial color="#202530" metalness={0.95} roughness={0.2} />
        </mesh>

        {/* Central Rotating Iris Lock */}
        <group ref={irisRef} position={[0, 0, 0.12]}>
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => (
            <mesh key={idx} rotation={[0, 0, angle]}>
              <boxGeometry args={[2.5, 0.28, 0.06]} />
              <meshStandardMaterial color="#00F0FF" metalness={0.95} roughness={0.1} />
            </mesh>
          ))}
          {/* Biometric Fingerprint Scanner Pad */}
          <mesh position={[0, 0, 0.04]}>
            <cylinderGeometry args={[0.55, 0.55, 0.08, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial
              color="#0A0F18"
              emissive={isOpen ? "#00FF88" : "#00F0FF"}
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      </group>

      {/* Chamber Label Sign */}
      <mesh position={[0, 3.4, 0.25]}>
        <boxGeometry args={[5.2, 0.5, 0.05]} />
        <meshStandardMaterial color="#0C1016" metalness={0.9} />
      </mesh>
      <Text
        position={[0, 3.4, 0.29]}
        fontSize={0.2}
        color={isOpen ? "#00FF88" : "#00F0FF"}
        fontWeight="bold"
        anchorX="center"
        anchorY="middle"
      >
        {isOpen ? "DOOR 02 : 3D GRAPHICS & AI AIRLOCK [OPEN]" : "DOOR 02 : 3D GRAPHICS & AI AIRLOCK"}
      </Text>
    </group>
  );
}

