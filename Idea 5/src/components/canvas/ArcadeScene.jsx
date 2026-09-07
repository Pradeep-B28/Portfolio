import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import ArcadeCabinet from './ArcadeCabinet';
import CartridgeMesh from './CartridgeMesh';
import ParticleField from './ParticleField';
import FloatingShapes from './FloatingShapes';

function CameraController({
  tourActive,
  selectedProjectIndex,
  totalProjects,
  reducedMotion
}) {
  const targetPosition = useRef(new THREE.Vector3(0, 0.35, 6.2));
  const lookTarget = useRef(new THREE.Vector3(0, 0.35, 0));

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const camera = state.camera;

    if (tourActive && !reducedMotion) {
      const orbitAngle = time * 0.24;
      const radius = 7.2;

      targetPosition.current.set(
        Math.sin(orbitAngle) * radius * 0.62,
        0.6 + Math.sin(time * 0.7) * 0.25,
        5.8 + Math.cos(orbitAngle) * 1.25
      );

      lookTarget.current.set(
        Math.sin(time * 0.34) * 0.45,
        0.35,
        0
      );
    } else {
      const normalizedIndex =
        totalProjects > 1
          ? selectedProjectIndex / (totalProjects - 1) - 0.5
          : 0;

      targetPosition.current.set(
        normalizedIndex * 0.45,
        0.35 + Math.sin(time * 0.5) * 0.025,
        6.2
      );

      lookTarget.current.set(
        normalizedIndex * 0.35,
        0.25,
        0
      );
    }

    const smoothing = 1 - Math.exp(-delta * 4.0);
    camera.position.lerp(targetPosition.current, smoothing);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function SceneEnvironment({ activeColor, reducedMotion }) {
  const floorRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (floorRef.current && !reducedMotion) {
      floorRef.current.material.opacity = 0.2 + Math.sin(time * 1.5) * 0.03;
    }
  });

  return (
    <>
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3.08, 0]}
      >
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial
          color="#050912"
          metalness={0.6}
          roughness={0.4}
          transparent
          opacity={0.2}
        />
      </mesh>

      <gridHelper
        args={[32, 32, '#13434c', '#0c1d2a']}
        position={[0, -3.04, 0]}
      />

      <mesh position={[0, 4.4, -3.8]}>
        <planeGeometry args={[22, 9]} />
        <meshBasicMaterial color="#070b16" transparent opacity={0.7} />
      </mesh>

      <mesh position={[0, 0.6, -3.62]}>
        <planeGeometry args={[18, 6.5]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <pointLight
        position={[0, 1.4, 2.5]}
        color={activeColor}
        intensity={1.2}
        distance={10}
      />

      <pointLight
        position={[-5, 1, -2]}
        color="#00f0ff"
        intensity={1.5}
        distance={8}
      />

      <pointLight
        position={[5, 1, -1]}
        color="#ff2ed1"
        intensity={1.5}
        distance={8}
      />
    </>
  );
}

export default function ArcadeScene({
  projects,
  selectedProject,
  onSelectProject,
  isTourActive,
  reducedMotion
}) {
  const activeColor = selectedProject?.color || '#ff2ed1';
  const selectedIndex = Math.max(
    projects.findIndex((project) => project.id === selectedProject?.id),
    0
  );

  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0.35, 6.2], fov: 48 }}
        dpr={1}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={['#070b14']} />
        <fog attach="fog" args={['#070b14', 7, 19]} />

        <ambientLight intensity={0.6} />

        <directionalLight
          position={[4, 8, 6]}
          intensity={1.8}
          color="#d9f5ff"
        />

        <Suspense fallback={null}>
          <SceneEnvironment
            activeColor={activeColor}
            reducedMotion={reducedMotion}
          />

          <Stars
            radius={55}
            depth={50}
            count={reducedMotion ? 150 : 600}
            factor={3}
            saturation={0.3}
            fade
            speed={reducedMotion ? 0 : 0.3}
          />

          {!reducedMotion && (
            <>
              <FloatingShapes primaryColor={activeColor} />
              <ParticleField
                count={100}
                primaryColor={activeColor}
              />
            </>
          )}

          <ArcadeCabinet activeColor={activeColor} />

          <group position={[0, 0, 0.4]}>
            {projects.map((project, index) => (
              <CartridgeMesh
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                isSelected={selectedProject?.id === project.id}
                onSelect={onSelectProject}
                isTourActive={isTourActive}
              />
            ))}
          </group>

          <OrbitControls
            enableDamping
            dampingFactor={0.08}
            enableZoom={false}
            enablePan={false}
            minDistance={5.4}
            maxDistance={7.4}
            maxPolarAngle={Math.PI / 2 + 0.08}
            minPolarAngle={Math.PI / 3}
            maxAzimuthAngle={Math.PI / 6}
            minAzimuthAngle={-Math.PI / 6}
            enabled={!isTourActive}
          />

          <CameraController
            tourActive={isTourActive}
            selectedProjectIndex={selectedIndex}
            totalProjects={projects.length}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}