import { useState } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { StarMap3D } from './components/StarMap3D';
import { NebulaSummaryPanel } from './components/NebulaSummaryPanel';
import { ConstellationIndexPanel } from './components/ConstellationIndexPanel';
import { ProjectDetailCard } from './components/ProjectDetailCard';
import { CareerTimeSlider } from './components/CareerTimeSlider';
import { MapMyCareerModal } from './components/MapMyCareerModal';
import { RecruiterFeedbackModal } from './components/RecruiterFeedbackModal';
import { CelestialInspectorModal } from './components/CelestialInspectorModal';
import { Audio8DControlBar } from './components/Audio8DControlBar';
import { CosmicRadarScanner } from './components/CosmicRadarScanner';
import { RecruiterFastTrackBar } from './components/RecruiterFastTrackBar';
import { GithubIcon, LinkedinIcon } from './components/Icons';
import { CONSTELLATIONS } from './data/projects';
import type { ConstellationProject } from './data/projects';
import { audio8D } from './utils/audio8D';
import {
  Sparkles,
  MessageSquare,
  Eye,
  EyeOff,
  FileText,
  Compass,
} from 'lucide-react';

export function App() {
  // Accessibility Hook
  const prefersReducedMotion = usePrefersReducedMotion();
  const [userReducedMotion, setUserReducedMotion] = useState<boolean | null>(null);
  const effectiveReducedMotion = userReducedMotion !== null ? userReducedMotion : prefersReducedMotion;

  // Selection & Filter States
  const [activeProject, setActiveProject] = useState<ConstellationProject | null>(CONSTELLATIONS[0]);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [activePreset, setActivePreset] = useState<string>('all');

  // Modals & Inspector States
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [inspectingProject, setInspectingProject] = useState<ConstellationProject | null>(null);

  const handleSelectProject = (project: ConstellationProject) => {
    audio8D.playConstellationWarp();
    setActiveProject(project);
    setSelectedSkillId(null);
  };

  const handleSelectSkill = (skillId: string) => {
    audio8D.playStarLockSound();
    if (selectedSkillId === skillId) {
      setSelectedSkillId(null);
    } else {
      setSelectedSkillId(skillId);
      const matchingProj = CONSTELLATIONS.find((p) => p.connectedSkillIds.includes(skillId));
      if (matchingProj) setActiveProject(matchingProj);
    }
  };

  return (
    <div className={`min-h-screen relative text-[#EAF0FA] font-mono overflow-hidden ${effectiveReducedMotion ? 'reduced-motion' : ''}`}>
      {/* 3D Interactive Cosmic Star Map Canvas */}
      <StarMap3D
        activeProject={activeProject}
        selectedSkillId={selectedSkillId}
        selectedYear={selectedYear}
        activePreset={activePreset}
        onSelectProject={handleSelectProject}
        onSelectSkill={handleSelectSkill}
        prefersReducedMotion={effectiveReducedMotion}
      />

      {/* 8D Spatial Audio Synthesizer Controls */}
      <Audio8DControlBar />

      {/* 8D Cosmic Radar & Telescope Scanner */}
      <CosmicRadarScanner
        activeProject={activeProject}
        onSelectProject={handleSelectProject}
      />

      {/* Top Main Toolbar */}
      <header className="fixed top-6 left-6 z-30 flex flex-wrap items-center gap-3 space-glass p-3 rounded-2xl border border-[#7C8AA6]/30 shadow-2xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#050810] border border-[#E8C468]/40 animate-twinkle">
            <Compass className="w-5 h-5 text-[#E8C468]" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-[#EAF0FA] leading-none">
              THE CONSTELLATION
            </h1>
            <p className="text-[10px] text-[#7C8AA6]">
              PRADEEP B · 8D INTERACTIVE TECHNICAL UNIVERSE
            </p>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-[#7C8AA6]/30 mx-1 hidden sm:block" />

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setUserReducedMotion(!effectiveReducedMotion)}
            className="px-2.5 py-1.5 rounded-lg bg-[#050810] border border-[#7C8AA6]/30 text-[#7C8AA6] hover:text-[#E8C468] transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Toggle Reduced Motion"
          >
            {effectiveReducedMotion ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-[#E8C468]" />}
            <span className="hidden md:inline">MOTION: {effectiveReducedMotion ? 'OFF' : 'ON'}</span>
          </button>

          <button
            onClick={() => setIsReportOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#4DEBFF] to-[#E8C468] text-[#050810] font-bold hover:brightness-110 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">MAP MY CAREER</span>
          </button>

          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="px-2.5 py-1.5 rounded-lg bg-[#050810] border border-[#7C8AA6]/30 text-[#EAF0FA] hover:border-[#E8C468] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#E8C468]" />
            <span className="hidden md:inline">FEEDBACK</span>
          </button>

          <a
            href="https://www.linkedin.com/in/pradeepb-2k"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg bg-[#050810] border border-[#7C8AA6]/30 text-[#EAF0FA] hover:text-[#E8C468] transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4 text-[#E8C468]" />
          </a>
          <a
            href="https://github.com/Pradeep-B28"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg bg-[#050810] border border-[#7C8AA6]/30 text-[#EAF0FA] hover:text-[#E8C468] transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Recruiter Fast-Track Bar (Top Center) */}
      <div className="fixed top-32 sm:top-24 left-6 z-20 max-w-2xl">
        <RecruiterFastTrackBar
          activePreset={activePreset}
          onSelectPreset={setActivePreset}
        />
      </div>

      {/* Skill Focus Banner (if a skill is selected) */}
      {selectedSkillId && (
        <div className="fixed top-44 left-6 z-30 space-glass-gold px-4 py-2 rounded-xl border border-[#4DEBFF]/40 text-xs flex items-center gap-3 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#4DEBFF]" />
          <span>FOCUSING SKILL: <strong className="text-[#4DEBFF]">#{selectedSkillId.toUpperCase()}</strong></span>
          <button
            onClick={() => setSelectedSkillId(null)}
            className="text-[10px] underline text-[#7C8AA6] hover:text-[#EAF0FA] cursor-pointer"
          >
            [CLEAR FOCUS]
          </button>
        </div>
      )}

      {/* Persistent Nebula Metrics Summary Panel (Top-Right) */}
      <NebulaSummaryPanel />

      {/* Constellation Index Panel (Right Side / Bottom Sheet) */}
      <ConstellationIndexPanel
        activeProject={activeProject}
        onSelectProject={handleSelectProject}
        onSelectSkill={handleSelectSkill}
      />

      {/* Active Project Detail Card Overlay (Bottom-Left) */}
      <ProjectDetailCard
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onSelectSkill={handleSelectSkill}
        onInspect={(proj) => setInspectingProject(proj)}
      />

      {/* Career Time Evolution Slider (Bottom-Right) */}
      <CareerTimeSlider
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
      />

      {/* Modals */}
      <MapMyCareerModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      <RecruiterFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      {/* 8D Celestial Relic Inspector & Interactive Sandbox Modal */}
      <CelestialInspectorModal
        project={inspectingProject}
        isOpen={!!inspectingProject}
        onClose={() => setInspectingProject(null)}
      />
    </div>
  );
}
export default App;
