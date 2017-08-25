import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer';
import VoterModal from './VoterModal.jsx';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: true,
      firstName: null,
      lastName: null,
      voterInfo: {},
      layers: {
        councilDist: null
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this._getCouncilDistricts(this.props.match);
  }

  _getVoterInfo = () => {
    axios.get(`/api/${this.state.firstName}/${this.state.lastName}`, { baseURL: 'http://localhost:3001/' })
    .then((response) => {
      this.setState({voterInfo: response});
      alert(JSON.stringify(this.state.voterInfo.data, null, 2));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  _getCouncilDistricts = () => {
    axios.get('http://data-greensboro.opendata.arcgis.com/datasets/829c58aaaf0c4bf0b59f93bfe3cb4c13_3.geojson')
   .then((response) => {
      this.setState({ layers: { councilDist: response.data } });
      //console.log(this.state.councilDist);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const modalClose = () => this.setState({ modalShow: false });
    return (
      this.state.layers.councilDist ?
        <div className="map">
          <MapContainer data={this.state.layers} />
          <VoterModal show={this.state.modalShow} onHide={modalClose} onSubmit={this._getVoterInfo} onUpdate={this.handleInputChange}/>
        </div> : null
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
};
