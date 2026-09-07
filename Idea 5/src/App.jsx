import { useEffect, useState } from 'react';
import { PROJECTS } from './data/projects';
import ArcadeScene from './components/canvas/ArcadeScene';
import DeveloperProfileCard from './components/ui/DeveloperProfileCard';
import GameStatsDashboard from './components/ui/GameStatsDashboard';
import ArcadeFooterDeck from './components/ui/ArcadeFooterDeck';
import GameHubModal from './components/ui/GameHubModal';
import HighScoresLeaderboard from './components/ui/HighScoresLeaderboard';
import ExportReportModal from './components/ui/ExportReportModal';
import ShareModal from './components/ui/ShareModal';
import { sounds } from './utils/soundEffects';

function getReducedMotionPreference() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareProjectTarget, setShareProjectTarget] = useState(null);
  const [isTourActive, setIsTourActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    getReducedMotionPreference
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const handleMotionPreferenceChange = (event) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener(
      'change',
      handleMotionPreferenceChange
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        handleMotionPreferenceChange
      );
    };
  }, []);

  useEffect(() => {
    if (!isTourActive) {
      return undefined;
    }

    let tourIndex = 0;

    const interval = window.setInterval(() => {
      tourIndex = (tourIndex + 1) % PROJECTS.length;
      setSelectedProject(PROJECTS[tourIndex]);
      sounds.playCartridgeInsert();
    }, 7000);

    return () => window.clearInterval(interval);
  }, [isTourActive]);

  const handleSelectProject = (project) => {
    if (isTourActive) {
      setIsTourActive(false);
    }

    setSelectedProject(project);
  };

  const handleToggleTour = () => {
    sounds.playSelect();

    if (!isTourActive) {
      setSelectedProject(PROJECTS[0]);
    }

    setIsTourActive((currentValue) => !currentValue);
  };

  const handleToggleMute = () => {
    const mutedState = sounds.toggleMute();
    setIsMuted(mutedState);
  };

  const handleToggleReducedMotion = () => {
    sounds.playSelect();
    setReducedMotion((currentValue) => !currentValue);
  };

  const handleOpenShare = (project = selectedProject) => {
    setShareProjectTarget(project);
    setIsShareOpen(true);
  };

  return (
    <main className="portfolio-shell relative h-screen w-screen overflow-hidden bg-[#07070E] text-[#F0F6FC] select-none font-mono">
      <div className="atmosphere" aria-hidden="true">
        <div className="atmosphere__orb atmosphere__orb--cyan" />
        <div className="atmosphere__orb atmosphere__orb--pink" />
        <div className="atmosphere__grid" />
      </div>

      <header className="mission-bar" aria-label="Portfolio status">
        <div className="mission-bar__brand">
          <span className="mission-bar__signal" />
          <span>PB // ARCADE NETWORK</span>
        </div>

        <div className="mission-bar__center">
          CAREER SIMULATION <span>v2.06</span>
        </div>

        <div className="mission-bar__status">
          <span />
          SYSTEMS ONLINE
        </div>
      </header>

      <div className="corner-readout corner-readout--left" aria-hidden="true">
        <span>LAT 11.0168 N</span>
        <span>LONG 76.9558 E</span>
      </div>

      <div className="corner-readout corner-readout--right" aria-hidden="true">
        <span>ENV / WEBGL</span>
        <span>RENDER / REALTIME</span>
      </div>

      <ArcadeScene
        projects={PROJECTS}
        selectedProject={selectedProject}
        onSelectProject={handleSelectProject}
        isTourActive={isTourActive}
        reducedMotion={reducedMotion}
      />

      <DeveloperProfileCard
        onOpenReport={() => setIsReportOpen(true)}
      />

      <GameStatsDashboard selectedProject={selectedProject} />

      <ArcadeFooterDeck
        projects={PROJECTS}
        selectedProject={selectedProject}
        onSelectProject={handleSelectProject}
        activePowerUps={
          selectedProject ? selectedProject.powerUps : []
        }
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        isTourActive={isTourActive}
        onToggleTour={handleToggleTour}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
      />

      {selectedProject && !isTourActive && (
        <GameHubModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenShare={handleOpenShare}
          reducedMotion={reducedMotion}
        />
      )}

      {isLeaderboardOpen && (
        <HighScoresLeaderboard
          projects={PROJECTS}
          onClose={() => setIsLeaderboardOpen(false)}
          onSelectProject={(project) => {
            setIsLeaderboardOpen(false);
            setSelectedProject(project);
          }}
        />
      )}

      {isReportOpen && (
        <ExportReportModal
          onClose={() => setIsReportOpen(false)}
        />
      )}

      {isShareOpen && (
        <ShareModal
          project={shareProjectTarget}
          onClose={() => setIsShareOpen(false)}
        />
      )}

      <div className="scanline" aria-hidden="true" />
    </main>
  );
}