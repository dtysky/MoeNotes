/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 23 Oct 2017
 * Description:
 */
import {BrowserWindow, App, Menu, screen, shell} from 'electron';
import installExtension, {REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from 'electron-devtools-installer';

import {TConfig} from './config';
import initMenu from './initMenu';

installExtension(REACT_DEVELOPER_TOOLS)
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err));

installExtension(REDUX_DEVTOOLS)
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err));

export default class Main {
  private static mainWindow: BrowserWindow;
  private static app: App;
  private static menu: Menu;
  public static config: TConfig;

  private static onClosed = () => {
    Main.mainWindow = null;
    Main.app.quit();
  }

  private static onReady = () => {
    const {paths} = Main.config;

    const size = screen.getPrimaryDisplay().workAreaSize;
    Main.mainWindow = new BrowserWindow({
        width: size.width,
        height: size.height,
        title: 'MoeNotes'
    });

    Main.menu = new Menu();
    initMenu(Main.app, Main.menu, Main.config);

    Main.mainWindow.loadURL(paths.entry);
  }

  private static onWillNavigate = (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  }

  public static run(app: App, config: TConfig) {
    Main.config = config;
    Main.app = app;
    Main.app.on('ready', Main.onReady);
    Main.app.on('window-all-closed', Main.onClosed);
  }
}
