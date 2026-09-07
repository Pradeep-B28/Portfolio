import React, { useState, useRef, useEffect } from 'react';
import { SKILLS } from '../data/skills';
import { Cpu, Boxes, Terminal, GraduationCap, Flame, Network, LayoutGrid } from 'lucide-react';
import { audio8D } from '../utils/audio8D';

interface SkillsConstellationGraphProps {
  onSelectSkill: (skillId: string) => void;
}

export const SkillsConstellationGraph: React.FC<SkillsConstellationGraphProps> = ({
  onSelectSkill,
}) => {
  const [viewMode, setViewMode] = useState<'constellation' | 'heatmap'>('constellation');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Backend & Systems':
        return <Cpu className="w-4 h-4 text-[#4DEBFF]" />;
      case 'Frontend & Graphics':
        return <Boxes className="w-4 h-4 text-[#4DEBFF]" />;
      case 'DevOps & AI':
        return <Terminal className="w-4 h-4 text-[#4DEBFF]" />;
      default:
        return <GraduationCap className="w-4 h-4 text-[#4DEBFF]" />;
    }
  };

  // 8D Constellation Canvas Rendering Loop
  useEffect(() => {
    if (viewMode !== 'constellation') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const nodes = SKILLS.map((s, i) => {
      const angle = (i / SKILLS.length) * Math.PI * 2;
      const radius = 95 + Math.random() * 35;
      return {
        id: s.id,
        name: s.name,
        level: s.expertiseLevel,
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      ctx.strokeStyle = 'rgba(77, 235, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 105) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 20 || n.x > canvas.width - 20) n.vx *= -1;
        if (n.y < 20 || n.y > canvas.height - 20) n.vy *= -1;

        const size = n.level === 'Expert' ? 7 : 5;
        ctx.fillStyle = '#4DEBFF';
        ctx.shadowColor = '#4DEBFF';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#EAF0FA';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(n.name, n.x + 9, n.y + 3);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [viewMode]);

  const toggleView = (mode: 'constellation' | 'heatmap') => {
    audio8D.playStarLockSound();
    setViewMode(mode);
  };

  const categories = ['Backend & Systems', 'Frontend & Graphics', 'DevOps & AI', 'L&D & Leadership'];

  return (
    <div className="space-y-4 font-mono">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#7C8AA6]/20 gap-2">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#4DEBFF]" />
          <span className="font-bold text-xs text-[#4DEBFF] uppercase tracking-wider">
            TECHNICAL PROFICIENCY MATRIX
          </span>
        </div>

        <div className="flex rounded-lg bg-[#050810] p-1 border border-[#7C8AA6]/20 text-[11px]">
          <button
            onClick={() => toggleView('constellation')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
              viewMode === 'constellation'
                ? 'bg-[#4DEBFF] text-[#050810] font-bold'
                : 'text-[#7C8AA6] hover:text-[#EAF0FA]'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>8D GRAPH</span>
          </button>
          <button
            onClick={() => toggleView('heatmap')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
              viewMode === 'heatmap'
                ? 'bg-[#4DEBFF] text-[#050810] font-bold'
                : 'text-[#7C8AA6] hover:text-[#EAF0FA]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>HEATMAP</span>
          </button>
        </div>
      </div>

      {viewMode === 'constellation' ? (
        <div className="relative rounded-2xl bg-[#03050A] border border-[#4DEBFF]/30 overflow-hidden p-2">
          <canvas
            ref={canvasRef}
            width={340}
            height={260}
            className="w-full h-[260px] rounded-xl"
          />
          <div className="absolute bottom-3 left-3 text-[10px] text-[#7C8AA6]">
            8D Cosmic Skill Nodes connected by domain affinity
          </div>
        </div>
      ) : (
        <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
          {categories.map((cat) => {
            const catSkills = SKILLS.filter((s) => s.category === cat);
            return (
              <div key={cat} className="p-3 rounded-xl bg-[#050810] border border-[#7C8AA6]/20 space-y-2">
                <div className="flex items-center gap-2">
                  {getIcon(cat)}
                  <span className="text-xs font-bold text-[#EAF0FA]">{cat}</span>
                </div>
                <div className="space-y-1.5">
                  {catSkills.map((sk) => (
                    <button
                      key={sk.id}
                      onClick={() => {
                        audio8D.playStarLockSound();
                        onSelectSkill(sk.id);
                      }}
                      className="w-full text-left p-2 rounded-lg bg-[#0A101D] border border-[#7C8AA6]/15 hover:border-[#4DEBFF] transition-all flex items-center justify-between text-xs cursor-pointer group"
                    >
                      <span className="text-[#EAF0FA] group-hover:text-[#4DEBFF] font-semibold">{sk.name}</span>
                      <span className="text-[10px] text-[#4DEBFF] px-2 py-0.5 rounded bg-[#4DEBFF]/10 border border-[#4DEBFF]/30">
                        {sk.expertiseLevel}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
