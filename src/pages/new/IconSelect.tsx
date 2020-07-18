import React, { Component } from 'react';
import { view } from '@risingstack/react-easy-state';

import { getIcons } from '../../helpers/icons';

interface IconSelectState {
  icons: Array<string>,
};

interface IconSelectProps {
  onChange: Function,
  selected: string,
}

class IconSelect extends Component<IconSelectProps> {
  state : IconSelectState = {
    icons: [],
  };

  constructor(props : any) {
    super(props);
    
    this.state.icons = getIcons();
  }

  render() {
    const {selected, onChange} = this.props;

    return (
      <>
        <label className="text-gray-700">Service Icon</label>
        <div 
          className={`
            w-full
            rounded-md

            border-solid
            border-gray-500
            border-2

            bg-white
          `}
          style={{
            maxHeight: 300,
            overflow: 'scroll',
          }}
        >
          <div className="p-5 py-6 grid grid-cols-4 gap-4">
            {this.state.icons.map(icon => (
              <div className="flex justify-center" onClick={() => onChange(icon)} key={icon}>
                <img
                  src={icon}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  alt={icon}
                  className={`rounded-md shadow-lg rounded-md box-border cursor-pointer ${selected === icon ? 'border-solid border-indigo-300 border-4' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default view(IconSelect);