import { STORE_FILE_PATH } from '../lib/constants';

export class BaseMemoryStore {
  async set() {
    throw 'This method (BaseStore.set) is not implemented yet';
  }
  async get() {
    throw 'This method (BaseStore.get) is not implemented yet';
  }
  async getRoot() {
    throw 'This method (BaseStore.getRoot) is not implemented yet';
  }
  async getFilePath() {
    return STORE_FILE_PATH;
  }
}
