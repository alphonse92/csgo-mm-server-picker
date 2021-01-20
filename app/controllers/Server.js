import { Servers } from '../models/Servers';
import { getServerList } from '../services/servers';

/**
 * Server Controller connects the back with the front
 */
export class ServerController {
  constructor(BrowserWindow) {
    this.BrowserWindow = BrowserWindow;
  }

  async retrieveServerData() {
    this.BrowserWindow.webContents.send('spinner', [true]);
    const serverListResponse = await getServerList();
    const servers = new Servers(serverListResponse.data);
    const onCityPing = (clusterCity) => {
      const {
        id,
        name: cityName,
        regionId: continentId,
        cityStatus,
        addresses = [],
      } = clusterCity;
      const {
        mean: time,
        isAlive: alive,
      } = cityStatus;

      addresses.forEach((host) => {
        this.BrowserWindow.webContents.send('update-ip-list', [id, host, cityName, continentId, time, alive]);
      });
    };
    await servers.ping({ onCityPing });
    this.BrowserWindow.webContents.send('spinner', [false]);
  }
}