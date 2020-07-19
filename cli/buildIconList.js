const fs = require('fs-extra');
const { join } = require('path');

console.log('Building build-in icons list...');

const files = fs.readdirSync(join(__dirname, '../', 'public', 'icons'));
const filePaths = [];

// Prefix icon path with '/icons/'
files.forEach((icon) => {
  // Ignore non-image files
  if (/\.(png|svg|jpg|jpeg)$/.test(icon)) {
    filePaths.push('/icons/' + icon);
  }
});

fs.writeJsonSync(join(__dirname, '../', 'src', 'data', 'icons.json'), filePaths);

console.log(`Indexed ${filePaths.length} icons`);
