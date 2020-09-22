import React from 'react';
import EarlyVotingIFrame from '../components/EarlyVotingIFrame.jsx';

const EarlyVoting = () => (
  <div>
    <h1>Early Voting Information</h1>
    <h2>Official Information</h2>
    <p>
      <a rel="noopener noreferrer" href="https://www.guilfordcountync.gov/our-county/board-of-elections/absentee-voting-information/early-voting-one-stop-voting" target="_blank">
        Official Early Voting information
      </a> is available at the Guilford County
      Board of Elections website.
    </p>
    <h2>Schedule</h2>
    <p>
      Early Voting runs Thursday, October 15, 2020 through Saturday, October
      31, 2020.
    </p>
    <p>
      Early Voting hours are 8am - 7:30pm weekdays and 8am - 5pm weekends.
    </p>
    <p>
      <strong>IMPORTANT:</strong> Early Voting locations close early at 3pm on
      the final day, Saturday, October 31, 2020.
    </p>
    <h2>Map of Early Voting Locations</h2>
    <p>
      <a rel="noopener noreferrer" href="https://www.google.com/maps/d/viewer?mid=1gqVAS4N-hUOhVB-WqTBEiovUv9wPavlS&hl=en&ll=36.05232562242983%2C-79.8143897&z=11" target="_blank">
        Open map in a new window
      </a>.
    </p>
    <EarlyVotingIFrame />
  </div>
  );

export default EarlyVoting;
