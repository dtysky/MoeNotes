/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 9 Nov 2017
 * Description:
 */
import * as React from 'react';
import {TList, TTheme} from '../types';
import {connect} from 'react-redux';

interface IPropTypes {
  theme: TTheme;
  shelf: TList;
}

interface IStateTypes {

}

class Shelf extends React.Component<IPropTypes, IStateTypes> {

  public render() {
    return null;
  }
}

export default connect(state => ({shelf: state.shelf, theme: state.theme}))(Shelf);
