import { PORTFOLIO_DATA } from '../../../shared/portfolioData';

export const DEVELOPER_INFO = {
  name: PORTFOLIO_DATA.personalInfo.name,
  handle: PORTFOLIO_DATA.socialLinks.github.split('/').pop() || 'Pradeep-B28',
  title: PORTFOLIO_DATA.personalInfo.title,
  tagline: PORTFOLIO_DATA.personalInfo.tagline,
  location: PORTFOLIO_DATA.personalInfo.location,
  yearsExperience: PORTFOLIO_DATA.personalInfo.yearsExperience,
  email: PORTFOLIO_DATA.socialLinks.email,
  phone: PORTFOLIO_DATA.socialLinks.phone,
  linkedin: PORTFOLIO_DATA.socialLinks.linkedin,
  github: PORTFOLIO_DATA.socialLinks.github,
  portfolio: PORTFOLIO_DATA.socialLinks.portfolioUrl,
  developerRating: PORTFOLIO_DATA.personalInfo.developerRating,

  profileStatus: 'SYSTEMS ONLINE',
  availability: 'OPEN TO HIGH-IMPACT ROLES',
  specialization: 'L&D Leadership + Full-Stack Architecture',
  currentMission: 'Building better engineers through scalable systems',
  signatureStrength: 'Turning complex technical concepts into scalable experiences',

  topSkills: PORTFOLIO_DATA.skills.slice(0, 4).map(s => ({
    name: s.name,
    level: s.level,
    category: s.category,
    color: s.color || '#00FF66',
  })),

  allTechnologies: PORTFOLIO_DATA.skills.map(s => s.name),

  stats: {
    totalGames: `${PORTFOLIO_DATA.projects.length} Games`,
    totalSkillPoints: PORTFOLIO_DATA.stats.totalSkillPoints,
    highScoreProject: 'Schema Sentinel & Ledger App',
    studentsMentored: PORTFOLIO_DATA.stats.studentsMentored,
    placementBoost: PORTFOLIO_DATA.stats.placementRate,
    trainerTeamSize: PORTFOLIO_DATA.stats.trainersLed,
    activeTechnologies: `${PORTFOLIO_DATA.skills.length}+`,
    openSourceProjects: `${PORTFOLIO_DATA.projects.length}`,
  },

  achievements: [
    {
      title: 'Placement Catalyst',
      desc: `Drove placement rates from ${PORTFOLIO_DATA.stats.placementRate} across engineering batches.`,
    },
    {
      title: `${PORTFOLIO_DATA.stats.studentsMentored} Students Mentored`,
      desc: 'Trained engineering candidates across VIT University, SIT Madurai, and KSR Institutions.',
    },
    {
      title: `${PORTFOLIO_DATA.stats.trainersLed} Team Leader`,
      desc: 'Managed multi-campus trainer squads owning technical curriculum delivery.',
    },
  ],

  education: PORTFOLIO_DATA.education,
  certifications: PORTFOLIO_DATA.certifications,
};