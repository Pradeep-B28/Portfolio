import React from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Film, CheckCircle2, Star } from 'lucide-react';
import type { PortfolioClip } from '../data/clips';

interface DirectorsCutModalProps {
  clip: PortfolioClip | null;
  clipIndex: number | null;
  totalClips: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
}

export const DirectorsCutModal: React.FC<DirectorsCutModalProps> = ({
  clip,
  clipIndex,
  totalClips,
  onClose,
  onPrev,
  onNext,
  onToggleFavorite,
  isFavorite,
}) => {
  if (!clip || clipIndex === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07090e]/90 backdrop-blur-xl transition-opacity duration-200 font-sans">
      <div className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto bg-slate-900/95 border-2 border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider bg-slate-950 text-cyan-400 border border-cyan-500/40 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5" />
              <span>CUT #{clipIndex + 1} / {totalClips}</span>
            </div>

            <div className="px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/50 flex items-center gap-1.5">
              <span>{clip.category.toUpperCase()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(clip.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isFavorite
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-slate-800 border-white/10 text-slate-400 hover:text-slate-100'
              }`}
              title="Mark as Favorite Cut"
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-400 hover:text-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100 tracking-tight mb-2">
            {clip.title}
          </h2>
          <p className="text-sm sm:text-base font-sans text-slate-400">
            {clip.subtitle} <span className="text-slate-600">|</span> <span className="text-cyan-400 font-semibold">{clip.timeframe}</span>
          </p>
        </div>

        {/* Key Metrics Grid */}
        {clip.metrics && clip.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {clip.metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-4 text-center"
              >
                <div className="text-xl sm:text-3xl font-black font-heading text-cyan-400">
                  {m.value}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Narrative & Deliverables */}
        <div className="space-y-5 mb-6">
          <div className="bg-slate-950/70 border border-white/10 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {clip.description}
          </div>

          <div>
            <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest mb-3">
              FILM DELIVERABLES & KEY MILESTONES
            </h4>
            <ul className="space-y-2.5">
              {clip.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Crawl Tags */}
        <div className="mb-6">
          <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest mb-3">
            CREW TECH STACK
          </h4>
          <div className="flex flex-wrap gap-2">
            {clip.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-950 text-cyan-300 border border-cyan-500/40"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Links & Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {clip.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-sans font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 border border-cyan-400 shadow-md shadow-cyan-500/20 transition-all"
              >
                <span>{link.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end font-mono text-xs">
            <button
              onClick={onPrev}
              disabled={clipIndex === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 border border-white/10 text-slate-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREV TAKE</span>
            </button>
            <button
              onClick={onNext}
              disabled={clipIndex === totalClips - 1}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 border border-white/10 text-slate-200 transition-colors"
            >
              <span>NEXT TAKE</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
