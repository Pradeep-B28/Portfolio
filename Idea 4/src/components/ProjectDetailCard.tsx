import React from 'react';
import type { ConstellationProject } from '../data/projects';
import { ExternalLink, Sparkles, X, Calendar, Box } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectDetailCardProps {
  project: ConstellationProject | null;
  onClose: () => void;
  onSelectSkill: (skillId: string) => void;
  onInspect: (project: ConstellationProject) => void;
}

export const ProjectDetailCard: React.FC<ProjectDetailCardProps> = ({
  project,
  onClose,
  onSelectSkill,
  onInspect,
}) => {
  if (!project) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-20 md:right-auto md:w-full md:max-w-lg z-40 max-h-[70vh] overflow-y-auto space-glass-gold p-5 sm:p-6 rounded-2xl border border-[#4DEBFF]/40 shadow-2xl space-y-4 animate-fadeIn font-mono">
      <div className="flex justify-between items-start gap-2 border-b border-[#7C8AA6]/20 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            {project.isAnchor && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#B55FE6]/20 text-[#4DEBFF] border border-[#B55FE6]/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#B55FE6]" />
                <span>ANCHOR CONSTELLATION</span>
              </span>
            )}
            <span className="px-2 py-0.5 rounded text-[10px] bg-[#050810] text-[#E8C468] border border-[#E8C468]/30 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#E8C468]" />
              <span>Built in {project.year}</span>
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#EAF0FA] leading-tight">
            {project.title}
          </h3>
          <p className="text-xs text-[#E8C468]">{project.role} ({project.dates})</p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-[#050810] text-[#7C8AA6] hover:text-[#EAF0FA] border border-[#7C8AA6]/20 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs md:text-sm text-[#EAF0FA]/90 leading-relaxed font-sans">
        {project.description}
      </p>

      <div className="p-3 rounded-xl bg-[#050810]/80 border border-[#E8C468]/20 space-y-2 text-xs">
        <div className="flex items-center justify-between text-[#E8C468]">
          <span className="font-bold uppercase text-[10px] tracking-wider">RECRUITER IMPACT METRICS</span>
          <span>Complexity: {'★'.repeat(project.complexity)}</span>
        </div>
        <ul className="space-y-1">
          {project.impactMetrics.map((metric, i) => (
            <li key={i} className="text-[#EAF0FA] flex items-start gap-1.5 text-xs">
              <span className="text-[#E8C468] font-bold">›</span>
              <span>{metric}</span>
            </li>
          ))}
        </ul>
      </div>

      {project.codeSnippet && (
        <div className="rounded-lg overflow-hidden border border-[#7C8AA6]/20 bg-[#050810] p-2.5 text-[11px] text-[#E8C468] space-y-1">
          <span className="text-[9px] text-[#7C8AA6] uppercase block">// Constellation Code Fragment</span>
          <pre className="overflow-x-auto p-1 leading-relaxed">
            <code>{project.codeSnippet}</code>
          </pre>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#7C8AA6]/20">
        <div className="flex flex-wrap gap-1">
          {project.connectedSkillIds.map((skillId) => (
            <button
              key={skillId}
              onClick={() => onSelectSkill(skillId)}
              className="text-[10px] px-2 py-0.5 rounded bg-[#0D1526] border border-[#7C8AA6]/30 text-[#7C8AA6] hover:text-[#4DEBFF] hover:border-[#4DEBFF] transition-colors cursor-pointer"
            >
              #{skillId}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onInspect(project)}
            className="flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg bg-[#4DEBFF] text-[#050810] hover:bg-[#EAF0FA] transition-colors cursor-pointer shadow"
          >
            <Box className="w-3.5 h-3.5" />
            <span>INSPECT 3D</span>
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-[#050810] border border-[#7C8AA6]/30 hover:border-[#E8C468] text-[#EAF0FA] hover:text-[#E8C468] transition-colors"
              title="View GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg bg-[#E8C468] text-[#050810] hover:bg-[#EAF0FA] transition-colors"
            >
              <span>LIVE SYSTEM</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
