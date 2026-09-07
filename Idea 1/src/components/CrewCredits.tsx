import React, { useState } from 'react';
import { Film, Award, ChevronUp, ChevronDown } from 'lucide-react';

interface CrewCreditsProps {
  unlockedSkills: string[];
  totalSkillsCount: number;
  activeClipTitle: string;
  isMobile: boolean;
}

export const CrewCredits: React.FC<CrewCreditsProps> = ({
  unlockedSkills,
  totalSkillsCount,
  activeClipTitle,
  isMobile,
}) => {
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);

  // Mobile Collapsible Drawer Mode
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A1410] border-t-2 border-[#2E2318] font-mono text-xs">
        <button
          onClick={() => setIsExpandedMobile(!isExpandedMobile)}
          className="w-full py-2 px-4 flex items-center justify-between bg-[#2E2318] text-[#EDE3D0] border-b border-[#1A1410]"
        >
          <div className="flex items-center gap-2">
            <Film className="w-3.5 h-3.5 text-[#C4622D]" />
            <span className="font-bold">CREW CREDITS ({unlockedSkills.length}/{totalSkillsCount})</span>
          </div>
          {isExpandedMobile ? (
            <ChevronDown className="w-4 h-4 text-[#D4A24C]" />
          ) : (
            <ChevronUp className="w-4 h-4 text-[#D4A24C]" />
          )}
        </button>

        {isExpandedMobile && (
          <div className="p-3 bg-[#1A1410] max-h-40 overflow-y-auto space-y-2">
            <div className="text-[11px] text-[#9C8B72]">
              ACTIVE CUT: <span className="text-[#EDE3D0]">{activeClipTitle}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {unlockedSkills.length === 0 ? (
                <span className="text-[#9C8B72] italic text-[11px]">
                  Scrub timeline clips to populate tech stack crew credits...
                </span>
              ) : (
                unlockedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] bg-[#2E2318] text-[#D4A24C] border border-[#9C8B72]/30"
                  >
                    #{idx + 1} {skill}
                  </span>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop Always-Visible Crawl Strip Under Timeline
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A1410] border-t border-[#2E2318] font-mono">
      {/* Micro Status Line */}
      <div className="flex items-center justify-between px-4 py-1 border-b border-[#2E2318] text-[11px] text-[#9C8B72]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C4622D] animate-pulse"></span>
          <span className="text-[#EDE3D0] font-bold">FILM CREW CREDITS</span>
          <span className="text-[#2E2318]">|</span>
          <span>ACTIVE CLIP: <span className="text-[#EDE3D0]">{activeClipTitle}</span></span>
        </div>
        <div className="flex items-center gap-1 text-[#D4A24C]">
          <Award className="w-3.5 h-3.5" />
          <span>SKILLS EARNED: {unlockedSkills.length} / {totalSkillsCount}</span>
        </div>
      </div>

      {/* Live Horizontal Scroll Strip */}
      <div className="relative py-2 px-4 overflow-hidden flex items-center h-8">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#1A1410] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#1A1410] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-8 whitespace-nowrap animate-crawl-roll text-xs">
          <span className="flex items-center gap-1.5 text-[#C4622D] font-bold tracking-widest uppercase">
            <Film className="w-3.5 h-3.5" /> END CREDITS ROLL:
          </span>

          {unlockedSkills.length === 0 ? (
            <span className="text-[#9C8B72] italic">
              Scrub or view clip slates to assemble developer tech stack crew credits...
            </span>
          ) : (
            unlockedSkills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-0.5 rounded bg-[#2E2318] border border-[#9C8B72]/30 text-[#EDE3D0]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24C]"></span>
                <span>{skill}</span>
                <span className="text-[#9C8B72] text-[10px]">#0{idx + 1}</span>
              </span>
            ))
          )}

          {/* Repeat loop for continuous reel */}
          {unlockedSkills.map((skill, idx) => (
            <span
              key={`rep-${idx}`}
              className="inline-flex items-center gap-2 px-3 py-0.5 rounded bg-[#2E2318] border border-[#9C8B72]/30 text-[#EDE3D0] opacity-80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4622D]"></span>
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
