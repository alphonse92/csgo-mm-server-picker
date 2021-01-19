import _ping from 'ping';
/**
 * Send a ping package
 * @param {*} hosts array of ip hosts
 * @returns an array of objects like this
 * {
 *   host: '111.32.164.141',
 *    alive: true,
 *    output: 'PING 111.32.164.141 (111.32.164.141): 56 data bytes\n64 bytes from 111.32.164.141: icmp_seq=0 ttl=41 time=409.061 ms\n\n--- 111.32.164.141 ping statistics ---\n1 packets transmitted, 1 packets received, 0.0% packet loss\nround-trip min/avg/max/stddev = 409.061/409.061/409.061/0.000 ms\n',
 *    time: 409.061,
 *    times: [ 409.061 ],
 *    min: '409.061',
 *    max: '409.061',
 *    avg: '409.061',
 *    stddev: '0.000',
 *    packetLoss: '0.000',
 *    numeric_host: '111.32.164.141'
 * }
 */
export const ping = async (hosts = []) => await Promise.all((Array.isArray(hosts) ? hosts : [hosts]).map(host => _ping.promise.probe(host)));
