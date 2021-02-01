import { Firewall } from '../../models/Firewall';
import { Servers } from '../../models/Servers';
import { getServerList } from '../../services/servers';
import { listBlockedHosts } from './list';
import { getHosts, getSelectedRegionsAndHost } from './util';

export const block = async (_name_, sub, opts) => {
  const firewall = new Firewall();

  const { host, region } = getSelectedRegionsAndHost(opts);
  const hostsToBlock = await getHosts(host, region);

  const result = await firewall.block(hostsToBlock);
  if (!result) {
    console.log('cant block the hosts');
  }
  await listBlockedHosts();
};

export const blockAll = async () => {
  const serverListResponse = await getServerList();
  const servers = new Servers(serverListResponse.data);
  const firewall = new Firewall();
  const hostsToBlock = Object
    .values(servers.hosts);
  const result = await firewall.block(hostsToBlock);
  if (!result) {
    console.log('cant block the hosts');
  }

  await listBlockedHosts();
};

export const allow = async (_name_, sub, opts) => {
  const firewall = new Firewall();

  const { host, region } = getSelectedRegionsAndHost(opts);
  const hostToAllow = await getHosts(host, region);

  const result = await firewall.allow(hostToAllow);
  if (!result) {
    console.log('cant block the hosts');
  }
};

export const allowAll = async () => {
  const firewall = new Firewall();
  await firewall.reset();
};
