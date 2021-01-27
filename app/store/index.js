import { SettingsStore } from './settings';
import { HeadlessStore } from './headless';
import { isElectron, isHeadless, isOnBrowser } from '../lib/instance';
import { BaseStore } from './base';

const initialValues = {
  servers: {
    'ip-blocked': [],
    clusters: {},
  },
};

export const getStore = () => {
  if (isHeadless()) {
    return new HeadlessStore(initialValues);
  }

  if (isElectron()) {
    return new SettingsStore(initialValues);
  }

  if (isOnBrowser()) {
    return new BaseStore(initialValues);
  }

  return null;
};

