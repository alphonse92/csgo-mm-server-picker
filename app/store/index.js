import { SettingsStore } from './settings';

const initialValues = {
  servers: {
    'ip-blocked': [],
    hosts: {},
  },
};

export const AppStore = new SettingsStore(initialValues);
