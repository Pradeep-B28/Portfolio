import React, { useState, useRef, useEffect } from 'react';
import { SKILLS_MATRIX } from '../data/skills';
import { Cpu, Boxes, Terminal, GraduationCap, Award, Flame, Network, LayoutGrid } from 'lucide-react';
import { audio8D } from '../utils/audio8D';

export const SkillsMatrixHeatmap: React.FC = () => {
  const [viewMode, setViewMode] = useState<'heatmap' | 'constellation'>('heatmap');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#E8C468]" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-[#E8C468]" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-[#E8C468]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#E8C468]" />;
      default:
        return <Award className="w-5 h-5 text-[#E8C468]" />;
    }
  };

  const getHeatColor = (pct: number) => {
    if (pct >= 95) return 'from-[#E8C468] to-[#B9673A] text-[#140A05] font-bold';
    if (pct >= 90) return 'from-[#D9A86C] to-[#B9673A] text-[#140A05] font-semibold';
    if (pct >= 85) return 'from-[#B9673A] to-[#844322] text-[#F2E8D5]';
    return 'from-[#844322] to-[#532B19] text-[#F2E8D5]';
  };

  // 8D Constellation Canvas Rendering Loop
  useEffect(() => {
    if (viewMode !== 'constellation') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = 380;

    let animId: number;
    const allSkills = SKILLS_MATRIX.flatMap((d) => d.skills);
    const nodes = allSkills.map((s, i) => {
      const angle = (i / allSkills.length) * Math.PI * 2;
      const radius = 100 + Math.random() * 40;
      return {
        name: s.name,
        pct: s.proficiencyPct,
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      ctx.strokeStyle = 'rgba(232, 196, 104, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
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

        const size = (n.pct / 100) * 8 + 3;
        ctx.fillStyle = '#E8C468';
        ctx.shadowColor = '#E8C468';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#F2E8D5';
        ctx.font = '10px Fira Code, monospace';
        ctx.fillText(n.name, n.x + 10, n.y + 3);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [viewMode]);

  const toggleView = (mode: 'heatmap' | 'constellation') => {
    audio8D.playDigSound();
    setViewMode(mode);
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#D9A86C]/20 gap-3">
        <div>
          <h4 className="text-lg font-editorial font-bold text-[#F2E8D5] flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#E8C468]" />
            <span>TECHNICAL PROFICIENCY & SKILLS MATRIX</span>
          </h4>
          <p className="text-xs text-[#A88A66] font-sans">
            Recruiter Heatmap across Systems Architecture, Full-Stack, Tooling & L&D Leadership
          </p>
        </div>

        <div className="flex rounded-lg bg-[#140A05] p-1 border border-[#D9A86C]/20 text-xs">
          <button
            onClick={() => toggleView('heatmap')}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'heatmap'
                ? 'bg-[#E8C468] text-[#140A05] font-bold'
                : 'text-[#A88A66] hover:text-[#F2E8D5]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>HEATMAP</span>
          </button>
          <button
            onClick={() => toggleView('constellation')}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'constellation'
                ? 'bg-[#E8C468] text-[#140A05] font-bold'
                : 'text-[#A88A66] hover:text-[#F2E8D5]'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>8D CONSTELLATION</span>
          </button>
        </div>
      </div>

      {viewMode === 'heatmap' ? (
        <div className="space-y-6 font-sans">
          {SKILLS_MATRIX.map((domain, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#140A05]/70 border border-[#D9A86C]/20 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#241408] border border-[#E8C468]/30">
                  {getIcon(domain.iconName)}
                </div>
                <div>
                  <h5 className="text-sm font-editorial font-bold text-[#F2E8D5]">{domain.domainName}</h5>
                  <p className="text-xs text-[#A88A66]">{domain.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {domain.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-lg bg-[#241408]/90 border border-[#D9A86C]/15 space-y-2 hover:border-[#E8C468]/40 transition-colors"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#F2E8D5]">{skill.name}</span>
                      <span className="font-mono text-[11px] text-[#E8C468] px-2 py-0.5 rounded bg-[#E8C468]/10 border border-[#E8C468]/30">
                        {skill.level} ({skill.proficiencyPct}%)
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-[#140A05] overflow-hidden border border-[#D9A86C]/10">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${getHeatColor(
                          skill.proficiencyPct
                        )} transition-all duration-500`}
                        style={{ width: `${skill.proficiencyPct}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-[#A88A66] font-mono leading-tight">
                      ⚡ {skill.highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative rounded-2xl bg-[#0C0603] border border-[#E8C468]/30 overflow-hidden p-2">
          <canvas
            ref={canvasRef}
            width={600}
            height={380}
            className="w-full h-[380px] rounded-xl"
          />
          <div className="absolute bottom-4 left-4 text-[11px] text-[#A88A66]">
            8D Skill Nodes connected by architectural domain affinity
          </div>
        </div>
      )}
    </div>
  );
};
