class Voice {
  constructor({ context, waves }) {
    this.context = context;
    this.output = context.createGain();

    this.oscillators = waves.map(({ type, offset }) => {
      const gain = context.createGain();
      gain.gain.setValueAtTime((1 / waves.length) * 0.5, context.currentTime);
      gain.connect(this.output);
      const oscillator = context.createOscillator();
      oscillator.offset = offset;
      oscillator.type = type;
      oscillator.connect(gain);
      oscillator.start(context.currentTime);
      return oscillator;
    });

    this.gain = 1;
    this.note = 0;
  }


  get gain() {
    return this._gain;
  }

  set gain(value) {
    const { context, output: { gain } } = this;
    if (this._gain === value) {
      return;
    }
    this._gain = value;
    gain.cancelScheduledValues(0);
    gain.linearRampToValueAtTime(
      value,
      context.currentTime + 0.01
    );
  }

  get note() {
    return this._note;
  }

  set note(value) {
    const { context, oscillators } = this;
    if (this._note === value) {
      return;
    }
    this._note = value;
    oscillators.forEach(({ frequency, offset }) => {
      frequency.cancelScheduledValues(0);
      frequency.exponentialRampToValueAtTime(
        Voice.frequencies[value + offset],
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