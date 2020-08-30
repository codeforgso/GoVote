import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Well } from "react-bootstrap";
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
    <p>{body}</p>
    <Link to={linkTo}>
      <Button bsStyle="primary">{btnText}</Button>
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
  <div>
    <h1>GoVoteGSO - Home</h1>
    <Row>
      <Col md={6} lg={4} sm={6}>
        <Card
          title="Can I Vote?"
          body="Do have questions about voter qualifications? Find out more here"
          btnText="Find out if you can vote here"
          linkTo="/can-i-vote"
        />
      </Col>
      <Col md={6} lg={4} sm={6}>
        <Card
          title="Where &amp; When to Vote?"
          body="Unsure where you can vote? Want to find out more about One Stop Eary Voting and election dates?"
          btnText="Find out where and when"
          linkTo="/where-and-when"
        />
      </Col>
      <Col md={6} lg={4} sm={6}>
        <Card
          title="It's Election Day! What do I do?"
          body="It's election day and you're unsure what to do! Find out more about what to expect, reporting polling place issues, and how to find your polling place here"
          btnText="Learn more about election day"
          linkTo="/election-day"
        />
      </Col>
      {/* deleted candidate info for 2020v1 component per https://github.com/codeforgso/GoVote/pull/190*/}
      <Col md={6} lg={4} sm={6}>
        <Card
          title="About GoVoteGSO &amp; CodeForGSO"
          body="Learn more about this website, open source software, civic tech, and CodeForGreensboro"
          btnText="Learn more"
          linkTo="/about"
        />
      </Col>
    </Row>
  </div>
);

export default Home;
