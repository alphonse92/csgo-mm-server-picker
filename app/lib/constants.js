import path from 'path';

export const APP_NAME = 'csgomatchmackingpicker';
export const PUBLIC_APP_NAME = 'CS:GO MM PICKER';
export const STORE_FILENAME = `${APP_NAME}.settings.json`;
export const USER_DATA_PATH = process.env.APPDATA
  || (
    process.platform.indexOf('darwin') > -1
      ? `${process.env.HOME}/Library/Preferences`
      : `${process.env.HOME}/.local/share`
  );
export const STORE_FILE_PATH = `${USER_DATA_PATH}${path.sep}${STORE_FILENAME}`;
export const SERVER_STATUS = {
  NOT_CHECKED: 'Not checked yet',
  AVAILABLE: 'Available',
  UNAVAILABLE: 'Unvailable',
  UNSTABLE: 'Unstable',
};

export const DEF_CITY_NAME = 'no-name';
export const DEF_REGION_NAME = 'no-name';

export const CITIES = {
  auw2: 'Oregon',
  ams: 'Amsterdam',
  atl: 'Atlanta',
  bom: 'Bombay',
  canm: 'Canton',
  dxb: 'Dubai',
  eat: 'Wenatchee',
  fra: 'Frankfurt',
  gru: 'Sao Paulo',
  hkg: 'Hong Kong',
  iad: 'Washington DC',
  jnb: 'Cape Town',
  lax: 'Los Angeles',
  lhr: 'London',
  lim: 'Lima',
  lux: 'Luxembourg',
  maa: 'Chennai',
  mad: 'Madrid',
  man: 'Manila',
  okc: 'Oklahoma',
  ord: 'Chicago',
  par: 'Paris',
  pwg: 'Guangdong',
  pwj: 'Unknow city',
  pwu: 'Beijing',
  pww: 'Wuhan',
  pwz: 'Unknow city',
  scl: 'Santiago',
  sea: 'Seattle',
  sgp: 'Singapore',
  sham: 'Shanghai',
  shb: 'Nakashibetsu',
  sto: 'Stockholm',
  syd: 'Sydney',
  tsnm: 'Tianjin',
  tyo: 'Tokyo',
  vie: 'Vienna',
  waw: 'Warsaw',
};

export const REGIONS = {
  auw2: 'na-west',
  ams: 'eu-west',
  atl: 'na-east',
  bom: 'as',
  canm: 'as',
  dxb: 'as',
  eat: 'na-west',
  fra: 'eu-west',
  gru: 'sa',
  hkg: 'as',
  iad: 'na-east',
  jnb: 'af',
  lax: 'na-west',
  lhr: 'eu-west',
  lim: 'sa',
  lux: 'eu-west',
  maa: 'as',
  mad: 'eu-west',
  man: 'as',
  okc: 'na-east',
  ord: 'na-east',
  par: 'eu-west',
  pwg: 'as',
  pwj: 'as',
  pwu: 'as',
  pww: 'as',
  pwz: 'as',
  scl: 'sa',
  sea: 'na-west',
  sgp: 'as',
  sham: 'as',
  shb: 'as',
  sto: 'eu-east',
  syd: 'oc',
  tsnm: 'as',
  tyo: 'as',
  vie: 'eu-east',
  waw: 'eu-east',
};
