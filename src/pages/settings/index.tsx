import React, { Component } from 'react';
import { remote } from 'electron';
import { view } from '@risingstack/react-easy-state';
import { saveAs } from 'file-saver';
import { Check } from 'react-feather';

import * as Types from '../../types';

import Layout from '../../ui/Layout';
import Button from '../../ui/Button';

import Setting from './setting';
import appStore from '../../storage/appStore';

import { findIconFor } from '../../helpers/icons';
import notify from '../../helpers/noty';

interface AppExport {
  secret: string,
  label: string,
  digits: number,
  type: string,
  algorithm: string,
  thumbnail: string,
  last_used: number,
  period: number,
  icon?: string,
  tags: Array<string>,
};

interface ExportFile extends Array<AppExport> {}

class SettingsPage extends Component {
  fileInput : HTMLInputElement | null = null;

  state = {
    hasImported: false,
    hasExported: false,
  }

  import() {
    // @ts-ignore
    let file = this.fileInput?.files[0];
    const that = this;
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const content = event?.target?.result;

        if (content) {
          // @ts-ignore
          const data : ExportFile = JSON.parse(content);

          data.forEach((item) => {
            const app : Types.App = {
              name: item.thumbnail,
              description: item.label,
              token: item.secret,
              icon: item.icon || findIconFor(item.thumbnail),
            };

            appStore.apps.push(app);
          });

          notify(`Imported ${data.length} items.`);
          that.setState({
            hasImported: true,
          });
        } else {
          alert('Could not read your file. Please try again later');
        }
      };

      reader.readAsText(file);
    }
  }

  export() {
    const exportFile : ExportFile = [];
    appStore.apps.forEach((app) => {
      exportFile.push({
        "secret": app.token,
        "label": app.description,
        "digits": 6,
        "type": "TOTP",
        "algorithm": "SHA1",
        "thumbnail": app.name,
        "last_used": (+new Date()),
        "period": 30,
        "icon": app.icon,
        "tags": []
      });
    });

    const blob = new Blob([JSON.stringify(exportFile)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'sauropod-export.json');

    this.setState({
      hasExported: true,
    });
  }

  render() {
    return (
      <Layout>
        <h2 className="text-2xl text-gray-800 mb-4 ml-2">
          Settings
        </h2>

        <h3 className="text-gray-800 mb-4 ml-2">
          General
        </h3>
        <div className="px-5">
          <Setting
            text="Show Tooltips"
            name="showTooltips"
          />
        </div>

        <h3 className="text-gray-800 mb-4 ml-2">
          Transfer
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Button fullWidth onClick={() => this.fileInput?.click()}>
            {this.state.hasImported ? (
              <div className="animate__animated animate__fadeInUp">
                <Check />
              </div>
            ) : (
              <>
                Import from file
              </>
            )}
          </Button>
          <Button fullWidth onClick={() => this.export()}>
            {this.state.hasExported ? (
              <div className="animate__animated animate__fadeInUp">
                <Check />
              </div>
            ) : (
              <>
                Export to file
              </>
            )}
          </Button>
        </div>
        <p className="text-gray-600 mt-2">
          Sauropod supports importing configurations from andOTP.<br />
          You can also export your Sauropod configuration and import it into andOTP.<br />
          Be careful: Exported files are unencrypted.
        </p>

        {/* Input needed to upload files to import */}
        <input type="file" className="hidden" ref={(item) => {
          this.fileInput = item;
        }} onChange={() => this.import()} />

        <h3 className="text-gray-800 my-4 ml-2">
          Quit
        </h3>
        <Button fullWidth onClick={() => remote.app.quit()}>
          Quit Sauropod
        </Button>
        <p className="text-gray-600 mt-2">
          You can also quit Sauropod by double-clicking on the tray icon and choosing "Quit Sauropod".
        </p>

      </Layout>
    );
  }
}

export default view(SettingsPage);