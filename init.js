/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Main.
 */

const shell = require('shell');
const app = require('app');
const Menu = require("menu");

var shouldQuit = app.makeSingleInstance(
    function(commandLine, workingDirectory) {
        if (myWindow) {
            if (myWindow.isMinimized()) myWindow.restore();
            myWindow.focus();
        }
        return true;
    }
);

if (shouldQuit) {
    app.quit();
    return;
}

function sendIPCToWindow(window, action, data) {
    window.webContents.send(action, data || {});
}

function initDockMenu(){
    app.dock.setIcon(__dirname + "/logo.png");
}

function initMenu(mainWindow) {

    var template = [
        //{
        //    label: 'File',
        //    submenu: [
        //        {
        //            label: 'Print',
        //            accelerator: 'CmdOrCtrl+p',
        //            click: function (item, window) {
        //                sendIPCToWindow(window, "print");
        //            }
        //        }
        //    ]
        //},
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut'
                },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectall'
                },
                {
                    type: "separator"
                },
                {
                    label: "Find",
                    accelerator: "CmdOrCtrl+F",
                    click: function (item, window) {
                        sendIPCToWindow(window, "findInPage");
                    }
                }
            ]
        },
        /* these items are added by os x */
        {
            label: 'View',
            submenu: [
                {
                    label: 'Fullscreen mode',
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.setFullScreen(true);
                    }
                },
                {
                    label: 'Window mode',
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.setFullScreen(false);
                    }
                },
                {
                    type: "separator"
                },
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.reload();
                    }
                },
                {
                    label: 'Inspect browser',
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.toggleDevTools();
                    }
                }
            ]
        },
        {
            label: 'Window',
            role: 'window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                },
                {
                    label: 'Close',
                    accelerator: 'CmdOrCtrl+W',
                    role: 'close'
                }
            ]
        },
        {
            label: 'Help',
            role: 'help',
            submenu: [
                {
                    label: 'More',
                    click: function (item, window) {
                        sendIPCToWindow(window, "showAbout");
                    }
                }
            ]
        }
    ];

    if (process.platform == 'darwin') {
        var name = app.getName();
        template.unshift({
            label: name,
            submenu: [
                {
                    label: 'About MoeNotes',
                    click: function (item, window) {
                        sendIPCToWindow(window, "showAbout");
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Preferences',
                    accelerator: "CmdOrCtrl+,",
                    click: function (item, window) {
                    }
                },
                {
                    label: 'Services',
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide ' + name,
                    accelerator: 'CmdOrCtrl+H',
                    role: 'hide'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'CmdOrCtrl+Shift+H',
                    role: 'hideothers'
                },
                {
                    label: 'Show All',
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: function () {
                        app.quit();
                    }
                }
            ]
        });
        // Window menu.
        template[3].submenu.push({
            type: 'separator'
        }, {
            label: 'Bring All to Front',
            role: 'front'
        });
    }

    //preferences item on linux and windows
    if (process.platform != "darwin") {
        template[1].submenu.push({
            label: 'About ' + name,
            click: function (item, window) {
                sendIPCToWindow(window, "showAbout");
            }
        });

        template[1].submenu.push({
            type: "separator"
        });

        template[1].submenu.push({
            label: 'Preferences',
            accelerator: "CmdOrCtrl+,",
            click: function (item, window) {

            }
        });

    }

    var menu = new Menu();
    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}


module.exports = {
    initMenu: initMenu,
    initDockMenu: initDockMenu
};