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
import {getNameFromPath, getDirectories, getFiles} from '../utils';

const {chapter} = definitions;

export const load = (self: TItem) => ({type: chapter.loadEpic, self});
export const add = (name: string) => ({type: chapter.addEpic, name});
export const del = (name: string) => ({type: chapter.deleteEpic, name});
export const select = (child: TItem) => ({type: chapter.selectEpic, child});
export const rename = (name: string, name2: string) => ({type: chapter.renameEpic, name, name2});
export const swap = (name1: string, name2: string) => ({type: chapter.swapEpic, name1, name2});
export const save = () => ({type: chapter.saveEpic});

let record: TRecord = {
  current: '',
  children: []
};

export const loadEpic = actions$ =>
  actions$.ofType(chapter.loadEpic)
    .switchMap(({self}) => {
      const {path} = self;

      const treePath = `${path}/.tree`;
      if (fs.existsSync(treePath)) {
        try {
          record = JSON.parse(fs.readFileSync(treePath, 'utf8'));
        } catch(err) {}
      }

      let currentInChildren = false;
      const oldChildren = record.children.map(child => child.name);
      const newChildren = getFiles(path);
      record.children.forEach(({name, path: filePath}, index) => {
        if (!fs.existsSync(filePath)) {
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
          record.children.push({name, path: `${path}/${name}.md`});
        }
      });

      if (!currentInChildren) {
        record.current = (record.children[0] || {name: ''}).name;
      }

      return Observable.concat(
        Observable.of({
          type: chapter.load,
          self,
          name: record.current,
          children: record.children
        }),
        Observable.of(save())
      );
    });

export const addEpic = (actions$, store) =>
  actions$.ofType(chapter.addEpic)
    .switchMap(({name}) => {
      const path = `${store.getState().chapter.get('path')}/${name}.md`;
      fs.writeFileSync(path, `# ${name}`);

      return Observable.concat(
        Observable.of({
          type: chapter.add,
          child: {path, name}
        }),
        Observable.of(save())
      );
    });

export const delEpic = (actions$, store) =>
  actions$.ofType(chapter.deleteEpic)
    .switchMap(({name}) => {
      const path = `${store.getState().chapter.get('path')}/${name}.md`;
      fs.unlinkSync(path);

      return Observable.concat(
        Observable.of({
          type: chapter.delete,
          name: name
        }),
        Observable.of(save())
      );
    });

export const renameEpic = (actions$, store) =>
  actions$.ofType(chapter.renameEpic)
    .switchMap(({name, name2}) => {
      const path = store.getState().chapter.get('path');
      const oldPath = `${path}/${name}.md`;
      const newPath = `${path}/${name2}.md`;
      fs.renameSync(oldPath, newPath);

      return Observable.concat(
        Observable.of({
          type: chapter.renameChild,
          child: {name, path: oldPath},
          child2: {name: name2, path: newPath}
        }),
        Observable.of(save())
      );
    });

export const selectEpic = actions$ =>
  actions$.ofType(chapter.selectEpic)
    .switchMap(({child}) => {
      
    });

export const swapEpic = actions$ =>
  actions$.ofType(chapter.swapEpic)
    .switchMap(({name1, name2}) => {
      return Observable.concat(
        Observable.of({
          type: chapter.swap,
          child1: {name: name1},
          child2: {name: name2}
        }),
        Observable.of(save())
      );
    });

export const saveEpic = (actions$, store) =>
  actions$.ofType(chapter.saveEpic)
    .map(() => {
      const {children, current, path} = store.getState().chapter.toJS();
      fs.writeFileSync(`${path}/.tree`, JSON.stringify({children, current}));

      return {type: definitions.none};
    });
