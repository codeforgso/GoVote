import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { routes } from '../routes';
import configureStore from '../store/configureStore';

// Grab the state from a global variable injected into the server-generated HTML
// const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = configureStore({"content": "test"});

export default class AppRoutes extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
      </Provider>
    );
  }
}
