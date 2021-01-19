import { DEF_REGION_NAME, REGIONS } from '../lib/constants';
import { Cluster } from './Cluster';
import { ClusterCity } from './ClusterCity';


export class Servers {
  /**
   * Response of this file
   * https://raw.githubusercontent.com/SteamDatabase/SteamTracking/master/Random/NetworkDatagramConfig.json
   * @param {*} NetworkDatagramData
   */
  constructor(NetworkDatagramData) {
    this.clusters = {};
    this.clustersId = [];
    this._data = NetworkDatagramData;

    Object
      .keys(NetworkDatagramData.pops)
      .forEach((cityId) => {
        const pop = NetworkDatagramData.pops[cityId];
        const regionName = REGIONS[cityId] || DEF_REGION_NAME;
        const region = this.clusters[regionName] || new Cluster({
          name: regionName,
        });
        region.addCity(new ClusterCity({ ...pop, id: cityId }));
        this.clusters[regionName] = region;
      });
  }

  async ping() {
    for (const cluster of this.clusters) {
      
    }
  }
}
