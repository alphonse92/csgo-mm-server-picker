import {
  listHosts,
  listRegions,
  describe,
  listIp,
} from './actions/list';
import { ping } from './actions/ping';

export const OPTIONS = {
  HOST: {
    name: 'host',
    description: 'Set name of the host',
  },
  REGION: {
    name: 'region',
    description: 'Set name of the region',
  },

  // Commands
  LIST_HOST: {
    name: 'list-host',
    description: 'get a list with all hosts ids',
    action: listHosts,
  },
  LIST_REGIONS: {
    name: 'list-regions',
    description: 'get a list with all regions ids',
    action: listRegions,
  },
  DESCRIBE: {
    name: 'describe',
    description: 'Describe one or more hosts or clusters. For example --describe regions=ALL or --describe hosts=ALL',
    action: describe,
  },
  LIST_IP: {
    name: 'list-ip',
    description: 'Get the ips of a given host id',
    action: listIp,
  },
  PING: {
    name: 'ping',
    description: 'Ping to region',
    action: ping,
  },
};
