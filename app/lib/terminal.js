import sudo from 'sudo-prompt';
import { APP_NAME } from './constants';

export const execBash = (command) => {
  console.log(command,command.length)
  return Promise.resolve()
  return new Promise((resolve, reject) => {
    const options = { name: APP_NAME };
    const cb = (error, stdout, stderr) => {
      const data = { error, stdout, stderr };
      if (error) return reject(data);
      return resolve(data);
    };
    console.log(command, command.length, "\n")
    sudo.exec(command, options, cb);
  });
};

export const execMultiple = instructions => execBash(instructions.join('\n'));