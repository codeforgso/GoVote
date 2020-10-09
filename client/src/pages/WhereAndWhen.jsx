import React, { useContext } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import VoterRegLookup from "../components/VoterRegLookup";
import VoterPrecinctMap from "../components/VoterPrecinctMap";
import { VoterRegistrationContext } from "../components/VoterRegistrationContext";
import { Link } from "react-router-dom";

export default function WhereAndWhen() {
  const GoogleMapAPIKey = process.env.REACT_APP_GOOGLEMAPAPIKEY;
  const { voter } = useContext(VoterRegistrationContext);

  const createVoterPrecinctMapsLink = (address) =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address
    )}`;

  return (
    <div className="whenandwhere">
      <h1>When to Vote</h1>
      <div className="whenvote">
        <p>
          <strong>
            Election Day is <u>Tuesday, November 3rd, 2020</u>
          </strong>
          .<br />
          <p>
            You can vote from 6:30am to 7:30 pm at your assigned polling place.
          </p>
          <br />
          <p>
            <strong>
              Remember to register to vote by <u>October 9th, 2020</u>
            </strong>{" "}
            if you want to vote on Election Day!
          </p>
        </p>
        <br />
        <p>
          <strong>
            Early Voting runs{" "}
            <u>Wednesday, October 15th through Saturday, October 31st, 2020</u>
          </strong>
          .<p></p>This includes &quot;One-Stop Early Voting&quot;, which allows
          you to register and vote at the same time.
          <br />
          <p>
            However, different restrictions on time apply to different polling
            sites around Guilford County. Most early voting sites are open
            business hours on weekdays.
          </p>
          <p>
            <Link to="/early-voting">Early Voting Information</Link>
          </p>
          <a
            href="https://www.guilfordcountync.gov/Home/ShowDocument?id=10926"
            target="_blank"
          >
            Guilford County Board of Elections One-Stop Early Voting Schedule
            November 3, 2020 General Elections
          </a>
        </p>
        <p>
          <strong>
            Mail-In or Absentee Ballot <i>Request</i> Forms may be submitted up
            until <u>Tuesday, October 27th 5:00pm.</u>
          </strong>
          . <p></p>
          <a
            href="https://s3.amazonaws.com/dl.ncsbe.gov/Forms/NCAbsenteeBallotRequestForm.pdf"
            target="_blank"
          >
            Request your Mail-In Ballot / Absentee Ballot here.
          </a>
          <p></p>The form may be returned by the voter, the voter’s near
          relative or verifiable legal guardian, or a Multipartisan Assistance
          Team:
          <ul>
            <li>In-person to the county board of elections;</li>
            <li>By U.S. Postal Service, DHL, FedEx, or UPS; or</li>
            <li>By email or fax.</li>
          </ul>
          <br />
          <p></p>
          <div class="highlightbox">
            <b>Guilford County Board Of Elections</b>
            <br />
            PO BOX 3427
            <br />
            GREENSBORO NC
            <br />
            27402-3427
            <br />
            <a href="tel:+1336-641-3836">336-641-3836</a>
            <br />
            336-641-7676 (FAX)
            <br />
            <a href="mailto:ABSENTEE@GUILFORDCOUNTYNC.GOV">
              ABSENTEE@GUILFORDCOUNTYNC.GOV
            </a>
          </div>
        </p>
      </div>
      <h1>Where to Vote</h1>
      <div className="wherevote">
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
                  voter.formattedPollingPlaceAddress
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
                  "VoterRegLookupSelectedVoter"
                )}
                pollingPlaceAddress={voter.formattedPollingPlaceAddress}
                pollingPlaceName={voter.polling_place_name}
              />
            )}
          </ListGroup>
        )}
      </div>
    </div>
  );
}
