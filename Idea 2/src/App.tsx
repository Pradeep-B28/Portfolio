import { useState, useEffect, useMemo, useCallback } from 'react';
import { PLANETS } from './data/galaxyData';
import { GalaxyCanvas3D } from './components/Galaxy3D/GalaxyCanvas3D';
import { Header } from './components/UI/Header';
import { DetailPanel } from './components/UI/DetailPanel';
import { ResumeModal } from './components/UI/ResumeModal';
import { ControlsOverlay } from './components/UI/ControlsOverlay';
import { GuidedTourBox } from './components/UI/GuidedTourBox';
import { SQLGameModal } from './components/UI/SQLGameModal';
import { PassportModal } from './components/UI/PassportModal';
import { AudioSynth } from './utils/AudioSynth';
import type { GalaxyTheme } from './types/galaxy';
import { Focus, Layers, Globe, ExternalLink, CheckCircle2, Github, ArrowUpRight, Sparkles } from 'lucide-react';

export function App() {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null);
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string | null>(null);
  const [visitedPlanetIds, setVisitedPlanetIds] = useState<string[]>([]);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTheme, setActiveTheme] = useState<GalaxyTheme>('cyber');
  const [viewMode, setViewMode] = useState<'3d-galaxy' | '3d-cards'>('3d-galaxy');
  const [isTouring, setIsTouring] = useState(false);
  const [isTourPaused, setIsTourPaused] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [isSQLGameOpen, setIsSQLGameOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  const filteredPlanets = useMemo(
    () => selectedCategory === 'all' ? PLANETS : PLANETS.filter((planet) => planet.category === selectedCategory),
    [selectedCategory]
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement?.matches('input, textarea')) return;
      if (event.key.toLowerCase() === 'f') {
        setIsFocusMode((previous) => !previous);
      } else if (event.key === 'Escape') {
        setSelectedPlanetId(null);
        setIsResumeOpen(false);
        setIsSQLGameOpen(false);
        setIsPassportOpen(false);
        setIsTouring(false);
        setIsTourPaused(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!isTouring || isTourPaused) return;
    const activePlanet = PLANETS[tourIndex];
    if (activePlanet) {
      setSelectedPlanetId(activePlanet.id);
      setVisitedPlanetIds((previous) => previous.includes(activePlanet.id) ? previous : [...previous, activePlanet.id]);
    }
    const timer = setInterval(() => setTourIndex((previous) => (previous + 1) % PLANETS.length), 6000);
    return () => clearInterval(timer);
  }, [isTouring, isTourPaused, tourIndex]);

  const handleSelectPlanet = useCallback((id: string) => {
    setSelectedPlanetId(id || null);
    if (id) {
      AudioSynth.playSelectSound();
      setVisitedPlanetIds((previous) => previous.includes(id) ? previous : [...previous, id]);
    }
  }, []);

  const handleHoverPlanet = useCallback((id: string | null) => {
    setHoveredPlanetId(id);
    if (id) AudioSynth.playHoverTone(520);
  }, []);

  const toggleAudio = () => {
    const next = !isAudioEnabled;
    setIsAudioEnabled(next);
    AudioSynth.enabled = next;
    if (next) AudioSynth.playSelectSound();
  };

  const startGuidedTour = () => {
    setSelectedCategory('all');
    setIsTouring(true);
    setIsTourPaused(false);
    setTourIndex(0);
  };

  const selectedPlanet = useMemo(
    () => PLANETS.find((planet) => planet.id === selectedPlanetId) || null,
    [selectedPlanetId]
  );

  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden select-none bg-[#070a12] text-slate-100 galaxy-bg">
      {isFocusMode && (
        <div className="absolute left-1/2 top-[4.5rem] z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300 px-4 py-2 font-mono text-[10px] font-bold tracking-wide text-slate-950 shadow-2xl shadow-cyan-400/20">
          <Focus className="h-4 w-4" />
          <span>FOCUS MODE / INACTIVE ORBITS DIMMED / PRESS F TO EXIT</span>
        </div>
      )}

      <Header
        visitedCount={visitedPlanetIds.length}
        totalPlanets={PLANETS.length}
        onOpenResume={() => setIsResumeOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => { setSelectedCategory(category); setSelectedPlanetId(null); }}
        activeTheme={activeTheme}
        onSelectTheme={setActiveTheme}
        onStartGuidedTour={startGuidedTour}
        onOpenSQLGame={() => setIsSQLGameOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        isAudioEnabled={isAudioEnabled}
        onToggleAudio={toggleAudio}
      />

      <div className="fixed right-4 top-[4.6rem] z-20 flex items-center gap-1 rounded-2xl border border-white/10 bg-slate-950/70 p-1.5 font-mono text-[10px] shadow-2xl backdrop-blur-xl sm:right-6">
        <button onClick={() => setViewMode('3d-galaxy')} className={`signal-button flex items-center gap-2 rounded-xl px-3 py-2 font-bold transition-all ${viewMode === '3d-galaxy' ? 'border border-cyan-300/50 bg-cyan-300/15 text-cyan-200 shadow-lg shadow-cyan-500/10' : 'text-slate-400 hover:text-slate-200'}`}>
          <Globe className="h-3.5 w-3.5" /> <span className="hidden sm:inline">GALAXY VIEW</span>
        </button>
        <button onClick={() => setViewMode('3d-cards')} className={`signal-button flex items-center gap-2 rounded-xl px-3 py-2 font-bold transition-all ${viewMode === '3d-cards' ? 'border border-violet-300/50 bg-violet-300/15 text-violet-200 shadow-lg shadow-violet-500/10' : 'text-slate-400 hover:text-slate-200'}`}>
          <Layers className="h-3.5 w-3.5" /> <span className="hidden sm:inline">PROJECT INDEX</span>
        </button>
      </div>

      {viewMode === '3d-galaxy' ? (
        <main className="relative h-full w-full">
          <div className="pointer-events-none absolute left-5 top-[7.6rem] z-10 hidden max-w-[18rem] md:block lg:left-8 lg:top-[8.7rem] lg:max-w-[22rem]">
            <div className="glass-panel rounded-[1.75rem] p-5 lg:p-6">
              <div className="mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200/80"><Sparkles className="h-3.5 w-3.5" /> Systems · Engineering · Impact</div>
              <h2 className="max-w-sm text-2xl font-black leading-tight text-white lg:text-3xl">Pradeep B</h2>
              <p className="mt-2 font-mono text-xs font-semibold text-cyan-100">L&D Team Lead & Full-Stack Engineer</p>
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 font-mono">
                <div><strong className="block text-lg font-black text-white">08</strong><span className="text-[9px] uppercase tracking-wide text-slate-500">orbits</span></div>
                <div><strong className="block text-lg font-black text-white">7.5k+</strong><span className="text-[9px] uppercase tracking-wide text-slate-500">learners</span></div>
                <div><strong className="block text-lg font-black text-white">90%</strong><span className="text-[9px] uppercase tracking-wide text-slate-500">placement</span></div>
              </div>
            </div>
          </div>
          <GalaxyCanvas3D planets={filteredPlanets} selectedPlanetId={selectedPlanetId} hoveredPlanetId={hoveredPlanetId} visitedPlanetIds={visitedPlanetIds} reducedMotion={reducedMotion} isFocusMode={isFocusMode} isMobile={isMobile} onSelectPlanet={handleSelectPlanet} onHoverPlanet={handleHoverPlanet} onOpenResume={() => setIsResumeOpen(true)} activeTheme={activeTheme} />
        </main>
      ) : (
        <main className="relative z-10 mx-auto h-full max-w-7xl overflow-y-auto px-4 pb-20 pt-32 sm:px-8">
          <div className="mb-8 max-w-2xl"><p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">/ project index / selected signal: {selectedCategory}</p><h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl">A working constellation.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">Production tools, learning systems, and experiments arranged by orbit. Select a project to inspect its architecture.</p></div>
          <div className="grid grid-cols-1 gap-5 pb-16 md:grid-cols-2">
            {filteredPlanets.map((planet) => (
              <article key={planet.id} onClick={() => handleSelectPlanet(planet.id)} className="group glass-panel flex cursor-pointer flex-col justify-between rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-slate-800/80">
                <div><div className="mb-4 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wide"><span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 font-bold text-cyan-200">{planet.codeName}</span><span className="text-slate-500">{planet.role}</span></div><h3 className="mb-3 text-2xl font-black text-white">{planet.title}</h3><p className="rounded-2xl border border-white/7 bg-black/20 p-4 text-sm leading-6 text-slate-300">{planet.description}</p><div className="mt-5 space-y-2">{planet.metrics.map((metric, index) => <div key={index} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />{metric}</div>)}</div></div>
                <div className="mt-6"><div className="mb-5 flex flex-wrap gap-1.5 font-mono text-[10px]">{planet.moons.map((moon) => <span key={moon} className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-slate-400">#{moon}</span>)}</div><div className="flex gap-2 border-t border-white/10 pt-4 font-mono text-xs"><a href={planet.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="signal-button flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/10 py-3 font-bold text-cyan-200"><Github className="h-3.5 w-3.5" /> Code</a>{planet.liveUrl && <a href={planet.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="signal-button flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-violet-300 py-3 font-black text-slate-950"><ArrowUpRight className="h-3.5 w-3.5" /> Launch</a>}</div></div>
              </article>
            ))}
          </div>
        </main>
      )}

      <DetailPanel planet={selectedPlanet} onClose={() => setSelectedPlanetId(null)} />
      <ControlsOverlay reducedMotion={reducedMotion} onToggleReducedMotion={() => setReducedMotion((previous) => !previous)} isFocusMode={isFocusMode} onToggleFocusMode={() => setIsFocusMode((previous) => !previous)} onResetSelection={() => setSelectedPlanetId(null)} />
      {isTouring && (
        <GuidedTourBox
          planet={PLANETS[tourIndex]}
          currentIndex={tourIndex}
          totalPlanets={PLANETS.length}
          isPlaying={!isTourPaused}
          onTogglePlay={() => setIsTourPaused((prev) => !prev)}
          onNext={() => setTourIndex((previous) => (previous + 1) % PLANETS.length)}
          onPrev={() => setTourIndex((previous) => (previous - 1 + PLANETS.length) % PLANETS.length)}
          onStop={() => { setIsTouring(false); setIsTourPaused(false); }}
        />
      )}
      {isSQLGameOpen && <SQLGameModal onClose={() => setIsSQLGameOpen(false)} />}
      {isPassportOpen && <PassportModal visitedPlanetIds={visitedPlanetIds} onClose={() => setIsPassportOpen(false)} />}
      {isResumeOpen && <ResumeModal onClose={() => setIsResumeOpen(false)} />}
    </div>
  );
}

export default App;

