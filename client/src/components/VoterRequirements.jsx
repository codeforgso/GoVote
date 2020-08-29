import React from "react";
import { Link } from "react-router-dom";
import "../static/VoterRequirements.css";

const VoterRequirements = () => (
  <div className="VoterRequirements">
    <a
      title="Go to NC Board of Elections"
      href="https://www.ncsbe.gov/Voters/Registering-to-Vote"
    >
      <img
        className="horizontal-center"
        width="250"
        alt="Vote with check for v"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Vote_with_check_for_v.svg/256px-Vote_with_check_for_v.svg.png"
      />
    </a>
    <p className="text-large">
      If you haven’t voted before, or haven’t voted in North Carolina, one of
      your first questions is probably “Can I Vote?” We can help you answer
      that!
    </p>
    <h2 className="VoterRequirements-heading">
      Step 1: Review Qualifications to Vote
    </h2>
    <p>
      To register to vote in North Carolina, a prospective voter must meet all
      of the following qualifications:{" "}
    </p>
    <ul>
      <li>Must be a citizen of the United States.</li>
      <li>
        Must live in the county of his/her registration, and have resided there
        for at least 30 days prior to the date of the election.
      </li>
      <li>
        Must be at least 18 years old. A prospective voter can submit a
        registration form up to two years before his/her 18th birthday, if and
        only if he/she will be 18 at the time of the next general election.
      </li>
      <li>
        Must not be serving a sentence for a felony conviction (including
        probation or parole). If a prospective voter has previously been
        convicted of a felony, his/her citizenship rights must be restored.{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ncsbe.gov/registering/who-can-register/registering-person-nc-criminal-justice-system"
        >
          For more information on voting rights for those in the North Carolina
          criminal justice system, click here.
        </a>
      </li>
      <li>
        Must rescind any previous registration in any other county or state.
      </li>
    </ul>
    <h2 className="VoterRequirements-heading">Step 2: Register to Vote</h2>
    <a
      title="Go to NC Board of Elections"
      href="https://www.ncsbe.gov/Voters/Registering-to-Vote"
    >
      <img
        className="horizontal-center"
        width="250"
        alt="Register to vote here. 1"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Register_to_vote_here._1.png/512px-Register_to_vote_here._1.png"
      />
    </a>
    <p className="text-large">
      If you meet the qualifications, your next step is registering to vote. In
      order to do this, you will need to complete and submit a voter
      registration form, which you can access{" "}
      <a href="https://www.ncdot.gov/dmv/offices-services/online/Pages/voter-registration-application.aspx">
        here
      </a>
      . You will need the following information:
    </p>
    <ul>
      <li>Full Name</li>
      <li>Residential Address</li>
      <li>Date Of Birth</li>
      <li>Citizenship Status</li>
      <li>Identification</li>
      <ul>
        <li>
          You will be asked to provide some proof that you are who you say you
          are when you submit this form. These can be:
        </li>
        <ul>
          <li>NC Drivers License or DMV ID number</li>
          <li>Last four digits of Social Security number</li>
          <li>
            A photocopied or scanned document of your valid government-issued ID
            card
          </li>
          <li>
            A photocopied or scanned document of a utility bill, bank statement,
            paycheck, or government document that displays your full name and
            address
          </li>
        </ul>
        <li>
          You CAN submit this form without this; in that case you will be asked
          to show ID when you vote.
        </li>
      </ul>
      <li>
        The mailing address of your county’s Board of Elections. Look that up on
        your favorite search engine or check the NC Board of Elections website{" "}
        <a href="https://vt.ncsbe.gov/BOEInfo">here</a>!
      </li>
    </ul>
    <h2>Step 3: Receive your voter registration card</h2>
    <p>
      The gist of this step is… Wait a while! It may take 1 to 2 weeks for the
      county to process your application and mail you back a voter registration
      card, which will contain the following information:
    </p>
    <ul>
      <li>Full name and address</li>
      <li>Party affiliation</li>
      <li>Precinct and district information</li>
      <li>
        Please note that a voter registration card is for your use only - you do
        not need the card with you in order to vote on election day! For more
        information about what you can expect when you go to vote, please see
        our page about <Link to="/election-day">Election Day</Link>.
      </li>
    </ul>
    <h2 className="VoterRequirements-heading">Need other information?</h2>
    <p>
      If you’re not a first-time voter, you may have different questions -
      hopefully we can help!{" "}
    </p>
    <h3 className="VoterRequirements-heading">
      Changing Registration Information
    </h3>
    <p>
      The North Carolina Voter Registration Application may be used to change
      any voting information, including: name, address and party affiliation.
      The change notification must be signed, and should be sent to the
      appropriate County Board of Elections by the voter registration deadline
      (25 days before each election).
    </p>
    <p>
      Once you have completed and mailed your changes to your local board of
      elections, allow two to six weeks for delivery of your voter
      identification card. Read the information thoroughly and note any changes
      or mistakes on the card. A voter identification card is for your use only,
      you do not need the card in order to vote.
    </p>
    <h3 className="VoterRequirements-heading">
      Military & Overseas Citizens Voting Information
    </h3>
    <p>
      Some citizens, such as people serving in the military who are away from
      their permanent home on Election Day, their families, or U.S. citizens who
      are living abroad, have special voting rights and ways to register to
      vote.{" "}
    </p>
    <p>
      If this describes you, you have the choice of either requesting a mail-in
      absentee ballot the same way as other registered voters, or applying to
      register and/or vote through special programs for military and overseas
      voters as described here.
    </p>
    <h3>
      <a href="https://ncvoter.org/registering-to-vote/">
        For more information visit this page from Democracy NC
      </a>
    </h3>
  </div>
);

export default VoterRequirements;
