class Channel {
  constructor({
    context,
    filters,
    gain = 1,
    muted = false,
  }) {
    this.context = context;
    this.output = context.createGain();
    this.output.gain.setValueAtTime(muted ? 0 : gain, context.currentTime);
    if (filters) {
      this.filters = filters.map(({
        type,
        amount,
        detune,
        frequency,
        gain,
        Q,
      }) => {
        let filter;
        switch (type) {
          case 'analyser':
            filter = context.createAnalyser();
            filter.fftSize = 1024;
            filter.buffer = new Uint8Array(filter.fftSize);
            break;
          case 'distortion':
            filter = context.createWaveShaper();
            filter.curve = Channel.getDistortionCurve(amount);
            filter.oversample = '4x';
            break;
          default:
            filter = context.createBiquadFilter();
            filter.type = type;
            if (detune !== undefined) {
              filter.detune.setValueAtTime(detune, context.currentTime);
            }
            if (frequency !== undefined) {
              filter.frequency.setValueAtTime(frequency, context.currentTime);
            }
            if (gain !== undefined) {
              filter.gain.setValueAtTime(gain, context.currentTime);
            }
            if (Q !== undefined) {
              filter.Q.setValueAtTime(Q, context.currentTime);
            }
        }
        return filter;
      });
      this.filters.forEach((filter, i) => {
        if (i > 0) {
          this.filters[i - 1].connect(filter);
        } else {
          this.input = filter;
        }
        if (i === this.filters.length - 1) {
          filter.connect(this.output);
        }
      });
    } else {
      this.input = this.output;
    }
    this._gain = gain;
    this._muted = muted;
  }

  get gain() {
    return this._gain;
  }

  set gain(value) {
    if (this._gain === value) {
      return;
    }
    this._gain = value;
    this.updateGain();
  }

  get muted() {
    return this._muted;
  }

  set muted(value) {
    if (this._muted === value) {
      return;
    }
    this._muted = value;
    this.updateGain();
  }

  updateGain() {
    const {
      context,
      gain,
      muted,
      output,
    } = this;
    const target = muted ? 0 : gain;
    output.gain.cancelScheduledValues(0);
    output.gain.linearRampToValueAtTime(
      target,
      context.currentTime + 0.01
    );
  }

  static getDistortionCurve(k) {
    const { distortionCurves } = Channel;
    let curve = distortionCurves.get(k);
    if (!curve) {
      const deg = Math.PI / 180;
      const samples = 44100;
      curve = new Float32Array(samples);
      for (let i = 0; i < samples; i += 1) {
        const j = (i * 2) / samples - 1;
        curve[i] = ((3 + k) * j * 20 * deg) / (Math.PI + k * Math.abs(j));
      }
      distortionCurves.set(k, curve);
    }
    return curve;
  }
}

Channel.analyserBands = [2, 4, 8, 16, 32, 64, 128, 256, 512];
Channel.distortionCurves = new Map();

export default Channel;
