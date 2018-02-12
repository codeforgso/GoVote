import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer';
import VoterModal from './VoterModal.jsx';
import VoterInfoForm from './VoterInfoForm';
import VerifyVoterInfo from './VerifyVoterInfo';
import RegistrationInfoModal from './RegistrationInfoModal';
import Header from './Header';
import AboutModal from './AboutModal';

class App extends Component {
  constructor() {
    super();
    this.state = {
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
    };
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  componentWillMount() {
    this._getGISData(this.props.match);
  }

  _getCouncilDistricts = () => { axios.get('http://data-greensboro.opendata.arcgis.com/datasets/829c58aaaf0c4bf0b59f93bfe3cb4c13_3.geojson'); }

  _getCommissionerDistricts = () => { axios.get('http://data-greensboro.opendata.arcgis.com/datasets/1b60f15bb4dc4d8f96bd4831a8fbf063_5.geojson'); }

  _getGISData = () => {
    axios.all([this._getCouncilDistricts(), this._getCommissionerDistricts()])
      .then(axios.spread((councilDist, commissionerDist) => {
        this.setState({ layers: { councilDist: councilDist.data, commissionerDist: commissionerDist.data } });
      }));
  }

  _getVoterInfo = () => {
    if (this._validateVoterInput()) {
      this.setState({ firstNameValidationState: null });
      this.setState({ lastNameValidationState: null });
      axios.get(`/api/${this.state.firstName}/${this.state.lastName}`)
        .then((response) => {
          this.setState({ voterInfo: response.data });
        })
        .catch((error) => {
          console.log(error);// eslint-disable-line no-console
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
    this.setState({ voterAddress: address }, () => console.log(this.state.voterAddress));// eslint-disable-line no-console
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
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      voterInfo: [],
      selectedAddress: {},
      showUserStatus: false,
    });
  }

  _handleShowAboutModal = () => {
    this.setState({
      aboutModalShow: true,
    });
    console.log('clicked');// eslint-disable-line no-console
  }

  _handleHideAboutModal = () => {
    this.setState({
      aboutModalShow: false,
    });
    console.log('closed');// eslint-disable-line no-console
  }

  render() {
    const voterModalShow = () => this.setState({ voterModalShow: false, voterInfo: [] });
    const regInfoModalShow = () => this.setState({ regInfoModalShow: false });
    return (
      this.state.layers.councilDist && this.state.layers.commissionerDist ?
        <div>
          <Header showVoterInfoModal={this._showVoterInfoModal} showAboutModal={this._handleShowAboutModal} />
          <AboutModal show={this.state.aboutModalShow} hide={this._handleHideAboutModal} onClick={this._handleShowAboutModal} />
          <div className="map">
            <MapContainer data={this.state.layers} voterAddress={this.state.voterAddress} />
            <VoterModal show={this.state.voterModalShow} hide={voterModalShow}>
              <VoterInfoForm onSubmit={this._getVoterInfo} onUpdate={this._handleInputChange} firstNameValidationState={this.state.firstNameValidationState} lastNameValidationState={this.state.lastNameValidationState} formErrors={this.state.formErrors} />
              <VerifyVoterInfo voterInfo={this.state.voterInfo} showRegInfoModal={this._showRegInfoModal} voterAddress={this._getVoterAddress} />
            </VoterModal>
            <RegistrationInfoModal show={this.state.regInfoModalShow} hide={regInfoModalShow} />
          </div>
        </div> : null
    );
  }
}

App.propTypes = {
  match: PropTypes.object,
};

export default App;
