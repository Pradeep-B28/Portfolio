// Lightweight Web Audio API sound generator for arcade interactions.

class SoundManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.muted = false;
  }

  init() {
    if (this.ctx) {
      return;
    }

    const AudioContext =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) {
      return;
    }

    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.55;
    this.masterGain.connect(this.ctx.destination);
  }

  resume() {
    if (this.ctx?.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playTone(
    frequency,
    type = 'square',
    duration = 0.1,
    gainValue = 0.1,
    detune = 0
  ) {
    if (this.muted) {
      return;
    }

    try {
      this.init();

      if (!this.ctx || !this.masterGain) {
        return;
      }

      this.resume();

      const now = this.ctx.currentTime;
      const oscillator = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.detune.setValueAtTime(detune, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(
        Math.max(gainValue, 0.0001),
        now + 0.008
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + duration
      );

      oscillator.connect(gain);
      gain.connect(this.masterGain);

      oscillator.start(now);
      oscillator.stop(now + duration + 0.02);
    } catch {
      // Browsers can block audio until a user gesture occurs.
    }
  }

  playHover() {
    this.playTone(520, 'triangle', 0.045, 0.025, -20);
  }

  playSelect() {
    this.playTone(660, 'triangle', 0.08, 0.055);
    window.setTimeout(() => {
      this.playTone(990, 'sine', 0.09, 0.045);
    }, 65);
  }

  playCartridgeInsert() {
    this.playTone(130, 'sawtooth', 0.08, 0.08);
    window.setTimeout(() => {
      this.playTone(260, 'square', 0.09, 0.07);
    }, 75);
    window.setTimeout(() => {
      this.playTone(520, 'square', 0.11, 0.08);
    }, 150);
    window.setTimeout(() => {
      this.playTone(780, 'triangle', 0.16, 0.06);
    }, 225);
  }

  playPowerOn() {
    this.playTone(110, 'sine', 0.18, 0.1);

    window.setTimeout(() => {
      this.playTone(220, 'triangle', 0.18, 0.08);
    }, 130);

    window.setTimeout(() => {
      this.playTone(440, 'square', 0.22, 0.07);
    }, 260);

    window.setTimeout(() => {
      this.playTone(880, 'sine', 0.34, 0.06);
    }, 390);
  }

  playAchievement() {
    const notes = [523.25, 659.25, 783.99, 1046.5];

    notes.forEach((frequency, index) => {
      window.setTimeout(() => {
        this.playTone(
          frequency,
          index === notes.length - 1 ? 'sine' : 'square',
          0.13,
          0.07
        );
      }, index * 90);
    });
  }

  playGlitch() {
    this.playTone(150, 'sawtooth', 0.045, 0.08, -120);

    window.setTimeout(() => {
      this.playTone(310, 'sawtooth', 0.045, 0.07, 90);
    }, 45);

    window.setTimeout(() => {
      this.playTone(95, 'square', 0.06, 0.055, -240);
    }, 90);
  }

  toggleMute() {
    this.muted = !this.muted;

    if (this.masterGain && this.ctx) {
      const targetVolume = this.muted ? 0 : 0.55;

      this.masterGain.gain.cancelScheduledValues(
        this.ctx.currentTime
      );

      this.masterGain.gain.linearRampToValueAtTime(
        targetVolume,
        this.ctx.currentTime + 0.08
      );
    }

    return this.muted;
  }
}

export const sounds = new SoundManager();