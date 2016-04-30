/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Main.
 */

const app = require('app');
const BrowserWindow = require("browser-window");
const paths = require('./config').paths;
const init = require('./init');

var mainWindow = null;

app.on('ready', function() {
    const screen = require('screen');
    const size = screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        width: size.width,
        height: size.height,
        title: "MoeNotes",
        icon: paths.rootPath + "/logo.png"
    });
    mainWindow.loadURL(
        paths.urlPath
    );
    mainWindow.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
        app.quit();
    });
    mainWindow.webContents.on('will-navigate', function(event, url) {
        event.preventDefault();
        shell.openExternal(url);
    });
    init.initMenu(mainWindow);
    init.initDockMenu();
});