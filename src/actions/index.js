import axios from 'axios';

const openDataBaseUrl = 'http://data-greensboro.opendata.arcgis.com/datasets';

function getCouncilDistricts() {
  return axios.get(`${openDataBaseUrl}/829c58aaaf0c4bf0b59f93bfe3cb4c13_3.geojson`);
}

function getCommissionerDistricts() {
  return axios.get(`${openDataBaseUrl}/1b60f15bb4dc4d8f96bd4831a8fbf063_5.geojson`);
}

export function getGISData() {
  return axios.all([getCouncilDistricts(), getCommissionerDistricts()])
    .then(axios.spread(({ data: councilDist }, { data: commissionerDist }) => ({
      councilDist,
      commissionerDist,
    })));
}

export function getVoterInfo(firstName, lastName) {
  return axios.get(`/api/${firstName}/${lastName}`)
    .then(({ data }) => data);
}
