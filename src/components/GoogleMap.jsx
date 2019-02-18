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
    // ApiKey value needs to b stored in env variable
    // const ApiKey = '';
    const ApiKey = 'AIzaSyC_jVntO1agQ5gRABrvZfSkjMy6pvXXNzI';
    // if ApiKey not provided, then no map
    if (ApiKey) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}`;
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
