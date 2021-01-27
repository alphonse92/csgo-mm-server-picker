import { app, BrowserWindow } from 'electron';
import path from 'path';
import glob from 'glob';

import { ServerController } from './../../app/controllers/Server';
import Files from './../../app/main-process/util';
import log from './../../app/main-process/log';

export class ElectronInstance {
  constructor() {
    this.options = {
      show: false,
      width: 1200,
      height: 475,
      webPreferences:
      {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
      resizable: false,
    };
  }

  loadMainFiles = () => {
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

  createWindow = () => {
    this.win = new BrowserWindow({ show: false, width: 1200, height: 475, webPreferences: { nodeIntegration: true, enableRemoteModule: true }, resizable: false });
    this.win.webContents.openDevTools();
    this.win.loadFile('./index.html');
    this.win.setMenuBarVisibility(false);
    this.win.show();
    this.win.webContents.send('version', [app.getVersion()]);
    this.win.on('closed', this.destroyWindow);

    // this.win.once('ready-to-show', this.showWindow);
    // const serverController = new ServerController(this.win);
    // await serverController.retrieveServerData({ cache: true });

  }


  destroyWindow = () => {
    this.win = null;
  }

  activate = () => {
    if (this.win === null) {
      this.createWindow();
    }
  }

  start = () => {
    this.loadMainFiles();
    app.allowRendererProcessReuse = true;
    app.on('ready', this.createWindow);
    app.on('window-all-closed', this.close);
    app.on('activate', this.activate);
  }

  close = () => {
    app.quit();
  }
}

