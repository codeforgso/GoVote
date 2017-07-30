import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const position = [36.0726, -79.7920];
const MapContainer = (props) => {
  return (
    <Map className="map" center={position} zoom={13}>
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
