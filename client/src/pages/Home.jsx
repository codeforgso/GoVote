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
    <Row>
      <Col md={6} lg={6} sm={6}>
        <Card
          title="Can I Vote?"
          body={['Do have questions about voter qualifications?',<br></br>,'Find out more here']}
          btnText="Find out if you can vote here"
          linkTo="/can-i-vote"
        />
      </Col>
      <Col md={6} lg={6} sm={6}>
        <Card
          title="Where &amp; When to Vote?"
          body={["Unsure where you can vote?",<br></br>,"Want to find out more about One Stop Eary Voting and election dates?"]}
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
    <div>
      <h3><a href="/about">About GoVoteGSO &amp; CodeForGSO</a></h3>
      <p>Learn more about this website, open source software, civic tech, and CodeForGreensboro</p>
    </div>
  </div>
);

export default Home;
