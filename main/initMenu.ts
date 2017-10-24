/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 23 Oct 2017
 * Description:
 */
import {Menu, App} from 'electron';
import {TConfig} from './config';

declare const mainWindow: any;

const sendIPCToWindow = (window, action, data = {}) => {
  window.webContents.send(action, data);
};

export default (app: App, menu: Menu, config: TConfig) => {
  // more than on windows are not allowed
  const shouldQuit = app.makeSingleInstance(
    (commandLine, workingDirectory) => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }
        mainWindow.focus();
      }
      return true;
    }
  );

  if (shouldQuit) {
    app.quit();
    return;
  }

  const template: any = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        }, {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        }, {
          type: 'separator'
        }, {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        }, {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        }, {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        }, {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        }, {
          type: 'separator'
        }, {
          label: 'Find',
          accelerator: 'CmdOrCtrl+F',
          click: (item, window) => {
            sendIPCToWindow(window, 'findInPage');
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
          click: (item, focusedWindow) => {
            if (!focusedWindow) {
              return;
            }
            focusedWindow.setFullScreen(true);
          }
        },
        {
          label: 'Window mode',
          click: (item, focusedWindow) => {
            if (!focusedWindow) {
              return;
            }
            focusedWindow.setFullScreen(false);
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: (item, focusedWindow) => {
            if (!focusedWindow) {
              return;
            }
            focusedWindow.reload();
          }
        },
        {
          label: 'Inspect browser',
          click: (item, focusedWindow) => {
            if (!focusedWindow) {
              return;
            }
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
          click: (item, window) => {
            sendIPCToWindow(window, 'showAbout');
          }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    const name = app.getName();
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'About MoeNotes',
          click: (item, window) => {
            sendIPCToWindow(window, 'showAbout');
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Preferences',
          accelerator: 'CmdOrCtrl+,',
          click: (item, window) => {}
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
          click: () => {
            app.quit();
          }
        }
      ]
    });

    // Window menu.
    template[3].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    );
  }

  //preferences item on linux and windows
  if (process.platform != 'darwin') {
    template[1].submenu.push({
      label: 'About MoeNotes',
      click: function (item, window) {
        sendIPCToWindow(window, 'showAbout');
      }
    });

    template[1].submenu.push({
      type: 'separator'
    });

    template[1].submenu.push({
      label: 'Preferences',
      accelerator: 'CmdOrCtrl+,',
      click: function (item, window) {}
    });
  }

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  if (process.platform === 'darwin'){
    app.dock.setIcon(`${config.paths.root}/logo.png`);
  }
};
