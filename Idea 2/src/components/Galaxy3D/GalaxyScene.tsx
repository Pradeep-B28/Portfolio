import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import type { GalaxyTheme, PlanetProject } from '../../types/galaxy';
import { GALAXY_THEMES } from '../../types/galaxy';
import { SunCoreMesh } from './SunCoreMesh';
import { PlanetMesh } from './PlanetMesh';

interface GalaxySceneProps {
  planets: PlanetProject[];
  selectedPlanetId: string | null;
  hoveredPlanetId: string | null;
  visitedPlanetIds: string[];
  reducedMotion: boolean;
  isFocusMode: boolean;
  isMobile: boolean;
  onSelectPlanet: (id: string) => void;
  onHoverPlanet: (id: string | null) => void;
  onOpenResume?: () => void;
  activeTheme?: GalaxyTheme;
}

const CameraController: React.FC<{ hasSelection: boolean; isMobile: boolean; reducedMotion: boolean; controlsRef: React.RefObject<OrbitControlsImpl | null> }> = ({ hasSelection, isMobile, reducedMotion, controlsRef }) => {
  useFrame(({ camera }, delta) => {
    const selectedOffset = hasSelection && !isMobile ? 4.5 : 0;
    const target = new THREE.Vector3(selectedOffset, isMobile ? 34 : 27, isMobile ? 42 : 34);
    if (!reducedMotion) {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, target.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, target.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, target.z, 3.5, delta);
    }
    if (controlsRef.current) {
      controlsRef.current.target.x = THREE.MathUtils.damp(controlsRef.current.target.x, selectedOffset, 3.5, delta);
      controlsRef.current.update();
    }
  });
  return null;
};

export const GalaxyScene: React.FC<GalaxySceneProps> = ({
  planets, selectedPlanetId, hoveredPlanetId, visitedPlanetIds, reducedMotion,
  isFocusMode, isMobile, onSelectPlanet, onHoverPlanet, onOpenResume, activeTheme = 'cyber',
}) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const activePlanetId = hoveredPlanetId || selectedPlanetId;
  const theme = GALAXY_THEMES[activeTheme] || GALAXY_THEMES.cyber;

  return (
    <div className="relative h-full w-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, isMobile ? 34 : 27, isMobile ? 42 : 34], fov: isMobile ? 52 : 47, near: 0.1, far: 1000 }}
        dpr={[1, isMobile ? 1.35 : 1.8]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        onPointerMissed={() => onSelectPlanet('')}
      >
        <color attach="background" args={[theme.bg]} />
        <fog attach="fog" args={[theme.bg, 28, 105]} />
        <ambientLight intensity={0.55} color={theme.lightPrimary} />
        <directionalLight position={[22, 32, 18]} intensity={1.55} color="#f4f8ff" castShadow={!isMobile} />
        <pointLight position={[-22, 14, -18]} intensity={1.5} distance={80} color={theme.lightSecondary} />
        <pointLight position={[0, -8, 0]} intensity={0.7} distance={45} color={theme.sunColor} />

        <Stars radius={78} depth={55} count={isMobile ? 1600 : 3000} factor={isMobile ? 3 : 4.2} saturation={0.55} fade speed={reducedMotion ? 0 : 0.35} />

        <Suspense fallback={null}>
          <CameraController hasSelection={!!selectedPlanetId} isMobile={isMobile} reducedMotion={reducedMotion} controlsRef={controlsRef} />
          <SunCoreMesh theme={activeTheme} onClickSun={() => onOpenResume?.()} />
          {planets.map((planet) => <PlanetMesh key={planet.id} planet={planet} isSelected={selectedPlanetId === planet.id} isHovered={hoveredPlanetId === planet.id} isVisited={visitedPlanetIds.includes(planet.id)} isFocusMode={isFocusMode} isDimmed={!!activePlanetId && activePlanetId !== planet.id} onSelect={onSelectPlanet} onHover={onHoverPlanet} theme={activeTheme} />)}
        </Suspense>

        <OrbitControls ref={controlsRef} enablePan={!isMobile} enableZoom maxPolarAngle={Math.PI / 2.08} minPolarAngle={Math.PI / 6} minDistance={15} maxDistance={65} enableDamping dampingFactor={0.055} rotateSpeed={0.42} zoomSpeed={0.7} />
      </Canvas>
    </div>
  );
};
