// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import 'typeface-roboto';
import 'animate.css';
import 'noty/lib/noty.css';
import 'noty/lib/themes/nest.css';
import './index.css';
import './tailwind.output.css';

// Components
import App from './App';

const path = require('path');
const {fixPathForAsarUnpack} = require('electron-util/node');
const binary = path.join(__dirname, 'screen-capture-permissions');
console.log('PATH', binary);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
