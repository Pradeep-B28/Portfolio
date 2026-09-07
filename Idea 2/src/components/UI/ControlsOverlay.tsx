import React from 'react';
import { MousePointer, RotateCcw, Eye, Focus, SlidersHorizontal } from 'lucide-react';

interface ControlsOverlayProps {
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  onResetSelection: () => void;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  reducedMotion, onToggleReducedMotion, isFocusMode, onToggleFocusMode, onResetSelection,
}) => (
  <div className="fixed bottom-4 left-4 right-4 z-30 flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#080d18]/82 p-2.5 font-mono text-[10px] text-slate-300 shadow-2xl backdrop-blur-2xl sm:left-6 sm:right-auto sm:max-w-[620px] sm:justify-start">
    <div className="hidden items-center gap-2 border-r border-white/10 px-2 text-slate-500 lg:flex"><SlidersHorizontal className="h-3.5 w-3.5 text-cyan-200" /><span>OBSERVATORY CONTROLS</span></div>

    <button onClick={onToggleFocusMode} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 font-semibold transition ${isFocusMode ? 'bg-cyan-200 text-slate-950 shadow-lg shadow-cyan-400/15' : 'border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-200/25 hover:text-cyan-100'}`} title="Press F to toggle focus mode"><Focus className="h-3.5 w-3.5" /><span className="hidden sm:inline">{isFocusMode ? 'FOCUS ON' : 'FOCUS'}</span><kbd className="hidden rounded bg-black/15 px-1 py-0.5 text-[9px] sm:inline">F</kbd></button>

    <div className="hidden items-center gap-2 px-2 text-slate-500 xl:flex"><MousePointer className="h-3.5 w-3.5 text-cyan-200" /><span>SELECT AN ORBIT TO INSPECT</span></div>

    <button onClick={onResetSelection} className="flex items-center gap-1.5 rounded-xl border border-transparent px-3 py-2 font-semibold text-slate-400 transition hover:border-white/10 hover:bg-white/5 hover:text-cyan-100" title="Reset selection"><RotateCcw className="h-3.5 w-3.5" /><span>RESET</span></button>

    <button onClick={onToggleReducedMotion} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 font-semibold transition ${reducedMotion ? 'border border-amber-200/30 bg-amber-200/10 text-amber-100' : 'border border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-slate-200'}`} title="Toggle motion"><Eye className="h-3.5 w-3.5" /><span className="hidden sm:inline">{reducedMotion ? 'MOTION OFF' : 'MOTION ON'}</span></button>
  </div>
);
