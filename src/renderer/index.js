'use strict'

import { ipcRenderer } from 'electron';
import Channel from './channel';
import Gamepads from './gamepads';
import Mixer from './mixer';
import Synth from './synth';
import Visualizer from './visualizer';

document.body.style.background = 'radial-gradient(#222, #111 150%)';
document.body.style.color = '#eee';
document.body.style.fontFamily = 'sans-serif';
document.body.style.fontSize = '0.8rem';
document.body.style.height = '100vh';
document.body.style.margin = '0';

const context = new AudioContext();
const output = new Channel({
  context,
  filters: [{ type: 'analyser' }],
  gain: 0,
});
output.output.connect(context.destination);

const dom = document.getElementById('app');

const gamepads = new Gamepads();
const visualizer = new Visualizer({ analyser: output.filters[0], dom });
const synth = new Synth({ context, dom, gamepads, output });
const mixer = new Mixer({ dom, output });

ipcRenderer.on('clock', (e, time) => {
  gamepads.update();
  synth.onTick(time);
});
