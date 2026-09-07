import React, { useState } from 'react';
import { CONSTELLATIONS } from '../data/projects';
import type { ConstellationProject } from '../data/projects';
import { SkillsConstellationGraph } from './SkillsConstellationGraph';
import { Compass, Sparkles, Navigation, Search, ChevronUp, ChevronDown, Network } from 'lucide-react';
import { audio8D } from '../utils/audio8D';

interface ConstellationIndexPanelProps {
  activeProject: ConstellationProject | null;
  onSelectProject: (project: ConstellationProject) => void;
  onSelectSkill: (skillId: string) => void;
}

export const ConstellationIndexPanel: React.FC<ConstellationIndexPanelProps> = ({
  activeProject,
  onSelectProject,
  onSelectSkill,
}) => {
  const [activeTab, setActiveTab] = useState<'constellations' | 'skills' | 'glossary'>('constellations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const categories = ['All', 'Architectural', 'Pedagogical', 'Open Source', 'AI & Tooling'];

  const filteredProjects = CONSTELLATIONS.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleProjectClick = (proj: ConstellationProject) => {
    audio8D.playConstellationWarp();
    onSelectProject(proj);
  };

  return (
    <aside
      className={`fixed right-0 bottom-0 z-30 flex flex-col space-glass border-l border-[#7C8AA6]/20 transition-all duration-300 ${
        isMobileExpanded ? 'translate-y-0 h-full w-full' : 'w-full md:w-80 lg:w-96 h-[85vh] top-24'
      } ${!isMobileExpanded ? 'max-md:translate-y-[calc(100%-54px)] max-md:h-full' : ''}`}
    >
      <button
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        className="md:hidden flex items-center justify-between px-4 py-3 bg-[#050810] border-b border-[#7C8AA6]/20 text-xs font-mono text-[#E8C468]"
      >
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#E8C468]" />
          <span>CONSTELLATION INDEX ({CONSTELLATIONS.length})</span>
        </div>
        {isMobileExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      <div className="flex-1 flex flex-col p-4 space-y-3 overflow-hidden font-mono">
        <div className="flex rounded-lg bg-[#050810] p-1 border border-[#7C8AA6]/20">
          <button
            onClick={() => setActiveTab('constellations')}
            className={`flex-1 py-1.5 px-2 rounded text-[11px] font-mono transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'constellations'
                ? 'bg-[#4DEBFF] text-[#050810] font-bold shadow'
                : 'text-[#7C8AA6] hover:text-[#EAF0FA]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>PROJECTS ({CONSTELLATIONS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex-1 py-1.5 px-2 rounded text-[11px] font-mono transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-[#4DEBFF] text-[#050810] font-bold shadow'
                : 'text-[#7C8AA6] hover:text-[#EAF0FA]'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>SKILLS 8D</span>
          </button>
        </div>

        {activeTab === 'constellations' && (
          <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7C8AA6]" />
              <input
                type="text"
                placeholder="Filter constellations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#050810] border border-[#7C8AA6]/30 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#EAF0FA] placeholder-[#7C8AA6] focus:outline-none focus:border-[#4DEBFF]"
              />
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar text-[11px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded border whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#4DEBFF] text-[#050810] font-bold border-[#4DEBFF]'
                      : 'bg-[#050810] border-[#7C8AA6]/20 text-[#7C8AA6] hover:text-[#EAF0FA]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredProjects.map((proj) => {
                const isActive = activeProject?.id === proj.id;

                return (
                  <div
                    key={proj.id}
                    onClick={() => handleProjectClick(proj)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-2 ${
                      isActive
                        ? proj.isAnchor
                          ? 'space-glass-anchor anchor-cyan-glow border-[#4DEBFF]'
                          : 'space-glass-gold star-gold-glow border-[#E8C468]'
                        : 'bg-[#050810]/70 border-[#7C8AA6]/15 hover:border-[#4DEBFF]/40 hover:bg-[#0D1526]'
                    }`}
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-1.5">
                        {proj.isAnchor && (
                          <Sparkles className="w-3.5 h-3.5 text-[#B55FE6] shrink-0" />
                        )}
                        <span className="font-bold text-xs text-[#EAF0FA] line-clamp-1">
                          {proj.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7C8AA6] line-clamp-1">
                        {proj.role} ({proj.year})
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-[#E8C468]">
                        <span>Complexity: {'★'.repeat(proj.complexity)}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(proj);
                      }}
                      className="p-1.5 rounded-lg bg-[#050810] border border-[#7C8AA6]/30 hover:border-[#4DEBFF] text-[#4DEBFF] shrink-0 transition-colors cursor-pointer"
                      title="Fly To Constellation"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <SkillsConstellationGraph onSelectSkill={onSelectSkill} />
          </div>
        )}

        {activeTab === 'glossary' && (
          <div className="flex-1 overflow-y-auto">
            <p className="text-xs text-[#7C8AA6]">Select a skill or constellation node from the graph to inspect.</p>
          </div>
        )}
      </div>
    </aside>
  );
};
