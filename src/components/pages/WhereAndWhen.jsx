import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import { handleError } from '../../actions';
import VoterInfoForm from '../VoterInfoForm';


class WhereAndWhen extends React.Component {
  constructor() {
    super();
    this.state = {
      pollingPlace: undefined,
      isLoading: false,
      errorGettingPollingPlace: false,
    };
  }

  _getPolingPlaceInfo = (voter) => {
    if (!voter.precinct_desc) return;

    const precinctDesc = voter.precinct_desc;
    const url = `http://gis.co.guilford.nc.us/arcgis/rest/services/Elections/Elections/MapServer/0/query?where=UPPER(PRECINCT)%20like%20%27%25${precinctDesc}%25%27&outFields=*&outSR=4326&f=json`;
    this.setState({ isLoading: true });
    axios.get(url)
      .then((response) => {
        const { attributes } = response.data.features[0];
        const pollingPlace = {
          name: attributes.POLLING_PLACE,
          address: `${attributes.ADDRESS}, ${attributes.CITY}, NC`,
        };
        this.setState({ pollingPlace, isLoading: false });
      })
      .catch((error) => {
        handleError(error);
        this.setState({ errorGettingPollingPlace: true });
      })
      .finally(() => { window.scrollTo(0, document.body.scrollHeight); });
  }

  _createGoogleMapsLink = address => (`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`);

  render() {
    const { pollingPlace, isLoading, errorGettingPollingPlace } = this.state;
    return (
      <div>
        <h1>Where and When to Vote</h1>
        <VoterInfoForm
          returnVerifiedVoter={this._getPolingPlaceInfo}
        />
        {
          isLoading && <span>Getting Polling Place Info</span>
        }
        {
          !isLoading && pollingPlace ?
            <ListGroup>
              <ListGroupItem><b>Polling Place Name:</b> {pollingPlace.name}</ListGroupItem>
              <ListGroupItem>
                <b>Polling Place Address: </b>
                <a
                  target="_blank"
                  href={this._createGoogleMapsLink(pollingPlace.address)}
                  title="View on Google Maps"
                >
                  {pollingPlace.address}
                </a>
              </ListGroupItem>
            </ListGroup>
          : null
        }
        {
          errorGettingPollingPlace && <span>Error getting polling place info. Please try again</span>
        }
      </div>
    );
  }
}

module.exports = WhereAndWhen;
