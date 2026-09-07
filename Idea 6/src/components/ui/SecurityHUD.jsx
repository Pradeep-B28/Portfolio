import React from 'react';
import { Volume2, VolumeX, Zap, Lock, Unlock, AlertOctagon, Sun, Moon } from 'lucide-react';

export function SecurityHUD({
  laserActive,
  onToggleLaser,
  soundMuted,
  onToggleSound,
  doorOpen,
  onToggleDoor,
  lockdownMode,
  onToggleLockdown,
  highVisibilityMode,
  onToggleHighVisibility
}) {
  return (
    <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
      {/* Active Surveillance Banner */}
      <div className="glass-panel-dark px-3 py-1.5 rounded-lg border border-[#FF0040]/40 flex items-center gap-2 text-xs font-mono text-[#FF0040]">
        <span className="w-2 h-2 rounded-full bg-[#FF0040] animate-ping"></span>
        <span className="font-bold tracking-wider hidden sm:inline">ACTIVE SURVEILLANCE</span>
        <span className="text-[10px] text-[#CBD5E0]">CAM 01-04 ONLINE</span>
      </div>

      {/* High-Visibility Bright Mode Toggle */}
      <button
        onClick={onToggleHighVisibility}
        className={`px-3 py-1.5 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
          highVisibilityMode
            ? 'bg-[#FFD700] text-[#0A0D14] border-white font-extrabold shadow-lg shadow-[#FFD700]/40'
            : 'bg-[#FFD700]/20 border-[#FFD700]/60 text-[#FFD700] hover:bg-[#FFD700]/40'
        }`}
        title="Toggle High-Visibility Bright Scene Lighting Mode"
      >
        {highVisibilityMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        <span>{highVisibilityMode ? 'LIGHT: BRIGHT' : 'LIGHT: HIGH VISIBILITY'}</span>
      </button>

      {/* Emergency Bank Lockdown Button */}
      <button
        onClick={onToggleLockdown}
        className={`px-3 py-1.5 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
          lockdownMode
            ? 'bg-[#FF0040] border-white text-white font-extrabold animate-pulse shadow-lg shadow-[#FF0040]/50'
            : 'bg-[#FF0040]/15 border-[#FF0040]/40 text-[#FF0040] hover:bg-[#FF0040]/30'
        }`}
        title="Trigger Emergency Central Bank Vault Lockdown Mode"
      >
        <AlertOctagon className="w-3.5 h-3.5" />
        <span>{lockdownMode ? 'LOCKDOWN: ARMED' : 'LOCKDOWN OVERRIDE'}</span>
      </button>

      {/* Laser Grid Toggle Button */}
      <button
        onClick={onToggleLaser}
        className={`px-3 py-1.5 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
          laserActive
            ? 'bg-[#FF0040]/20 border-[#FF0040]/60 text-[#FF0040]'
            : 'bg-[#1F242D] border-[#3A3F47] text-[#CBD5E0]'
        }`}
        title="Toggle Security Laser Grid"
      >
        <Zap className="w-3.5 h-3.5" />
        <span>{laserActive ? 'LASER: ACTIVE' : 'LASER: OFF'}</span>
      </button>

      {/* Vault Door Control Toggle */}
      <button
        onClick={onToggleDoor}
        className={`px-3 py-1.5 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
          doorOpen
            ? 'bg-[#E0B45C]/20 border-[#E0B45C]/60 text-[#E0B45C]'
            : 'bg-[#1F242D] border-[#3A3F47] text-[#CBD5E0]'
        }`}
        title="Toggle Vault Door Wheel Mechanism"
      >
        {doorOpen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
        <span>{doorOpen ? 'VAULT DOOR: OPEN' : 'VAULT DOOR: SECURED'}</span>
      </button>

      {/* Audio Mute Toggle */}
      <button
        onClick={onToggleSound}
        className={`p-2 rounded-lg border font-mono text-xs flex items-center justify-center transition-all cursor-pointer ${
          soundMuted
            ? 'bg-[#FF0040]/15 border-[#FF0040]/40 text-[#FF0040]'
            : 'bg-[#00FF88]/15 border-[#00FF88]/40 text-[#00FF88]'
        }`}
        title="Toggle Spatial Audio Feedback"
      >
        {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
