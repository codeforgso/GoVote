import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import VoterRegLookup from '../components/VoterRegLookup';
import VoterPrecintMap from '../components/VoterPrecintMap';

export default class WhereAndWhen extends React.Component {
  constructor() {
    super();
    this.state = {
      pollingPlace: {},
      isLoading: false,
      errorGettingPollingPlace: false,
    };
  }

  _getPollingPlaceInfo = (voter) => {
    if (Object.keys(voter).length === 0) {
      this.setState({ pollingPlace: {}, geocode: {} });
      return;
    }

    // TODO: pull out polling place info
    // TODO: replace this with the data returned from our backend
  };


  _createVoterPrecintMapsLink = address =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address
    )}`;

  render() {
    
    const { pollingPlace, isLoading, errorGettingPollingPlace, geocode } = this.state;
    // render google map for polling place/voter residence only if Google API key provided
    const GoogleMapAPIKey = process.env.REACT_APP_GOOGLEMAPAPIKEY;
    let renderVoterPrecinctMap = '';
    if (GoogleMapAPIKey &&  pollingPlace.address) {
      renderVoterPrecinctMap =
      (<ListGroupItem>
        <VoterPrecintMap geocode={geocode} voterAddress={window.sessionStorage.getItem('VoterRegLookupSelectedVoter')} pollingPlaceAddress={pollingPlace.address} pollingPlaceName={pollingPlace.name}>
        </VoterPrecintMap>
      </ListGroupItem>);
    }
    return (
      <div>
        <h1>Where to Vote</h1>
        <p>Enter your information below to find out where to vote</p>
        <VoterRegLookup returnSelectedVoter={this._getPollingPlaceInfo} />
        {isLoading && <span>Getting Polling Place Info</span>}
        {!isLoading && Object.keys(pollingPlace).length > 0 ? (
          <ListGroup>
            <ListGroupItem>
              <b>Polling Place Name:</b> {pollingPlace.name}
            </ListGroupItem>
            <ListGroupItem>
              <b>Polling Place Address: </b>
              <a
                target="_blank"
                href={this._createVoterPrecintMapsLink(pollingPlace.address)}
                title="View on Google Maps"
                rel="noopener noreferrer"
              >
                {pollingPlace.address}
              </a>
            </ListGroupItem>
            {renderVoterPrecinctMap}
          </ListGroup>
        ) : null}
        {errorGettingPollingPlace && (
          <span> Error getting polling place info. Please try again</span>
        )}
        <h1>When to Vote</h1>
        <p>
          <a href="https://www.guilfordcountync.gov/home/showdocument?id=4845">
            Guilford County Board of Elections One-Stop Early Voting Schedule
            November 6, 2018 General Elections
          </a>
        </p>
        <p>
          Election Day is Tuesday, November 6th and you can vote from 6:30am to
          7:30 pm at your assigned polling place. Remember to register to vote
          by October 12th if you want to vote on Election Day!
        </p>

        <p>
          Early Voting (including &quot;One-Stop Early Voting&quot;, which
          allows you to register and vote at the same time) begins Wednesday,
          October 17th and runs through Saturday, November 3rd. However,
          different restrictions on time apply to different polling sites around
          Guilford County. Most early voting sites are open business hours on
          weekdays Click here to view the County&#29;s comprehensive calendar
          that lists hours at each location.
        </p>
      </div>
    );
  }
}

