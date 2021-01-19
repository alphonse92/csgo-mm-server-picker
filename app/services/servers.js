import axios from 'axios';

export const getServerList = () => {
  return axios({
    url: 'https://raw.githubusercontent.com/SteamDatabase/SteamTracking/master/Random/NetworkDatagramConfig.json',
    method: 'get',
  });
};