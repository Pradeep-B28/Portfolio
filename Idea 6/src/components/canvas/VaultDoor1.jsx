import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { vaultSounds } from '../../utils/vaultSounds';

export function VaultDoor1({ isOpen, onUnlock }) {
  const wheelRef = useRef();
  const leftPanelRef = useRef();
  const rightPanelRef = useRef();
  const lightRef = useRef();

  useFrame((_, delta) => {
    // Wheel spin when opening
    if (wheelRef.current) {
      if (isOpen) {
        wheelRef.current.rotation.z += delta * 5;
      } else {
        wheelRef.current.rotation.z += delta * 0.3;
      }
    }

    // Heavy sliding bulkhead doors animation (slides wide out to X=±7.8 so center is completely clear)
    if (leftPanelRef.current && rightPanelRef.current) {
      const targetLeftX = isOpen ? -7.8 : -2.4;
      const targetRightX = isOpen ? 7.8 : 2.4;
      leftPanelRef.current.position.x += (targetLeftX - leftPanelRef.current.position.x) * 0.09;
      rightPanelRef.current.position.x += (targetRightX - rightPanelRef.current.position.x) * 0.09;
    }

    // Blinking warning beacon
    if (lightRef.current) {
      lightRef.current.intensity = isOpen ? 2.5 : Math.sin(Date.now() * 0.005) * 1.0 + 1.2;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    vaultSounds.playDoor1Unlock();
    onUnlock();
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Perimeter Outer Frame (Hollow Center - Top, Bottom, Left, Right Beams) */}
      {/* Top Archway Beam */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[11.2, 0.7, 0.4]} />
        <meshStandardMaterial color="#1A1E24" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Bottom Threshold Beam */}
      <mesh position={[0, -3.2, 0]}>
        <boxGeometry args={[11.2, 0.7, 0.4]} />
        <meshStandardMaterial color="#1A1E24" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Left Pillar Column */}
      <mesh position={[-5.3, 0, 0]}>
        <boxGeometry args={[0.7, 7.0, 0.4]} />
        <meshStandardMaterial color="#1A1E24" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Right Pillar Column */}
      <mesh position={[5.3, 0, 0]}>
        <boxGeometry args={[0.7, 7.0, 0.4]} />
        <meshStandardMaterial color="#1A1E24" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Frame Gold Inner Trim Outline */}
      <mesh position={[0, 3.0, 0.05]}>
        <boxGeometry args={[10.6, 0.12, 0.42]} />
        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0, -3.0, 0.05]}>
        <boxGeometry args={[10.6, 0.12, 0.42]} />
        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Left Heavy Sliding Steel Bulkhead Panel */}
      <group ref={leftPanelRef} position={[-2.4, 0, 0.1]} onClick={handleClick} cursor="pointer">
        <mesh>
          <boxGeometry args={[4.8, 5.8, 0.25]} />
          <meshStandardMaterial color="#282C34" metalness={0.9} roughness={0.25} />
        </mesh>

        {/* Steel Plate Armor Ridges */}
        {[-1.8, 0, 1.8].map((yPos, idx) => (
          <mesh key={idx} position={[0, yPos, 0.14]}>
            <boxGeometry args={[4.5, 0.35, 0.04]} />
            <meshStandardMaterial color="#3A404D" metalness={0.8} />
          </mesh>
        ))}

        {/* Piston Rod */}
        <mesh position={[-2.2, 0, 0.15]}>
          <cylinderGeometry args={[0.12, 0.12, 5.2]} />
          <meshStandardMaterial color="#4A5262" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Right Heavy Sliding Steel Bulkhead Panel */}
      <group ref={rightPanelRef} position={[2.4, 0, 0.1]} onClick={handleClick} cursor="pointer">
        <mesh>
          <boxGeometry args={[4.8, 5.8, 0.25]} />
          <meshStandardMaterial color="#282C34" metalness={0.9} roughness={0.25} />
        </mesh>

        {/* Steel Plate Armor Ridges */}
        {[-1.8, 0, 1.8].map((yPos, idx) => (
          <mesh key={idx} position={[0, yPos, 0.14]}>
            <boxGeometry args={[4.5, 0.35, 0.04]} />
            <meshStandardMaterial color="#3A404D" metalness={0.8} />
          </mesh>
        ))}

        {/* Central Rotating Wheel Mechanism Hub */}
        <group ref={wheelRef} position={[-2.2, 0, 0.22]}>
          {/* Wheel Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.75, 0.08, 16, 32]} />
            <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* 8 Spokes */}
          {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((angle, idx) => (
            <mesh key={idx} rotation={[0, 0, angle]}>
              <boxGeometry args={[1.5, 0.09, 0.06]} />
              <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.15} />
            </mesh>
          ))}

          {/* Wheel Center Emblem */}
          <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.08, 24]} />
            <meshStandardMaterial color="#0E1218" metalness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Top Chamber Header Signboard */}
      <mesh position={[0, 3.2, 0.3]}>
        <boxGeometry args={[5.8, 0.55, 0.06]} />
        <meshStandardMaterial color="#11141A" metalness={0.9} />
      </mesh>
      <Text
        position={[0, 3.2, 0.34]}
        fontSize={0.2}
        color={isOpen ? "#00FF88" : "#FFD700"}
        fontWeight="bold"
        anchorX="center"
        anchorY="middle"
      >
        {isOpen ? "DOOR 01 : INFRASTRUCTURE VAULT [OPEN]" : "DOOR 01 : INFRASTRUCTURE & DEV VAULT"}
      </Text>

      {/* Top Warning Beacon Light */}
      <mesh position={[0, 3.7, 0.3]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={isOpen ? "#00FF88" : "#FF0040"} emissive={isOpen ? "#00FF88" : "#FF0040"} emissiveIntensity={2.5} />
      </mesh>
      <pointLight ref={lightRef} position={[0, 3.7, 0.5]} color={isOpen ? "#00FF88" : "#FF0040"} distance={10} />
    </group>
  );
}

