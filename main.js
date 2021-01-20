import { app, BrowserWindow } from 'electron';
import path from 'path';
import glob from 'glob';

import { ServerController } from './app/controllers/Server';
import Files from './app/main-process/util';
import log from './app/main-process/log';

let win;

const closeApp = () => app.quit();


function loadMainFiles() {
  try {
    new Files().create();
    const files = glob.sync(path.join(__dirname, './app/main-process/*.js'));
    files.forEach((file) => {
      require(file);
    });
  } catch (error) {
    log.error(error.stack);
  }
}

function initialize() {
  app.allowRendererProcessReuse = true;
  loadMainFiles();

  function createWindow() {
    win = new BrowserWindow({ show: false, width: 1200, height: 475, webPreferences: { nodeIntegration: true }, resizable: false });
    win.webContents.openDevTools();
    win.loadFile('./index.html');
    win.setMenuBarVisibility(false);

    const serverController = new ServerController(win);

    win.on('closed', () => {
      win = null;
    });

    win.once('ready-to-show', () => {
      win.show();
      serverController.retrieveServerData();
      win.webContents.send('version', [app.getVersion()]);
    });
  }

  app.on('ready', createWindow);
  app.on('window-all-closed', closeApp);
  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });
}

initialize();
