export type TConfig = {
  env: 'development' | 'release',
  devMode: boolean,
  paths: {
    root: string,
    src: string,
    entry: string
  }
};
