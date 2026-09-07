import React, { useRef, useState, useEffect } from 'react';
import { ExternalLink, Sparkles, CheckCircle2, Box, Code } from 'lucide-react';
import { GithubIcon, PickIcon } from './Icons';
import type { ArtifactProject } from '../data/projects';
import { audio8D } from '../utils/audio8D';

interface ArtifactCardProps {
  artifact: ArtifactProject;
  isUnearthed: boolean;
  onUnearth: (id: string) => void;
  onInspect: (artifact: ArtifactProject) => void;
  prefersReducedMotion: boolean;
}

export const ArtifactCard: React.FC<ArtifactCardProps> = ({
  artifact,
  isUnearthed,
  onUnearth,
  onInspect,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (isUnearthed) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.fillStyle = '#3A2214';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#563520';
    for (let i = 0; i < 400; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      const rw = Math.random() * 4 + 1;
      ctx.fillRect(rx, ry, rw, rw);
    }

    ctx.fillStyle = '#E8C468';
    ctx.font = '600 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ DRAG / CLICK TO BRUSH AWAY DIRT & UNEARTH RELIC', canvas.width / 2, canvas.height / 2);
  }, [isUnearthed]);

  const handleScratch = (clientX: number, clientY: number) => {
    if (isUnearthed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    audio8D.playDigSound();

    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] === 0) transparentPixels++;
    }
    const pct = (transparentPixels / (imgData.data.length / 4)) * 100;

    if (pct > 30 && !isUnearthed) {
      audio8D.playUnearthChime();
      onUnearth(artifact.id);
    }
  };

  const handleQuickUnearth = () => {
    if (!isUnearthed) {
      audio8D.playUnearthChime();
      onUnearth(artifact.id);
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'relic':
        return 'bg-[#E8C468]/20 text-[#E8C468] border-[#E8C468]/40';
      case 'stele':
        return 'bg-[#B9673A]/20 text-[#D9A86C] border-[#B9673A]/40';
      case 'fossilized_scroll':
        return 'bg-purple-900/30 text-purple-300 border-purple-500/40';
      case 'pottery_sherd':
        return 'bg-amber-900/30 text-amber-300 border-amber-500/40';
      default:
        return 'bg-stone-800 text-stone-300 border-stone-600';
    }
  };

  return (
    <div
      id={`artifact-${artifact.id}`}
      className={`relative rounded-3xl transition-all duration-500 my-12 max-w-2xl mx-auto border ${
        isUnearthed
          ? 'dirt-glass-gold gold-glow scale-[1.01] border-[#E8C468]/40 shadow-2xl'
          : 'dirt-glass opacity-90 hover:opacity-100 hover:border-[#D9A86C]/40'
      }`}
    >
      {/* Top Specimen Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#D9A86C]/15 bg-[#140A05]/70 rounded-t-3xl">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#E8C468] bg-[#E8C468]/10 px-2.5 py-1 rounded-full border border-[#E8C468]/30 font-bold">
            DEPTH: {artifact.depth}m
          </span>
          <span
            className={`text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-md border font-mono font-medium ${getBadgeStyle(
              artifact.artifactType
            )}`}
          >
            SPECIMEN: {artifact.artifactType.replace('_', ' ')}
          </span>
        </div>

        {isUnearthed ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onInspect(artifact)}
              className="flex items-center gap-1.5 text-xs text-[#140A05] bg-[#E8C468] px-3 py-1 rounded-lg font-mono font-bold hover:bg-[#F2E8D5] transition-colors cursor-pointer shadow"
            >
              <Box className="w-3.5 h-3.5" />
              <span>INSPECT 3D RELIC</span>
            </button>
            <div className="flex items-center gap-1.5 text-xs text-[#E8C468] font-mono font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#E8C468]" />
              <span className="hidden sm:inline">UNEARTHED</span>
            </div>
          </div>
        ) : (
          <button
            onClick={handleQuickUnearth}
            className="flex items-center gap-1.5 text-xs text-[#A88A66] hover:text-[#E8C468] font-mono transition-colors group cursor-pointer"
          >
            <PickIcon className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
            <span>BRUSH AWAY DIRT</span>
          </button>
        )}
      </div>

      {/* Main Specimen Content */}
      <div className="p-6 md:p-8 space-y-5">
        <div className="space-y-1.5">
          <div className="flex justify-between items-start">
            <h3
              onClick={() => isUnearthed && onInspect(artifact)}
              className={`text-2xl md:text-3xl font-editorial font-bold text-[#F2E8D5] ${
                isUnearthed ? 'cursor-pointer hover:text-[#E8C468] transition-colors' : ''
              }`}
            >
              {artifact.title}
            </h3>
            <span className="text-xs font-mono text-[#A88A66] whitespace-nowrap ml-4">
              {artifact.dates}
            </span>
          </div>
          <p className="text-sm text-[#E8C468] font-medium font-mono">Role: {artifact.role}</p>
        </div>

        <p className="text-sm md:text-base text-[#F2E8D5]/90 leading-relaxed font-sans">
          {artifact.description}
        </p>

        <div className="p-4 rounded-2xl bg-[#140A05]/90 border border-[#E8C468]/30 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E8C468] uppercase tracking-wider font-semibold">
              <Sparkles className="w-4 h-4 text-[#E8C468]" />
              <span>RECRUITER IMPACT & VERIFIED METRICS</span>
            </div>
            {isUnearthed && (
              <button
                onClick={() => onInspect(artifact)}
                className="text-[11px] font-mono text-[#E8C468] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Code className="w-3 h-3" /> TEST SANDBOX
              </button>
            )}
          </div>
          <ul className="space-y-1.5">
            {artifact.impactMetrics.map((metric, idx) => (
              <li key={idx} className="text-xs md:text-sm text-[#F2E8D5] flex items-start gap-2">
                <span className="text-[#E8C468] font-bold">›</span>
                <span>{metric}</span>
              </li>
            ))}
          </ul>
        </div>

        {artifact.codeSnippet && (
          <div className="rounded-xl overflow-hidden border border-[#D9A86C]/20 bg-[#0C0603]/90 p-4 font-mono text-xs text-[#D9A86C]/90 space-y-1">
            <div className="flex justify-between items-center text-[10px] text-[#A88A66] uppercase tracking-wider">
              <span>// Fossilized Code Specimen</span>
              <span className="text-[#E8C468]">Verified logic</span>
            </div>
            <pre className="overflow-x-auto p-1 leading-relaxed">
              <code>{artifact.codeSnippet}</code>
            </pre>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#D9A86C]/10">
          <div className="flex flex-wrap gap-1.5">
            {artifact.techTags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-md bg-[#241408] border border-[#D9A86C]/20 text-[#A88A66] font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isUnearthed && (
              <button
                onClick={() => onInspect(artifact)}
                className="px-3 py-1.5 rounded-lg bg-[#241408] border border-[#E8C468]/40 text-[#E8C468] text-xs font-mono font-bold hover:bg-[#E8C468] hover:text-[#140A05] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Box className="w-3.5 h-3.5" />
                <span>INSPECT 3D</span>
              </button>
            )}

            {artifact.githubUrl && (
              <a
                href={artifact.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#241408] hover:bg-[#E8C468]/20 border border-[#D9A86C]/30 text-[#F2E8D5] hover:text-[#E8C468] transition-colors"
                title="View GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {artifact.liveUrl && (
              <a
                href={artifact.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#E8C468] text-[#140A05] font-bold hover:bg-[#F2E8D5] transition-colors shadow"
              >
                <span>LIVE SYSTEM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {!isUnearthed && (
        <canvas
          ref={canvasRef}
          width={600}
          height={380}
          onMouseDown={() => setIsScratching(true)}
          onMouseUp={() => setIsScratching(false)}
          onMouseLeave={() => setIsScratching(false)}
          onMouseMove={(e) => isScratching && handleScratch(e.clientX, e.clientY)}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            handleScratch(touch.clientX, touch.clientY);
          }}
          onClick={handleQuickUnearth}
          className="absolute inset-0 w-full h-full rounded-3xl cursor-crosshair touch-none z-10 opacity-95 transition-opacity"
        />
      )}
    </div>
  );
};
