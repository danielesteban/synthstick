import Channel from './channel';
import Voice from './voice';

class Mixer {
  constructor({ dom, output }) {
    const mixer = document.createElement('div');
    mixer.style.background = '#000';
    mixer.style.display = 'flex';
    mixer.style.padding = '0.25rem';
    dom.appendChild(mixer);
    const gain = document.createElement('input');
    gain.type = 'range';
    gain.min = 0;
    gain.max = 1;
    gain.step = 0.01;
    gain.value = output.gain;
    gain.style.boxSizing = 'border-box';
    gain.style.width = '100%';
    gain.style.outline = 'none';
    gain.addEventListener('input', ({ target: { value } }) => {
      output.gain = parseFloat(value);
    });
    mixer.appendChild(gain);
  }
}

export default Mixer;
