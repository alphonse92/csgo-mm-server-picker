
import { Firewalls } from './firewalls';

export class SystemFirewall {

  block(ipList) {
    const sysFirewall = Firewalls[process.platform];
    return sysFirewall.block(ipList);
  }

  reset(ipList) {
    const sysFirewall = Firewalls[process.platform];
    return sysFirewall.reset(ipList);
  }

}

