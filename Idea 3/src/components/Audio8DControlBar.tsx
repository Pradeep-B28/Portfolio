import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, Sparkles, SlidersHorizontal } from 'lucide-react';
import { audio8D } from '../utils/audio8D';

export const Audio8DControlBar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [is8D, setIs8D] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // User interaction required to initialize Web Audio
    const handleFirstInteraction = () => {
      audio8D.init();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const toggleMute = () => {
    if (!audio8D.isInitialized) {
      audio8D.init();
    }
    const nextState = !isMuted;
    setIsMuted(nextState);
    audio8D.setMuted(nextState);
    if (!nextState) {
      audio8D.playDigSound();
    }
  };

  const toggle8D = () => {
    const nextState = !is8D;
    setIs8D(nextState);
    audio8D.set8DEnabled(nextState);
    if (!isMuted) {
      audio8D.playStratumSwoosh();
    }
  };

  return (
    <div className="fixed top-4 left-16 md:left-20 z-40 flex items-center gap-2 font-mono">
      <div className="dirt-glass-gold rounded-2xl p-1.5 flex items-center gap-2 border border-[#E8C468]/40 shadow-xl">
        <button
          onClick={toggleMute}
          className={`p-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
            !isMuted
              ? 'bg-[#E8C468] text-[#140A05] font-bold shadow-md gold-glow'
              : 'bg-[#241408] text-[#A88A66] hover:text-[#E8C468]'
          }`}
          title={isMuted ? 'Unmute 8D Subterranean Soundscape' : 'Mute Sound'}
        >
          {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="text-xs hidden sm:inline">
            8D AUDIO: {!isMuted ? 'ACTIVE' : 'MUTED'}
          </span>
        </button>

        {!isMuted && (
          <div className="flex items-center gap-1.5 px-2">
            <button
              onClick={toggle8D}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                is8D
                  ? 'bg-[#B9673A] text-[#F2E8D5] border border-[#E8C468]/60 font-semibold'
                  : 'bg-[#140A05] text-[#A88A66]'
              }`}
              title="Toggle 8D Spatial Audio Panning"
            >
              <Radio className={`w-3.5 h-3.5 ${is8D ? 'animate-pulse text-[#E8C468]' : ''}`} />
              <span>8D PAN</span>
            </button>

            {/* Live Audio Visualizer Bars Simulation */}
            <div className="flex items-end gap-0.5 h-4 px-1.5">
              <div className="w-1 bg-[#E8C468] rounded-full animate-[bounce_0.8s_infinite_100ms] h-2" />
              <div className="w-1 bg-[#D9A86C] rounded-full animate-[bounce_0.6s_infinite_300ms] h-4" />
              <div className="w-1 bg-[#B9673A] rounded-full animate-[bounce_0.9s_infinite_200ms] h-3" />
              <div className="w-1 bg-[#E8C468] rounded-full animate-[bounce_0.7s_infinite_400ms] h-2.5" />
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-[#241408] text-[#A88A66] hover:text-[#E8C468] border border-[#D9A86C]/20 cursor-pointer"
          title="Sound Effects & Audio Info"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <div className="dirt-glass-gold p-4 rounded-2xl border border-[#E8C468]/40 shadow-2xl space-y-2 text-xs text-[#F2E8D5] max-w-xs animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#D9A86C]/20 pb-2">
            <span className="font-bold text-[#E8C468] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 8D SPATIAL AUDIO SYSTEM
            </span>
            <button onClick={() => setIsOpen(false)} className="text-[#A88A66] hover:text-[#F2E8D5]">
              ×
            </button>
          </div>
          <p className="text-[11px] text-[#A88A66] leading-relaxed">
            Real-time synthesized Web Audio API spatial soundscapes:
          </p>
          <ul className="space-y-1 text-[11px] text-[#F2E8D5]/90">
            <li>⛏️ <strong>Dig Clink:</strong> Triggers when unearthing artifacts</li>
            <li>🌊 <strong>Subterranean 8D Panning:</strong> Low-pass spatial earth hum</li>
            <li>✨ <strong>Unearth Chime:</strong> Synthesized major chord trigger</li>
          </ul>
        </div>
      )}
    </div>
  );
};
