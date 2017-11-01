/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 24 Oct 2017
 * Description:
 */
import {Record, fromJS} from 'immutable';
import {TList, TItem} from '../types';
import {definitions} from '../actions';
import config from '../config';

export const defaultState: TList = fromJS({
  name: '',
  path: '',
  children: [],
  lut: {}
});

export default (name: 'shelf' | 'book' | 'chapter') => (
  state = defaultState,
  action: {
    type: string,
    self?: TItem,
    children?: TItem[],
    child?: TItem,
    name?: string
  }
) => {
  switch (action.type) {
    case definitions[name].load: {
      const list = state.get('children', null).clear().concat(fromJS(action.children));
      let lut = state.get('lut', null).clear();
      action.children.forEach(child => {
        lut = lut.set(child.name, child.path);
      });
      const result = state.set('children', list)
        .set('lut', lut)
        .set('name', action.self.name)
        .set('path', action.self.path);

      if (name === 'shelf') {
        return result.set('name', '')
          .set('path', config.paths.tree);
      }

      return result;
    }

    case definitions[name].add: {
      return state.set(
        'children', state.get('children', null).push(fromJS(action.child))
      ).setIn(
        ['lut', action.child.name], action.child.path
      );
    }

    case definitions[name].delete: {
      return state.set(
        'children', state.get('children', null).filterNot(book =>
          book.get('name', '') === action.name
        )
      ).deleteIn(
        ['lut', action.name]
      );
    }

    default:
      return state;
  }
};
