/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 9 Nov 2017
 * Description:
 */
import * as React from 'react';
import {TList} from '../types';
import {connect} from 'react-redux';

interface IPropTypes {
  book: TList;
}

interface IStateTypes {

}

class Book extends React.Component<IPropTypes, IStateTypes> {
  public render() {
    console.warn(this.props.book.toJS());

    return null;
  }
}

export default connect(state => ({book: state.book}))(Book);
