const { menubar } = require('menubar');
const { join } = require('path');
const electron = require('electron');
const isDev = require('electron-is-dev');
const contextMenu = require('electron-context-menu');
const activeWin = require('active-win');

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
let openWindows = 0;
electron.ipcMain.on('openFull', () => {
  // Only show dock icon when we have a full window opened
  mb.app.dock.show();

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
  openWindows += 1;

  fullWindow.on('close', () => {
    openWindows -= 1;

    if (openWindows === 0) {
      mb.app.dock.hide();
    }
  });
});

electron.ipcMain.on('getCurrentUrl', (event) => {
  activeWin().then((info) => {
    event.sender.send('currentUrl', info);
  });
});

electron.ipcMain.on('closeMenu', () => {
  mb.hideWindow();
});