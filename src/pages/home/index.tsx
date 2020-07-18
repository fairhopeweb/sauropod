import React, { Component } from 'react';
import { view } from '@risingstack/react-easy-state';
import ReactTooltip from "react-tooltip";

import Layout from '../../ui/Layout';
import OTPItem from './item';
import AddOTPItem from './addItem';
import RemainingInfo from './remainingInfo';

import appStore from '../../storage/appStore';

class HomeComponent extends Component {
  componentDidMount() {
    ReactTooltip.rebuild();
  }

  componentDidUpdate(props : any) {
    if (props !== this.props) {
      ReactTooltip.rebuild();
    } 
  }

  render() {
    return (
      <>
        <Layout>
          {appStore.apps.map((item, index) => (
            <OTPItem key={index} item={item} />
          ))}
          <AddOTPItem />
        </Layout>
        <RemainingInfo />
      </>
    );
  }
}

export default view(HomeComponent);