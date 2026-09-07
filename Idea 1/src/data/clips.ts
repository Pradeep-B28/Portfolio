import { PORTFOLIO_DATA } from '../../../shared/portfolioData';

export interface PortfolioClip {
  id: string;
  title: string;
  subtitle: string;
  timeframe: string;
  takeType: 'GOOD TAKE' | 'OUTTAKE';
  category: 'L&D Leadership' | 'Full-Stack & 3D' | 'Academic Training' | 'Systems & Education' | 'AI & Tooling';
  description: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  techStack: string[];
  links: { label: string; url: string }[];
  reelColor: string;
  filmStripPattern: string;
}

export interface DeveloperProfile {
  name: string;
  title: string;
  tagline: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolioUrl: string;
  summary: string;
  education: Array<{ degree: string; institution: string; period: string }>;
  certifications: string[];
  stats: { studentsMentored: string; placementRate: string; trainersLed: string; flagshipProjects: string };
}

export const DEVELOPER_PROFILE: DeveloperProfile = {
  name: PORTFOLIO_DATA.personalInfo.name,
  title: PORTFOLIO_DATA.personalInfo.title,
  tagline: PORTFOLIO_DATA.personalInfo.tagline,
  phone: PORTFOLIO_DATA.socialLinks.phone,
  email: PORTFOLIO_DATA.socialLinks.email,
  linkedin: PORTFOLIO_DATA.socialLinks.linkedin,
  github: PORTFOLIO_DATA.socialLinks.github,
  portfolioUrl: PORTFOLIO_DATA.socialLinks.portfolioUrl,
  summary: PORTFOLIO_DATA.personalInfo.summary,
  education: PORTFOLIO_DATA.education,
  certifications: PORTFOLIO_DATA.certifications,
  stats: {
    studentsMentored: PORTFOLIO_DATA.stats.studentsMentored,
    placementRate: PORTFOLIO_DATA.stats.placementRate,
    trainersLed: PORTFOLIO_DATA.stats.trainersLed,
    flagshipProjects: PORTFOLIO_DATA.stats.flagshipProjects,
  },
};

export const PORTFOLIO_CLIPS: PortfolioClip[] = PORTFOLIO_DATA.projects.map((proj, idx) => ({
  id: `clip-${proj.id}`,
  title: proj.title,
  subtitle: proj.subtitle,
  timeframe: proj.timeframe,
  takeType: proj.takeType,
  category: proj.category as any,
  description: proj.description,
  highlights: proj.highlights,
  metrics: proj.metrics,
  techStack: proj.techStack,
  links: [
    { label: `${proj.title.split(' ')[0]} Repo`, url: proj.githubUrl },
    ...(proj.liveUrl && proj.liveUrl !== proj.githubUrl ? [{ label: 'Live App', url: proj.liveUrl }] : []),
  ],
  reelColor: proj.reelColor,
  filmStripPattern: `REEL-0${idx + 1}-${proj.id.toUpperCase()}`,
}));
