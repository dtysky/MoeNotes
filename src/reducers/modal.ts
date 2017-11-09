/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 9 Nov 2017
 * Description:
 */
import {Record, fromJS} from 'immutable';
import {TModal} from '../types';
import {definitions} from '../actions';

export const defaultState: TModal = fromJS({
  type: 'info',
  message: '',
  show: false,
  onConfirm: () => {},
  onCancel: () => {}
});

const genNewState = (type: string, action: {
  type: string,
  message?: string,
  onConfirm?: () => void,
  onCancel?: () => void
}) => (
  {
    type, show: true, message: action.message,
    onConfirm: action.onConfirm, onCancel: action.onCancel
  }
);

export default (state = defaultState, action: {
  type: string,
  message?: string,
  onConfirm?: () => void,
  onCancel?: () => void
}) => {
  switch (action.type) {
    case definitions.modal.info:
      return state.merge(genNewState('info', action));
    case definitions.modal.success:
      return state.merge(genNewState('success', action));
    case definitions.modal.warn:
      return state.merge(genNewState('warn', action));
    case  definitions.modal.error:
      return state.merge(genNewState('error', action));
    case  definitions.modal.close:
      return state.merge({
        type: 'info', show: false, message: '',
        onConfirm: () => {}, onCancel: () => {}
      });
    default:
      return state;
  }
};
