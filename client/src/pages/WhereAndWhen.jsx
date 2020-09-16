import React, { useContext } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import VoterRegLookup from '../components/VoterRegLookup';
import VoterPrecinctMap from '../components/VoterPrecinctMap';
import { VoterRegistrationContext } from '../components/VoterRegistrationContext';
import { Link } from 'react-router-dom';

export default function WhereAndWhen() {
  const GoogleMapAPIKey = process.env.REACT_APP_GOOGLEMAPAPIKEY;
  const { voter } = useContext(VoterRegistrationContext);

  const createVoterPrecinctMapsLink = (address) =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address,
    )}`;

  return (
    <div>
      <h1>Where to Vote</h1>
      <p>Enter your information below to find out where to vote</p>
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
              href={createVoterPrecinctMapsLink(
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
        <Link to="/early-voting"><Button>Early Voting Information</Button></Link>
      </p>
      <p>
        Election Day is Tuesday, November 6th and you can vote from 6:30am to
        7:30 pm at your assigned polling place. Remember to register to vote by
        October 12th if you want to vote on Election Day!
      </p>
    </div>
  );
}
