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
import {load as loadBook} from './book';

const {shelf} = definitions;
const {paths} = config;

export const load = () => ({type: shelf.loadEpic});
export const add = (child: TItem) => ({type: shelf.addEpic, child});
export const del = (child: TItem) => ({type: shelf.deleteEpic, child});
export const select = (child: TItem) => ({type: shelf.selectEpic, child});
export const rename = (child: TItem, name: string) => ({type: shelf.renameEpic, child, name});
export const swap = (child1: TItem, child2: TItem) => ({type: shelf.swapEpic, child1, child2});
export const save = () => ({type: shelf.saveEpic});
export const open = () => ({type: shelf.open});
export const close = () => ({type: shelf.close});

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

      const current = record.children.filter(child => (child.name === record.current))[0];

      return Observable.concat(
        Observable.of({
          type: shelf.load,
          name: record.current,
          children: record.children
        }),
        Observable.of(save()),
        Observable.of(select(current))
      );
    });

export const addEpic = actions$ =>
  actions$.ofType(shelf.addEpic)
    .switchMap(({child}) => {
      const {path: dirPath} = child;
      const name = getNameFromPath(dirPath);

      return Observable.concat(
        Observable.of({
          type: shelf.add,
          child: {path: dirPath, name}
        }),
        Observable.of(save())
      );
    });

export const delEpic = (actions$, store) =>
  actions$.ofType(shelf.deleteEpic)
    .switchMap(({child}) => {
      const next = Observable.concat(
        Observable.of({
          type: shelf.delete,
          name: child.name
        }),
        Observable.of(save())
      );

      if (child.name === store.shelf.get('current')) {
        return next.concat(Observable.of(select(
          store.shelf.getIn(['children', 0], null)
        )));
      }

      return next;
    });

export const renameEpic = actions$ =>
  actions$.ofType(shelf.renameEpic)
    .switchMap(({child, name}) => {
      return Observable.concat(
        Observable.of({
          type: shelf.renameChild,
          child,
          child2: {name, path: child.path}
        }),
        Observable.of(save())
      );
    });

export const selectEpic = actions$ =>
  actions$.ofType(shelf.selectEpic)
    .switchMap(({child}) => {
      return Observable.concat(
        Observable.of({
          type: shelf.select,
          name: (child || {name: ''}).name
        }),
        Observable.of(save()),
        Observable.of(loadBook(child))
      );
    });

export const swapEpic = actions$ =>
  actions$.ofType(shelf.swapEpic)
    .switchMap(({child1, child2}) => {
      return Observable.concat(
        Observable.of({
          type: shelf.swap,
          child1,
          child2
        }),
        Observable.of(save())
      );
    });

export const saveEpic = (actions$, store) =>
  actions$.ofType(shelf.saveEpic)
    .map(() => {
      const {children, current} = store.getState().shelf.toJS();
      fs.writeFileSync(paths.tree, JSON.stringify({children, current}));

      return {type: definitions.none};
    });
