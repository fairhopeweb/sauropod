import React, { Component } from 'react';
import Speakeasy from 'speakeasy';

import * as Types from '../../types';
// import { remainingTime } from '../../helpers/totp';


interface ItemProps {
  item: Types.App,
}

const currentCode = (token : string) => {
  return Speakeasy.totp({
    secret: token
  });
}

const copyAndClose = (token : string) => {
  const code = currentCode(token);
  navigator.clipboard.writeText(code);
}

class OTPItem extends Component<ItemProps> {
  updateInterval : any = false;

  componentDidMount() {
    if (this.updateInterval === false) {
      this.updateInterval = setInterval(() => {
        this.update();
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
    this.updateInterval = false;
  }

  update() {
    this.forceUpdate();
  }

  render() {
    const { item } = this.props;

    return (
      <div className="bg-white p-3 mb-6 rounded-md shadow-lg w-full cursor-pointer btn" onClick={() => copyAndClose(item.token)}>
        <div className="flex">
          {/* Icon */}
          <img 
            src={item.icon}
            style={{
              width: 45,
              height: 45,
            }}
            alt="App Icon"
            className="rounded-md shadow-lg mr-5 rounded-md"
          />
          
          {/* Information */}
          <div className="flex flex-col" data-tip="Click the name to edit the item">
            <div>
              {item.name}
            </div>
            <div className="text-gray-600 text-sm">
              {item.description}
            </div>
          </div>
    
          {/* Token */}
          <div className="text-right text-2xl flex items-center ml-auto mr-3" data-tip="Click the code to copy it">
            {currentCode(item.token)}
          </div>
        </div>
      </div>
    );
  }
}

export default OTPItem;