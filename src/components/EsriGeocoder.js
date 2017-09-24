import L from 'leaflet';
import { MapControl, PropTypes as LeafletPropTypes } from 'react-leaflet';
// import esri from 'esri-leaflet';
// import { Geocoding } from 'esri-leaflet-geocoder';
// import * as Geocoding from 'esri-leaflet-geocoder';
import { geosearch, geocodeServiceProvider } from 'esri-leaflet-geocoder';

export default class Geocoder extends MapControl {
  static propTypes = {
    position: LeafletPropTypes.controlPosition,
  }

  createLeafletElement(props: Object): Object {
    const cogAllPointsGeocodeService = geocodeServiceProvider({
      url: 'https://gis.greensboro-nc.gov/arcgis/rest/services/Geocoding/AllPoints_GCS/GeocodeServer',
      label: 'All Points'
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

    console.log('createLeafletElement Object');
    console.log(Object);
    console.log('createLeafletElement Props');
    console.log(props);
    // create an empty layer group to store the results and add it to the map
    const results = L.layerGroup();

    // listen for the results event and add every result to the map
    searchControl.on('results', (data) => {
      results.clearLayers();
      console.log('data');
      console.log(data);
      for (let i = data.results.length - 1; i >= 0; i - 1) {
        results.addLayer(L.marker(data.results[0].latlng));
        console.log('results');
      console.log(results);
      }
    });
    return searchControl;
  }

//   updateLeafletElement(fromProps: Object, toProps: Object): Object {
//     // create an empty layer group to store the results and add it to the map
//     const results = L.layerGroup();
//     console.log('updateLeafletElement toProps');
//     console.log(toProps);
//     // listen for the results event and add every result to the map
//     return searchControl.on('results', (data) => {
//       results.clearLayers();
//       console.log('updateLeafletElement data');
//       console.log(data);
//       // for (let i = data.results.length - 1; i >= 0; i - 1) {
//       results.addLayer(L.marker(data.results[0].latlng));
//       console.log('results');
//       console.log(results);
//       // }
//     });
//   }
}
