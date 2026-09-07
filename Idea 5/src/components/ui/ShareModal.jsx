import { useState } from 'react';
import {
  Check,
  Clipboard,
  Link2,
  Radio,
  Send,
  Share2,
  X
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function ShareModal({ project, onClose }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = project
    ? `https://pradeep-b28.github.io/Pradeep-B28/?game=${project.id}`
    : 'https://pradeep-b28.github.io/Pradeep-B28/';

  const shareTitle = project
    ? project.title
    : "Pradeep's 3D Arcade Portfolio";

  const handleCopy = async () => {
    sounds.playSelect();

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="crt-overlay fixed inset-0 z-50 flex items-center justify-center bg-[#03050A]/90 p-4 backdrop-blur-2xl animate-fadeIn">
      <div className="glass-panel-cyber border-gradient-cyan relative w-full max-w-lg overflow-hidden rounded-2xl p-5 text-white shadow-[0_0_80px_rgba(0,0,0,0.85)] sm:p-6">
        <div className="relative z-10">
          <div className="mb-5 flex items-start justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-[#00F0FF]/40 bg-[#00F0FF]/10 p-2.5">
                <Share2 className="h-5 w-5 text-[#00F0FF]" />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] shadow-[0_0_10px_#00FF66]" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#00FF66]">
                    Transmission ready
                  </span>
                </div>

                <h3 className="font-pixel text-xs text-[#00F0FF] sm:text-sm">
                  MULTIPLAYER SHARE LINK
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playSelect();
                onClose();
              }}
              className="rounded-xl border border-white/10 bg-black/40 p-2 text-gray-400 hover:bg-black/80 hover:text-white"
              aria-label="Close share dialog"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-4 rounded-xl border border-white/10 bg-black/30 p-3">
            <div className="mb-2 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-gray-500">
              <Radio className="h-3.5 w-3.5 text-[#FF2ED1]" />
              Selected transmission
            </div>

            <p className="font-display text-sm font-bold text-white">
              {shareTitle}
            </p>

            {project && (
              <p className="mt-1 font-mono text-[9px] text-[#00F0FF]">
                {project.category} // {project.releaseYear}
              </p>
            )}
          </div>

          <p className="mb-4 font-mono text-xs leading-relaxed text-gray-300">
            Share this cartridge with your hiring team, collaborators, or
            recruiters.
          </p>

          <div className="rounded-xl border border-[#00F0FF]/25 bg-black/60 p-2">
            <div className="mb-2 flex items-center gap-1.5 px-2 font-mono text-[8px] uppercase tracking-[0.16em] text-[#71818b]">
              <Link2 className="h-3 w-3 text-[#00F0FF]" />
              Secure project route
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                aria-label="Share URL"
                className="min-w-0 flex-1 truncate bg-transparent px-2 font-mono text-[10px] text-[#39FF14] outline-none"
              />

              <button
                onClick={handleCopy}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 font-pixel text-[9px] transition-all ${
                  copied
                    ? 'bg-[#00FF66] text-black shadow-[0_0_18px_rgba(0,255,102,0.45)]'
                    : 'bg-[#00F0FF] text-black hover:bg-[#20D8E6]'
                }`}
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Clipboard className="h-3.5 w-3.5" />
                )}
                {copied ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-[#00F0FF]/30 bg-[#00F0FF]/10 px-3 py-2.5 font-mono text-[10px] text-[#00F0FF] hover:bg-[#00F0FF]/20"
              onClick={() => sounds.playSelect()}
            >
              <Send className="h-3.5 w-3.5" />
              LINKEDIN
            </a>

            <a
              href={`mailto:?subject=Check out ${encodeURIComponent(
                shareTitle
              )}&body=${encodeURIComponent(shareUrl)}`}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-[#FF2ED1]/30 bg-[#FF2ED1]/10 px-3 py-2.5 font-mono text-[10px] text-[#FF2ED1] hover:bg-[#FF2ED1]/20"
              onClick={() => sounds.playSelect()}
            >
              <Send className="h-3.5 w-3.5" />
              EMAIL
            </a>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 border-t border-white/10 pt-4 font-mono text-[8px] uppercase tracking-[0.14em] text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66]" />
            Link contains no private project data
          </div>
        </div>
      </div>
    </div>
  );
}