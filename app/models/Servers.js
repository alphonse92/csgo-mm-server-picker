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
        region.addCity(new ClusterCity({ ...pop, id: cityId, regionId: region.name }));
        this.clusters[regionName] = region;
      });
  }

  ping({
    onClusterPing,
    onCityPing,
  } = {}) {
    return Promise.all(
      Object
        .keys(this.clusters)
        .map((regionName) => {
          const cluster = this.clusters[regionName];
          return cluster.ping({ onClusterPing, onCityPing });
        }));
  }

  async awaitingPing({
    onClusterPing,
    onCityPing,
  } = {}) {
    const regionNames = Object.keys(this.clusters);
    for (let i = 0; i < regionNames.length; i++) {
      const regionName = regionNames[i]
      const cluster = this.clusters[regionName];
      await cluster.ping({ onClusterPing, onCityPing });
    }
  }

  async detachedPing({
    onClusterPing,
    onCityPing,
  } = {}) {
    const regionNames = Object.keys(this.clusters);
    for (let i = 0; i < regionNames.length; i++) {
      const regionName = regionNames[i];
      const cluster = this.clusters[regionName];
      await cluster.ping({ onClusterPing, onCityPing });
    }
  }

}
