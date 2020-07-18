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
    console.log(this.state.icons);
  }

  render() {
    const {selected, onChange} = this.props;

    return (
      <div 
        className={`
          w-full
          rounded-md
          p-3

          border-solid
          border-gray-500
          border-2

          bg-white

          grid
          grid-cols-3
          gap-4
        `}
      >
        {this.state.icons.map(icon => (
          <div className="flex justify-center" onClick={() => onChange(icon)}>
            <img
              src={icon}
              style={{
                width: 65,
                height: 65,
              }}
              alt={icon}
              key={icon}
              className={`rounded-md shadow-lg rounded-md box-border ${selected === icon ? 'border-solid border-red-800 border-4' : ''}`}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default view(IconSelect);