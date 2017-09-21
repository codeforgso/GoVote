import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer';
import VoterModal from './VoterModal.jsx';
import VoterInfoForm from './VoterInfoForm';
import VerifyVoterInfo from './VerifyVoterInfo';
import RegistrationInfoModal from './RegistrationInfoModal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      voterModalShow: true,
      regInfoModalShow: false,
      firstName: '',
      lastName: '',
      voterInfo: [],
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

  _getCouncilDistricts = () => {
    return axios.get('http://data-greensboro.opendata.arcgis.com/datasets/829c58aaaf0c4bf0b59f93bfe3cb4c13_3.geojson');
  }

  _getCommissionerDistricts = () => {
    return axios.get('http://data-greensboro.opendata.arcgis.com/datasets/1b60f15bb4dc4d8f96bd4831a8fbf063_5.geojson');
  }

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
          console.log(error);
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

  _showRegInfoModal = () => {
    this.setState({
      regInfoModalShow: true,
      voterModalShow: false,
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

  render() {
    const voterModalShow = () => this.setState({ voterModalShow: false });
    const regInfoModalShow = () => this.setState({ regInfoModalShow: false });
    return (
      this.state.layers.councilDist && this.state.layers.commissionerDist ?
        <div className="map">
          <MapContainer data={this.state.layers} />
          <VoterModal show={this.state.voterModalShow} onHide={voterModalShow}>
            <VoterInfoForm onSubmit={this._getVoterInfo} onUpdate={this._handleInputChange} firstNameValidationState={this.state.firstNameValidationState} lastNameValidationState={this.state.lastNameValidationState} formErrors={this.state.formErrors} />
            <VerifyVoterInfo voterInfo={this.state.voterInfo} showRegInfoModal={this._showRegInfoModal} />
          </VoterModal>
          <RegistrationInfoModal show={this.state.regInfoModalShow} onHide={regInfoModalShow} />
        </div> : null
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
};

export default App;
