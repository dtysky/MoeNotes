/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 24 Oct 2017
 * Description:
 */
import {Record} from 'immutable';
import {TTheme, TThemeConfig} from '../types';
import {definitions} from '../actions';

export const defaultState: TTheme = {
  list: [],
  current: {
    name: '',
    root: '',
    style: '',
    editor: '',
    config: {
      defaultHighlight: 'VHDL',
      CDCMode: 'hue',
      CDCRange: [260, 380],
      chapterNowBackCSC:  [50, 60, 1],
      chapterNowBorderCSC: [50, 60, 1],
      chapterNowFontCSC: [100, 100, 1],
      chapterNormalBackCSC: [40, 70, 0.6],
      chapterNormalBorderCSC: [40, 50, 1],
      chapterNormalFontCSC: [100, 25, 1],
      pageListBackCSC: [20, 40, 0.5],
      pageButtonBackCSC: [30, 50, 0.6],
      pageButtonFontCSC: [100, 20, 1],
      pageNowBackCSC: [100, 100, 1],
      pageNowFontCSC: [100, 30, 1],
      pageNormalBackCSC: [0, 0, 0],
      pageNormalFontCSC: [100, 30, 1],
      headBackCSC: [50, 80, 0.6],
      bookBackCSC: [50, 80, 0.8],
      bookFontCSC: [80, 50, 0.8],
      bookShapeCSC: [50, 50, 0.8],
      toolbarCSC: [60, 50, 0.7]
    }
  }
};

class State extends Record<TTheme>(defaultState) {};

export default (state = new State(), action: {
  type: string,
  list?: TTheme['list'],
  current?: TTheme['current']
}) => {
  switch (action.type) {
    case definitions.theme.updateList:
      return state.merge({list: action.list});
    case  definitions.theme.updateCurrent:
      return state.merge({current: action.current});
    default:
      return state;
  }
};
