/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 24 Oct 2017
 * Description:
 */
import {combineEpics} from 'redux-observable';

export {default as definitions} from './definitions';
import * as theme from './theme';
import * as shelf from './shelf';
import * as book from './book';
import * as chapter from './chapter';
import * as page from './page';

const getEpicActions = (obj: any) => {
  const result = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && /.*Epic$/.test(key)) {
      result.push(obj[key]);
    }
  }

  return result;
};

let epics = [];
[theme, shelf, book, chapter, page].forEach(obj => {
  epics = epics.concat(getEpicActions(obj));
});

export default (action$, store) =>
  combineEpics(...epics)(action$, store)
  .do({error: err => {
    console.error(err);
  }});
