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
    <main>
      <section>
      <h1>When to Vote</h1>
        <h2>Election Day is <u>Tuesday, November 3rd, 2020</u>.</h2>
          <p>
            You can vote from 6:30am to 7:30 pm at your assigned polling place.
          </p>
          <h3>
            Register to vote by <u>October 9th, 2020</u>
            {" "} if you want to vote on Election Day!
          </h3>

          <h3>
            Early Voting runs{" "}<u>Wednesday, October 15th</u> through       <u>Saturday, October 31st, 2020</u>.
          </h3>
          <p>
            This includes &quot;One-Stop Early Voting&quot;, which allows you to register and vote at the same time.
          </p>
          <aside>
            However, different restrictions on time apply to different polling
            sites around Guilford County. Most early voting sites are open
            business hours on weekdays.
          </aside>

          <h4>
            <Link to="/early-voting">Early Voting Information</Link>
          </h4>
          <h4>
            <a
              href="https://www.guilfordcountync.gov/Home/ShowDocument?id=10926"
              target="_blank"
              rel="noopener noreferrer"
            >
              Guilford County Board of Elections One-Stop Early Voting Schedule
              November 3, 2020 General Elections
            </a>
          </h4>

          <hr/>

          <h3>
            Mail-In or Absentee Ballot <i>Request</i> Forms may be submitted up
            until <u>Tuesday, October 27th 5:00pm.</u>
          </h3>
          <h4>
            <a
              href="https://s3.amazonaws.com/dl.ncsbe.gov/Forms/NCAbsenteeBallotRequestForm.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request your Mail-In Ballot / Absentee Ballot here.
            </a>
          </h4>

          <p>
            The form may be returned by the voter, the voter’s near relative verifiable legal guardian, or a Multipartisan Assistance Team:
          </p>
          <ul>
            <li>In-person to the county board of elections;</li>
            <li>By U.S. Postal Service, DHL, FedEx, or UPS; or</li>
            <li>By email or fax.</li>
          </ul>
          <br />

          <address class="highlightbox">
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
          </address>
        <hr />
      </section>

      <section>
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
      </section>
    </main>
  );
}
