import React from 'react';

export function VaultRoom3D({ highVisibilityMode }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Back Wall (Behind Safety Deposit Boxes Grid) */}
      <mesh position={[0, 0, -1.2]}>
        <planeGeometry args={[28, 18]} />
        <meshStandardMaterial
          color={highVisibilityMode ? "#475569" : "#2A3444"}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Decorative Golden / Steel Pillars flanking the grid */}
      <mesh position={[-7.5, 0, -0.6]}>
        <boxGeometry args={[0.9, 14, 0.9]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[7.5, 0, -0.6]}>
        <boxGeometry args={[0.9, 14, 0.9]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Reflective Polished Steel Floor */}
      <mesh position={[0, -4.5, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[32, 22]} />
        <meshStandardMaterial
          color={highVisibilityMode ? "#334155" : "#1E293B"}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Ceiling Track with Gold Border */}
      <mesh position={[0, 5.2, 2]}>
        <boxGeometry args={[26, 0.3, 0.5]} />
        <meshStandardMaterial color="#E0B45C" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Ceiling Recessed Spotlights */}
      {[-7, -3.5, 0, 3.5, 7].map((xPos, idx) => (
        <group key={idx} position={[xPos, 5.0, 2]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
            <meshStandardMaterial color="#FFD700" metalness={0.95} />
          </mesh>
          <pointLight color="#FFF8DC" intensity={3.5} distance={14} />
        </group>
      ))}
    </group>
  );
}
