import _omit from 'lodash/omit';

import { SystemFirewall } from '../lib/systemFirewall';
import { getStore } from '../store';
import { ClusterCity } from './ClusterCity';

export class Firewall {
  constructor() {
    this.firewall = new SystemFirewall();
  }

  /**
  * Allow the outgoing trafic to a host ip
  * @param {Array<String>} addresses
  */
  async allow(hosts) {
    try {
      const Store = getStore();
      const allowedHostsMap = {};
      let ips = [];

      // take the ips and create the host map
      hosts.forEach((host) => {
        allowedHostsMap[host.id] = host;
        ips = [...ips, ...host.addresses];
      });

      // allow all the ips
      // const blockedhostQuantity = await this.firewall.block(ips);
      // console.log(blockedhostQuantity)


      // save the state
      const currentBlocks = await Store.get('root.servers.blocks');
      const newState = _omit(currentBlocks, Object.keys(allowedHostsMap));

      await Store.set('root.servers.blocks', newState);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   * Block the outgoing trafic to a list of IP addresses
   * @param {Array<String>} addresses
   */
  async block(hosts) {
    try {
      const Store = getStore();
      const blockedHostMap = {};
      let ips = [];

      // take the ips and create the host map
      hosts.forEach((host) => {
        blockedHostMap[host.id] = host;
        ips = [...ips, ...host.addresses];
      });
      // block all the ips
      // const blockedhostQuantity = await this.firewall.block(ips);
      // console.log(blockedhostQuantity)


      // save the state
      const currentBlocks = await Store.get('root.servers.blocks');
      const newState = { ...currentBlocks, ...blockedHostMap };

      await Store.set('root.servers.blocks', newState);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   * Also called allow all ips. Remove all blocked ips and allow all trafic
   */
  async reset() {
    const Store = getStore();
    // this.firewall.reset();
    await Store.set('root.servers.blocks', {});
  }

  /**
   * Get the blocked hosts
   */
  async list() {
    const Store = getStore();
    const blocks = await Store.get('root.servers.blocks');
    const arrayOfHosts = Array.isArray(blocks) ? blocks : Object.values(blocks);
    const hosts = arrayOfHosts.map(data => new ClusterCity({
      ...data,
      relay_addresses: data.addresses,
      desc: data.name,
    }));
    return hosts;
  }
}
