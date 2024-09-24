import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  basename: string;
  defaultPath: string;
  fontFamily: string;
  borderRadius: number;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Minimal UI',
  appVersion: packageJson.version,
  basename: '/',
  defaultPath: '/',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
};
