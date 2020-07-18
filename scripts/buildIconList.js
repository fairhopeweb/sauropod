const fs = require('fs-extra');
const { join } = require('path');

console.log('Building build-in icons list...');

const files = fs.readdirSync(join(__dirname, '../', 'public', 'icons'));

// Prefix icon path with '/icons/'
files.forEach((icon, index) => {
  files[index] = '/icons/' + icon;
});

fs.writeJsonSync(join(__dirname, '../', 'src', 'data', 'icons.json'), files);

console.log(`Indexed ${files.length} icons`);
