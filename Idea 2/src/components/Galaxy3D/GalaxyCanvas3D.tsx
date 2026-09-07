import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { GalaxyTheme, PlanetProject } from '../../types/galaxy';
import { GALAXY_THEMES } from '../../types/galaxy';

interface GalaxyCanvas3DProps {
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

const makeLabel = (text: string, color: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (!context) return new THREE.Sprite();
  context.font = '700 28px "Fira Code", monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.shadowColor = color;
  context.shadowBlur = 18;
  context.fillStyle = color;
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthWrite: false }));
  sprite.scale.set(6.6, 1.3, 1);
  return sprite;
};

const generatePlanetTexture = (planetId: string, baseHex: string): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 512, 256);

  if (planetId === 'vit-lnd-ecosystem') {
    // Gas giant swirl bands (Jupiter / Saturn style)
    for (let y = 0; y < 256; y += 6) {
      const alpha = 0.18 + Math.sin(y * 0.12) * 0.14;
      ctx.fillStyle = y % 12 === 0 ? `rgba(255, 255, 255, ${alpha})` : `rgba(244, 114, 182, ${alpha})`;
      ctx.fillRect(0, y, 512, 5);
    }
    // Great storm oval
    ctx.fillStyle = 'rgba(251, 113, 133, 0.65)';
    ctx.beginPath();
    ctx.ellipse(340, 150, 48, 26, 0.15, 0, Math.PI * 2);
    ctx.fill();
  } else if (planetId === 'schema-sentinel') {
    // Volcanic magma fissure crust
    ctx.fillStyle = 'rgba(15, 3, 3, 0.75)';
    for (let i = 0; i < 35; i++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 256, Math.random() * 65 + 20, Math.random() * 35 + 10);
    }
    ctx.strokeStyle = 'rgba(248, 113, 113, 0.85)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      ctx.moveTo(Math.random() * 512, Math.random() * 256);
      ctx.lineTo(Math.random() * 512, Math.random() * 256);
    }
    ctx.stroke();
  } else if (planetId === 'ledger-app') {
    // Oceanic cyan water world with continents & cloud trails
    ctx.fillStyle = 'rgba(8, 47, 73, 0.85)';
    for (let i = 0; i < 16; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 55 + 25, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    for (let i = 0; i < 22; i++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 256, Math.random() * 80 + 15, 4);
    }
  } else if (planetId === 'git-viz-3d') {
    // Quantum violet nebula swirls & stellar flare specks
    for (let i = 0; i < 30; i++) {
      const alpha = Math.random() * 0.4 + 0.12;
      ctx.fillStyle = `rgba(192, 132, 252, ${alpha})`;
      ctx.beginPath();
      ctx.ellipse(Math.random() * 512, Math.random() * 256, Math.random() * 70 + 20, Math.random() * 45 + 10, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // Tech grid / cratered rocky terrain
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 16 + 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
};

const createGlowingStarTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.92)');
    gradient.addColorStop(0.45, 'rgba(167, 243, 208, 0.65)');
    gradient.addColorStop(0.75, 'rgba(103, 232, 249, 0.22)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

export const GalaxyCanvas3D: React.FC<GalaxyCanvas3DProps> = ({
  planets, selectedPlanetId, hoveredPlanetId, visitedPlanetIds, reducedMotion,
  isFocusMode, isMobile, onSelectPlanet, onHoverPlanet, onOpenResume, activeTheme = 'cyber',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ planets, selectedPlanetId, hoveredPlanetId, visitedPlanetIds, reducedMotion, isFocusMode, onSelectPlanet, onHoverPlanet, onOpenResume });

  useEffect(() => {
    stateRef.current = { planets, selectedPlanetId, hoveredPlanetId, visitedPlanetIds, reducedMotion, isFocusMode, onSelectPlanet, onHoverPlanet, onOpenResume };
  }, [planets, selectedPlanetId, hoveredPlanetId, visitedPlanetIds, reducedMotion, isFocusMode, onSelectPlanet, onHoverPlanet, onOpenResume]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const theme = GALAXY_THEMES[activeTheme] || GALAXY_THEMES.cyber;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(theme.bg);
    scene.fog = new THREE.FogExp2(theme.bg, 0.0055);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(isMobile ? 54 : 48, width / height, 0.1, 1000);
    camera.position.set(0, isMobile ? 34 : 29, isMobile ? 43 : 38);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.35 : 1.8));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.touchAction = 'none';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.enablePan = !isMobile;
    controls.minDistance = 13;
    controls.maxDistance = 85;
    controls.maxPolarAngle = Math.PI / 2.08;
    controls.minPolarAngle = Math.PI / 6;
    controls.target.set(0, 0, 0);

    scene.add(new THREE.AmbientLight(0x9bb9dd, 0.55));
    const sunLight = new THREE.PointLight(theme.sunColor, 3.8, 140, 1.5);
    scene.add(sunLight);
    const rimLight = new THREE.PointLight(theme.sunCorona, 2.2, 100, 1.8);
    rimLight.position.set(-25, 22, -20);
    scene.add(rimLight);
    const fillLight = new THREE.DirectionalLight(0xd7e8ff, 1.3);
    fillLight.position.set(28, 38, 25);
    scene.add(fillLight);

    const starCount = isMobile ? 1800 : 3800;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const primary = new THREE.Color(theme.lightPrimary);
    const secondary = new THREE.Color(theme.lightSecondary);
    for (let i = 0; i < starCount; i += 1) {
      const radius = 40 + Math.random() * 80;
      const angle = Math.random() * Math.PI * 2;
      starPositions[i * 3] = Math.cos(angle) * radius;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 90;
      starPositions[i * 3 + 2] = Math.sin(angle) * radius;
      const color = Math.random() > 0.66 ? secondary : primary;
      starColors[i * 3] = color.r; starColors[i * 3 + 1] = color.g; starColors[i * 3 + 2] = color.b;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starTexture = createGlowingStarTexture();
    const starMaterial = new THREE.PointsMaterial({ size: isMobile ? 0.75 : 0.95, map: starTexture, vertexColors: true, transparent: true, opacity: 0.88, blending: THREE.AdditiveBlending, depthWrite: false });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    const sunGroup = new THREE.Group();
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(3.3, 64, 64),
      new THREE.MeshStandardMaterial({ color: theme.sunColor, emissive: theme.sunColor, emissiveIntensity: 2.6, roughness: 0.15, metalness: 0.05 })
    );
    const corona = new THREE.Mesh(
      new THREE.SphereGeometry(3.9, 36, 36),
      new THREE.MeshBasicMaterial({ color: theme.sunCorona, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, side: THREE.BackSide })
    );
    const ringOne = new THREE.Mesh(new THREE.TorusGeometry(4.45, 0.08, 16, 96), new THREE.MeshBasicMaterial({ color: theme.sunColor, transparent: true, opacity: 0.88 }));
    const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(5.3, 0.05, 16, 96), new THREE.MeshBasicMaterial({ color: theme.sunCorona, transparent: true, opacity: 0.52 }));
    ringOne.rotation.x = Math.PI / 2.4; ringTwo.rotation.x = Math.PI / 2.8;
    sunGroup.add(sun, corona, ringOne, ringTwo, makeLabel('PRADEEP STAR', '#ffffff'));
    sunGroup.children[4].position.y = 4.8;
    scene.add(sunGroup);

    const interactables: THREE.Object3D[] = [sun];
    const projectObjects = new Map<string, { group: THREE.Group; mesh: THREE.Mesh; moons: THREE.Group; angle: number; data: PlanetProject }>();

    planets.forEach((planet) => {
      const group = new THREE.Group();
      const textureMap = generatePlanetTexture(planet.id, planet.planetColor);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(planet.planetSize, 48, 48),
        new THREE.MeshStandardMaterial({
          map: textureMap,
          color: planet.planetColor,
          emissive: planet.planetColor,
          emissiveIntensity: 0.22,
          roughness: 0.32,
          metalness: 0.45,
        })
      );
      mesh.userData.id = planet.id;
      group.add(mesh);

      // Fresnel Atmosphere Halo Shell around planet
      const atmosphereHalo = new THREE.Mesh(
        new THREE.SphereGeometry(planet.planetSize * 1.15, 32, 32),
        new THREE.MeshBasicMaterial({
          color: planet.planetColor,
          transparent: true,
          opacity: 0.16,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
        })
      );
      group.add(atmosphereHalo);

      if (planet.ringColor) {
        const planetRing = new THREE.Mesh(
          new THREE.RingGeometry(planet.planetSize * 1.45, planet.planetSize * 2.15, 80),
          new THREE.MeshBasicMaterial({ color: planet.ringColor, transparent: true, opacity: 0.65, side: THREE.DoubleSide })
        );
        planetRing.rotation.x = Math.PI / 3;
        group.add(planetRing);
      }

      const moons = new THREE.Group();
      planet.moons.forEach((_, index) => {
        const moonMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.16, 16, 16),
          new THREE.MeshStandardMaterial({ color: theme.textActive, roughness: 0.4, metalness: 0.6 })
        );
        const angle = (index / planet.moons.length) * Math.PI * 2;
        const moonDist = planet.planetSize + 1.35 + index * 0.3;
        moonMesh.position.set(Math.cos(angle) * moonDist, (index % 2 === 0 ? 0.3 : -0.3), Math.sin(angle) * moonDist);
        moons.add(moonMesh);
      });
      group.add(moons);

      const label = makeLabel(planet.codeName, planet.planetColor);
      label.position.y = planet.planetSize + 1.3;
      group.add(label);
      scene.add(group);
      interactables.push(mesh);
      projectObjects.set(planet.id, { group, mesh, moons, angle: Math.random() * Math.PI * 2, data: planet });
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const updatePointer = (event: PointerEvent) => { const rect = renderer.domElement.getBoundingClientRect(); pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1); raycaster.setFromCamera(pointer, camera); return raycaster.intersectObjects(interactables); };
    const handleClick = (event: PointerEvent) => { const hit = updatePointer(event)[0]?.object; if (hit === sun) onOpenResume?.(); else if (hit?.userData.id) stateRef.current.onSelectPlanet(hit.userData.id); };
    const handleMove = (event: PointerEvent) => { const hit = updatePointer(event)[0]?.object; renderer.domElement.style.cursor = hit ? 'pointer' : 'grab'; stateRef.current.onHoverPlanet(hit?.userData.id || null); };
    renderer.domElement.addEventListener('pointerdown', handleClick);
    renderer.domElement.addEventListener('pointermove', handleMove);

    const resize = () => { const nextWidth = container.clientWidth || window.innerWidth; const nextHeight = container.clientHeight || window.innerHeight; camera.aspect = nextWidth / nextHeight; camera.updateProjectionMatrix(); renderer.setSize(nextWidth, nextHeight); };
    window.addEventListener('resize', resize);
    const clock = new THREE.Clock();
    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const motion = !stateRef.current.reducedMotion;
      if (motion) {
        sunGroup.rotation.y += delta * 0.18;
        ringOne.rotation.z += delta * 0.48;
        ringTwo.rotation.z -= delta * 0.3;
        starField.rotation.y += delta * 0.012;
        starMaterial.opacity = 0.72 + Math.sin(clock.getElapsedTime() * 2.8) * 0.22;
      }
      projectObjects.forEach((object) => {
        if (motion) object.angle += delta * object.data.orbitSpeed * 0.32;
        object.group.position.set(Math.cos(object.angle) * object.data.orbitRadius, Math.sin(object.angle * 2) * 0.72, Math.sin(object.angle) * object.data.orbitRadius);
        object.mesh.rotation.y += delta * 0.5;
        object.moons.rotation.y += delta * 1.4;
        const active = stateRef.current.selectedPlanetId === object.data.id || stateRef.current.hoveredPlanetId === object.data.id;
        const targetScale = active ? 1.25 : 1;
        object.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        const material = object.mesh.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = active ? 0.95 : 0.22;
        material.opacity = stateRef.current.isFocusMode && !active ? 0.38 : 1;
        material.transparent = stateRef.current.isFocusMode && !active;
      });
      const selected = projectObjects.get(stateRef.current.selectedPlanetId || '');
      const target = selected ? selected.group.position : new THREE.Vector3(0, 0, 0);
      controls.target.lerp(target, 0.05);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    return () => { cancelAnimationFrame(animationId); renderer.domElement.removeEventListener('pointerdown', handleClick); renderer.domElement.removeEventListener('pointermove', handleMove); window.removeEventListener('resize', resize); controls.dispose(); renderer.dispose(); starGeometry.dispose(); starMaterial.dispose(); if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement); };
  }, [activeTheme, isMobile, planets]);

  return <div ref={containerRef} className="absolute inset-0 z-0 h-full w-full" aria-label="Interactive 3D project galaxy" />;
};
