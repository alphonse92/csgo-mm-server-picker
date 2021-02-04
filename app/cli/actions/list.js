import _pick from 'lodash/pick';
import _orderBy from 'lodash/orderBy';
import _omit from 'lodash/omit';
import { Firewall } from '../../models/Firewall';

import { Servers } from '../../models/Servers';
import { getServerList } from '../../services/servers';

const getTableDataSetFromHosts = hosts => _orderBy(hosts.map(({ id, name, regionId }) => ({ id, name, regionId })), ['regionId', 'name '], ['asc', 'asc']);
const getBlockedHostsFromFirewall = async () => {
  const firewall = new Firewall();
  const hosts = await firewall.getBlockedHosts();
  return hosts;
};

export const getServersData = async () => {
  const serverListResponse = await getServerList();
  const servers = new Servers(serverListResponse.data);
  return servers;
};

export const listHosts = async () => {
  const servers = await getServersData();
  const dataset = getTableDataSetFromHosts(Object.values(servers.hosts));
  console.table(dataset);
};

export const listRegions = async () => {
  const serverListResponse = await getServerList();
  const servers = new Servers(serverListResponse.data);
  console.log(Object.keys(servers.clusters));
};

export const _listBlockedHosts = async () => {
  const hosts = await getBlockedHostsFromFirewall();
  const blockedHosts = getTableDataSetFromHosts(hosts);
  return blockedHosts;
};

export const listBlockedHosts = async () => {
  const blockedHosts = await _listBlockedHosts();
  if (blockedHosts.length) console.table(blockedHosts);
};

export const listAvailableHosts = async () => {
  const { hosts } = await getServersData();
  const blockedHosts = await getBlockedHostsFromFirewall();
  const blockedHostsIds = blockedHosts.map(({ id }) => id);
  const availableHostsMap = _omit(hosts, blockedHostsIds);
  const availableHosts = getTableDataSetFromHosts(Object.values(availableHostsMap));
  console.table(availableHosts);
};

export const list = async (_name, sub, opts) => {
  if (opts.host) await listHosts(_name, sub, opts);
  else if (opts.region) await listRegions(_name, sub, opts);
  else if (opts.blockedHosts) await listBlockedHosts(_name, sub, opts);
  else await listAvailableHosts(_name, sub, opts);
};


export const describe = async (_name, sub, opts) => {
  const {
    host: optHost = [],
    region: optRegion = [],
  } = opts;

  const listOfHosts = Array.isArray(optHost) ? optHost : [optHost];
  const host = listOfHosts.map(h => h.toLocaleLowerCase());

  const listOfRegions = Array.isArray(optRegion) ? optRegion : [optRegion];
  const region = listOfRegions.map(r => r.toLocaleLowerCase());

  const serverListResponse = await getServerList();
  const servers = new Servers(serverListResponse.data);

  const listAllHosts = host.includes('all');
  const listAllRegions = region.includes('all');

  if (listAllHosts) return console.table(Object.values(servers.hosts).map(({ id, name }) => ({ id, name })));
  else if (listAllRegions) return console.table(Object.values(servers.clusters).map(({ id }) => ({ id })));
  else if (host.length) return console.table(Object.values(_pick(servers.hosts, host)).map(({ id, name }) => ({ id, name })));
  else if (region.length) return console.table(Object.values(_pick(servers.clusters, region)).map(({ id }) => ({ id })));
  return null;
};

export const listIp = async (_name, sub, opts) => {
  const { host, region } = opts;

  if (Array.isArray(host)) throw 'You only can get the IP for one host at the time';
  else if (region) throw 'Region option is not available for this command';

  const serverListResponse = await getServerList();
  const servers = new Servers(serverListResponse.data);
  const hostInstance = servers.hosts[host];
  console.table(hostInstance.addresses);
};

