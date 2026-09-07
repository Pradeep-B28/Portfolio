// Web Audio API Synthesizer for 8D Celestial Spatial Audio & Cosmic Sound FX

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
      this.startCosmicAmbient();
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

  private startCosmicAmbient() {
    if (!this.ctx || !this.masterGain) return;

    try {
      // Cosmic low-frequency sine drone + soft noise
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      this.ambientGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, this.ctx.currentTime); // Deep space C2 frequency

      filter.type = 'lowpass';
      filter.frequency.value = 160;

      this.ambientGain.gain.value = 0.06;

      if (this.ctx.createStereoPanner) {
        this.ambientPanner = this.ctx.createStereoPanner();
        osc.connect(filter);
        filter.connect(this.ambientGain);
        this.ambientGain.connect(this.ambientPanner);
        this.ambientPanner.connect(this.masterGain);
      } else {
        osc.connect(filter);
        filter.connect(this.ambientGain);
        this.ambientGain.connect(this.masterGain);
      }

      osc.start();

      if (typeof window !== 'undefined') {
        window.setInterval(() => {
          if (!this.is8DEnabled || !this.ambientPanner || !this.ctx || this.isMuted) return;
          this.panAngle += 0.035;
          const panVal = Math.sin(this.panAngle);
          this.ambientPanner.pan.setTargetAtTime(panVal, this.ctx.currentTime, 0.1);
        }, 100);
      }
    } catch {
      // Audio autoplay restrictions handled gracefully
    }
  }

  // Play stellar star lock sound
  public playStarLockSound() {
    if (!this.ctx || this.isMuted || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5 note
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.12);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    if (this.is8DEnabled && this.ctx.createStereoPanner) {
      const panner = this.ctx.createStereoPanner();
      panner.pan.value = (Math.random() - 0.5) * 1.6;
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      osc.connect(gain);
      gain.connect(this.masterGain);
    }
    
    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Play constellation warp chime
  public playConstellationWarp() {
    if (!this.ctx || this.isMuted || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6 arpeggio

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.07;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.16, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.38);

      if (this.is8DEnabled && this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner();
        panner.pan.value = Math.sin(idx * 1.3);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain);
      } else {
        osc.connect(gain);
        gain.connect(this.masterGain);
      }

      osc.start(startTime);
      osc.stop(startTime + 0.38);
    });
  }

  // Play supernova pulse sound
  public playSupernovaPulse() {
    if (!this.ctx || this.isMuted || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }
}

export const audio8D = new Audio8DEngine();
