import React from 'react';
import { Target, Sparkles, Award, Cpu, GraduationCap } from 'lucide-react';
import { audio8D } from '../utils/audio8D';

interface RecruiterFastTrackBarProps {
  activePreset: string;
  onSelectPreset: (preset: string) => void;
}

export const RecruiterFastTrackBar: React.FC<RecruiterFastTrackBarProps> = ({
  activePreset,
  onSelectPreset,
}) => {
  const presets = [
    { id: 'all', label: 'ALL STRATA', icon: Sparkles, color: '#E8C468' },
    { id: 'bigtech', label: 'BIG TECH & RECRUITER MODE', icon: Target, color: '#E8C468' },
    { id: 'lead', label: 'L&D TEAM LEAD (25 TRAINERS)', icon: Award, color: '#D9A86C' },
    { id: 'trainer', label: 'JAVA & DSA MASTER TRAINER', icon: GraduationCap, color: '#B9673A' },
    { id: 'architect', label: 'FULL-STACK & AI ARCHITECT', icon: Cpu, color: '#E8C468' },
  ];

  const handleSelect = (id: string) => {
    audio8D.playStratumSwoosh();
    onSelectPreset(id);
  };

  return (
    <div className="my-6 dirt-glass-gold p-4 rounded-2xl border border-[#E8C468]/30 shadow-xl space-y-3 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <Target className="w-4 h-4 text-[#E8C468] animate-pulse" />
          <span className="font-bold text-[#E8C468] uppercase tracking-wider">
            RECRUITER FAST-TRACK & ROLE FOCUS PRESETS
          </span>
        </div>
        <span className="text-[11px] text-[#A88A66] hidden sm:inline">
          Filter strata & relics by candidate evaluation criteria
        </span>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {presets.map((p) => {
          const Icon = p.icon;
          const isActive = activePreset === p.id;

          return (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className={`px-3.5 py-2 rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#E8C468] text-[#140A05] font-bold border-[#E8C468] shadow-lg gold-glow scale-105'
                  : 'bg-[#241408]/80 text-[#A88A66] border-[#D9A86C]/20 hover:text-[#F2E8D5] hover:border-[#E8C468]/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
