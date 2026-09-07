import React from 'react';
import { PLANETS } from '../../data/galaxyData';
import { X, Compass, CheckCircle2, Lock, Sparkles } from 'lucide-react';

interface PassportModalProps { visitedPlanetIds: string[]; onClose: () => void; }

export const PassportModal: React.FC<PassportModalProps> = ({ visitedPlanetIds, onClose }) => {
  const visitedCount = visitedPlanetIds.length;
  const totalCount = PLANETS.length;
  const progressPercent = Math.round((visitedCount / totalCount) * 100);
  const getRank = (count: number) => count >= totalCount ? 'STELLAR SYSTEM ARCHITECT' : count >= 5 ? 'ORBITAL SYSTEM EXPLORER' : count >= 2 ? 'SYSTEM NAVIGATOR' : 'ROOKIE EXPLORER';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030610]/80 p-4 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Explorer passport" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] border border-cyan-200/25 bg-[#080d18]/95 p-5 text-slate-100 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-8">

        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }} className="absolute right-5 top-5 z-50 rounded-xl border border-white/10 bg-white/10 p-2.5 text-slate-300 cursor-pointer transition hover:bg-white/20 hover:text-white" aria-label="Close passport"><X className="h-5 w-5" /></button>

        <div className="relative mb-7 flex items-center gap-4 border-b border-white/10 pb-6"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-200 to-violet-300 text-slate-950 shadow-lg shadow-cyan-400/15"><Compass className="h-6 w-6" /></div><div><div className="mb-1 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200"><Sparkles className="h-3.5 w-3.5" /> Explorer passport</div><h2 className="text-2xl font-black text-white sm:text-3xl">Your system map</h2><p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-slate-500">Rank: <span className="text-amber-200">{getRank(visitedCount)}</span></p></div></div>

        <div className="relative mb-7 rounded-2xl border border-white/10 bg-white/[0.035] p-4"><div className="mb-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-wide"><span className="text-slate-400">Exploration progress</span><span className="font-bold text-cyan-100">{visitedCount} / {totalCount} visited</span></div><div className="h-2 overflow-hidden rounded-full bg-black/40"><div className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-violet-300 to-emerald-300 shadow-lg shadow-cyan-300/25 transition-all duration-700" style={{ width: `${progressPercent}%` }} /></div><div className="mt-2 text-right font-mono text-[10px] text-slate-500">{progressPercent}% mapped</div></div>

        <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">{PLANETS.map((planet) => { const unlocked = visitedPlanetIds.includes(planet.id); return <div key={planet.id} className={`rounded-2xl border p-4 transition ${unlocked ? 'border-cyan-200/25 bg-cyan-200/[0.06] shadow-lg shadow-cyan-500/5' : 'border-white/8 bg-white/[0.02] opacity-55'}`}><div className="mb-2 flex items-center justify-between gap-2 font-mono text-[10px]"><span className={unlocked ? 'font-bold text-cyan-100' : 'font-bold text-slate-500'}>{planet.codeName}</span>{unlocked ? <span className="flex items-center gap-1 font-bold text-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" /> MAPPED</span> : <span className="flex items-center gap-1 font-bold text-slate-600"><Lock className="h-3.5 w-3.5" /> LOCKED</span>}</div><h3 className="font-heading text-sm font-bold leading-5 text-slate-200">{planet.title}</h3><p className="mt-1 font-mono text-[10px] leading-4 text-slate-500">{planet.categoryLabel}</p></div>; })}</div>
      </div>
    </div>
  );
};
