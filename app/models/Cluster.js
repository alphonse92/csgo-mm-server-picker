import { getStore } from '../store';

/**
 * Represents a set of servers for a region
 */
export class Cluster {

  constructor({ name, cities = [] }) {
    this.id = name;
    this.name = name;
    this.cities = cities;
  }

  addCity(city) {
    this.cities.push(city);
  }

  get addresses() {
    return this.cities.reduce((out, { addresses }) => [...out, ...addresses], []);
  }

  async ping({
    onClusterPing = () => undefined,
    onCityPing = () => undefined,
  } = {}) {
    try {
      for (let i = 0; i < this.cities.length; i++) {
        const city = this.cities[i];
        await city.ping(onCityPing);
      }
      onClusterPing(this);
    } catch (e) {
      console.log(e);
    }
  }

  bestTime() {
    const times = this.cities.map(({ cityStatus }) => cityStatus.min);
    return Math.min(...times);
  }

  async save() {
    const path = `root.servers.clusters.${this.id}`;
    await getStore().set(path, {});
  }

}
