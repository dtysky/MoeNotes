/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 9 Nov 2017
 * Description:
 */
import * as React from 'react';
import {TPage} from '../types';
import {connect} from 'react-redux';

interface IPropTypes {
  page: TPage;
}

interface IStateTypes {

}

class Page extends React.Component<IPropTypes, IStateTypes> {
  public render() {
    console.warn(this.props.page.toJS());

    return null;
  }
}

export default connect(state => ({page: state.page}))(Page);
