/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Oct 2017
 * Description:
 */
import * as React from 'react';
import * as cx from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {TList, TItem, TPage, TTheme} from './types';
import {init} from './actions/theme';
import {load as loadShelf, add as addBook} from './actions/shelf';
import {getNameFromPath} from './utils';

import {picker} from './components/BookPicker';
import Shelf from './components/Shelf';

interface IPropTypes {
  dispatch: Dispatch<string>;
  shelf: TList;
  book: TList;
  chapter: TList;
  page: TPage;
  theme: TTheme;
}
interface IStateTypes {

}

class APP extends React.Component<IPropTypes, IStateTypes> {
  public componentWillMount() {
    const {dispatch} = this.props;
    dispatch(init());
    dispatch(loadShelf());
  }

  public componentDidCatch(err) {
    console.error(err);
  }

  public componentWillReceiveProps(nextProps: IPropTypes) {
    const {
      shelf
    } = nextProps;

    if (shelf.get('path', '') !== '' && shelf.get('children', []).size === 0) {
      picker.create()
        .then(path => addBook({name: getNameFromPath(path), path}));
    }
  }

  public render() {
    console.warn(this.props.shelf.toJS());
    const {
      shelf
    } = this.props;

    if (shelf.get('path', '') === '') {
      return this.renderDefault();
    }

    if (shelf.get('children', []).size === 0) {
      return this.renderDefault();
    }

    return (
      <div className={cx('root')}>
        <Shelf />
      </div>
    );
  }

  private renderDefault() {
    return (
      <div className={cx('init-load', 'absolute', 'full-width', 'text-center')}>
        Please pick a book first !
      </div>
    );
  }
};

export default connect(state => ({...state}))(APP);
