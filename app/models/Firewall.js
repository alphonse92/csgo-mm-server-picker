import _omit from 'lodash/omit';

// import { SystemFirewall } from '../lib/systemFirewall';
import { getStore } from '../store';
import { ClusterCity } from './ClusterCity';

export class Firewall {
  constructor() {
    // this.firewall = new SystemFirewall();
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
      // save the state
      const currentBlocks = await Store.get('root.servers.blocks');
      const stateOfBlockedIps = _omit(currentBlocks, Object.keys(allowedHostsMap));

      await Store.set('root.servers.blocks', stateOfBlockedIps);

      // const currentlyBlockedIps = Object
      //   .values(stateOfBlockedIps)
      //   .reduce((acc, blockedHost) => ([...acc, ...blockedHost.addresses]), []);

      // await this.firewall.block(currentlyBlockedIps);

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

      const currentBlocks = await Store.get('root.servers.blocks');
      const stateOfBlockedIps = { ...currentBlocks, ...blockedHostMap };

      await Store.set('root.servers.blocks', stateOfBlockedIps);

      // const currentlyBlockedIps = Object
      //   .values(stateOfBlockedIps)
      //   .reduce((acc, blockedHost) => ([...acc, ...blockedHost.addresses]), []);

      // await this.firewall.block(currentlyBlockedIps);

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
    await Store.set('root.servers.blocks', {});
    // await this.firewall.reset();
    // await this.firewall.reload();
  }

  /**
   * Get blocked hosts
   * @returns {Array<ClusterCity>} an array of ClusterCity instances
   */
  async getBlockedHosts() {
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
