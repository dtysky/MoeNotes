/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 23 Oct 2017
 * Description:
 */
import {app} from 'electron';
import Main from './Main';
import config from '../config';

const rootPath = __dirname;
Main.run(app, config);
