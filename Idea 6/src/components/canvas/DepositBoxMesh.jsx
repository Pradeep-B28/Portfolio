import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { vaultSounds } from '../../utils/vaultSounds';

export function DepositBoxMesh({ project, position, isUnlocked, onSelectBox }) {
  const meshRef = useRef();
  const dialRef = useRef();
  const doorHingeRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Smooth door swing and dial spin animations
  useFrame((_, delta) => {
    // Door swing
    if (doorHingeRef.current) {
      const targetAngle = isUnlocked ? -Math.PI * 0.65 : 0;
      doorHingeRef.current.rotation.y += (targetAngle - doorHingeRef.current.rotation.y) * 0.12;
    }

    // Dial rotation
    if (dialRef.current) {
      if (isUnlocked) {
        dialRef.current.rotation.z += delta * 4;
      } else if (hovered) {
        dialRef.current.rotation.z += delta * 2;
      }
    }

    // Subtle lift on hover
    if (meshRef.current) {
      const targetZ = hovered && !isUnlocked ? position[2] + 0.15 : position[2];
      meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.15;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    vaultSounds.playTumblerClick();
    if (!isUnlocked) {
      vaultSounds.playBoxUnlock();
    }
    onSelectBox(project);
  };

  const isGold = project.assetClass === 'gold';
  const isPlatinum = project.assetClass === 'platinum';
  const plateColor = isUnlocked ? '#00FF88' : isGold ? '#FFD700' : isPlatinum ? '#00F0FF' : '#E0B45C';

  return (
    <group ref={meshRef} position={position}>
      {/* Outer Box Frame / Niche */}
      <mesh position={[0, 0, -0.4]}>
        <boxGeometry args={[2.3, 1.65, 0.8]} />
        <meshStandardMaterial color="#2D3748" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Interior Vault Niche Glow (Visible when door swings open) */}
      <mesh position={[0, 0, -0.39]}>
        <planeGeometry args={[2.1, 1.45]} />
        <meshStandardMaterial
          color={isUnlocked ? "#3B2D10" : "#1A202C"}
          emissive={isUnlocked ? "#FFD700" : "#000000"}
          emissiveIntensity={isUnlocked ? 0.6 : 0}
        />
      </mesh>

      {/* Hinge Mounted Metallic Door */}
      <group ref={doorHingeRef} position={[-1.1, 0, 0]}>
        {/* Main Steel Door Face */}
        <mesh
          position={[1.1, 0, 0.04]}
          onClick={handleClick}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[2.2, 1.55, 0.08]} />
          <meshStandardMaterial
            color={hovered ? "#4A5568" : "#2D3748"}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Outer Door Border Accent */}
        <mesh position={[1.1, 0, 0.09]}>
          <boxGeometry args={[2.15, 1.5, 0.01]} />
          <meshStandardMaterial
            color={plateColor}
            emissive={plateColor}
            emissiveIntensity={hovered || isUnlocked ? 0.6 : 0.25}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* REPO NAME METALLIC EMBOSSED PLATE */}
        <mesh position={[1.1, 0.38, 0.1]}>
          <boxGeometry args={[1.8, 0.35, 0.02]} />
          <meshStandardMaterial color={plateColor} metalness={0.95} roughness={0.1} />
        </mesh>

        {/* REPO CODE / NAME TEXT */}
        <Text
          position={[1.1, 0.38, 0.12]}
          fontSize={0.13}
          color="#0A0D14"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          {project.repoCode || project.title}
        </Text>

        {/* Project Full Title Label */}
        <Text
          position={[1.1, -0.05, 0.11]}
          fontSize={0.13}
          color={isUnlocked ? "#00FF88" : "#FFFFFF"}
          maxWidth={1.9}
          anchorX="center"
          anchorY="middle"
        >
          {project.title}
        </Text>

        {/* Subtitle / Classification Tag */}
        <Text
          position={[1.1, -0.32, 0.11]}
          fontSize={0.09}
          color="#CBD5E0"
          maxWidth={1.9}
          anchorX="center"
          anchorY="middle"
        >
          {project.subtitle.length > 32 ? `${project.subtitle.substring(0, 32)}...` : project.subtitle}
        </Text>

        {/* Mechanical Combination Dial */}
        <group ref={dialRef} position={[0.45, -0.5, 0.12]}>
          {/* Dial Base */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.04, 24]} />
            <meshStandardMaterial color="#A0AEC0" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Dial Center Lock */}
          <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.03, 16]} />
            <meshStandardMaterial color={plateColor} metalness={0.95} roughness={0.1} />
          </mesh>
        </group>

        {/* Keyhole Slot */}
        <mesh position={[1.75, -0.5, 0.11]}>
          <boxGeometry args={[0.04, 0.14, 0.02]} />
          <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}
