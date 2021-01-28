/* eslint-disable no-console */
import args from 'args';
import { OPTIONS } from './schema';

export const init = async () => {
  Object.keys(OPTIONS).forEach((key) => {
    const OPT = OPTIONS[key];
    const { name, description, defaultValue, action } = OPT;

    if (action) args.command(name, description, action);
    else args.option(name, description, defaultValue);
  });
  // process.exit(0)
};
