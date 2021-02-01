import { SettingsStore } from './settings';
import { HeadlessStore } from './headless';
import { isElectron, isHeadless, isOnBrowser } from '../lib/instance';
import { BaseMemoryStore } from './base';

const initialValues = {
  root: {
    servers: {
      clusters: {

      },
      blocks: {
        // Each key is an IP and contains the host is, host region
      },
    },
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
    return new BaseMemoryStore(initialValues);
  }

  return null;
};

