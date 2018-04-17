import axios from 'axios';

const openDataBaseUrl = 'http://data-greensboro.opendata.arcgis.com/datasets';

function getCommissionerDistricts() {
  return axios.get(`${openDataBaseUrl}/1b60f15bb4dc4d8f96bd4831a8fbf063_5.geojson`);
}

export function getGISData() {
  return axios.all([getCommissionerDistricts()])
    .then(axios.spread(({ data: commissionerDist }) => ({
      commissionerDist,
    })))
    .catch(handleError);
}

export function getVoterInfo(firstName, lastName) {
  return axios.get(`/api/${firstName}/${lastName}`)
    .then(({ data }) => data)
    .catch(handleError);
}


function handleError(err) {
  // eslint-disable-next-line no-console
  console.error(err);
}
