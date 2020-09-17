export const ipcRenderer = {
  on(e, cb) {
    if (e !== 'clock') {
      throw new Error();
    }
    const tick = () => {
      requestAnimationFrame(tick);
      cb(undefined, new Date() / 1000);
    };
    tick();
  },
};
