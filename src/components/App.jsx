import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer';

export default class App extends Component {
  render() {
    return (
      <div className="map">
        <MapContainer />
      </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
};
