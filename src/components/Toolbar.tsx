/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 9 Nov 2017
 * Description:
 */
import * as React from 'react';
import {TTheme} from '../types';
import {connect} from 'react-redux';

interface IPropTypes {
  theme: TTheme;
}

interface IStateTypes {

}

class Toolbar extends React.Component<IPropTypes, IStateTypes> {
  public render() {
    console.warn(this.props.theme.toJS());

    return null;
  }
}

export default connect(state => ({theme: state.theme}))(Toolbar);
