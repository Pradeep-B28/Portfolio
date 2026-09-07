import React, { useState } from 'react';
import { PickIcon } from './Icons';
import { Zap, Play, Pause, ChevronUp, Layers, Compass, ArrowDown } from 'lucide-react';
import { audio8D } from '../utils/audio8D';
import { CAREER_PHASES } from '../data/careerPhases';

interface ExcavationMachineControlsProps {
  currentDepth: number;
  isDigging: boolean;
  isAutoDigging: boolean;
  unearthedCount: number;
  totalArtifacts: number;
  onDigNext: () => void;
  onAscendSurface: () => void;
  onToggleAutoDig: () => void;
  onJumpToDepth: (depth: number) => void;
}

export const ExcavationMachineControls: React.FC<ExcavationMachineControlsProps> = ({
  currentDepth,
  isDigging,
  isAutoDigging,
  unearthedCount,
  totalArtifacts,
  onDigNext,
  onAscendSurface,
  onToggleAutoDig,
  onJumpToDepth,
}) => {
  const [isLeverPulled, setIsLeverPulled] = useState(false);

  const activePhase = CAREER_PHASES.find(
    (p) => currentDepth >= p.layerDepthMin && currentDepth <= p.layerDepthMax
  ) || CAREER_PHASES[0];

  const handlePullLever = () => {
    setIsLeverPulled(true);
    audio8D.playMachineDrillSound();
    onDigNext();
    setTimeout(() => setIsLeverPulled(false), 500);
  };

  return (
    <div className="fixed bottom-6 left-14 md:left-20 z-40 w-[calc(100%-4.5rem)] max-w-sm sm:max-w-md md:w-[380px] lg:w-[420px] font-mono">
      <div className="dirt-glass-gold p-4 md:p-5 rounded-3xl border-2 border-[#E8C468]/50 shadow-2xl space-y-3 relative overflow-hidden">
        {/* Hydraulic Status Header Bar */}
        <div className="flex items-center justify-between border-b border-[#D9A86C]/20 pb-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#241408] border border-[#E8C468]/40 animate-dig-pulse">
              <PickIcon className="w-4 h-4 text-[#E8C468]" />
            </div>
            <div>
              <span className="font-bold text-[#E8C468] uppercase tracking-wider text-[11px] block">
                12D JCB DIGGER COCKPIT
              </span>
              <p className="text-[10px] text-[#A88A66] hidden sm:block">
                HYDRAULIC CONTROLS · DIG SAND TO REVEAL DATA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#140A05] border border-[#E8C468]/30 text-[#E8C468]">
              <Compass className="w-3.5 h-3.5" />
              <span>DEPTH: <strong className="text-[#F2E8D5]">{Math.round(currentDepth)}m</strong> / 100m</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#140A05] text-[#A88A66] hidden md:flex">
              <span>UNEARTHED: {unearthedCount}/{totalArtifacts}</span>
            </div>
          </div>
        </div>

        {/* Stratum Layer & Hydraulic Pressure Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] bg-[#140A05]/80 p-2.5 rounded-xl border border-[#D9A86C]/20">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#E8C468]" />
            <span className="text-[#A88A66]">ACTIVE STRATUM:</span>
            <span className="text-[#F2E8D5] font-bold">{activePhase.title}</span>
          </div>

          <div className="flex items-center gap-2 text-[#E8C468]">
            <Zap className="w-3.5 h-3.5" />
            <span>PRESSURE: {isDigging ? '3,800 PSI (DRILLING)' : '1,200 PSI (READY)'}</span>
          </div>
        </div>

        {/* Main Machine Control Action Buttons & Hydraulic Lever */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Primary Machine Lever Dig Button */}
          <button
            onClick={handlePullLever}
            disabled={isDigging}
            className={`flex-1 min-w-[200px] py-3.5 px-6 rounded-2xl font-bold text-xs md:text-sm transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-xl ${
              isLeverPulled || isDigging
                ? 'bg-[#B9673A] text-[#F2E8D5] border-2 border-[#E8C468] scale-95 gold-glow'
                : 'bg-gradient-to-r from-[#E8C468] via-[#D9A86C] to-[#E8C468] text-[#140A05] hover:brightness-110 hover:scale-[1.02] border-2 border-[#E8C468] gold-glow'
            }`}
          >
            <ArrowDown className={`w-5 h-5 ${isDigging ? 'animate-bounce' : ''}`} />
            <span>
              {isDigging
                ? 'DRILLING THROUGH GROUND...'
                : currentDepth >= 98
                ? 'BEDROCK REACHED! (RE-EXCAVATE)'
                : 'PULL LEVER: DIG GROUND DEEPER'}
            </span>
          </button>

          {/* Secondary Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleAutoDig}
              className={`px-3.5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                isAutoDigging
                  ? 'bg-[#B9673A] text-[#F2E8D5] border-[#E8C468] animate-pulse'
                  : 'bg-[#241408] text-[#A88A66] hover:text-[#E8C468] border-[#D9A86C]/30'
              }`}
              title="Toggle Automated Continuous Drilling"
            >
              {isAutoDigging ? <Pause className="w-4 h-4 text-[#E8C468]" /> : <Play className="w-4 h-4 text-[#E8C468]" />}
              <span className="hidden sm:inline">{isAutoDigging ? 'STOP AUTO' : 'AUTO-DIG'}</span>
            </button>

            <button
              onClick={onAscendSurface}
              className="px-3.5 py-3 rounded-2xl bg-[#241408] border border-[#D9A86C]/30 text-[#A88A66] hover:text-[#E8C468] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Ascend Drill Machine to Surface (0m)"
            >
              <ChevronUp className="w-4 h-4" />
              <span className="hidden sm:inline">SURFACE (0m)</span>
            </button>
          </div>
        </div>

        {/* Stratum Jump Lever Buttons */}
        <div className="flex gap-1.5 overflow-x-auto pt-1 no-scrollbar text-[10px]">
          {CAREER_PHASES.map((p) => (
            <button
              key={p.id}
              onClick={() => onJumpToDepth(p.layerDepthMin)}
              className={`px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors cursor-pointer ${
                currentDepth >= p.layerDepthMin && currentDepth <= p.layerDepthMax
                  ? 'bg-[#E8C468] text-[#140A05] font-bold border-[#E8C468]'
                  : 'bg-[#140A05] text-[#A88A66] border-[#D9A86C]/20 hover:text-[#F2E8D5]'
              }`}
            >
              {p.layerDepthMin}m - {p.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
