'use strict'

import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

const production = process.env.NODE_ENV === 'production';

let win;
let interval;

app.on('ready', () => {
  win = new BrowserWindow({
    title: 'SynthStick',
    width: 256,
    height: 300,
    maximizable: false,
    minimizable: false,
    resizable: false,
    webPreferences: { nodeIntegration: true },
  });
  win.on('close', () => {
    win = null;
    clearInterval(interval);
  });
  win.removeMenu();
  win.loadURL(production ? (
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    })
  ) : (
    `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
  ));
  interval = setInterval(() => win.send('clock', new Date() / 1000), 1000 / 60);
  // !production && win.toggleDevTools();
});

app.on('window-all-closed', () => {
  app.quit();
});
