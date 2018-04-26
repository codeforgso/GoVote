import axios from 'axios';

export function getVoterInfo(firstName, lastName) {
  return axios.get(`/api/${firstName}/${lastName}`)
    .then(({ data }) => data)
    .catch(handleError);
}

function handleError(err) {
  // eslint-disable-next-line no-console
  console.error(err);
}

/**
 * Each data source needs a name and url. Optionally you can provide a style property and an onEachFeature function.
 * If no on each function is provided, generateOnEachFunction will automatically be attached.
 */
const gisDataSources = [
  {
    name: 'Voting Precincts',
    url: 'https://opendata.arcgis.com/datasets/d31245377feb43db8a3ae826a173786d_11.geojson',
    onEachFeature: (feature, layer) => {
      layer.bindPopup(`<h5>Address: ${feature.properties.ADDRESS}, ${feature.properties.CITY} </br> <h5>Polling Place: ${feature.properties.POLLING_PLACE}</h5>`);
    },
  },
  {
    name: 'Polling Places',
    url: 'https://opendata.arcgis.com/datasets/ed03a285b5854955a496e78bbab8dce4_0.geojson',
    onEachFeature: (feature, layer) => {
      layer.bindPopup(`<h5>Address: ${feature.properties.ADDRESS}, ${feature.properties.CITY} </br> <h5>Polling Place: ${feature.properties.POLLING_PLACE}</h5>`);
    },
  },
  {
    name: 'Guilford County Commissioners',
    url: 'https://opendata.arcgis.com/datasets/a935f227374d4ca4b82a07bb0cbe7410_15.geojson',
    style: {
      color: '#006400',
      weight: 2,
      opacity: 0.85,
    },
  },
  {
    name: 'Guilford County Superior Court',
    url: 'https://opendata.arcgis.com/datasets/1cc7563966d841f485e84920c9cf09cc_16.geojson',
  },
  {
    name: 'Guilford County School Board',
    url: 'https://opendata.arcgis.com/datasets/85969964b6884d7bb6c5cf1f9240b6f6_12.geojson',
  },
  {
    name: 'NC State Senate',
    url: 'https://opendata.arcgis.com/datasets/79225df9181b4835aae736dd42947889_18.geojson',
  },
  {
    name: 'NC State House',
    url: 'https://opendata.arcgis.com/datasets/25144588f6f845179a8e3bd277341909_17.geojson',
  },
  {
    name: 'US House of Representatives',
    url: 'https://opendata.arcgis.com/datasets/2fe38a87120246c79603130c0267d5d1_19.geojson',
  },
];

// Returns an onEachFeature function to be used with LayersControl.Overlay and GeoJSON components
const generateOnEachFunction = name => ((feature, layer) => {
  layer.bindPopup(`<h5>${name}</h5><h5>DISTRICT: ${feature.properties.DISTRICT}</br>Representative: ${feature.properties.REPRESENTATIVE}</h5>`);
});

export function getGISData() {
  return Promise.all(
    gisDataSources.map((dataSource) => {
      // Attaches a generatedOnEachFeature property to each dataSource if the dataSource does not already have an onEachFunction
      if (!dataSource.onEachFeature) {
        dataSource.generatedOnEachFeature = generateOnEachFunction;
      }
      return dataSource;
    })
      .map(dataSource => (axios.get(dataSource.url)
      .then(res => (Object.assign(res.data, dataSource))) // Combine the data from the request with dataSource, so we can still access our name and onEachProperty properties
      .catch(error => console.log(error)) // eslint-disable-line no-console
    )));
}
