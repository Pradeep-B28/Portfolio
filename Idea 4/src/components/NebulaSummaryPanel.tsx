import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { SKILLS } from '../data/skills';
import { CONSTELLATIONS } from '../data/projects';

export const NebulaSummaryPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const totalSkills = SKILLS.length;
  const totalProjects = CONSTELLATIONS.length;
  const expertSkills = SKILLS.filter((s) => s.expertiseLevel === 'Expert').length;

  return (
    <aside className="fixed top-6 right-6 md:right-84 lg:right-[400px] z-30 w-52 md:w-56 space-glass rounded-2xl p-4 border border-[#7C8AA6]/30 shadow-2xl text-xs space-y-3 font-mono">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer border-b border-[#7C8AA6]/20 pb-2 select-none"
      >
        <div className="flex items-center gap-1.5 text-[#E8C468]">
          <Sparkles className="w-4 h-4 text-[#E8C468]" />
          <span className="font-bold tracking-wider text-[11px]">NEBULA SUMMARY</span>
        </div>
        {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#7C8AA6]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#7C8AA6]" />}
      </div>

      {isExpanded && (
        <div className="space-y-3 animate-fadeIn">
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-[#050810]/60 p-2 rounded-lg border border-[#7C8AA6]/15">
              <span className="text-[#7C8AA6]">TOTAL SKILLS</span>
              <span className="font-bold text-[#EAF0FA]">{totalSkills} Stars</span>
            </div>

            <div className="flex justify-between items-center bg-[#050810]/60 p-2 rounded-lg border border-[#7C8AA6]/15">
              <span className="text-[#7C8AA6]">PROJECTS</span>
              <span className="font-bold text-[#4DEBFF]">{totalProjects} Constellations</span>
            </div>

            <div className="flex justify-between items-center bg-[#050810]/60 p-2 rounded-lg border border-[#7C8AA6]/15">
              <span className="text-[#7C8AA6]">DIVERSITY SCORE</span>
              <span className="font-bold text-[#E8C468]">96%</span>
            </div>

            <div className="bg-[#050810]/60 p-2 rounded-lg border border-[#7C8AA6]/15 space-y-0.5">
              <span className="text-[#7C8AA6] text-[10px] block">MOST PROLIFIC TECH</span>
              <span className="font-bold text-[#E8C468] text-[11px]">Java, DSA & Full-Stack</span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#7C8AA6]/20 space-y-1.5">
            <span className="text-[10px] text-[#7C8AA6] uppercase tracking-wider block font-semibold">
              MAGNITUDE LEGEND
            </span>
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8C468] shadow-sm" />
                <span className="text-[#EAF0FA]">Expert ({expertSkills})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E8C468]/80" />
                <span className="text-[#7C8AA6]">Senior</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8C468]/60" />
                <span className="text-[#7C8AA6]/80">Junior</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
