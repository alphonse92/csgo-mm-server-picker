
import { Firewalls } from './firewalls';

export class Firewall {

  exec(ipList) {
    const sysFirewall = Firewalls[process.platform];
    sysFirewall.block(ipList);
  }

  reset(ipList) {
    const sysFirewall = Firewalls[process.platform];
    sysFirewall.reset(ipList);
  }

}

