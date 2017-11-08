/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 24 Oct 2017
 * Description:
 */
import {Record, fromJS} from 'immutable';
import {TPage, TItem} from '../types';
import {definitions} from '../actions';
import config from '../config';

export const defaultState: TPage = fromJS({
  name: '',
  path: '',
  markdown: '',
  html: '',
  active: false
});

export default (state = defaultState, action: {
  type: string,
  self: TItem,
  markdown: string,
  html: string
}) => {
  switch (action.type) {
    case definitions.page.load:
      return fromJS({
        name: action.self.name,
        path: action.self.path,
        markdown: action.markdown,
        html: action.html,
        active: true
      });

    case definitions.page.disable:
      return fromJS({
        name: '',
        path: '',
        markdown: '',
        html: '',
        active: false
      });

    case definitions.page.edit:
      return state.set('markdown', action.markdown)
        .set('html', action.html);

    case definitions.page.save:
    default:
      return state;
  }
};
