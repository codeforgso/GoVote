import L from 'leaflet';
import { MapControl, PropTypes as LeafletPropTypes } from 'react-leaflet';
import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch';

export default class Geocoder extends MapControl {
  static propTypes = {
    position: LeafletPropTypes.controlPosition,
  }

  createLeafletElement(props: Object): Object {
    const provider = new EsriProvider();
    return new GeoSearchControl({
      provider,
      style: 'button',
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
      props
    });
  }
}
