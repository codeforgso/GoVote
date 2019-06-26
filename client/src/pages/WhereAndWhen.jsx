import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import VoterRegLookup from '../components/VoterRegLookup';
import VoterPrecinctMap from '../components/VoterPrecinctMap';
import { VoterRegistrationContext } from '../components/VoterRegistrationContext';

export default class WhereAndWhen extends React.Component {
  _createVoterPrecinctMapsLink = (address) =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address,
    )}`;

  render() {
    const GoogleMapAPIKey = process.env.REACT_APP_GOOGLEMAPAPIKEY;
    return (
      <div>
        <h1>Where to Vote</h1>
        <p>Enter your information below to find out where to vote</p>
        <VoterRegistrationContext.Consumer>
          {({ voter }) => (
            <React.Fragment>
              <VoterRegLookup />
              {voter && (
                <ListGroup>
                  <ListGroupItem>
                    <b>Polling Place Name:</b> {voter.polling_place_name}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Polling Place Address: </b>
                    <a
                      target="_blank"
                      href={this._createVoterPrecinctMapsLink(
                        voter.formattedPollingPlaceAddress,
                      )}
                      title="View on Google Maps"
                      rel="noopener noreferrer"
                    >
                      {voter.formattedPollingPlaceAddress}
                    </a>
                  </ListGroupItem>
                  {GoogleMapAPIKey && (
                    <VoterPrecinctMap
                      voterAddress={window.sessionStorage.getItem(
                        'VoterRegLookupSelectedVoter',
                      )}
                      pollingPlaceAddress={voter.formattedPollingPlaceAddress}
                      pollingPlaceName={voter.polling_place_name}
                    />
                  )}
                </ListGroup>
              )}
              <h1>When to Vote</h1>
              <p>
                <a href="https://www.guilfordcountync.gov/home/showdocument?id=4845">
                  Guilford County Board of Elections One-Stop Early Voting
                  Schedule November 6, 2018 General Elections
                </a>
              </p>
              <p>
                Election Day is Tuesday, November 6th and you can vote from
                6:30am to 7:30 pm at your assigned polling place. Remember to
                register to vote by October 12th if you want to vote on Election
                Day!
              </p>

              <p>
                Early Voting (including &quot;One-Stop Early Voting&quot;, which
                allows you to register and vote at the same time) begins
                Wednesday, October 17th and runs through Saturday, November 3rd.
                However, different restrictions on time apply to different
                polling sites around Guilford County. Most early voting sites
                are open business hours on weekdays Click here to view the
                County&#29;s comprehensive calendar that lists hours at each
                location.
              </p>
            </React.Fragment>
          )}
        </VoterRegistrationContext.Consumer>
      </div>
    );
  }
}
