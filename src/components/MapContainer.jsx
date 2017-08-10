import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const position = [36.0726, -79.7920];
const MapContainer = (props) => {
  return (
    <Map className="map" center={position} zoom={13}>
      <TileLayer
        url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      />
      <Marker position={position}>
        <Popup>
          <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
        </Popup>
      </Marker>
    </Map>
  );
};

module.exports = MapContainer;
