import { useState } from 'react';
import {
  Award,
  ChevronDown,
  ChevronUp,
  Code2,
  Mail,
  Shield,
  Sparkles,
  Terminal
} from 'lucide-react';
import { DEVELOPER_INFO } from '../../data/developer';
import { GithubIcon, LinkedinIcon } from './Icons';
import { sounds } from '../../utils/soundEffects';

export default function DeveloperProfileCard({ onOpenReport }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    sounds.playHover();
    setCollapsed((currentValue) => !currentValue);
  };

  return (
    <aside className="fixed left-4 top-14 z-30 w-[calc(100vw-2rem)] max-w-sm transition-all duration-500">
      <div className="glass-panel-cyber border-gradient-cyan rounded-2xl p-4 text-[#F0F6FC]">
        <div className="relative z-10">
          <div className="mb-3 flex items-start justify-between border-b border-white/10 pb-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-[#FF2ED1] via-[#00F0FF] to-[#FFD700] p-[2px] shadow-[0_0_22px_rgba(0,240,255,0.38)]">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#07070E] font-display text-sm font-black text-[#00F0FF]">
                  PB
                </div>
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#090d17] bg-[#00FF66] shadow-[0_0_10px_#00FF66]" />
              </div>

              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#6e8999]">
                    PLAYER PROFILE
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
                </div>

                <h3 className="flex items-center gap-1.5 truncate font-display text-sm font-bold tracking-wide text-[#00F0FF]">
                  {DEVELOPER_INFO.name}
                  <Sparkles className="h-3.5 w-3.5 shrink-0 animate-pulse text-[#FFD700]" />
                </h3>

                <p className="truncate font-mono text-[10px] text-gray-400">
                  {DEVELOPER_INFO.title}
                </p>
              </div>
            </div>

            <button
              onClick={toggleCollapse}
              className="ml-2 rounded-lg bg-white/5 p-1.5 text-gray-400 hover:bg-white/15 hover:text-white"
              title={collapsed ? 'Expand profile' : 'Collapse profile'}
              aria-label={collapsed ? 'Expand profile' : 'Collapse profile'}
            >
              {collapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
          </div>

          {!collapsed && (
            <div className="animate-fadeIn space-y-3.5">
              <div className="flex items-center justify-between rounded-xl border border-[#FFD700]/25 bg-gradient-to-r from-[#FFD700]/10 to-transparent px-3 py-2">
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-gray-400">
                  <Shield className="h-3.5 w-3.5 text-[#FF5500]" />
                  Clearance
                </span>

                <span className="font-mono text-[9px] font-bold tracking-wide text-[#FFD700]">
                  {DEVELOPER_INFO.developerRating}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.045] p-2.5 text-center">
                  <span className="mb-1 block font-mono text-[8px] uppercase tracking-wider text-gray-500">
                    Experience
                  </span>
                  <span className="font-display text-sm font-bold text-[#00FF66]">
                    {DEVELOPER_INFO.yearsExperience}
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.045] p-2.5 text-center">
                  <span className="mb-1 block font-mono text-[8px] uppercase tracking-wider text-gray-500">
                    Mentored
                  </span>
                  <span className="font-display text-sm font-bold text-[#00F0FF]">
                    {DEVELOPER_INFO.stats.studentsMentored}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                    <Terminal className="h-3.5 w-3.5 text-[#00F0FF]" />
                    Core Skill Power
                  </span>
                  <span className="font-mono text-[8px] text-[#6c8490]">
                    LIVE SCAN
                  </span>
                </div>

                <div className="space-y-2.5">
                  {DEVELOPER_INFO.topSkills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between gap-2 font-mono text-[9px]">
                        <span className="truncate text-gray-300">
                          {skill.name}
                        </span>
                        <span className="shrink-0 font-bold text-[#00FF66]">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-black/80 p-[2px]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#00F0FF] via-[#FF2ED1] to-[#00FF66] shadow-[0_0_10px_#00F0FF] transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-2">
                <div className="flex items-center gap-1.5">
                  <a
                    href={DEVELOPER_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-white/5 p-2 text-[#00F0FF] hover:bg-[#00F0FF]/20"
                    title="LinkedIn"
                    onClick={() => sounds.playSelect()}
                  >
                    <LinkedinIcon className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={DEVELOPER_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-white/5 p-2 text-[#FF2ED1] hover:bg-[#FF2ED1]/20"
                    title="GitHub"
                    onClick={() => sounds.playSelect()}
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={`mailto:${DEVELOPER_INFO.email}`}
                    className="rounded-xl border border-white/10 bg-white/5 p-2 text-[#FFD700] hover:bg-[#FFD700]/20"
                    title="Email Pradeep"
                    onClick={() => sounds.playSelect()}
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>

                <button
                  onClick={() => {
                    sounds.playSelect();
                    onOpenReport();
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-[#00FF66]/40 bg-[#00FF66]/15 px-3 py-2 font-mono text-[9px] font-bold text-[#00FF66] shadow-[0_0_16px_rgba(0,255,102,0.2)] hover:bg-[#00FF66]/30"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  REPORT
                </button>
              </div>

              <div className="flex items-center gap-2 border-t border-white/5 pt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-gray-600">
                <Award className="h-3.5 w-3.5 text-[#FFD700]" />
                <span>Achievement system synchronized</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}