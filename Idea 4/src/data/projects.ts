import { PORTFOLIO_DATA } from '../../../shared/portfolioData';

export interface ConstellationProject {
  id: string;
  title: string;
  isAnchor: boolean; // Anchor projects receive Magenta/Cyan highlight gradient
  role: string;
  year: number;
  dates: string;
  phaseName: string;
  complexity: number; // 1 to 5 (line thickness & glow)
  description: string;
  impactMetrics: string[];
  connectedSkillIds: string[];
  codeSnippet?: string;
  githubUrl?: string;
  liveUrl?: string;
  category: 'Architectural' | 'Open Source' | 'Pedagogical' | 'AI & Tooling';
}

export const CONSTELLATIONS: ConstellationProject[] = PORTFOLIO_DATA.projects.map((proj) => ({
  id: proj.id,
  title: proj.title,
  isAnchor: proj.isAnchor ?? true,
  role: proj.role,
  year: proj.releaseYear,
  dates: proj.timeframe,
  phaseName: proj.category,
  complexity: proj.complexity,
  description: proj.description,
  impactMetrics: proj.highlights,
  connectedSkillIds: proj.techStack.map(t => t.toLowerCase().replace(/[^a-z0-9]/g, '')),
  codeSnippet: proj.codeSnippet,
  githubUrl: proj.githubUrl,
  liveUrl: proj.liveUrl,
  category: proj.category === 'AI & Tooling' ? 'AI & Tooling' : proj.category === 'Academic Training' ? 'Pedagogical' : proj.category === 'Full-Stack & 3D' ? 'Architectural' : 'Open Source',
}));
