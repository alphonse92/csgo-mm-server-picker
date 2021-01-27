import args from 'args';
import { OPTIONS } from './schema';

Object.keys(OPTIONS).forEach((key) => {
  const OPT = OPTIONS[key];
  const { name, description, defaultValue, action } = OPT;

  if (action) args.command(name, description, action);
  else args.option(name, description, defaultValue);
});

export const options = args.parse(process.argv);
