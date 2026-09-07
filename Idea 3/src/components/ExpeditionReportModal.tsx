import React from 'react';
import { X, Printer, Sparkles, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { ARTIFACT_PROJECTS } from '../data/projects';
import { CAREER_PHASES } from '../data/careerPhases';

interface ExpeditionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpeditionReportModal: React.FC<ExpeditionReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col dirt-glass-gold rounded-2xl overflow-hidden shadow-2xl border border-[#E8C468]/40 print:max-h-none print:shadow-none print:border-none print:bg-white print:text-black">
        <div className="flex items-center justify-between p-6 border-b border-[#D9A86C]/20 bg-[#140A05] print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E8C468]" />
            <h3 className="text-xl font-editorial font-bold text-[#F2E8D5]">
              EXPEDITION REPORT: RECRUITER EXECUTIVE SUMMARY
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E8C468] text-[#140A05] font-mono text-xs font-bold hover:bg-[#F2E8D5] transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / SAVE AS PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#241408] text-[#A88A66] hover:text-[#F2E8D5] border border-[#D9A86C]/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#1A0E08] text-[#F2E8D5] print:bg-white print:text-black print:p-0 custom-scrollbar">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-[#E8C468]/30 gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-editorial font-bold text-[#F2E8D5] print:text-black">
                PRADEEP B
              </h1>
              <p className="text-sm font-mono text-[#E8C468] print:text-amber-800 font-semibold">
                L&D Team Lead | Java & DSA Master Trainer | Full-Stack Architect
              </p>
              <p className="text-xs text-[#A88A66] print:text-stone-600 font-sans">
                MBA Systems Management (Univ. of Madras) | BE Civil Engineering (Mepco Schlenk)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 print:text-xs">
              <a
                href="https://www.linkedin.com/in/pradeepb-2k"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#241408] border border-[#E8C468]/40 text-xs font-mono text-[#F2E8D5] hover:text-[#E8C468]"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#E8C468]" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Pradeep-B28"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#241408] border border-[#E8C468]/40 text-xs font-mono text-[#F2E8D5] hover:text-[#E8C468]"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#E8C468]" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-4">
            <div className="p-4 rounded-xl bg-[#140A05] border border-[#E8C468]/20 print:border-stone-300 print:bg-stone-50">
              <p className="text-xs font-mono text-[#A88A66] print:text-stone-500">PLACEMENT IMPACT</p>
              <p className="text-2xl font-mono font-bold text-[#E8C468] print:text-amber-800">90% Rate</p>
              <p className="text-[11px] text-[#F2E8D5]/80 print:text-stone-700">Scaled from 70% at VIT</p>
            </div>

            <div className="p-4 rounded-xl bg-[#140A05] border border-[#E8C468]/20 print:border-stone-300 print:bg-stone-50">
              <p className="text-xs font-mono text-[#A88A66] print:text-stone-500">STUDENTS MENTORED</p>
              <p className="text-2xl font-mono font-bold text-[#E8C468] print:text-amber-800">6,000+</p>
              <p className="text-[11px] text-[#F2E8D5]/80 print:text-stone-700">Java, DSA & Aptitude</p>
            </div>

            <div className="p-4 rounded-xl bg-[#140A05] border border-[#E8C468]/20 print:border-stone-300 print:bg-stone-50">
              <p className="text-xs font-mono text-[#A88A66] print:text-stone-500">TEAM LEADERSHIP</p>
              <p className="text-2xl font-mono font-bold text-[#E8C468] print:text-amber-800">25 Trainers</p>
              <p className="text-[11px] text-[#F2E8D5]/80 print:text-stone-700">Led L&D operations</p>
            </div>

            <div className="p-4 rounded-xl bg-[#140A05] border border-[#E8C468]/20 print:border-stone-300 print:bg-stone-50">
              <p className="text-xs font-mono text-[#A88A66] print:text-stone-500">KSR PROGRAM</p>
              <p className="text-2xl font-mono font-bold text-[#E8C468] print:text-amber-800">55% → 80%</p>
              <p className="text-[11px] text-[#F2E8D5]/80 print:text-stone-700">25-point score boost</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-editorial font-bold text-[#E8C468] print:text-black uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>CAREER STRATA & PROFESSIONAL ROLES</span>
            </h3>
            <div className="space-y-3">
              {CAREER_PHASES.map((phase) => (
                <div
                  key={phase.id}
                  className="p-4 rounded-xl bg-[#140A05]/80 border border-[#D9A86C]/20 print:bg-white print:border-stone-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-editorial font-bold text-sm text-[#F2E8D5] print:text-black">
                        {phase.roleTitle} — {phase.employer}
                      </h4>
                      <p className="text-xs font-mono text-[#E8C468] print:text-amber-700">
                        {phase.client ? `Client: ${phase.client} | ` : ''}{phase.dates}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#F2E8D5]/90 print:text-stone-700 mt-2 font-sans">
                    {phase.description}
                  </p>
                  <p className="text-xs font-mono text-[#A88A66] print:text-stone-600 mt-1">
                    ⚡ {phase.keyOutcome}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-editorial font-bold text-[#E8C468] print:text-black uppercase tracking-wider">
              KEY SOFTWARE ARTIFACTS & REPOSITORIES
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="border-b border-[#E8C468]/30 bg-[#241408] print:bg-stone-100 print:text-black">
                    <th className="p-2.5 font-mono font-bold text-[#E8C468] print:text-black">Artifact</th>
                    <th className="p-2.5 font-mono font-bold text-[#E8C468] print:text-black">Tech Stack</th>
                    <th className="p-2.5 font-mono font-bold text-[#E8C468] print:text-black">Impact & Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9A86C]/10 print:divide-stone-200">
                  {ARTIFACT_PROJECTS.slice(0, 6).map((art) => (
                    <tr key={art.id} className="hover:bg-[#241408]/50 print:hover:bg-none">
                      <td className="p-2.5 font-bold text-[#F2E8D5] print:text-black whitespace-nowrap">
                        {art.title}
                      </td>
                      <td className="p-2.5 font-mono text-[#A88A66] print:text-stone-600">
                        {art.techTags.slice(0, 3).join(', ')}
                      </td>
                      <td className="p-2.5 text-[#F2E8D5]/80 print:text-stone-700">
                        {art.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8C468]/20 flex justify-between items-center text-xs font-mono text-[#A88A66] print:text-stone-500">
            <span>The Excavation Site — Pradeep B Portfolio</span>
            <span>Generated for Recruiter Evaluation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
