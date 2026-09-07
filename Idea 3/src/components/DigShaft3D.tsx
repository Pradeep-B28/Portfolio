import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DigShaft3DProps {
  currentDepth: number; // 0 to 100
  isDigging: boolean;
  prefersReducedMotion: boolean;
  triggerShake: boolean;
}

// Iconic 12D JCB Yellow & Black Excavator Machine Rig anchored on the Left
function JCB12DExcavatorMachine({ isDigging }: { isDigging: boolean }) {
  const jcbGroupRef = useRef<THREE.Group>(null!);
  const boomArmRef = useRef<THREE.Group>(null!);
  const dipperArmRef = useRef<THREE.Group>(null!);
  const bucketRef = useRef<THREE.Group>(null!);
  const pistonRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // JCB Hydraulic Arm Digging Motion Animation
    if (boomArmRef.current && dipperArmRef.current && bucketRef.current) {
      if (isDigging) {
        // Scoop down into sand, curl bucket up, lift sand
        const digCycle = Math.sin(time * 12);
        boomArmRef.current.rotation.z = -0.3 + digCycle * 0.25;
        dipperArmRef.current.rotation.z = 0.6 + digCycle * 0.3;
        bucketRef.current.rotation.z = 0.8 + digCycle * 0.45;
      } else {
        // Idle gentle hydraulic float
        boomArmRef.current.rotation.z = -0.3 + Math.sin(time * 1.5) * 0.05;
        dipperArmRef.current.rotation.z = 0.6 + Math.cos(time * 1.5) * 0.05;
        bucketRef.current.rotation.z = 0.8;
      }
    }

    // Hydraulic Piston Stroke
    if (pistonRef.current) {
      const stroke = isDigging ? Math.sin(time * 12) * 0.2 : 0;
      pistonRef.current.position.x = 0.8 + stroke;
    }

    // JCB Machine vibration shake on digging
    if (jcbGroupRef.current) {
      if (isDigging) {
        jcbGroupRef.current.position.x = -3.8 + (Math.random() - 0.5) * 0.12;
        jcbGroupRef.current.position.y = 0.5 + (Math.random() - 0.5) * 0.08;
      } else {
        jcbGroupRef.current.position.x = -3.8;
        jcbGroupRef.current.position.y = 0.5 + Math.sin(time * 1.2) * 0.03;
      }
    }
  });

  return (
    <group ref={jcbGroupRef} position={[-3.8, 0.5, 3]}>
      {/* Heavy Rubber Crawler Tracks (Left & Right) */}
      <group position={[0, -1.2, 0]}>
        <mesh position={[0, 0, 0.8]}>
          <boxGeometry args={[3.2, 0.6, 0.5]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, -0.8]}>
          <boxGeometry args={[3.2, 0.6, 0.5]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
        {/* Track Wheels */}
        {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) => (
          <mesh key={i} position={[x, -0.05, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.52, 12]} />
            <meshStandardMaterial color="#222222" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Main JCB Machine Body Platform (Iconic JCB Yellow #FDB813) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 1.4, 2.2]} />
        <meshStandardMaterial color="#FDB813" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Engine Counterweight (Dark Charcoal #1C1C1C with JCB Emblem) */}
      <mesh position={[-1.2, 0.1, 0]}>
        <boxGeometry args={[0.8, 1.3, 2.1]} />
        <meshStandardMaterial color="#1C1C1C" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* JCB Operator Driver Glass Cabin */}
      <group position={[0.4, 1.1, 0.6]}>
        <mesh>
          <boxGeometry args={[1.3, 1.3, 1.1]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.2} />
        </mesh>
        {/* Glass Windows */}
        <mesh position={[0.05, 0.1, 0.05]}>
          <boxGeometry args={[1.2, 1.1, 1.02]} />
          <meshStandardMaterial color="#4DEBFF" transparent opacity={0.45} roughness={0.1} />
        </mesh>
      </group>

      {/* JCB Hydraulic Arm Assembly (Iconic Yellow Boom + Dipper + Bucket) */}
      <group position={[1.2, 0.4, -0.4]}>
        {/* Main Boom Arm */}
        <group ref={boomArmRef}>
          <mesh position={[1.0, 0.6, 0]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[2.2, 0.35, 0.35]} />
            <meshStandardMaterial color="#FDB813" roughness={0.3} />
          </mesh>

          {/* Hydraulic Piston Cylinders */}
          <mesh ref={pistonRef} position={[0.8, 0.2, 0.25]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.08, 0.08, 1.2, 12]} />
            <meshStandardMaterial color="#EAF0FA" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Dipper Arm */}
          <group ref={dipperArmRef} position={[2.0, 1.1, 0]}>
            <mesh position={[0.8, -0.4, 0]} rotation={[0, 0, -0.6]}>
              <boxGeometry args={[1.8, 0.3, 0.3]} />
              <meshStandardMaterial color="#FDB813" roughness={0.3} />
            </mesh>

            {/* 12D JCB Digging Bucket with Sharp Diamond Teeth */}
            <group ref={bucketRef} position={[1.6, -1.0, 0]}>
              {/* Bucket Body */}
              <mesh position={[0, -0.2, 0]}>
                <boxGeometry args={[0.9, 0.8, 0.85]} />
                <meshStandardMaterial color="#1C1C1C" roughness={0.5} metalness={0.8} />
              </mesh>

              {/* 5 Sharp Diamond Digging Teeth */}
              {[-0.3, -0.15, 0, 0.15, 0.3].map((z, i) => (
                <mesh key={i} position={[0.5, -0.55, z]} rotation={[0, 0, -0.5]}>
                  <coneGeometry args={[0.06, 0.35, 8]} />
                  <meshStandardMaterial
                    color={isDigging ? '#E8C468' : '#FDB813'}
                    metalness={0.9}
                    emissive={isDigging ? '#E8C468' : '#000000'}
                    emissiveIntensity={isDigging ? 1.0 : 0}
                  />
                </mesh>
              ))}
            </group>
          </group>
        </group>
      </group>

      {/* JCB Work Headlights */}
      <pointLight position={[1.5, 1.2, 0.6]} intensity={isDigging ? 4.0 : 1.8} color="#E8C468" distance={15} />
    </group>
  );
}

// Real Sand Particles & Dust Burst Ejection from Left JCB Bucket
function RealSandJCBPhysics({ isDigging, prefersReducedMotion }: { isDigging: boolean; prefersReducedMotion: boolean }) {
  const sandCount = 180;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < sandCount; i++) {
      temp.push({
        x: -1.2 + (Math.random() - 0.5) * 3, // Originating from Left JCB Bucket contact
        y: -1.5,
        z: (Math.random() - 0.5) * 2 - 1.0,
        vx: Math.random() * 0.25 + 0.05, // Flinging rightward toward center data
        vy: Math.random() * 0.18 + 0.08,
        vz: (Math.random() - 0.5) * 0.15,
        scale: Math.random() * 0.12 + 0.03,
      });
    }
    return temp;
  }, [sandCount]);

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      if (isDigging) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.vy -= 0.009; // Gravity

        if (p.y < -4 || p.x > 5) {
          p.x = -1.2 + (Math.random() - 0.5) * 1.5;
          p.y = -1.5;
          p.vy = Math.random() * 0.2 + 0.06;
        }
      } else {
        p.y += Math.sin(time + i) * 0.005;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.rotation.set(time * 3 + i, time * 2, 0);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, sandCount]}>
      <dodecahedronGeometry args={[0.25, 0]} />
      <meshStandardMaterial
        color="#D9A86C"
        roughness={0.9}
        metalness={0.1}
        emissive={isDigging ? '#E8C468' : '#3B2414'}
        emissiveIntensity={isDigging ? 0.7 : 0.05}
      />
    </instancedMesh>
  );
}

// Real Subterranean Sand Surface & Depth Layers
function RealSandGroundSurface({ currentDepth }: { currentDepth: number }) {
  const groundRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groundRef.current) {
      const targetY = (currentDepth / 100) * 55;
      groundRef.current.position.y = THREE.MathUtils.lerp(groundRef.current.position.y, targetY, 0.08);
    }
  });

  return (
    <group ref={groundRef}>
      {/* Real Sand Ground Surface Texture Bed */}
      <mesh position={[0, -2.5, 2]}>
        <planeGeometry args={[22, 20, 32, 32]} />
        <meshStandardMaterial
          color="#D9A86C"
          roughness={0.95}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subterranean Depth Strata Layers */}
      <mesh position={[0, -22, -2]}>
        <planeGeometry args={[22, 40, 16, 16]} />
        <meshStandardMaterial color="#B9673A" roughness={0.9} />
      </mesh>

      <mesh position={[0, -50, -2]}>
        <planeGeometry args={[22, 40, 16, 16]} />
        <meshStandardMaterial color="#844322" roughness={0.92} />
      </mesh>

      <mesh position={[0, -80, -2]}>
        <planeGeometry args={[22, 40, 16, 16]} />
        <meshStandardMaterial color="#241408" roughness={0.95} />
      </mesh>
    </group>
  );
}

// Camera Controller framed with Left JCB Machine and Center Data View
function SceneCamera({
  isDigging,
  prefersReducedMotion,
  triggerShake,
}: {
  isDigging: boolean;
  prefersReducedMotion: boolean;
  triggerShake: boolean;
}) {
  const shakeOffset = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if ((triggerShake || isDigging) && !prefersReducedMotion) {
      shakeOffset.current.x = (Math.random() - 0.5) * (isDigging ? 0.22 : 0.35);
      shakeOffset.current.y = (Math.random() - 0.5) * (isDigging ? 0.22 : 0.35);
    } else {
      shakeOffset.current.x = THREE.MathUtils.lerp(shakeOffset.current.x, 0, 0.2);
      shakeOffset.current.y = THREE.MathUtils.lerp(shakeOffset.current.y, 0, 0.2);
    }
  });

  return (
    <group position={[shakeOffset.current.x, shakeOffset.current.y, 0]}>
      <ambientLight intensity={0.75} color="#F2E8D5" />
      <directionalLight position={[6, 12, 8]} intensity={1.6} color="#E8C468" castShadow />
      <pointLight position={[-6, -10, 5]} intensity={1.0} color="#D9A86C" />
    </group>
  );
}

export const DigShaft3D: React.FC<DigShaft3DProps> = ({
  currentDepth,
  isDigging,
  prefersReducedMotion,
  triggerShake,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <SceneCamera
          isDigging={isDigging}
          prefersReducedMotion={prefersReducedMotion}
          triggerShake={triggerShake}
        />
        <RealSandGroundSurface currentDepth={currentDepth} />
        {/* 12D Iconic JCB Yellow & Black Excavator Machine on the Left */}
        <JCB12DExcavatorMachine isDigging={isDigging} />
        {/* Real Sand Explosion Particles Flinging Rightward */}
        <RealSandJCBPhysics isDigging={isDigging} prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
      <div className="absolute inset-0 bg-radial from-transparent via-[#1A0E08]/35 to-[#140A05]/95 pointer-events-none" />
    </div>
  );
};
