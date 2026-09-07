import React, { useEffect } from 'react';
import { X, ExternalLink, Code, Shield, Award, Cpu, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BankVisualizer } from './BankVisualizer';

export function DepositBoxModal({ project, onClose }) {
  useEffect(() => {
    // Fire festive celebration confetti on box unlock
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E0B45C', '#4A7FBF', '#00FF88', '#FFFFFF']
      });
    } catch (e) {
      // Graceful fallback
    }

    // Add Escape key listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070A]/85 backdrop-blur-xl animate-fadeIn overflow-y-auto" onClick={onClose}>
      <div 
        className="relative w-full max-w-3xl glass-panel-vault rounded-2xl border-2 border-[#E0B45C]/50 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prominent High-Visibility Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#121620] via-[#1A202C] to-[#121620] border-b border-[#E0B45C]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded bg-[#FFD700] text-[#0A0D12] font-mono font-extrabold text-sm tracking-wider shadow-md uppercase">
              {project.repoCode || `BOX-${project.boxNumber}`}
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-[#00FF88] flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Security Clearance Level {project.securityLevel} Unlocked</span>
              </div>
              <h2 className="text-xl md:text-2xl font-syne font-bold text-[#EDF1F6] text-gold-glow">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Prominent Close Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FF0040]/20 hover:bg-[#FF0040]/40 border-2 border-[#FF0040] text-[#FF0040] hover:text-white font-mono font-bold text-xs transition-all shadow-lg cursor-pointer active:scale-95"
            aria-label="Close box modal"
            title="Close Vault Box (Esc)"
          >
            <span>CLOSE</span>
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#EDF1F6]">
          {/* Subtitle & Valuation Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#0B0E14]/80 border border-[#3A3F47]/50">
            <div>
              <div className="text-xs font-mono text-[#8A94A3] uppercase">Classification Asset</div>
              <div className="text-base font-space font-semibold text-[#E0B45C]">{project.subtitle}</div>
            </div>
            <div className="flex items-center gap-4 text-right">
              <div>
                <div className="text-[10px] font-mono text-[#8A94A3] uppercase">Asset Valuation</div>
                <div className="text-xl font-mono font-bold text-[#E0B45C] text-gold-glow">
                  ${(project.valuation / 1000000).toFixed(1)}M USD
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8A94A3] uppercase">Complexity</div>
                <div className="text-xl font-mono font-bold text-[#00FF88]">
                  {project.complexityScore}/100
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC 12-VISUAL BANK INTERACTIVE COMPONENT */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#E0B45C] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Bank Visualizer — {project.title}</span>
            </div>
            <BankVisualizer project={project} />
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8A94A3] mb-2">
              Asset Overview & Mission Briefing
            </h3>
            <p className="text-sm leading-relaxed text-[#D0D7E2] bg-[#121620]/60 p-4 rounded-xl border border-[#3A3F47]/40">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Components */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8A94A3] mb-2.5 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#E0B45C]" />
              <span>Asset Tech Stack & Architecture</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techTags.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#181D28] border border-[#E0B45C]/40 text-[#E0B45C] font-mono text-xs font-semibold shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8A94A3] mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#00FF88]" />
              <span>Audited Performance Metrics</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(project.metrics).map(([key, value], idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0B0E14]/70 border border-[#3A3F47]/40 text-center">
                  <div className="text-[10px] font-mono uppercase text-[#8A94A3] truncate">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </div>
                  <div className="text-sm font-mono font-bold text-[#EDF1F6] mt-1 text-gold-glow">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Achievements */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8A94A3] mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
              <span>Technical Milestones & Deliverables</span>
            </h3>
            <ul className="space-y-2 font-space text-xs text-[#D0D7E2]">
              {project.achievements.map((ach, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-[#121620]/40 p-2.5 rounded-lg border border-[#3A3F47]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0B45C] mt-1.5 shrink-0"></span>
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prominent Footer Action Bar */}
        <div className="p-4 bg-[#0E121A] border-t border-[#3A3F47]/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1F242D] hover:bg-[#3A3F47] border border-[#3A3F47] text-[#EDF1F6] font-mono text-xs font-bold transition-all hover:scale-105 active:scale-95"
              >
                <Code className="w-4 h-4 text-[#E0B45C]" />
                <span>Source Repository</span>
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E0B45C] hover:bg-[#FFD700] text-[#0A0C10] font-mono text-xs font-extrabold transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Access Live Protocol</span>
              </a>
            )}
          </div>

          {/* PROMINENT BOTTOM CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF0040]/20 hover:bg-[#FF0040] text-[#FF0040] hover:text-white border-2 border-[#FF0040] font-mono font-extrabold text-xs transition-all shadow-xl cursor-pointer active:scale-95 ml-auto"
            title="Close Vault Box (Esc)"
          >
            <span>[ESC] CLOSE VAULT BOX</span>
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}
