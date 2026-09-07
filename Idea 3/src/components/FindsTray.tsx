import React, { useState } from 'react';
import { ARTIFACT_PROJECTS } from '../data/projects';
import { SkillsMatrixHeatmap } from './SkillsMatrixHeatmap';
import { Search, Compass, Flame, ChevronUp, ChevronDown, CheckCircle2, Lock } from 'lucide-react';

interface FindsTrayProps {
  unearthedIds: string[];
  onSelectArtifact: (id: string) => void;
  onOpenReport: () => void;
  onOpenJournal: () => void;
}

export const FindsTray: React.FC<FindsTrayProps> = ({
  unearthedIds,
  onSelectArtifact,
  onOpenReport,
  onOpenJournal,
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'skills'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const totalArtifacts = ARTIFACT_PROJECTS.length;
  const unearthedCount = unearthedIds.length;
  const depthScore = Math.round((unearthedCount / totalArtifacts) * 100);

  const categories = ['All', 'Architectural', 'Pedagogical', 'Open Source', 'AI & Tooling'];

  const filteredArtifacts = ARTIFACT_PROJECTS.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.techTags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || art.impactCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <aside
      className={`fixed right-0 top-0 bottom-0 z-30 flex flex-col dirt-glass border-l border-[#D9A86C]/20 transition-all duration-300 ${
        isMobileExpanded ? 'translate-y-0 h-full w-full' : 'w-full md:w-80 lg:w-96'
      } ${
        !isMobileExpanded ? 'max-md:translate-y-[calc(100%-60px)] max-md:h-full' : ''
      }`}
    >
      <button
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        className="md:hidden flex items-center justify-between px-6 py-3 bg-[#140A05] border-b border-[#D9A86C]/20 text-xs font-mono text-[#E8C468]"
      >
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#E8C468]" />
          <span>FINDS TRAY & RECRUITER SUITE ({unearthedCount}/{totalArtifacts})</span>
        </div>
        {isMobileExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      <div className="flex-1 flex flex-col overflow-hidden p-4 md:p-6 space-y-4">
        <div className="dirt-glass-gold p-4 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#A88A66] uppercase tracking-wider font-semibold">
              UNEARTH DEPTH SCORE
            </span>
            <span className="text-[#E8C468] font-bold text-sm">{depthScore}%</span>
          </div>

          <div className="w-full h-3 bg-[#140A05] rounded-full overflow-hidden border border-[#E8C468]/30 relative">
            <div
              className="h-full bg-gradient-to-r from-[#B9673A] via-[#D9A86C] to-[#E8C468] transition-all duration-700 rounded-full"
              style={{ width: `${depthScore}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-[#F2E8D5]/80 pt-1">
            <span>{unearthedCount} OF {totalArtifacts} SPECIMENS DISCOVERED</span>
            <span className="text-[#E8C468]">CAREER LAYER {depthScore > 75 ? 'V' : depthScore > 50 ? 'III' : 'I'}</span>
          </div>
        </div>

        <div className="flex rounded-lg bg-[#140A05] p-1 border border-[#D9A86C]/20">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 py-1.5 px-3 rounded-md text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'inventory'
                ? 'bg-[#E8C468] text-[#140A05] font-bold shadow'
                : 'text-[#A88A66] hover:text-[#F2E8D5]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>FINDINGS ({unearthedCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex-1 py-1.5 px-3 rounded-md text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'skills'
                ? 'bg-[#E8C468] text-[#140A05] font-bold shadow'
                : 'text-[#A88A66] hover:text-[#F2E8D5]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>SKILLS MATRIX</span>
          </button>
        </div>

        {activeTab === 'inventory' && (
          <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A88A66]" />
                <input
                  type="text"
                  placeholder="Filter by tech or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#140A05] border border-[#D9A86C]/20 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#F2E8D5] placeholder-[#A88A66] focus:outline-none focus:border-[#E8C468]"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar text-[11px] font-mono">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-md whitespace-nowrap border transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#B9673A] border-[#E8C468] text-[#F2E8D5] font-bold'
                        : 'bg-[#241408] border-[#D9A86C]/15 text-[#A88A66] hover:text-[#F2E8D5]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredArtifacts.map((art) => {
                const isFound = unearthedIds.includes(art.id);
                return (
                  <button
                    key={art.id}
                    onClick={() => onSelectArtifact(art.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start justify-between gap-3 ${
                      isFound
                        ? 'bg-[#241408]/80 border-[#E8C468]/30 hover:border-[#E8C468] hover:bg-[#2A1A0F]'
                        : 'bg-[#140A05]/50 border-[#D9A86C]/10 opacity-60 hover:opacity-80'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#E8C468] px-1.5 py-0.5 rounded bg-[#E8C468]/10 border border-[#E8C468]/30">
                          {art.depth}m
                        </span>
                        <span className="text-xs font-editorial font-bold text-[#F2E8D5] line-clamp-1">
                          {art.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A88A66] line-clamp-1 font-mono">
                        {art.techTags.slice(0, 3).join(', ')}
                      </p>
                    </div>

                    <div className="mt-1">
                      {isFound ? (
                        <CheckCircle2 className="w-4 h-4 text-[#E8C468]" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-[#A88A66]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <SkillsMatrixHeatmap />
          </div>
        )}

        <div className="pt-3 border-t border-[#D9A86C]/20 flex flex-col gap-2">
          <button
            onClick={onOpenReport}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E8C468] to-[#D9A86C] text-[#140A05] font-mono text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <span>GENERATE EXPEDITION REPORT (PDF)</span>
          </button>
          
          <button
            onClick={onOpenJournal}
            className="w-full py-2 px-3 rounded-xl bg-[#241408] border border-[#D9A86C]/30 text-[#F2E8D5] font-mono text-xs hover:border-[#E8C468] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>FIELD NOTES JOURNAL</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
