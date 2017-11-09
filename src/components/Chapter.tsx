/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 9 Nov 2017
 * Description:
 */
import * as React from 'react';
import {TList} from '../types';
import {connect} from 'react-redux';

interface IPropTypes {
  chapter: TList;
}

interface IStateTypes {

}

class Chapter extends React.Component<IPropTypes, IStateTypes> {
  public render() {
    console.warn(this.props.chapter.toJS());

    return null;
  }
}

export default connect(state => ({chapter: state.chapter}))(Chapter);
