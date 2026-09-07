import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { SKILLS } from '../data/skills';
import type { SkillStar } from '../data/skills';
import { CONSTELLATIONS } from '../data/projects';
import type { ConstellationProject } from '../data/projects';

interface StarMap3DProps {
  activeProject: ConstellationProject | null;
  selectedSkillId: string | null;
  selectedYear: number | null;
  activePreset: string;
  onSelectProject: (project: ConstellationProject) => void;
  onSelectSkill: (skillId: string) => void;
  prefersReducedMotion: boolean;
}

// 3D Background Nebula Particles with Cursor Mouse Repulsion
function BackgroundNebulaDust({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const count = 450;
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorChoices = ['#E8C468', '#4DEBFF', '#B55FE6', '#7C8AA6'];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 140;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 140;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 140;

      const c = new THREE.Color(colorChoices[Math.floor(Math.random() * colorChoices.length)]);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current && !prefersReducedMotion) {
      pointsRef.current.rotation.y += delta * 0.025;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.65}
        vertexColors
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3D Orbiting Core Object at Constellation Center
function ConstellationCoreObject({ project, isActive }: { project: ConstellationProject; isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  const connectedSkills = SKILLS.filter((s) => project.connectedSkillIds.includes(s.id));
  const centerPos = useMemo(() => {
    if (connectedSkills.length === 0) return new THREE.Vector3(0, 0, 0);
    let cx = 0, cy = 0, cz = 0;
    connectedSkills.forEach((s) => {
      cx += s.position[0];
      cy += s.position[1];
      cz += s.position[2];
    });
    return new THREE.Vector3(cx / connectedSkills.length, cy / connectedSkills.length, cz / connectedSkills.length);
  }, [connectedSkills]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[centerPos.x, centerPos.y, centerPos.z]}>
      <mesh scale={isActive ? [1.5, 1.5, 1.5] : [1, 1, 1]}>
        {project.isAnchor ? <icosahedronGeometry args={[1.2, 0]} /> : <octahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={project.isAnchor ? '#4DEBFF' : '#E8C468'}
          wireframe
          emissive={project.isAnchor ? '#B55FE6' : '#B9673A'}
          emissiveIntensity={isActive ? 1.2 : 0.4}
        />
      </mesh>
      {isActive && (
        <mesh>
          <torusGeometry args={[2.5, 0.04, 16, 64]} />
          <meshBasicMaterial color="#4DEBFF" transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}

function SkillStarNode({
  skill,
  isSelected,
  isDimmed,
  onSelectSkill,
}: {
  skill: SkillStar;
  isSelected: boolean;
  isDimmed: boolean;
  onSelectSkill: (id: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <group position={skill.position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSkill(skill.id);
        }}
        scale={isSelected ? [1.6, 1.6, 1.6] : [skill.magnitudeSize, skill.magnitudeSize, skill.magnitudeSize]}
      >
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? '#4DEBFF' : '#E8C468'}
          emissive={isSelected ? '#4DEBFF' : '#E8C468'}
          emissiveIntensity={isDimmed ? 0.2 : isSelected ? 1.5 : skill.glowIntensity}
          transparent
          opacity={isDimmed ? 0.25 : 0.95}
        />
      </mesh>

      <Html distanceFactor={25} position={[0, 0.7, 0]} zIndexRange={[100, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelectSkill(skill.id);
          }}
          className={`px-2 py-0.5 rounded text-[10px] font-mono select-none cursor-pointer whitespace-nowrap transition-all ${
            isSelected
              ? 'bg-[#4DEBFF] text-[#050810] font-bold shadow-lg scale-110'
              : isDimmed
              ? 'text-[#7C8AA6]/40 bg-[#050810]/40'
              : 'text-[#EAF0FA] bg-[#0D1526]/80 hover:text-[#E8C468] hover:border-[#E8C468]/50 border border-[#7C8AA6]/30'
          }`}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

function ConstellationLines({
  project,
  isActive,
  isDimmed,
  onSelectProject,
}: {
  project: ConstellationProject;
  isActive: boolean;
  isDimmed: boolean;
  onSelectProject: (project: ConstellationProject) => void;
}) {
  const connectedSkills = SKILLS.filter((s) => project.connectedSkillIds.includes(s.id));

  const linePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < connectedSkills.length; i++) {
      for (let j = i + 1; j < connectedSkills.length; j++) {
        points.push(new THREE.Vector3(...connectedSkills[i].position));
        points.push(new THREE.Vector3(...connectedSkills[j].position));
      }
    }
    return points;
  }, [connectedSkills]);

  if (linePoints.length === 0) return null;

  const lineColor = project.isAnchor ? '#4DEBFF' : '#E8C468';

  return (
    <group onClick={(e) => { e.stopPropagation(); onSelectProject(project); }}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(linePoints.flatMap((p) => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={isDimmed ? 0.1 : isActive ? 0.95 : project.isAnchor ? 0.65 : 0.35}
          linewidth={project.complexity}
        />
      </lineSegments>
    </group>
  );
}

function CameraController({
  activeProject,
  prefersReducedMotion,
}: {
  activeProject: ConstellationProject | null;
  prefersReducedMotion: boolean;
}) {
  const controlsRef = useRef<any>(null!);

  useEffect(() => {
    if (!activeProject || !controlsRef.current) return;

    const connectedSkills = SKILLS.filter((s) => activeProject.connectedSkillIds.includes(s.id));
    if (connectedSkills.length === 0) return;

    let cx = 0, cy = 0, cz = 0;
    connectedSkills.forEach((s) => {
      cx += s.position[0];
      cy += s.position[1];
      cz += s.position[2];
    });
    cx /= connectedSkills.length;
    cy /= connectedSkills.length;
    cz /= connectedSkills.length;

    const targetPos = new THREE.Vector3(cx, cy, cz);
    const cameraPos = new THREE.Vector3(cx, cy, cz + 24);

    if (prefersReducedMotion) {
      controlsRef.current.object.position.copy(cameraPos);
      controlsRef.current.target.copy(targetPos);
      controlsRef.current.update();
    } else {
      const startCam = controlsRef.current.object.position.clone();
      const startTarget = controlsRef.current.target.clone();
      let progress = 0;

      const animateCamera = () => {
        progress += 0.04;
        if (progress <= 1) {
          controlsRef.current.object.position.lerpVectors(startCam, cameraPos, progress);
          controlsRef.current.target.lerpVectors(startTarget, targetPos, progress);
          controlsRef.current.update();
          requestAnimationFrame(animateCamera);
        }
      };
      animateCamera();
    }
  }, [activeProject, prefersReducedMotion]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      minDistance={10}
      maxDistance={60}
      maxPolarAngle={Math.PI - 0.1}
      minPolarAngle={0.1}
    />
  );
}

export const StarMap3D: React.FC<StarMap3DProps> = ({
  activeProject,
  selectedSkillId,
  selectedYear,
  activePreset,
  onSelectProject,
  onSelectSkill,
  prefersReducedMotion,
}) => {
  const filterByPreset = (project: ConstellationProject) => {
    if (activePreset === 'all') return true;
    if (activePreset === 'bigtech') {
      return project.category === 'Architectural' || project.category === 'AI & Tooling';
    }
    if (activePreset === 'lead') {
      return project.category === 'Pedagogical' || project.id.includes('ethnus');
    }
    if (activePreset === 'trainer') {
      return project.connectedSkillIds.includes('java') || project.connectedSkillIds.includes('dsa');
    }
    if (activePreset === 'architect') {
      return project.category === 'Architectural' || project.category === 'AI & Tooling';
    }
    return true;
  };

  return (
    <div className="fixed inset-0 pointer-events-auto z-0">
      <Canvas
        camera={{ position: [0, 0, 36], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 15]} intensity={1.2} color="#E8C468" />
        <pointLight position={[-10, -20, -10]} intensity={1.0} color="#4DEBFF" />

        <CameraController
          activeProject={activeProject}
          prefersReducedMotion={prefersReducedMotion}
        />

        <BackgroundNebulaDust prefersReducedMotion={prefersReducedMotion} />

        {SKILLS.map((skill) => {
          const isSelected = selectedSkillId === skill.id;
          const isDimmedBySkill = selectedSkillId !== null && !isSelected;
          const isDimmedByYear = selectedYear !== null && !CONSTELLATIONS.some((p) => p.year === selectedYear && p.connectedSkillIds.includes(skill.id));
          const isDimmed = isDimmedBySkill || isDimmedByYear;

          return (
            <SkillStarNode
              key={skill.id}
              skill={skill}
              isSelected={isSelected}
              isDimmed={isDimmed}
              onSelectSkill={onSelectSkill}
            />
          );
        })}

        {CONSTELLATIONS.map((project) => {
          const isActive = activeProject?.id === project.id;
          const matchesPreset = filterByPreset(project);
          const isDimmedBySkill = selectedSkillId !== null && !project.connectedSkillIds.includes(selectedSkillId);
          const isDimmedByYear = selectedYear !== null && project.year !== selectedYear;
          const isDimmed = (activeProject !== null && !isActive) || isDimmedBySkill || isDimmedByYear || !matchesPreset;

          return (
            <React.Fragment key={project.id}>
              <ConstellationLines
                project={project}
                isActive={isActive}
                isDimmed={isDimmed}
                onSelectProject={onSelectProject}
              />
              <ConstellationCoreObject
                project={project}
                isActive={isActive}
              />
            </React.Fragment>
          );
        })}
      </Canvas>
    </div>
  );
};
