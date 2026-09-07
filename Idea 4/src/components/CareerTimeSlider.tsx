import React from 'react';
import { Calendar, RefreshCw } from 'lucide-react';

interface CareerTimeSliderProps {
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
}

export const CareerTimeSlider: React.FC<CareerTimeSliderProps> = ({
  selectedYear,
  onSelectYear,
}) => {
  const years = [
    { label: 'ALL', year: null },
    { label: '2022', year: 2022 },
    { label: '2024', year: 2024 },
    { label: '2025', year: 2025 },
    { label: '2026 (PRESENT)', year: 2026 },
  ];

  return (
    <div className="fixed bottom-6 right-6 md:right-84 lg:right-[400px] z-30 space-glass p-3 rounded-2xl border border-[#7C8AA6]/30 shadow-2xl flex items-center gap-3 font-mono text-xs select-none">
      <div className="flex items-center gap-1.5 text-[#E8C468] shrink-0">
        <Calendar className="w-4 h-4 text-[#E8C468]" />
        <span className="font-bold hidden sm:inline">CAREER TIMELINE:</span>
      </div>

      <div className="flex items-center gap-1">
        {years.map((y) => {
          const isSelected = selectedYear === y.year;

          return (
            <button
              key={y.label}
              onClick={() => onSelectYear(y.year)}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#E8C468] text-[#050810] font-bold border-[#E8C468] shadow-md'
                  : 'bg-[#050810]/70 text-[#7C8AA6] border-[#7C8AA6]/20 hover:text-[#EAF0FA] hover:border-[#E8C468]/40'
              }`}
            >
              {y.label}
            </button>
          );
        })}
      </div>

      {selectedYear !== null && (
        <button
          onClick={() => onSelectYear(null)}
          className="p-1 rounded bg-[#050810] text-[#7C8AA6] hover:text-[#E8C468]"
          title="Reset Timeline Filter"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
