import {
  Activity,
  Flame,
  Gamepad2,
  Trophy,
  Zap
} from 'lucide-react';
import { DEVELOPER_INFO } from '../../data/developer';

function StatTile({ icon, label, value, color }) {
  return (
    <div className="group flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 p-2 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]">
      <div
        className="rounded-lg p-1.5 transition-transform duration-300 group-hover:scale-110"
        style={{
          color,
          backgroundColor: `${color}20`,
          boxShadow: `0 0 18px ${color}18`
        }}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-[#71818b]">
          {label}
        </span>

        <span
          className="block truncate font-pixel text-xs"
          style={{ color }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

export default function GameStatsDashboard({
  selectedProject
}) {
  return (
    <aside className="fixed right-4 top-14 z-30 hidden min-w-[260px] md:block">
      <div className="glass-panel-cyber border-gradient-magenta rounded-2xl p-3 text-[#E4F2E4]">
        <div className="relative z-10">
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
            <span className="flex items-center gap-1.5 font-pixel text-[9px] tracking-wide text-[#FF2ED1]">
              <Gamepad2 className="h-3.5 w-3.5" />
              GAME STATS
            </span>

            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-[#39FF14]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
              LIVE HUD
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <StatTile
              icon={<Gamepad2 className="h-3.5 w-3.5" />}
              label="Games"
              value={DEVELOPER_INFO.stats.totalGames}
              color="#ff2ed1"
            />

            <StatTile
              icon={<Zap className="h-3.5 w-3.5" />}
              label="Skill Points"
              value={DEVELOPER_INFO.stats.totalSkillPoints}
              color="#2ef2ff"
            />

            <StatTile
              icon={<Flame className="h-3.5 w-3.5" />}
              label="Mentored"
              value={DEVELOPER_INFO.stats.studentsMentored}
              color="#00ff66"
            />

            <StatTile
              icon={<Trophy className="h-3.5 w-3.5" />}
              label="Team Size"
              value={DEVELOPER_INFO.stats.trainerTeamSize}
              color="#ffd700"
            />
          </div>

          <div className="mt-3 rounded-xl border border-[#FF6B00]/40 bg-gradient-to-r from-[#FF6B00]/20 via-[#FFD700]/10 to-transparent p-2.5">
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-[#FFD700]/15 p-1.5">
                <Trophy className="h-4 w-4 text-[#FFD700]" />
              </div>

              <div className="min-w-0">
                <span className="block font-pixel text-[8px] uppercase tracking-wide text-[#FFD700]">
                  Placement Catalyst
                </span>

                <span className="block truncate font-mono text-[10px] text-gray-200">
                  {DEVELOPER_INFO.stats.placementBoost} improvement
                </span>
              </div>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-black/50">
              <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-[#FF6B00] via-[#FFD700] to-[#00FF66] shadow-[0_0_12px_#FFD700]" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2">
            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#71818b]">
              <Activity className="h-3 w-3 text-[#00F0FF]" />
              System Load
            </span>

            <span className="font-mono text-[9px] font-bold text-[#00FF66]">
              OPTIMAL
            </span>
          </div>

          {selectedProject && (
            <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-[#00FF66]/20 bg-[#00FF66]/[0.06] px-2.5 py-2">
              <span className="font-mono text-[8px] uppercase tracking-wider text-[#71818b]">
                Loaded Cartridge
              </span>

              <span className="truncate font-pixel text-[8px] text-[#39FF14]">
                {selectedProject.title}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}