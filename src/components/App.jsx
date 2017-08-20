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
      voterInfo: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getVoterInfo = () => {
    axios.get(`/api/${this.state.firstName}/${this.state.lastName}`, { baseURL: 'http://localhost:3001/' })
      .then((response) => {
        console.log(response);
        this.setState({voterInfo: response});
        alert(JSON.stringify(this.state.voterInfo.data));
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
      <div className="map">
        <MapContainer />
        <VoterModal show={this.state.modalShow} onHide={modalClose} onSubmit={this.getVoterInfo} onUpdate={this.handleInputChange}/>
      </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
};
