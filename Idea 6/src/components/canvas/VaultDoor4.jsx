import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { vaultSounds } from '../../utils/vaultSounds';

export function VaultDoor4({ isOpen, onUnlock }) {
  const gateLeftRef = useRef();
  const gateRightRef = useRef();
  const crystalRef = useRef();

  useFrame((_, delta) => {
    // Sliding gates animation (slides way out to X=±7.8 so it never blocks vaults)
    if (gateLeftRef.current && gateRightRef.current) {
      const targetLeftX = isOpen ? -7.8 : -2.4;
      const targetRightX = isOpen ? 7.8 : 2.4;
      gateLeftRef.current.position.x += (targetLeftX - gateLeftRef.current.position.x) * 0.09;
      gateRightRef.current.position.x += (targetRightX - gateRightRef.current.position.x) * 0.09;
    }

    // Crystal emblem spin
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * (isOpen ? 4 : 1.2);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    vaultSounds.playBoxUnlock();
    onUnlock();
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Perimeter Golden Archway Frame (Hollow Center Beams) */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[11.4, 0.7, 0.4]} />
        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[0, -3.2, 0]}>
        <boxGeometry args={[11.4, 0.7, 0.4]} />
        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[-5.4, 0, 0]}>
        <boxGeometry args={[0.7, 7.0, 0.4]} />
        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[5.4, 0, 0]}>
        <boxGeometry args={[0.7, 7.0, 0.4]} />
        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Inner Glowing Gate Portal Rim */}
      <mesh position={[0, 3.0, 0.05]}>
        <boxGeometry args={[10.8, 0.1, 0.45]} />
        <meshStandardMaterial
          color="#00FF88"
          emissive="#00FF88"
          emissiveIntensity={isOpen ? 1.5 : 0.4}
        />
      </mesh>
      <mesh position={[0, -3.0, 0.05]}>
        <boxGeometry args={[10.8, 0.1, 0.45]} />
        <meshStandardMaterial
          color="#00FF88"
          emissive="#00FF88"
          emissiveIntensity={isOpen ? 1.5 : 0.4}
        />
      </mesh>

      {/* Left Diamond Lattice Gate Panel */}
      <group ref={gateLeftRef} position={[-2.4, 0, 0.1]} onClick={handleClick} cursor="pointer">
        <mesh>
          <boxGeometry args={[4.8, 5.8, 0.2]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Diamond Pattern Inlay */}
        <mesh position={[0, 0, 0.12]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.8, 1.8, 0.04]} />
          <meshStandardMaterial color="#FFD700" metalness={0.98} roughness={0.1} />
        </mesh>
      </group>

      {/* Right Diamond Lattice Gate Panel */}
      <group ref={gateRightRef} position={[2.4, 0, 0.1]} onClick={handleClick} cursor="pointer">
        <mesh>
          <boxGeometry args={[4.8, 5.8, 0.2]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Diamond Pattern Inlay */}
        <mesh position={[0, 0, 0.12]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.8, 1.8, 0.04]} />
          <meshStandardMaterial color="#FFD700" metalness={0.98} roughness={0.1} />
        </mesh>
      </group>

      {/* Central Rotating Sanctum Crystal Emblem */}
      {!isOpen && (
        <group ref={crystalRef} position={[0, 0, 0.25]} onClick={handleClick} cursor="pointer">
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial
              color="#00FF88"
              emissive="#00FF88"
              emissiveIntensity={0.8}
              metalness={0.9}
            />
          </mesh>
        </group>
      )}

      {/* Chamber Label Sign */}
      <mesh position={[0, 3.4, 0.25]}>
        <boxGeometry args={[5.8, 0.5, 0.05]} />
        <meshStandardMaterial color="#0F172A" metalness={0.95} />
      </mesh>
      <Text
        position={[0, 3.4, 0.29]}
        fontSize={0.2}
        color={isOpen ? "#00FF88" : "#FFD700"}
        fontWeight="bold"
        anchorX="center"
        anchorY="middle"
      >
        {isOpen ? "DOOR 04 : MASTER RESERVE SANCTUM [OPEN]" : "DOOR 04 : CENTRAL BANK MASTER RESERVE"}
      </Text>
    </group>
  );
}

