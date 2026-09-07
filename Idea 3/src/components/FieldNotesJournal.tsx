import React from 'react';
import { X, BookOpen, Clock, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { ARTIFACT_PROJECTS } from '../data/projects';

interface FieldNotesJournalProps {
  isOpen: boolean;
  onClose: () => void;
  unearthedIds: string[];
  sessionTimeMinutes: number;
}

export const FieldNotesJournal: React.FC<FieldNotesJournalProps> = ({
  isOpen,
  onClose,
  unearthedIds,
  sessionTimeMinutes,
}) => {
  if (!isOpen) return null;

  const unearthedArtifacts = ARTIFACT_PROJECTS.filter((a) => unearthedIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col dirt-glass-gold rounded-2xl overflow-hidden shadow-2xl border border-[#E8C468]/40">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#D9A86C]/20 bg-[#140A05]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#241408] border border-[#E8C468]/40">
              <BookOpen className="w-5 h-5 text-[#E8C468]" />
            </div>
            <div>
              <h3 className="text-xl font-editorial font-bold text-[#F2E8D5]">
                ARCHAEOLOGICAL FIELD NOTES & JOURNAL
              </h3>
              <p className="text-xs font-mono text-[#A88A66]">
                SITE LOG: EXPEDITION REPORT ON PRADEEP B
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#241408] text-[#A88A66] hover:text-[#F2E8D5] hover:border-[#E8C468] border border-[#D9A86C]/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#140A05] border border-[#E8C468]/20 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#A88A66]">
                <Clock className="w-3.5 h-3.5 text-[#E8C468]" />
                <span>EXPEDITION TIME</span>
              </div>
              <p className="text-xl font-mono font-bold text-[#E8C468]">{sessionTimeMinutes}m</p>
            </div>

            <div className="p-4 rounded-xl bg-[#140A05] border border-[#E8C468]/20 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#A88A66]">
                <Sparkles className="w-3.5 h-3.5 text-[#E8C468]" />
                <span>SPECIMENS UNEARTHED</span>
              </div>
              <p className="text-xl font-mono font-bold text-[#E8C468]">
                {unearthedIds.length} / {ARTIFACT_PROJECTS.length}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#140A05] border border-[#E8C468]/20 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#A88A66]">
                <Award className="w-3.5 h-3.5 text-[#E8C468]" />
                <span>CAREER DEPTH</span>
              </div>
              <p className="text-xl font-mono font-bold text-[#E8C468]">100m Bedrock</p>
            </div>
          </div>

          {/* Executive Recruiter Insights Summary */}
          <div className="p-5 rounded-xl bg-[#140A05]/90 border border-[#E8C468]/30 space-y-3">
            <h4 className="text-sm font-editorial font-bold text-[#E8C468] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>FIELD SUMMARY & CANDIDATE HIGHLIGHTS</span>
            </h4>
            <ul className="space-y-2 text-xs md:text-sm text-[#F2E8D5]/90 leading-relaxed font-sans">
              <li className="flex items-start gap-2">
                <span className="text-[#E8C468] font-bold">✓</span>
                <span>
                  <strong>Proven L&D Leadership:</strong> Managed a 25-member trainer team and drove campus placement rates from <strong>70% to 90%</strong> across 600-900 students per semester at VIT University.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E8C468] font-bold">✓</span>
                <span>
                  <strong>6,000+ Engineers Mentored:</strong> Designed and executed high-performance Java & DSA bootcamps covering JVM Memory, Concurrency, and 15+ algorithmic patterns.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E8C468] font-bold">✓</span>
                <span>
                  <strong>Full-Stack Architecture & Tools:</strong> Author of <code>Schema-Sentinel</code> (PostgreSQL AST Risk Analysis), <code>Devstarter</code> (Zero-config Devcontainers), <code>Ledger PWA</code>, and <code>GIT---viz</code> 3D WebGL skyline.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E8C468] font-bold">✓</span>
                <span>
                  <strong>MNC Recruitment Alignment:</strong> Coordinated directly with hiring criteria for TCS, Wipro, Infosys, Accenture, and Cognizant.
                </span>
              </li>
            </ul>
          </div>

          {/* Timestamped Log of Discovered Artifacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-[#A88A66] uppercase tracking-wider">
              EXCAVATED SPECIMEN CHRONOLOGY ({unearthedArtifacts.length})
            </h4>
            {unearthedArtifacts.length === 0 ? (
              <p className="text-xs font-mono text-[#A88A66] italic">
                No artifacts unearthed yet. Scroll down the shaft or brush away dirt to unearth artifacts.
              </p>
            ) : (
              <div className="space-y-2">
                {unearthedArtifacts.map((art) => (
                  <div
                    key={art.id}
                    className="p-3 rounded-lg bg-[#140A05] border border-[#D9A86C]/20 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#E8C468]" />
                      <div>
                        <p className="font-editorial font-bold text-[#F2E8D5]">{art.title}</p>
                        <p className="font-mono text-[11px] text-[#A88A66]">
                          Depth: {art.depth}m | Role: {art.role} ({art.dates})
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-[#E8C468] px-2 py-0.5 rounded bg-[#E8C468]/10">
                      {art.artifactType.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
