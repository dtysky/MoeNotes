/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 24 Oct 2017
 * Description:
 */
import * as fs from 'fs';
import {Observable} from 'rxjs';

import config from '../config';
import definitions from './definitions';
import {TList, TItem, TRecord} from '../types';
import {parse} from '../utils';

const {page} = definitions;

export const load = (self: TItem) => ({type: page.loadEpic, self});
export const edit = (markdown: string) => ({type: page.editEpic, markdown});
export const save = () => ({type: page.saveEpic});

export const loadEpic = actions$ =>
  actions$.ofType(page.loadEpic)
    .map(({self}) => {
      if (!self) {
        return {type: page.disable};
      }

      const markdown = fs.readFileSync(self.path, 'utf8');
      const html = parse(markdown);

      return {
        type: page.load,
        self,
        markdown,
        html
      };
    });

export const editEpic = actions$ =>
  actions$.ofType(page.editEpic)
    .map(({markdown}) => {
      const html = parse(markdown);

      return {
        type: page.edit,
        markdown,
        html
      };
    });

export const saveEpic = (actions$, store) =>
  actions$.ofType(page.saveEpic)
    .map(() => {
      const path = store.page.get('path');
      const markdown = store.page.get('markdown');

      fs.writeFileSync(path, markdown);

      return {type: definitions.none};
    });
