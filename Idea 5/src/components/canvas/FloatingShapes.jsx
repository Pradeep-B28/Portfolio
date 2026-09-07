import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingShape({
  position,
  scale,
  color,
  type = 'icosahedron',
  speed = 1,
  offset = 0
}) {
  const shapeRef = useRef();
  const glowRef = useRef();

  useFrame((state, delta) => {
    if (!shapeRef.current || !glowRef.current) {
      return;
    }

    const time = state.clock.getElapsedTime() + offset;

    shapeRef.current.rotation.x += delta * 0.18 * speed;
    shapeRef.current.rotation.y += delta * 0.26 * speed;
    shapeRef.current.rotation.z += delta * 0.08 * speed;

    shapeRef.current.position.y =
      position[1] + Math.sin(time * 0.7 * speed) * 0.24;

    shapeRef.current.position.x =
      position[0] + Math.cos(time * 0.35 * speed) * 0.16;

    glowRef.current.rotation.copy(shapeRef.current.rotation);
    glowRef.current.position.copy(shapeRef.current.position);
    glowRef.current.scale.setScalar(
      1.25 + Math.sin(time * 1.4) * 0.08
    );

    glowRef.current.material.opacity =
      0.08 + Math.sin(time * 1.8 + offset) * 0.025;
  });

  const geometry =
    type === 'torus' ? (
      <torusGeometry args={[0.62, 0.025, 12, 48]} />
    ) : type === 'octahedron' ? (
      <octahedronGeometry args={[0.7, 0]} />
    ) : type === 'dodecahedron' ? (
      <dodecahedronGeometry args={[0.62, 0]} />
    ) : (
      <icosahedronGeometry args={[0.66, 1]} />
    );

  const glowGeometry =
    type === 'torus' ? (
      <torusGeometry args={[0.62, 0.06, 12, 48]} />
    ) : type === 'octahedron' ? (
      <octahedronGeometry args={[0.7, 0]} />
    ) : type === 'dodecahedron' ? (
      <dodecahedronGeometry args={[0.62, 0]} />
    ) : (
      <icosahedronGeometry args={[0.66, 1]} />
    );

  return (
    <group scale={scale}>
      <mesh
        ref={glowRef}
        position={position}
      >
        {glowGeometry}
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          wireframe
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh
        ref={shapeRef}
        position={position}
      >
        {geometry}
        <meshStandardMaterial
          color="#101b2b"
          emissive={color}
          emissiveIntensity={0.35}
          roughness={0.22}
          metalness={0.86}
          wireframe
          transparent
          opacity={0.72}
        />
      </mesh>

      <pointLight
        position={position}
        color={color}
        intensity={0.55}
        distance={3.5}
      />
    </group>
  );
}

function DataRing({
  position,
  color,
  rotation = [0, 0, 0],
  scale = 1,
  offset = 0
}) {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (!ringRef.current) {
      return;
    }

    const time = state.clock.getElapsedTime() + offset;

    ringRef.current.rotation.x += delta * 0.12;
    ringRef.current.rotation.y -= delta * 0.2;
    ringRef.current.rotation.z += delta * 0.06;

    ringRef.current.scale.setScalar(
      scale + Math.sin(time * 1.2) * 0.08
    );
  });

  return (
    <mesh
      ref={ringRef}
      position={position}
      rotation={rotation}
    >
      <torusGeometry args={[0.9, 0.018, 12, 72]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.42}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function FloatingShapes({
  primaryColor = '#00f0ff'
}) {
  return (
    <group>
      <FloatingShape
        position={[-4.9, 2.4, -2.8]}
        scale={0.7}
        color={primaryColor}
        type="icosahedron"
        speed={0.75}
        offset={0}
      />

      <FloatingShape
        position={[4.65, 3.1, -2.4]}
        scale={0.55}
        color="#ff2ed1"
        type="octahedron"
        speed={1.1}
        offset={1.6}
      />

      <FloatingShape
        position={[-5.2, -0.9, -2.1]}
        scale={0.46}
        color="#ffd700"
        type="dodecahedron"
        speed={0.9}
        offset={2.4}
      />

      <FloatingShape
        position={[5.25, -1.1, -2.5]}
        scale={0.5}
        color="#00ff66"
        type="torus"
        speed={0.7}
        offset={3.1}
      />

      <DataRing
        position={[-3.6, 3.25, -2.5]}
        color={primaryColor}
        rotation={[0.6, 0.2, 0.3]}
        scale={0.9}
        offset={0.4}
      />

      <DataRing
        position={[3.8, 2.05, -2.7]}
        color="#ff2ed1"
        rotation={[1.2, 0.5, 0.8]}
        scale={0.62}
        offset={1.8}
      />

      <DataRing
        position={[0, 4.05, -3.2]}
        color="#ffd700"
        rotation={[0.9, 0.2, 0]}
        scale={0.44}
        offset={2.8}
      />
    </group>
  );
}