/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 24 Oct 2017
 * Description:
 */
import * as fs from 'fs';
import {Observable} from 'rxjs';
import rmdir from 'rmdir';

import config from '../config';
import definitions from './definitions';
import {TList, TItem, TRecord} from '../types';
import {getNameFromPath, getDirectories} from '../utils';
import {load as loadChapter} from './chapter';

const {book} = definitions;

export const load = (self: TItem) => ({type: book.loadEpic, self});
export const add = (name: string) => ({type: book.addEpic, name});
export const del = (name: string) => ({type: book.deleteEpic, name});
export const select = (name: string) => ({type: book.selectEpic, name});
export const rename = (name: string, name2: string) => ({type: book.renameEpic, name, name2});
export const swap = (name1: string, name2: string) => ({type: book.swapEpic, name1, name2});
export const save = () => ({type: book.saveEpic});

let record: TRecord = {
  current: '',
  children: []
};

export const loadEpic = actions$ =>
  actions$.ofType(book.loadEpic)
    .switchMap(({self}) => {
      if (!self) {
        return Observable.concat(
          Observable.of({
            type: book.load,
            self: {name: '', path: ''},
            name: '',
            children: []
          }),
          Observable.of(save()),
          Observable.of(select(null))
        );
      }

      const {path} = self;

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
        record.children = oldRecord.indexes.map(name => {
          const chapterPath = `${path}/${name}`;

          if (fs.existsSync(chapterPath)) {
            const tree = JSON.stringify({
              current: oldRecord.chapters[name].now,
              children: oldRecord.chapters[name].indexes.map(pageName => ({
                name: pageName,
                path: `${chapterPath}/${pageName}.md`
              }))
            });
            fs.writeFileSync(`${chapterPath}/.tree`, tree);
          }

          return {name, path: chapterPath};
        });
      } else {
        record = <TRecord>oldRecord;
      }

      let currentInChildren = false;
      const oldChildren = record.children.map(child => child.name);
      const newChildren = getDirectories(path);
      record.children.forEach(({name, path: dirPath}, index) => {
        if (!fs.existsSync(dirPath)) {
          const i = newChildren.indexOf(name);
          if (i > 0) {
            newChildren.splice(i);
          }
          record.children.splice(index);
          currentInChildren = currentInChildren && (name === record.current);
        }
      });

      newChildren.forEach(name => {
        if (oldChildren.indexOf(name) < 0) {
          record.children.push({name, path: `${path}/${name}`});
        }
      });

      if (!currentInChildren) {
        record.current = (record.children[0] || {name: null}).name;
      }

      return Observable.concat(
        Observable.of({
          type: book.load,
          self,
          name: record.current,
          children: record.children
        }),
        Observable.of(save()),
        Observable.of(select(record.current))
      );
    });

export const addEpic = (actions$, store) =>
  actions$.ofType(book.addEpic)
    .switchMap(({name}) => {
      const path = `${store.getState().book.get('path')}/${name}`;
      fs.mkdirSync(path);
      const child = {path, name};

      return Observable.concat(
        Observable.of({
          type: book.add,
          child
        }),
        Observable.of(save()),
        Observable.of(select(name))
      );
    });

export const delEpic = (actions$, store) =>
  actions$.ofType(book.deleteEpic)
    .switchMap(({name}) => {
      const path = `${store.getState().book.get('path')}/${name}`;
      rmdir.sync(path);

      const next = Observable.concat(
        Observable.of({
          type: book.delete,
          name: name
        })
      );

      if (name === store.getState().book.get('current')) {
        return next.concat(Observable.of(select(
          store.book.getIn(['children', 0, 'name'], null)
        )));
      }

      return next;
    });

export const renameEpic = (actions$, store) =>
  actions$.ofType(book.renameEpic)
    .switchMap(({name, name2}) => {
      const path = store.getState().book.get('path');
      const oldPath = `${path}/${name}`;
      const newPath = `${path}/${name2}`;
      fs.renameSync(oldPath, newPath);

      return Observable.concat(
        Observable.of({
          type: book.renameChild,
          child: {name, path: oldPath},
          child2: {name: name2, path: newPath}
        }),
        Observable.of(save())
      );
    });

export const selectEpic = (actions$, store) =>
  actions$.ofType(book.selectEpic)
    .switchMap(({name}) => {
      const child = name ? {name, path: `${store.getState().book.get('path')}/${name}`} : null;

      return Observable.concat(
        Observable.of({
          type: book.select,
          name: name || ''
        }),
        Observable.of(save()),
        Observable.of(loadChapter(child))
      );
    });

export const swapEpic = actions$ =>
  actions$.ofType(book.swapEpic)
    .switchMap(({name1, name2}) => {
      return Observable.concat(
        Observable.of({
          type: book.swap,
          child1: {name: name1},
          child2: {name: name2}
        }),
        Observable.of(save())
      );
    });

export const saveEpic = (actions$, store) =>
  actions$.ofType(book.saveEpic)
    .map(() => {
      const {children, current, path} = store.getState().book.toJS();
      fs.writeFileSync(`${path}/.tree`, JSON.stringify({children, current}));

      return {type: definitions.none};
    });
