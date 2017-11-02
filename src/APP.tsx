/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Oct 2017
 * Description:
 */
import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

import {init} from './actions/theme';
import {load} from './actions/shelf';

@connect(state => ({...state}))
export default class extends Component<any, any> {
  public componentDidMount() {
    const {dispatch} = this.props;
    console.log(this.props);
    
    dispatch(init());
    dispatch(load());
  }

  public render() {
    return (
      <div>
        蛤蛤
      </div>
    );
  }
};
