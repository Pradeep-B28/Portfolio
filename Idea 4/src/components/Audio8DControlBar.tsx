import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, Sparkles, SlidersHorizontal } from 'lucide-react';
import { audio8D } from '../utils/audio8D';

export const Audio8DControlBar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [is8D, setIs8D] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
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
      audio8D.playStarLockSound();
    }
  };

  const toggle8D = () => {
    const nextState = !is8D;
    setIs8D(nextState);
    audio8D.set8DEnabled(nextState);
    if (!isMuted) {
      audio8D.playSupernovaPulse();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 font-mono">
      <div className="space-glass-gold rounded-2xl p-1.5 flex items-center gap-2 border border-[#4DEBFF]/40 shadow-2xl">
        <button
          onClick={toggleMute}
          className={`p-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
            !isMuted
              ? 'bg-[#4DEBFF] text-[#050810] font-bold shadow-md gold-glow'
              : 'bg-[#0A101D] text-[#7C8AA6] hover:text-[#4DEBFF]'
          }`}
          title={isMuted ? 'Unmute 8D Cosmic Soundscape' : 'Mute Sound'}
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
                  ? 'bg-[#B55FE6] text-white border border-[#4DEBFF]/60 font-semibold'
                  : 'bg-[#050810] text-[#7C8AA6]'
              }`}
              title="Toggle 8D Spatial Audio Panning"
            >
              <Radio className={`w-3.5 h-3.5 ${is8D ? 'animate-pulse text-[#4DEBFF]' : ''}`} />
              <span>8D PAN</span>
            </button>

            {/* Live Audio Visualizer Bars Simulation */}
            <div className="flex items-end gap-0.5 h-4 px-1.5">
              <div className="w-1 bg-[#4DEBFF] rounded-full animate-[bounce_0.8s_infinite_100ms] h-2" />
              <div className="w-1 bg-[#E8C468] rounded-full animate-[bounce_0.6s_infinite_300ms] h-4" />
              <div className="w-1 bg-[#B55FE6] rounded-full animate-[bounce_0.9s_infinite_200ms] h-3" />
              <div className="w-1 bg-[#4DEBFF] rounded-full animate-[bounce_0.7s_infinite_400ms] h-2.5" />
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-[#0A101D] text-[#7C8AA6] hover:text-[#4DEBFF] border border-[#7C8AA6]/20 cursor-pointer"
          title="Sound Effects & Audio Info"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <div className="space-glass-gold p-4 rounded-2xl border border-[#4DEBFF]/40 shadow-2xl space-y-2 text-xs text-[#EAF0FA] max-w-xs animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#7C8AA6]/20 pb-2">
            <span className="font-bold text-[#4DEBFF] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 8D CELESTIAL AUDIO SYSTEM
            </span>
            <button onClick={() => setIsOpen(false)} className="text-[#7C8AA6] hover:text-[#EAF0FA]">
              ×
            </button>
          </div>
          <p className="text-[11px] text-[#7C8AA6] leading-relaxed">
            Real-time synthesized Web Audio API cosmic soundscapes:
          </p>
          <ul className="space-y-1 text-[11px] text-[#EAF0FA]/90">
            <li>✨ <strong>Star Lock:</strong> Triggered on skill or project focus</li>
            <li>🌌 <strong>Deep-Space 8D Drone:</strong> Lowpass spatial cosmic resonance</li>
            <li>💫 <strong>Constellation Warp:</strong> Major arpeggio star chime</li>
          </ul>
        </div>
      )}
    </div>
  );
};
