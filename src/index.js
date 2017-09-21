import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import App from './components/App.jsx';

import './style.css';

class AppRoutes extends Component {
  render() {
    return (
      <Router forceRefresh={process.env.NODE_ENV === 'production'}>
        <Switch>
          <Route path="/" exact component={App} />
          {/* TODO create a not found page */}
        </Switch>
      </Router>
    );
  }
}

// if(process.env.NODE_ENV !== 'production') {
render(<AppRoutes />, document.getElementById('app'));
// }
