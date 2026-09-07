import React, { useState } from 'react';
import { X, ShieldAlert, ShieldCheck, Cpu, Play, Terminal, Activity } from 'lucide-react';

interface SQLGameModalProps { onClose: () => void; }
type RiskLevel = 'SAFE' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
type RiskResult = { score: number; level: RiskLevel; lockRisk: number; integrityRisk: number; compatRisk: number; perfRisk: number; recommendation: string };

const presets: Array<{ label: string; sql: string; result: RiskResult }> = [
  { label: 'DESTRUCTIVE / DROP COLUMN', sql: 'ALTER TABLE users DROP COLUMN phone_number;', result: { score: 8.5, level: 'CRITICAL', lockRisk: 9, integrityRisk: 10, compatRisk: 8, perfRisk: 7, recommendation: 'DROP COLUMN causes immediate data loss and breaks downstream API models. Deprecate column first, then remove in a later release.' } },
  { label: 'UNBOUNDED / UPDATE', sql: "UPDATE orders SET status = 'ARCHIVED';", result: { score: 9.2, level: 'CRITICAL', lockRisk: 10, integrityRisk: 10, compatRisk: 7, perfRisk: 9, recommendation: 'Unbounded UPDATE locks table rows and spikes CPU under high load. Add explicit WHERE clause and batch execution.' } },
  { label: 'SAFE / CONCURRENT INDEX', sql: 'CREATE INDEX CONCURRENTLY idx_users_email ON users(email);', result: { score: 1.5, level: 'SAFE', lockRisk: 1, integrityRisk: 0, compatRisk: 1, perfRisk: 3, recommendation: 'CONCURRENTLY avoids exclusive ACCESS EXCLUSIVE locks during index creation. Approved for zero-downtime deploy.' } },
  { label: 'SAFE / NULLABLE COLUMN', sql: 'ALTER TABLE users ADD COLUMN bio TEXT;', result: { score: 0.8, level: 'SAFE', lockRisk: 1, integrityRisk: 0, compatRisk: 0, perfRisk: 1, recommendation: 'Adding a nullable column requires a minimal metadata lock in PostgreSQL 11+.' } },
];

const analyze = (query: string): RiskResult => {
  const sql = query.trim().toUpperCase();
  if (!sql) {
    return { score: 0, level: 'SAFE', lockRisk: 0, integrityRisk: 0, compatRisk: 0, perfRisk: 0, recommendation: 'Enter a valid SQL statement to analyze migration risk.' };
  }

  if (sql.includes('DROP') || sql.includes('TRUNCATE')) {
    return {
      score: 9.5,
      level: 'CRITICAL',
      lockRisk: 9,
      integrityRisk: 10,
      compatRisk: 9,
      perfRisk: 8,
      recommendation: 'Destructive DDL statement detected. This operation causes immediate data loss and API incompatibility. Migration blocked by Schema Sentinel CI/CD gatekeeper.',
    };
  }

  if ((sql.includes('UPDATE') || sql.includes('DELETE')) && !sql.includes('WHERE')) {
    return {
      score: 9.2,
      level: 'CRITICAL',
      lockRisk: 10,
      integrityRisk: 10,
      compatRisk: 7,
      perfRisk: 9,
      recommendation: 'Unbounded DML query without a WHERE clause will lock table rows and cause high latency. Add an explicit WHERE clause or batch into smaller transactions.',
    };
  }

  if (sql.includes('ALTER TABLE') && sql.includes('ADD') && sql.includes('NOT NULL') && !sql.includes('DEFAULT')) {
    return {
      score: 7.8,
      level: 'HIGH',
      lockRisk: 8,
      integrityRisk: 6,
      compatRisk: 8,
      perfRisk: 7,
      recommendation: 'Adding NOT NULL without DEFAULT forces a full table rewrite on older engine versions. Add a default value or add NOT NULL constraint as NOT VALID first.',
    };
  }

  if (sql.includes('CONCURRENTLY')) {
    return {
      score: 1.2,
      level: 'SAFE',
      lockRisk: 1,
      integrityRisk: 0,
      compatRisk: 1,
      perfRisk: 2,
      recommendation: 'Non-blocking migration strategy approved. The CONCURRENTLY option prevents table locking during index creation.',
    };
  }

  if (sql.startsWith('SELECT') || (sql.includes('ADD COLUMN') && !sql.includes('NOT NULL'))) {
    return {
      score: 0.8,
      level: 'SAFE',
      lockRisk: 1,
      integrityRisk: 0,
      compatRisk: 0,
      perfRisk: 1,
      recommendation: 'Minimal lock requirement. Statement approved for execution.',
    };
  }

  return {
    score: 4.5,
    level: 'MEDIUM',
    lockRisk: 4,
    integrityRisk: 3,
    compatRisk: 4,
    perfRisk: 5,
    recommendation: 'Moderate risk operation. Review lock duration, query latency, and index usage under peak load before running in production.',
  };
};

export const SQLGameModal: React.FC<SQLGameModalProps> = ({ onClose }) => {
  const [sqlQuery, setSqlQuery] = useState(presets[0].sql);
  const [riskResult, setRiskResult] = useState<RiskResult>(presets[0].result);
  const selectPreset = (preset: typeof presets[number]) => { setSqlQuery(preset.sql); setRiskResult(preset.result); };
  const critical = riskResult.level === 'CRITICAL' || riskResult.level === 'HIGH';
  const gaugeColor = (value: number) => value >= 8 ? 'bg-rose-300' : value >= 4 ? 'bg-amber-200' : 'bg-emerald-300';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030610]/82 p-4 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="SQL risk simulator" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[1.75rem] border border-cyan-200/25 bg-[#080d18]/96 p-5 text-slate-100 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-8">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />
        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }} className="absolute right-5 top-5 z-50 rounded-xl border border-white/10 bg-white/10 p-2.5 text-slate-300 cursor-pointer transition hover:bg-white/20 hover:text-white" aria-label="Close SQL simulator"><X className="h-5 w-5" /></button>
        <div className="relative mb-7 flex items-center gap-4 border-b border-white/10 pb-6"><div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/25 bg-cyan-200/10 text-cyan-100"><Cpu className="h-6 w-6" /></div><div><div className="mb-1 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200"><Terminal className="h-3.5 w-3.5" /> Schema Sentinel / lab mode</div><h2 className="text-2xl font-black text-white sm:text-3xl">Migration risk simulator</h2><p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-slate-500">AST analysis · lock safety · CI/CD gatekeeper</p></div></div>

        <div className="relative mb-6"><p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Try a migration pattern</p><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{presets.map((preset) => <button key={preset.sql} onClick={() => selectPreset(preset)} className={`rounded-xl border p-3 text-left font-mono text-[10px] font-bold transition ${sqlQuery === preset.sql ? 'border-cyan-200/45 bg-cyan-200/10 text-cyan-100 shadow-lg shadow-cyan-500/5' : 'border-white/10 bg-white/[0.025] text-slate-400 hover:border-white/25 hover:text-slate-200'}`}>{preset.label}</button>)}</div></div>

        <div className="relative mb-6"><label className="mb-2 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400"><span>SQL statement</span><span className="text-slate-600">editable input</span></label><textarea value={sqlQuery} onChange={(event) => setSqlQuery(event.target.value)} rows={3} spellCheck={false} className="w-full resize-y rounded-2xl border border-cyan-200/20 bg-[#030610] p-4 font-mono text-xs leading-6 text-cyan-100 shadow-inner outline-none transition focus:border-cyan-200/55" /><button onClick={() => setRiskResult(analyze(sqlQuery))} className="signal-button mt-3 flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-200 to-violet-300 px-4 py-3 font-mono text-xs font-black text-slate-950"><Play className="h-4 w-4 fill-current" /> ANALYZE STATEMENT</button></div>

        <div className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400"><Activity className="h-4 w-4 text-cyan-200" /> Risk matrix</span><span className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] font-black ${critical ? 'border-rose-200/35 bg-rose-200/10 text-rose-100' : 'border-emerald-200/35 bg-emerald-200/10 text-emerald-100'}`}>{critical ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />} {riskResult.score}/10 · {riskResult.level}</span></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[['LOCK RISK', riskResult.lockRisk], ['DATA INTEGRITY', riskResult.integrityRisk], ['COMPATIBILITY', riskResult.compatRisk], ['PERF COST', riskResult.perfRisk]].map(([label, value]) => <div key={label} className="rounded-xl border border-white/8 bg-black/20 p-3"><div className="mb-2 font-mono text-[9px] font-bold tracking-wide text-slate-500">{label}</div><div className="mb-2 font-mono text-xl font-black text-white">{value}<span className="text-xs text-slate-600">/10</span></div><div className="h-1 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full ${gaugeColor(Number(value))}`} style={{ width: `${Number(value) * 10}%` }} /></div></div>)}</div><div className="mt-4 rounded-xl border border-white/8 bg-black/20 p-4 text-xs leading-5 text-slate-300"><strong className="font-mono text-[10px] uppercase tracking-wide text-cyan-200">Recommendation / </strong>{riskResult.recommendation}</div></div>
      </div>
    </div>
  );
};

