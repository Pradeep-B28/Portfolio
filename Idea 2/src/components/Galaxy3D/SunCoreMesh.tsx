import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import type { GalaxyTheme } from '../../types/galaxy';
import { GALAXY_THEMES } from '../../types/galaxy';

interface SunCoreMeshProps {
  theme?: GalaxyTheme;
  onClickSun: () => void;
}

export const SunCoreMesh: React.FC<SunCoreMeshProps> = ({ theme = 'cyber', onClickSun }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const colors = GALAXY_THEMES[theme] || GALAXY_THEMES.cyber;

  useFrame(({ clock }, delta) => {
    const pulse = 1 + Math.sin(clock.elapsedTime * 1.8) * 0.035;
    if (coreRef.current) { coreRef.current.rotation.y += delta * 0.28; coreRef.current.scale.setScalar(pulse); }
    if (haloRef.current) haloRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.4) * 0.06);
    if (innerRingRef.current) innerRingRef.current.rotation.z += delta * 0.55;
    if (outerRingRef.current) { outerRingRef.current.rotation.z -= delta * 0.32; outerRingRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.8) * 0.14; }
  });

  return (
    <group onClick={onClickSun}>
      <mesh ref={haloRef} scale={1.16}>
        <sphereGeometry args={[3.25, 32, 32]} />
        <meshBasicMaterial color={colors.sunCorona} transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>

      <mesh ref={coreRef}>
        <sphereGeometry args={[3, 48, 48]} />
        <meshStandardMaterial color={colors.sunColor} emissive={colors.sunColor} emissiveIntensity={2.1} roughness={0.18} metalness={0.08} />
      </mesh>

      <group ref={innerRingRef} rotation={[Math.PI / 2.5, 0.2, 0]}>
        <mesh><torusGeometry args={[4.15, 0.075, 16, 96]} /><meshBasicMaterial color={colors.sunColor} transparent opacity={0.9} /></mesh>
        <mesh rotation={[0.9, 0.2, 0]}><torusGeometry args={[4.45, 0.025, 12, 96]} /><meshBasicMaterial color={colors.sunCorona} transparent opacity={0.45} /></mesh>
      </group>

      <group ref={outerRingRef} rotation={[0.3, 0, 0.5]}>
        <mesh><torusGeometry args={[5.2, 0.055, 16, 96]} /><meshBasicMaterial color={colors.sunCorona} transparent opacity={0.58} /></mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[5.55, 0.018, 10, 96]} /><meshBasicMaterial color={colors.sunColor} transparent opacity={0.28} /></mesh>
      </group>

      <Text position={[0, 0.62, 3.52]} fontSize={0.4} color="#06101c" anchorX="center" anchorY="middle" letterSpacing={0.06}>PRADEEP STAR</Text>
      <Text position={[0, -0.1, 3.52]} fontSize={0.23} color="#06101c" anchorX="center" anchorY="middle" letterSpacing={0.025}>7,500+ MENTORED</Text>
      <Text position={[0, -0.62, 3.52]} fontSize={0.17} color="#06101c" anchorX="center" anchorY="middle">90% PLACEMENT SUCCESS</Text>
      <Text position={[0, -4.25, 0]} fontSize={0.23} color={colors.textActive} anchorX="center" anchorY="middle" letterSpacing={0.08}>CLICK TO OPEN DOSSIER</Text>
    </group>
  );
};
