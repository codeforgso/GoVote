import React from 'react';
import PropTypes from 'prop-types';

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
    if (this.state.mapIsReady) {
      // Display the map
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: this.props.geocode,
        zoom: 17,
        mapTypeId: 'roadmap',
        map: this.map,
      });
      // add marker on the map for the polling place
      this.marker = new window.google.maps.Marker({
        position: this.props.geocode,
        map: this.map,
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
};

module.exports = GoogleMap;
