import { SystemFirewall } from '../../lib/systemFirewall';
import { Firewall } from '../../models/Firewall';
import { Servers } from '../../models/Servers';
import { getServerList } from '../../services/servers';
import { listBlockedHosts } from './list';
import { getHosts, getSelectedRegionsAndHost } from './util';

export const block = async (_name_, sub, opts) => {
  const firewall = new Firewall();

  const { host, region } = getSelectedRegionsAndHost(opts);
  const hostsToBlock = await getHosts(host, region);

  await firewall.block(hostsToBlock);
  await listBlockedHosts();
};

export const blockAll = async () => {
  const serverListResponse = await getServerList();
  const servers = new Servers(serverListResponse.data);
  const firewall = new Firewall();
  const hostsToBlock = Object
    .values(servers.hosts);

  await firewall.block(hostsToBlock);
  await listBlockedHosts();
};

export const allow = async (_name_, sub, opts) => {
  const firewall = new Firewall();

  const { host, region } = getSelectedRegionsAndHost(opts);
  const hostToAllow = await getHosts(host, region);

  await firewall.allow(hostToAllow);
  await listBlockedHosts();
};

export const allowAll = async () => {
  const firewall = new Firewall();
  await firewall.reset();
};

export const start = async (_name_, sub, opts) => {
  const firewall = new Firewall();

  const { verbose = false } = opts;

  const logIfVerbose = (data, type = 'log') => {
    if (verbose) console[type](data);
  };

  const blockedClusterCities = await firewall.getBlockedHosts();
  const ips = [];
  const raw = [];

  blockedClusterCities.forEach(
    ({ name, regionId, addresses = [] }) =>
      addresses.forEach((ip) => {
        ips.push(ip);
        raw.push({ name, regionId, ip });
      })
  );


  const sysFirewall = new SystemFirewall();

  const enableFirewall = async (ipList) => {
    logIfVerbose('Starting firewall');
    await sysFirewall.block(ipList);
    logIfVerbose('Hosts blocked successfully');
  };

  const disableFirewall = async () => {
    if (ips.length) {
      logIfVerbose('Disabling firewall');
      await sysFirewall.reset();
      logIfVerbose('Hosts are reacheble');
    }
  };

  const onExit = async (code) => {
    logIfVerbose('Closing App');
    await disableFirewall();
    process.exit(code);
  };

  const uncaughtExceptionHandler = (error, origin) => {
    console.error(origin);
    console.error(error);
    onExit('uncaughtException');
  };

  // Keep the cli open
  process.stdin.resume();

  // do something when app is closing
  process.on('exit', onExit);

  // catches ctrl+c event
  process.on('SIGINT', onExit);

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', onExit);
  process.on('SIGUSR2', onExit);

  // catches uncaught exceptions
  process.on('uncaughtException', uncaughtExceptionHandler);

  try {
    if (ips.length) {
      await enableFirewall(ips);
      logIfVerbose(raw, 'table');
    } else {
      console.log('No blocked hosts. Execute the command "help" to start to block csgo hosts');
      process.exit(0);
    }
  } catch (e) {
    uncaughtExceptionHandler(e, 'main');
  }
};
