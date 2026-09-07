import React from 'react';
import type { PlanetProject } from '../../types/galaxy';
import { Play, Pause, SkipForward, SkipBack, X, Sparkles } from 'lucide-react';

interface GuidedTourBoxProps {
  planet: PlanetProject;
  currentIndex: number;
  totalPlanets: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onStop: () => void;
}

export const GuidedTourBox: React.FC<GuidedTourBoxProps> = ({
  planet,
  currentIndex,
  totalPlanets,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onStop,
}) => (
  <section
    className="fixed bottom-20 sm:bottom-24 left-1/2 z-40 w-[calc(100%-2rem)] max-w-[560px] max-h-[55vh] overflow-y-auto -translate-x-1/2 rounded-[1.65rem] border border-cyan-200/30 bg-[#080d18]/95 p-4 sm:p-5 text-slate-100 shadow-[0_24px_90px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all"
    aria-label="Guided project tour"
  >
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100">
        <Sparkles className="h-4 w-4 text-cyan-300" />
        <span>GUIDED ORBIT TOUR</span>
        <span className="text-slate-500 font-normal">
          ({String(currentIndex + 1).padStart(2, '0')} / {String(totalPlanets).padStart(2, '0')})
        </span>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onStop();
        }}
        className="relative z-50 rounded-xl border border-white/10 p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
        aria-label="Close guided tour"
      >
        <X className="h-4 w-4" />
      </button>
    </div>

    <div className="mb-3 h-1 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 transition-all duration-500"
        style={{ width: `${((currentIndex + 1) / totalPlanets) * 100}%` }}
      />
    </div>

    <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wide text-cyan-200">
      {planet.categoryLabel}
    </p>
    <h3 className="max-w-lg text-xl sm:text-2xl font-black leading-tight text-white">
      {planet.title}
    </h3>
    <p className="mt-2 line-clamp-2 sm:line-clamp-3 rounded-xl border border-white/8 bg-white/[0.035] p-3 text-xs leading-5 text-slate-300 font-sans">
      {planet.description}
    </p>

    <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3 font-mono text-[10px]">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:border-cyan-200/30 hover:text-cyan-100 cursor-pointer"
          title="Previous project"
        >
          <SkipBack className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onTogglePlay}
          className="signal-button flex items-center gap-2 rounded-xl bg-cyan-300 px-3.5 py-2 font-black text-slate-950 cursor-pointer"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span>{isPlaying ? 'PAUSE' : 'RESUME'}</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:border-cyan-200/30 hover:text-cyan-100 cursor-pointer"
          title="Next project"
        >
          <SkipForward className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={onStop}
        className="rounded-xl border border-rose-300/30 bg-rose-500/15 px-3 py-2 font-bold text-rose-200 transition hover:bg-rose-500/25 cursor-pointer"
      >
        EXIT TOUR
      </button>
    </div>
  </section>
);
