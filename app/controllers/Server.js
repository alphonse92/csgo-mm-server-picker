import { Servers } from '../models/Servers';
import { getServerList } from '../services/servers';
import { AppStore } from '../store';
import { Host } from './Host';

/**
 * Server Controller connects the back with the front
 */
export class ServerController {
  constructor(BrowserWindow) {
    this.BrowserWindow = BrowserWindow;
  }

  async retrieveServerData({ cache = false }) {
    const hostsInStore = Object.values(await Host.getHosts());
    const hosts = cache ? hostsInStore : [];
    const thereAreHosts = hosts.length;

    if (thereAreHosts) {
      this.BrowserWindow.webContents.send('update-ip-list', [JSON.stringify(hosts)]);
      return;
    }

    const hostsMap = {}

    this.BrowserWindow.webContents.send('spinner', [true]);
    const serverListResponse = await getServerList();
    const servers = new Servers(serverListResponse.data);
    const onCityPing = async (clusterCity) => {
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
      for (let i = 0; i < addresses.length; i++) {
        const ip = addresses[i];
        const host = new Host({ id, ip, cityName, continentId, time, alive });
        const hostInfo = await host.save();
        hostsMap[hostInfo.id] = hostInfo;
      }
    };

    await servers.ping({ onCityPing });
    this.BrowserWindow.webContents.send('update-ip-list', [JSON.stringify(Object.values(hostsMap))]);
    this.BrowserWindow.webContents.send('spinner', [false]);
  }
}
