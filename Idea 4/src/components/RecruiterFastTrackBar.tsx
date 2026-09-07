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
    { id: 'all', label: 'ALL CONSTELLATIONS', icon: Sparkles, color: '#4DEBFF' },
    { id: 'bigtech', label: 'BIG TECH & RECRUITER MODE', icon: Target, color: '#4DEBFF' },
    { id: 'lead', label: 'L&D TEAM LEAD (25 TRAINERS)', icon: Award, color: '#B55FE6' },
    { id: 'trainer', label: 'JAVA & DSA MASTER TRAINER', icon: GraduationCap, color: '#E8C468' },
    { id: 'architect', label: 'FULL-STACK & AI ARCHITECT', icon: Cpu, color: '#4DEBFF' },
  ];

  const handleSelect = (id: string) => {
    audio8D.playSupernovaPulse();
    onSelectPreset(id);
  };

  return (
    <div className="space-glass-gold p-3.5 rounded-2xl border border-[#4DEBFF]/30 shadow-2xl space-y-2.5 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <Target className="w-4 h-4 text-[#4DEBFF] animate-pulse" />
          <span className="font-bold text-[#4DEBFF] uppercase tracking-wider">
            RECRUITER FAST-TRACK & ROLE FOCUS PRESETS
          </span>
        </div>
        <span className="text-[11px] text-[#7C8AA6] hidden sm:inline">
          Highlight star nodes & constellations by evaluation criteria
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
              className={`px-3 py-1.5 rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#4DEBFF] text-[#050810] font-bold border-[#4DEBFF] shadow-lg gold-glow scale-105'
                  : 'bg-[#0A101D]/80 text-[#7C8AA6] border-[#7C8AA6]/20 hover:text-[#EAF0FA] hover:border-[#4DEBFF]/40'
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
