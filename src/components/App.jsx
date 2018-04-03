import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getGISData, getVoterInfo } from '../actions';
import AboutModal from './AboutModal';
import Header from './Header';
import MapContainer from './MapContainer';
import RegistrationInfoModal from './RegistrationInfoModal';
import VerifyVoterInfo from './VerifyVoterInfo';
import VoterInfoForm from './VoterInfoForm';
import VoterModal from './VoterModal';

class App extends Component {
  state = {
    voterModalShow: true,
    regInfoModalShow: false,
    aboutModalShow: false,
    firstName: '',
    lastName: '',
    voterInfo: [],
    voterAddress: '',
    layers: {
      councilDist: null,
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

      getVoterInfo(this.state.firstName, this.state.lastName)
        .then((voterInfo) => {
          this.setState({
            voterInfo,
            voterInfoFound: voterInfo.length > 0,
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

  _handleShowAboutModal = () => {
    this.setState({ aboutModalShow: true });
  }

  _handleHideAboutModal = () => {
    this.setState({ aboutModalShow: false });
  }

  render() {
    const voterModalShow = () => this.setState({ voterModalShow: false, voterInfo: [] });
    const regInfoModalShow = () => this.setState({ regInfoModalShow: false });

    return (
      this.state.layers.councilDist && this.state.layers.commissionerDist &&
        <div className="app__wrapper">
          <Header showVoterInfoModal={this._showVoterInfoModal} showAboutModal={this._handleShowAboutModal} />
          <MapContainer data={this.state.layers} voterAddress={this.state.voterAddress} />

          <AboutModal show={this.state.aboutModalShow} hide={this._handleHideAboutModal} onClick={this._handleShowAboutModal} />
          <RegistrationInfoModal show={this.state.regInfoModalShow} hide={regInfoModalShow} />
          <VoterModal show={this.state.voterModalShow} hide={voterModalShow}>
            <VoterInfoForm onSubmit={this._getVoterInfo} onUpdate={this._handleInputChange} voterInfoFound={this.state.voterInfoFound} firstNameValidationState={this.state.firstNameValidationState} lastNameValidationState={this.state.lastNameValidationState} formErrors={this.state.formErrors} />
            <VerifyVoterInfo voterInfo={this.state.voterInfo} showRegInfoModal={this._showRegInfoModal} voterAddress={this._getVoterAddress} />
          </VoterModal>
        </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.object,
};

export default App;
