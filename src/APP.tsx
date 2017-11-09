/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Oct 2017
 * Description:
 */
import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {TList, TItem, TPage, TTheme} from './types';
import {init} from './actions/theme';
import {load} from './actions/shelf';

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

class APP extends Component<IPropTypes, IStateTypes> {
  public componentDidMount() {
    const {dispatch} = this.props;
    dispatch(init());
    dispatch(load());
  }

  public componentDidCatch(err) {
    console.error(err);
  }

  public render() {
    return (
      <div>
        蛤蛤
        <Shelf />
      </div>
    );
  }
};

export default connect(state => ({...state}))(APP);
