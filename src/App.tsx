import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import ReactTooltip from "react-tooltip";
import { view } from '@risingstack/react-easy-state';

import settingsStore from './storage/settingsStore';
import setupPersistence from './storage/persistence';

import HomeComponent from './pages/home';
import NewService from './pages/new';
import Settings from './pages/settings';

const routes = [
  { path: '/new', Component: NewService },
  { path: '/edit/:id', Component: NewService },
  { path: '/settings', Component: Settings },
  { path: '/', Component: HomeComponent },
]

setupPersistence();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </Router>
       {settingsStore.showTooltips && (
         <ReactTooltip effect="solid" place="bottom" />
       )}
      </div>
    );
  }
}

export default view(App);
