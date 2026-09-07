import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { X, Sparkles, Code, Play, CheckCircle2, RotateCcw, Cpu, Box, Flame, ShieldAlert } from 'lucide-react';
import type { ArtifactProject } from '../data/projects';
import { audio8D } from '../utils/audio8D';

interface RelicInspectorModalProps {
  artifact: ArtifactProject | null;
  isOpen: boolean;
  onClose: () => void;
}

// 3D Procedural Specimen Model renderer for Three.js canvas
function Specimen3DModel({
  artifactType,
  wireframe,
  explode,
}: {
  artifactType: string;
  wireframe: boolean;
  explode: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  const getGeometry = () => {
    switch (artifactType) {
      case 'relic':
        return <octahedronGeometry args={[2, 0]} />;
      case 'stele':
        return <boxGeometry args={[1.8, 3.2, 0.6]} />;
      case 'fossilized_scroll':
        return <cylinderGeometry args={[0.8, 0.8, 3, 16]} />;
      case 'pottery_sherd':
        return <icosahedronGeometry args={[2, 0]} />;
      default:
        return <dodecahedronGeometry args={[2, 0]} />;
    }
  };

  const scale = explode ? 1.3 : 1.0;

  return (
    <group ref={meshRef} scale={[scale, scale, scale]}>
      <mesh>
        {getGeometry()}
        <meshStandardMaterial
          color="#E8C468"
          roughness={0.2}
          metalness={0.8}
          wireframe={wireframe}
          emissive="#B9673A"
          emissiveIntensity={0.25}
        />
      </mesh>

      {explode && (
        <group>
          <mesh position={[2, 0, 0]}>
            <sphereGeometry args={[0.5, 12, 12]} />
            <meshStandardMaterial color="#B9673A" wireframe />
          </mesh>
          <mesh position={[-2, 0, 0]}>
            <sphereGeometry args={[0.5, 12, 12]} />
            <meshStandardMaterial color="#D9A86C" wireframe />
          </mesh>
        </group>
      )}

      <pointLight position={[0, 0, 0]} intensity={1.5} color="#E8C468" />
    </group>
  );
}

export const RelicInspectorModal: React.FC<RelicInspectorModalProps> = ({
  artifact,
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

  if (!isOpen || !artifact) return null;

  // Sandbox logic handlers
  const handleAnalyzeSQL = () => {
    audio8D.playDigSound();
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
    audio8D.playUnearthChime();
    setGroqOutput(`🚀 **Release v1.2.0 Synthesized via Groq AI (llama-3.3-70b)**\n\n### ✨ Features\n- Added Groq LLM release note synthesis engine\n\n### 🐛 Bug Fixes\n- Resolved AST parser locking edge cases during PostgreSQL schema migrations`);
  };

  const handleRunSortVisualizer = () => {
    audio8D.playDigSound();
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
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col dirt-glass-gold rounded-3xl overflow-hidden shadow-2xl border border-[#E8C468]/50">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#D9A86C]/20 bg-[#140A05]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-[#241408] border border-[#E8C468]/40">
              <Sparkles className="w-5 h-5 text-[#E8C468]" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#E8C468] uppercase tracking-wider">
                  SPECIMEN #{artifact.id}
                </span>
                <span className="text-[10px] font-mono text-[#A88A66] px-2 py-0.5 rounded bg-[#241408]">
                  DEPTH: {artifact.depth}m
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-editorial font-bold text-[#F2E8D5]">
                {artifact.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#241408] text-[#A88A66] hover:text-[#F2E8D5] border border-[#D9A86C]/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-[#0C0603] px-6 pt-3 border-b border-[#D9A86C]/20 gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('3d')}
            className={`py-2 px-4 rounded-t-xl font-bold flex items-center gap-2 border-t border-x transition-colors ${
              activeTab === '3d'
                ? 'bg-[#1A0E08] text-[#E8C468] border-[#E8C468]/40'
                : 'bg-transparent text-[#A88A66] border-transparent hover:text-[#F2E8D5]'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>8D 3D RELIC INSPECTOR</span>
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`py-2 px-4 rounded-t-xl font-bold flex items-center gap-2 border-t border-x transition-colors ${
              activeTab === 'sandbox'
                ? 'bg-[#1A0E08] text-[#E8C468] border-[#E8C468]/40'
                : 'bg-transparent text-[#A88A66] border-transparent hover:text-[#F2E8D5]'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>LIVE INTERACTIVE SANDBOX</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`py-2 px-4 rounded-t-xl font-bold flex items-center gap-2 border-t border-x transition-colors ${
              activeTab === 'metrics'
                ? 'bg-[#1A0E08] text-[#E8C468] border-[#E8C468]/40'
                : 'bg-transparent text-[#A88A66] border-transparent hover:text-[#F2E8D5]'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>SYSTEM METRICS & TECH STACK</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#1A0E08] space-y-6 custom-scrollbar">
          {activeTab === '3d' && (
            <div className="space-y-4">
              <div className="relative h-72 rounded-2xl bg-[#0C0603] border border-[#E8C468]/30 overflow-hidden shadow-inner flex items-center justify-center">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} color="#E8C468" />
                  <Specimen3DModel
                    artifactType={artifact.artifactType}
                    wireframe={wireframe}
                    explode={explode}
                  />
                </Canvas>

                {/* 3D Control Bar Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-[#140A05]/80 backdrop-blur-md p-2 rounded-xl border border-[#E8C468]/30 font-mono text-xs">
                  <span className="text-[#A88A66]">DRAG CANVAS TO ROTATE SPECIMEN</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWireframe(!wireframe)}
                      className={`px-3 py-1 rounded-lg border transition-colors ${
                        wireframe
                          ? 'bg-[#E8C468] text-[#140A05] font-bold border-[#E8C468]'
                          : 'bg-[#241408] text-[#A88A66] border-[#D9A86C]/20 hover:text-[#F2E8D5]'
                      }`}
                    >
                      HOLOGRAM WIREFRAME
                    </button>
                    <button
                      onClick={() => setExplode(!explode)}
                      className={`px-3 py-1 rounded-lg border transition-colors ${
                        explode
                          ? 'bg-[#B9673A] text-white font-bold border-[#E8C468]'
                          : 'bg-[#241408] text-[#A88A66] border-[#D9A86C]/20 hover:text-[#F2E8D5]'
                      }`}
                    >
                      EXPLODE SCHEMATIC
                    </button>
                  </div>
                </div>
              </div>

              <div className="dirt-glass p-5 rounded-2xl space-y-2 border border-[#D9A86C]/20">
                <h4 className="text-base font-editorial font-bold text-[#E8C468]">
                  Specimen Provenance & Architectural Context
                </h4>
                <p className="text-sm text-[#F2E8D5]/90 font-sans leading-relaxed">
                  {artifact.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                  <span className="text-[#A88A66]">Impact Category:</span>
                  <span className="text-[#E8C468] font-semibold">{artifact.impactCategory}</span>
                  <span className="text-[#A88A66]">· Role:</span>
                  <span className="text-[#F2E8D5]">{artifact.role} ({artifact.dates})</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sandbox' && (
            <div className="space-y-4">
              <div className="dirt-glass p-5 rounded-2xl border border-[#E8C468]/30 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#D9A86C]/20 pb-2">
                  <span className="font-bold text-[#E8C468] flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> INTERACTIVE LIVE LOGIC SIMULATOR
                  </span>
                  <span className="text-[#A88A66] text-[11px]">TARGET: {artifact.id.toUpperCase()}</span>
                </div>

                {/* Schema-Sentinel SQL Risk Sandbox */}
                {artifact.id === 'schema-sentinel' && (
                  <div className="space-y-3">
                    <p className="text-[#A88A66] text-[11px]">
                      Test PostgreSQL AST Pre-Migration Risk Engine against custom DDL statements:
                    </p>
                    <div className="space-y-1">
                      <textarea
                        rows={3}
                        value={sqlQuery}
                        onChange={(e) => setSqlQuery(e.target.value)}
                        className="w-full bg-[#0C0603] border border-[#D9A86C]/30 rounded-xl p-3 text-xs text-[#E8C468] font-code focus:outline-none focus:border-[#E8C468]"
                      />
                    </div>
                    <button
                      onClick={handleAnalyzeSQL}
                      className="px-4 py-2 rounded-xl bg-[#E8C468] text-[#140A05] font-bold hover:bg-[#F2E8D5] transition-colors flex items-center gap-2 cursor-pointer"
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
                {artifact.id === 'devstarter' && (
                  <div className="space-y-3">
                    <p className="text-[#A88A66] text-[11px]">
                      Select language stack to generate zero-config devcontainer template:
                    </p>
                    <div className="flex gap-2">
                      {['java', 'python', 'go', 'rust', 'node'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setDevLang(lang)}
                          className={`px-3 py-1.5 rounded-lg border uppercase transition-colors ${
                            devLang === lang
                              ? 'bg-[#E8C468] text-[#140A05] font-bold border-[#E8C468]'
                              : 'bg-[#241408] text-[#A88A66] border-[#D9A86C]/20'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                    <pre className="p-3 bg-[#0C0603] border border-[#D9A86C]/20 rounded-xl text-[11px] text-[#D9A86C]">
                      <code>{`{\n  "name": "${devLang.toUpperCase()} Devcontainer",\n  "image": "mcr.microsoft.com/devcontainers/${devLang}:latest",\n  "customizations": { "vscode": { "extensions": ["vscjava.vscode-java-pack"] } }\n}`}</code>
                    </pre>
                  </div>
                )}

                {/* Rel_Notes Groq AI Release Notes Sandbox */}
                {artifact.id === 'rel-notes' && (
                  <div className="space-y-3">
                    <p className="text-[#A88A66] text-[11px]">
                      Paste raw Git commit logs to synthesize AI release notes via Groq LLM:
                    </p>
                    <textarea
                      rows={3}
                      value={commitsInput}
                      onChange={(e) => setCommitsInput(e.target.value)}
                      className="w-full bg-[#0C0603] border border-[#D9A86C]/30 rounded-xl p-3 text-xs text-[#F2E8D5] font-code focus:outline-none"
                    />
                    <button
                      onClick={handleSynthesizeNotes}
                      className="px-4 py-2 rounded-xl bg-[#E8C468] text-[#140A05] font-bold hover:bg-[#F2E8D5] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>SYNTHESIZE RELEASE NOTES (GROQ AI)</span>
                    </button>
                    {groqOutput && (
                      <pre className="p-4 bg-[#0C0603] border border-[#E8C468]/30 rounded-xl text-xs text-[#E8C468] whitespace-pre-wrap">
                        {groqOutput}
                      </pre>
                    )}
                  </div>
                )}

                {/* Java Searching & Sorting Visualizer Sandbox */}
                {(artifact.id === 'java-searching-sorting-visualizer' || artifact.id.includes('java')) && artifact.id !== 'schema-sentinel' && artifact.id !== 'devstarter' && artifact.id !== 'rel-notes' && (
                  <div className="space-y-3">
                    <p className="text-[#A88A66] text-[11px]">
                      Interactive Searching & Sorting Algorithmic Step Simulator:
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5 flex-1">
                        {sortArray.map((val, idx) => (
                          <div
                            key={idx}
                            style={{ height: `${val}px` }}
                            className="flex-1 bg-[#E8C468] rounded-t border border-[#B9673A] flex items-end justify-center text-[10px] text-[#140A05] font-bold pb-0.5"
                          >
                            {val}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleRunSortVisualizer}
                        className="px-4 py-2 rounded-xl bg-[#E8C468] text-[#140A05] font-bold hover:bg-[#F2E8D5] transition-colors flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>SORT</span>
                      </button>
                    </div>
                    {sortingSteps.length > 0 && (
                      <div className="p-3 bg-[#0C0603] rounded-xl border border-[#D9A86C]/20 space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                        {sortingSteps.map((st, i) => (
                          <p key={i} className="text-[11px] text-[#A88A66]">{st}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Default Fallback Simulator */}
                {artifact.id !== 'schema-sentinel' && artifact.id !== 'devstarter' && artifact.id !== 'rel-notes' && !artifact.id.includes('java') && (
                  <div className="space-y-3">
                    <p className="text-[#A88A66] text-[11px]">
                      Fossilized Code Execution Sandbox & AST Inspection:
                    </p>
                    {artifact.codeSnippet ? (
                      <pre className="p-4 bg-[#0C0603] border border-[#E8C468]/30 rounded-xl text-xs text-[#E8C468]">
                        <code>{artifact.codeSnippet}</code>
                      </pre>
                    ) : (
                      <div className="p-4 bg-[#0C0603] border border-[#D9A86C]/20 rounded-xl text-[#A88A66]">
                        ⚡ System Architecture & Pedagogical Milestone Specimen. Verified against production standards.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <div className="dirt-glass p-5 rounded-2xl border border-[#D9A86C]/20 space-y-4">
                <h4 className="text-base font-editorial font-bold text-[#E8C468] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#E8C468]" />
                  <span>RECRUITER IMPACT & VERIFIED METRICS</span>
                </h4>
                <ul className="space-y-2">
                  {artifact.impactMetrics.map((m, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-[#140A05] border border-[#E8C468]/20 text-sm text-[#F2E8D5] flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#E8C468]/20 text-[#E8C468] flex items-center justify-center font-mono font-bold text-xs">
                        {idx + 1}
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#140A05] border border-[#D9A86C]/20 space-y-3 font-mono text-xs">
                <span className="text-[#A88A66]">TECHNOLOGY TAGS:</span>
                <div className="flex flex-wrap gap-2">
                  {artifact.techTags.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-[#241408] border border-[#E8C468]/30 text-[#E8C468]">
                      #{t}
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
