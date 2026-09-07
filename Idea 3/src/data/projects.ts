import { PORTFOLIO_DATA } from '../../../shared/portfolioData';

export interface ArtifactProject {
  id: string;
  title: string;
  artifactType: 'relic' | 'pottery_sherd' | 'fossilized_scroll' | 'stele' | 'bedrock_stone';
  phaseId: string;
  depth: number; // 0 to 100
  dates: string;
  role: string;
  techTags: string[];
  description: string;
  impactMetrics: string[];
  codeSnippet?: string;
  githubUrl?: string;
  liveUrl?: string;
  impactCategory: 'Architectural' | 'Open Source' | 'Pedagogical' | 'AI & Tooling';
}

const ARTIFACT_TYPES: Array<'relic' | 'pottery_sherd' | 'fossilized_scroll' | 'stele' | 'bedrock_stone'> = [
  'relic', 'relic', 'pottery_sherd', 'pottery_sherd', 'fossilized_scroll', 'stele', 'stele'
];

export const ARTIFACT_PROJECTS: ArtifactProject[] = PORTFOLIO_DATA.projects.map((proj, idx) => ({
  id: proj.id,
  title: proj.title,
  artifactType: ARTIFACT_TYPES[idx % ARTIFACT_TYPES.length],
  phaseId: `layer-${Math.floor(idx / 2) + 1}`,
  depth: proj.depth || (idx * 14 + 8),
  dates: proj.timeframe,
  role: proj.role,
  techTags: proj.techStack,
  description: proj.description,
  impactMetrics: proj.highlights,
  codeSnippet: proj.codeSnippet,
  githubUrl: proj.githubUrl,
  liveUrl: proj.liveUrl,
  impactCategory: proj.category === 'AI & Tooling' ? 'AI & Tooling' : proj.category === 'Academic Training' ? 'Pedagogical' : proj.category === 'Full-Stack & 3D' ? 'Architectural' : 'Open Source',
}));
