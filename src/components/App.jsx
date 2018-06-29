import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Row, Col, Grid } from 'react-bootstrap';

import Header from './Header';
import Home from './pages/Home';
import VoterRegLookup from './pages/VoterRegLookup';
import routes from './pages/routes';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app__wrapper">
          <Header>
            {
              routes.map(route => <Link to={route.to} className="btn btn-link header__details-action">{route.label}</Link>)
            }
          </Header>
          <div className="app__body">
            <Grid >
              <Row>
                <Col md={8} mdOffset={2}>
                  {
                    routes.map(route => <Route exact={route.exact} path={route.to} component={route.component} />)
                  }
                  <Route exact path="/" component={Home} />
                  <Route path="/voter-lookup" component={VoterRegLookup} />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  match: PropTypes.object,
};

export default App;
