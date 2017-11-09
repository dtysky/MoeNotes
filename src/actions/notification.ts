/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 9 Nov 2017
 * Description:
 */

import definitions from './definitions';

const {notification} = definitions;

export const info = (message: string) => ({type: notification.info, message});
export const warn = (message: string) => ({type: notification.warn, message});
export const error = (message: string) => ({type: notification.error, message});
export const success = (message: string) => ({type: notification.success, message});
export const close = () => ({type: notification.close});
