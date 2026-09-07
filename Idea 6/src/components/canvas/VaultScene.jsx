import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { VaultRoom3D } from './VaultRoom3D';
import { VaultDoor1 } from './VaultDoor1';
import { VaultDoor2 } from './VaultDoor2';
import { VaultDoor3 } from './VaultDoor3';
import { VaultDoor4 } from './VaultDoor4';
import { DepositBoxGrid } from './DepositBoxGrid';
import { LaserGrid3D } from './LaserGrid3D';
import { SurveillanceCamera3D } from './SurveillanceCamera3D';
import { VaultDustParticles } from './VaultDustParticles';
import { GoldBullionStacks3D } from './GoldBullionStacks3D';

function CameraRig({ focusedBox }) {
  useFrame(({ camera, mouse }) => {
    let targetX = mouse.x * 0.3;
    let targetY = mouse.y * 0.2;
    let targetZ = focusedBox ? 2.2 : 4.5;

    camera.position.x += (targetX - camera.position.x) * 0.08;
    camera.position.y += (targetY - camera.position.y) * 0.08;
    camera.position.z += (targetZ - camera.position.z) * 0.08;

    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function VaultScene({
  projects,
  unlockedBoxIds,
  onSelectBox,
  laserActive,
  focusedBox,
  door1Open,
  onUnlockDoor1,
  door2Open,
  onUnlockDoor2,
  door3Open,
  onUnlockDoor3,
  door4Open,
  onUnlockDoor4,
  currentLevel,
  lockdownMode,
  highVisibilityMode
}) {
  const level1Projects = projects.slice(0, 3);
  const level2Projects = projects.slice(3, 6);
  const level3Projects = projects.slice(6, 9);
  const level4Projects = projects.slice(9, 12);

  const activeDoorOpen =
    currentLevel === 1 ? door1Open :
    currentLevel === 2 ? door2Open :
    currentLevel === 3 ? door3Open : door4Open;

  const activeProjects =
    currentLevel === 1 ? level1Projects :
    currentLevel === 2 ? level2Projects :
    currentLevel === 3 ? level3Projects : level4Projects;

  const ambientIntensity = lockdownMode ? 2.5 : highVisibilityMode ? 3.8 : 2.5;

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-[#0A0E17]">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={1} // Locked 60 FPS
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <CameraRig focusedBox={focusedBox} />

          {/* HIGH ILLUMINATION LIGHTING SYSTEM */}
          <ambientLight
            color={lockdownMode ? "#FF0040" : highVisibilityMode ? "#FFFFFF" : "#88B0E8"}
            intensity={ambientIntensity}
          />

          <directionalLight
            position={[0, 8, 15]}
            intensity={highVisibilityMode ? 3.5 : 2.5}
            color={lockdownMode ? "#FF0040" : "#FFFFFF"}
          />

          <directionalLight position={[-8, 6, 8]} intensity={2.2} color="#FFD700" />
          <directionalLight position={[8, 6, 8]} intensity={2.2} color="#00F0FF" />

          {/* 3D Vault Architecture */}
          <VaultRoom3D highVisibilityMode={highVisibilityMode} />
          <GoldBullionStacks3D />

          {/* RENDER ACTIVE DOOR AT CENTER Z=0 */}
          {currentLevel === 1 && (
            <VaultDoor1 isOpen={door1Open} onUnlock={onUnlockDoor1} />
          )}

          {currentLevel === 2 && (
            <VaultDoor2 isOpen={door2Open} onUnlock={onUnlockDoor2} />
          )}

          {currentLevel === 3 && (
            <VaultDoor3 isOpen={door3Open} onUnlock={onUnlockDoor3} />
          )}

          {currentLevel === 4 && (
            <VaultDoor4 isOpen={door4Open} onUnlock={onUnlockDoor4} />
          )}

          {/* RENDER ACTIVE LEVEL VAULTS AT Z=-0.5 WHEN DOOR IS OPEN */}
          {activeDoorOpen && (
            <group position={[0, 0, -0.5]}>
              <DepositBoxGrid
                projects={activeProjects}
                unlockedBoxIds={unlockedBoxIds}
                onSelectBox={onSelectBox}
              />
              {currentLevel === 4 && (
                <LaserGrid3D laserActive={laserActive || lockdownMode} />
              )}
            </group>
          )}

          {/* Surveillance Cameras & Dust */}
          <SurveillanceCamera3D position={[-7, 3.8, 8]} side="left" />
          <SurveillanceCamera3D position={[7, 3.8, 4]} side="right" />
          <VaultDustParticles count={150} />
        </Suspense>
      </Canvas>
    </div>
  );
}
