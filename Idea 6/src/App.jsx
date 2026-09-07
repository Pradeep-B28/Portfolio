import React, { useCallback, useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { PROJECTS } from './data/projects';
import { DEVELOPER } from './data/developer';
import { useVaultProgress } from './hooks/useVaultProgress';
import { VaultScene } from './components/canvas/VaultScene';
import { NetWorthTicker } from './components/ui/NetWorthTicker';
import { CSOProfileCard } from './components/ui/CSOProfileCard';
import { AssetManagerDashboard } from './components/ui/AssetManagerDashboard';
import { SecurityHUD } from './components/ui/SecurityHUD';
import { VaultDepthHUD } from './components/ui/VaultDepthHUD';
import { CenterDoorControl } from './components/ui/CenterDoorControl';
import { DepositBoxModal } from './components/ui/DepositBoxModal';
import { SkillMatrixModal } from './components/ui/SkillMatrixModal';
import { AuditTrailModal } from './components/ui/AuditTrailModal';
import { VaultTourController } from './components/ui/VaultTourController';
import { BankTickerBar } from './components/ui/BankTickerBar';
import { generateRecruiterPDFReport } from './utils/pdfExport';
import { vaultSounds } from './utils/vaultSounds';

export default function App() {
  const progress = useVaultProgress();
  const [selectedBox, setSelectedBox] = useState(null);
  const [laserActive, setLaserActive] = useState(true);
  const [soundMuted, setSoundMuted] = useState(false);
  const [lockdownMode, setLockdownMode] = useState(false);
  const [highVisibilityMode, setHighVisibilityMode] = useState(true);
  const [showSkillMatrix, setShowSkillMatrix] = useState(false);
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);

  const doorState = useMemo(() => ({
    door1Open: progress.chamberStatus[0]?.open ?? false,
    door2Open: progress.chamberStatus[1]?.open ?? false,
    door3Open: progress.chamberStatus[2]?.open ?? false,
    door4Open: progress.chamberStatus[3]?.open ?? false,
  }), [progress.chamberStatus]);

  const unlockedValuation = useMemo(() => PROJECTS.reduce((total, project) => progress.inspectedRepositoryIds.includes(project.id) ? total + project.valuation : total, 0), [progress.inspectedRepositoryIds]);

  const selectRepository = useCallback((project) => {
    progress.inspectRepository(project.id);
    setSelectedBox(project);
    setAuditLogs((previous) => [{ boxNumber: project.boxNumber, title: project.title, time: new Date().toLocaleTimeString() }, ...previous]);
  }, [progress]);

  const openCurrentDoor = useCallback(() => {
    vaultSounds.playDoor1Unlock();
    progress.openChamber(progress.currentChamberId);
  }, [progress]);

  const proceedToNextDoor = useCallback(() => {
    if (progress.currentChamberId < 4) {
      vaultSounds.playDoor2Unlock();
      progress.openChamber(progress.currentChamberId + 1);
    }
  }, [progress]);

  const resetExperience = useCallback(() => {
    progress.resetProgress();
    setSelectedBox(null);
    setAuditLogs([]);
    setTourActive(false);
  }, [progress]);

  return (
    <div className="relative h-screen w-screen select-none overflow-hidden bg-[#0A0E17] font-sans">
      <div className="fixed inset-x-0 top-0 z-40"><BankTickerBar lockdownMode={lockdownMode} /></div>
      <VaultScene projects={PROJECTS} unlockedBoxIds={progress.inspectedRepositoryIds} onSelectBox={selectRepository} laserActive={laserActive} focusedBox={selectedBox} {...doorState} onUnlockDoor1={() => progress.openChamber(1)} onUnlockDoor2={() => progress.openChamber(2)} onUnlockDoor3={() => progress.openChamber(3)} onUnlockDoor4={() => progress.openChamber(4)} currentLevel={progress.currentChamberId} lockdownMode={lockdownMode} highVisibilityMode={highVisibilityMode} />
      <div className="scanline-overlay pointer-events-none absolute inset-0 z-10 opacity-15" />
      <div className="pointer-events-auto fixed left-6 top-12 z-20 hidden max-w-xs xl:block"><CSOProfileCard clearanceLevel={DEVELOPER.clearanceLevel} /></div>
      <div className="pointer-events-auto fixed right-6 top-12 z-20 hidden max-w-xs xl:block"><NetWorthTicker totalValuation={DEVELOPER.netWorthValuation} unlockedValuation={unlockedValuation} /></div>
      <header className="pointer-events-auto fixed left-1/2 top-8 z-20 flex w-full max-w-xl sm:max-w-2xl -translate-x-1/2 flex-col items-center gap-2 px-4"><SecurityHUD laserActive={laserActive} onToggleLaser={() => { vaultSounds.playLaserBeep(); setLaserActive((value) => !value); }} soundMuted={soundMuted} onToggleSound={() => setSoundMuted(vaultSounds.toggleMute())} doorOpen={progress.currentChamber?.open ?? false} onToggleDoor={openCurrentDoor} lockdownMode={lockdownMode} onToggleLockdown={() => { vaultSounds.playLaserBeep(); setLockdownMode((value) => !value); }} highVisibilityMode={highVisibilityMode} onToggleHighVisibility={() => { vaultSounds.playTumblerClick(); setHighVisibilityMode((value) => !value); }} /><VaultDepthHUD chambers={progress.chamberStatus} currentChamberId={progress.currentChamberId} onOpenChamber={progress.navigateToChamber} /></header>
      <main className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center px-4 pb-12 pt-32"><CenterDoorControl chamber={progress.currentChamber} onOpenDoor={openCurrentDoor} onProceed={proceedToNextDoor} /></main>
      <VaultTourController active={tourActive} onSelectBox={selectRepository} onEndTour={() => { setTourActive(false); setSelectedBox(null); }} />
      <footer className="pointer-events-auto fixed bottom-3 left-1/2 z-20 flex w-full max-w-5xl -translate-x-1/2 items-center gap-2 px-4"><div className="min-w-0 flex-1"><AssetManagerDashboard totalAssets={PROJECTS.length} unlockedCount={progress.inspectedCount} securityPoints={DEVELOPER.securityPoints + progress.inspectedCount * 1500} onOpenSkillMatrix={() => setShowSkillMatrix(true)} onOpenAuditTrail={() => setShowAuditTrail(true)} onOpenExportReport={() => generateRecruiterPDFReport(progress.inspectedRepositoryIds)} onStartTour={() => setTourActive(true)} /></div><button type="button" onClick={resetExperience} title="Reset vault experience" aria-label="Reset vault experience" className="rounded-xl border border-[#FF0040]/50 bg-[#0B0F17]/95 p-3 text-[#FF0040] shadow-2xl transition hover:bg-[#FF0040]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><RotateCcw className="h-4 w-4" /></button></footer>
      {selectedBox && <DepositBoxModal project={selectedBox} onClose={() => setSelectedBox(null)} />}
      {showSkillMatrix && <SkillMatrixModal onClose={() => setShowSkillMatrix(false)} />}
      {showAuditTrail && <AuditTrailModal auditLogs={auditLogs} unlockedCount={progress.inspectedCount} totalAssets={PROJECTS.length} onClose={() => setShowAuditTrail(false)} />}
    </div>
  );
}
