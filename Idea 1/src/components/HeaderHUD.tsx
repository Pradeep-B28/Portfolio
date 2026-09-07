import React, { useState, useEffect } from 'react';
import { Play, Pause, User, Monitor, Smartphone, X, Mail, Phone, Award, Palette } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/clips';

interface HeaderHUDProps {
  isPlayingTrailer: boolean;
  onToggleTrailer: () => void;
  aspectRatio: string;
  onChangeAspectRatio: (ratio: string) => void;
  isMobile: boolean;
  activeTheme?: 'cyber' | 'amber' | 'emerald' | 'purple';
  onSelectTheme?: (theme: 'cyber' | 'amber' | 'emerald' | 'purple') => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  isPlayingTrailer,
  onToggleTrailer,
  aspectRatio,
  onChangeAspectRatio,
  isMobile,
  activeTheme = 'cyber',
  onSelectTheme,
  selectedCategory = 'all',
  onSelectCategory,
}) => {
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);

  // Timecode clock simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const frames = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`${hrs}:${mins}:${secs}:${frames}`);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Glassmorphism Viewfinder HUD Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xl font-mono">
        {/* Left Side: Brand Logo, Status & Timecode */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 text-decoration-none">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22d3ee] to-[#a855f7] flex items-center justify-center text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20">
              &lt;/&gt;
            </span>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold font-heading tracking-wide text-slate-100 flex items-center gap-2">
                <span>THE EDITING ROOM</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-[#22d3ee] border border-cyan-500/30 font-mono">
                  3D CUTS
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 font-sans hidden md:block">
                PRADEEP B · L&D LEAD & FULL-STACK ARCHITECT
              </p>
            </div>
          </a>

          <div className="h-5 w-px bg-white/10 hidden lg:block" />

          {/* Timecode REC Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-[11px] text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span className="font-bold font-mono">REC {timecode}</span>
          </div>
        </div>

        {/* Center: Controls, Category Filters & Trailer Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Category Filter Pills (Desktop) */}
          {onSelectCategory && (
            <div className="hidden xl:flex items-center bg-slate-900/80 border border-white/10 rounded-lg p-1 gap-1 text-xs font-sans">
              {[
                { id: 'all', label: 'All Cuts (7)' },
                { id: 'L&D Leadership', label: 'L&D Leadership' },
                { id: 'Full-Stack & 3D', label: 'Full-Stack & 3D' },
                { id: 'Academic Training', label: 'Academic Training' },
                { id: 'Systems & Education', label: 'Systems' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-[#22d3ee] font-bold border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* Auto Trailer Play Button */}
          <button
            onClick={onToggleTrailer}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold font-sans transition-all border shadow-lg ${
              isPlayingTrailer
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-amber-500/20'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 border-cyan-400 shadow-cyan-500/25'
            }`}
          >
            {isPlayingTrailer ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>PAUSE TRAILER</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PLAY TRAILER</span>
              </>
            )}
          </button>

          {/* Theme Picker Dropdown Toggle */}
          {onSelectTheme && (
            <div className="relative">
              <button
                onClick={() => setShowThemePicker(!showThemePicker)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs text-cyan-400 transition-colors"
                title="Select Theme Palette"
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="hidden md:inline uppercase text-[11px] font-bold font-mono">{activeTheme}</span>
              </button>

              {showThemePicker && (
                <div className="absolute right-0 mt-2 w-44 bg-[#07090e] border border-cyan-500/30 rounded-xl p-2 shadow-2xl z-50 flex flex-col gap-1 font-sans text-xs">
                  {[
                    { id: 'cyber', label: '⚡ Cyber Neon', color: '#22d3ee' },
                    { id: 'emerald', label: '🟢 Emerald Green', color: '#10b981' },
                    { id: 'amber', label: '🌅 Amber Sunset', color: '#f59e0b' },
                    { id: 'purple', label: '🟣 Purple Synth', color: '#a855f7' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onSelectTheme(t.id as any);
                        setShowThemePicker(false);
                      }}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                        activeTheme === t.id
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }}></span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Aspect Ratio Selector */}
          <div className="hidden lg:flex items-center bg-slate-900/80 border border-white/10 rounded-lg p-0.5 text-[11px] text-slate-400">
            {['16:9', '2.39:1', '4:3', '1:1'].map((ratio) => (
              <button
                key={ratio}
                onClick={() => onChangeAspectRatio(ratio)}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  aspectRatio === ratio
                    ? 'bg-cyan-500/20 text-[#22d3ee] font-bold border border-cyan-500/40'
                    : 'hover:text-slate-200'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Device Indicator & Profile Modal Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-[11px] text-slate-400">
            {isMobile ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>MOBILE STRIP</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span>3D CANVAS</span>
              </>
            )}
          </div>

          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/30 to-cyan-500/30 hover:from-purple-600/50 hover:to-cyan-500/50 border border-cyan-500/40 text-xs font-bold text-slate-100 transition-all shadow-md shadow-purple-500/10"
          >
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">CREDENTIALS</span>
          </button>
        </div>
      </header>

      {/* Developer Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07090e]/90 backdrop-blur-xl">
          <div className="relative w-full max-w-2xl bg-slate-900/95 border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[88vh] font-sans text-slate-100">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-5">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-slate-950 font-black text-2xl font-heading shadow-lg shadow-cyan-500/25 shrink-0">
                PB
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100">{DEVELOPER_PROFILE.name}</h2>
                <p className="text-xs font-semibold text-cyan-400 font-mono mt-0.5">{DEVELOPER_PROFILE.title}</p>
                <p className="text-xs text-slate-400 mt-1">{DEVELOPER_PROFILE.tagline}</p>
              </div>
            </div>

            <div className="space-y-5 mb-6">
              <div className="bg-slate-950/80 border border-cyan-500/20 rounded-xl p-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {DEVELOPER_PROFILE.summary}
              </div>

              <div>
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2 font-mono">
                  <Award className="w-4 h-4 text-amber-400" /> VERIFIED CERTIFICATIONS & CREDENTIALS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DEVELOPER_PROFILE.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2.5 rounded-lg bg-slate-950/60 border border-white/10 text-xs text-slate-200 flex items-center gap-2.5"
                    >
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-slate-800 text-xs font-mono">
              <a
                href={DEVELOPER_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 transition-colors font-bold"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LinkedIn</span>
              </a>
              <a
                href={DEVELOPER_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/40 transition-colors font-bold"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>GitHub Profile</span>
              </a>
              <a
                href={`mailto:${DEVELOPER_PROFILE.email}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-rose-400" />
                <span>{DEVELOPER_PROFILE.email}</span>
              </a>
              <a
                href={`tel:${DEVELOPER_PROFILE.phone}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{DEVELOPER_PROFILE.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
