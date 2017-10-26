import * as path from 'path';

export type TConfig = {
  env: 'development' | 'release',
  devMode: boolean,
  paths: {
    root: string,
    src: string,
    entry: string
  }
};

const env = process.env.NODE_ENV;
const devMode = env === 'development';

const rootPath = path.resolve(__dirname, '../');
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
