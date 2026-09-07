import {
  Activity,
  Eye,
  Pause,
  Play,
  Radio,
  Trophy,
  Volume2,
  VolumeX
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function MarqueeBanner({
  onOpenLeaderboard,
  isTourActive,
  onToggleTour,
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleReducedMotion
}) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#070B12]/95 shadow-[0_-18px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl">
      <div className="overflow-hidden border-b border-white/5 bg-black/65 py-1.5">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-[#00F0FF]">
          <span className="flex items-center gap-2">
            <Radio className="h-3 w-3" />
            Arcade network online
          </span>

          <span className="text-[#FF2ED1]">
            Developer // Pradeep B
          </span>

          <span className="text-[#FFD700]">
            6,000+ engineers mentored
          </span>

          <span className="text-[#00FF66]">
            Placement impact // 70% to 90%
          </span>

          <span className="text-[#FF5500]">
            8 project cartridges loaded
          </span>

          <span className="flex items-center gap-2">
            <Radio className="h-3 w-3" />
            Arcade network online
          </span>

          <span className="text-[#FF2ED1]">
            Developer // Pradeep B
          </span>

          <span className="text-[#FFD700]">
            6,000+ engineers mentored
          </span>

          <span className="text-[#00FF66]">
            Placement impact // 70% to 90%
          </span>

          <span className="text-[#FF5500]">
            8 project cartridges loaded
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
            className="flex items-center gap-2 rounded-xl border border-[#FF2ED1]/50 bg-[#FF2ED1]/15 px-3.5 py-2 font-pixel text-[9px] text-[#FF2ED1] shadow-[0_0_16px_rgba(255,46,209,0.12)] hover:bg-[#FF2ED1]/30 sm:text-[10px]"
          >
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">HIGH SCORES //</span>
            ALL GAMES
          </button>

          <button
            onClick={() => {
              sounds.playSelect();
              onToggleTour();
            }}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 font-pixel text-[9px] transition-all sm:text-[10px] ${
              isTourActive
                ? 'animate-pulse border-[#FFD700] bg-[#FFD700]/25 text-[#FFD700]'
                : 'border-white/20 bg-white/5 text-gray-200 hover:bg-white/15'
            }`}
          >
            {isTourActive ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 text-[#00FF66]" />
            )}

            <span className="hidden sm:inline">
              {isTourActive ? 'TOUR ACTIVE' : 'ARCADE TOUR'}
            </span>
          </button>
        </div>

        <div className="hidden items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-gray-600 lg:flex">
          <Activity className="h-3.5 w-3.5 text-[#00FF66]" />
          Render channel stable
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
            <Eye className="h-4 w-4" />
            <span className="hidden font-mono text-[9px] md:inline">
              {reducedMotion ? 'MOTION OFF' : 'MOTION ON'}
            </span>
          </button>

          <button
            onClick={onToggleMute}
            className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs transition-all ${
              isMuted
                ? 'border-red-500/40 bg-red-500/15 text-red-400'
                : 'border-[#00F0FF]/40 bg-[#00F0FF]/15 text-[#00F0FF]'
            }`}
            title="Toggle sound effects"
            aria-label="Toggle sound effects"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}

            <span className="hidden font-mono text-[9px] md:inline">
              {isMuted ? 'MUTED' : 'AUDIO ON'}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}