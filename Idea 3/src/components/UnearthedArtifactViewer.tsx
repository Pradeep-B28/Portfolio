import React, { useRef, useEffect } from 'react';
import type { ArtifactProject } from '../data/projects';
import { ARTIFACT_PROJECTS } from '../data/projects';
import { CAREER_PHASES } from '../data/careerPhases';
import { ArtifactCard } from './ArtifactCard';
import { PickIcon } from './Icons';
import { Sparkles, ArrowDown, Zap } from 'lucide-react';
import { audio8D } from '../utils/audio8D';

interface UnearthedArtifactViewerProps {
  currentDepth: number;
  isDigging: boolean;
  unearthedIds: string[];
  activePreset: string;
  onUnearth: (id: string) => void;
  onInspect: (artifact: ArtifactProject) => void;
  onDigNext: () => void;
  prefersReducedMotion: boolean;
}

export const UnearthedArtifactViewer: React.FC<UnearthedArtifactViewerProps> = ({
  currentDepth,
  isDigging,
  unearthedIds,
  activePreset,
  onUnearth,
  onInspect,
  onDigNext,
  prefersReducedMotion,
}) => {
  const sandCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 2D Real-Life Sand Dust Burst Canvas Effect during Digging
  useEffect(() => {
    if (!isDigging) return;
    const canvas = sandCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles = Array.from({ length: 90 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 180,
      y: 80,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * 8 + 2,
      size: Math.random() * 6 + 2,
      color: Math.random() > 0.4 ? '#D9A86C' : '#E8C468',
      alpha: 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // Gravity pull on sand grains
        p.alpha -= 0.02;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (particles.some((p) => p.alpha > 0)) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [isDigging]);

  // Filter artifacts visible up to current depth
  const visibleArtifacts = ARTIFACT_PROJECTS.filter((art) => {
    const matchesDepth = art.depth <= currentDepth + 5;
    if (!matchesDepth) return false;
    if (activePreset === 'all') return true;
    if (activePreset === 'bigtech') return art.impactCategory === 'Architectural' || art.impactCategory === 'AI & Tooling' || art.depth <= 40;
    if (activePreset === 'lead') return art.impactCategory === 'Pedagogical' || art.id.includes('ethnus');
    if (activePreset === 'trainer') return art.techTags.includes('Java') || art.techTags.includes('DSA');
    if (activePreset === 'architect') return art.impactCategory === 'Architectural' || art.impactCategory === 'AI & Tooling';
    return true;
  });

  // Active Stratum Layer Phase based on depth
  const currentPhase = CAREER_PHASES.find(
    (p) => currentDepth >= p.layerDepthMin && currentDepth <= p.layerDepthMax
  ) || CAREER_PHASES[0];

  const handlePromptDig = () => {
    audio8D.playMachineDrillSound();
    onDigNext();
  };

  return (
    <div className="space-y-12 pb-44 font-mono relative">
      {/* Real Sand Dust Explosion Canvas (Positioned behind dialog cards at z-0) */}
      <canvas
        ref={sandCanvasRef}
        width={700}
        height={350}
        className="pointer-events-none fixed top-24 left-1/2 -translate-x-1/2 z-0 opacity-70"
      />

      {/* Current Stratum Layer Header Banner */}
      <div
        className="p-6 md:p-8 rounded-3xl dirt-glass border-l-4 shadow-2xl space-y-4 relative overflow-hidden animate-fadeIn"
        style={{ borderColor: currentPhase.strataColor }}
      >
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E8C468]" />
              <span className="font-mono text-xs text-[#E8C468] uppercase tracking-wider font-semibold">
                ACTIVE EXCAVATION STRATUM ({currentPhase.layerDepthMin}m - {currentPhase.layerDepthMax}m)
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-editorial font-bold text-[#F2E8D5]">
              {currentPhase.roleTitle}
            </h2>
            <p className="text-sm font-mono text-[#D9A86C]">
              Employer: {currentPhase.employer} {currentPhase.client ? `| Client: ${currentPhase.client}` : ''} ({currentPhase.dates})
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-[#140A05] border border-[#D9A86C]/30 text-xs text-[#E8C468] font-bold">
            STRATUM: {currentPhase.strataName}
          </div>
        </div>

        <p className="text-sm md:text-base text-[#F2E8D5]/90 font-sans leading-relaxed">
          {currentPhase.description}
        </p>

        <div className="p-3.5 rounded-2xl bg-[#140A05]/90 border border-[#E8C468]/30 flex flex-wrap items-center gap-2 text-xs text-[#E8C468]">
          <Zap className="w-4 h-4 text-[#E8C468]" />
          <span className="font-bold">KEY STRATUM IMPACT:</span>
          <span className="text-[#F2E8D5] font-semibold">{currentPhase.keyOutcome}</span>
        </div>
      </div>

      {/* List of Real Data Artifact Specimens Emerged from Real Sand */}
      <div className="space-y-12">
        {visibleArtifacts.length === 0 ? (
          <div className="dirt-glass-gold p-8 rounded-3xl text-center space-y-3 max-w-md mx-auto border border-[#E8C468]/30">
            <PickIcon className="w-8 h-8 text-[#E8C468] mx-auto animate-bounce" />
            <h3 className="text-lg font-editorial font-bold text-[#F2E8D5]">
              STEADY EXCAVATOR READY AT TOP SOIL
            </h3>
            <p className="text-xs text-[#A88A66]">
              Pull the machine lever below or press <kbd className="px-1.5 py-0.5 rounded bg-[#140A05] border border-[#E8C468]/40 text-[#E8C468]">SPACE</kbd> to bore through real sand and unearth real data!
            </p>
            <button
              onClick={handlePromptDig}
              className="px-4 py-2 rounded-xl bg-[#E8C468] text-[#140A05] font-bold hover:bg-[#F2E8D5] transition-colors cursor-pointer text-xs"
            >
              PULL LEVER TO DIG SAND
            </button>
          </div>
        ) : (
          visibleArtifacts.map((artifact, index) => (
            <div key={artifact.id} className="animate-fadeIn relative">
              {/* Emerging Sand Dust Trail Banner */}
              <div className="flex items-center justify-between text-[11px] text-[#D9A86C] bg-[#140A05]/90 px-4 py-1.5 rounded-t-2xl border-t border-x border-[#E8C468]/30 max-w-2xl mx-auto">
                <span className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#E8C468]" />
                  REAL DATA EMERGED FROM SAND #{index + 1}
                </span>
                <span>DEPTH: {artifact.depth}m</span>
              </div>

              <ArtifactCard
                artifact={artifact}
                isUnearthed={unearthedIds.includes(artifact.id)}
                onUnearth={onUnearth}
                onInspect={onInspect}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          ))
        )}
      </div>

      {/* Next Dig Prompt Banner */}
      {currentDepth < 95 && (
        <div
          onClick={handlePromptDig}
          className="dirt-glass-gold p-6 rounded-3xl text-center space-y-2 max-w-md mx-auto border border-[#E8C468]/40 hover:border-[#E8C468] transition-all cursor-pointer group shadow-2xl"
        >
          <div className="flex items-center justify-center gap-2 text-xs text-[#E8C468]">
            <ArrowDown className="w-4 h-4 text-[#E8C468] group-hover:translate-y-1 transition-transform" />
            <span className="font-bold">BORE DEEPER INTO REAL SAND!</span>
          </div>
          <p className="text-xs text-[#F2E8D5]">
            Pull steady machine lever to bore through real sand layer and unearth next real data milestone.
          </p>
        </div>
      )}

      {/* Bedrock Final Milestone */}
      {currentDepth >= 95 && (
        <div className="dirt-glass-gold p-8 rounded-3xl text-center space-y-4 max-w-2xl mx-auto border border-[#E8C468]/40 shadow-2xl">
          <PickIcon className="w-10 h-10 text-[#E8C468] mx-auto animate-dig-pulse" />
          <h3 className="text-2xl font-editorial font-bold text-[#F2E8D5]">
            BEDROCK REACHED (100 METERS DEPTH)
          </h3>
          <p className="text-sm text-[#F2E8D5]/90 font-sans leading-relaxed">
            You have fully excavated all real data & software relics of Pradeep B through real subterranean sand. Ready to connect or recruit for top-tier engineering roles at Google, Microsoft, Amazon, TCS, or Zoho?
          </p>
        </div>
      )}
    </div>
  );
};
