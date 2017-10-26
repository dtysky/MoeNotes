export type TThemeConfig = {
  defaultHighlight: string,
  CDCMode: 'hue' | 'lightness' | 'saturation',
  CDCRange: [number, number],
  chapterNowBackCSC:  [number, number, number],
  chapterNowBorderCSC: [number, number, number],
  chapterNowFontCSC: [number, number, number],
  chapterNormalBackCSC: [number, number, number],
  chapterNormalBorderCSC: [number, number, number],
  chapterNormalFontCSC: [number, number, number],
  pageListBackCSC: [number, number, number],
  pageButtonBackCSC: [number, number, number],
  pageButtonFontCSC: [number, number, number],
  pageNowBackCSC: [number, number, number],
  pageNowFontCSC: [number, number, number],
  pageNormalBackCSC: [number, number, number],
  pageNormalFontCSC: [number, number, number],
  bookBackCSC: [number, number, number],
  bookFontCSC: [number, number, number],
  bookShapeCSC: [number, number, number],
  headBackCSC: [number, number, number],
  toolbarCSC: [number, number, number]
};

export type TTheme = {
  list: string[],
  current: {
    name: string,
    root: string,
    style: string,
    editor: string,
    config: TThemeConfig
  },
  // color: {
  //   head: {
  //     bg: string,
  //     toolbar: string
  //   },
  //   book: {
  //     bg: string,
  //     font: string,
  //     shape: string
  //   },
  //   chapter: {
  //     bg: string,
  //     font: string,
  //     border: string,
  //     activeBg: string,
  //     activeFont: string,
  //     activeBorder: string
  //   },
  //   page: {
  //     bg: string,
  //     font: string,
  //     activeBg: string,
  //     activeFont: string,
  //     buttonBg: string,
  //     buttonFont: string,
  //     listBg: string
  //   }
  // }
};

export type TPaths = {
  user: string,
  app: string,
  tree: string,
  log: string,
  theme: string
};

export type TConfig = {
  env: 'development' | 'release',
  devMode: boolean,
  paths: TPaths
};
