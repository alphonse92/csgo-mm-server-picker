import { SystemFirewall } from '../lib/systemFirewall';
import { getStore } from '../store';

export class Firewall {
  constructor() {
    this.firewall = new SystemFirewall();
  }

  /**
   * Block the outgoing trafic to a list of IP addresses
   * @param {Array<String>} addresses
   */
  async block(addresses) {
    const ips = addresses || [];
    const arrayOfIps = Array.isArray(ips) ? ips : [ips];
    await this.firewall.block(arrayOfIps);
    // add the code to save it in the state
  }

  /**
   * Also called allow all ips. Remove all blocked ips and allow all trafic
   * @param {Array<String>} addresses
   */
  async reset(addresses) {
    const ips = addresses || [];
    const arrayOfIps = Array.isArray(ips) ? ips : [ips];
    await this.firewall.block(arrayOfIps);
    // add the code to save it in the state
  }

  async list() {
    const Store = getStore();
    console.log(await Store.getFilePath());
    const state = await Store.getRoot();
    console.log(state);
  }
}
