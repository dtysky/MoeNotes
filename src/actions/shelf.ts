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
import {getNameFromPath} from '../utils';

const {shelf} = definitions;
const {paths} = config;

export const load = () => ({type: shelf.loadEpic});
export const add = (child: TItem) => ({type: shelf.addEpic, child});
export const del = (child: TItem) => ({type: shelf.deleteEpic, child});
export const select = (child: TItem) => ({type: shelf.selectEpic, child});
export const rename = (child: TItem, name: string) => ({type: shelf.renameEpic, child, name});
export const swap = (child1: TItem, child2: TItem) => ({type: shelf.swapEpic, child1, child2});
export const save = () => ({type: shelf.saveEpic});

let record: TRecord = {
  current: '',
  children: []
};

export const loadEpic = actions$ =>
  actions$.ofType(shelf.loadEpic)
    .switchMap(() => {
      let oldRecord;
      if (fs.existsSync(paths.tree)) {
        try {
          oldRecord = JSON.parse(fs.readFileSync(paths.tree, 'utf8'));
        } catch(err) {}
      }

      // todo: 使用新格式，并对老的兼容
      if (oldRecord && typeof oldRecord.now === 'string') {
        Object.keys(oldRecord.names).forEach((dirPath, index) => {
          const name = oldRecord.names[dirPath];
          record.children.push({name, path: dirPath});
        });
        record.current = oldRecord.now;
      } else {
        record = <TRecord>oldRecord;
      }

      let currentInChildren = false;
      record.children.forEach(({name, path: dirPath}, index) => {
        if (!fs.existsSync(dirPath)) {
          record.children.splice(index);
          currentInChildren = currentInChildren && (name === record.current);
        }
      });

      if (!currentInChildren) {
        record.current = (record.children[0] || {name: ''}).name;
      }

      return Observable.concat(
        Observable.of({
          type: shelf.load,
          name: record.current,
          children: record.children
        }),
        Observable.of(save())
      );
    });

export const addEpic = actions$ =>
  actions$.ofType(shelf.addEpic)
    .map(({child}) => {
      const {path: dirPath} = child;
      const name = getNameFromPath(dirPath);

      return {
        type: shelf.add,
        child: {path: dirPath, name}
      };
    });

export const delEpic = actions$ =>
  actions$.ofType(shelf.deleteEpic)
    .map(({child}) => {
      return {
        type: shelf.delete,
        name: child.name
      };
    });

export const renameEpic = actions$ =>
  actions$.ofType(shelf.renameEpic)
    .map(({child, name}) => {
      return {
        type: shelf.renameChild,
        child,
        name
      };
    });

export const selectEpic = actions$ =>
  actions$.ofType(shelf.selectEpic)
    .map(({child}) => {
      
    });

export const swapEpic = actions$ =>
  actions$.ofType(shelf.swapEpic)
    .map(({child1, child2}) => {
      return {
        type: shelf.swap,
        child1,
        child2
      };
    });

export const saveEpic = (actions$, store) =>
  actions$.ofType(shelf.saveEpic)
    .map(() => {
      const {children, current} = store.getState().shelf.toJS();
      console.warn(children, current);
      
      fs.writeFileSync(paths.tree, JSON.stringify({children, current}));

      return {type: definitions.none};
    });
