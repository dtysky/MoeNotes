/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 24 Oct 2017
 * Description:
 */
import * as fs from 'fs';
import * as path from 'path';
import {Observable} from 'rxjs';
import config from '../config';
import definitions from './definitions';
import {
  TTheme, TThemeConfig, TThemeList, TThemeCurrent
} from '../types';

declare const global: any;

const {theme} = definitions;
const {paths} = config;

const updateList = (list: TThemeList) => ({type: theme.updateList, list});
const updateCurrent = (current: TThemeCurrent) => ({type: theme.updateCurrent, current});
export const init = () => ({type: theme.init});
export const refresh = (name: string) => ({type: theme.refresh, name});

export const initEpic = actions$ =>
  actions$.ofType(theme.init)
    .switchMap(() => {
      const themes = fs.readdirSync(paths.theme)
        .filter(file =>
          fs.statSync(path.join(paths.theme, file)).isDirectory()
        );

      let current = fs.readFileSync(
        path.join(paths.theme, '.now')
      ).toString();
      if (themes.indexOf(current) < 0) {
        current = themes[0];
      }

      return Observable.concat(
        Observable.of(updateList(themes)),
        Observable.of(refresh(current))
      );
    });

export const refreshEpic = actions$ =>
  actions$.ofType(theme.refresh)
    .map(({name}) => {
      // save
      fs.writeFileSync(path.join(paths.theme, '.now'), name);

      const root = path.join(paths.theme, name);
      const editor = fs.readFileSync(path.join(root, 'editor.css')).toString();
      const style = fs.readFileSync(path.join(root, 'config.css')).toString();;
      const configJSON = JSON.parse(fs.readFileSync(path.join(root, 'config.json')).toString());

      const oldNode = document.getElementById('style');
      const node = document.createElement('style');
      node.id = 'style';
      node.textContent = style;
      if (oldNode) {
        document.head.replaceChild(oldNode, node);
      } else {
        document.head.appendChild(node);
      }

      // Real hacking !!!!
      global.editorTheme = editor;

      config.defaultHighlight = configJSON.defaultHighlight;

      return updateCurrent({
        name,
        root,
        style,
        editor,
        config: <TThemeConfig>configJSON
      });
    });
