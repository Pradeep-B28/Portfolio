import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Award, Palette, Play, Cpu, Compass, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import type { GalaxyTheme } from '../../types/galaxy';
import { PLANETS } from '../../data/galaxyData';

interface HeaderProps {
  visitedCount: number;
  totalPlanets: number;
  onOpenResume: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  activeTheme: GalaxyTheme;
  onSelectTheme: (theme: GalaxyTheme) => void;
  onStartGuidedTour: () => void;
  onOpenSQLGame: () => void;
  onOpenPassport: () => void;
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  visitedCount, totalPlanets, onOpenResume, selectedCategory, onSelectCategory,
  activeTheme, onSelectTheme, onStartGuidedTour, onOpenSQLGame, onOpenPassport,
  isAudioEnabled, onToggleAudio,
}) => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { id: 'all', label: 'All', count: totalPlanets },
    { id: 'postgresql', label: 'Data', count: PLANETS.filter((p) => p.category === 'postgresql').length },
    { id: 'mern', label: 'Full-stack', count: PLANETS.filter((p) => p.category === 'mern').length },
    { id: '3dwebgl', label: '3D / WebGL', count: PLANETS.filter((p) => p.category === '3dwebgl').length },
    { id: 'devops', label: 'DevOps', count: PLANETS.filter((p) => p.category === 'devops').length },
    { id: 'leadership', label: 'Leadership', count: PLANETS.filter((p) => p.category === 'leadership').length },
  ];
  const themes: Array<{ id: GalaxyTheme; name: string; swatch: string }> = [
    { id: 'cyber', name: 'Signal blue', swatch: '#67e8f9' },
    { id: 'emerald', name: 'Emerald field', swatch: '#6ee7b7' },
    { id: 'amber', name: 'Solar amber', swatch: '#fbbf24' },
    { id: 'violet', name: 'Violet pulse', swatch: '#c4b5fd' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-[#070b15]/80 px-4 py-3 shadow-2xl backdrop-blur-2xl sm:px-6">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-3 lg:flex-nowrap">
        <div className="flex min-w-max items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-200/30 bg-gradient-to-br from-cyan-200 to-violet-300 text-slate-950 shadow-lg shadow-cyan-500/15">
            <div className="absolute inset-1 rounded-xl border border-slate-950/20" />
            <Sparkles className="relative h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2"><h1 className="text-base font-black tracking-tight text-white sm:text-lg">PRADEEP B</h1><span className="hidden rounded-full border border-cyan-200/25 bg-cyan-200/10 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-cyan-200 sm:inline">Portfolio / 2025</span></div>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">Systems · people · ideas with gravity</p>
          </div>
        </div>

        <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto border-t border-white/8 pt-2 font-mono text-[10px] lg:order-2 lg:ml-5 lg:w-auto lg:flex-1 lg:border-0 lg:pt-0" aria-label="Project filters">
          {categories.map((category) => (
            <button key={category.id} onClick={() => onSelectCategory(category.id)} className={`whitespace-nowrap rounded-xl px-3 py-2 font-semibold transition-all ${selectedCategory === category.id ? 'border border-cyan-200/35 bg-cyan-200/12 text-cyan-100 shadow-lg shadow-cyan-500/5' : 'border border-transparent text-slate-500 hover:border-white/10 hover:bg-white/5 hover:text-slate-200'}`}>
              {category.label}{category.count !== undefined && <span className="ml-1 text-slate-500">({category.count})</span>}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 font-mono text-[10px] sm:gap-2">
          <button onClick={onStartGuidedTour} className="signal-button flex items-center gap-1.5 rounded-xl border border-cyan-200/25 bg-cyan-200/10 px-3 py-2 font-bold text-cyan-100 hover:bg-cyan-200/20" title="Start guided tour"><Play className="h-3.5 w-3.5 fill-current" /><span className="hidden xl:inline">TOUR</span></button>
          <button onClick={onOpenSQLGame} className="signal-button hidden items-center gap-1.5 rounded-xl border border-violet-200/25 bg-violet-200/10 px-3 py-2 font-bold text-violet-100 hover:bg-violet-200/20 sm:flex" title="Open SQL simulator"><Cpu className="h-3.5 w-3.5" /><span className="hidden xl:inline">SQL LAB</span></button>
          <button onClick={onOpenPassport} className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-bold text-slate-300 transition hover:border-amber-200/30 hover:text-amber-100"><Compass className="h-3.5 w-3.5 text-amber-300" /><span>{visitedCount}/{totalPlanets}</span></button>
          <button onClick={onToggleAudio} className={`rounded-xl border p-2 transition ${isAudioEnabled ? 'border-cyan-200/35 bg-cyan-200/10 text-cyan-100' : 'border-white/10 bg-white/5 text-slate-500 hover:text-slate-200'}`} title="Toggle sound" aria-label="Toggle sound">{isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}</button>
          <div className="relative" ref={themeRef}>
            <button onClick={() => setIsThemeOpen((prev) => !prev)} className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:border-cyan-200/30" aria-label="Change theme"><Palette className="h-4 w-4 text-cyan-200" /><ChevronDown className="hidden h-3 w-3 sm:block" /></button>
            {isThemeOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-white/10 bg-[#0a101e]/95 p-2 shadow-2xl backdrop-blur-2xl">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => { onSelectTheme(theme.id); setIsThemeOpen(false); }}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-white/8 ${activeTheme === theme.id ? 'bg-white/8 text-white' : 'text-slate-400'}`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: theme.swatch, boxShadow: `0 0 12px ${theme.swatch}` }} />
                    <span>{theme.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={onOpenResume} className="signal-button flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-200 to-violet-300 px-3 py-2 font-black text-slate-950 shadow-lg shadow-cyan-500/10"><Award className="h-4 w-4" /><span className="hidden sm:inline">DOSSIER</span></button>
        </div>
      </div>
    </header>
  );
};

