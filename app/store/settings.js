import settings from 'electron-settings';
import { app } from 'electron';

import { BaseStore } from './base';
import { STORE_FILENAME } from '../lib/constants';

export class SettingsStore extends BaseStore {
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
      currentSettings = { root: initialValues };
    }

    settings.setSync(currentSettings);
  }

  get(key) {
    return this.store.get(key);
  }

  set(key, val) {
    return this.store.set(key, val);
  }

  getRoot() {
    return this.store.get('root');
  }

  getFilePath() {
    return app.getPath('userData');
  }

}
