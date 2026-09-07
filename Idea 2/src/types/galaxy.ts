export type GalaxyTheme = 'cyber' | 'emerald' | 'amber' | 'violet';

export interface PlanetProject {
  id: string;
  codeName: string;
  title: string;
  category: 'postgresql' | 'mern' | '3dwebgl' | 'devops' | 'leadership';
  categoryLabel: string;
  role: string;
  description: string;
  metrics: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  orbitRadius: number;
  orbitSpeed: number;
  planetSize: number;
  planetColor: string;
  ringColor?: string;
  moons: string[];
}

export interface ThemeColors {
  bg: string;
  sunColor: string;
  sunCorona: string;
  orbitDefault: string;
  orbitActive: string;
  textActive: string;
  cardBg: string;
  lightPrimary: string;
  lightSecondary: string;
}

export const GALAXY_THEMES: Record<GalaxyTheme, ThemeColors> = {
  cyber: {
    bg: '#070a12',
    sunColor: '#67e8f9',
    sunCorona: '#b7a2ff',
    orbitDefault: '#385b83',
    orbitActive: '#67e8f9',
    textActive: '#b7f3ff',
    cardBg: 'rgba(14, 21, 36, 0.78)',
    lightPrimary: '#67e8f9',
    lightSecondary: '#b7a2ff',
  },
  emerald: {
    bg: '#06110f',
    sunColor: '#6ee7b7',
    sunCorona: '#67e8f9',
    orbitDefault: '#255f58',
    orbitActive: '#6ee7b7',
    textActive: '#a7f3d0',
    cardBg: 'rgba(10, 29, 27, 0.8)',
    lightPrimary: '#6ee7b7',
    lightSecondary: '#67e8f9',
  },
  amber: {
    bg: '#120c08',
    sunColor: '#fbbf24',
    sunCorona: '#fb923c',
    orbitDefault: '#76522b',
    orbitActive: '#fbbf24',
    textActive: '#fde68a',
    cardBg: 'rgba(38, 25, 14, 0.8)',
    lightPrimary: '#fbbf24',
    lightSecondary: '#fb923c',
  },
  violet: {
    bg: '#0d0818',
    sunColor: '#c4b5fd',
    sunCorona: '#f0abfc',
    orbitDefault: '#5d407d',
    orbitActive: '#c4b5fd',
    textActive: '#e9d5ff',
    cardBg: 'rgba(28, 17, 46, 0.8)',
    lightPrimary: '#c4b5fd',
    lightSecondary: '#f0abfc',
  },
};
