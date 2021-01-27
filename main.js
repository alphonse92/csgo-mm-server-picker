import { getInstance } from './app/crossplatform';

export async function run() {
  async function _run() {
    const instance = await getInstance();
    instance.start();
  }

  await _run();
}
