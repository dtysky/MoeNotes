/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 24 Oct 2017
 * Description:
 */
import * as fs from 'fs';
import {Observable} from 'rxjs';
import config from '../config';
import definitions from './definitions';
import {TList, TItem} from '../types';

const {shelf} = definitions;
const {paths} = config;

export const load = () => ({type: shelf.loadEpic});
export const add = (item: TItem) => ({type: shelf.addEpic, item});
export const del = (item: TItem) => ({type: shelf.deleteEpic, item});
export const select = (item: TItem) => ({type: shelf.selectEpic, item});
export const rename = (item: TItem, name: string) => ({type: shelf.renameEpic, item, name});
export const swap = (item1: TItem, item2: TItem) => ({type: shelf.swapEpic, item1, item2});

const createTree = () => {
  return {
    now: '',
    indexes: [],
    names: {}
  };
};

export const loadEpic = actions$ =>
  actions$.ofType(shelf.loadEpic)
    .map(() => {
      let record = createTree();
      if (fs.existsSync(paths.tree)) {
        try {
          record = JSON.parse(fs.readFileSync(paths.tree, 'utf8'));
        } catch(err) {}
      }

      record.indexes.forEach((dirPath, index) => {
        if (!fs.existsSync(dirPath)) {
          record.indexes.splice(index);
          delete record.names[dirPath];
        }
      });

      if (!record.names[record.now]) {
        record.now = record.indexes[0] || '';
      }

      fs.writeFileSync(paths.tree, JSON.stringify(record));

      return {
        type: shelf.load,
        children: record.names
      };
    });

export const addEpic = actions$ =>
  actions$.ofType(shelf.addEpic)
    .map(({item}) => {

    });

export const delEpic = actions$ =>
  actions$.ofType(shelf.deleteEpic)
    .map(({item}) => {

    });

export const renameEpic = actions$ =>
  actions$.ofType(shelf.renameEpic)
    .map(({item, name}) => {

    });

export const selectEpic = actions$ =>
  actions$.ofType(shelf.selectEpic)
    .map(({item}) => {

    });

export const swapEpic = actions$ =>
  actions$.ofType(shelf.swapEpic)
    .map(({item1, item2}) => {

    });
