import type { PlanetProject } from '../types/galaxy';
import { PORTFOLIO_DATA } from '../../../shared/portfolioData';

export interface DeveloperProfile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  education: Array<{ degree: string; institution: string; period: string }>;
  certifications: string[];
  stats: { studentsMentored: number; placementRate: string; trainersLed: number; flagshipProjects: number };
}

export const DeveloperProfileData: DeveloperProfile = {
  name: PORTFOLIO_DATA.personalInfo.name,
  title: PORTFOLIO_DATA.personalInfo.title,
  tagline: PORTFOLIO_DATA.personalInfo.tagline,
  summary: PORTFOLIO_DATA.personalInfo.summary,
  email: PORTFOLIO_DATA.socialLinks.email,
  phone: PORTFOLIO_DATA.socialLinks.phone,
  linkedin: PORTFOLIO_DATA.socialLinks.linkedin,
  github: PORTFOLIO_DATA.socialLinks.github,
  education: PORTFOLIO_DATA.education,
  certifications: PORTFOLIO_DATA.certifications,
  stats: {
    studentsMentored: parseInt(PORTFOLIO_DATA.stats.studentsMentored.replace(/[^0-9]/g, '')) || 7500,
    placementRate: PORTFOLIO_DATA.stats.placementRate,
    trainersLed: parseInt(PORTFOLIO_DATA.stats.trainerTeamSize) || 25,
    flagshipProjects: PORTFOLIO_DATA.projects.length,
  },
};

const PLANET_CONFIGS = [
  { category: 'postgresql', categoryLabel: 'PostgreSQL · Security Tooling', radius: 8.5, speed: 0.25, size: 1.45, ring: '#f87171' },
  { category: 'mern', categoryLabel: 'Full-stack · PWA · Product', radius: 12.0, speed: 0.20, size: 1.55, ring: '#67e8f9' },
  { category: 'devops', categoryLabel: 'DevOps · Reproducible Kits', radius: 15.5, speed: 0.17, size: 1.30, ring: '#60a5fa' },
  { category: '3dwebgl', categoryLabel: '3D WebGL · Creative Tech', radius: 19.0, speed: 0.14, size: 1.65, ring: '#c084fc' },
  { category: 'devops', categoryLabel: 'Developer AI · Productivity', radius: 22.5, speed: 0.12, size: 1.20, ring: '#34d399' },
  { category: 'leadership', categoryLabel: 'Curriculum · Interview Prep', radius: 26.0, speed: 0.10, size: 1.40, ring: '#fde047' },
  { category: 'leadership', categoryLabel: 'Institutional L&D Ecosystem', radius: 29.5, speed: 0.085, size: 1.50, ring: '#a78bfa' },
];

export const PLANETS: PlanetProject[] = PORTFOLIO_DATA.projects.map((proj, idx) => {
  const config = PLANET_CONFIGS[idx % PLANET_CONFIGS.length];
  return {
    id: proj.id,
    codeName: proj.codeName,
    title: proj.title,
    category: config.category,
    categoryLabel: config.categoryLabel,
    role: proj.role,
    description: proj.description,
    metrics: proj.highlights,
    techStack: proj.techStack,
    githubUrl: proj.githubUrl,
    liveUrl: proj.liveUrl || proj.githubUrl,
    orbitRadius: config.radius,
    orbitSpeed: config.speed,
    planetSize: config.size,
    planetColor: proj.color,
    ringColor: config.ring,
    moons: proj.techStack.slice(0, 4),
  };
});
