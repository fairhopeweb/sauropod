const { menubar } = require('menubar');
const { join } = require('path');

const menubarConfig = {
  dir: join(__dirname, 'src'),
  browserWindow: {
    width: 400,
    height: 600,
  }
}

if (process.NODE_ENV !== 'production') {
  menubarConfig.index = "http://localhost:3000/";
}

const mb = menubar(menubarConfig);

mb.on('ready', () => {
  console.log('App is ready');
});