import { getServerList } from '../services/servers';

const PingWrapper = require('./ping');
const ServersService = require('../services/servers');
const { Clusters } = require('../models/clusters');
const Firewall = require('./firewall');
const { ipcMain, BrowserWindow } = require('electron');

// Exécute un ping ordonné par l'utilisateur
ipcMain.on('request-ping', (event) => {
  ping(event);
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

async function ping(event) {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.webContents.send('spinner', [true]);
  win.webContents.send('reset-worldmap-iplist');
  const serverList = await getServerList();
  const clusters = new Clusters(serverList.data);
  clusters.convert();

  const pingInstance = new PingWrapper(clusters, win);
  pingInstance.execute();
}
