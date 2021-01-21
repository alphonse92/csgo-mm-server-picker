import { ipcMain, BrowserWindow } from 'electron'
import { FirewallController } from '../controllers/Firewall';

import { ServerController } from '../controllers/Server';

ipcMain.on('request-ping', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  const serverController = new ServerController(win);
  serverController.retrieveServerData();
});

ipcMain.on('request-block-firewall', async (event, ipList) => {
  FirewallController.block(ipList);
});

ipcMain.on('request-reset-firewall', async (
  // event
) => {
  FirewallController.reset();
});
