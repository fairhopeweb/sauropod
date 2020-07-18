import React, { Component } from 'react';
import { view } from '@risingstack/react-easy-state';
import ReactTooltip from "react-tooltip";
import * as JsSearch from 'js-search';

import Layout from '../../ui/Layout';
import TextInput from '../../ui/TextInput';
import OTPItem from './item';
import AddOTPItem from './addItem';
import RemainingInfo from './remainingInfo';

import appStore from '../../storage/appStore';

class HomeComponent extends Component {
  state = {
    query: '',
  }

  search : any = {
    search: () => {},
  };

  buildSearch() {
    const search = new JsSearch.Search('name');
    search.addIndex('name');
    search.addIndex('description');
    search.addDocuments(appStore.apps);

    this.search = search;
  }

  componentDidMount() {
    ReactTooltip.rebuild();
    this.buildSearch();
  }

  componentDidUpdate(props : any) {
    if (props !== this.props) {
      ReactTooltip.rebuild();
      this.buildSearch();
    } 
  }

  render() {
    let showIcons = appStore.apps;

    const { query } = this.state;
    if (query !== '') {
      showIcons = this.search.search(query);
    }

    return (
      <>
        <Layout>
          <div className="mb-5">
            <TextInput 
              placeholder="Search"
              onChange={(query : string) => {
                this.setState({ query });
              }}
            />
          </div>
          {showIcons.map((item, index) => (
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