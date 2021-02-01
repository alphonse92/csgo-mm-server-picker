import settings from 'electron-settings';
import { BaseMemoryStore } from './base';
import { STORE_FILENAME } from '../lib/constants';

export class SettingsStore extends BaseMemoryStore {
  constructor(initialValues) {
    super(initialValues);
    this.store = settings;

    const conf = {
      atomicSave: true,
      fileName: STORE_FILENAME,
      numSpaces: 2,
      prettify: true,
      dir: this.getFilePath(),
    };
    settings.configure(conf);

    let currentSettings;
    try {
      currentSettings = require(settings.file());
    } catch (e) {
      currentSettings = initialValues;
    }

    settings.setSync(currentSettings);
  }

  async get(key) {
    return this.store.get(key);
  }

  async set(key, val) {
    return this.store.set(key, val);
  }

  async getRoot() {
    return this.store.get('root');
  }

}
