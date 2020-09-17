class Voice {
  constructor({ context, waves }) {
    this.context = context;
    this.output = context.createGain();
    this.output.gain.setValueAtTime(1, context.currentTime);
    this.waves = waves;
    this.updateWaves();
  }

  get note() {
    return this._note;
  }

  set note(value) {
    if (this._note === value) {
      return;
    }
    this._note = value;
    this.updateFrequencies();
  }

  updateWaves() {
    const { context, oscillators, output, waves } = this;
    if (oscillators) {
      oscillators.forEach((oscillator) => {
        oscillator.output.disconnect(output);
        oscillator.disconnect(oscillator.output);
        oscillator.stop(context.currentTime);
      });
    }
    const enabled = waves.filter(({ enabled }) => !!enabled);
    this.oscillators = enabled.map(({ type, offset }) => {
      const gain = context.createGain();
      gain.gain.setValueAtTime((1 / enabled.length) * 0.5, context.currentTime);
      gain.connect(output);
      const oscillator = context.createOscillator();
      oscillator.offset = offset;
      oscillator.type = type;
      oscillator.output = gain;
      oscillator.connect(gain);
      oscillator.start(context.currentTime);
      return oscillator;
    });
    if (this.note !== undefined) {
      this.updateFrequencies();
    }
  }

  updateFrequencies() {
    const { context, note, oscillators } = this;
    oscillators.forEach(({ frequency, offset }) => {
      frequency.cancelScheduledValues(0);
      frequency.exponentialRampToValueAtTime(
        Voice.frequencies[note + offset],
        context.currentTime + 0.01
      );
    });
  }
}

Voice.frequencies = (() => {
  const tuning = 440;
  const equalTemperament = (note) => (
    (2 ** ((note - 69) / 12)) * tuning
  );
  const frequencies = [];
  for (let i = 24; i < 96; i += 1) {
    frequencies.push(equalTemperament(i));
  }
  return frequencies;
})();

export default Voice;