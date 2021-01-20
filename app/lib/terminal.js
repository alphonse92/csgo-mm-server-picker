import sudo from 'sudo-prompt';

export const execBash = (command) => {

  return new Promise((resolve, reject) => {
    const options = { name: 'csgommserverpicker' };
    const cb = (error, stdout, stderr) => {
      const data = { error, stdout, stderr };
      if (error) return reject(data);
      return resolve(data);
    };
    sudo.exec(command, options, cb);
  });
};
