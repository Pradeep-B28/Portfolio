import React, { useEffect } from 'react';
import { X, Database, Clock, ShieldCheck, Download } from 'lucide-react';

export function AuditTrailModal({ auditLogs = [], unlockedCount = 0, totalAssets = 12, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const discoveryRate = Math.round((unlockedCount / totalAssets) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070A]/85 backdrop-blur-xl animate-fadeIn overflow-y-auto" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl glass-panel-vault rounded-2xl border-2 border-[#E0B45C]/50 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#121620] via-[#1A202C] to-[#121620] border-b border-[#E0B45C]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4A7FBF]/20 border border-[#4A7FBF]/50 flex items-center justify-center text-[#4A7FBF]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-[#00FF88]">
                Dimension 6: Exploration Audit Trail Log
              </div>
              <h2 className="text-xl font-syne font-bold text-[#EDF1F6] text-gold-glow">
                Security Audit Log & Activity Trail
              </h2>
            </div>
          </div>

          {/* PROMINENT TOP-RIGHT CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FF0040]/20 hover:bg-[#FF0040]/40 border-2 border-[#FF0040] text-[#FF0040] hover:text-white font-mono font-bold text-xs transition-all shadow-lg cursor-pointer active:scale-95"
            title="Close Audit Trail (Esc)"
          >
            <span>CLOSE</span>
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Stats Banner */}
        <div className="px-6 py-3 bg-[#0B0E14] border-b border-[#3A3F47]/40 flex items-center justify-between font-mono text-xs text-[#8A94A3]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00FF88]" />
            <span>Vault Discovery Rate: <strong className="text-[#00FF88]">{discoveryRate}%</strong></span>
          </div>
          <div>Total Logged Entries: <strong className="text-[#E0B45C]">{auditLogs.length}</strong></div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-2.5 font-mono text-xs text-[#EDF1F6]">
          {auditLogs.length === 0 ? (
            <div className="p-8 text-center text-[#8A94A3] space-y-2">
              <Clock className="w-8 h-8 mx-auto text-[#3A3F47] animate-spin" />
              <div>No safety deposit box opened yet. Explore the vault wall to generate logs!</div>
            </div>
          ) : (
            auditLogs.map((log, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-[#121620]/60 border border-[#3A3F47]/40 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#8A94A3] text-[10px]">{log.time}</span>
                  <span className="text-[#E0B45C] font-bold">[{log.boxNumber}]</span>
                  <span>Opened <strong className="text-[#EDF1F6]">{log.title}</strong></span>
                </div>
                <span className="text-[#00FF88] text-[10px] uppercase font-bold">CLEARANCE ACCEPTED</span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0E121A] border-t border-[#3A3F47]/60 flex items-center justify-between shrink-0">
          <div className="text-xs font-mono text-[#8A94A3]">
            Audit Session ID: #VAULT-{Math.floor(Math.random() * 899999 + 100000)}
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#FF0040]/20 hover:bg-[#FF0040] text-[#FF0040] hover:text-white border-2 border-[#FF0040] font-mono font-extrabold text-xs transition-all shadow-xl cursor-pointer active:scale-95"
            title="Close Audit Trail (Esc)"
          >
            <span>[ESC] CLOSE LOG</span>
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}
