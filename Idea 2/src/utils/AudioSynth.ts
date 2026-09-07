// Small optional Web Audio layer for subtle portfolio interaction feedback.
class AudioSynthEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private lastHoverAt = 0;
  public enabled = false;

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.42;
    this.master.connect(this.ctx.destination);
  }

  private async ready() {
    this.init();
    if (!this.ctx) return false;
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    return this.ctx.state === 'running';
  }

  public async playHoverTone(frequency = 440) {
    if (!this.enabled || Date.now() - this.lastHoverAt < 160) return;
    this.lastHoverAt = Date.now();
    if (!(await this.ready()) || !this.ctx || !this.master) return;
    try {
      const now = this.ctx.currentTime;
      const oscillator = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.22, now + 0.09);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      oscillator.connect(gain);
      gain.connect(this.master);
      oscillator.start(now);
      oscillator.stop(now + 0.1);
    } catch {
      // Audio is a progressive enhancement and may be blocked by the browser.
    }
  }

  public async playSelectSound() {
    if (!this.enabled || !(await this.ready()) || !this.ctx || !this.master) return;
    try {
      const now = this.ctx.currentTime;
      const oscillator = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(260, now);
      oscillator.frequency.exponentialRampToValueAtTime(720, now + 0.18);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      oscillator.connect(gain);
      gain.connect(this.master);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
    } catch {
      // Audio is a progressive enhancement and may be blocked by the browser.
    }
  }
}

export const AudioSynth = new AudioSynthEngine();
