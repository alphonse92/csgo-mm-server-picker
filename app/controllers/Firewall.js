import { SystemFirewall } from '../lib/systemFirewall';

export class FirewallController {
  static async block(ipList) {
    const firewall = new SystemFirewall();
    await firewall.block(ipList);
    // /Users/a/Library/Application Support/Electron
  }

  static async reset() {
    const firewall = new SystemFirewall();
    await firewall.reset();
  }
}
