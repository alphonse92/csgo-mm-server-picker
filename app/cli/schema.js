import {
  block,
  blockAll,
  allow,
  allowAll,
} from './actions/firewall';
import {
  list,
  describe,
  listIp,
} from './actions/list';
import { ping } from './actions/ping';

export const OPTIONS = {
  BLOCKED: {
    name: 'blocked-hosts',
    description: 'Set the blocked-hosts',
  },
  HOST: {
    name: 'host',
    description: 'Set name of the host',
  },
  REGION: {
    name: 'region',
    description: 'Set name of the region',
  },

  // Commands
  LIST: {
    name: 'list',
    description: 'get a list with all hosts ids',
    action: list,
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
  // firewall commands
  BLOCK: {
    name: 'block',
    description: 'Block ips of a region or hosts',
    action: block,
  },
  BLOCK_ALL: {
    name: 'block-all',
    description: 'Block all cs:go ips',
    action: blockAll,
  },
  ALLOW: {
    name: 'allow',
    description: 'Allow ips of a region or hosts',
    action: allow,
  },
  ALLOW_ALL: {
    name: 'allow-all',
    description: 'Allow all cs:go ips',
    action: allowAll,
  },

};
