import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, Scale, Zap, Globe, Cpu, RefreshCw, AlertTriangle, Play, Pause,
  DollarSign, Lock, Unlock, Key, BarChart3, TrendingUp, Compass, Award, Sparkles
} from 'lucide-react';
import { vaultSounds } from '../../utils/vaultSounds';

export function BankVisualizer({ project, onClose }) {
  const boxId = project?.id || 'box_001';

  switch (boxId) {
    case 'box_001':
      return <VisualGoldVault project={project} />;
    case 'box_002':
      return <VisualSwiftMap project={project} />;
    case 'box_003':
      return <VisualOrderBook project={project} />;
    case 'box_004':
      return <VisualBiometricScanner project={project} />;
    case 'box_005':
      return <VisualForexMatrix project={project} />;
    case 'box_006':
      return <VisualFraudRadar project={project} />;
    case 'box_007':
      return <VisualRoboticArm project={project} />;
    case 'box_008':
      return <VisualYieldCurve project={project} />;
    case 'box_009':
      return <VisualMultiSigVault project={project} />;
    case 'box_010':
      return <VisualCreditUnderwriting project={project} />;
    case 'box_011':
      return <VisualArmoredFleet project={project} />;
    case 'box_012':
      return <VisualExecutiveSanctum project={project} />;
    default:
      return <VisualGoldVault project={project} />;
  }
}

/* =========================================================================
   1. VISUAL 1: Bullion Reserve Alpha - Interactive Gold Bar Stacker & Scale
   ========================================================================= */
function VisualGoldVault({ project }) {
  const [barCount, setBarCount] = useState(24);
  const [testingPurity, setTestingPurity] = useState(false);

  const ozPerBar = 400; // Standard 400 troy oz Good Delivery Bar
  const pricePerOz = 2740.50;
  const totalOz = barCount * ozPerBar;
  const totalValuationUSD = totalOz * pricePerOz;
  const totalWeightKg = (totalOz * 0.0311035).toFixed(1);

  const handleTestPurity = () => {
    vaultSounds.playGoldClink();
    setTestingPurity(true);
    setTimeout(() => setTestingPurity(false), 1200);
  };

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#161B24] to-[#0D1016] border border-[#E0B45C]/40 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#E0B45C] font-mono font-bold text-sm">
          <Scale className="w-4 h-4" />
          <span>GOLD BULLION PALLET & SCALE TELEMETRY</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#E0B45C]/20 border border-[#E0B45C]/50 text-[#E0B45C] font-mono text-xs font-semibold">
          LME SPOT: $2,740.50 / OZ
        </div>
      </div>

      {/* 2D Animated Gold Pyramid Canvas / SVG */}
      <div className="relative h-44 rounded-xl bg-[#090C10] border border-[#E0B45C]/30 flex flex-col items-center justify-end p-4 overflow-hidden shadow-inner">
        {/* Ambient Gold Glow Background */}
        <div className="absolute inset-0 bg-radial from-[#E0B45C]/10 via-transparent to-transparent pointer-events-none"></div>

        {/* Stack of Gold Bars (SVG Rendered) */}
        <div className="flex flex-col-reverse items-center gap-1.5 z-10">
          {Array.from({ length: Math.min(barCount, 6) }).map((_, tierIdx) => {
            const barsInRow = Math.min(6 - tierIdx, barCount - tierIdx * 4);
            if (barsInRow <= 0) return null;
            return (
              <div key={tierIdx} className="flex gap-1.5">
                {Array.from({ length: Math.max(1, barsInRow) }).map((_, barIdx) => (
                  <div
                    key={barIdx}
                    className="w-10 h-5 md:w-14 md:h-6 rounded bg-gradient-to-t from-[#B8860B] via-[#FFD700] to-[#FFF8DC] border border-[#FFE4B5] shadow-md flex items-center justify-center font-mono font-extrabold text-[8px] md:text-[9px] text-[#3E2723] hover:scale-110 transition-transform cursor-pointer"
                    title={`Gold Bar #${tierIdx * 6 + barIdx + 1} - 999.9 Fine Gold`}
                    onClick={() => vaultSounds.playGoldClink()}
                  >
                    999.9
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Precision Digital Scale Floor */}
        <div className="w-full h-3 bg-gradient-to-r from-[#242830] via-[#485060] to-[#242830] rounded mt-2 flex items-center justify-between px-4 text-[9px] font-mono text-[#00FF88]">
          <span>DIGITAL SCALE LOAD CELL</span>
          <span>{testingPurity ? "ANALYZING DENSITY..." : "WEIGHT STABLE"}</span>
        </div>
      </div>

      {/* Controls & Live Valuation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-[#0F131C] border border-[#2D333F] text-center">
          <div className="text-[10px] font-mono text-[#8A94A3] uppercase">Pallet Bar Count</div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <input
              type="range"
              min="4"
              max="64"
              step="4"
              value={barCount}
              onChange={(e) => {
                setBarCount(Number(e.target.value));
                vaultSounds.playTumblerClick();
              }}
              className="accent-[#E0B45C] cursor-pointer w-24"
            />
            <span className="font-mono font-bold text-sm text-[#E0B45C]">{barCount} Bars</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#0F131C] border border-[#2D333F] text-center">
          <div className="text-[10px] font-mono text-[#8A94A3] uppercase">Total Weight (Metric)</div>
          <div className="font-mono font-bold text-base text-[#EDF1F6] mt-1">{totalWeightKg} KG</div>
          <div className="text-[9px] font-mono text-[#8A94A3]">({totalOz.toLocaleString()} troy oz)</div>
        </div>

        <div className="p-3 rounded-xl bg-[#0F131C] border border-[#E0B45C]/40 text-center">
          <div className="text-[10px] font-mono text-[#8A94A3] uppercase">Reserve Valuation</div>
          <div className="font-mono font-bold text-base text-[#00FF88] text-gold-glow mt-1">
            ${(totalValuationUSD / 1000000).toFixed(2)}M USD
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleTestPurity}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E0B45C] to-[#B8860B] text-[#0A0C10] font-mono font-extrabold text-xs tracking-wider transition-all shadow-lg hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>{testingPurity ? "TESTING ULTRASONIC ALLOY DENSITY..." : "TEST GOLD PURITY (ULTRASONIC)"}</span>
      </button>
    </div>
  );
}

/* =========================================================================
   2. VISUAL 2: SWIFT Sovereign Settlement - Global Interbank Map
   ========================================================================= */
function VisualSwiftMap({ project }) {
  const [activeHub, setActiveHub] = useState('NYC');
  const [wireQueue, setWireQueue] = useState(48290);
  const [transferring, setTransferring] = useState(false);

  const hubs = {
    NYC: { name: 'New York Fed', lat: '40.71°N', lon: '74.00°W', ping: '12ms', volume: '$1.4B/day' },
    LDN: { name: 'Bank of England', lat: '51.51°N', lon: '0.08°W', ping: '28ms', volume: '$1.1B/day' },
    ZRH: { name: 'Swiss National Bank', lat: '47.37°N', lon: '8.54°E', ping: '34ms', volume: '$950M/day' },
    FRA: { name: 'ECB Frankfurt', lat: '50.11°N', lon: '8.68°E', ping: '31ms', volume: '$880M/day' },
    TYO: { name: 'Bank of Japan', lat: '35.67°N', lon: '139.65°E', ping: '85ms', volume: '$720M/day' },
    SIN: { name: 'MAS Singapore', lat: '1.35°N', lon: '103.81°E', ping: '92ms', volume: '$640M/day' },
  };

  const handleTestWire = () => {
    vaultSounds.playDoor2Unlock();
    setTransferring(true);
    setWireQueue((prev) => prev + 1);
    setTimeout(() => setTransferring(false), 1500);
  };

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#141A26] to-[#0A0D14] border border-[#00F0FF]/40 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#00F0FF] font-mono font-bold text-sm">
          <Globe className="w-4 h-4" />
          <span>SWIFT ISO 20022 SOVEREIGN NODE NETWORK</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] font-mono text-xs">
          NETWORK STATUS: OPTIMAL
        </div>
      </div>

      {/* Map Interactive Grid */}
      <div className="relative h-48 rounded-xl bg-[#06080C] border border-[#00F0FF]/30 p-4 flex flex-col justify-between overflow-hidden">
        {/* Matrix Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff0d_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0d_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        {/* Global Hub Nodes */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 z-10">
          {Object.entries(hubs).map(([key, data]) => {
            const isSelected = activeHub === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveHub(key);
                  vaultSounds.playTumblerClick();
                }}
                className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00F0FF]/25 border-[#00F0FF] text-white shadow-lg shadow-[#00F0FF]/20 scale-105'
                    : 'bg-[#0D121B] border-[#222B3A] text-[#8A94A3] hover:border-[#00F0FF]/50'
                }`}
              >
                <div className="font-mono font-bold text-xs flex items-center justify-between">
                  <span>{key}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#00FF88] animate-ping' : 'bg-[#4A7FBF]'}`}></span>
                </div>
                <div className="text-[9px] font-mono text-[#8A94A3] truncate mt-1">{data.name}</div>
              </button>
            );
          })}
        </div>

        {/* Active Node Telemetry */}
        <div className="z-10 bg-[#0A0D14]/90 p-3 rounded-lg border border-[#00F0FF]/30 flex flex-col md:flex-row justify-between items-center gap-2 font-mono text-xs">
          <div>
            <span className="text-[#8A94A3]">ACTIVE HUB: </span>
            <span className="font-bold text-[#00F0FF]">{hubs[activeHub].name} ({activeHub})</span>
          </div>
          <div className="flex gap-4">
            <span className="text-[#8A94A3]">LATENCY: <strong className="text-[#00FF88]">{hubs[activeHub].ping}</strong></span>
            <span className="text-[#8A94A3]">VOLUME: <strong className="text-[#E0B45C]">{hubs[activeHub].volume}</strong></span>
          </div>
        </div>
      </div>

      {/* Action Wire Trigger */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-mono text-[#8A94A3]">
          MESSAGE QUEUE: <strong className="text-white">{wireQueue.toLocaleString()} MSG/SEC</strong>
        </div>
        <button
          onClick={handleTestWire}
          disabled={transferring}
          className="px-5 py-2.5 rounded-xl bg-[#00F0FF]/20 hover:bg-[#00F0FF]/40 border border-[#00F0FF] text-[#00F0FF] hover:text-white font-mono font-extrabold text-xs transition-all shadow-lg active:scale-95 cursor-pointer disabled:opacity-50"
        >
          {transferring ? "CLEARING SETTLEMENT (ISO 20022)..." : "TRIGGER TEST WIRE SETTLEMENT"}
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   3. VISUAL 3: Quantum Liquidity Pool - High-Frequency Trading Order Book
   ========================================================================= */
function VisualOrderBook({ project }) {
  const [bids, setBids] = useState([
    { price: 2740.40, qty: 145 },
    { price: 2740.35, qty: 320 },
    { price: 2740.30, qty: 890 },
    { price: 2740.25, qty: 1420 },
  ]);

  const [asks, setAsks] = useState([
    { price: 2740.50, qty: 180 },
    { price: 2740.55, qty: 450 },
    { price: 2740.60, qty: 910 },
    { price: 2740.65, qty: 1650 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBids((prev) =>
        prev.map((b) => ({ ...b, qty: Math.max(50, b.qty + Math.floor(Math.random() * 40 - 20)) }))
      );
      setAsks((prev) =>
        prev.map((a) => ({ ...a, qty: Math.max(50, a.qty + Math.floor(Math.random() * 40 - 20)) }))
      );
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#161B24] to-[#0D1016] border border-[#00FF88]/40 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#00FF88] font-mono font-bold text-sm">
          <BarChart3 className="w-4 h-4" />
          <span>HFT ORDER BOOK & LIQUIDITY DEPTH</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#00FF88]/15 border border-[#00FF88]/40 text-[#00FF88] font-mono text-xs">
          MATCHING ENGINE: 850ns
        </div>
      </div>

      {/* Order Book Table Grid */}
      <div className="grid grid-cols-2 gap-3 font-mono text-xs">
        {/* Bids (Green) */}
        <div className="p-3 rounded-xl bg-[#090E14] border border-[#00FF88]/30 space-y-1.5">
          <div className="text-[10px] text-[#8A94A3] flex justify-between border-b border-[#1E2633] pb-1 uppercase">
            <span>Bid Price (USD)</span>
            <span>Volume (Lots)</span>
          </div>
          {bids.map((b, idx) => (
            <div key={idx} className="flex justify-between items-center py-0.5">
              <span className="text-[#00FF88] font-bold">${b.price.toFixed(2)}</span>
              <div className="flex items-center gap-2">
                <div
                  className="h-2 rounded bg-[#00FF88]/40 transition-all duration-300"
                  style={{ width: `${Math.min(100, b.qty / 15)}px` }}
                ></div>
                <span className="text-white text-[11px]">{b.qty}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Asks (Red) */}
        <div className="p-3 rounded-xl bg-[#090E14] border border-[#FF0040]/30 space-y-1.5">
          <div className="text-[10px] text-[#8A94A3] flex justify-between border-b border-[#1E2633] pb-1 uppercase">
            <span>Ask Price (USD)</span>
            <span>Volume (Lots)</span>
          </div>
          {asks.map((a, idx) => (
            <div key={idx} className="flex justify-between items-center py-0.5">
              <span className="text-[#FF0040] font-bold">${a.price.toFixed(2)}</span>
              <div className="flex items-center gap-2">
                <div
                  className="h-2 rounded bg-[#FF0040]/40 transition-all duration-300"
                  style={{ width: `${Math.min(100, a.qty / 15)}px` }}
                ></div>
                <span className="text-white text-[11px]">{a.qty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => vaultSounds.playTumblerClick()}
        className="w-full py-2 rounded-xl bg-[#00FF88]/20 hover:bg-[#00FF88]/30 border border-[#00FF88] text-[#00FF88] font-mono font-extrabold text-xs transition-all cursor-pointer active:scale-95"
      >
        EXECUTE LIQUIDITY REBALANCE ORDER
      </button>
    </div>
  );
}

/* =========================================================================
   4. VISUAL 4: Biometric Iris Sentinel - Retina Scanner
   ========================================================================= */
function VisualBiometricScanner({ project }) {
  const [scanning, setScanning] = useState(false);
  const [matchScore, setMatchScore] = useState(99.98);

  const handleRescan = () => {
    vaultSounds.playLaserBeep();
    setScanning(true);
    setMatchScore(0);
    let progress = 0;
    const timer = setInterval(() => {
      progress += 15;
      if (progress >= 99) {
        clearInterval(timer);
        setMatchScore(99.98);
        setScanning(false);
      } else {
        setMatchScore(progress);
      }
    }, 100);
  };

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#141824] to-[#0A0C14] border border-[#E0B45C]/40 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#E0B45C] font-mono font-bold text-sm">
          <Shield className="w-4 h-4" />
          <span>BIOMETRIC IRIS MESH & ACCESS CLEARANCE</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#E0B45C]/15 border border-[#E0B45C]/40 text-[#E0B45C] font-mono text-xs">
          TIER: LEVEL 5 CLEARANCE
        </div>
      </div>

      {/* Iris Retina Graphics */}
      <div className="relative h-44 rounded-xl bg-[#07090E] border border-[#E0B45C]/30 flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Laser Scanning Line */}
        <div
          className={`absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent shadow-[0_0_15px_#00FF88] z-20 ${
            scanning ? 'animate-bounce' : 'top-1/2'
          }`}
        ></div>

        {/* Concentric Biometric Rings */}
        <div className="relative w-28 h-28 rounded-full border-2 border-dashed border-[#E0B45C]/60 flex items-center justify-center animate-spin-slow">
          <div className="w-20 h-20 rounded-full border border-[#00FF88] flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-radial from-[#00FF88]/40 to-transparent border border-[#00FF88]"></div>
          </div>
        </div>

        {/* Match Percentage Display */}
        <div className="mt-2 font-mono font-bold text-sm text-[#00FF88]">
          BIOMETRIC MATCH: {matchScore}%
        </div>
        <div className="text-[10px] font-mono text-[#8A94A3]">
          {scanning ? "SCANNING RETINA & IRIS PATTERN..." : "IDENTITY VERIFIED: PRADEEP B (CSO)"}
        </div>
      </div>

      <button
        onClick={handleRescan}
        disabled={scanning}
        className="w-full py-2.5 rounded-xl bg-[#E0B45C]/20 hover:bg-[#E0B45C]/40 border border-[#E0B45C] text-[#E0B45C] font-mono font-extrabold text-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
      >
        {scanning ? "AUTHENTICATING..." : "RE-SCAN BIOMETRIC IRIS PATTERN"}
      </button>
    </div>
  );
}

/* =========================================================================
   5. VISUAL 5: Global Forex Arbitrage Matrix - Multi-Currency Converter
   ========================================================================= */
function VisualForexMatrix({ project }) {
  const [baseUsd, setBaseUsd] = useState(10000);

  const rates = {
    EUR: { rate: 0.92, name: 'Euro', flag: '🇪🇺' },
    GBP: { rate: 0.78, name: 'British Pound', flag: '🇬🇧' },
    JPY: { rate: 148.5, name: 'Japanese Yen', flag: '🇯🇵' },
    CHF: { rate: 0.88, name: 'Swiss Franc', flag: '🇨🇭' },
    INR: { rate: 83.9, name: 'Indian Rupee', flag: '🇮🇳' },
    SGD: { rate: 1.34, name: 'Singapore Dollar', flag: '🇸🇬' },
  };

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#161C26] to-[#0D111A] border border-[#4A7FBF]/40 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#4A7FBF] font-mono font-bold text-sm">
          <RefreshCw className="w-4 h-4" />
          <span>MULTI-CURRENCY FOREX CONVERTER MATRIX</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#4A7FBF]/20 border border-[#4A7FBF]/40 text-[#4A7FBF] font-mono text-xs">
          8 RESERVE CURRENCIES
        </div>
      </div>

      {/* Input Slider */}
      <div className="p-3 rounded-xl bg-[#090C12] border border-[#232B3A] flex flex-col md:flex-row items-center justify-between gap-3 font-mono">
        <span className="text-xs text-[#8A94A3]">BASE USD RESERVE:</span>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={baseUsd}
            onChange={(e) => setBaseUsd(Number(e.target.value))}
            className="accent-[#4A7FBF] cursor-pointer"
          />
          <span className="font-bold text-sm text-[#00FF88]">${baseUsd.toLocaleString()} USD</span>
        </div>
      </div>

      {/* Grid of Currencies */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 font-mono text-xs">
        {Object.entries(rates).map(([code, info]) => {
          const converted = (baseUsd * info.rate).toLocaleString(undefined, { maximumFractionDigits: 2 });
          return (
            <div key={code} className="p-3 rounded-xl bg-[#090C12] border border-[#232B3A] space-y-1">
              <div className="flex items-center justify-between text-[#8A94A3] text-[10px]">
                <span>{info.flag} {code}</span>
                <span>Rate: {info.rate}</span>
              </div>
              <div className="font-bold text-sm text-[#EDF1F6]">{converted}</div>
              <div className="text-[9px] text-[#4A7FBF]">{info.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   6. VISUAL 6: Neural Financial Fraud Radar - AML Radar Scanner
   ========================================================================= */
function VisualFraudRadar({ project }) {
  const [frozen, setFrozen] = useState(false);

  const handleToggleFreeze = () => {
    vaultSounds.playLaserBeep();
    setFrozen(!frozen);
  };

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1C141A] to-[#0E0A0F] border border-[#FF0040]/40 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#FF0040] font-mono font-bold text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>NEURAL FINANCIAL FRAUD & AML RADAR</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#FF0040]/20 border border-[#FF0040]/50 text-[#FF0040] font-mono text-xs font-bold">
          {frozen ? "ACCOUNT FROZEN" : "MONITORING ACTIVE"}
        </div>
      </div>

      {/* Radar Canvas */}
      <div className="relative h-44 rounded-xl bg-[#090508] border border-[#FF0040]/30 flex flex-col items-center justify-center overflow-hidden">
        {/* Sweep line */}
        <div className="absolute w-36 h-36 rounded-full border border-[#FF0040]/40 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-[#FF0040]/30"></div>
          <div className="absolute w-full h-full rounded-full border-t-2 border-[#FF0040] animate-spin"></div>
        </div>

        {/* Threat Alert Badge */}
        <div className="z-10 bg-[#1A0A10]/90 px-3 py-1.5 rounded-lg border border-[#FF0040] font-mono text-xs text-center space-y-0.5">
          <div className="text-[#FF0040] font-extrabold">SUSPICIOUS TX DETECTED</div>
          <div className="text-[10px] text-[#D0D7E2]">TX #8841 • $495,000 USD • Zurich Node</div>
        </div>
      </div>

      <button
        onClick={handleToggleFreeze}
        className={`w-full py-2.5 rounded-xl border font-mono font-extrabold text-xs transition-all shadow-lg cursor-pointer active:scale-95 ${
          frozen
            ? 'bg-[#00FF88]/20 border-[#00FF88] text-[#00FF88]'
            : 'bg-[#FF0040]/20 border-[#FF0040] text-[#FF0040] hover:bg-[#FF0040]/40'
        }`}
      >
        {frozen ? "UNFREEZE ACCOUNT & LIFT OVERRIDE" : "EMERGENCY FREEZE SUSPICIOUS ACCOUNT"}
      </button>
    </div>
  );
}

/* =========================================================================
   7. VISUAL 7: Automated Vault Robotic Arm
   ========================================================================= */
function VisualRoboticArm({ project }) {
  const [retrieving, setRetrieving] = useState(false);

  const handleRetrieve = () => {
    vaultSounds.playDoor1Unlock();
    setRetrieving(true);
    setTimeout(() => setRetrieving(false), 2000);
  };

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#181C26] to-[#0E1118] border border-[#E0B45C]/40 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#E0B45C] font-mono font-bold text-sm">
          <Cpu className="w-4 h-4" />
          <span>6-AXIS VAULT ROBOTIC ARM TELEMETRY</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#E0B45C]/15 border border-[#E0B45C]/40 text-[#E0B45C] font-mono text-xs">
          ACCURACY: ±0.1 MM
        </div>
      </div>

      <div className="h-40 rounded-xl bg-[#07090D] border border-[#E0B45C]/30 flex items-center justify-center p-4 font-mono text-xs">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#E0B45C] mx-auto flex items-center justify-center animate-spin-slow">
            <span className="text-[#00FF88] font-bold">{retrieving ? "MOVING" : "READY"}</span>
          </div>
          <div className="text-[11px] text-[#D0D7E2]">
            ARM TELEMETRY: X=142.5mm | Y=840.2mm | Z=-12.0mm
          </div>
        </div>
      </div>

      <button
        onClick={handleRetrieve}
        disabled={retrieving}
        className="w-full py-2.5 rounded-xl bg-[#E0B45C]/20 hover:bg-[#E0B45C]/30 border border-[#E0B45C] text-[#E0B45C] font-mono font-bold text-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
      >
        {retrieving ? "RETRIEVING SAFE DEPOSIT TRAY..." : "DISPATCH ROBOTIC ARM RETRIEVAL"}
      </button>
    </div>
  );
}

/* =========================================================================
   8. VISUAL 8: Sovereign Treasury Bond Engine - Yield Curve Simulator
   ========================================================================= */
function VisualYieldCurve({ project }) {
  const [rateShift, setRateShift] = useState(0);

  const baseYields = [
    { tenor: '1Y', yield: 4.8 },
    { tenor: '2Y', yield: 4.3 },
    { tenor: '5Y', yield: 3.9 },
    { tenor: '10Y', yield: 4.1 },
    { tenor: '30Y', yield: 4.4 },
  ];

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#141A26] to-[#0A0D14] border border-[#00FF88]/40 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#00FF88] font-mono font-bold text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>US TREASURY YIELD CURVE & RATE SENSITIVITY</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#00FF88]/15 border border-[#00FF88]/40 text-[#00FF88] font-mono text-xs">
          DURATION: 6.8 YRS
        </div>
      </div>

      {/* Yield Curve SVG */}
      <div className="h-40 rounded-xl bg-[#070A0F] border border-[#00FF88]/30 p-4 flex flex-col justify-between font-mono text-xs">
        <div className="flex justify-between items-end h-28 border-b border-[#222E3D] px-2 pb-2">
          {baseYields.map((item, idx) => {
            const currentYield = (item.yield + rateShift).toFixed(2);
            const heightPx = Math.max(20, (currentYield / 6) * 100);
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#00FF88] font-bold">{currentYield}%</span>
                <div
                  className="w-8 rounded-t bg-gradient-to-t from-[#00FF88]/20 to-[#00FF88] transition-all duration-300"
                  style={{ height: `${heightPx}px` }}
                ></div>
                <span className="text-[10px] text-[#8A94A3] mt-1">{item.tenor}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rate Shift Slider */}
      <div className="p-3 rounded-xl bg-[#090D14] border border-[#222E3D] flex items-center justify-between font-mono text-xs">
        <span className="text-[#8A94A3]">FED RATE SHIFT:</span>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="-1.0"
            max="1.0"
            step="0.25"
            value={rateShift}
            onChange={(e) => setRateShift(Number(e.target.value))}
            className="accent-[#00FF88] cursor-pointer"
          />
          <span className="font-bold text-[#00FF88]">
            {rateShift > 0 ? `+${rateShift}%` : `${rateShift}%`}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   9. VISUAL 9: Cold-Storage Multi-Sig Safe
   ========================================================================= */
function VisualMultiSigVault({ project }) {
  const [dial1, setDial1] = useState(3);
  const [dial2, setDial2] = useState(7);
  const [dial3, setDial3] = useState(5);

  const isUnlocked = dial1 === 7 && dial2 === 7 && dial3 === 7;

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#181C26] to-[#0D1017] border border-[#E0B45C]/40 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#E0B45C] font-mono font-bold text-sm">
          <Lock className="w-4 h-4" />
          <span>3-OF-5 MULTI-SIGNATURE HARDWARE SAFE</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#E0B45C]/15 border border-[#E0B45C]/40 text-[#E0B45C] font-mono text-xs">
          {isUnlocked ? "SAFE UNLOCKED" : "LOCKED (COMBINATION: 7-7-7)"}
        </div>
      </div>

      <div className="h-40 rounded-xl bg-[#07090D] border border-[#E0B45C]/30 flex items-center justify-center gap-6 p-4">
        {[
          { val: dial1, setVal: setDial1, label: 'KEY 1' },
          { val: dial2, setVal: setDial2, label: 'KEY 2' },
          { val: dial3, setVal: setDial3, label: 'KEY 3' },
        ].map((dial, idx) => (
          <button
            key={idx}
            onClick={() => {
              dial.setVal((prev) => (prev + 1) % 10);
              vaultSounds.playTumblerClick();
            }}
            className="w-16 h-20 rounded-xl bg-[#141822] border-2 border-[#E0B45C]/60 flex flex-col items-center justify-center font-mono hover:scale-105 transition-transform cursor-pointer"
          >
            <span className="text-[9px] text-[#8A94A3]">{dial.label}</span>
            <span className="text-2xl font-bold text-[#E0B45C] mt-1">{dial.val}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   10. VISUAL 10: AI Credit Risk Underwriting
   ========================================================================= */
function VisualCreditUnderwriting({ project }) {
  const [score, setScore] = useState(780);

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#141A26] to-[#0A0D14] border border-[#00FF88]/40 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#00FF88] font-mono font-bold text-sm">
          <Award className="w-4 h-4" />
          <span>AI CREDIT UNDERWRITING & FICO SCORE GAUGE</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#00FF88]/15 border border-[#00FF88]/40 text-[#00FF88] font-mono text-xs">
          TIER 1 EXCELLENT
        </div>
      </div>

      <div className="h-40 rounded-xl bg-[#070A0F] border border-[#00FF88]/30 flex flex-col items-center justify-center p-4 font-mono">
        <div className="text-3xl font-extrabold text-[#00FF88] text-gold-glow">{score}</div>
        <div className="text-xs text-[#8A94A3] mt-1">FICO CREDIT SCORE</div>
        <div className="mt-3 text-[11px] text-[#D0D7E2] bg-[#121926] px-3 py-1 rounded border border-[#00FF88]/30">
          INSTANT DECISION: APPROVED @ 5.25% PRIME RATE
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   11. VISUAL 11: Armored Transit & ATM Fleet
   ========================================================================= */
function VisualArmoredFleet({ project }) {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#161C26] to-[#0D111A] border border-[#4A7FBF]/40 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#4A7FBF] font-mono font-bold text-sm">
          <Compass className="w-4 h-4" />
          <span>ARMORED CASH TRANSIT & ATM FLEET RADAR</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#4A7FBF]/20 border border-[#4A7FBF]/40 text-[#4A7FBF] font-mono text-xs">
          42 VANS TRACKED
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-[#090C12] border border-[#232B3A]">
          <div className="text-[10px] text-[#8A94A3]">VAN #04 (DOWNTOWN)</div>
          <div className="font-bold text-[#00FF88] mt-1">IN TRANSIT • $2.4M</div>
        </div>
        <div className="p-3 rounded-xl bg-[#090C12] border border-[#232B3A]">
          <div className="text-[10px] text-[#8A94A3]">ATM #104 FILL LEVEL</div>
          <div className="font-bold text-[#FF0040] mt-1">14% LOW CASH ALERT</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   12. VISUAL 12: Executive Wealth Sanctum & Cash Counter
   ========================================================================= */
function VisualExecutiveSanctum({ project }) {
  const [counting, setCounting] = useState(false);
  const [cashCount, setCashCount] = useState(1200000);

  const handleCountCash = () => {
    vaultSounds.playBoxUnlock();
    setCounting(true);
    const timer = setInterval(() => {
      setCashCount((prev) => prev + 10000);
    }, 100);

    setTimeout(() => {
      clearInterval(timer);
      setCounting(false);
    }, 1500);
  };

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1C1710] to-[#0E0B07] border border-[#E0B45C]/50 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#E0B45C] font-mono font-bold text-sm">
          <DollarSign className="w-4 h-4" />
          <span>EXECUTIVE WEALTH SANCTUM & TELLER CASH COUNTER</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#E0B45C]/20 border border-[#E0B45C] text-[#E0B45C] font-mono text-xs font-extrabold">
          TOTAL RESERVE: $74.6M USD
        </div>
      </div>

      <div className="h-40 rounded-xl bg-[#0A0805] border border-[#E0B45C]/30 flex flex-col items-center justify-center p-4 font-mono">
        <div className="text-3xl font-extrabold text-[#E0B45C] text-gold-glow">
          ${cashCount.toLocaleString()} USD
        </div>
        <div className="text-xs text-[#8A94A3] mt-1">
          {counting ? "HIGH-SPEED CASH COUNTER RUNNING..." : "TELLER CASH COUNTER AUDITED"}
        </div>
      </div>

      <button
        onClick={handleCountCash}
        disabled={counting}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E0B45C] to-[#B8860B] text-[#0A0C10] font-mono font-extrabold text-xs transition-all cursor-pointer active:scale-95 shadow-lg"
      >
        {counting ? "COUNTING BILL STACK..." : "RUN HIGH-SPEED CASH COUNTER SIMULATION"}
      </button>
    </div>
  );
}
