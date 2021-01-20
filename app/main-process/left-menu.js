import { ipcMain, BrowserWindow } from 'electron'

import { Firewall } from '../lib/firewalls';
import { ServerController } from '../controllers/Server';

ipcMain.on('request-ping', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  const serverController = new ServerController(win);
  serverController.retrieveServerData();
});

ipcMain.on('request-block-firewall', (event, ipList) => {
  const firewall = new Firewall();
  firewall.block(ipList);
});

ipcMain.on('request-reset-firewall', async (
  // event
) => {
  const firewall = new Firewall();
  firewall.reset();
});
