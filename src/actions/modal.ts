/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 9 Nov 2017
 * Description:
 */
import definitions from './definitions';

const {modal} = definitions;

const genActionCreator = (type: string) => (
  message: string, onConfirm: () => void, onCancel: () => void
) => ({
  type: modal[type], message, onConfirm, onCancel
});

export const info = genActionCreator('info');
export const warn = genActionCreator('warn');
export const error = genActionCreator('error');
export const success = genActionCreator('success');
export const close = () => ({type: modal.close});
