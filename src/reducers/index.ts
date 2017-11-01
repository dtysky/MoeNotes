/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 24 Oct 2017
 * Description:
 */
import {combineReducers} from 'redux';
import theme from './theme';
import makeListReducer from './makeListReducer';
import page from './page';

export default combineReducers({
  theme,
  shelf: makeListReducer('shelf'),
  book: makeListReducer('book'),
  chapter: makeListReducer('chapter'),
  page
});
