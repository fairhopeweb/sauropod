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

// IPC Connection
import './helpers/protocol';

// Components
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
