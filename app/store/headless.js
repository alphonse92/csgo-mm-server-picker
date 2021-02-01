import fs from 'fs';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { BaseMemoryStore } from './base';
import { STORE_FILE_PATH } from '../lib/constants';
// DArwin : /Users/a/Library/Preferences/csgomatchmackingpicker.settings.json
const saveStoreOnDisk = (path, store) => fs.promises.writeFile(path, JSON.stringify(store, null, 2));
export class HeadlessStore extends BaseMemoryStore {
  constructor(initialValues) {
    super(initialValues);
    this.init(initialValues);
  }

  init(initialValues) {
    try {
      this.store = require(STORE_FILE_PATH);
      this.writeFilePromise = Promise.resolve();
    } catch (e) {
      this.store = initialValues;
      this.saveOnDisk();
    }
  }

  async saveOnDisk() {
    await this.writeFilePromise;
    this.writeFilePromise = saveStoreOnDisk(STORE_FILE_PATH, this.store);
    return this.writeFilePromise;
  }

  async readStore() {
    await this.writeFilePromise;
    this.store = require(STORE_FILE_PATH);
  }

  async get(key) {
    await this.readStore();
    return _get(this.store, key);
  }

  async set(key, val) {
    await this.readStore();
    this.store = _set(this.store, key, val);
    return this.saveOnDisk();
  }

  async getRoot() {
    await this.readStore();
    return _get(this.store, 'root');
  }

}
