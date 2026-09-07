import { PORTFOLIO_DATA } from '../../../shared/portfolioData';

export interface CareerPhase {
  id: string;
  title: string;
  roleTitle: string;
  employer: string;
  client?: string;
  dates: string;
  layerDepthMin: number; // in meters
  layerDepthMax: number;
  strataName: string;
  strataColor: string;
  bgGradient: string;
  description: string;
  keyOutcome: string;
  metrics: string[];
}

export const CAREER_PHASES: CareerPhase[] = PORTFOLIO_DATA.careerPhases.map((phase) => ({
  id: phase.id,
  title: phase.title,
  roleTitle: phase.roleTitle,
  employer: PORTFOLIO_DATA.personalInfo.name,
  dates: phase.dates,
  layerDepthMin: phase.layerDepthMin,
  layerDepthMax: phase.layerDepthMax,
  strataName: `${phase.title} Strata`,
  strataColor: phase.strataColor,
  bgGradient: "linear-gradient(180deg, #2A1A0F 0%, #3B2414 100%)",
  description: phase.description,
  keyOutcome: `Mentored ${PORTFOLIO_DATA.stats.studentsMentored} students with ${PORTFOLIO_DATA.stats.placementRate} placement rate.`,
  metrics: [
    `Students Mentored: ${PORTFOLIO_DATA.stats.studentsMentored}`,
    `Placement Rate: ${PORTFOLIO_DATA.stats.placementRate}`,
    `Trainers Led: ${PORTFOLIO_DATA.stats.trainersLed}`,
    `Flagship Repos: ${PORTFOLIO_DATA.stats.flagshipProjects}`,
  ],
}));
