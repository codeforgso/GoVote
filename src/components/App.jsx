import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Row, Col, Grid } from 'react-bootstrap';

import Header from './Header';
import Home from './pages/Home';
import VoterRequirements from './pages/VoterRequirements';
import routes from './pages/routes';

require('dotenv').config();

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app__wrapper">
          <Header />
          <div className="app__body">
            <Grid >
              <Row>
                <Col md={8} mdOffset={2} lg={10} lgOffset={1}>
                  {
                    routes.map((route, index) => <Route key={index} exact={route.exact} path={route.to} component={route.component} />)
                  }
                  <Route exact path="/" component={Home} />
                  <Route path="/voter-requirements" component={VoterRequirements} />
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
