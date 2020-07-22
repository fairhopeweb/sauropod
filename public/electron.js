const { menubar } = require('menubar');
const { join } = require('path');
const electron = require('electron');
const isDev = require('electron-is-dev');
const contextMenu = require('electron-context-menu');

const webUrl = isDev ? 'http://localhost:3000' : `file://${join(__dirname, '../build/index.html')}`;

// Setup Context Menu
contextMenu({
	showInspectElement: true,
});

// Setup Menubar
const menubarConfig = {
  dir: join(__dirname, 'src'),
  browserWindow: {
    width: isDev ? 1000 : 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  },
  icon: join(__dirname, 'MenuBarIcon.png'),
  tooltip: 'Sauropod',
  index: webUrl,
  showDockIcon: isDev,
}

const mb = menubar(menubarConfig);

mb.on('ready', () => {
  console.log('App is ready');

  // Setup protocol action for optauth: protocol
  mb.app.setAsDefaultProtocolClient('otpauth');
  mb.app.on('open-url', (event, url) => {
      event.preventDefault();
      
      mb.showWindow();
      mb.window.webContents.once('did-finish-load', () => {
        mb.window.webContents.send('add-url', url);
      });
  });

  // Setup right-click action
  mb.tray.on('double-click', () => {
    const menu = electron.Menu.buildFromTemplate([
      {
        label: 'Quit Sauropod',
        click() {
          mb.app.quit();
        },
      },
    ]);

    menu.popup();
  })
});

mb.on('after-create-window', () => {
  if (isDev) {
    mb.window.openDevTools();
  }
});

// Listen on the ipcAPI if we should open a window
electron.ipcMain.on('openFull', () => {
  const fullWindow = new electron.BrowserWindow({
    minWidth: 600,
    minHeight: 500,
    show: true,
    backgroundColor: '#2A304B',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  fullWindow.loadURL(webUrl);
});
