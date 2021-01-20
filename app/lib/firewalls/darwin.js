import { APP_NAME } from '../constants';
import { execBash } from '../terminal';
// https://apple.stackexchange.com/questions/230209/how-do-i-drop-outgoing-packets-to-specific-host-port
class Darwin {
  static async block(ipList) {

    // create the configuration file text at:
    const rules = ipList.map(ip => `${ip.split(':')[0]}`).join(', ');

    // Anchor rule
    const AnchorFile = `ips = "{ ${rules} }" \n block drop from any to $ips`;

    // add the conf to /etc/pf.conf
    const pfConfLine = `anchor "${Darwin.PF_ANCHOR_NAME}" \n load anchor "${Darwin.PF_ANCHOR_NAME}" from "${Darwin.PF_ANCHOR_FOLDER}" \n`;

    await Darwin.reset();
    // await Darwin.reload();

    // console.log(pfConfLine);

  }

  static async reset() {
    const temporalNewPfName = '/etc/pf.conf.2';
    const getCommandToremoveAnchorFile = () => `rm -rf ${Darwin.PF_ANCHOR_PATH}`;
    const getCommandToCreateNewPfConfWithoutAnchor = async () => `sed '/${APP_NAME}/d' -i  ${Darwin.PF_CONF_PATH} | tee ${temporalNewPfName}`;
    const getCommandTodeleteAnchorFile = () => `rm -rf ${Darwin.PF_CONF_PATH}`;
    const getCommandTomoveTemporalToOriginal = () => `mv ${temporalNewPfName} ${Darwin.PF_CONF_PATH}`;

    try {
      const instructions = [
        // await getCommandToremoveAnchorFile(),
        await getCommandToCreateNewPfConfWithoutAnchor(),
        // await getCommandTodeleteAnchorFile(),
        // await getCommandTomoveTemporalToOriginal(),
      ]
      const scriptBody = instructions.join('\n');

      for (let i = 0; i < instructions.length; i++) {

      }

      console.log(scriptBody)
    } catch (e) {
      console.log(e);
    }
  }

  static async reload() {
    const reloadPfCmd = 'pfctl -d && pfctl -e';
    return execBash(reloadPfCmd);
  }


  static async testPf() {

  }
}

Darwin.PF_CONF_PATH = '/etc/pf.conf';
// Folder of anchors
Darwin.PF_ANCHOR_FOLDER = '/etc/pf.anchors/';
// Anchor name
Darwin.PF_ANCHOR_NAME = `${APP_NAME}.block.out`;

// path /private/etc/pf.anchors/csgo-matchmacking-picker.block.out
Darwin.PF_ANCHOR_PATH = Darwin.PF_ANCHOR_FOLDER + Darwin.PF_ANCHOR_NAME;

export const darwin = Darwin;
