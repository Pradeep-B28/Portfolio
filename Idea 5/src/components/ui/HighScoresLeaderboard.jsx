import { useState } from 'react';
import {
  Activity,
  Filter,
  Play,
  Search,
  Trophy,
  X,
  Zap
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

const COMPLEXITY_ORDER = {
  M: 3,
  T: 2,
  E: 1
};

function getProjectScore(project) {
  const achievementScore = project.achievements.length * 120;
  const technologyScore = project.techTags.length * 35;
  const complexityScore = COMPLEXITY_ORDER[project.complexity] * 180;

  return achievementScore + technologyScore + complexityScore;
}

export default function HighScoresLeaderboard({
  projects,
  onClose,
  onSelectProject
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('complexity');

  const filteredProjects = projects
    .filter((project) => {
      const query = searchTerm.toLowerCase();

      return (
        project.title.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.techTags.some((technology) =>
          technology.toLowerCase().includes(query)
        )
      );
    })
    .sort((firstProject, secondProject) => {
      if (sortBy === 'complexity') {
        return (
          COMPLEXITY_ORDER[secondProject.complexity] -
          COMPLEXITY_ORDER[firstProject.complexity]
        );
      }

      if (sortBy === 'year') {
        return secondProject.releaseYear.localeCompare(
          firstProject.releaseYear
        );
      }

      if (sortBy === 'score') {
        return (
          getProjectScore(secondProject) -
          getProjectScore(firstProject)
        );
      }

      return firstProject.title.localeCompare(
        secondProject.title
      );
    });

  const handleSelectProject = (project) => {
    sounds.playCartridgeInsert();
    onSelectProject(project);
  };

  return (
    <div className="crt-overlay fixed inset-0 z-50 flex items-center justify-center bg-[#03050A]/90 p-3 backdrop-blur-2xl animate-fadeIn sm:p-6">
      <div className="crt-vignette relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#FF2ED1]/45 bg-[#0b101a] shadow-[0_0_90px_rgba(0,0,0,0.9)]">
        <header className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#FF2ED1]/18 via-transparent to-[#2EF2FF]/12 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="rounded-xl border border-[#FFD700]/35 bg-[#FFD700]/10 p-2.5">
              <Trophy className="h-5 w-5 text-[#FFD700]" />
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] shadow-[0_0_10px_#00FF66]" />
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#00FF66]">
                  Ranking system online
                </span>
              </div>

              <h2 className="truncate font-pixel text-sm text-[#FF2ED1] sm:text-lg">
                HIGH SCORES // GAME INDEX
              </h2>

              <p className="font-mono text-[10px] text-[#71818b] sm:text-xs">
                Select a cartridge to boot its project hub
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playSelect();
              onClose();
            }}
            className="rounded-xl border border-white/10 bg-black/40 p-2 text-white hover:bg-black/80"
            aria-label="Close game index"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex flex-col items-center justify-between gap-3 border-b border-white/10 bg-black/35 p-4 sm:flex-row">
          <label className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7a6e]" />

            <input
              type="text"
              placeholder="Search projects or technologies..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/60 py-2 pl-9 pr-3 font-mono text-xs text-white placeholder-[#6e7a6e] outline-none transition-colors focus:border-[#2EF2FF]"
            />
          </label>

          <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
            <Filter className="h-4 w-4 text-[#6e7a6e]" />

            <span className="font-mono text-[9px] uppercase tracking-wider text-[#6e7a6e]">
              Sort
            </span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="cursor-pointer rounded-xl border border-white/10 bg-black/60 px-3 py-2 font-mono text-[10px] text-[#2EF2FF] outline-none focus:border-[#2EF2FF]"
            >
              <option value="complexity">Complexity</option>
              <option value="score">Impact Score</option>
              <option value="year">Release Year</option>
              <option value="title">Project Name</option>
            </select>
          </div>
        </div>

        <div className="modal-scroll space-y-3 overflow-y-auto p-4 sm:p-5">
          {filteredProjects.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/15 bg-black/25 p-10 text-center">
              <p className="font-mono text-xs text-gray-400">
                No project cartridges match this scan.
              </p>
            </div>
          )}

          {filteredProjects.map((project, rank) => {
            const identityColor = project.color || '#00F0FF';
            const score = getProjectScore(project);

            return (
              <article
                key={project.id}
                onClick={() => handleSelectProject(project)}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08]"
                style={{
                  borderColor: `${identityColor}20`
                }}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border font-pixel text-xs"
                      style={{
                        color: identityColor,
                        borderColor: `${identityColor}55`,
                        backgroundColor: `${identityColor}12`,
                        boxShadow: `0 0 18px ${identityColor}14`
                      }}
                    >
                      #{rank + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white transition-colors group-hover:text-[#2EF2FF] sm:text-base">
                          {project.title}
                        </h3>

                        <span className="rounded bg-black px-2 py-1 font-pixel text-[8px] text-[#FFD700]">
                          ESRB {project.complexity}
                        </span>

                        <span
                          className="font-mono text-[9px]"
                          style={{ color: identityColor }}
                        >
                          {project.releaseYear}
                        </span>
                      </div>

                      <p className="mb-2 line-clamp-2 font-mono text-[10px] leading-relaxed text-gray-300 sm:text-xs">
                        {project.tagline}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.techTags.slice(0, 5).map((technology) => (
                          <span
                            key={technology}
                            className="rounded-md border border-white/10 bg-black/50 px-2 py-1 font-mono text-[8px] text-[#39FF14]"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 pt-3 lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#71818b]">
                      <Activity className="h-3.5 w-3.5 text-[#00F0FF]" />
                      <span>IMPACT</span>
                      <span className="font-bold text-[#FFD700]">
                        {score}
                      </span>
                    </div>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleSelectProject(project);
                      }}
                      className="flex items-center gap-1.5 rounded-xl border px-3.5 py-2 font-pixel text-[8px] transition-all duration-300 sm:text-[9px]"
                      style={{
                        color: identityColor,
                        borderColor: `${identityColor}70`,
                        backgroundColor: `${identityColor}14`
                      }}
                    >
                      <Play className="h-3.5 w-3.5" />
                      BOOT GAME
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 border-t border-white/5 pt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-gray-600">
                  <Zap className="h-3 w-3 text-[#FFD700]" />
                  {project.achievements.length} achievements unlocked
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}