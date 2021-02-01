import { Servers } from "../../models/Servers";
import { getServerList } from "../../services/servers";

export const getSelectedRegionsAndHost = (opts) => {
  const host = opts.host || [];
  const arrayOfSelectedHost = Array.isArray(host) ? host : [host];

  const region = opts.region || [];
  const arrayOfSelectedRegion = Array.isArray(region) ? region : [region];

  return {
    region: arrayOfSelectedRegion,
    host: arrayOfSelectedHost,
  };
};

export const getHosts = async (host, region) => {
  const serverListResponse = await getServerList();
  const servers = new Servers(serverListResponse.data);
  return Object
    .values(servers.hosts)
    .filter(h => host.includes(h.id) || region.includes(h.regionId));
};

