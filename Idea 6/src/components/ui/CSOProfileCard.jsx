import React, { useState } from 'react';
import { Shield, ChevronDown, ChevronUp, UserCheck, Award, Mail, Code, Globe, MapPin, Phone } from 'lucide-react';
import { DEVELOPER } from '../../data/developer';


export function CSOProfileCard({ clearanceLevel = 5 }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="glass-panel-vault rounded-xl border border-[#E0B45C]/30 overflow-hidden shadow-2xl transition-all duration-300 w-80 max-w-[calc(100vw-2rem)]">
      {/* Header Bar */}
      <div 
        className="px-3.5 py-2.5 bg-[#12161F]/90 flex items-center justify-between cursor-pointer border-b border-[#3A3F47]/50"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#E0B45C]/20 border border-[#E0B45C]/50 flex items-center justify-center text-[#E0B45C]">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-[#EDF1F6] tracking-wider uppercase">
              Chief Security Officer
            </div>
            <div className="text-[10px] text-[#00FF88] font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]"></span>
              <span>Level {clearanceLevel} Executive Access</span>
            </div>
          </div>
        </div>

        <button className="text-[#8A94A3] hover:text-[#E0B45C] transition-colors p-1">
          {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Card Content Body */}
      {!collapsed && (
        <div className="p-3.5 space-y-3.5 text-xs text-[#EDF1F6]">
          {/* Identity Info */}
          <div className="flex items-center gap-3 bg-[#0A0D14]/60 p-2.5 rounded-lg border border-[#3A3F47]/40">
            <div className="w-11 h-11 rounded-lg bg-[#E0B45C]/20 border-2 border-[#E0B45C] flex items-center justify-center font-syne text-lg font-bold text-[#E0B45C] shrink-0">
              PB
            </div>
            <div>
              <div className="font-bold text-sm text-[#EDF1F6] flex items-center gap-1.5">
                {DEVELOPER.name}
                <UserCheck className="w-3.5 h-3.5 text-[#00FF88]" />
              </div>
              <div className="text-[11px] text-[#8A94A3]">{DEVELOPER.role}</div>
              <div className="text-[10px] text-[#E0B45C] font-mono mt-0.5">{DEVELOPER.yearsOfExperience} Exp • VIT Master Trainer</div>
            </div>
          </div>

          {/* Quick Contact Links */}
          <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
            <a 
              href={`mailto:${DEVELOPER.email}`}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-[#181D26] hover:bg-[#E0B45C]/20 border border-[#3A3F47]/50 text-[#8A94A3] hover:text-[#E0B45C] transition-all truncate"
            >
              <Mail className="w-3 h-3 text-[#E0B45C]" />
              <span className="truncate">{DEVELOPER.email}</span>
            </a>
            <a 
              href={DEVELOPER.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-[#181D26] hover:bg-[#E0B45C]/20 border border-[#3A3F47]/50 text-[#8A94A3] hover:text-[#E0B45C] transition-all"
            >
              <Code className="w-3 h-3 text-[#E0B45C]" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Top Skill Meters */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-mono text-[#8A94A3] tracking-wider flex items-center justify-between">
              <span>Security Clearance Proficiency</span>
              <Award className="w-3 h-3 text-[#E0B45C]" />
            </div>
            {DEVELOPER.topSkills.map((sk, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between text-[10px] font-mono text-[#EDF1F6]">
                  <span className="truncate max-w-[170px]">{sk.name}</span>
                  <span className="text-[#E0B45C] font-bold">{sk.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#181C24] rounded-full overflow-hidden border border-[#3A3F47]/50">
                  <div 
                    className="h-full bg-gradient-to-r from-[#4A7FBF] to-[#E0B45C] rounded-full transition-all duration-500"
                    style={{ width: `${sk.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Mentorship Badge */}
          <div className="p-2 rounded bg-[#00FF88]/10 border border-[#00FF88]/30 text-[10px] font-mono text-[#00FF88] flex items-center justify-between">
            <span>6,000+ Students Mentored</span>
            <span className="font-bold">+20% VIT Placement</span>
          </div>
        </div>
      )}
    </div>
  );
}
