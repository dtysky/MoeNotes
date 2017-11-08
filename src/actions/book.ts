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

const {book} = definitions;

export const load = (self: TItem) => ({type: book.loadEpic, self});
export const add = (child: TItem) => ({type: book.addEpic, child});
export const del = (child: TItem) => ({type: book.deleteEpic, child});
export const select = (child: TItem) => ({type: book.selectEpic, child});
export const rename = (child: TItem, name: string) => ({type: book.renameEpic, child, name});
export const swap = (child1: TItem, child2: TItem) => ({type: book.swapEpic, child1, child2});
export const save = () => ({type: book.saveEpic});

let record: TRecord = {
  current: '',
  children: []
};

export const loadEpic = actions$ =>
  actions$.ofType(book.loadEpic)
    .switchMap(({self}) => {
      const {path, name} = self;

      let oldRecord;
      const treePath = `${path}/.tree`;
      if (fs.existsSync(treePath)) {
        try {
          oldRecord = JSON.parse(fs.readFileSync(treePath, 'utf8'));
        } catch(err) {}
      }

      // Using new structure for tree and transform old one
      if (oldRecord && typeof oldRecord.root === 'string') {
        record.current = oldRecord.now;
        record.children = oldRecord.indexes;
        oldRecord.indexes.map(name => {
          const chapterPath = `${path}/${name}`;
          fs.writeFileSync(`${chapterPath}/.tree`, JSON.stringify({
            current: oldRecord.chapters.now,
            children: oldRecord.chapters.indexes.map(pageName => ({
              name: pageName,
              path: `${chapterPath}/${pageName}`
            }))
          }));

          return {name, path: chapterPath};
        });
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
          type: book.load,
          name: record.current,
          children: record.children
        }),
        Observable.of(save())
      );
    });

export const addEpic = actions$ =>
  actions$.ofType(book.addEpic)
    .switchMap(({child}) => {
      const {path: dirPath} = child;
      const name = getNameFromPath(dirPath);

      return Observable.concat(
        Observable.of({
          type: book.add,
          child: {path: dirPath, name}
        }),
        Observable.of(save())
      );
    });

export const delEpic = actions$ =>
  actions$.ofType(book.deleteEpic)
    .switchMap(({child}) => {
      return Observable.concat(
        Observable.of({
          type: book.delete,
          name: child.name
        }),
        Observable.of(save())
      );
    });

export const renameEpic = actions$ =>
  actions$.ofType(book.renameEpic)
    .switchMap(({child, name}) => {
      return Observable.concat(
        Observable.of({
          type: book.renameChild,
          child,
          name
        }),
        Observable.of(save())
      );
    });

export const selectEpic = actions$ =>
  actions$.ofType(book.selectEpic)
    .switchMap(({child}) => {
      
    });

export const swapEpic = actions$ =>
  actions$.ofType(book.swapEpic)
    .switchMap(({child1, child2}) => {
      return Observable.concat(
        Observable.of({
          type: book.swap,
          child1,
          child2
        }),
        Observable.of(save())
      );
    });

export const saveEpic = (actions$, store) =>
  actions$.ofType(book.saveEpic)
    .map(() => {
      const {children, current} = store.getState().book.toJS();
      console.warn(children, current);

      fs.writeFileSync(paths.tree, JSON.stringify({children, current}));

      return {type: definitions.none};
    });

