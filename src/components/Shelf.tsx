/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 9 Nov 2017
 * Description:
 */
import * as React from 'react';
import {TList} from '../types';
import {connect} from 'react-redux';

interface IPropTypes {
  shelf: TList;
}

interface IStateTypes {

}

class Shelf extends React.Component<IPropTypes, IStateTypes> {
  public render() {
    console.warn(this.props.shelf.toJS());

    return null;
  }
}

export default connect(state => ({shelf: state.shelf}))(Shelf);
