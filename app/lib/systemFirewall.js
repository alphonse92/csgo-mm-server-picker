
import { Firewalls } from './firewalls';

export class SystemFirewall {

  block(ipList) {
    const sysFirewall = Firewalls[process.platform];
    return sysFirewall.block(ipList);
  }

  reset() {
    const sysFirewall = Firewalls[process.platform];
    return sysFirewall.reset();
  }

  reload() {
    const sysFirewall = Firewalls[process.platform];
    return sysFirewall.reload();
  }

}

