import React from 'react';
import { Link } from 'react-router-dom';

const DayOfInfo = () => (
  <div className="whenandwhere">

    <h1>It{'\''}s Election Day, What Do I Do?</h1>
    <div className="whenvote">

      <p>
        <strong><u>What to Expect</u></strong><br/><br/><p>
          <strong>Election Day is  <u>Tuesday, November 3rd, 2020</u></strong>.<br/><p>You can vote from 6:30am to
          7:30 pm at your assigned polling place.</p><br></br>
        <p><strong>Remember to register to vote by
           <u> October 9th, 2020</u></strong> if you want to vote on Election Day!</p>
        </p>
      </p>
        <p>
          <strong>What to Bring</strong><p>
          <ul><li>If you've voted in North Carolina before, you don't need to show ID to vote.</li>
          <li>If you're a first-time voter who registered by mail, and didn't provide your driver's license number or the last 4 digits of your Social Security number on your registration form, you will need to show ID to vote.</li> <li>Acceptable forms include: a driver's license or state ID; US Passport; employee ID; student ID; military ID; or a copy of a utility bill, bank statement or paycheck.
          Voters without ID: If you are unable to provide ID, you will still be able to vote a provisional ballot and can bring one of these documents to the board of elections prior to canvass.</li></ul>
        </p>
      </p>
      <p>
        <strong>How to Report Issues With Your Polling Place</strong>
        <br/><p>
          If you encounter problems at the polls or feel unsafe you can take the following steps:
          <ul>
            <li>Immediately report the issue to precinct official at the polling place.</li>
            <li>Report incidents to <a href="https://www.ncsbe.gov/" target="_blank">The North Carolina Board Of Elections</a>
              <div><li><a href="https://docs.google.com/forms/d/e/1FAIpQLSfFDJqx8zlzRWXSmNNpC5sEgqMguWsYf1Y_npmeet__E1SFZg/viewform" target="_blank">Incident Submission Form</a></li>
              <li>Phone: (919) 814-0700</li>
              <li>Email: elections.sboe@ncsbe.gov</li>
              </div>
            </li>
            <li>Consider contacting state authorities depending on the incident.</li>

          </ul>
        </p>
      </p>
      <p>
        <strong>Polling Place</strong><br/>
        <p><Link to="/where-and-when">Look Up Your Polling Place</Link></p>
      </p>

    </div>
  </div>

  );

export default DayOfInfo;
