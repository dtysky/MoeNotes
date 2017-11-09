import {Map, List, Record} from 'immutable';

export type TCDCMode = 'hue' | 'lightness' | 'saturation';

export type TThemeConfig = Record<{
  CDCMode: TCDCMode,
  CDCRange: List<number>,
  chapterNowBackCSC: List<number | string | List<number>>,
  chapterNowBorderCSC: List<number | string | List<number>>,
  chapterNowFontCSC: List<number | string | List<number>>,
  chapterNormalBackCSC: List<number | string | List<number>>,
  chapterNormalBorderCSC: List<number | string | List<number>>,
  chapterNormalFontCSC: List<number | string | List<number>>,
  pageListBackCSC: List<number | string | List<number>>,
  pageButtonBackCSC: List<number | string | List<number>>,
  pageButtonFontCSC: List<number | string | List<number>>,
  pageNowBackCSC: List<number | string | List<number>>,
  pageNowFontCSC: List<number | string | List<number>>,
  pageNormalBackCSC: List<number | string | List<number>>,
  pageNormalFontCSC: List<number | string | List<number>>,
  bookBackCSC: List<number | string | List<number>>,
  bookFontCSC: List<number | string | List<number>>,
  bookShapeCSC: List<number | string | List<number>>,
  headBackCSC: List<number | string | List<number>>,
  toolbarCSC: List<number | string | List<number>>
}>;

export type TThemeList = string[];

export type TThemeCurrent = {
  name: string,
  root: string,
  style: string,
  editor: string,
  config: TThemeConfig
};

export type TTheme = Record<{
  list: List<string>,
  current: Record<{
    name: string,
    root: string,
    style: string,
    editor: string,
    config: TThemeConfig
  }>,
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
}>;

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
  paths: TPaths,
  defaultHighlight: string
};

export type TItem = {
  name: string,
  path: string
};

export type TPage = Record<{
  name: string,
  path: string,
  markdown: string,
  html: string,
  active: boolean
}>;

export type TList = Record<{
  name: string,
  path: string,
  current: string,
  children: List<Record<TItem>>,
  lut: Map<string, Record<{path: string, index: number}>>
}>;

export type TRecord = {
  current: string,
  children: TItem[]
};

export type TNotification = Record<{
  type: 'info' | 'success' | 'warn' | 'error',
  message: string,
  show: boolean
}>;

export type TModal = Record<{
  type: 'info' | 'success' | 'warn' | 'error',
  message: string,
  show: boolean,
  onConfirm: () => void,
  onCancel: () => void
}>;
