import { getStore } from '../store';

export class Host {
  constructor({ id, ip, cityName, continentId, time, alive }) {
    this.id = id;
    this.ip = ip;
    this.cityName = cityName;
    this.continentId = continentId;
    this.clusterId = continentId;
    this.time = time;
    this.alive = alive;
    this.clusterPathState = `root.servers.clusters.${this.clusterId}`;
    this.pathState = `${this.clusterPathState}.${this.id}`;
  }

  async save() {
    const { id, ip, cityName, continentId, time, alive } = this;
    const clusterDefault = { id, cityName, continentId, time, alive, addresses: [] };
    const currentHost = await getStore().get(this.pathState) || clusterDefault;
    currentHost.addresses.push(ip);
    await getStore().set(this.pathState, currentHost);
    return currentHost;
  }

  static async getHosts(clusterId) {
    if (!clusterId) return {};
    return await getStore().get(this.clusterPathState);
  }
}
