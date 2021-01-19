import { app, BrowserWindow } from 'electron';
import path from 'path';
import glob from 'glob';
import logE from 'electron-log';
import { autoUpdater } from 'electron-updater';

import { getServerList } from './app/services/servers';


const { Servers } = require('./app/models/Servers');

const Files = require('./app/main-process/util');
const log = require('./app/main-process/log');

let win;

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

async function getServersFile() {
  win.webContents.send('spinner', [true]);
  const serverListResponse = await getServerList();
  const servers = new Servers(serverListResponse.data);
  const status = await servers.ping();

}

function getUpdate() {
  logE.transports.file.level = 'debug';
  autoUpdater.logger = logE;
  autoUpdater.checkForUpdatesAndNotify();
}

function initialize() {
  loadMainFiles();

  function createWindow() {
    win = new BrowserWindow({ show: false, width: 1200, height: 475, webPreferences: { nodeIntegration: true }, resizable: false });
    win.webContents.openDevTools();
    win.loadFile('./index.html');

    win.setMenuBarVisibility(false);

    win.on('closed', () => {
      win = null;
    });

    win.once('ready-to-show', () => {
      win.show();
      getServersFile();
      getUpdate();
      win.webContents.send('version', [app.getVersion()]);
    });
  }

  app.allowRendererProcessReuse = true;

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });
}

initialize();
