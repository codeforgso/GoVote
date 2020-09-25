import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Well } from "react-bootstrap";
import gvLogo from '../static/gvLogo.svg';
import PropTypes from "prop-types";

const Card = ({ title, body, btnText, linkTo, style = {} }) => (
  <Well
    style={Object.assign({
      minHeight: '300px',
    }, style)}
    bsStyle="primary"
    bsSize="large"
  >
    <h2>{title}</h2>
    <p className="cardtext">{body}</p>
    <Link to={linkTo}>
      <Button className="cardbtn" bsStyle="primary">
        {btnText}
      </Button>
    </Link>
  </Well>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  style: PropTypes.object,
};

const Home = () => (
  <div class="homecards">
    <div className="logotop"><img src={gvLogo} height="100%"></img></div>

    <div class='text-left'>
      <h3 class='text-center'>Let your voice be heard! Go Vote!</h3>

      <p>GoVoteGSO is a project to improve the accessibility of the electoral process in Greensboro and the Triad area. Whether you’ve never voted before or vote in every primary and general election, this is a resource for you!  </p>

      <p>The links below address some of the most frequently asked questions about voting. We hope to make it as easy as possible for you to find information about the voting process for people in your neighborhood, rules and regulations about voting, and the options that you’ll be presented with on the ballot.</p>
    </div>

    <Row>
      <Col md={6} lg={6} sm={6}>
        <Card
          title="Can I Vote?"
          body={['Do have questions about voter qualifications?', <br></br>, 'Find out more here']}
          btnText="Find out if you can vote here"
          linkTo="/can-i-vote"
        />
      </Col>
      <Col md={6} lg={6} sm={6}>
        <Card
          title="Where &amp; When to Vote?"
          body={["Unsure where you can vote?", <br></br>, "Want to find out more about One Stop Eary Voting and election dates?"]}
          btnText="Find out where and when"
          linkTo="/where-and-when"
        />
      </Col>
      <Col md={6} lg={6} sm={6}>
        <Card
          title="Early Voting Information"
          body="Learn more about Early Voting and Same-Day Registration information"
          btnText="Early Voting"
          linkTo="/early-voting"
        />
      </Col>
      <Col md={6} lg={6} sm={6}>
        <Card
          title={["Election Day!"]}
          body="Find out more about what to expect, reporting polling place issues, and how to find your polling place here"
          btnText="Learn more about election day"
          linkTo="/election-day"
        />
      </Col>
      {/* deleted candidate info for 2020v1 component per https://github.com/codeforgso/GoVote/pull/190*/}
    </Row>

    <div class='text-left'>
      <h3 class='text-center'><a href="/about">About GoVoteGSO &amp; CodeForGSO</a></h3>

      <p>Please note that this site does NOT include comprehensive information about <a href='https://www.ncsbe.gov/voting/vote-mail'>vote-by-mail</a> or useing absentee ballots. If you plan to use this method of voting, request your ballot as soon as possible and find more information at the vote-by-mail portal on the State Board of Elections website. Keep yourself and others safe when you go vote this year! Learn about COVID safety and request a free Personal Protective Equipment (PPE) kit from <a href="https://www.safevoternc.org/">SafeVoterNC</a></p>

      <p>GoVoteGSO is an open source project that we hope to continuously improve. If anything doesn’t meet your needs or you would like to contribute, please let us know as soon as possible by <a href="mailto:hello@codeforgreensboro.org">emailing us</a> or creating an issue on our <a href="https://github.com/codeforgso/GoVote">Github repository.</a></p>

      <p>And for the election day page:</p>

      <h3>It's election day, what do I do?</h3>

      <p>That's easy, find your polling place and go vote!</p>

      <h4>What to expect</h4>

      <p>Your polling place, depending on how many people live in your area, is likely to have volunteers for candidates - or even the candidates themselves - handing out literature at a legally specified distance from the entrance. There will also be signs for the candidates on the ballot. No one is allowed to advocate for candidates or hand out literature inside the polling place.</p>

      <p>You may have to wait in a short line inside the polling place. At the front of the line will be a table with greeters who will take your name and verify your registration status. Beginning in 2020 in North Carolina, you will be required to show a valid, state-approved ID to vote. Please see <a href="https://www.ncsbe.gov/Voter-ID">this page</a> for more details about which IDs are approved for use and the form you can use to request a free North Carolina Voter ID (you must submit this form in person at your county Board of Elections office).</p>

      <p>In Guilford County, voters use electronic voting machines unless they request a provisional ballot or curbside voting accommodations. These machines are touch screen devices that will present the voter’s ballot page by page. As you touch candidate names to select them, the machine will record your choices on a piece of paper that looks like a receipt visible through a small window on the machine. You may change your selections at any point during the process until presented with a final screen to confirm the selections.</p>

      <p>If you need assistance at any time, you can and should request help from the individuals working at the polling place. If they refuse to assist you, please report this using the resources listed below.</p>

      <h4>How to report issues with your polling place</h4>

      <p>Intimidation and harassment at polling places is a violation of federal law. Make sure that you <a href="https://www.aclu.org/know-your-rights/voting-rights/">know your rights!</a> If you encounter issues on election day, please utilize one of the following resources:</p>

      <ul>
        <li>U.S. Department of Justice Voting Rights Hotline: 800-253-3931; TTY line 877-267-8971</li>
        <li><a href="https://www.ncsbe.gov/voting-accessibility">Department of Justice Election Complaint Report Form</a></li>
        <li>American Civil Liberties Union Voter Protection Hotline: 1-866-OUR-VOTE (1-866-687-8683) or 1-888-VE-Y-VOTA (1-888-839-8682) (en Español).</li>
      </ul>

      <h4>Accessibility & Accomodations</h4>

      <p>The Help America Vote Act of 2002 stipulated legal requirements for accommodations at all polling places nationwide to ensure that every voter can easily participate. Accommodations include allowing for physical assistance inside the voting booth or curbside voting, in which polling place volunteers help individuals cast a vote from their car. You may request these accommodations on Election Day. Please visit <a href="https://www.ncsbe.gov/voting/help-voters-disabilities">this page</a> for more details about North Carolina’s voter accessibility considerations.</p>
    </div>

  </div>
);

export default Home;
