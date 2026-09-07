import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import type { GalaxyTheme, PlanetProject } from '../../types/galaxy';
import { GALAXY_THEMES } from '../../types/galaxy';

interface PlanetMeshProps {
  planet: PlanetProject;
  isSelected: boolean;
  isHovered: boolean;
  isVisited: boolean;
  isFocusMode: boolean;
  isDimmed: boolean;
  onSelect: (planetId: string) => void;
  onHover: (planetId: string | null) => void;
  theme?: GalaxyTheme;
}

export const PlanetMesh: React.FC<PlanetMeshProps> = ({
  planet, isSelected, isHovered, isVisited, isFocusMode, isDimmed,
  onSelect, onHover, theme = 'cyber',
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Group>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const [localHover, setLocalHover] = useState(false);
  const active = isSelected || isHovered || localHover;
  const themeColors = GALAXY_THEMES[theme] || GALAXY_THEMES.cyber;
  const dimmed = isFocusMode && isDimmed;

  useFrame((_, delta) => {
    angleRef.current += delta * planet.orbitSpeed * 0.5;
    if (groupRef.current) {
      groupRef.current.position.set(Math.cos(angleRef.current) * planet.orbitRadius, Math.sin(angleRef.current * 2) * 0.8, Math.sin(angleRef.current) * planet.orbitRadius);
      const targetScale = active ? 1.16 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }
    if (planetRef.current) planetRef.current.rotation.y += delta * (active ? 1.15 : 0.7);
    if (ringRef.current) { ringRef.current.rotation.z += delta * 0.34; ringRef.current.rotation.x = Math.PI / 3 + Math.sin(angleRef.current) * 0.08; }
    if (moonRef.current) moonRef.current.rotation.y += delta * 1.35;
    if (auraRef.current) { const pulse = 1 + Math.sin(performance.now() * 0.002 + planet.orbitRadius) * 0.06; auraRef.current.scale.setScalar(pulse); }
  });

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <ringGeometry args={[planet.orbitRadius - 0.045, planet.orbitRadius + 0.045, 160]} />
        <meshBasicMaterial color={active ? themeColors.orbitActive : themeColors.sunColor} transparent opacity={active ? 0.72 : 0.2} side={THREE.DoubleSide} />
      </mesh>

      <group
        ref={groupRef}
        onClick={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(planet.id); }}
        onPointerOver={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); setLocalHover(true); onHover(planet.id); }}
        onPointerOut={(event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); setLocalHover(false); onHover(null); }}
      >
        <mesh ref={auraRef} scale={1.25}>
          <sphereGeometry args={[planet.planetSize, 24, 24]} />
          <meshBasicMaterial color={planet.planetColor} transparent opacity={active ? 0.16 : 0.045} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
        </mesh>

        <mesh ref={planetRef}>
          <sphereGeometry args={[planet.planetSize, 40, 40]} />
          <meshStandardMaterial color={planet.planetColor} roughness={0.3} metalness={0.58} emissive={planet.planetColor} emissiveIntensity={active ? 0.8 : 0.14} transparent opacity={dimmed ? 0.28 : 1} />
        </mesh>

        {planet.ringColor && <group ref={ringRef} rotation={[Math.PI / 3, 0, 0]}><mesh><ringGeometry args={[planet.planetSize * 1.38, planet.planetSize * 2.02, 80]} /><meshBasicMaterial color={planet.ringColor} transparent opacity={active ? 0.95 : 0.52} side={THREE.DoubleSide} /></mesh><mesh rotation={[0.12, 0, 0]}><ringGeometry args={[planet.planetSize * 2.08, planet.planetSize * 2.12, 80]} /><meshBasicMaterial color={themeColors.textActive} transparent opacity={active ? 0.5 : 0.18} side={THREE.DoubleSide} /></mesh></group>}

        {isVisited && <mesh scale={1.18}><sphereGeometry args={[planet.planetSize, 20, 20]} /><meshBasicMaterial color={themeColors.textActive} wireframe transparent opacity={dimmed ? 0.08 : 0.38} /></mesh>}

        <group ref={moonRef}>
          {planet.moons.map((moon, index) => { const moonAngle = (index / planet.moons.length) * Math.PI * 2; const distance = planet.planetSize + 1.2; return <group key={moon} position={[Math.cos(moonAngle) * distance, 0, Math.sin(moonAngle) * distance]}><mesh><sphereGeometry args={[0.15, 14, 14]} /><meshBasicMaterial color={themeColors.textActive} transparent opacity={dimmed ? 0.2 : 0.88} /></mesh></group>; })}
        </group>

        <Text position={[0, planet.planetSize + 0.7, 0]} fontSize={0.34} color={active ? themeColors.textActive : '#dce8f8'} anchorX="center" anchorY="bottom" letterSpacing={0.06} fillOpacity={dimmed ? 0.28 : 1} outlineColor="#050812" outlineWidth={0.018}>{planet.codeName}</Text>
        <Text position={[0, -planet.planetSize - 0.5, 0]} fontSize={0.21} color="#91a0b8" anchorX="center" anchorY="top" fillOpacity={dimmed ? 0.2 : 0.85} maxWidth={4.8} textAlign="center">{planet.title}</Text>
      </group>
    </group>
  );
};
