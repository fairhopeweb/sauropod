import React, { Component } from 'react';
import { view } from '@risingstack/react-easy-state';
import ReactTooltip from "react-tooltip";
import * as JsSearch from 'js-search';

import Layout from '../../ui/Layout';
import TextInput from '../../ui/TextInput';
import OTPItem from './item';
import AddOTPItem from './addItem';
import RemainingInfo from './remainingInfo';
import EmptyItemList from './EmptyItemList';
import * as Types from '../../types';

import appStore from '../../storage/appStore';
import settingsStore from '../../storage/settingsStore';

import getCurrentTabName from '../../helpers/activeTab';


class HomeComponent extends Component {
  state = {
    query: '',
    browserTitle: '',
  }

  search : any = {
    search: () => {},
  };

  suggestionInterval : NodeJS.Timeout | false = false;

  buildSearch() {
    const search = new JsSearch.Search('name');
    search.addIndex('name');
    search.addIndex('description');
    search.addDocuments(appStore.apps);

    this.search = search;
  }

  getTabInfo() {
    if (settingsStore.showSuggestions) {
      getCurrentTabName().then((title) => {
        if (title && title.toLowerCase() !== 'sauropod') {
          console.log('Title', title);
          this.setState({
            browserTitle: title,
          }, () => {
            ReactTooltip.rebuild();
          });
        }
      });
    }
  }

  componentDidMount() {
    ReactTooltip.rebuild();
    this.buildSearch();
    this.getTabInfo();
    
    // We get the current tab info every 5 seconds as the window might stay loaded
    // while the user switches tabs - making the suggestions outdated
    this.suggestionInterval = setInterval(() => {
      this.getTabInfo();
    }, 5000);
  }

  componentWillUnmount() {
    if (this.suggestionInterval) {
      clearInterval(this.suggestionInterval);
    }
  }

  componentDidUpdate(props : any) {
    if (props !== this.props) {
      ReactTooltip.rebuild();
      this.buildSearch();
    } 
  }

  render() {
    let showIcons = appStore.apps;
    let suggestedServices = [];

    const { query, browserTitle } = this.state;
    if (query !== '') {
      showIcons = this.search.search(query);
    }

    if (browserTitle !== '') {
      // Search if we have a service with the current browser tab name
      for(const service of appStore.apps) {
        if (
          browserTitle.toLowerCase().includes(service.name.toLowerCase()) ||
          browserTitle.toLowerCase().includes(service.description.toLowerCase())
        ) {
          suggestedServices.push(service);
        }
      }
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
              value={query}
            />
          </div>
          {appStore.apps.length === 0 && (
            <EmptyItemList />
          )}
          {suggestedServices.length > 0 && query === '' && (
            <>
              <h3 className="text-gray-500 text-sm mb-2">
                Suggested services
              </h3>
              {suggestedServices.map((item : Types.App, index) => (
                // @ts-ignore
                <OTPItem key={index} item={item} index={index} />
              ))}

              <h3 className="text-gray-500 text-sm mb-2">
                All services
              </h3>
            </>
          )}
          {showIcons.map((item : Types.App, index) => (
            // @ts-ignore
            <OTPItem key={index} item={item} index={index} />
          ))}
          <AddOTPItem />
        </Layout>
        <RemainingInfo />
      </>
    );
  }
}

export default view(HomeComponent);