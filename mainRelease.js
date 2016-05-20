/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Main.
 */

const app = require('app');
const BrowserWindow = require("browser-window");
const paths = require('./config').paths;
const init = require('./init');
const shell = require('shell');

var mainWindow = null;
app.envRelease = true;

app.on('ready', function() {
    const screen = require('screen');
    const size = screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        width: size.width,
        height: size.height,
        title: "MoeNotes"
    });
    mainWindow.loadURL(
        paths.realPath
    );
    console.log(paths.realPath);
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