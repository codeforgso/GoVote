import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Control from 'react-leaflet-control';
import { Alert } from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import SearchControl from './SearchControl.js';
import './MapContainer.css';

class MapContainer extends Component {
  state = {
    geocodeAddressResult: {},
    searchControlErrMsg: null,
  }

  _getGeocodeResult = (result) => {
    this.setState({
      geocodeAddressResult: result !== undefined ? result : {},
      searchControlErrMsg: result === undefined ? 'No Address Found' : null,
    });
  }

  render() {
    const { layers } = this.props;
    const center = [36.0726, -79.7920];

    return (
      <Map className="map" center={center} zoom={11}>
        <TileLayer
          url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://data.greensboro-nc.gov/" target="_blank">Open Gate City</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        />
        {
        this.state.geocodeAddressResult.latlng ?
          <Marker position={this.state.geocodeAddressResult.latlng}>
            <Popup>
              <span><p>{this.state.geocodeAddressResult.text}</p></span>
            </Popup>
          </Marker>
          : null
        }
        <SearchControl setGeocodeResult={this._getGeocodeResult} />
        <Control position="topleft" className="geocoder-control search-control-error">
          {
            this.state.searchControlErrMsg ?
              <Alert bsStyle="warning">{this.state.searchControlErrMsg}</Alert>
            : <div />
          }
        </Control>
        <LayersControl position="topleft">
          {
            layers.map((layer, index) => (
              <LayersControl.Overlay name={layer.name} key={index} checked={index === 0} >
                <GeoJSON
                  data={layer.features}
                  onEachFeature={layer.onEachFeature ? layer.onEachFeature : layer.generatedOnEachFeature(layer.name)}
                  style={layer.style ? layer.style : null}
                />
              </LayersControl.Overlay>
            ))
          }
        </LayersControl>
      </Map>
    );
  }
}

MapContainer.propTypes = {
  layers: PropTypes.array.isRequired,
};

module.exports = MapContainer;
