import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, ShieldCheck, Unlock, Eye, EyeOff } from 'lucide-react';

export function CenterDoorControl({ chamber, onOpenDoor, onProceed }) {
  const [minimized, setMinimized] = useState(false);

  if (!chamber) return null;

  // Auto-hide dialog when door is open and chamber is not yet complete,
  // allowing the user to view and click the 3D deposit boxes unobstructed.
  const isInspecting = chamber.open && !chamber.complete;
  if (isInspecting && !minimized) {
    return null;
  }

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => setMinimized(false)}
        className="pointer-events-auto flex items-center gap-2 rounded-2xl border bg-[#080C14]/90 px-4 py-2.5 font-mono text-xs font-bold text-white shadow-2xl backdrop-blur-xl transition hover:scale-105 cursor-pointer"
        style={{ borderColor: `${chamber.accent}80` }}
      >
        <Eye className="h-4 w-4" style={{ color: chamber.accent }} />
        <span>Show Chamber Info ({chamber.inspectedCount}/{chamber.totalRepositories})</span>
      </button>
    );
  }

  const readyForNext = chamber.open && chamber.complete;

  return (
    <section
      aria-label={`${chamber.name} controls`}
      className="pointer-events-auto relative w-[min(92vw,30rem)] max-w-[30rem] rounded-3xl border bg-[#080C14]/95 p-5 text-center shadow-[0_0_55px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-7 animate-fadeIn"
      style={{ borderColor: `${chamber.accent}B3`, boxShadow: `0 0 45px ${chamber.accent}33` }}
    >
      <button
        type="button"
        onClick={() => setMinimized(true)}
        className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/5 p-1.5 text-[#94A3B8] transition hover:bg-white/15 hover:text-white cursor-pointer"
        title="Minimize chamber briefing"
      >
        <EyeOff className="h-4 w-4" />
      </button>

      <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] font-extrabold uppercase tracking-wider" style={{ color: '#071019', backgroundColor: chamber.accent }}>
        <ShieldCheck className="h-3.5 w-3.5" />
        {chamber.clearance}
      </div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: chamber.accent }}>{chamber.subtitle}</p>
      <h1 className="font-syne text-xl font-bold text-white sm:text-2xl">{chamber.name}</h1>
      <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-[#CBD5E0]">{chamber.description}</p>
      
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
          <span className="text-[#94A3B8]">Repository clearance</span>
          <span style={{ color: chamber.accent }}>{chamber.inspectedCount}/{chamber.totalRepositories}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[#1E293B]">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(chamber.inspectedCount / chamber.totalRepositories) * 100}%`, backgroundColor: chamber.accent }} />
        </div>
        <p className="mt-3 text-[11px] leading-5 text-[#94A3B8]">
          {chamber.complete ? 'All repositories in this chamber have been inspected.' : chamber.unlockMessage}
        </p>
      </div>

      {!chamber.open && (
        <button
          type="button"
          onClick={onOpenDoor}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-mono text-xs font-extrabold uppercase tracking-wider text-[#071019] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          style={{ backgroundColor: chamber.accent }}
        >
          <Unlock className="h-4 w-4" />
          Open {chamber.name}
        </button>
      )}

      {readyForNext && chamber.id < 4 && (
        <button
          type="button"
          onClick={onProceed}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00FF88] px-4 py-3 font-mono text-xs font-extrabold uppercase tracking-wider text-[#04130D] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
        >
          <CheckCircle2 className="h-4 w-4" />
          Proceed to next chamber
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {readyForNext && chamber.id === 4 && (
        <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-[#00FF88]/60 bg-[#00FF88]/10 px-4 py-3 font-mono text-[11px] font-bold text-[#00FF88]">
          <CheckCircle2 className="h-4 w-4" />
          All 12 repositories cleared
        </div>
      )}
    </section>
  );
}
