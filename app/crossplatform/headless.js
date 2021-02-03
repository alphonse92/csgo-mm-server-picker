import { init } from '../cli';

export class HeadlessInstance {
  constructor() {
    // this.confgiureProcess();
  }

  start() {
    init();
  }

  confgiureProcess() {
    process.stdin.resume();

    // do something when app is closing
    process.on('exit', this.onExit);

    // catches ctrl+c event
    process.on('SIGINT', this.onExit);

    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', this.onExit);
    process.on('SIGUSR2', this.onExit);

    // catches uncaught exceptions
    process.on('uncaughtException', this.uncaughtExceptionHandler);
  }

  onExit() {

  }

  uncaughtExceptionHandler() {
    this.onExit();
  }

  keep() {
    // Keep the cli online
    process.stdin.resume();
  }

}

