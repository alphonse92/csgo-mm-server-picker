import { app, BrowserWindow } from 'electron';
import path from 'path';
import glob from 'glob';
import logE from 'electron-log';
import { autoUpdater } from 'electron-updater';

import { getServerList } from './app/services/servers';

const { Clusters } = require('./app/models/clusters');
const { Clusters: Cluster2 } = require('./app/models/cluster2');
const PingWrapper = require('./app/main-process/ping');
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

  getServerList().then((response) => {
    const clusters = new Clusters(response.data);
    clusters.convert();

    console.log(new Cluster2(response.data).regions['na-east'].addresses)

    const ping = new PingWrapper(clusters, win);
    ping.execute();
  }).catch((error) => {
    log.error(error.stack);
  });
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
