import React, { useRef, useState } from 'react';
import { Film, ChevronLeft, ChevronRight, Sliders, ChevronUp, ChevronDown } from 'lucide-react';
import type { PortfolioClip } from '../data/clips';

interface TimelineScrubberProps {
  clips: PortfolioClip[];
  scrubIndex: number;
  onScrubChange: (index: number) => void;
  onSelectClip: (index: number) => void;
  isMobile: boolean;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  clips,
  scrubIndex,
  onScrubChange,
  onSelectClip,
  isMobile,
}) => {
  const [fineScrubMode, setFineScrubMode] = useState(false);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 30) {
      if (diff > 0 && scrubIndex < clips.length - 1) {
        onScrubChange(scrubIndex + 1);
      } else if (diff < 0 && scrubIndex > 0) {
        onScrubChange(scrubIndex - 1);
      }
    }
    touchStartY.current = null;
  };

  // Mobile Right-Edge Vertical Strip
  if (isMobile) {
    return (
      <div
        className="fixed right-3 top-20 bottom-20 z-30 w-16 bg-[#07090e]/90 backdrop-blur-xl border-l border-white/10 flex flex-col items-center justify-between p-2 shadow-2xl font-mono"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={() => onScrubChange(Math.max(0, scrubIndex - 1))}
          disabled={scrubIndex === 0}
          className="p-1.5 rounded-lg bg-slate-900 text-slate-200 disabled:opacity-30 border border-white/10"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Stacked Vertical Thumbnails */}
        <div className="flex flex-col gap-2.5 my-auto overflow-y-auto max-h-[60vh] py-2">
          {clips.map((clip, idx) => {
            const isCurrent = Math.round(scrubIndex) === idx;
            return (
              <button
                key={clip.id}
                onClick={() => {
                  onScrubChange(idx);
                  onSelectClip(idx);
                }}
                className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-[10px] font-bold font-mono transition-all border relative ${
                  isCurrent
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-slate-900/80 text-slate-400 border-white/10 hover:border-cyan-500/50'
                }`}
              >
                <span>CUT</span>
                <span className="text-xs font-black">0{idx + 1}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onScrubChange(Math.min(clips.length - 1, scrubIndex + 1))}
          disabled={scrubIndex === clips.length - 1}
          className="p-1.5 rounded-lg bg-slate-900 text-slate-200 disabled:opacity-30 border border-white/10"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Desktop Lower-Third Glassmorphic Timeline Track
  return (
    <div className="fixed bottom-12 sm:bottom-14 left-4 right-4 z-30 flex flex-col items-center pointer-events-auto font-sans">
      <div className="w-full max-w-5xl bg-[#07090e]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Sprocket Hole Frame Bar */}
        <div className="h-3 sprocket-track-top w-full" />

        <div className="p-3.5 flex flex-col gap-3">
          {/* Header Frame Status */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-100 font-bold font-heading text-sm">
                CUT #{Math.round(scrubIndex) + 1}: {clips[Math.round(scrubIndex)]?.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setFineScrubMode(!fineScrubMode)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] border font-mono transition-all ${
                  fineScrubMode
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                    : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{fineScrubMode ? 'FINE SCRUB (0.05)' : 'COARSE TRACK'}</span>
              </button>

              <div className="flex items-center gap-1.5 bg-slate-900/80 border border-white/10 rounded-md px-2.5 py-1">
                <button
                  onClick={() => onScrubChange(Math.max(0, scrubIndex - 1))}
                  disabled={scrubIndex === 0}
                  className="hover:text-slate-100 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-cyan-400 font-bold font-mono text-xs px-1">
                  {Math.round(scrubIndex) + 1} / {clips.length}
                </span>
                <button
                  onClick={() => onScrubChange(Math.min(clips.length - 1, scrubIndex + 1))}
                  disabled={scrubIndex === clips.length - 1}
                  className="hover:text-slate-100 disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Range Slider Playhead Track */}
          <div className="relative w-full h-8 flex items-center px-3 bg-slate-950/80 rounded-xl border border-white/10">
            <input
              type="range"
              min={0}
              max={clips.length - 1}
              step={fineScrubMode ? 0.05 : 1}
              value={scrubIndex}
              onChange={(e) => onScrubChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Interactive Film Reel Cards Grid */}
          <div className="grid grid-cols-7 gap-2.5">
            {clips.map((clip, idx) => {
              const isCurrent = Math.round(scrubIndex) === idx;

              return (
                <button
                  key={clip.id}
                  onClick={() => {
                    onScrubChange(idx);
                    onSelectClip(idx);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-[11px] truncate border transition-all text-left font-mono relative ${
                    isCurrent
                      ? 'bg-gradient-to-r from-cyan-500/25 to-purple-500/25 text-slate-100 font-bold border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                      : 'bg-slate-900/60 text-slate-400 border-white/10 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                  title={`${clip.title} (${clip.takeType})`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-1.5"
                    style={{ backgroundColor: clip.reelColor || '#22d3ee' }}
                  />
                  0{idx + 1}. {clip.title.substring(0, 10)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Sprocket Hole Frame Bar */}
        <div className="h-3 sprocket-track-bottom w-full" />
      </div>
    </div>
  );
};
