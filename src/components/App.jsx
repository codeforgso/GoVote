import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer';
import VoterModal from './VoterModal.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: true,
    };
  }

  render() {
    const modalClose = () => this.setState({ modalShow: false });
    return (
      <div className="map">
        <MapContainer />
        <VoterModal show={this.state.modalShow} onHide={modalClose} />
      </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
};
