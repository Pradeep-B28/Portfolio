import React from 'react';
import { Database, ShieldCheck, Zap, Sparkles, FileText, Compass, BarChart2 } from 'lucide-react';
import { DEVELOPER } from '../../data/developer';

export function AssetManagerDashboard({
  totalAssets = 12,
  unlockedCount = 0,
  securityPoints = 12850,
  onOpenSkillMatrix,
  onOpenAuditTrail,
  onOpenExportReport,
  onStartTour
}) {
  const percentage = Math.round((unlockedCount / totalAssets) * 100);

  return (
    <div className="glass-panel-vault p-3.5 rounded-xl border border-[#E0B45C]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
      {/* Real-time Vault Progress */}
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 flex items-center justify-center">
          <svg className="w-11 h-11 transform -rotate-90">
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke="#24282E"
              strokeWidth="3.5"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke="#E0B45C"
              strokeWidth="3.5"
              strokeDasharray={113}
              strokeDashoffset={113 - (113 * percentage) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500"
            />
          </svg>
          <span className="absolute font-mono font-bold text-[10px] text-[#E0B45C]">
            {percentage}%
          </span>
        </div>

        <div>
          <div className="text-[10px] font-mono text-[#8A94A3] uppercase tracking-wider">
            Asset Discovery
          </div>
          <div className="font-mono font-bold text-sm text-[#EDF1F6] flex items-center gap-1.5">
            <span>{unlockedCount} / {totalAssets} Opened</span>
            {unlockedCount === totalAssets && (
              <Sparkles className="w-3.5 h-3.5 text-[#00FF88] animate-bounce" />
            )}
          </div>
        </div>
      </div>

      {/* Security Points Badge */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A0D14]/70 border border-[#3A3F47]/50 font-mono text-[11px]">
        <ShieldCheck className="w-4 h-4 text-[#00FF88]" />
        <div>
          <div className="text-[9px] text-[#8A94A3]">Security Clearance</div>
          <div className="font-bold text-[#00FF88]">{securityPoints} PTS</div>
        </div>
      </div>

      {/* Action Control Buttons */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Guided Tour */}
        <button
          onClick={onStartTour}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#4A7FBF]/20 hover:bg-[#4A7FBF]/40 border border-[#4A7FBF]/50 text-[#EDF1F6] font-mono text-xs transition-all active:scale-95 cursor-pointer"
          title="60-90 Second Automated Vault Tour for Recruiters"
        >
          <Compass className="w-3.5 h-3.5 text-[#4A7FBF]" />
          <span>Vault Tour</span>
        </button>

        {/* Skill Matrix */}
        <button
          onClick={onOpenSkillMatrix}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#E0B45C]/15 hover:bg-[#E0B45C]/30 border border-[#E0B45C]/40 text-[#E0B45C] font-mono text-xs transition-all active:scale-95 cursor-pointer"
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>Skill Matrix</span>
        </button>

        {/* Audit Log */}
        <button
          onClick={onOpenAuditTrail}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1F242D] hover:bg-[#3A3F47] border border-[#3A3F47] text-[#8A94A3] hover:text-[#EDF1F6] font-mono text-xs transition-all active:scale-95 cursor-pointer"
        >
          <Database className="w-3.5 h-3.5" />
          <span>Audit Log</span>
        </button>

        {/* Export Recruiter PDF Report */}
        <button
          onClick={onOpenExportReport}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#E0B45C] to-[#B8860B] text-[#0A0C10] font-mono font-bold text-xs transition-all shadow-lg hover:brightness-110 active:scale-95 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Export Report PDF</span>
        </button>
      </div>
    </div>
  );
}
