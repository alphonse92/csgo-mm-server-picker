import { DEF_CITY_NAME, DEF_REGION_NAME, REGIONS } from './../lib/constants';

export class ClusterStatus {
  constructor() {
    this.time = 0;
    this.isAlive = false;
  }
}

export class ClusterCity {
  constructor({
    id,
    desc: name,
    geo: location,
    relay_addresses: addresses,
  }) {
    this.id = id;
    this.name = name || DEF_CITY_NAME;
    this.location = location;
    this.addresses = addresses;
  }
}


/**
 * Represent a set of servers for a region
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
  }

  addCity(city) {
    this.cities.push(city);
  }

  get addresses() {
    return this.cities.reduce((out, { addresses }) => [...out, ...addresses], []);
  }

}

export class Clusters {
  /**
   * Response of this file
   * https://raw.githubusercontent.com/SteamDatabase/SteamTracking/master/Random/NetworkDatagramConfig.json
   * @param {*} NetworkDatagramData
   */
  constructor(NetworkDatagramData) {
    this.regions = {};
    this.clustersId = [];
    this.status = new ClusterStatus();
    this._data = NetworkDatagramData;

    Object
      .keys(NetworkDatagramData.pops)
      .forEach((cityId) => {
        const pop = NetworkDatagramData.pops[cityId];
        const regionName = REGIONS[cityId] || DEF_REGION_NAME;
        const region = this.regions[regionName] || new Cluster({
          name: regionName,
        });
        region.addCity(new ClusterCity({ ...pop, id: cityId }));
        this.regions[regionName] = region;
      });
  }
}
