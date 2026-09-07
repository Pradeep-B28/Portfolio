import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Award,
  ExternalLink,
  MonitorPlay,
  Share2,
  Terminal,
  Trophy,
  X,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/soundEffects';
import { GithubIcon } from './Icons';

function MissionBriefing({ description, reducedMotion }) {
  const [displayedText, setDisplayedText] = useState(
    reducedMotion ? description : ''
  );

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    let currentIndex = 0;

    const timer = window.setInterval(() => {
      if (currentIndex >= description.length) {
        window.clearInterval(timer);
        return;
      }

      const nextCharacter = description.charAt(currentIndex);
      currentIndex += 1;

      setDisplayedText((currentText) => {
        return currentText + nextCharacter;
      });
    }, 12);

    return () => window.clearInterval(timer);
  }, [description, reducedMotion]);

  const isTyping =
    !reducedMotion && displayedText.length < description.length;

  return (
    <p className="min-h-[60px] font-mono text-xs leading-relaxed text-gray-200 sm:text-sm">
      {displayedText}

      {isTyping && (
        <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[#00F0FF]" />
      )}
    </p>
  );
}

export default function GameHubModal({
  project,
  onClose,
  onOpenShare,
  reducedMotion
}) {
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        sounds.playSelect();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    if (!reducedMotion) {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.55 },
        colors: [
          project.color || '#00F0FF',
          '#FF2ED1',
          '#FFD700',
          '#00FF66'
        ]
      });

      sounds.playAchievement();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, project, reducedMotion]);

  const identityColor = project.color || '#00F0FF';
  const screenshots = project.screenshots || [];

  return (
    <div className="crt-overlay fixed inset-0 z-50 flex items-center justify-center bg-[#03050A]/90 p-3 backdrop-blur-2xl animate-fadeIn sm:p-6">
      <div
        className="crt-vignette relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border bg-[#0B101A] shadow-[0_0_90px_rgba(0,0,0,0.95)]"
        style={{
          borderColor: `${identityColor}70`,
          boxShadow: `0 0 80px ${identityColor}18, 0 25px 90px rgba(0,0,0,0.85)`
        }}
      >
        <header
          className="flex items-center justify-between border-b px-4 py-3 sm:px-6 sm:py-4"
          style={{
            background: `linear-gradient(90deg, ${identityColor}1C, transparent 55%, ${identityColor}0C)`,
            borderColor: `${identityColor}42`
          }}
        >
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                sounds.playSelect();
                onClose();
              }}
              className="group flex items-center gap-2 rounded-xl border border-white/20 bg-black/60 px-3 py-2 font-mono text-[10px] font-semibold tracking-wide text-[#F0F6FC] hover:bg-black/90 sm:text-xs"
              title="Return to cartridge shelf"
            >
              <ArrowLeft className="h-4 w-4 text-[#00F0FF] transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">BACK TO SHELF</span>
              <span className="sm:hidden">BACK</span>
            </button>

            <div className="hidden items-center gap-1.5 rounded-lg border border-white/20 bg-black/80 px-3 py-1.5 font-pixel text-[9px] text-[#FFD700] sm:flex">
              <span>ESRB</span>
              <span className="rounded bg-white/15 px-1.5 py-0.5 font-mono font-bold text-white">
                {project.complexity}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-gray-500 md:inline">
              Cartridge // {project.id}
            </span>

            <button
              onClick={() => {
                sounds.playSelect();
                onOpenShare(project);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-3 py-2 font-mono text-[10px] text-[#00F0FF] hover:bg-[#00F0FF]/20"
              aria-label="Share project"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">SHARE</span>
            </button>

            <button
              onClick={() => {
                sounds.playSelect();
                onClose();
              }}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/50 bg-red-500/15 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-red-300 hover:bg-red-500 hover:text-white"
              title="Close title card"
              aria-label="Close project details"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">CLOSE</span>
            </button>
          </div>
        </header>

        <div className="modal-scroll overflow-y-auto p-4 sm:p-6">
          <div className="mb-6 grid gap-5 border-b border-white/10 pb-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-md border px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider"
                  style={{
                    color: identityColor,
                    borderColor: `${identityColor}55`,
                    backgroundColor: `${identityColor}12`
                  }}
                >
                  {project.category}
                </span>

                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#00FF66]">
                  Release {project.releaseYear}
                </span>

                <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                  Role // {project.role}
                </span>
              </div>

              <div>
                <h1
                  className="font-display text-3xl font-extrabold uppercase tracking-tight sm:text-5xl"
                  style={{
                    color: identityColor,
                    textShadow: `0 0 25px ${identityColor}80`
                  }}
                >
                  {project.title}
                </h1>

                <p className="mt-2 max-w-3xl font-mono text-xs italic leading-relaxed text-gray-300 sm:text-sm">
                  {project.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-gray-500 lg:text-right">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: identityColor,
                  boxShadow: `0 0 14px ${identityColor}`
                }}
              />
              Mission file unlocked
            </div>
          </div>

          {screenshots.length > 0 && (
            <section className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#00F0FF] sm:text-xs">
                  <MonitorPlay className="h-4 w-4 text-[#FFD700]" />
                  Gameplay Footage // Architecture
                </span>

                <span className="font-mono text-[9px] text-gray-500">
                  {selectedScreenshot + 1} / {screenshots.length}
                </span>
              </div>

              <div className="group relative aspect-video max-h-[380px] overflow-hidden rounded-2xl border border-white/20 bg-black/80 shadow-2xl">
                <img
                  src={screenshots[selectedScreenshot]}
                  alt={`${project.title} project preview`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/20" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                  <span className="rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 font-mono text-[9px] text-white/90">
                    {project.title} // Preview {selectedScreenshot + 1}
                  </span>

                  <div className="flex gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2">
                    {screenshots.map((screenshot, index) => (
                      <button
                        key={`${screenshot}-${index}`}
                        onClick={() => setSelectedScreenshot(index)}
                        className={`h-2.5 w-2.5 rounded-full transition-all ${
                          selectedScreenshot === index
                            ? 'scale-125 bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]'
                            : 'bg-white/40 hover:bg-white/80'
                        }`}
                        aria-label={`Show preview ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="mb-6 rounded-2xl border border-white/10 bg-black/55 p-4 shadow-inner sm:p-5">
            <span className="mb-2 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#00F0FF] sm:text-xs">
              <Terminal className="h-4 w-4" />
              Mission Briefing
            </span>

            <MissionBriefing
              key={`${project.id}-${reducedMotion}`}
              description={project.description}
              reducedMotion={reducedMotion}
            />
          </section>

          <section className="mb-6 space-y-3">
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFD700] sm:text-xs">
              <Trophy className="h-4 w-4" />
              Unlocked Recruiter Achievements
            </span>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {project.achievements.map((achievement, index) => (
                <div
                  key={`${achievement}-${index}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="rounded-xl bg-[#FFD700]/15 p-2 text-[#FFD700] transition-transform duration-300 group-hover:scale-110">
                    <Award className="h-4 w-4" />
                  </div>

                  <span className="font-mono text-[10px] font-medium leading-relaxed text-gray-200">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-6 space-y-3">
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#00FF66] sm:text-xs">
              <Zap className="h-4 w-4" />
              Tech Stack // Power Meters
            </span>

            <div className="grid gap-3 sm:grid-cols-2">
              {project.techTags.map((technology) => (
                <div
                  key={technology}
                  className="rounded-xl border border-white/10 bg-black/50 p-3"
                >
                  <div className="mb-1.5 flex items-center justify-between gap-3 font-mono text-[10px]">
                    <span className="truncate font-semibold text-gray-200">
                      {technology}
                    </span>

                    <span className="shrink-0 font-bold text-[#00FF66]">
                      HP 100%
                    </span>
                  </div>

                  <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full border border-white/15 bg-black/80 p-0.5">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <span
                        key={index}
                        className="h-full flex-1 rounded-sm"
                        style={{
                          backgroundColor: identityColor,
                          opacity: index < 7 ? 0.95 : 0.42
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-3 border-t border-white/15 pt-5 sm:flex-row">
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playSelect()}
              className="flex w-full flex-1 items-center justify-center gap-2 rounded-xl bg-[#00FF66] px-5 py-3.5 font-display text-xs font-bold text-black shadow-[0_0_25px_rgba(0,255,102,0.4)] hover:bg-[#00E059]"
            >
              <ExternalLink className="h-4 w-4" />
              CONTINUE TO DEMO / APP
            </a>

            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playSelect()}
              className="flex w-full flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 font-display text-xs font-bold text-[#F0F6FC] hover:bg-white/20"
            >
              <GithubIcon className="h-4 w-4 text-[#FF2ED1]" />
              VIEW SOURCE CODE
            </a>

            <button
              onClick={() => {
                sounds.playSelect();
                onClose();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/50 bg-red-500/15 px-6 py-3.5 font-display text-xs font-bold text-red-300 hover:bg-red-500 hover:text-white sm:w-auto"
            >
              <X className="h-4 w-4" />
              EXIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}