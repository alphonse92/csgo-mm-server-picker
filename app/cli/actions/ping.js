import _orderBy from 'lodash/orderBy';
import { Servers } from '../../models/Servers';
import { getServerList } from '../../services/servers';


export const ping = async (_name, sub, opts) => {
  const { host, region } = opts;

  if (Array.isArray(region)) throw 'You only can ping to one region at the time';
  else if (host) throw 'Host option is not available for this command';

  const serverListResponse = await getServerList();
  const servers = new Servers(serverListResponse.data);
  const clusterInstance = servers.clusters[region];
  await clusterInstance.ping();

  const pingStatus = clusterInstance.cities.map((clusterCity) => {
    const { id, name, cityStatus } = clusterCity;
    const { mean, stddev, status } = cityStatus;
    return { id, name, mean, stddev, status };
  });
  const orderedPingstatus = _orderBy(pingStatus, ['mean', 'stdev'], ['asc', 'asc']);

  console.table(orderedPingstatus);
};
