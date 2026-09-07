import React from 'react';
import { ChevronRight, Key, Lock, Unlock } from 'lucide-react';

export function VaultDepthHUD({ chambers = [], currentChamberId, onOpenChamber }) {
  return (
    <nav aria-label="Vault chamber navigation" className="glass-panel-vault flex max-w-full flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#FFD700]/30 px-3 py-2 shadow-2xl">
      <div className="mr-1 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#FFD700]"><Key className="h-4 w-4" /><span className="hidden sm:inline">Vault Chambers</span></div>
      {chambers.map((chamber, index) => {
        const isCurrent = currentChamberId === chamber.id;
        const isLocked = !chamber.accessible;
        const isComplete = chamber.complete;
        return (
          <React.Fragment key={chamber.id}>
            <button type="button" disabled={isLocked} aria-current={isCurrent ? 'step' : undefined} onClick={() => onOpenChamber(chamber.id)} className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 font-mono text-[10px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${isLocked ? 'cursor-not-allowed border-[#334155] bg-[#0F172A]/80 text-[#64748B] opacity-70' : isComplete ? 'border-[#00FF88]/60 bg-[#00FF88]/15 text-[#00FF88] hover:bg-[#00FF88]/25' : isCurrent ? 'border-[#FFD700] bg-[#FFD700]/20 font-bold text-[#FFD700]' : 'border-[#475569] bg-[#181D26] text-[#CBD5E0] hover:border-[#FFD700] hover:text-white'}`}>
              {isLocked ? <Lock className="h-3.5 w-3.5" /> : isComplete ? <Unlock className="h-3.5 w-3.5" /> : <Key className="h-3.5 w-3.5" />}
              <span className="hidden md:inline">{String(chamber.id).padStart(2, '0')} · {chamber.shortName}</span>
              <span className="md:hidden">{String(chamber.id).padStart(2, '0')}</span>
            </button>
            {index < chambers.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-[#475569]" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
