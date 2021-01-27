import _pick from 'lodash/pick';

import { Servers } from '../../models/Servers';
import { getServerList } from '../../services/servers';


export const listHosts = async () => {
  const serverListResponse = await getServerList();
  const servers = new Servers(serverListResponse.data);
  console.log(Object.keys(servers.hosts));
};

export const listRegions = async () => {
  const serverListResponse = await getServerList();
  const servers = new Servers(serverListResponse.data);
  console.log(Object.keys(servers.clusters));
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

