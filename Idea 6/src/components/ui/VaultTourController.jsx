import React, { useEffect, useState } from 'react';
import { Compass, Square, Play, Pause, SkipForward } from 'lucide-react';
import { PROJECTS } from '../../data/projects';

export function VaultTourController({ active, onSelectBox, onEndTour }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!active) {
      setCurrentIndex(0);
      return;
    }

    // Defer triggering the first box to avoid setState during render
    const timer = setTimeout(() => {
      onSelectBox(PROJECTS[0]);
    }, 100);

    if (!isPlaying) return () => clearTimeout(timer);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= PROJECTS.length) {
          onEndTour();
          return 0;
        }
        onSelectBox(PROJECTS[next]);
        return next;
      });
    }, 8000); // 8 seconds per project box (total ~64 seconds for 8 projects)

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [active, isPlaying, onSelectBox, onEndTour]);

  if (!active) return null;

  const currentProject = PROJECTS[currentIndex];

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 glass-panel-vault px-5 py-3 rounded-2xl border-2 border-[#4A7FBF] shadow-2xl flex items-center gap-4 animate-bounce-short">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#4A7FBF]/20 border border-[#4A7FBF]/60 flex items-center justify-center text-[#4A7FBF]">
          <Compass className="w-5 h-5 animate-spin" />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase text-[#00FF88] font-bold">
            Recruiter Guided Vault Tour ({currentIndex + 1} / {PROJECTS.length})
          </div>
          <div className="text-sm font-syne font-bold text-[#EDF1F6]">
            Showing Box-{currentProject.boxNumber}: <span className="text-[#E0B45C]">{currentProject.title}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-lg bg-[#1F242D] hover:bg-[#3A3F47] border border-[#3A3F47] text-[#EDF1F6] cursor-pointer"
        >
          {isPlaying ? <Pause className="w-4 h-4 text-[#E0B45C]" /> : <Play className="w-4 h-4 text-[#00FF88]" />}
        </button>

        <button
          onClick={onEndTour}
          className="px-3.5 py-1.5 rounded-lg bg-[#FF0040]/20 hover:bg-[#FF0040] text-[#FF0040] hover:text-white border border-[#FF0040] font-mono font-bold text-xs cursor-pointer transition-all"
        >
          EXIT TOUR
        </button>
      </div>
    </div>
  );
}
