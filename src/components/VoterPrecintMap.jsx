import React from 'react';
import PropTypes from 'prop-types';
import VoteHere from '../static/vote.svg';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapIsReady: false,
    };
  }

  componentDidMount() {
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

      document.body.appendChild(script);
    }
  }

  componentDidUpdate() {
    // // eslint-disable-next-line no-console
    // console.log(JSON.parse(this.props.voterAddress));
    // // eslint-disable-next-line no-console
    // console.log(JSON.parse(this.props.voterAddress).res_street_address);
    // // eslint-disable-next-line no-console
    // console.log(JSON.parse(this.props.voterAddress).res_city_desc);
    // // eslint-disable-next-line no-console
    // console.log(JSON.parse(this.props.voterAddress).state_cd);
    this.state.voterAddressLookup = `${JSON.parse(this.props.voterAddress).res_street_address},${JSON.parse(this.props.voterAddress).res_city_desc},${JSON.parse(this.props.voterAddress).state_cd}`;
    // eslint-disable-next-line no-console
    console.log(this.state.voterAddressLookup);
    if (this.state.mapIsReady) {
      // Display the map
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: this.props.geocode,
        zoom: 17,
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
  voterAddress: PropTypes.object.isRequired,
};

module.exports = GoogleMap;
