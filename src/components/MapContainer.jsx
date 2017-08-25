import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import axios from 'axios';

class MapContainer extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //       councilDist: null
  //   };
  // }

  // componentDidMount() {
  //   this._getCouncilDistricts(this.props.match);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.match !== nextProps.match) {
  //     this._getCouncilDistricts(nextProps.match);
  //   }
  // }

  // _getCouncilDistricts = () => {
  //   axios.get('http://data-greensboro.opendata.arcgis.com/datasets/829c58aaaf0c4bf0b59f93bfe3cb4c13_3.geojson')
  //  .then((response) => {
  //     //console.log(response);
  //     this.setState({ councilDist: response.data });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  render () {
    const position = [36.0726, -79.7920];
    const getStyle = {
      color: '#006400',
      weight: 2,
      opacity: 0.85
    };
    return (
      <Map className="map" center={position} zoom={11}>
        <GeoJSON data={this.props.data.councilDist} style={getStyle}/>
        <TileLayer
          url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://data.greensboro-nc.gov/" target="_blank">Open Gate City</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        />
        <Marker position={position}>
          <Popup>
            <span>I am <a href='http://govotegso.org' target='_blank'>GoVoteGSO</a><br/>Help Code for Greensboro make me awesome!</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

module.exports = MapContainer;
