import { PORTFOLIO_DATA } from '../../../shared/portfolioData';

export const PROJECTS = PORTFOLIO_DATA.projects.map((proj, idx) => ({
  id: `box_00${idx + 1}`,
  boxNumber: String(idx + 1).padStart(3, '0'),
  repoCode: proj.codeName || proj.title.substring(0, 15).toUpperCase(),
  title: proj.title,
  subtitle: proj.subtitle,
  description: proj.description,
  techTags: proj.techStack,
  assetClass: idx < 2 ? 'gold' : idx < 5 ? 'silver' : 'bronze',
  securityLevel: 5 - (idx % 3),
  valuation: proj.valuation,
  complexityScore: proj.complexity * 19,
  impactScore: 90 + idx,
  teamSize: proj.role,
  role: proj.role,
  date: proj.timeframe,
  metrics: {
    zeroDowntime: proj.metrics[0]?.value || '100%',
    auditLatency: '45ms',
    schemaChecks: proj.metrics[1]?.value || '1,000+',
    impact: proj.highlights[0] || 'High Impact',
  },
  links: {
    github: proj.githubUrl,
    live: proj.liveUrl || proj.githubUrl,
  },
  achievements: proj.highlights,
  highlights: proj.subtitle,
  heistHighlight: idx % 2 === 0,
}));
