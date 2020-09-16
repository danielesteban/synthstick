import { EventEmitter } from 'events';

class Gamepads extends EventEmitter {
  constructor() {
    super();
    this.cache = new Map();
  }

  update() {
    const { cache } = this;
    const frame = navigator.getGamepads();
    const len = frame.length;
    for (let i = 0; i < len; i += 1) {
      const gamepad = frame[i];
      if (gamepad) {
        const { id } = gamepad;
        const axes = gamepad.axes.map((value) => Math.abs(value) < Gamepads.deadZone ? 0 : value);
        const buttons = gamepad.buttons.map(({ pressed }) => pressed);
        let state = cache.get(id);
        if (state) {
          axes.forEach((value, axis) => {
            if (state.axes[axis] !== value) {
              this.emit('change', { type: 'axis', gamepad: id, index: axis, value });
            }
          });
          buttons.forEach((pressed, button) => {
            if (state.buttons[button] !== pressed) {
              this.emit('change', { type: 'button', gamepad: id, index: button, value: pressed ? 1 : -1 });
            }
          });
        }
        cache.set(id, { axes, buttons });
      }
    }
  }
}

Gamepads.deadZone = 0.1;

export default Gamepads;
