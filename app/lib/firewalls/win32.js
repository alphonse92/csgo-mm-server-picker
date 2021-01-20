import { execBash } from '../terminal';

export class win32 {
  static block(ipList) {
    const multipleIp = ipList.join();
    execBash(`netsh advfirewall firewall add rule name="csgo-mm-server-picker" dir=out action=block remoteip=${multipleIp}`);
  }

  static reset() {
    execBash(`netsh advfirewall firewall delete rule name="csgo-mm-server-picker"`);
  }
}
