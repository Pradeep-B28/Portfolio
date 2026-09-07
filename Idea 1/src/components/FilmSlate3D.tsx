import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PortfolioClip } from '../data/clips';

interface FilmSlate3DProps {
  clip: PortfolioClip;
  index: number;
  totalClips: number;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (index: number) => void;
  onHover: (index: number | null) => void;
  position: [number, number, number];
  rotation: [number, number, number];
  prefersReducedMotion: boolean;
}

export const FilmSlate3D: React.FC<FilmSlate3DProps> = ({
  clip,
  index,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  position,
  rotation,
  prefersReducedMotion,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const borderMeshRef = useRef<THREE.Mesh>(null);

  // Organic analog tilt
  const randomRotationZ = useMemo(() => {
    return Math.sin(index * 999) * 0.025;
  }, [index]);

  // High-DPI HTML Canvas Texture
  const canvasTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 750;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Base background
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#07090e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Film strip top & bottom sprocket bars
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, 60);
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

    // Sprocket holes
    ctx.fillStyle = '#07090e';
    for (let x = 30; x < canvas.width; x += 70) {
      ctx.beginPath();
      ctx.roundRect(x, 15, 34, 32, 6);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(x, canvas.height - 47, 34, 32, 6);
      ctx.fill();
    }

    // Header Clapper Slate Bar
    const headerColor = clip.reelColor || (clip.takeType === 'GOOD TAKE' ? '#22d3ee' : '#a855f7');
    ctx.fillStyle = headerColor;
    ctx.fillRect(0, 60, canvas.width, 48);

    // Diagonal stencil stripes
    ctx.fillStyle = '#07090e';
    for (let x = -50; x < canvas.width; x += 85) {
      ctx.beginPath();
      ctx.moveTo(x, 60);
      ctx.lineTo(x + 35, 60);
      ctx.lineTo(x + 14, 108);
      ctx.lineTo(x - 21, 108);
      ctx.closePath();
      ctx.fill();
    }

    // Category Badge Tag (Right Aligned)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    const catText = clip.category.toUpperCase();
    ctx.font = 'bold 22px "Fira Code", monospace';
    const catWidth = ctx.measureText(catText).width + 36;
    ctx.roundRect(canvas.width - catWidth - 50, 125, catWidth, 42, 8);
    ctx.fill();
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(catText, canvas.width - catWidth - 32, 153);

    // Cut & Take Stamp (Left Aligned)
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 46px "Fira Code", monospace';
    ctx.fillText(`CUT 0${index + 1} // ${clip.takeType}`, 60, 160);

    // Subtitle & Timeframe (Full text, auto sized)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`${clip.subtitle} · ${clip.timeframe}`, 60, 215);

    // Title (Full text, dynamic sizing)
    ctx.fillStyle = '#f8fafc';
    ctx.font = clip.title.length > 30 ? 'bold 44px "Outfit", sans-serif' : 'bold 54px "Outfit", sans-serif';
    ctx.fillText(clip.title, 60, 290);

    // Narrative Description Wrapping
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '25px "Plus Jakarta Sans", sans-serif';
    const words = clip.description.split(' ');
    let line = '';
    let y = 355;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 1080 && i > 0) {
        ctx.fillText(line, 60, y);
        line = words[i] + ' ';
        y += 38;
        if (y > 510) break;
      } else {
        line = testLine;
      }
    }
    if (y <= 510) {
      ctx.fillText(line, 60, y);
    }

    // Tech Stack Badges (All tags wrapping across bottom)
    let techX = 60;
    let techY = 625;
    ctx.font = 'bold 20px "Fira Code", monospace';
    clip.techStack.forEach((tech) => {
      const textWidth = ctx.measureText(tech).width;
      if (techX + textWidth + 24 > canvas.width - 60) {
        techX = 60;
        techY += 42;
      }
      if (techY <= 670) {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(techX - 8, techY - 26, textWidth + 20, 34);
        ctx.fillStyle = '#22d3ee';
        ctx.fillText(tech, techX, techY);
        techX += textWidth + 30;
      }
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [clip, index]);

  // Smooth lerp frame updates
  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (prefersReducedMotion) {
      meshRef.current.scale.set(isSelected ? 1.1 : 1.0, isSelected ? 1.1 : 1.0, isSelected ? 1.1 : 1.0);
      meshRef.current.rotation.y = rotation[1];
      meshRef.current.rotation.x = rotation[0];
      meshRef.current.position.z = position[2] + (isSelected ? 0.8 : 0);
      return;
    }

    const targetScale = isSelected ? 1.14 : isHovered ? 1.06 : 1.0;
    const targetRotY = rotation[1] + (isHovered ? 0.12 : 0);
    const targetRotX = rotation[0] + (isHovered ? -0.06 : 0);
    const targetZ = position[2] + (isSelected ? 1.2 : isHovered ? 0.5 : 0);

    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 6);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 6);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, delta * 8);

    if (borderMeshRef.current && isSelected) {
      const mat = borderMeshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.7 + Math.sin(Date.now() * 0.004) * 0.25;
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={[rotation[0], rotation[1], randomRotationZ]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(index);
      }}
      onPointerOut={() => onHover(null)}
    >
      {/* Slate Front Face */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.4, 2.75, 0.08]} />
        <meshStandardMaterial map={canvasTexture || undefined} roughness={0.2} metalness={0.2} />
      </mesh>

      {/* Neon Glow Border Frame */}
      <mesh ref={borderMeshRef} position={[0, 0, -0.01]}>
        <boxGeometry args={[4.54, 2.89, 0.06]} />
        <meshBasicMaterial
          color={clip.reelColor || (clip.takeType === 'GOOD TAKE' ? '#22d3ee' : '#a855f7')}
          transparent
          opacity={isSelected ? 0.95 : isHovered ? 0.7 : 0.3}
        />
      </mesh>
    </group>
  );
};
