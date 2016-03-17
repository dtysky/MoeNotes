/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Main.
 */

"use strict";

const app = require('app');
const jade = require('jade');
const BrowserWindow = require("browser-window");

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    var html = jade.renderFile('views/index.jade');
    html = 'data:text/html,' + encodeURIComponent(html);
    mainWindow.loadURL(html);
    mainWindow.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});