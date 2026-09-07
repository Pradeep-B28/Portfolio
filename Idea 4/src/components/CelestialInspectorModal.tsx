import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { X, Sparkles, Code, Play, CheckCircle2, RotateCcw, Cpu, Box, Flame, ShieldAlert } from 'lucide-react';
import type { ConstellationProject } from '../data/projects';
import { audio8D } from '../utils/audio8D';

interface CelestialInspectorModalProps {
  project: ConstellationProject | null;
  isOpen: boolean;
  onClose: () => void;
}

// 3D Procedural Specimen Model renderer for Three.js canvas
function Celestial3DModel({
  isAnchor,
  wireframe,
  explode,
}: {
  isAnchor: boolean;
  wireframe: boolean;
  explode: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.45;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.18;
    }
  });

  const scale = explode ? 1.35 : 1.0;
  const primaryColor = isAnchor ? '#4DEBFF' : '#E8C468';
  const emissiveColor = isAnchor ? '#B55FE6' : '#B9673A';

  return (
    <group ref={meshRef} scale={[scale, scale, scale]}>
      <mesh>
        {isAnchor ? <icosahedronGeometry args={[2.2, 1]} /> : <octahedronGeometry args={[2.2, 0]} />}
        <meshStandardMaterial
          color={primaryColor}
          roughness={0.15}
          metalness={0.85}
          wireframe={wireframe}
          emissive={emissiveColor}
          emissiveIntensity={0.35}
        />
      </mesh>

      {explode && (
        <group>
          <mesh position={[2.4, 0, 0]}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial color="#4DEBFF" wireframe />
          </mesh>
          <mesh position={[-2.4, 0, 0]}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial color="#B55FE6" wireframe />
          </mesh>
        </group>
      )}

      <pointLight position={[0, 0, 0]} intensity={1.8} color={primaryColor} />
    </group>
  );
}

export const CelestialInspectorModal: React.FC<CelestialInspectorModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [wireframe, setWireframe] = useState(false);
  const [explode, setExplode] = useState(false);
  const [activeTab, setActiveTab] = useState<'3d' | 'sandbox' | 'metrics'>('3d');

  // Sandbox States
  const [sqlQuery, setSqlQuery] = useState('ALTER TABLE users DROP COLUMN phone_number;');
  const [sqlRiskResult, setSqlRiskResult] = useState<{ severity: string; locks: string; recommendation: string } | null>(null);

  const [devLang, setDevLang] = useState('java');
  const [commitsInput, setCommitsInput] = useState('feat: add Groq LLM release note synthesis\nfix: handle AST parser locking edge cases');
  const [groqOutput, setGroqOutput] = useState<string | null>(null);

  const [sortArray, setSortArray] = useState<number[]>([45, 12, 89, 34, 67, 23, 90]);
  const [sortingSteps, setSortingSteps] = useState<string[]>([]);

  if (!isOpen || !project) return null;

  // Sandbox logic handlers
  const handleAnalyzeSQL = () => {
    audio8D.playStarLockSound();
    const query = sqlQuery.toUpperCase();
    if (query.includes('DROP') || query.includes('ALTER TABLE')) {
      setSqlRiskResult({
        severity: 'CRITICAL',
        locks: 'Exclusive Access Lock (ACCESS EXCLUSIVE)',
        recommendation: 'Use dual-writing or asynchronous column deprecation pattern before dropping.',
      });
    } else {
      setSqlRiskResult({
        severity: 'LOW',
        locks: 'Row Share Lock (RowShare)',
        recommendation: 'Safe migration query. Can be executed in production CI/CD without table locks.',
      });
    }
  };

  const handleSynthesizeNotes = () => {
    audio8D.playConstellationWarp();
    setGroqOutput(`🚀 **Release v1.2.0 Synthesized via Groq AI (llama-3.3-70b)**\n\n### ✨ Features\n- Added Groq LLM release note synthesis engine\n\n### 🐛 Bug Fixes\n- Resolved AST parser locking edge cases during PostgreSQL schema migrations`);
  };

  const handleRunSortVisualizer = () => {
    audio8D.playStarLockSound();
    const arr = [...sortArray];
    const steps: string[] = [`Initial Array: [${arr.join(', ')}]`];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          steps.push(`Swapped ${arr[j+1]} & ${arr[j]} ➔ [${arr.join(', ')}]`);
        }
      }
    }
    steps.push(`Sorted Result: [${arr.join(', ')}]`);
    setSortArray(arr);
    setSortingSteps(steps);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col space-glass-gold rounded-3xl overflow-hidden shadow-2xl border border-[#4DEBFF]/50">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#7C8AA6]/20 bg-[#050810]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-[#0A101D] border border-[#4DEBFF]/40">
              <Sparkles className="w-5 h-5 text-[#4DEBFF]" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#4DEBFF] uppercase tracking-wider">
                  CONSTELLATION #{project.id}
                </span>
                <span className="text-[10px] font-mono text-[#E8C468] px-2 py-0.5 rounded bg-[#0A101D]">
                  YEAR: {project.year}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#EAF0FA]">
                {project.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0A101D] text-[#7C8AA6] hover:text-[#EAF0FA] border border-[#7C8AA6]/30 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-[#03050A] px-6 pt-3 border-b border-[#7C8AA6]/20 gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('3d')}
            className={`py-2 px-4 rounded-t-xl font-bold flex items-center gap-2 border-t border-x transition-colors ${
              activeTab === '3d'
                ? 'bg-[#050810] text-[#4DEBFF] border-[#4DEBFF]/40'
                : 'bg-transparent text-[#7C8AA6] border-transparent hover:text-[#EAF0FA]'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>8D 3D CELESTIAL INSPECTOR</span>
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`py-2 px-4 rounded-t-xl font-bold flex items-center gap-2 border-t border-x transition-colors ${
              activeTab === 'sandbox'
                ? 'bg-[#050810] text-[#4DEBFF] border-[#4DEBFF]/40'
                : 'bg-transparent text-[#7C8AA6] border-transparent hover:text-[#EAF0FA]'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>LIVE INTERACTIVE SANDBOX</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`py-2 px-4 rounded-t-xl font-bold flex items-center gap-2 border-t border-x transition-colors ${
              activeTab === 'metrics'
                ? 'bg-[#050810] text-[#4DEBFF] border-[#4DEBFF]/40'
                : 'bg-transparent text-[#7C8AA6] border-transparent hover:text-[#EAF0FA]'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>SYSTEM METRICS & CONNECTED SKILLS</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#050810] space-y-6 custom-scrollbar">
          {activeTab === '3d' && (
            <div className="space-y-4">
              <div className="relative h-72 rounded-2xl bg-[#03050A] border border-[#4DEBFF]/30 overflow-hidden shadow-inner flex items-center justify-center">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} color="#4DEBFF" />
                  <Celestial3DModel
                    isAnchor={project.isAnchor}
                    wireframe={wireframe}
                    explode={explode}
                  />
                </Canvas>

                {/* 3D Control Bar Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-[#050810]/80 backdrop-blur-md p-2 rounded-xl border border-[#4DEBFF]/30 font-mono text-xs">
                  <span className="text-[#7C8AA6]">DRAG CANVAS TO ROTATE CELESTIAL NODE</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWireframe(!wireframe)}
                      className={`px-3 py-1 rounded-lg border transition-colors ${
                        wireframe
                          ? 'bg-[#4DEBFF] text-[#050810] font-bold border-[#4DEBFF]'
                          : 'bg-[#0A101D] text-[#7C8AA6] border-[#7C8AA6]/20 hover:text-[#EAF0FA]'
                      }`}
                    >
                      HOLOGRAM WIREFRAME
                    </button>
                    <button
                      onClick={() => setExplode(!explode)}
                      className={`px-3 py-1 rounded-lg border transition-colors ${
                        explode
                          ? 'bg-[#B55FE6] text-white font-bold border-[#4DEBFF]'
                          : 'bg-[#0A101D] text-[#7C8AA6] border-[#7C8AA6]/20 hover:text-[#EAF0FA]'
                      }`}
                    >
                      SUPERNOVA EXPLODE
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-glass p-5 rounded-2xl space-y-2 border border-[#7C8AA6]/20">
                <h4 className="text-base font-bold text-[#4DEBFF]">
                  Constellation Overview & Context
                </h4>
                <p className="text-sm text-[#EAF0FA]/90 font-mono leading-relaxed">
                  {project.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                  <span className="text-[#7C8AA6]">Category:</span>
                  <span className="text-[#E8C468] font-semibold">{project.category}</span>
                  <span className="text-[#7C8AA6]">· Role:</span>
                  <span className="text-[#EAF0FA]">{project.role} ({project.dates})</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sandbox' && (
            <div className="space-y-4">
              <div className="space-glass p-5 rounded-2xl border border-[#4DEBFF]/30 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#7C8AA6]/20 pb-2">
                  <span className="font-bold text-[#4DEBFF] flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> INTERACTIVE LIVE LOGIC SIMULATOR
                  </span>
                  <span className="text-[#7C8AA6] text-[11px]">TARGET: {project.id.toUpperCase()}</span>
                </div>

                {/* Schema-Sentinel SQL Risk Sandbox */}
                {project.id === 'schema-sentinel' && (
                  <div className="space-y-3">
                    <p className="text-[#7C8AA6] text-[11px]">
                      Test PostgreSQL AST Pre-Migration Risk Engine against custom DDL statements:
                    </p>
                    <div className="space-y-1">
                      <textarea
                        rows={3}
                        value={sqlQuery}
                        onChange={(e) => setSqlQuery(e.target.value)}
                        className="w-full bg-[#03050A] border border-[#7C8AA6]/30 rounded-xl p-3 text-xs text-[#4DEBFF] font-mono focus:outline-none focus:border-[#4DEBFF]"
                      />
                    </div>
                    <button
                      onClick={handleAnalyzeSQL}
                      className="px-4 py-2 rounded-xl bg-[#4DEBFF] text-[#050810] font-bold hover:bg-[#EAF0FA] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>RUN AST RISK EVALUATION</span>
                    </button>

                    {sqlRiskResult && (
                      <div className={`p-4 rounded-xl border space-y-1 ${
                        sqlRiskResult.severity === 'CRITICAL'
                          ? 'bg-red-950/40 border-red-500/50 text-red-200'
                          : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      }`}>
                        <div className="flex items-center justify-between font-bold">
                          <span className="flex items-center gap-1.5">
                            <ShieldAlert className="w-4 h-4" /> RISK LEVEL: {sqlRiskResult.severity}
                          </span>
                          <span>LOCK: {sqlRiskResult.locks}</span>
                        </div>
                        <p className="text-[11px] opacity-90">{sqlRiskResult.recommendation}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Devstarter Devcontainer Generator Sandbox */}
                {project.id === 'devstarter' && (
                  <div className="space-y-3">
                    <p className="text-[#7C8AA6] text-[11px]">
                      Select language stack to generate zero-config devcontainer template:
                    </p>
                    <div className="flex gap-2">
                      {['java', 'python', 'go', 'rust', 'node'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setDevLang(lang)}
                          className={`px-3 py-1.5 rounded-lg border uppercase transition-colors ${
                            devLang === lang
                              ? 'bg-[#4DEBFF] text-[#050810] font-bold border-[#4DEBFF]'
                              : 'bg-[#0A101D] text-[#7C8AA6] border-[#7C8AA6]/20'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                    <pre className="p-3 bg-[#03050A] border border-[#7C8AA6]/20 rounded-xl text-[11px] text-[#4DEBFF]">
                      <code>{`{\n  "name": "${devLang.toUpperCase()} Devcontainer",\n  "image": "mcr.microsoft.com/devcontainers/${devLang}:latest",\n  "customizations": { "vscode": { "extensions": ["vscjava.vscode-java-pack"] } }\n}`}</code>
                    </pre>
                  </div>
                )}

                {/* Rel_Notes Groq AI Release Notes Sandbox */}
                {project.id === 'rel-notes' && (
                  <div className="space-y-3">
                    <p className="text-[#7C8AA6] text-[11px]">
                      Paste raw Git commit logs to synthesize AI release notes via Groq LLM:
                    </p>
                    <textarea
                      rows={3}
                      value={commitsInput}
                      onChange={(e) => setCommitsInput(e.target.value)}
                      className="w-full bg-[#03050A] border border-[#7C8AA6]/30 rounded-xl p-3 text-xs text-[#EAF0FA] font-mono focus:outline-none"
                    />
                    <button
                      onClick={handleSynthesizeNotes}
                      className="px-4 py-2 rounded-xl bg-[#4DEBFF] text-[#050810] font-bold hover:bg-[#EAF0FA] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>SYNTHESIZE RELEASE NOTES (GROQ AI)</span>
                    </button>
                    {groqOutput && (
                      <pre className="p-4 bg-[#03050A] border border-[#4DEBFF]/30 rounded-xl text-xs text-[#4DEBFF] whitespace-pre-wrap">
                        {groqOutput}
                      </pre>
                    )}
                  </div>
                )}

                {/* Java Searching & Sorting Visualizer Sandbox */}
                {(project.id.includes('visualizer') || project.id.includes('java')) && project.id !== 'schema-sentinel' && project.id !== 'devstarter' && project.id !== 'rel-notes' && (
                  <div className="space-y-3">
                    <p className="text-[#7C8AA6] text-[11px]">
                      Interactive Searching & Sorting Algorithmic Step Simulator:
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5 flex-1">
                        {sortArray.map((val, idx) => (
                          <div
                            key={idx}
                            style={{ height: `${val}px` }}
                            className="flex-1 bg-[#4DEBFF] rounded-t border border-[#B55FE6] flex items-end justify-center text-[10px] text-[#050810] font-bold pb-0.5"
                          >
                            {val}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleRunSortVisualizer}
                        className="px-4 py-2 rounded-xl bg-[#4DEBFF] text-[#050810] font-bold hover:bg-[#EAF0FA] transition-colors flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>SORT</span>
                      </button>
                    </div>
                    {sortingSteps.length > 0 && (
                      <div className="p-3 bg-[#03050A] rounded-xl border border-[#7C8AA6]/20 space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                        {sortingSteps.map((st, i) => (
                          <p key={i} className="text-[11px] text-[#7C8AA6]">{st}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Default Fallback Simulator */}
                {project.id !== 'schema-sentinel' && project.id !== 'devstarter' && project.id !== 'rel-notes' && !project.id.includes('java') && (
                  <div className="space-y-3">
                    <p className="text-[#7C8AA6] text-[11px]">
                      Code Execution Sandbox & AST Inspection:
                    </p>
                    {project.codeSnippet ? (
                      <pre className="p-4 bg-[#03050A] border border-[#4DEBFF]/30 rounded-xl text-xs text-[#4DEBFF]">
                        <code>{project.codeSnippet}</code>
                      </pre>
                    ) : (
                      <div className="p-4 bg-[#03050A] border border-[#7C8AA6]/20 rounded-xl text-[#7C8AA6]">
                        ⚡ System Architecture & Pedagogical Milestone Specimen. Verified against production standards.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-4 font-mono">
              <div className="space-glass p-5 rounded-2xl border border-[#7C8AA6]/20 space-y-4">
                <h4 className="text-base font-bold text-[#4DEBFF] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#4DEBFF]" />
                  <span>RECRUITER IMPACT & VERIFIED METRICS</span>
                </h4>
                <ul className="space-y-2">
                  {project.impactMetrics.map((m, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-[#0A101D] border border-[#4DEBFF]/20 text-sm text-[#EAF0FA] flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#4DEBFF]/20 text-[#4DEBFF] flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#0A101D] border border-[#7C8AA6]/20 space-y-3 text-xs">
                <span className="text-[#7C8AA6]">CONNECTED SKILL NODES:</span>
                <div className="flex flex-wrap gap-2">
                  {project.connectedSkillIds.map((sk, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-[#050810] border border-[#4DEBFF]/30 text-[#4DEBFF]">
                      #{sk.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
