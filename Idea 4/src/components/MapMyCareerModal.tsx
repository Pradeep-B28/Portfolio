import React from 'react';
import { X, Printer, Sparkles, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { SKILLS } from '../data/skills';
import { CONSTELLATIONS } from '../data/projects';

interface MapMyCareerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapMyCareerModal: React.FC<MapMyCareerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col space-glass-gold rounded-2xl overflow-hidden shadow-2xl border border-[#E8C468]/40 print:max-h-none print:shadow-none print:border-none print:bg-white print:text-black">
        {/* Header Actions (Hidden in Print) */}
        <div className="flex items-center justify-between p-6 border-b border-[#7C8AA6]/20 bg-[#050810] print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E8C468]" />
            <h3 className="text-xl font-bold text-[#EAF0FA]">
              MAP MY CAREER: RECRUITER TECHNICAL REPORT
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E8C468] text-[#050810] font-mono text-xs font-bold hover:bg-[#EAF0FA] transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / SAVE AS PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#0D1526] text-[#7C8AA6] hover:text-[#EAF0FA] border border-[#7C8AA6]/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Executive Report Sheet */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#0D1526] text-[#EAF0FA] print:bg-white print:text-black print:p-0 custom-scrollbar font-mono">
          {/* Candidate Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-[#E8C468]/30 gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-[#EAF0FA] print:text-black">
                PRADEEP B
              </h1>
              <p className="text-sm text-[#E8C468] print:text-amber-800 font-semibold">
                L&D Team Lead | Java & DSA Master Trainer | Full-Stack Architect
              </p>
              <p className="text-xs text-[#7C8AA6] print:text-stone-600 font-sans">
                MBA Systems Management (Univ. of Madras) | BE Civil Engineering (Mepco Schlenk)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 print:text-xs">
              <a
                href="https://www.linkedin.com/in/pradeepb-2k"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#050810] border border-[#E8C468]/40 text-xs text-[#EAF0FA] hover:text-[#E8C468]"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#E8C468]" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Pradeep-B28"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#050810] border border-[#E8C468]/40 text-xs text-[#EAF0FA] hover:text-[#E8C468]"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#E8C468]" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-4">
            <div className="p-4 rounded-xl bg-[#050810] border border-[#E8C468]/20 print:border-stone-300 print:bg-stone-50">
              <p className="text-xs text-[#7C8AA6] print:text-stone-500">PLACEMENT RATE</p>
              <p className="text-2xl font-bold text-[#E8C468] print:text-amber-800">90% Rate</p>
              <p className="text-[11px] text-[#EAF0FA]/80 print:text-stone-700">Scaled from 70% at VIT</p>
            </div>

            <div className="p-4 rounded-xl bg-[#050810] border border-[#E8C468]/20 print:border-stone-300 print:bg-stone-50">
              <p className="text-xs text-[#7C8AA6] print:text-stone-500">ENGINEERS TRAINED</p>
              <p className="text-2xl font-bold text-[#E8C468] print:text-amber-800">6,000+</p>
              <p className="text-[11px] text-[#EAF0FA]/80 print:text-stone-700">Java, DSA & Aptitude</p>
            </div>

            <div className="p-4 rounded-xl bg-[#050810] border border-[#E8C468]/20 print:border-stone-300 print:bg-stone-50">
              <p className="text-xs text-[#7C8AA6] print:text-stone-500">TEAM LEADERSHIP</p>
              <p className="text-2xl font-bold text-[#E8C468] print:text-amber-800">25 Trainers</p>
              <p className="text-[11px] text-[#EAF0FA]/80 print:text-stone-700">Led L&D operations</p>
            </div>

            <div className="p-4 rounded-xl bg-[#050810] border border-[#E8C468]/20 print:border-stone-300 print:bg-stone-50">
              <p className="text-xs text-[#7C8AA6] print:text-stone-500">KSR PROGRAM</p>
              <p className="text-2xl font-bold text-[#E8C468] print:text-amber-800">55% → 80%</p>
              <p className="text-[11px] text-[#EAF0FA]/80 print:text-stone-700">25-point score boost</p>
            </div>
          </div>

          {/* Technical Skills Universe Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#E8C468] print:text-black uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>TECHNICAL SKILLS UNIVERSE ({SKILLS.length} STARS)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:grid-cols-2">
              {SKILLS.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 rounded-lg bg-[#050810]/80 border border-[#7C8AA6]/20 print:bg-white print:border-stone-300 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-xs text-[#EAF0FA] print:text-black">{skill.name}</span>
                    <span className="text-[10px] text-[#7C8AA6] block">{skill.category}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#E8C468]/10 text-[#E8C468] border border-[#E8C468]/30 font-bold">
                    {skill.expertiseLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Constellation Projects Summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#E8C468] print:text-black uppercase tracking-wider">
              CONSTELLATION PROJECTS & SYSTEMS
            </h3>
            <div className="space-y-3">
              {CONSTELLATIONS.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-[#050810]/80 border border-[#7C8AA6]/20 print:bg-white print:border-stone-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-[#EAF0FA] print:text-black">
                        {proj.title} ({proj.year})
                      </h4>
                      <p className="text-xs text-[#E8C468] print:text-amber-700 font-semibold">
                        Role: {proj.role} | Phase: {proj.phaseName}
                      </p>
                    </div>
                    {proj.isAnchor && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#E84DE8]/20 text-[#4DEBFF] border border-[#E84DE8]/40 font-bold">
                        ANCHOR
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#EAF0FA]/90 print:text-stone-700 mt-2 font-sans">
                    {proj.description}
                  </p>
                  <div className="mt-2 text-[11px] text-[#7C8AA6] flex flex-wrap gap-1">
                    <span>Tech:</span>
                    {proj.connectedSkillIds.map((s) => (
                      <span key={s} className="text-[#E8C468]">#{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-[#E8C468]/20 flex justify-between items-center text-xs text-[#7C8AA6] print:text-stone-500">
            <span>The Constellation — Pradeep B Portfolio</span>
            <span>Generated for Recruiter Evaluation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
