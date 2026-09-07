import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { FilmSlate3D } from './FilmSlate3D';
import type { PortfolioClip } from '../data/clips';

interface EditingRoomSceneProps {
  clips: PortfolioClip[];
  scrubIndex: number;
  hoveredIndex: number | null;
  selectedIndex: number | null;
  onSelectClip: (index: number) => void;
  onHoverClip: (index: number | null) => void;
  isMobile: boolean;
  isPlayingTrailer: boolean;
  prefersReducedMotion: boolean;
  activeTheme?: 'cyber' | 'amber' | 'emerald' | 'purple';
}

// 3D Metallic Film Reel Component
const FloatingFilmReel: React.FC<{ position: [number, number, number]; rotSpeed: number; scale?: number; reelColor?: string }> = ({
  position,
  rotSpeed,
  scale = 1,
  reelColor = '#22d3ee',
}) => {
  const reelRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reelRef.current) {
      reelRef.current.rotation.z += delta * rotSpeed;
      reelRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={reelRef} position={position} scale={scale}>
      {/* Outer Rim */}
      <mesh>
        <torusGeometry args={[2, 0.15, 16, 32]} />
        <meshStandardMaterial color={reelColor} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Inner Hub */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Spokes (4 cross bars) */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((angle, idx) => (
        <mesh key={idx} rotation={[0, 0, angle]}>
          <boxGeometry args={[3.8, 0.12, 0.08]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// Camera Controller Rig
const CameraRig: React.FC<{
  scrubIndex: number;
  totalClips: number;
  isMobile: boolean;
  isPlayingTrailer: boolean;
  selectedIndex: number | null;
  prefersReducedMotion: boolean;
}> = ({ scrubIndex, isMobile, isPlayingTrailer, selectedIndex, prefersReducedMotion }) => {
  const targetPos = useRef(new THREE.Vector3(0, 0, 7.5));

  useFrame((state, delta) => {
    if (selectedIndex !== null) {
      const targetX = isMobile ? 0 : (selectedIndex - 3) * 4.8;
      const targetY = isMobile ? (3 - selectedIndex) * 3.2 : 0;
      targetPos.current.set(targetX, targetY, isMobile ? 5.5 : 5.8);
    } else {
      const spacingX = isMobile ? 0 : 4.8;
      const spacingY = isMobile ? -3.2 : 0;
      const focalX = (scrubIndex - 3) * spacingX;
      const focalY = (3 - scrubIndex) * spacingY;
      const focalZ = isMobile ? 7.5 : 7.2;

      const autoFloatY = isPlayingTrailer && !prefersReducedMotion ? Math.sin(Date.now() * 0.0015) * 0.35 : 0;
      targetPos.current.set(focalX, focalY + autoFloatY, focalZ);
    }

    if (prefersReducedMotion) {
      state.camera.position.copy(targetPos.current);
    } else {
      state.camera.position.lerp(targetPos.current, delta * 4);
    }
    state.camera.lookAt(targetPos.current.x, targetPos.current.y, 0);
  });

  return null;
};

export const EditingRoomScene: React.FC<EditingRoomSceneProps> = ({
  clips,
  scrubIndex,
  hoveredIndex,
  selectedIndex,
  onSelectClip,
  onHoverClip,
  isMobile,
  isPlayingTrailer,
  prefersReducedMotion,
  activeTheme = 'cyber',
}) => {
  const themeColors = {
    cyber: { bg: '#07090e', light1: '#22d3ee', light2: '#a855f7', spotlight: '#38bdf8' },
    amber: { bg: '#0d0a07', light1: '#f59e0b', light2: '#f97316', spotlight: '#fbbf24' },
    emerald: { bg: '#060d09', light1: '#10b981', light2: '#06b6d4', spotlight: '#34d399' },
    purple: { bg: '#0c0712', light1: '#a855f7', light2: '#ec4899', spotlight: '#c084fc' },
  }[activeTheme];

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={[themeColors.bg]} />

        {/* Dynamic Studio Lighting System */}
        <ambientLight intensity={0.9} color={themeColors.light1} />
        <pointLight position={[12, 12, 10]} intensity={1.8} color={themeColors.light1} />
        <pointLight position={[-12, -12, 8]} intensity={1.2} color={themeColors.light2} />
        <spotLight
          position={[0, 14, 14]}
          angle={0.65}
          penumbra={0.85}
          intensity={2.0}
          color={themeColors.spotlight}
          castShadow
        />

        {/* Ambient Projector Star/Particle Dust */}
        {!prefersReducedMotion && (
          <Stars radius={50} depth={50} count={2200} factor={3.5} saturation={0.4} fade speed={0.9} />
        )}

        {/* Background 3D Floating Metallic Film Reels */}
        {!prefersReducedMotion && (
          <group>
            <FloatingFilmReel position={[-15, 8, -12]} rotSpeed={0.3} scale={1.4} reelColor={themeColors.light1} />
            <FloatingFilmReel position={[16, -6, -15]} rotSpeed={-0.25} scale={1.8} reelColor={themeColors.light2} />
            <FloatingFilmReel position={[-8, -10, -10]} rotSpeed={0.4} scale={1.1} reelColor={themeColors.spotlight} />
            <FloatingFilmReel position={[10, 10, -14]} rotSpeed={-0.35} scale={1.3} reelColor={themeColors.light1} />
          </group>
        )}

        {/* 3D Camera Controller Rig */}
        <CameraRig
          scrubIndex={scrubIndex}
          totalClips={clips.length}
          isMobile={isMobile}
          isPlayingTrailer={isPlayingTrailer}
          selectedIndex={selectedIndex}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* 3D Film Slates Timeline Loop */}
        <group>
          {clips.map((clip, idx) => {
            const spacingX = isMobile ? 0 : 4.8;
            const spacingY = isMobile ? -3.2 : 0;
            const posX = (idx - 3) * spacingX;
            const posY = (3 - idx) * spacingY;
            const posZ = Math.sin((idx - scrubIndex) * 0.6) * -0.5;

            const rotY = isMobile ? 0 : (idx - scrubIndex) * -0.06;
            const rotX = isMobile ? (idx - scrubIndex) * 0.05 : 0;

            return (
              <FilmSlate3D
                key={clip.id}
                clip={clip}
                index={idx}
                totalClips={clips.length}
                isSelected={selectedIndex === idx}
                isHovered={hoveredIndex === idx}
                onSelect={onSelectClip}
                onHover={onHoverClip}
                position={[posX, posY, posZ]}
                rotation={[rotX, rotY, 0]}
                prefersReducedMotion={prefersReducedMotion}
              />
            );
          })}
        </group>
      </Canvas>
    </div>
  );
};
