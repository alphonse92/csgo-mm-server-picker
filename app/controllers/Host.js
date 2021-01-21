import { AppStore } from '../store';

export class Host {
  constructor({ id, ip, cityName, continentId, time, alive }) {
    this.id = id;
    this.ip = ip;
    this.cityName = cityName;
    this.continentId = continentId;
    this.time = time;
    this.alive = alive;
  }

  async save() {
    const { id, ip, cityName, continentId, time, alive } = this;
    const currentHost = await AppStore.set(`root.servers.hosts.${this.id}`, this)
      || { id, cityName, continentId, time, alive, addresses: [] };
    currentHost.addresses.push(ip);
    await AppStore.set(`root.servers.hosts.${this.id}`, currentHost);
    return currentHost;
  }

  static async getHosts() {
    return (await AppStore.get('root.servers.hosts')) || {};
  }
}