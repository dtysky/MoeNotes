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
    children?: {[name: string]: string},
    child?: TItem,
    child2?: TItem,
    name?: string
  }
) => {
  switch (action.type) {
    case definitions[name].load: {
      let lut = state.get('lut', null).clear();
      const children = fromJS(Object.keys(action.children).map((key, index) => {
        const p = action.children[key];
        lut = lut.set(key, fromJS({path: p, index}));
        return {name: key, path: p};
      }));
      const result = fromJS({
        children,
        lut
      });

      if (name === 'shelf') {
        return result.merge({
          name: '', path: config.paths.tree
        });
      }

      return result.merge({
        name: action.self.name,
        path: action.self.path
      });
    }

    case definitions[name].add: {
      return state.mergeDeep({children: action.child})
        .setIn(['lut', action.child.name], fromJS({
          path: action.child.path, index: state.get('children', []).size
        }));
    }

    case definitions[name].delete: {
      const index = state.getIn(['lut', action.name, 'index']);
      return state.deleteIn(['children', index])
        .deleteIn(['lut', action.name]);
    }

    case definitions[name].renameSelf: {
      return state.set('name', action.name);
    }

    case definitions[name].renameChild: {
      const index = state.getIn(['lut', action.child.name, 'index']);
      return state.setIn(['children', index, 'name'], action.name)
        .deleteIn(['lut', action.child.name])
        .setIn(['lut', action.name], fromJS({
          path: state.getIn(['lut', action.child.name, 'path']), index
        }));
    }

    case definitions[name].swap: {
      const index1 = state.getIn(['lut', action.child.name, 'index']);
      const index2 = state.getIn(['lut', action.child2.name, 'index']);
      const item1 = state.getIn(['children', index1]);
      const item2 = state.getIn(['children', index2]);

      return state.setIn(['children', index1], item2)
        .setIn(['children', index2], item1)
        .setIn(['lut', action.child.name, 'index'], index2)
        .setIn(['lut', action.child2.name, 'index'], index1);
    }

    default:
      return state;
  }
};
