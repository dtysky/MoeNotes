/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Oct 2017
 * Description:
 */
import {remote} from 'electron';
import {TConfig} from './types';

const env = process.env.NODE_ENV;
const devMode = env === 'development';
const userPath = devMode ? '.' : remote.app.getPath('userData');
const appPath = devMode ? './src' : remote.app.getAppPath();

const config: TConfig = {
  env,
  devMode: env === 'development',
  paths: {
    user: userPath,
    app: appPath,
    tree: `${userPath}/.tree`,
    log: `${userPath}/error.log`,
    theme: `${appPath}/theme`
  }
};

export default config;
