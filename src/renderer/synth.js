import Channel from './channel';
import Voice from './voice';

class Synth {
  constructor({ context, dom, gamepads, output }) {
    this.context = context;
    this.channel = new Channel({
      context,
      filters: [
        { type: 'highpass', frequency: 512 },
        { type: 'distortion', amount: 1024 },
      ],
      gain: 1,
      muted: true,
    });
    this.voice = new Voice({
      context,
      waves: [
        { enabled: true, type: 'sine', offset: 0 },
        { enabled: true, type: 'triangle', offset: 7 },
        { type: 'sawtooth', offset: 12 },
        { type: 'square', offset: 14 },
      ],
    });
    this.voice.output.connect(this.channel.input);
    this.channel.output.connect(output.input);

    this.controls = {};
    this.mappings = new Map();
    const controls = document.createElement('div');
    controls.style.padding = '0.5rem';
    dom.appendChild(controls);
    Synth.controls.forEach((id) => {
      const control = document.createElement('div');
      control.style.display = 'flex';
      control.style.justifyContent = 'space-between';
      control.style.padding = '0.25rem 0';
      const label = document.createElement('label');
      label.style.position = 'relative';
      label.style.flexGrow = '1';
      label.style.padding = '0 0.25rem';
      label.style.marginRight = '0.25rem';
      label.style.border = '1px solid #000';
      control.appendChild(label);
      const bar = document.createElement('span');
      bar.style.position = 'absolute';
      bar.style.top = '0px';
      bar.style.left = '0px';
      bar.style.width = '0%';
      bar.style.height = '100%';
      bar.style.background = '#393';
      label.appendChild(bar);
      const text = document.createElement('span');
      text.style.position = 'relative';
      text.innerText = id;
      label.appendChild(text);
      const state = {
        bar,
        mapping: localStorage.getItem(`synthstick:mapping:${id}`) || undefined,
        centered: localStorage.getItem(`synthstick:modifier:${id}:centered`) || false,
        enabled: localStorage.getItem(`synthstick:modifier:${id}:enabled`) || false,
        inverted: localStorage.getItem(`synthstick:modifier:${id}:inverted`) || false,
        value: 0,
      };
      if (state.mapping) {
        this.mappings.set(state.mapping, id);
      }
      this.controls[id] = state;
      Synth.modifiers.forEach((modifier) => {
        const button = document.createElement('button');
        button.style.background = state[modifier] ? '#393' : '#333';
        button.style.width = '20px';
        button.style.border = '1px solid #000';
        button.style.color = '#eee';
        button.style.fontFamily = 'inherit';
        button.style.padding = '0';
        button.style.outline = 'none';
        button.innerText = modifier.substr(0, 1).toUpperCase();
        button.addEventListener('click', () => {
          state[modifier] = !state[modifier];
          button.style.background = state[modifier] ? '#393' : '#333';
          if (state[modifier]) {
            localStorage.setItem(`synthstick:modifier:${id}:${modifier}`, true);
          } else {
            localStorage.removeItem(`synthstick:modifier:${id}:${modifier}`);
          }
        });
        control.appendChild(button);
      });
      const map = document.createElement('button');
      map.style.background = '#111';
      map.style.border = '1px solid #000';
      map.style.color = '#eee';
      map.style.fontFamily = 'inherit';
      map.style.fontSize = '0.8em';
      map.style.outline = 'none';
      map.innerText = 'MAP';
      map.addEventListener('click', () => {
        map.style.background = '#393';
        gamepads.prependOnceListener('change', ({ type, gamepad, index }) => {
          map.style.background = '#222';
          if (state.mapping && this.mappings.get(state.mapping) === id) {
            this.mappings.delete(state.mapping);
          }
          state.mapping = `${type}:${gamepad}:${index}`;
          this.mappings.set(state.mapping, id);
          localStorage.setItem(`synthstick:mapping:${id}`, state.mapping);
        });
      });
      control.appendChild(map);
      controls.appendChild(control);
    });
    gamepads.on('change', this.onGamepad.bind(this));

    const options = document.createElement('div');
    options.style.background = '#000';
    options.style.display = 'flex';
    options.style.justifyContent = 'space-between';
    options.style.padding = '0.5rem';
    dom.appendChild(options);
    this.bpm = 120;
    const bpm = document.createElement('input');
    bpm.type = 'number';
    bpm.min = 0;
    bpm.value = 120;
    bpm.style.background = '#222';
    bpm.style.border = '1px solid #000';
    bpm.style.color = '#eee';
    bpm.style.outline = 'none';
    bpm.style.width = '30%';
    bpm.addEventListener('change', ({ target: { value } }) => {
      this.bpm = parseInt(value, 10);
    });
    options.appendChild(bpm);
    this.root = Synth.roots[0];
    const roots = document.createElement('select');
    roots.style.background = '#222';
    roots.style.border = '1px solid #000';
    roots.style.color = '#eee';
    roots.style.outline = 'none';
    roots.style.width = '30%';
    roots.addEventListener('change', ({ target: { value } }) => {
      this.root = value;
      this.updateNotes();
    });
    options.appendChild(roots);
    Synth.roots.forEach((id) => {
      const option = document.createElement('option');
      option.innerText = id;
      roots.appendChild(option);
    });
    this.scale = Object.keys(Synth.scales)[0];
    const scales = document.createElement('select');
    scales.style.background = '#222';
    scales.style.border = '1px solid #000';
    scales.style.color = '#eee';
    scales.style.outline = 'none';
    scales.style.width = '30%';
    scales.addEventListener('change', ({ target: { value } }) => {
      this.scale = value;
      this.updateNotes();
    });
    options.appendChild(scales);
    Object.keys(Synth.scales).forEach((id) => {
      const option = document.createElement('option');
      option.innerText = id;
      scales.appendChild(option);
    });

    const waves = document.createElement('div');
    waves.style.padding = '0.25rem 0.5rem';
    dom.appendChild(waves);
    this.voice.waves.forEach((state, index) => {
      const wave = document.createElement('div');
      wave.style.display = 'flex';
      wave.style.justifyContent = 'space-between';
      wave.style.padding = '0.125rem 0';
      const enabled = document.createElement('input');
      enabled.type = 'checkbox';
      enabled.checked = !!state.enabled;
      enabled.addEventListener('change', ({ target: { checked } }) => {
        state.enabled = checked;
        this.voice.updateWaves();
      });
      wave.appendChild(enabled);
      const type = document.createElement('select');
      type.style.background = '#111';
      type.style.border = '1px solid #000';
      type.style.color = '#eee';
      type.style.outline = 'none';
      type.style.width = '40%';
      type.addEventListener('change', ({ target: { value } }) => {
        state.type = value;
        this.voice.updateWaves();
      });
      ['Sine', 'Square', 'Sawtooth', 'Triangle'].forEach((id) => {
        const option = document.createElement('option');
        option.innerText = id;
        option.value = id.toLowerCase();
        type.appendChild(option);
      });
      type.value = state.type;
      wave.appendChild(type);
      const offset = document.createElement('input');
      offset.type = 'number';
      offset.min = 0;
      offset.value = state.offset;
      offset.style.background = '#111';
      offset.style.border = '1px solid #000';
      offset.style.color = '#eee';
      offset.style.outline = 'none';
      offset.style.width = '40%';
      offset.addEventListener('change', ({ target: { value } }) => {
        state.offset = parseInt(value, 10);
        this.voice.updateWaves();
      });
      wave.appendChild(offset);
      waves.appendChild(wave);
    });

    this.updateNotes();
  }

  onGamepad({ type, gamepad, index, value }) {
    const { channel, context, controls, mappings, notes, voice } = this;
    const id = mappings.get(`${type}:${gamepad}:${index}`);
    if (!id) {
      return;
    }
    const control = controls[id];
    control.value = control.centered && type !== 'button' ? Math.abs(value) : (value + 1) * 0.5;
    if (control.inverted) {
      control.value = 1 - control.value;
    }
    control.bar.style.width = `${control.value * 100}%`;
    if (!control.enabled) {
      return;
    }
    switch (id) {
      case 'Pitch':
        voice.note = notes[Math.floor((notes.length - 7) * control.value)];
        break;
      case 'Gain':
        channel.gain = control.value;
        break;
      case 'HiPass':
        channel.filters[0].frequency.cancelScheduledValues(0);
        channel.filters[0].frequency.linearRampToValueAtTime(
          512 + 2048 * (control.value ** 2),
          context.currentTime + 0.01
        );
        break;
      default:
        break;
    }
  }

  onTick(time) {
    const { bpm, channel, controls } = this;
    const cutoff = (2 ** (1 + Math.floor(4 * (1 - controls.CutOff.value))));
    channel.muted = controls.CutOff.enabled && (Math.floor((time / (60 / bpm)) * 32) % (cutoff * 2)) >= cutoff;
  }

  updateNotes() {
    const { scales, roots, octave } = Synth;
    const root = roots.indexOf(this.root);
    const scale = scales[this.scale];
    const notes = [];
    for (let o = 0; o < 3; o += 1) {
      let note = ((octave + o) * 12) + root;
      notes.push(note);
      scale.forEach((interval) => {
        note += interval;
        notes.push(note);
      });
    }
    this.notes = notes;
    this.voice.note = notes[Math.floor((notes.length - 7) * this.controls.Pitch.value)];
  }
}

Synth.controls = [
  'Pitch',
  'CutOff',
  'HiPass',
  'Gain',
];
Synth.modifiers = [
  'enabled',
  'centered',
  'inverted',
];
Synth.octave = 1;
Synth.roots = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];
Synth.scales = {
  Aeolian: [2, 1, 2, 2, 1, 2],
  Locrian: [1, 2, 2, 1, 2, 2],
  Ionian: [2, 2, 1, 2, 2, 2],
  Dorian: [2, 1, 2, 2, 2, 1],
  Phrygian: [1, 2, 2, 2, 1, 2],
  Lydian: [2, 2, 2, 1, 2, 2],
  Mixolydian: [2, 2, 1, 2, 2, 1],
  'Melodic ascending minor': [2, 1, 2, 2, 2, 2],
  'Phrygian raised sixth': [1, 2, 2, 2, 2, 2],
  'Lydian raised fifth': [2, 2, 2, 2, 1, 2],
  'Major minor': [2, 2, 1, 2, 1, 2],
  Altered: [1, 2, 1, 2, 2, 2],
  Eastern: [1, 2, 2, 2, 1, 3],
};

export default Synth;
