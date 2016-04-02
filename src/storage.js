/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Manage pages.
 */


import StorageTop from './storage-top';
import { createObjectWithErrorHandler, logError } from './utils';
import configManager from './config';


export default createObjectWithErrorHandler(
    new StorageTop("user/.tree"), logError(configManager.getSysConfig().logPath)
);