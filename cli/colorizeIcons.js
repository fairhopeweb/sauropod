const fs = require('fs-extra');
const { join } = require('path');

console.log('Adding colors to color-icons...');

const fileFolder = join(__dirname, '../', 'public', 'icons');
const files = fs.readdirSync(fileFolder);
const colors = {
  'behance': '#053eff',
  'delicious': '#205cc0',
  'dribbble': '#ea4c89',
  'facebook': '#3b5998',
  'flickr-blue': '#0063dc',
  'flickr-pink': '#ff0084',
  'forrst': '#5b9a68',
  'foursquare': '#25a0ca',
  'googleplus': '#db4a39',
  'instagram': '#3f729b',
  'kippt': '#e03500',
  'linkedin': '#0e76a8',
  'linkility': '#144966',
  'path': '#e41f11',
  'pinterest': '#c8232c',
  'player': '#3503b2',
  'pocket': '#ee4056',
  'rdio': '#008fd5',
  'rss': '#ee802f',
  'skype': '#00aff0',
  'soundcloud': '#ff7700',
  'spotify': '#81b71a',
  'tumblr': '#34526f',
  'twitter': '#55acee',
  'vimeo': '#86c9ef',
  'yahoo': '#720e9e',
  'youtube': '#c4302b',
  '500px': '#0099e5',
  'blogger': '#ea4335',
  'buffer': '#323b43',
  // 'buysellads': '',
  'codepen': '#0ebeff',
  'creative-market': '#8ba753',
  'deviantart': '#05cc47',
  'dropbox': '#007ee5',
  'envato': '#82b541',
  'evernote': '#2dbe60',
  'feedly': '#2bb24c',
  'flickr': '#f40083',
  'github': '#333333',
  'lastfm': '#d51007',
  'myspace': '#000000',
  'paypal': '#003087',
  'product-hunt': '#da552f',
  'reddit': '#ff4500',
  'shopify': '#96bf48',
  'slack': '#4a154b',
  'trello': '#0079bf',
  'whatsapp': '#25d366',
  'wordpress': '#21759b',
  'yelp': '#d32323',
};

// Prefix icon path with '/icons/'
files.forEach((icon) => {
  // Ignore non-color files
  if (/^color-/.test(icon)) {
    const service = icon.replace('color-', '').replace('.svg', '');
    if (colors[service]) {
      let svg = fs.readFileSync(join(fileFolder, icon), 'utf8');
      svg = svg.replace(/#444444/g, colors[service]);

      fs.writeFileSync(join(fileFolder, icon), svg);
    } else {
      console.log(service);
    }
  }
});