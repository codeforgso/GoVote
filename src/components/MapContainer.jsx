import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Control from 'react-leaflet-control';
import { Alert } from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import SearchControl from './SearchControl.js';
import './MapContainer.css';

class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      geocodeAddressResult: {},
      searchControlErrMsg: null,
    };
  }

  _onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.Commission) {
      layer.bindPopup(`<h5>GUILFORD COUNTY COMMISSIONER</h5><h5>DISTRICT: ${feature.properties.District}</br>COMMISSIONER: ${feature.properties.Commission.toUpperCase()}</h5>`);
    }
    if (feature.properties && feature.properties.MEMBER) {
      layer.bindPopup(`<h5>GREENSBORO CITY COUNCIL</h5><h5>DISTRICT: ${feature.properties.DISTRICT}</br>MEMBER: ${feature.properties.MEMBER.toUpperCase()}</h5>`);
    }
  }

  _getGeocodeResult = (result) => {
    this.setState({
      geocodeAddressResult: result,
    });
    console.log('this.state.geocodeAddressResult');// eslint-disable-line no-console
    console.log(this.state.geocodeAddressResult);// eslint-disable-line no-console
  }

  render() {
    const { data } = this.props;
    const center = [36.0726, -79.7920];
    const councilStyle = {
      color: '#006400',
      weight: 2,
      opacity: 0.85,
    };
    const commissionerStyle = {
      color: '#640000',
      weight: 2,
      opacity: 0.85,
    };

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
          <LayersControl.Overlay name="City Council Districts" checked>
            <GeoJSON data={data.councilDist} onEachFeature={this._onEachFeature} style={councilStyle} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="County Commissioner Districts">
            <GeoJSON data={data.commissionerDist} onEachFeature={this._onEachFeature} style={commissionerStyle} />
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    );
  }
}

MapContainer.propTypes = {
  data: PropTypes.object.isRequired,
};

module.exports = MapContainer;
