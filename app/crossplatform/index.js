import { isElectron, isHeadless } from '../lib/instance';


/**
 * This function returns an instance of Instance app according to the environment which runs this app
 */
export const getInstance = async () => {
  if (isElectron()) {
    const { ElectronInstance } = await import('./electron');
    return new ElectronInstance();
  }
  if (isHeadless()) {
    const { HeadlessInstance } = await import('./headless');
    return new HeadlessInstance();
  }
  return null;
};
