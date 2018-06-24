import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Row, Col, Grid } from 'react-bootstrap';

import Header from './Header';
import Home from './pages/Home';
import About from './pages/About';
import VoterRegLookup from './pages/VoterRegLookup';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app__wrapper">
          <Header>
            <Link to="/" className="btn btn-link header__details-action">Home</Link>
            <Link to="/about" className="btn btn-link header__details-action">About</Link>
          </Header>
          <div className="app__body">
            <Grid >
              <Row>
                <Col md={8} mdOffset={2}>
                  <Route exact path="/" component={Home} />
                  <Route path="/about" component={About} />
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
