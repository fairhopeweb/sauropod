import React, { Component } from 'react';

import { remainingTime } from '../../helpers/totp';

class RemainingInfo extends Component {
  statusBar : any = false;
  animation : any = false;

  /**
   * Setup animation
   */
  componentDidMount() {
    const bar = this.statusBar;

    this.animation = bar.animate([
      {
        width: '100%',
      },
      {
        width: '0%',
      },
    ], {
      duration: 30000,
      easing: 'linear',
      direction: 'normal',
      iterations: Infinity,
    });

    this.animation.currentTime = remainingTime();
  }

  render() {
    return (
      <div className="fixed bottom-0 w-full h-2">
        <div
          className="status bg-red-700 h-full remainingInfo"
          style={{ backgroundColor: '#2E3451' }}
          ref={(ref) => this.statusBar = ref}
        ></div>
      </div>
    );
  }
}

export default RemainingInfo;