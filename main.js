import { getInstance } from './app/crossplatform';

(async function () {
  async function run() {
    const instance = await getInstance();
    instance.start();
  }

  await run();
}
)();
