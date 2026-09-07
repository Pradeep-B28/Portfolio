import React, { useState, useEffect } from 'react';
import { DollarSign, ShieldAlert } from 'lucide-react';

export function NetWorthTicker({ totalValuation = 27900000, unlockedValuation = 0 }) {
  const [displayValue, setDisplayValue] = useState(unlockedValuation);

  useEffect(() => {
    let start = displayValue;
    const end = unlockedValuation;
    const duration = 600;
    const startTime = performance.now();

    const animateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeProgress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };

    requestAnimationFrame(animateValue);
  }, [unlockedValuation]);

  const formatted = displayValue.toLocaleString('en-US');

  return (
    <div className="glass-panel-vault px-4 py-2.5 rounded-lg flex items-center gap-3 border border-[#E0B45C]/30 shadow-lg">
      <div className="w-8 h-8 rounded-full bg-[#E0B45C]/15 border border-[#E0B45C]/40 flex items-center justify-center text-[#E0B45C]">
        <DollarSign className="w-5 h-5 animate-pulse" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-[#8A94A3] font-mono flex items-center gap-1">
          <span>Vault Portfolio Net Worth</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] inline-block animate-ping"></span>
        </div>
        <div className="text-xl md:text-2xl font-mono font-bold text-[#E0B45C] text-gold-glow tracking-wider">
          ${formatted} <span className="text-xs font-normal text-[#8A94A3]">USD</span>
        </div>
      </div>
    </div>
  );
}
