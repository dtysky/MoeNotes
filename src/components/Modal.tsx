/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 9 Nov 2017
 * Description:
 */
import * as React from 'react';
import {TModal} from '../types';
import {connect} from 'react-redux';

interface IPropTypes {
  info: TModal;
}

interface IStateTypes {

}

class Modal extends React.Component<IPropTypes, IStateTypes> {
  public render() {
    console.warn(this.props.info.toJS());

    return null;
  }
}

export default connect(state => ({info: state.modal}))(Modal);
