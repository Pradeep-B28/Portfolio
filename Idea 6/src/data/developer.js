import { PORTFOLIO_DATA } from '../../../shared/portfolioData';

export const DEVELOPER = {
  name: PORTFOLIO_DATA.personalInfo.name,
  title: PORTFOLIO_DATA.personalInfo.title,
  role: PORTFOLIO_DATA.personalInfo.tagline,
  clearanceLevel: 5,
  securityPoints: PORTFOLIO_DATA.personalInfo.securityPoints,
  netWorthValuation: PORTFOLIO_DATA.personalInfo.netWorthValuation,
  yearsOfExperience: PORTFOLIO_DATA.personalInfo.yearsExperience,
  email: PORTFOLIO_DATA.socialLinks.email,
  phone: PORTFOLIO_DATA.socialLinks.phone,
  location: PORTFOLIO_DATA.personalInfo.location,
  github: PORTFOLIO_DATA.socialLinks.github,
  linkedin: PORTFOLIO_DATA.socialLinks.linkedin,
  summary: PORTFOLIO_DATA.personalInfo.summary,
  topSkills: PORTFOLIO_DATA.skills.slice(0, 5).map(s => ({
    name: s.name,
    level: s.level,
  })),
  stats: {
    studentsMentored: PORTFOLIO_DATA.stats.studentsMentored,
    vitPlacementBoost: PORTFOLIO_DATA.stats.placementRate,
    teamSizeLed: PORTFOLIO_DATA.stats.trainersLed,
    githubProjects: `${PORTFOLIO_DATA.projects.length} Flagship Repositories`,
    bankVisuals: `${PORTFOLIO_DATA.projects.length} Vault Chambers`,
  },
  education: PORTFOLIO_DATA.education,
  certifications: PORTFOLIO_DATA.certifications,
  experience: PORTFOLIO_DATA.careerPhases.map(p => ({
    role: p.roleTitle,
    company: p.title,
    period: p.dates,
  })),
  skillsRadar: [
    { category: "Frontend", score: 96 },
    { category: "Backend", score: 97 },
    { category: "DevOps & Cloud", score: 90 },
    { category: "System Design", score: 96 },
    { category: "3D & Graphics", score: 94 },
    { category: "Security & FinTech", score: 95 },
  ],
};
