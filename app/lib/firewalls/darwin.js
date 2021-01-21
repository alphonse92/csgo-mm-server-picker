import { APP_NAME } from '../constants';
import { execBash, execMultiple } from '../terminal';
// https://apple.stackexchange.com/questions/230209/how-do-i-drop-outgoing-packets-to-specific-host-port
class Darwin {
  static async block(ipList) {
    if (!ipList.length) return 0;
    await Darwin.reset();
    await Darwin.createAnchorFile(ipList);
    return ipList.length;
  }

  static async reset() {
    const temporalNewPfName = '/etc/pf.conf.2';
    return await execMultiple([
      Darwin.getCommandToremoveAnchorFile(),
      Darwin.getCommandToCreateNewPfConfWithoutAnchor(temporalNewPfName),
      Darwin.getCommandTodeleteAnchorFile(),
      Darwin.getCommandTomoveTemporalToOriginal(temporalNewPfName),
    ]);
  }

  static async reload() {
    const reloadPfCmd = 'pfctl -f /etc/pf.conf && pfctl -d && pfctl -e';
    return execBash(reloadPfCmd);
  }

  static async createAnchorFile(ipList) {
    return execMultiple([
      Darwin.getCommandToremoveAnchorFile(),
      Darwin.getCommandtoCreateAnchorFile(),
      Darwin.getCommandToAppendRulesToAnchor(ipList),
      Darwin.getCommandtoAppendRulesToPfConf(),
    ]);
  }

  static getCommandtoCreateAnchorFile() { return `touch ${Darwin.PF_ANCHOR_PATH}`; }
  static getCommandToremoveAnchorFile() { return `rm -rf ${Darwin.PF_ANCHOR_PATH}`; }
  static getCommandToAppendRulesToAnchor(ipList) {
    // create the configuration file text at:
    const rules = ipList.map(ip => `${ip.split(':')[0]}`);
    // Anchor rule
    const AnchorFileText = `ips = \\"{ ${rules.join(', ')} }\\"\\nblock drop from any to \\$ips\\n`;
    return `echo -e "${AnchorFileText}" >> ${Darwin.PF_ANCHOR_PATH}`;
  }

  static getCommandtoAppendRulesToPfConf() {
    const pfConfLine = `anchor \\"${Darwin.PF_ANCHOR_NAME}\\"\\nload anchor \\"${Darwin.PF_ANCHOR_NAME}\\" from \\"${Darwin.PF_ANCHOR_FOLDER}\\"\\n`;
    return `echo -e "${pfConfLine}" >> ${Darwin.PF_CONF_PATH}`;
  }

  static getCommandToCreateNewPfConfWithoutAnchor(temporalNewPfName) { return `sed '/${APP_NAME}/d' -i ${Darwin.PF_CONF_PATH} | tee ${temporalNewPfName} `; }
  static getCommandTodeleteAnchorFile() { return `rm -rf ${Darwin.PF_CONF_PATH} `; }
  static getCommandTomoveTemporalToOriginal(temporalNewPfName) { return `mv ${temporalNewPfName} ${Darwin.PF_CONF_PATH} `; }

}

Darwin.PF_CONF_PATH = '/etc/pf.conf';
// Folder of anchors
Darwin.PF_ANCHOR_FOLDER = '/etc/pf.anchors/';
// Anchor name
Darwin.PF_ANCHOR_NAME = `${APP_NAME}.block.out`;

// path /private/etc/pf.anchors/csgo-matchmacking-picker.block.out
Darwin.PF_ANCHOR_PATH = Darwin.PF_ANCHOR_FOLDER + Darwin.PF_ANCHOR_NAME;

export const darwin = Darwin;
