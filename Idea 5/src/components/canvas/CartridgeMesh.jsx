import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';
import { sounds } from '../../utils/soundEffects';

export default function CartridgeMesh({
  project,
  index,
  total,
  isSelected,
  onSelect,
  isTourActive
}) {
  const meshRef = useRef();
  const auraRingRef = useRef();
  const auraRingInnerRef = useRef();
  const hologramRef = useRef();
  const labelRef = useRef();
  const [hovered, setHovered] = useState(false);

  const spacing = 1.08;
  const startX = -((total - 1) * spacing) / 2;
  const targetX = startX + index * spacing;
  const identityColor = project.color || '#00f0ff';
  const isActive = hovered || isSelected;

  useFrame((state, delta) => {
    if (!meshRef.current) {
      return;
    }

    const time = state.clock.getElapsedTime();

    const idleFloat = Math.sin(time * 2 + index * 0.8) * 0.065;
    const idleRotation = Math.cos(time * 1.4 + index) * 0.025;

    const targetY = isSelected
      ? 0.72
      : hovered
        ? 0.38
        : idleFloat;

    const targetZ = isSelected
      ? 1.5
      : hovered
        ? 0.44
        : 0;

    const targetScale = isSelected
      ? 1.12
      : hovered
        ? 1.05
        : 1;

    const targetRotationX = isSelected
      ? -0.2
      : hovered
        ? -0.12
        : 0;

    const targetRotationZ = isSelected
      ? 0
      : hovered
        ? 0
        : idleRotation;

    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      delta * 8
    );

    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      targetZ,
      delta * 8
    );

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotationX,
      delta * 8
    );

    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetRotationZ,
      delta * 8
    );

    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 8
    );

    if (auraRingRef.current) {
      auraRingRef.current.rotation.z += delta * 1.8;
      auraRingRef.current.material.opacity =
        0.42 + Math.sin(time * 3 + index) * 0.16;
    }

    if (auraRingInnerRef.current) {
      auraRingInnerRef.current.rotation.z -= delta * 1.2;
      auraRingInnerRef.current.material.opacity =
        0.22 + Math.cos(time * 2.5 + index) * 0.08;
    }

    if (hologramRef.current) {
      hologramRef.current.rotation.y += delta * 1.5;
      hologramRef.current.rotation.x =
        Math.sin(time * 1.6 + index) * 0.1;
    }

    if (labelRef.current) {
      labelRef.current.material.emissiveIntensity =
        isActive
          ? 0.7 + Math.sin(time * 3.4) * 0.18
          : 0.28;
    }
  });

  const handlePointerOver = (event) => {
    event.stopPropagation();
    setHovered(true);
    sounds.playHover();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (event) => {
    event.stopPropagation();
    sounds.playCartridgeInsert();
    onSelect(project);
  };

  return (
    <group
      ref={meshRef}
      position={[targetX, 0, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Selection hologram */}
      {isActive && (
        <group position={[0, 0.98, 0]}>
          <mesh ref={hologramRef}>
            <octahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial
              color="#ffd700"
              emissive="#ffd700"
              emissiveIntensity={2.2}
              wireframe
              transparent
              opacity={0.9}
            />
          </mesh>

          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      )}

      {/* Cartridge shadow shell */}
      <RoundedBox
        args={[1.14, 1.54, 0.3]}
        radius={0.08}
        smoothness={5}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#080c14"
          roughness={0.2}
          metalness={0.94}
        />
      </RoundedBox>

      {/* Rear metallic plate */}
      <mesh position={[0, 0, -0.17]}>
        <boxGeometry args={[0.96, 1.25, 0.05]} />
        <meshStandardMaterial
          color="#283240"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      {/* Front label */}
      <mesh
        ref={labelRef}
        position={[0, 0.06, 0.17]}
      >
        <planeGeometry args={[0.94, 1.2]} />
        <meshStandardMaterial
          color={identityColor}
          emissive={identityColor}
          emissiveIntensity={0.28}
          roughness={0.28}
          metalness={0.35}
        />
      </mesh>

      {/* Label inset */}
      <mesh position={[0, 0.06, 0.181]}>
        <planeGeometry args={[0.82, 1.06]} />
        <meshBasicMaterial
          color="#050811"
          transparent
          opacity={0.76}
        />
      </mesh>

      {/* Label glow strip */}
      <mesh position={[0, 0.54, 0.195]}>
        <boxGeometry args={[0.7, 0.025, 0.01]} />
        <meshStandardMaterial
          color={identityColor}
          emissive={identityColor}
          emissiveIntensity={2}
        />
      </mesh>

      {/* Project title */}
      <Text
        position={[0, 0.13, 0.205]}
        fontSize={0.092}
        color="#f2fbff"
        maxWidth={0.74}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.006}
        outlineColor="#000000"
      >
        {project.title.toUpperCase()}
      </Text>

      {/* Project category */}
      <Text
        position={[0, -0.2, 0.205]}
        fontSize={0.052}
        color={identityColor}
        maxWidth={0.74}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {project.category.toUpperCase()}
      </Text>

      {/* Project year */}
      <Text
        position={[0, -0.39, 0.205]}
        fontSize={0.052}
        color="#b1c1cc"
        anchorX="center"
        anchorY="middle"
      >
        {project.releaseYear} // {project.complexity}
      </Text>

      {/* Complexity badge */}
      <group position={[0.32, 0.45, 0.21]}>
        <mesh>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial color="#05070d" />
        </mesh>

        <mesh>
          <ringGeometry args={[0.075, 0.088, 16]} />
          <meshBasicMaterial
            color={identityColor}
            transparent
            opacity={0.9}
          />
        </mesh>

        <Text
          position={[0, 0, 0.012]}
          fontSize={0.1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {project.complexity}
        </Text>
      </group>

      {/* Side edge highlights */}
      <mesh position={[-0.54, 0, 0.02]}>
        <boxGeometry args={[0.025, 1.15, 0.035]} />
        <meshStandardMaterial
          color={identityColor}
          emissive={identityColor}
          emissiveIntensity={isActive ? 2.4 : 0.7}
        />
      </mesh>

      <mesh position={[0.54, 0, 0.02]}>
        <boxGeometry args={[0.025, 1.15, 0.035]} />
        <meshStandardMaterial
          color={identityColor}
          emissive={identityColor}
          emissiveIntensity={isActive ? 2.4 : 0.7}
        />
      </mesh>

      {/* Gold connector pins */}
      <group position={[0, -0.78, 0]}>
        {[-0.3, -0.1, 0.1, 0.3].map((offset) => (
          <mesh key={offset} position={[offset, 0, 0]}>
            <boxGeometry args={[0.105, 0.1, 0.22]} />
            <meshStandardMaterial
              color="#ffd36a"
              roughness={0.12}
              metalness={0.98}
            />
          </mesh>
        ))}
      </group>

      {/* Rotating selection aura */}
      {isActive && (
        <>
          <mesh
            ref={auraRingRef}
            position={[0, -0.82, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[0.62, 0.82, 40]} />
            <meshBasicMaterial
              color={identityColor}
              side={THREE.DoubleSide}
              transparent
              opacity={0.55}
            />
          </mesh>

          <mesh
            ref={auraRingInnerRef}
            position={[0, -0.8, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[0.46, 0.5, 32]} />
            <meshBasicMaterial
              color="#ffffff"
              side={THREE.DoubleSide}
              transparent
              opacity={0.22}
            />
          </mesh>
        </>
      )}

      {/* Cartridge light source */}
      <pointLight
        position={[0, -0.52, 0.3]}
        color={identityColor}
        intensity={isActive ? 4.2 : 1.1}
        distance={2.3}
      />

      {/* Tour indicator */}
      {isTourActive && isSelected && (
        <Text
          position={[0, 1.28, 0]}
          fontSize={0.055}
          color="#ffd700"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          SCANNING
        </Text>
      )}
    </group>
  );
}