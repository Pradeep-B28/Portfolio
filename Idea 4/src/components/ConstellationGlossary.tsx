import React, { useState } from 'react';
import { SKILLS } from '../data/skills';
import { Search, Star } from 'lucide-react';

interface ConstellationGlossaryProps {
  onSelectSkill: (skillId: string) => void;
}

export const ConstellationGlossary: React.FC<ConstellationGlossaryProps> = ({ onSelectSkill }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Backend & Systems', 'Frontend & Graphics', 'DevOps & AI', 'L&D & Leadership'];

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7C8AA6]" />
        <input
          type="text"
          placeholder="Filter skills glossary..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#050810] border border-[#7C8AA6]/30 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#EAF0FA] placeholder-[#7C8AA6] focus:outline-none focus:border-[#E8C468]"
        />
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar text-[11px]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2 py-0.5 rounded border whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#E8C468] text-[#050810] font-bold border-[#E8C468]'
                : 'bg-[#0D1526] text-[#7C8AA6] border-[#7C8AA6]/20 hover:text-[#EAF0FA]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
        {filteredSkills.map((skill) => {
          const projectCount = skill.projectsUsed.length;

          return (
            <div
              key={skill.id}
              onClick={() => onSelectSkill(skill.id)}
              className="p-2.5 rounded-lg bg-[#050810]/70 border border-[#7C8AA6]/15 hover:border-[#E8C468]/50 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-[#E8C468] fill-[#E8C468]" />
                  <span className="font-bold text-[#EAF0FA] group-hover:text-[#E8C468]">
                    {skill.name}
                  </span>
                </div>
                <span className="text-[10px] text-[#7C8AA6] block">{skill.category}</span>
              </div>

              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-[#E8C468]/10 text-[#E8C468] border border-[#E8C468]/30 text-[10px] font-bold">
                  {skill.expertiseLevel} ({projectCount} projects)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
