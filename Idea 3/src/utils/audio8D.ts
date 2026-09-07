// Web Audio API Synthesizer for Subterranean Excavation Machine Sound FX

class Audio8DEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private is8DEnabled: boolean = true;
  private masterGain: GainNode | null = null;
  private ambientPanner: StereoPannerNode | null = null;
  private ambientGain: GainNode | null = null;
  private panAngle: number = 0;
  public isInitialized: boolean = false;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : 0.35;
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
      this.startSubterraneanHum();
    } catch {
      console.warn("Web Audio API not supported");
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.35, this.ctx.currentTime, 0.05);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public set8DEnabled(enabled: boolean) {
    this.is8DEnabled = enabled;
  }

  public get8DEnabled(): boolean {
    return this.is8DEnabled;
  }

  private startSubterraneanHum() {
    if (!this.ctx || !this.masterGain) return;

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 120; // Deep earth rumble

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0.05;

      if (this.ctx.createStereoPanner) {
        this.ambientPanner = this.ctx.createStereoPanner();
        whiteNoise.connect(filter);
        filter.connect(this.ambientGain);
        this.ambientGain.connect(this.ambientPanner);
        this.ambientPanner.connect(this.masterGain);
      } else {
        whiteNoise.connect(filter);
        filter.connect(this.ambientGain);
        this.ambientGain.connect(this.masterGain);
      }

      whiteNoise.start();

      if (typeof window !== 'undefined') {
        window.setInterval(() => {
          if (!this.is8DEnabled || !this.ambientPanner || !this.ctx || this.isMuted) return;
          this.panAngle += 0.03;
          const panVal = Math.sin(this.panAngle);
          this.ambientPanner.pan.setTargetAtTime(panVal, this.ctx.currentTime, 0.1);
        }, 100);
      }
    } catch {
      // Audio autoplay restrictions handled gracefully
    }
  }

  // Heavy Excavation Machine Hydraulic Drill Strike
  public playMachineDrillSound() {
    if (!this.ctx || this.isMuted || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    
    // Low mechanical hydraulic thud + drill motor rev
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    if (this.is8DEnabled && this.ctx.createStereoPanner) {
      const panner = this.ctx.createStereoPanner();
      panner.pan.value = (Math.random() - 0.5) * 1.4;
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      osc.connect(gain);
      gain.connect(this.masterGain);
    }
    
    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Dirt brush / pickaxe clink sound
  public playDigSound() {
    if (!this.ctx || this.isMuted || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(550, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
    
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Relic unearth discovery major chord chime
  public playUnearthChime() {
    if (!this.ctx || this.isMuted || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 major chord

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }

  // Stratum level change hydraulic swoosh sound
  public playStratumSwoosh() {
    if (!this.ctx || this.isMuted || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.22);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }
}

export const audio8D = new Audio8DEngine();
