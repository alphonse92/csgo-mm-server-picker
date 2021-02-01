import { DEF_CITY_NAME } from '../lib/constants';
import { ping } from '../services/networking';
import { ClusterCityStatus } from './ClusterCityStatus';

export class ClusterCity {
  constructor({
    id,
    desc: name,
    geo: location,
    relay_addresses: addresses = [],
    regionId,
  }) {
    this.id = id;
    this.name = name || DEF_CITY_NAME;
    this.location = location;
    this.addresses = addresses.map(ip => ip.split(':')[0]);
    this.cityStatus = new ClusterCityStatus();
    this.regionId = regionId;
  }

  async ping(onCityPing = () => undefined) {
    try {
      const addressesWithNoPorts = this.addresses.map(ipWithPorts => ipWithPorts.split(':')[0]);
      let pingList = [];
      for (let i = 0; i < addressesWithNoPorts.length; i++) {
        const address = addressesWithNoPorts[i];
        const responsePing = await ping(address);
        pingList = [...pingList, ...responsePing];
      }
      this.cityStatus.setData(pingList);
      await onCityPing(this);
    } catch (e) {
      console.log(e);
    }
  }
}
