import { MapControl, PropTypes as LeafletPropTypes } from 'react-leaflet';
import { geosearch, geocodeServiceProvider } from 'esri-leaflet-geocoder';

export default class SearchControl extends MapControl {
  static propTypes = {
    position: LeafletPropTypes.controlPosition,
  }

  createLeafletElement() {
    const cogAllPointsGeocodeService = geocodeServiceProvider({
      url: 'https://gis.greensboro-nc.gov/arcgis/rest/services/Geocoding/AllPoints_GCS/GeocodeServer',
      label: 'All Points',
    });

    // create the geocoding control and add it to the map
    // var searchControl = L.esri.Geocoding.geosearch().addTo(map);
    const searchControl = geosearch({
      providers: [cogAllPointsGeocodeService],
      zoomToResult: true,
      expanded: true,
      collapseAfterResult: false,
      placeholder: 'Address Search',
      useMapBounds: false,
    });

    // listen for the results event and pass latln to the map
    searchControl.on('results', (data) => {
      this.props.setGeocodeResult(data.results[0]);
    });
    return searchControl;
  }
}
