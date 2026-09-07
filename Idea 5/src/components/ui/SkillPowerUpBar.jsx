import {
  Code,
  Cpu,
  Database,
  Layers,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Zap
} from 'lucide-react';
import { DEVELOPER_INFO } from '../../data/developer';

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

export default function SkillPowerUpBar({
  activePowerUps = []
}) {
  return (
    <div className="fixed bottom-16 left-1/2 z-20 hidden w-full max-w-3xl -translate-x-1/2 px-4 md:block">
      <div className="glass-panel-cyber border-gradient-cyan rounded-2xl px-4 py-3 shadow-2xl">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#00F0FF]">
            <Zap className="h-3.5 w-3.5" />
            Skill Power-Ups
          </span>

          <span className="font-mono text-[8px] uppercase tracking-wider text-gray-500">
            {DEVELOPER_INFO.stats.totalSkillPoints} points available
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
          {Object.entries(POWERUP_ICONS)
            .slice(0, 9)
            .map(([name, IconComponent]) => {
              const isActive =
                activePowerUps.includes(name) ||
                activePowerUps.some((powerUp) =>
                  powerUp.includes(name)
                );

              return (
                <div
                  key={name}
                  className={`group relative flex shrink-0 items-center gap-2 rounded-xl border px-2.5 py-2 transition-all duration-300 ${
                    isActive
                      ? 'scale-105 border-[#00F0FF]/70 bg-[#00F0FF]/15 text-[#00F0FF] shadow-[0_0_18px_rgba(0,240,255,0.3)]'
                      : 'border-white/10 bg-black/35 text-gray-500 hover:border-white/25 hover:text-gray-300'
                  }`}
                >
                  <IconComponent className="h-3.5 w-3.5" />

                  <span className="hidden font-mono text-[8px] uppercase tracking-wide lg:inline">
                    {name}
                  </span>

                  {isActive && (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00FF66] shadow-[0_0_9px_#00FF66]" />
                  )}

                  <div className="pointer-events-none absolute -top-10 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/15 bg-[#07070E] px-2.5 py-1.5 font-mono text-[9px] text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                    {name}
                    {isActive ? ' // ACTIVE' : ' // DORMANT'}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}