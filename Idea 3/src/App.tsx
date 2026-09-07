import { useState, useEffect, useCallback } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { DigShaft3D } from './components/DigShaft3D';
import { StratigraphyTimeline } from './components/StratigraphyTimeline';
import { FindsTray } from './components/FindsTray';
import { FieldNotesJournal } from './components/FieldNotesJournal';
import { ExpeditionReportModal } from './components/ExpeditionReportModal';
import { RecruiterFeedbackModal } from './components/RecruiterFeedbackModal';
import { RelicInspectorModal } from './components/RelicInspectorModal';
import { Audio8DControlBar } from './components/Audio8DControlBar';
import { RecruiterFastTrackBar } from './components/RecruiterFastTrackBar';
import { ExcavationMachineControls } from './components/ExcavationMachineControls';
import { UnearthedArtifactViewer } from './components/UnearthedArtifactViewer';
import { GithubIcon, LinkedinIcon, PickIcon } from './components/Icons';
import { CAREER_PHASES } from './data/careerPhases';
import { ARTIFACT_PROJECTS } from './data/projects';
import type { ArtifactProject } from './data/projects';
import { audio8D } from './utils/audio8D';
import {
  Sparkles,
  MessageSquare,
  Eye,
  EyeOff,
  Award,
  Star,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [userReducedMotion, setUserReducedMotion] = useState<boolean | null>(null);
  const effectiveReducedMotion = userReducedMotion !== null ? userReducedMotion : prefersReducedMotion;

  // Excavation Machine States
  const [currentDepth, setCurrentDepth] = useState(8); // Start at 8m (Topsoil)
  const [isDigging, setIsDigging] = useState(false);
  const [isAutoDigging, setIsAutoDigging] = useState(false);
  const [unearthedIds, setUnearthedIds] = useState<string[]>(['schema-sentinel']);
  const [triggerShake, setTriggerShake] = useState(false);

  const [sessionStartTime] = useState(Date.now());
  const [sessionTimeMinutes, setSessionTimeMinutes] = useState(1);

  // Modals & Inspectors
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [inspectingArtifact, setInspectingArtifact] = useState<ArtifactProject | null>(null);

  // Recruiter Preset Filter
  const [activePreset, setActivePreset] = useState<string>('all');

  // Timer tick for session log
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.round((Date.now() - sessionStartTime) / 60000);
      setSessionTimeMinutes(Math.max(elapsed, 1));
    }, 30000);
    return () => clearInterval(interval);
  }, [sessionStartTime]);

  // Primary Machine Dig Action
  const handleDigNext = useCallback(() => {
    if (isDigging) return;

    setIsDigging(true);
    setTriggerShake(true);
    audio8D.playMachineDrillSound();

    setTimeout(() => {
      setTriggerShake(false);
    }, 300);

    // Calculate next depth target and unearth specimen
    const nextArtifact = ARTIFACT_PROJECTS.find(
      (art) => art.depth > currentDepth + 1
    );

    const nextDepthTarget = nextArtifact ? nextArtifact.depth : Math.min(currentDepth + 12, 100);

    setCurrentDepth(nextDepthTarget);

    if (nextArtifact && !unearthedIds.includes(nextArtifact.id)) {
      const updated = [...unearthedIds, nextArtifact.id];
      setUnearthedIds(updated);

      if (updated.length === ARTIFACT_PROJECTS.length && !effectiveReducedMotion) {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#E8C468', '#4DEBFF', '#B9673A'],
        });
      }
    }

    setTimeout(() => {
      setIsDigging(false);
    }, 550);
  }, [currentDepth, isDigging, unearthedIds, effectiveReducedMotion]);

  // Auto-Dig Machine Sequence
  useEffect(() => {
    if (!isAutoDigging) return;
    const autoInterval = setInterval(() => {
      if (currentDepth >= 98) {
        setIsAutoDigging(false);
      } else {
        handleDigNext();
      }
    }, 1800);

    return () => clearInterval(autoInterval);
  }, [isAutoDigging, currentDepth, handleDigNext]);

  // Keyboard shortcut listener (Spacebar / ArrowDown to pull lever)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowDown') {
        // Prevent default space scroll if not in textarea/input
        const tag = (e.target as HTMLElement).tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          handleDigNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigNext]);

  const handleUnearthArtifact = (id: string) => {
    if (!unearthedIds.includes(id)) {
      setUnearthedIds([...unearthedIds, id]);
      audio8D.playUnearthChime();
    }
  };

  const handleJumpToDepth = (depth: number) => {
    audio8D.playStratumSwoosh();
    setCurrentDepth(depth);
    const matchedPhase = CAREER_PHASES.find((p) => p.layerDepthMin === depth);
    if (matchedPhase) {
      const element = document.getElementById(matchedPhase.id);
      if (element) {
        element.scrollIntoView({ behavior: effectiveReducedMotion ? 'auto' : 'smooth' });
      }
    }
  };

  const handleSelectArtifactFromTray = (id: string) => {
    handleUnearthArtifact(id);
    const art = ARTIFACT_PROJECTS.find((a) => a.id === id);
    if (art) {
      setCurrentDepth(art.depth);
      setInspectingArtifact(art);
    }
  };

  return (
    <div className={`min-h-screen relative text-[#F2E8D5] ${effectiveReducedMotion ? 'reduced-motion' : ''}`}>
      {/* 3D Excavation Machine & Subterranean Shaft Background */}
      <DigShaft3D
        currentDepth={currentDepth}
        isDigging={isDigging}
        prefersReducedMotion={effectiveReducedMotion}
        triggerShake={triggerShake}
      />

      {/* 8D Spatial Audio Controls */}
      <Audio8DControlBar />

      {/* Stratigraphy Depth Gauge Timeline on Left */}
      <StratigraphyTimeline
        currentDepth={currentDepth}
        onJumpToLayer={(phase) => handleJumpToDepth(phase.layerDepthMin)}
      />

      {/* Finds Tray & Recruiter Suite Drawer on Right */}
      <FindsTray
        unearthedIds={unearthedIds}
        onSelectArtifact={handleSelectArtifactFromTray}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenJournal={() => setIsJournalOpen(true)}
      />

      {/* Primary Excavation Site Container */}
      <div className="relative z-10 pl-14 md:pl-[420px] lg:pl-[460px] pr-4 md:pr-[340px] lg:pr-[400px] max-w-7xl mx-auto">
        <header className="pt-6 pb-6 space-y-5">
          {/* Top Bar Navigation */}
          <div className="flex flex-wrap justify-between items-center gap-4 dirt-glass px-6 py-4 rounded-2xl border border-[#D9A86C]/20 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#241408] border border-[#E8C468]/40 animate-dig-pulse">
                <PickIcon className="w-6 h-6 text-[#E8C468]" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-editorial font-bold text-[#F2E8D5] tracking-tight">
                  THE EXCAVATION MACHINE
                </h1>
                <p className="text-xs font-mono text-[#A88A66]">
                  PRADEEP B · 3D INTERACTIVE SUBTERRANEAN DRILL RIG PORTFOLIO
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <button
                onClick={() => setUserReducedMotion(!effectiveReducedMotion)}
                className="px-3 py-1.5 rounded-lg bg-[#241408] border border-[#D9A86C]/30 text-[#A88A66] hover:text-[#E8C468] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Toggle Motion"
              >
                {effectiveReducedMotion ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-[#E8C468]" />}
                <span>MOTION: {effectiveReducedMotion ? 'OFF' : 'ON'}</span>
              </button>

              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[#241408] border border-[#D9A86C]/30 text-[#F2E8D5] hover:border-[#E8C468] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#E8C468]" />
                <span>FEEDBACK</span>
              </button>

              <a
                href="https://www.linkedin.com/in/pradeepb-2k"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#241408] border border-[#D9A86C]/30 text-[#F2E8D5] hover:text-[#E8C468] transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 text-[#E8C468]" />
              </a>
              <a
                href="https://github.com/Pradeep-B28"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#241408] border border-[#D9A86C]/30 text-[#F2E8D5] hover:text-[#E8C468] transition-colors"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Executive Cockpit Hero Banner */}
          <div className="dirt-glass-gold p-6 md:p-8 rounded-3xl space-y-4 border border-[#E8C468]/40 shadow-2xl relative overflow-hidden">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8C468]/15 border border-[#E8C468]/40 text-xs font-mono text-[#E8C468]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INTERACTIVE EXCAVATION DRILL RIG · PURE SUBTERRANEAN METAPHOR</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-editorial font-bold text-[#F2E8D5] leading-tight">
                Operate the Machine to Dig Ground & Unearth <span className="text-[#E8C468] gold-text-glow">Engineering Relics</span>
              </h2>
              <p className="text-sm md:text-base text-[#F2E8D5]/90 font-sans leading-relaxed">
                Welcome to the excavation site of <strong>Pradeep B</strong> — Technical Training Lead, Java & DSA Master Trainer, and Full-Stack Architect. Operate the hydraulic drill below or press <kbd className="px-2 py-0.5 rounded bg-[#140A05] border border-[#E8C468]/40 text-[#E8C468] text-xs font-mono">SPACE</kbd> to dig through ground strata and unearth career milestones!
              </p>
            </div>

            {/* Well-Arranged Executive Key Value Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs pt-1">
              <div className="p-3 rounded-2xl bg-[#140A05]/95 border border-[#E8C468]/40 space-y-1 shadow">
                <div className="flex items-center justify-between text-[#A88A66]">
                  <span className="text-[10px] font-bold">PLACEMENT IMPACT</span>
                  <Zap className="w-3.5 h-3.5 text-[#E8C468]" />
                </div>
                <p className="text-xl font-bold text-[#E8C468]">90% Rate</p>
                <p className="text-[10px] text-[#F2E8D5]/70">Scaled from 70% at VIT</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#140A05]/95 border border-[#E8C468]/40 space-y-1 shadow">
                <div className="flex items-center justify-between text-[#A88A66]">
                  <span className="text-[10px] font-bold">STUDENTS TRAINED</span>
                  <Star className="w-3.5 h-3.5 text-[#4DEBFF]" />
                </div>
                <p className="text-xl font-bold text-[#4DEBFF]">6,000+ Mentored</p>
                <p className="text-[10px] text-[#F2E8D5]/70">Across 20+ MNC Batches</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#140A05]/95 border border-[#E8C468]/40 space-y-1 shadow">
                <div className="flex items-center justify-between text-[#A88A66]">
                  <span className="text-[10px] font-bold">TEAM LEADERSHIP</span>
                  <Award className="w-3.5 h-3.5 text-[#E8C468]" />
                </div>
                <p className="text-xl font-bold text-[#E8C468]">25 Trainers</p>
                <p className="text-[10px] text-[#F2E8D5]/70">Led L&D Operations</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#140A05]/95 border border-[#E8C468]/40 space-y-1 shadow">
                <div className="flex items-center justify-between text-[#A88A66]">
                  <span className="text-[10px] font-bold">KSR PROGRAM SCORE</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#B55FE6]" />
                </div>
                <p className="text-xl font-bold text-[#B55FE6]">55% ➔ 80%</p>
                <p className="text-[10px] text-[#F2E8D5]/70">25-Point Score Increase</p>
              </div>
            </div>
          </div>

          {/* Recruiter Fast-Track Preset Filter Bar */}
          <RecruiterFastTrackBar
            activePreset={activePreset}
            onSelectPreset={setActivePreset}
          />
        </header>

        {/* Dynamic Unearthed Specimen Viewer emerging as ground is dug */}
        <main>
          <UnearthedArtifactViewer
            currentDepth={currentDepth}
            isDigging={isDigging}
            unearthedIds={unearthedIds}
            activePreset={activePreset}
            onUnearth={handleUnearthArtifact}
            onInspect={(art) => setInspectingArtifact(art)}
            onDigNext={handleDigNext}
            prefersReducedMotion={effectiveReducedMotion}
          />
        </main>
      </div>

      {/* Interactive Hydraulic Excavation Machine Cockpit Controls */}
      <ExcavationMachineControls
        currentDepth={currentDepth}
        isDigging={isDigging}
        isAutoDigging={isAutoDigging}
        unearthedCount={unearthedIds.length}
        totalArtifacts={ARTIFACT_PROJECTS.length}
        onDigNext={handleDigNext}
        onAscendSurface={() => setCurrentDepth(0)}
        onToggleAutoDig={() => setIsAutoDigging(!isAutoDigging)}
        onJumpToDepth={handleJumpToDepth}
      />

      {/* Field Notes Journal Modal */}
      <FieldNotesJournal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        unearthedIds={unearthedIds}
        sessionTimeMinutes={sessionTimeMinutes}
      />

      {/* Expedition Report Recruiter Summary Modal */}
      <ExpeditionReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Recruiter Feedback Modal */}
      <RecruiterFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      {/* 8D Relic Inspector & Interactive Sandbox Modal */}
      <RelicInspectorModal
        artifact={inspectingArtifact}
        isOpen={!!inspectingArtifact}
        onClose={() => setInspectingArtifact(null)}
      />
    </div>
  );
}
export default App;
