import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Row, Col, Grid } from 'react-bootstrap';

import { getGISData, getVoterInfo } from '../actions';
import Home from './pages/Home';
import About from './pages/About';
import Header from './Header';


class App extends Component {

  state = {
    voterModalShow: true,
    regInfoModalShow: false,
    aboutModalShow: false,
    firstName: '',
    lastName: '',
    voterInfo: [],
    isloading: false,
    voterAddress: '',
    layers: {
      commissionerDist: null,
    },
    firstNameValidationState: null,
    lastNameValidationState: null,
    formErrors: [],
    voterInfoFound: true,
  };

  componentDidMount() {
    getGISData()
      .then(layers => this.setState({ layers }));
  }

  _getVoterInfo = () => {
    if (this._validateVoterInput()) {
      this.setState({
        firstNameValidationState: null,
        lastNameValidationState: null,
      });

      this.setState({ isloading: true });

      getVoterInfo(this.state.firstName, this.state.lastName)
        .then((voterInfo) => {
          this.setState({
            voterInfo,
            voterInfoFound: voterInfo.length > 0,
            isloading: false,
          });
        });
    } else {
      this.setState({ voterInfo: [] });
    }
  }

  _validateVoterInput = () => {
    let result = true;
    const errors = [];
    if (this.state.firstName === '') {
      this.setState({ firstNameValidationState: 'error' });
      errors.push('first name');
      result = false;
    }
    if (this.state.lastName === '') {
      this.setState({ lastNameValidationState: 'error' });
      errors.push('last name');
      result = false;
    }
    this.setState({ formErrors: errors });
    return result;
  }

  _getVoterAddress = (address) => {
    this.setState({ voterAddress: address });
  }

  _showVoterInfoModal = () => {
    this.setState({
      regInfoModalShow: false,
      voterModalShow: true,
    });
  }

  _showRegInfoModal = () => {
    this.setState({
      regInfoModalShow: true,
      voterModalShow: false,
      voterInfo: [],
    });
  }

  _handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      voterInfo: [],
      selectedAddress: {},
      showUserStatus: false,
    });
  }

  render() {
    return (
      <Router>
        <div className="app__wrapper">
          <Header>
            <Link to="/" className="btn btn-link header__details-action">Home</Link>
            <Link to="/about" className="btn btn-link header__details-action">About</Link>
          </Header>
          <div className="app">
            <Grid >
              <Row>
                <Col md={8} mdOffset={2}>
                  <Route exact path="/" component={Home} />
                  <Route path="/about" component={About} />
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
