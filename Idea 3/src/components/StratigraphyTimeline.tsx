import React from 'react';
import { CAREER_PHASES } from '../data/careerPhases';
import type { CareerPhase } from '../data/careerPhases';

interface StratigraphyTimelineProps {
  currentDepth: number; // 0 to 100
  onJumpToLayer: (layer: CareerPhase) => void;
}

export const StratigraphyTimeline: React.FC<StratigraphyTimelineProps> = ({
  currentDepth,
  onJumpToLayer,
}) => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 z-30 flex flex-col justify-between items-center py-6 px-2 w-12 md:w-16 dirt-glass border-r border-[#D9A86C]/20 select-none">
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-[10px] text-[#A88A66] uppercase tracking-widest rotate-180 writing-mode-vertical hidden md:block">
          DEPTH GAUGE
        </span>
        <div className="bg-[#140A05] border border-[#E8C468]/40 px-1.5 py-1 rounded text-center">
          <span className="font-mono text-xs font-bold text-[#E8C468]">
            {Math.round(currentDepth)}m
          </span>
        </div>
      </div>

      <div className="relative w-full flex-1 my-4 flex flex-col items-center justify-between">
        <div className="absolute top-0 bottom-0 w-0.5 bg-[#D9A86C]/20 left-1/2 -translate-x-1/2" />

        <div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E8C468] gold-glow border-2 border-[#140A05] z-10 transition-all duration-150"
          style={{ top: `${Math.min(Math.max(currentDepth, 0), 100)}%` }}
        />

        {CAREER_PHASES.map((phase) => {
          const isActive = currentDepth >= phase.layerDepthMin && currentDepth <= phase.layerDepthMax;

          return (
            <button
              key={phase.id}
              onClick={() => onJumpToLayer(phase)}
              className="group relative flex items-center justify-center z-10 cursor-pointer my-1"
              title={`${phase.title} (${phase.dates})`}
            >
              <div
                className={`w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'bg-[#E8C468] border-[#F2E8D5] scale-125 gold-glow'
                    : 'bg-[#241408] border-[#D9A86C]/40 group-hover:border-[#E8C468] group-hover:scale-110'
                }`}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: phase.strataColor }}
                />
              </div>

              <div className="absolute left-14 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap">
                <div className="dirt-glass-gold px-3 py-2 rounded-lg text-xs space-y-0.5">
                  <p className="font-editorial font-bold text-[#F2E8D5]">{phase.title}</p>
                  <p className="font-mono text-[#A88A66] text-[11px]">{phase.roleTitle} ({phase.dates})</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <span className="font-mono text-[10px] text-[#A88A66] uppercase tracking-widest text-center">
        100m
      </span>
    </aside>
  );
};
