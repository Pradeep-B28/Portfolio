import {
  Code,
  Cpu,
  Database,
  Eye,
  Flame,
  Layers,
  Pause,
  Play,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Trophy,
  Volume2,
  VolumeX
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

const POWERUP_ICONS = {
  Java: Cpu,
  'Data Structures': Code,
  JVM: Server,
  Multithreading: Terminal,
  React: Layers,
  'Node.js': Server,
  MongoDB: Database,
  Android: Smartphone,
  'Groq AI': Sparkles,
  Python: Code,
  PostgreSQL: Database,
  'GitHub Actions': ShieldCheck,
  'Three.js': Sparkles,
  WebGL: Cpu,
  Docker: Server,
  TypeScript: Code
};

export default function ArcadeFooterDeck({
  projects,
  selectedProject,
  onSelectProject,
  activePowerUps = [],
  onOpenLeaderboard,
  isTourActive,
  onToggleTour,
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleReducedMotion
}) {
  return (
    <footer className="pointer-events-none fixed bottom-0 left-0 right-0 z-30 flex flex-col items-center">
      <div className="pointer-events-auto mb-2 hidden w-full max-w-3xl px-4 md:block">
        <div className="glass-panel-cyber flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 shadow-2xl">
          <span className="mr-1 hidden font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-gray-400 lg:inline">
            POWER-UPS
          </span>

          <div className="flex items-center gap-1.5">
            {Object.entries(POWERUP_ICONS)
              .slice(0, 8)
              .map(([name, IconComponent]) => {
                const isActive =
                  activePowerUps.includes(name) ||
                  activePowerUps.some((powerUp) =>
                    powerUp.includes(name)
                  );

                return (
                  <div
                    key={name}
                    className={`group relative rounded-full border p-1.5 transition-all duration-300 ${
                      isActive
                        ? 'scale-110 border-[#00F0FF] bg-[#00F0FF]/25 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.7)]'
                        : 'border-white/10 bg-black/60 text-gray-500'
                    }`}
                  >
                    <IconComponent className="h-3.5 w-3.5" />

                    <div className="pointer-events-none absolute -top-9 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/20 bg-[#07070E] px-2 py-1 font-mono text-[8px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {name}
                      {isActive ? ' // ACTIVE' : ''}
                    </div>
                  </div>
                );
              })}
          </div>

          <span className="ml-1 hidden items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-[#00FF66] lg:flex">
            <Flame className="h-3 w-3" />
            Loaded
          </span>
        </div>
      </div>

      <div className="pointer-events-auto no-scrollbar flex w-full max-w-7xl items-center justify-start gap-2 overflow-x-auto px-2 py-2 sm:px-4 xl:justify-center">
        {projects.map((project) => {
          const isSelected = selectedProject?.id === project.id;
          const identityColor = project.color || '#00F0FF';

          return (
            <button
              key={project.id}
              onClick={() => {
                sounds.playCartridgeInsert();
                onSelectProject(project);
              }}
              className={`group relative flex shrink-0 items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-all duration-300 sm:px-3 ${
                isSelected
                  ? 'scale-105 bg-[#14141F] shadow-[0_0_25px_rgba(0,240,255,0.42)]'
                  : 'border-white/10 bg-[#14141F]/80 hover:-translate-y-1 hover:border-white/30 hover:bg-[#14141F]'
              }`}
              style={{
                borderColor: isSelected ? identityColor : undefined
              }}
              aria-pressed={isSelected}
            >
              <span
                className="h-6 w-1.5 shrink-0 rounded-full transition-all duration-300 group-hover:h-8"
                style={{
                  backgroundColor: identityColor,
                  boxShadow: isSelected
                    ? `0 0 14px ${identityColor}`
                    : 'none'
                }}
              />

              <span className="min-w-0">
                <span
                  className="block max-w-[90px] truncate font-display text-[9px] font-bold tracking-wide sm:max-w-[110px] sm:text-[10px]"
                  style={{
                    color: isSelected
                      ? identityColor
                      : '#F0F6FC'
                  }}
                >
                  {project.title.toUpperCase()}
                </span>

                <span className="block font-mono text-[7.5px] text-gray-400 sm:text-[8px]">
                  {project.complexity} // {project.releaseYear}
                </span>
              </span>

              {isSelected && (
                <span
                  className="absolute -right-1 -top-1 h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: identityColor,
                    boxShadow: `0 0 12px ${identityColor}`
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="pointer-events-auto w-full border-t border-white/15 bg-[#07070E]/95 shadow-[0_-18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="overflow-hidden border-b border-white/5 bg-black/70 py-1.5">
          <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap font-mono text-[9px] font-semibold tracking-[0.16em] text-[#00F0FF]">
            <span>PB // CAREER ARCADE NETWORK</span>
            <span className="text-[#FF2ED1]">
              L&D LEAD // FULL-STACK ARCHITECT
            </span>
            <span className="text-[#FFD700]">
              6,000+ ENGINEERS MENTORED
            </span>
            <span className="text-[#00FF66]">
              PLACEMENT IMPACT 70% TO 90%
            </span>
            <span className="text-[#FF5500]">
              8 PROJECT CARTRIDGES ONLINE
            </span>
            <span>PB // CAREER ARCADE NETWORK</span>
            <span className="text-[#FF2ED1]">
              L&D LEAD // FULL-STACK ARCHITECT
            </span>
            <span className="text-[#FFD700]">
              6,000+ ENGINEERS MENTORED
            </span>
            <span className="text-[#00FF66]">
              PLACEMENT IMPACT 70% TO 90%
            </span>
            <span className="text-[#FF5500]">
              8 PROJECT CARTRIDGES ONLINE
            </span>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playSelect();
                onOpenLeaderboard();
              }}
              className="flex items-center gap-2 rounded-xl border border-[#FF2ED1]/50 bg-[#FF2ED1]/15 px-3.5 py-2 font-display text-[9px] font-bold text-[#FF2ED1] shadow-[0_0_16px_rgba(255,46,209,0.12)] hover:bg-[#FF2ED1]/30 sm:text-[10px]"
            >
              <Trophy className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                HIGH SCORES //
              </span>
              ALL GAMES
            </button>

            <button
              onClick={() => {
                sounds.playSelect();
                onToggleTour();
              }}
              className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 font-display text-[9px] font-bold transition-all sm:text-[10px] ${
                isTourActive
                  ? 'animate-pulse border-[#FFD700] bg-[#FFD700]/25 text-[#FFD700]'
                  : 'border-white/20 bg-white/5 text-gray-200 hover:bg-white/15'
              }`}
            >
              {isTourActive ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-3.5 w-3.5 text-[#00FF66]" />
              )}

              <span className="hidden sm:inline">
                {isTourActive ? 'TOUR ACTIVE' : 'ARCADE TOUR'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleReducedMotion}
              className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs transition-all ${
                reducedMotion
                  ? 'border-[#00FF66] bg-[#00FF66]/20 text-[#00FF66]'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
              }`}
              title="Toggle reduced motion"
              aria-label="Toggle reduced motion"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden font-mono text-[9px] md:inline">
                {reducedMotion ? 'MOTION OFF' : 'MOTION ON'}
              </span>
            </button>

            <button
              onClick={onToggleMute}
              className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs transition-all ${
                isMuted
                  ? 'border-red-500/50 bg-red-500/15 text-red-400'
                  : 'border-[#00F0FF]/40 bg-[#00F0FF]/15 text-[#00F0FF]'
              }`}
              title="Toggle sound effects"
              aria-label="Toggle sound effects"
            >
              {isMuted ? (
                <VolumeX className="h-3.5 w-3.5" />
              ) : (
                <Volume2 className="h-3.5 w-3.5" />
              )}

              <span className="hidden font-mono text-[9px] md:inline">
                {isMuted ? 'MUTED' : 'AUDIO ON'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}