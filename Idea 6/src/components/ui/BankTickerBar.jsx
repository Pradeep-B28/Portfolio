import React from 'react';

export function BankTickerBar({ lockdownMode }) {
  const tickerItems = [
    { label: 'GOLD SPOT', val: '$2,740.50 / OZ', change: '+1.2%', up: true },
    { label: 'EUR / USD', val: '1.0872', change: '+0.04%', up: true },
    { label: 'GBP / USD', val: '1.3120', change: '-0.12%', up: false },
    { label: 'USD / JPY', val: '148.55', change: '+0.35%', up: true },
    { label: 'FED FUNDS RATE', val: '4.75%', change: 'STABLE', up: true },
    { label: 'SWIFT SETTLEMENTS', val: '48,500 MSG/SEC', change: 'NOMINAL', up: true },
    { label: 'RESERVE RATIO', val: '100% CAPITALIZED', change: 'AUDITED', up: true },
    { label: 'VAULT SECURITY', val: lockdownMode ? 'LEVEL 5 LOCKDOWN (ARMED)' : 'LEVEL 5 SECURE', change: 'ACTIVE', up: !lockdownMode },
  ];

  return (
    <div className={`w-full overflow-hidden font-mono text-[10px] py-1 border-y transition-colors duration-500 z-20 pointer-events-auto ${
      lockdownMode
        ? 'bg-[#FF0040]/30 border-[#FF0040] text-[#FF0040] font-bold animate-pulse'
        : 'bg-[#080B10]/90 border-[#E0B45C]/30 text-[#8A94A3]'
    }`}>
      <div className="flex whitespace-nowrap animate-marquee gap-8 items-center">
        {tickerItems.concat(tickerItems).map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 shrink-0">
            <span className="text-[#EDF1F6] font-semibold">{item.label}:</span>
            <span className="text-white font-bold">{item.val}</span>
            <span className={`px-1 rounded text-[9px] ${
              item.up ? 'bg-[#00FF88]/20 text-[#00FF88]' : 'bg-[#FF0040]/20 text-[#FF0040]'
            }`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
