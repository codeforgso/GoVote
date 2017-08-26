import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, GeoJSON, LayersControl, FeatureGroup, Circle } from 'react-leaflet';
import axios from 'axios';

class MapContainer extends React.Component {

  _onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.Commission) {
      console.log(feature, layer);
      layer.bindPopup(`<h5>GUILFORD COUNTY COMMISSIONER</h5><h5>DISTRICT: ${feature.properties.District}</br>COMMISSIONER: ${feature.properties.Commission}</h5>`);
    }
    if (feature.properties && feature.properties.MEMBER) {
      layer.bindPopup(`<h5>GREENSBORO CITY COUNCIL</h5><h5>DISTRICT: ${feature.properties.DISTRICT}</br>MEMBER: ${feature.properties.MEMBER}</h5>`);
    }
  }

  render () {
    const { data } = this.props;
    const position = [36.0726, -79.7920];
    const councilStyle = {
      color: '#006400',
      weight: 2,
      opacity: 0.85
    };
    const commissionerStyle = {
      color: '#640000',
      weight: 2,
      opacity: 0.85
    };

    return (
      <Map className="map" center={position} zoom={11}>

        <TileLayer
          url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://data.greensboro-nc.gov/" target="_blank">Open Gate City</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        />
        <Marker position={position}>
          <Popup>
            <span><a href="http://codeforgreensboro.org" target="_blank"><img className="logo" src="../static/CfGLogo.png" alt="CfG"/></a><h3>Hello!</h3><h4>I am <a href='http://govotegso.org' target='_blank'>GoVoteGSO.<br/></a><br/>Help <a href='http://codeforgreensboro.org' target='_blank'>Code for Greensboro</a> make me awesome!</h4></span>
          </Popup>
        </Marker>
        <LayersControl position='topleft' collapsed={false}>
          <LayersControl.Overlay name='City Council Districts' checked={true}>
            <GeoJSON data={data.councilDist} onEachFeature={this._onEachFeature} style={councilStyle}/>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='County Commissioner Districts'>
            <GeoJSON data={data.commissionerDist} onEachFeature={this._onEachFeature} style={commissionerStyle}/>
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    );
  }
}

module.exports = MapContainer;
