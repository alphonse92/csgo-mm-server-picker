import { ipcMain, BrowserWindow } from 'electron'

import { ServerController } from '../controllers/Server';
import { getServerList } from '../services/servers';

const { Clusters } = require('../models/clusters');
const Firewall = require('./firewall');

ipcMain.on('request-ping', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  const serverController = new ServerController(win);
  serverController.retrieveServerData();
});

ipcMain.on('request-block-firewall', (event, ipList) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.webContents.send('spinner', [true]);
  win.webContents.send('reset-worldmap-iplist');

  const firewall = new Firewall(win);
  firewall.exec(ipList);
});

ipcMain.on('request-reset-firewall', async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.webContents.send('spinner', [true]);
  win.webContents.send('reset-worldmap-iplist');

  const serverList = await getServerList();
  const clusters = new Clusters(serverList.data);
  clusters.convert();

  if (process.platform === 'linux') {
    new Firewall(win, clusters.clustersId, clusters).reset();
  }

  if (process.platform === 'win32') {
    new Firewall(win).reset();
  }
});
