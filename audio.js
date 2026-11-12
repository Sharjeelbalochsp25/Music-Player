'use strict';

const arrangements = {
  Ambient: { chords:[[0,7,14,16],[5,12,16,19],[-3,4,7,14],[2,9,12,17]], pattern:[0,2,1,3], tone:'sine', lowpass:1100, steps:2, drums:false },
  Soul: { chords:[[0,3,7,10],[5,9,12,16],[-2,2,5,9],[3,7,10,14]], pattern:[0,2,1,3,2,1,3,2], tone:'triangle', lowpass:1750, steps:2, drums:true },
  Jazz: { chords:[[0,3,7,10,14],[5,9,12,16,19],[-3,0,4,7,11],[2,5,9,12,16]], pattern:[2,4,1,3,2,4,3,1], tone:'sine', lowpass:2300, steps:2, drums:true },
  Electronic: { chords:[[0,7,12,15],[-4,3,8,12],[-7,0,5,8],[-2,5,10,14]], pattern:[0,2,3,1,0,3,2,1], tone:'triangle', lowpass:2250, steps:4, drums:true },
  Indie: { chords:[[0,4,7,14],[5,9,12,16],[2,5,9,12],[-5,2,7,11]], pattern:[0,2,1,3,2,0,3,1], tone:'triangle', lowpass:2700, steps:2, drums:true },
  Pop: { chords:[[0,4,7,11],[-3,0,4,7],[-7,-3,0,4],[-5,-1,2,7]], pattern:[2,3,1,2,0,1,3,2], tone:'sine', lowpass:2400, steps:2, drums:true }
};

class ArchiveAudio {
  constructor() {
    this.voices = new Set();
    this.context = null;
    this.track = null;
    this.media = new Audio();
    this.media.preload = 'metadata';
  }

  async prepare(volume, track) {
    this.media.volume = volume;
    if (track?.previewUrl) return;
    if (!this.context) {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) throw new Error('Web Audio unavailable');
      const context = this.context = new Audio();
      this.output = context.createGain();
      this.filter = context.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.Q.value = .35;
      this.filter.connect(this.output);
      this.output.connect(context.destination);
      this.noise = context.createBuffer(1, Math.round(context.sampleRate * .16), context.sampleRate);
      const samples = this.noise.getChannelData(0);
      let seed = 812;
      for (let i = 0; i < samples.length; i++) {
        seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
        samples[i] = (seed / 2147483648 - 1) * (1 - i / samples.length);
      }
    }
    this.volume(volume);
    if (this.context.state !== 'running') await this.context.resume();
    if (this.context.state !== 'running') throw new Error('Audio context could not start');
  }

  volume(value) {
    this.media.volume = value;
    if (this.output) this.output.gain.setTargetAtTime(value * .62, this.context.currentTime, .025);
  }

  play(track, position) {
    this.stop();
    this.track = track;
    if (track.previewUrl) {
      if (this.media.src !== track.previewUrl) this.media.src = track.previewUrl;
      this.media.currentTime = position;
      return this.media.play();
    }
    this.style = arrangements[track.album.category];
    this.interval = 60 / (track.album.bpm + track.order * 2) / this.style.steps;
    this.origin = this.context.currentTime + .055 - position;
    this.step = Math.ceil((position - .001) / this.interval);
    this.filter.frequency.setTargetAtTime(this.style.lowpass, this.context.currentTime, .06);
    this.schedule();
  }

  time() {
    if (this.track?.previewUrl) {
      if (Number.isFinite(this.media.duration)) this.track.duration = this.media.duration;
      return this.media.ended ? this.track.duration : this.media.currentTime;
    }
    return Math.max(0, this.context.currentTime - this.origin);
  }

  stop() {
    this.media.pause();
    this.track = null;
    if (!this.context) return;
    const now = this.context.currentTime;
    for (const [source, gain] of this.voices) {
      gain.gain.cancelScheduledValues(now);
      gain.gain.setTargetAtTime(.00001, now, .012);
      source.stop(now + .05);
    }
    this.voices.clear();
  }

  voice(source, at, length, amplitude, attack, peakTime = .55) {
    const gain = this.context.createGain();
    gain.gain.value = .00001;
    gain.gain.setValueAtTime(.00001, at);
    gain.gain.exponentialRampToValueAtTime(amplitude, at + attack);
    gain.gain.exponentialRampToValueAtTime(amplitude * peakTime, at + length * .48);
    gain.gain.exponentialRampToValueAtTime(.00001, at + length);
    source.connect(gain);
    gain.connect(this.filter);
    const voice = [source, gain];
    this.voices.add(voice);
    source.onended = () => {
      this.voices.delete(voice);
      source.disconnect();
      gain.disconnect();
    };
    source.start(at);
    source.stop(at + length + .02);
  }

  tone(note, type, at, length, amplitude, attack = .025) {
    const oscillator = this.context.createOscillator();
    oscillator.type = type;
    oscillator.frequency.value = 440 * 2 ** ((note - 69) / 12);
    this.voice(oscillator, at, length, amplitude, attack);
  }

  schedule(lookahead = .24) {
    if (!this.track || this.track.previewUrl) return;
    const now = this.context.currentTime;
    const { style, interval, track } = this;
    const bar = style.steps * 4;
    this.step = Math.max(this.step, Math.ceil((now - this.origin - .035) / interval));
    while (this.step * interval < track.duration && this.origin + this.step * interval < now + lookahead) {
      const step = this.step++;
      const at = Math.max(now + .004, this.origin + step * interval);
      const beat = step % bar;
      const phrase = Math.floor(step / bar);
      const chord = style.chords[(phrase + track.order) % style.chords.length];
      const key = 47 + track.seed % 10;
      if (beat === 0) {
        this.tone(key - 12 + chord[0], 'sine', at, interval * (style.drums ? 2.8 : 7.4), .17);
        for (const note of chord.slice(1, 4)) {
          this.tone(key + note, 'sine', at, interval * (bar + 1), .055, style.drums ? .08 : .48);
        }
      }
      if (style.drums || beat % 3 === 0) {
        const note = chord[style.pattern[(beat + track.seed + phrase) % style.pattern.length] % chord.length];
        this.tone(key + note + 12, style.tone, at, interval * (style.drums ? 2.2 : 4), .09, .026);
      }
      if (style.drums && (beat === 0 || beat === bar / 2)) {
        this.tone(key - 18, 'sine', at, .23, .23, .014);
      }
      if (style.drums && beat % style.steps === style.steps - 1) {
        const brush = this.context.createBufferSource();
        brush.buffer = this.noise;
        this.voice(brush, at, .14, .10, .012, .25);
      }
    }
  }
}
