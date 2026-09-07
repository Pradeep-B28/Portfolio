import React from 'react';
import type { PlanetProject } from '../../types/galaxy';
import { X, ExternalLink, CheckCircle, Globe, Tag, ArrowUpRight, Github, Sparkles } from 'lucide-react';

interface DetailPanelProps {
  planet: PlanetProject | null;
  onClose: () => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({ planet, onClose }) => {
  if (!planet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02050c]/72 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={`${planet.title} project details`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <article className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] border border-cyan-200/25 bg-[#080d18]/96 p-5 text-slate-100 shadow-[0_30px_120px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-8">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }} className="absolute right-5 top-5 z-50 rounded-xl border border-white/10 bg-white/10 p-2.5 text-slate-300 cursor-pointer transition hover:bg-white/20 hover:text-white" aria-label="Close project details"><X className="h-5 w-5" /></button>
        <div className="relative"><div className="mb-6 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200/80"><Sparkles className="h-3.5 w-3.5" /> Project case study / active orbit</div><div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wide"><span className="flex items-center gap-1.5 rounded-full border border-cyan-200/30 bg-cyan-200/10 px-3 py-1.5 font-bold text-cyan-100"><Globe className="h-3.5 w-3.5" />{planet.codeName}</span><span className="text-slate-500">{planet.categoryLabel}</span></div><h2 className="max-w-xl text-3xl font-black leading-[1.03] text-white sm:text-4xl">{planet.title}</h2><p className="mt-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wide text-violet-200"><Tag className="h-3.5 w-3.5" /> {planet.role}</p>
          <div className="mt-8 space-y-7"><section><h3 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Project overview</h3><p className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">{planet.description}</p></section><section><h3 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200">Selected outcomes</h3><div className="space-y-2">{planet.metrics.map((metric) => <div key={metric} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-3.5 text-xs leading-5 text-slate-200"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />{metric}</div>)}</div></section><section><h3 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-violet-200">Technology and skills</h3><div className="flex flex-wrap gap-2">{planet.moons.map((moon) => <span key={moon} className="rounded-xl border border-violet-200/15 bg-violet-200/[0.06] px-3 py-2 font-mono text-[10px] font-bold text-violet-100">{moon}</span>)}</div></section><div className="flex flex-wrap gap-2 border-t border-white/10 pt-6 font-mono text-xs">{planet.githubUrl && <a href={planet.githubUrl} target="_blank" rel="noopener noreferrer" className="signal-button flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-200/25 bg-cyan-200/10 px-4 py-3.5 font-bold text-cyan-100"><Github className="h-4 w-4" /> View repository</a>}{planet.liveUrl && <a href={planet.liveUrl} target="_blank" rel="noopener noreferrer" className="signal-button flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-200 to-violet-300 px-4 py-3.5 font-black text-slate-950"><ArrowUpRight className="h-4 w-4" /> Open project <ExternalLink className="h-3.5 w-3.5" /></a>}</div></div>
        </div>
      </article>
    </div>
  );
};
