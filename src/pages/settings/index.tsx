import React, { Component } from 'react';
import { view } from '@risingstack/react-easy-state';

import Layout from '../../ui/Layout';

import Setting from './setting';

class SettingsPage extends Component {
  render() {
    return (
      <Layout>
        <h2 className="text-2xl text-gray-800 mb-4 ml-2">
          Settings
        </h2>
        <div className="px-5">
          <Setting
            text="Show Tooltips"
            name="showTooltips"
          />
        </div>
      </Layout>
    );
  }
}

export default view(SettingsPage);