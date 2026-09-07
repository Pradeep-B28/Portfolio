import { PORTFOLIO_DATA } from '../../../shared/portfolioData';

export interface SkillDomain {
  domainName: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: 'Master' | 'Advanced' | 'Proficient';
    proficiencyPct: number;
    highlight: string;
  }[];
}

export const SKILLS_MATRIX: SkillDomain[] = [
  {
    domainName: "Languages & Core Development",
    description: "Deep roots in JVM internals, multithreaded concurrency, relational databases, and high-performance algorithms.",
    iconName: "Cpu",
    skills: PORTFOLIO_DATA.skills.filter(s => s.category === 'Languages & Core').map(s => ({
      name: s.name,
      level: s.expertiseLevel === 'Expert' ? 'Master' : s.expertiseLevel === 'Senior' ? 'Advanced' : 'Proficient',
      proficiencyPct: s.level,
      highlight: `${s.experienceYears} Experience · ${s.expertiseLevel}`,
    })),
  },
  {
    domainName: "Frontend & 3D WebGL",
    description: "Building intuition-first visualizers, 3D interactive graphics, and responsive progressive web apps.",
    iconName: "Boxes",
    skills: PORTFOLIO_DATA.skills.filter(s => s.category === 'Frontend & 3D').map(s => ({
      name: s.name,
      level: s.expertiseLevel === 'Expert' ? 'Master' : s.expertiseLevel === 'Senior' ? 'Advanced' : 'Proficient',
      proficiencyPct: s.level,
      highlight: `${s.experienceYears} Experience · ${s.expertiseLevel}`,
    })),
  },
  {
    domainName: "Backend & Databases",
    description: "Architecting resilient REST APIs, microservices, relational and NoSQL database models.",
    iconName: "Terminal",
    skills: PORTFOLIO_DATA.skills.filter(s => s.category === 'Backend & Databases').map(s => ({
      name: s.name,
      level: s.expertiseLevel === 'Expert' ? 'Master' : s.expertiseLevel === 'Senior' ? 'Advanced' : 'Proficient',
      proficiencyPct: s.level,
      highlight: `${s.experienceYears} Experience · ${s.expertiseLevel}`,
    })),
  },
  {
    domainName: "DevOps, AI & Leadership",
    description: "Containerization pipelines, AI inference integration, and leading technical training teams.",
    iconName: "GraduationCap",
    skills: PORTFOLIO_DATA.skills.filter(s => s.category === 'DevOps & Tooling' || s.category === 'AI & LLM').map(s => ({
      name: s.name,
      level: s.expertiseLevel === 'Expert' ? 'Master' : s.expertiseLevel === 'Senior' ? 'Advanced' : 'Proficient',
      proficiencyPct: s.level,
      highlight: `${s.experienceYears} Experience · ${s.expertiseLevel}`,
    })),
  },
];
