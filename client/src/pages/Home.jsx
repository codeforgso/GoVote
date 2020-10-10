import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Well } from "react-bootstrap";
import gvLogo from "../static/gvLogo.svg";
import PropTypes from "prop-types";

const Card = ({ title, body, btnText, linkTo, style = {} }) => (
  <Well
    style={Object.assign(
      {
        minHeight: "300px",
      },
      style
    )}
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
    <div className="logotop">
      <img src={gvLogo} alt="" height="100%" />
    </div>

    <div class="text-left">
      <h3 class="text-center">Let your voice be heard! Go Vote!</h3>

      <p>
        GoVoteGSO is a project to improve the accessibility of the electoral
        process in Greensboro and the Triad area. Whether you've never voted
        before or vote in every primary and general election, this is a resource
        for you!
      </p>

      <p>
        The links below address some of the most frequently asked questions
        about voting. We hope to make it as easy as possible for you to find
        information about the voting process for people in your neighborhood,
        rules and regulations about voting, and the options that you'll be
        presented with on the ballot.
      </p>
    </div>

    <Row>
      <Col md={6} lg={6} sm={6}>
        <Card
          title="Can I Vote?"
          body={[
            "Do have questions about voter qualifications?",
            <br />,
            "Find out more here",
          ]}
          btnText="Find out if you can vote here"
          linkTo="/can-i-vote"
        />
      </Col>
      <Col md={6} lg={6} sm={6}>
        <Card
          title="Where &amp; When to Vote?"
          body={[
            "Unsure where you can vote?",
            <br />,
            "Want to find out more about One Stop Eary Voting and election dates?",
          ]}
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
          title="Election Day!"
          body="Find out more about what to expect, reporting polling place issues, and how to find your polling place here"
          btnText="Learn more about election day"
          linkTo="/election-day"
        />
      </Col>
      {/* deleted candidate info for 2020v1 component per https://github.com/codeforgso/GoVote/pull/190*/}
    </Row>

    <div class="text-left">
      <h3 class="text-center">
        <Link to="/about">About GoVoteGSO &amp; CodeForGSO</Link>
      </h3>

      <p>
        Please note that this site does NOT include comprehensive information
        about <a href="https://www.ncsbe.gov/voting/vote-mail">vote-by-mail</a>{" "}
        or using absentee ballots. If you plan to use this method of voting,
        request your ballot as soon as possible and find more information at the
        vote-by-mail portal on the State Board of Elections website. Keep
        yourself and others safe when you go vote this year! Learn about COVID
        safety and request a free Personal Protective Equipment (PPE) kit from{" "}
        <a href="https://www.safevoternc.org/">SafeVoterNC</a>.
      </p>

      <p>
        GoVoteGSO is an open source project that we hope to continuously
        improve. If anything doesn’t meet your needs or you would like to
        contribute, please let us know as soon as possible by{" "}
        <a href="mailto:hello@codeforgreensboro.org">emailing us</a> or creating
        an issue on our{" "}
        <a href="https://github.com/codeforgso/GoVote">Github repository.</a>
      </p>

    </div>
  </div>
);

export default Home;
