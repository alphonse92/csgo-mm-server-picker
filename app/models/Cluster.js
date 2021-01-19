
import { ClusterStatus } from './ClusterStatus';

/**
 * Represents a set of servers for a region
 */
export class Cluster {
  /**
   * Constructor
   * @param {*} relayAddresses array of ip's of each server
   * @param {*} cityName city where the cluster is from
   * @param {*} continentId  name of the region (region)
   */
  constructor({ name, cities = [] }) {
    this.name = name;
    this.cities = cities;
    this.status = new ClusterStatus();
  }

  addCity(city) {
    this.cities.push(city);
  }

  get addresses() {
    return this.cities.reduce((out, { addresses }) => [...out, ...addresses], []);
  }

}
