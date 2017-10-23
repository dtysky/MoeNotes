import {TConfig} from './src/types';

const env = process.env.NODE_ENV;
const devMode = env === 'development';

const rootPath = __dirname;

const devConfig: TConfig = {
  env: 'development',
  devMode: true,
  paths: {
    root: rootPath,
    src: `${rootPath}/src`,
    entry: 'http://localhost:4444'
  }
};

const releaseConfig: TConfig = {
  env: 'release',
  devMode: false,
  paths: {
    root: rootPath,
    src: `${rootPath}/src`,
    entry: 'http://localhost:4444'
  }
};

const config = devMode ? devConfig : releaseConfig;

export default config;
