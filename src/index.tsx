// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

import * as Types from './types';

// Styles
import 'typeface-roboto';
import 'animate.css';
import 'noty/lib/noty.css';
import 'noty/lib/themes/nest.css';
import './index.css';
import './tailwind.output.css';

// IPC Connection
import './helpers/protocol';

// Components
import App from './App';

declare global {
  interface Window { 
    sauropod: Types.SauropodWindow
  }
}

window.sauropod = {
  services: {},
  loaded: true,
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
