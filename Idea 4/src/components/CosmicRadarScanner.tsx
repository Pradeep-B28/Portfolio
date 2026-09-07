import React, { useState } from 'react';
import { CONSTELLATIONS } from '../data/projects';
import type { ConstellationProject } from '../data/projects';
import { Compass, Sparkles, Target } from 'lucide-react';
import { audio8D } from '../utils/audio8D';

interface CosmicRadarScannerProps {
  activeProject: ConstellationProject | null;
  onSelectProject: (project: ConstellationProject) => void;
}

export const CosmicRadarScanner: React.FC<CosmicRadarScannerProps> = ({
  activeProject,
  onSelectProject,
}) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const hoveredProject = CONSTELLATIONS.find((p) => p.id === hoveredProjectId);

  const handleBlipClick = (project: ConstellationProject) => {
    audio8D.playConstellationWarp();
    onSelectProject(project);
  };

  return (
    <div className="fixed bottom-4 right-4 md:right-[380px] lg:right-[430px] z-30 font-mono">
      <div className="space-glass-gold rounded-2xl p-3 border border-[#4DEBFF]/40 shadow-2xl space-y-2">
        <div className="flex items-center justify-between gap-3 text-xs border-b border-[#7C8AA6]/20 pb-2">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#4DEBFF] animate-spin" style={{ animationDuration: '9s' }} />
            <span className="font-bold text-[#4DEBFF]">8D COSMIC RADAR</span>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-[10px] text-[#7C8AA6] hover:text-[#4DEBFF] px-2 py-0.5 rounded bg-[#050810]"
          >
            {isMinimized ? 'EXPAND' : 'MINIMIZE'}
          </button>
        </div>

        {!isMinimized && (
          <div className="space-y-2">
            {/* Circular Sweeping Cosmic Radar Container */}
            <div className="relative w-36 h-36 mx-auto rounded-full bg-[#050810] border-2 border-[#4DEBFF]/40 overflow-hidden shadow-inner flex items-center justify-center">
              {/* Concentric Radar Rings */}
              <div className="absolute w-28 h-28 rounded-full border border-[#7C8AA6]/20" />
              <div className="absolute w-20 h-20 rounded-full border border-[#7C8AA6]/20" />
              <div className="absolute w-12 h-12 rounded-full border border-[#7C8AA6]/20" />
              <div className="absolute w-full h-[1px] bg-[#7C8AA6]/20" />
              <div className="absolute h-full w-[1px] bg-[#7C8AA6]/20" />

              {/* Sweeping Cosmic Radar Cone Animation */}
              <div
                className="absolute inset-0 rounded-full origin-center pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(77, 235, 255, 0.35) 0deg, transparent 60deg, transparent 360deg)',
                  animation: 'spin 4s linear infinite',
                }}
              />

              {/* Center Core Star */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#4DEBFF] gold-glow z-10" />

              {/* Constellation Star Blips Positioned Polar Coords */}
              {CONSTELLATIONS.map((proj, idx) => {
                const angle = (idx / CONSTELLATIONS.length) * Math.PI * 2;
                const distRadius = proj.isAnchor ? 34 : 52;
                const x = Math.cos(angle) * distRadius;
                const y = Math.sin(angle) * distRadius;
                const isActive = activeProject?.id === proj.id;
                const isHovered = hoveredProjectId === proj.id;

                return (
                  <button
                    key={proj.id}
                    onClick={() => handleBlipClick(proj)}
                    onMouseEnter={() => setHoveredProjectId(proj.id)}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className={`absolute w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer z-20 ${
                      isActive
                        ? 'bg-[#4DEBFF] border border-white gold-glow scale-125'
                        : proj.isAnchor
                        ? 'bg-[#B55FE6] border border-[#4DEBFF]/60 hover:scale-125'
                        : 'bg-[#E8C468] border border-white/60 hover:scale-125'
                    } ${isHovered ? 'ring-4 ring-[#4DEBFF]/50 scale-150' : ''}`}
                    title={`${proj.title} (${proj.year})`}
                  >
                    <span className="w-1 h-1 rounded-full bg-white" />
                  </button>
                );
              })}
            </div>

            {/* Radar Tooltip preview */}
            <div className="p-2 rounded-lg bg-[#050810] border border-[#4DEBFF]/20 min-h-[46px] text-[11px]">
              {hoveredProject ? (
                <div className="space-y-0.5">
                  <div className="flex justify-between items-center text-[#4DEBFF]">
                    <span className="font-bold truncate max-w-[130px]">{hoveredProject.title}</span>
                    <span className="text-[10px] text-[#E8C468]">{hoveredProject.year}</span>
                  </div>
                  <p className="text-[#7C8AA6] text-[10px] line-clamp-1">{hoveredProject.role}</p>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[#7C8AA6] text-[10px] h-full pt-1">
                  <Target className="w-3.5 h-3.5 text-[#4DEBFF] animate-pulse" />
                  <span>HOVER BLIPS TO SCAN CONSTELLATION NODES</span>
                </div>
              )}
            </div>

            <div className="flex justify-between text-[10px] text-[#7C8AA6]">
              <span>ACTIVE FOCUS: {activeProject ? activeProject.title.slice(0, 12) + '...' : 'ORBIT'}</span>
              <span className="text-[#4DEBFF] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> SCANNER ONLINE
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
