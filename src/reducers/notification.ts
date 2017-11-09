/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 9 Nov 2017
 * Description:
 */
import {Record, fromJS} from 'immutable';
import {TNotification} from '../types';
import {definitions} from '../actions';

export const defaultState: TNotification = fromJS({
  type: 'info',
  message: '',
  show: false
});

export default (state = defaultState, action: {
  type: string,
  message?: string
}) => {
  switch (action.type) {
    case definitions.notification.info:
      return state.merge({type: 'info', show: true, message: action.message});
    case definitions.notification.success:
      return state.merge({type: 'success', show: true, message: action.message});
    case definitions.notification.warn:
      return state.merge({type: 'warn', show: true, message: action.message});
    case definitions.notification.error:
      return state.merge({type: 'error', show: true, message: action.message});
    case definitions.notification.close:
      return state.merge({type: 'info', show: false, message: ''});
    default:
      return state;
  }
};
