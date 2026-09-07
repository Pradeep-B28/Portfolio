import { PORTFOLIO_DATA } from '../../../shared/portfolioData';

export const PROJECTS = PORTFOLIO_DATA.projects.map((proj, idx) => ({
  id: proj.id,
  displayCode: `SYS-00${idx + 1}`,
  title: proj.title,
  subtitle: proj.subtitle,
  missionType: proj.category.toUpperCase(),
  status: 'OPERATIONAL',
  tagline: proj.subtitle,
  description: proj.description,
  techTags: proj.techStack,
  category: proj.category,
  color: proj.color,
  complexity: proj.complexity > 4 ? 'M' : 'S',
  complexityLabel: proj.complexity > 4 ? 'HIGH COMPLEXITY' : 'BALANCED',
  releaseYear: String(proj.releaseYear),
  role: proj.role,
  metrics: {
    performance: proj.metrics[0]?.value || 'Optimal',
    scale: proj.metrics[1]?.value || 'Scalable',
    teamSize: proj.role,
  },
  achievements: proj.highlights,
  links: {
    live: proj.liveUrl || proj.githubUrl,
    github: proj.githubUrl,
  },
  screenshots: [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
  ],
  powerUps: proj.techStack,
  gameSnippet: proj.codeSnippet || '// System Cartridge Executable',
  score: 95000 - idx * 5000,
}));