/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Main.
 */


const app = require('app');
const jade = require('jade');
const BrowserWindow = require("browser-window");
const paths = require('./config').paths;

var mainWindow = null;


app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720
    });
    mainWindow.loadURL(
        paths.urlPath
    );
    mainWindow.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});