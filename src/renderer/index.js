'use strict'

import { ipcRenderer } from 'electron';
import Channel from './channel';
import Gamepads from './gamepads';
import Mixer from './mixer';
import Synth from './synth';
import Visualizer from './visualizer';

const context = new AudioContext();
window.addEventListener('mousedown', () => {
  if (context.state !== 'running') {
    context.resume();
  }
});
const output = new Channel({
  context,
  filters: [{ type: 'analyser' }],
  gain: 0,
});
output.output.connect(context.destination);

document.body.style.margin = '0';
const dom = document.getElementById('app');
dom.style.background = 'linear-gradient(#333, #151515)';
dom.style.color = '#eee';
dom.style.fontFamily = 'sans-serif';
dom.style.fontSize = '0.8rem';
if (!dom.style.width) {
  dom.style.width = '100vw';
}
if (!dom.style.height) {
  dom.style.height = '100vh';
}

const gamepads = new Gamepads();
const visualizer = new Visualizer({ analyser: output.filters[0], dom });
const synth = new Synth({ context, dom, gamepads, output });
const mixer = new Mixer({ dom, output });

ipcRenderer.on('clock', (e, time) => {
  gamepads.update();
  synth.onTick(time);
});
