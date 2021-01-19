import { DEF_CITY_NAME } from '../lib/constants';

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

  ping() {
    
  }

}
