import React from 'react';
import PropTypes from 'prop-types';
import VoteHere from '../static/vote.svg';
import VoteResidence from '../static/home.svg';
import { handleError } from '../actions';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapIsReady: false,
      flipped: null,
    };
  }

  componentDidMount() {

    // this logic is used to prevent the script for maps.googleapis from having to be in index.html
    // and having the api key exposed there
    // this method allows the key to be stored in an .env file and the script tag added to the DOM when needed
    const GoogleMapAPIKey = process.env.REACT_APP_GOOGLEMAPAPIKEY;
    // if GoogleMapAPIKey not provided, then no map
    if (GoogleMapAPIKey) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleMapAPIKey}`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => {
        this.setState({ mapIsReady: true });
      });

      // only load the script one time
      this.loadedScript = Array.from(document.body.getElementsByTagName('script')).includes(script);
      if (!this.loadedScript) {
        document.body.appendChild(script);
      };
    };
  }

  componentDidUpdate() {
    if (this.state.mapIsReady) {
      // create infoWindow object for the text on the marker mouseover
      this.infoWindow = new window.google.maps.InfoWindow();

      // Display the map
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: this.props.geocode,
        zoom: 14,
        mapTypeId: 'roadmap',
        map: this.map,
      });
      // add marker on the map for the polling place
      this.voteHereMarker = new window.google.maps.Marker({
        position: this.props.geocode,
        titlr: 'Vote Here',
        map: this.map,
        icon: {
          url: VoteHere,
          scaledSize: new window.google.maps.Size(48, 48),
        },
      });
      // create event to display address on mouseover of the voter polling place
      this.mapsEvent = window.google.maps.event;
      this.mapsEvent.addListener(this.voteHereMarker, 'mouseover', () => {
        this.infoWindow.setContent(`<p>${this.props.pollingPlaceName}</p><p>${this.props.pollingPlaceAddress}</p>`);
        this.infoWindow.open(this.map, this.voteHereMarker);
      });
      this.mapsEvent.addListener(this.voteHereMarker, 'mouseout', () => {
        this.infoWindow.close(this.map, this.voteHereMarker);
      });

      // get the geocode for the voter residence and use it to add marker on the map
      this.voterAddressLookup = `${JSON.parse(this.props.voterAddress).res_street_address},${JSON.parse(this.props.voterAddress).res_city_desc} ${JSON.parse(this.props.voterAddress).state_cd}`;
      this.geocoder = new window.google.maps.Geocoder();
      this.geocoder.geocode({ address: this.voterAddressLookup }, (results, status) => {
        if (status === 'OK') {
          this.voterResidenceGeocode = results[0].geometry.location;
          this.voterResidenceMarker = new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: this.map,
            icon: {
              url: VoteResidence,
              scaledSize: new window.google.maps.Size(28, 28),
            },
          });
          // create event to display address on mouseover of the voter residence
          this.mapsEvent.addListener(this.voterResidenceMarker, 'mouseover', () => {
            this.infoWindow.setContent(`<p>${this.voterAddressLookup}</p>`);
            this.infoWindow.open(this.map, this.voterResidenceMarker);
          });
          this.mapsEvent.addListener(this.voterResidenceMarker, 'mouseout', () => {
            this.infoWindow.close(this.map, this.voterResidenceMarker);
          });
        } else {
          handleError(status);
        }
      });
    }
  }

  render() {
    return (
      <div id="map" style={{ width: '100%', height: '50vh' }} />
    );
  }
}

GoogleMap.propTypes = {
  geocode: PropTypes.object.isRequired,
  voterAddress: PropTypes.string.isRequired,
  pollingPlaceName: PropTypes.string.isRequired,
  pollingPlaceAddress: PropTypes.string.isRequired,
};

export default GoogleMap;
