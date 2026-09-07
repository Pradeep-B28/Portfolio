import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export default function ArcadeCabinet({
  activeColor = '#00f0ff'
}) {
  const leftTrimRef = useRef();
  const rightTrimRef = useRef();
  const marqueeLightRef = useRef();
  const screenRef = useRef();
  const screenGlowRef = useRef();
  const joystickRef = useRef();
  const buttonOneRef = useRef();
  const buttonTwoRef = useRef();
  const buttonThreeRef = useRef();
  const buttonFourRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const trimPulse = 1.8 + Math.sin(time * 3.2) * 0.6;
    const screenPulse = 0.45 + Math.sin(time * 3.8) * 0.12;
    const buttonPulse = 1.4 + Math.sin(time * 5.5) * 0.45;

    if (leftTrimRef.current) {
      leftTrimRef.current.material.emissiveIntensity = trimPulse;
    }

    if (rightTrimRef.current) {
      rightTrimRef.current.material.emissiveIntensity = trimPulse;
    }

    if (marqueeLightRef.current) {
      marqueeLightRef.current.intensity =
        2.5 + Math.sin(time * 2.4) * 0.55;
    }

    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = screenPulse;
    }

    if (screenGlowRef.current) {
      screenGlowRef.current.material.opacity =
        0.08 + Math.sin(time * 2.5) * 0.025;
    }

    if (joystickRef.current) {
      joystickRef.current.rotation.x =
        Math.sin(time * 2.2) * 0.12;
      joystickRef.current.rotation.z =
        Math.cos(time * 1.8) * 0.11;
    }

    const buttonRefs = [
      buttonOneRef,
      buttonTwoRef,
      buttonThreeRef,
      buttonFourRef
    ];

    buttonRefs.forEach((buttonRef, index) => {
      if (buttonRef.current) {
        buttonRef.current.material.emissiveIntensity =
          buttonPulse + Math.sin(time * 4 + index) * 0.18;
      }
    });
  });

  return (
    <group position={[0, -0.5, -0.5]}>
      {/* Rear cabinet body */}
      <mesh
        position={[0, 1.2, -1]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[14.2, 8.8, 3.2]} />
        <meshStandardMaterial
          color="#0a0d16"
          roughness={0.22}
          metalness={0.92}
        />
      </mesh>

      {/* Cabinet rear glow panel */}
      <mesh position={[0, 1.35, -2.64]}>
        <planeGeometry args={[12.8, 7.4]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={0.045}
        />
      </mesh>

      {/* Main screen bezel */}
      <mesh position={[0, 2.02, -0.18]} castShadow>
        <boxGeometry args={[11.8, 4.45, 0.46]} />
        <meshStandardMaterial
          color="#03050a"
          roughness={0.12}
          metalness={0.96}
        />
      </mesh>

      {/* Inner screen glass */}
      <mesh
        ref={screenRef}
        position={[0, 2.02, 0.08]}
        castShadow
      >
        <boxGeometry args={[10.9, 3.62, 0.12]} />
        <meshPhysicalMaterial
          color="#050914"
          emissive={activeColor}
          emissiveIntensity={0.45}
          roughness={0.08}
          metalness={0.35}
          transmission={0.12}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* Screen bloom */}
      <mesh
        ref={screenGlowRef}
        position={[0, 2.02, 0.16]}
      >
        <planeGeometry args={[10.5, 3.25]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Screen scanline accents */}
      {[-1.15, -0.35, 0.45, 1.25].map((offset) => (
        <mesh
          key={offset}
          position={[0, 2.02 + offset, 0.18]}
        >
          <planeGeometry args={[10.2, 0.012]} />
          <meshBasicMaterial
            color={activeColor}
            transparent
            opacity={0.22}
          />
        </mesh>
      ))}

      {/* Screen corner indicators */}
      <mesh position={[-5.1, 3.55, 0.2]}>
        <boxGeometry args={[0.42, 0.035, 0.03]} />
        <meshBasicMaterial color={activeColor} />
      </mesh>

      <mesh position={[-5.3, 3.36, 0.2]}>
        <boxGeometry args={[0.035, 0.42, 0.03]} />
        <meshBasicMaterial color={activeColor} />
      </mesh>

      <mesh position={[5.1, 3.55, 0.2]}>
        <boxGeometry args={[0.42, 0.035, 0.03]} />
        <meshBasicMaterial color={activeColor} />
      </mesh>

      <mesh position={[5.3, 3.36, 0.2]}>
        <boxGeometry args={[0.035, 0.42, 0.03]} />
        <meshBasicMaterial color={activeColor} />
      </mesh>

      {/* Marquee panel */}
      <mesh position={[0, 4.8, -0.08]} castShadow>
        <boxGeometry args={[12.8, 1.35, 0.68]} />
        <meshStandardMaterial
          color="#05070e"
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Marquee inner plate */}
      <mesh position={[0, 4.8, 0.28]}>
        <boxGeometry args={[11.95, 0.85, 0.08]} />
        <meshStandardMaterial
          color="#101723"
          emissive={activeColor}
          emissiveIntensity={0.18}
          roughness={0.24}
          metalness={0.7}
        />
      </mesh>

      {/* Marquee title */}
      <Text
        position={[0, 4.82, 0.36]}
        fontSize={0.35}
        color={activeColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.035}
      >
        PRADEEP B
      </Text>

      <Text
        position={[0, 4.48, 0.36]}
        fontSize={0.095}
        color="#cfefff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        FULL-STACK ARCHITECT // MASTER TRAINER
      </Text>

      {/* Marquee bars */}
      <mesh position={[0, 5.47, 0.35]}>
        <boxGeometry args={[12.4, 0.065, 0.09]} />
        <meshStandardMaterial
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={3}
        />
      </mesh>

      <mesh position={[0, 4.13, 0.35]}>
        <boxGeometry args={[12.4, 0.065, 0.09]} />
        <meshStandardMaterial
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={3}
        />
      </mesh>

      <pointLight
        ref={marqueeLightRef}
        position={[0, 4.75, 1]}
        color={activeColor}
        intensity={2.5}
        distance={8}
      />

      {/* Vertical neon trims */}
      <mesh
        ref={leftTrimRef}
        position={[-6.42, 1.25, 0.5]}
        castShadow
      >
        <cylinderGeometry args={[0.095, 0.095, 8.55, 20]} />
        <meshStandardMaterial
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={2}
          roughness={0.12}
          metalness={0.65}
        />
      </mesh>

      <mesh
        ref={rightTrimRef}
        position={[6.42, 1.25, 0.5]}
        castShadow
      >
        <cylinderGeometry args={[0.095, 0.095, 8.55, 20]} />
        <meshStandardMaterial
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={2}
          roughness={0.12}
          metalness={0.65}
        />
      </mesh>

      {/* Side vent panels */}
      <group position={[-6.1, 1.55, 0.55]}>
        {[0, 0.22, 0.44, 0.66].map((offset) => (
          <mesh
            key={offset}
            position={[0, offset, 0]}
            rotation={[0, 0, -0.25]}
          >
            <boxGeometry args={[0.08, 0.12, 0.8]} />
            <meshStandardMaterial
              color={activeColor}
              emissive={activeColor}
              emissiveIntensity={0.75}
            />
          </mesh>
        ))}
      </group>

      <group position={[6.1, 1.55, 0.55]}>
        {[0, 0.22, 0.44, 0.66].map((offset) => (
          <mesh
            key={offset}
            position={[0, offset, 0]}
            rotation={[0, 0, 0.25]}
          >
            <boxGeometry args={[0.08, 0.12, 0.8]} />
            <meshStandardMaterial
              color={activeColor}
              emissive={activeColor}
              emissiveIntensity={0.75}
            />
          </mesh>
        ))}
      </group>

      {/* Cartridge shelf */}
      <mesh
        position={[0, -0.85, 0.2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[12.4, 0.28, 2.4]} />
        <meshStandardMaterial
          color="#111621"
          roughness={0.2}
          metalness={0.92}
        />
      </mesh>

      <mesh position={[0, -0.7, -0.7]}>
        <boxGeometry args={[12, 0.075, 0.085]} />
        <meshStandardMaterial
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={3}
        />
      </mesh>

      {/* Control panel */}
      <group position={[0, -2.5, 0.8]}>
        <mesh
          rotation={[0.22, 0, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[12.8, 1.9, 1.6]} />
          <meshStandardMaterial
            color="#0d111b"
            roughness={0.24}
            metalness={0.84}
          />
        </mesh>

        <mesh position={[0, 0.53, 0.5]} rotation={[0.22, 0, 0]}>
          <boxGeometry args={[11.6, 0.035, 0.92]} />
          <meshStandardMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.9}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Arcade buttons */}
        <mesh
          ref={buttonOneRef}
          position={[-3.2, 0.22, 0.4]}
        >
          <cylinderGeometry args={[0.17, 0.17, 0.11, 20]} />
          <meshStandardMaterial
            color="#ff2ed1"
            emissive="#ff2ed1"
            emissiveIntensity={1.5}
          />
        </mesh>

        <mesh
          ref={buttonTwoRef}
          position={[-2.4, 0.22, 0.4]}
        >
          <cylinderGeometry args={[0.17, 0.17, 0.11, 20]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={1.5}
          />
        </mesh>

        <mesh
          ref={buttonThreeRef}
          position={[-1.6, 0.22, 0.4]}
        >
          <cylinderGeometry args={[0.17, 0.17, 0.11, 20]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={1.5}
          />
        </mesh>

        <mesh
          ref={buttonFourRef}
          position={[-0.8, 0.22, 0.4]}
        >
          <cylinderGeometry args={[0.17, 0.17, 0.11, 20]} />
          <meshStandardMaterial
            color="#00ff66"
            emissive="#00ff66"
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Joystick base */}
        <group position={[3.2, 0.22, 0.35]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.36, 0.07, 20]} />
            <meshStandardMaterial
              color="#202938"
              roughness={0.2}
              metalness={0.95}
            />
          </mesh>

          <mesh
            ref={joystickRef}
            position={[0, 0.34, 0]}
          >
            <cylinderGeometry args={[0.048, 0.048, 0.68, 20]} />
            <meshStandardMaterial
              color="#b8ced7"
              roughness={0.18}
              metalness={0.98}
            />

            <mesh position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.2, 20, 20]} />
              <meshStandardMaterial
                color="#ff2ed1"
                emissive="#ff2ed1"
                emissiveIntensity={2}
                roughness={0.15}
                metalness={0.35}
              />
            </mesh>
          </mesh>
        </group>

        {/* Coin slots */}
        <group position={[0, -0.65, 0.8]}>
          <mesh>
            <boxGeometry args={[1.8, 0.9, 0.14]} />
            <meshStandardMaterial
              color="#060810"
              roughness={0.16}
              metalness={0.94}
            />
          </mesh>

          <mesh position={[-0.4, 0, 0.08]}>
            <boxGeometry args={[0.13, 0.46, 0.025]} />
            <meshStandardMaterial
              color="#ff5500"
              emissive="#ff5500"
              emissiveIntensity={2.4}
            />
          </mesh>

          <mesh position={[0.4, 0, 0.08]}>
            <boxGeometry args={[0.13, 0.46, 0.025]} />
            <meshStandardMaterial
              color="#ff5500"
              emissive="#ff5500"
              emissiveIntensity={2.4}
            />
          </mesh>

          <Text
            position={[0, -0.03, 0.09]}
            fontSize={0.095}
            color="#ffb48a"
            anchorX="center"
            anchorY="middle"
          >
            INSERT COIN
          </Text>
        </group>
      </group>
    </group>
  );
}