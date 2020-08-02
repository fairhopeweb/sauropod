import { ipcRenderer } from 'electron';
import React from 'react';
import settingsStore from '../../storage/settingsStore';
import { view } from '@risingstack/react-easy-state';

import './setting.css';

interface SettingProps {
  text: string,
  name: string,
  onChange?: Function,
}

const Setting = ({ text, name, onChange } : SettingProps) => {
  return (
    <div className="mb-6">
      <label className="flex items-center">
        <div className="switch">
          <input type="checkbox" onChange={async (e) => {
          const value : boolean = e.target.checked;
          settingsStore[name] = value;

          await window.sauropod.services.persistence?.saveData();
          ipcRenderer.send('reloadData');

          if (onChange) {
            onChange(value);
          }
        }} checked={settingsStore[name]} />
          <span className="slider round"></span>
        </div>
        <span className="block text-gray-800 font-bold ml-4">
          { text }
        </span>
      </label>

    </div>
  );
}

export default view(Setting);