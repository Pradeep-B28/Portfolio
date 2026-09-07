import { PORTFOLIO_DATA } from '../../../shared/portfolioData';

export type ExpertiseLevel = 'Junior' | 'Senior' | 'Expert';

export interface SkillStar {
  id: string;
  name: string;
  category: 'Backend & Systems' | 'Frontend & Graphics' | 'DevOps & AI' | 'L&D & Leadership';
  expertiseLevel: ExpertiseLevel;
  position: [number, number, number]; // 3D coordinates in space map
  magnitudeSize: number; // 0.8, 1.0, 1.3
  glowIntensity: number; // 0.7 to 1.0
  projectsUsed: string[];
}

const POSITIONS: [number, number, number][] = [
  [-10, 4, 2], [-12, -2, 4], [-6, 8, -4], [-8, 12, -2],
  [8, 4, 6], [12, 8, 2], [10, -4, 4], [6, -8, 2],
  [-2, 6, 6], [0, 10, 8], [4, 12, -4], [-4, -10, 6]
];

export const SKILLS: SkillStar[] = PORTFOLIO_DATA.skills.map((skill, idx) => ({
  id: skill.id.toLowerCase().replace(/[^a-z0-9]/g, ''),
  name: skill.name,
  category: skill.category === 'Languages & Core' || skill.category === 'Backend & Databases'
    ? 'Backend & Systems'
    : skill.category === 'Frontend & 3D'
    ? 'Frontend & Graphics'
    : skill.category === 'AI & LLM' || skill.category === 'DevOps & Tooling'
    ? 'DevOps & AI'
    : 'L&D & Leadership',
  expertiseLevel: skill.expertiseLevel as ExpertiseLevel,
  position: POSITIONS[idx % POSITIONS.length],
  magnitudeSize: skill.level > 90 ? 1.4 : skill.level > 85 ? 1.2 : 1.0,
  glowIntensity: skill.level / 100,
  projectsUsed: PORTFOLIO_DATA.projects.map(p => p.id),
}));
