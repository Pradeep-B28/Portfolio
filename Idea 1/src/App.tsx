import { useState, useEffect, useCallback, useMemo } from 'react';
import { PORTFOLIO_CLIPS } from './data/clips';
import { EditingRoomScene } from './components/EditingRoomScene';
import { HeaderHUD } from './components/HeaderHUD';
import { TimelineScrubber } from './components/TimelineScrubber';
import { DirectorsCutModal } from './components/DirectorsCutModal';
import { CrewCredits } from './components/CrewCredits';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { Film, Maximize2, ExternalLink } from 'lucide-react';

export function App() {
  const [scrubIndex, setScrubIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [activeTheme, setActiveTheme] = useState<'cyber' | 'amber' | 'emerald' | 'purple'>('cyber');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Filter clips by category
  const filteredClips = useMemo(() => {
    if (selectedCategory === 'all') return PORTFOLIO_CLIPS;
    return PORTFOLIO_CLIPS.filter((clip) => clip.category === selectedCategory);
  }, [selectedCategory]);

  // Responsive mobile listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track unlocked tech skills across viewed/scrubbed clips
  const unlockedSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    const maxViewedIdx = Math.max(Math.floor(scrubIndex), selectedIndex !== null ? selectedIndex : 0);

    for (let i = 0; i <= maxViewedIdx && i < filteredClips.length; i++) {
      filteredClips[i].techStack.forEach((skill) => skillsSet.add(skill));
    }
    return Array.from(skillsSet);
  }, [scrubIndex, selectedIndex, filteredClips]);

  const totalSkillsCount = useMemo(() => {
    const set = new Set<string>();
    filteredClips.forEach((clip) => clip.techStack.forEach((s) => set.add(s)));
    return set.size;
  }, [filteredClips]);

  // Auto-Play Trailer Cut mode
  useEffect(() => {
    if (!isPlayingTrailer) return;

    const interval = setInterval(() => {
      setScrubIndex((prev) => {
        const next = Math.floor(prev + 1) % filteredClips.length;
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlayingTrailer, filteredClips.length]);

  // Wheel scrub navigation for desktop
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (selectedIndex !== null) return;
      if (Math.abs(e.deltaY) > 10) {
        setScrubIndex((prev) => {
          const delta = e.deltaY > 0 ? 1 : -1;
          return Math.min(Math.max(0, Math.round(prev + delta)), filteredClips.length - 1);
        });
      }
    },
    [selectedIndex, filteredClips.length]
  );

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setScrubIndex((prev) => Math.min(filteredClips.length - 1, Math.floor(prev + 1)));
      } else if (e.key === 'ArrowLeft') {
        setScrubIndex((prev) => Math.max(0, Math.floor(prev - 1)));
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlayingTrailer((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredClips.length]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const activeClip = filteredClips[Math.round(scrubIndex)] || filteredClips[0];

  return (
    <div className="relative w-screen h-screen bg-[#07090e] overflow-hidden select-none font-sans text-slate-100 transition-colors duration-500">
      {/* Radial Vignette & Grid Overlay */}
      <div className="absolute inset-0 projector-vignette z-20 pointer-events-none" />
      <div className="absolute inset-0 grid-overlay-canvas z-10 pointer-events-none" />
      <div className="absolute inset-0 film-grain-overlay z-20 pointer-events-none" />

      {/* Aspect Ratio Framing */}
      {aspectRatio === '2.39:1' && (
        <>
          <div className="absolute top-0 left-0 right-0 h-[10vh] bg-black z-30 pointer-events-none transition-all duration-300" />
          <div className="absolute bottom-0 left-0 right-0 h-[10vh] bg-black z-30 pointer-events-none transition-all duration-300" />
        </>
      )}
      {aspectRatio === '4:3' && (
        <>
          <div className="absolute top-0 bottom-0 left-0 w-[12vw] bg-black z-30 pointer-events-none transition-all duration-300" />
          <div className="absolute top-0 bottom-0 right-0 w-[12vw] bg-black z-30 pointer-events-none transition-all duration-300" />
        </>
      )}
      {aspectRatio === '1:1' && (
        <>
          <div className="absolute top-0 bottom-0 left-0 w-[18vw] bg-black z-30 pointer-events-none transition-all duration-300" />
          <div className="absolute top-0 bottom-0 right-0 w-[18vw] bg-black z-30 pointer-events-none transition-all duration-300" />
        </>
      )}

      {/* Reticle Corner Crosshairs */}
      <div className="absolute top-16 left-6 z-20 pointer-events-none text-cyan-500/50 text-[10px] font-mono">
        ┌ REEL-A // 3D STAGE
      </div>
      <div className="absolute top-16 right-6 z-20 pointer-events-none text-purple-500/50 text-[10px] font-mono text-right">
        6,000+ MENTORED // 24FPS ┐
      </div>

      {/* Header Viewfinder HUD */}
      <HeaderHUD
        isPlayingTrailer={isPlayingTrailer}
        onToggleTrailer={() => setIsPlayingTrailer(!isPlayingTrailer)}
        aspectRatio={aspectRatio}
        onChangeAspectRatio={setAspectRatio}
        isMobile={isMobile}
        activeTheme={activeTheme}
        onSelectTheme={setActiveTheme}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setScrubIndex(0);
        }}
      />

      {/* Main Studio Area */}
      <main className="w-full h-full pt-16 pb-36 relative flex flex-col items-center justify-start pointer-events-none">
        {/* 3D React Three Fiber Editing Room Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <EditingRoomScene
            clips={filteredClips}
            scrubIndex={scrubIndex}
            hoveredIndex={hoveredIndex}
            selectedIndex={selectedIndex}
            onSelectClip={(idx) => {
              setSelectedIndex(idx);
              setScrubIndex(idx);
            }}
            onHoverClip={setHoveredIndex}
            isMobile={isMobile}
            isPlayingTrailer={isPlayingTrailer}
            prefersReducedMotion={prefersReducedMotion}
            activeTheme={activeTheme}
          />
        </div>

        {/* Central Floating Projector Glass Panel — Fully Visible & Non-Overlapping */}
        {selectedIndex === null && activeClip && (
          <div className="relative z-20 pointer-events-none w-full max-w-3xl px-4 sm:px-8 mt-2">
            <div className="w-full bg-slate-900/90 backdrop-blur-xl border-2 border-cyan-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-cyan-500/15 pointer-events-auto max-h-[calc(100vh-290px)] overflow-y-auto transition-all hover:border-cyan-400">
              {/* Top Card Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold font-mono text-cyan-300">
                    CUT #{Math.round(scrubIndex) + 1} OF {filteredClips.length} · {activeClip.category.toUpperCase()}
                  </span>
                </div>

                <div className="px-3 py-1 rounded-full text-[11px] font-mono font-bold flex items-center gap-1 bg-cyan-500/15 text-cyan-300 border border-cyan-500/40">
                  <span>{activeClip.takeType}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-100 mb-1 gradient-text">
                {activeClip.title}
              </h2>
              <p className="text-xs font-sans text-slate-400 mb-3">
                {activeClip.subtitle} · <span className="text-cyan-400 font-semibold">{activeClip.timeframe}</span>
              </p>

              {/* Full Narrative Text — Entirely Visible without truncation */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4 font-sans">
                {activeClip.description}
              </p>

              {/* Key Metrics Strip */}
              {activeClip.metrics && activeClip.metrics.length > 0 && (
                <div className="flex items-center gap-2 mb-4 flex-wrap font-mono">
                  {activeClip.metrics.map((m, idx) => (
                    <div key={idx} className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-cyan-500/30 text-center">
                      <span className="text-xs font-bold text-cyan-400">{m.value}</span>
                      <span className="text-[10px] text-slate-400 ml-1.5">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 flex-wrap gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {activeClip.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-slate-950 text-cyan-300 border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  {activeClip.links.length > 0 && (
                    <a
                      href={activeClip.links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 text-xs font-mono text-cyan-300 border border-cyan-500/40 transition-colors"
                    >
                      <span>{activeClip.links[0].label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedIndex(Math.round(scrubIndex))}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-sans font-bold text-slate-950 border border-cyan-400 shadow-md shadow-cyan-500/20 transition-all"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>EXPAND CUT</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Timeline Scrubber & Touch Control Strip */}
      <TimelineScrubber
        clips={filteredClips}
        scrubIndex={scrubIndex}
        onScrubChange={(newIdx) => setScrubIndex(newIdx)}
        onSelectClip={(idx) => setSelectedIndex(idx)}
        isMobile={isMobile}
      />

      {/* Director's Cut Detail Modal Inspector */}
      <DirectorsCutModal
        clip={selectedIndex !== null ? filteredClips[selectedIndex] : null}
        clipIndex={selectedIndex}
        totalClips={filteredClips.length}
        onClose={() => setSelectedIndex(null)}
        onPrev={() => selectedIndex !== null && selectedIndex > 0 && setSelectedIndex(selectedIndex - 1)}
        onNext={() => selectedIndex !== null && selectedIndex < filteredClips.length - 1 && setSelectedIndex(selectedIndex + 1)}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedIndex !== null && filteredClips[selectedIndex] && favorites.includes(filteredClips[selectedIndex].id)}
      />

      {/* Crew Credits Crawl Strip */}
      <CrewCredits
        unlockedSkills={unlockedSkills}
        totalSkillsCount={totalSkillsCount}
        activeClipTitle={activeClip?.title || ''}
        isMobile={isMobile}
      />
    </div>
  );
}

export default App;
