
import Files from '../../main-process/util';
import { execBash } from '../terminal';

export class linux {
  static block(ipList) {
    const multipleIp = ipList.join();
    execBash(`iptables -A INPUT -s ${multipleIp} -j DROP`, this._win);
  }

  static reset() {
    // let command = '';

    // this._clusters.clustersId.forEach(id => {

    //   this._clusters.pops[id].relayAddresses.forEach(relayAddresse => {
    //     this._clusters.pops[id].relayAddresses.splice(this._clusters.pops[id].relayAddresses.indexOf(relayAddresse), 1, relayAddresse.split(':')[0]);
    //   });

    //   this._clusters.pops[id].relayAddresses.forEach(addresse => {
    //     command += `iptables -D INPUT -s ${addresse} -j DROP\n`;
    //   });
    // });

    // command = `#!/bin/bash\n${command}`;

    // new Files().create(command);

    // execBash(`sh ${app.getPath('home')}/csgo-mm-server-picker/ipRules.sh`);
  }
}
